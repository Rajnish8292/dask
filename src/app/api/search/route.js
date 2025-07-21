import { NextResponse } from "next/server";
import { algoliasearch } from "algoliasearch";
import { InferenceClient } from "@huggingface/inference";
import { GoogleGenAI } from "@google/genai";
import type_validate from "@/app/lib/typeValidation.mjs";
import assumption_validate from "@/app/lib/assumptionValidation.mjs";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // swap
  }
  return array;
}

async function geminiResponseToQuery({ query }) {
  const client = new GoogleGenAI(process.env.GOOGLE_API_KEY);
  const prompt = `Extract and return only the following in exactly 4 lines:  
1. Difficulty level only if difficulty mentioned in query, strictly classify difficulty in easy/medium/hard and also consider synonyms for easy/medium/hard and convert them into easy/medium/hard (comma-separated/none)
2. Relevant dsa topics only if topics mentioned in query (comma-separated/none)  
3. Associated companies only if companies mentioned in query (comma-separated/none) 
4. Return query after correcting grammatical and spelling mistakes. 
Strictly no other text, explanations, or deviations.  
Respond directly with only the requested information. 
Do not include <think> tags or internal reasoning.
Query: "${query}"  `;

  let response;
  try {
    response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
  } catch (err) {
    console.log(err);
    return new Array(4).fill(false);
  }

  return response.text.split("\n").map((line, index) => {
    if (index == 3) {
      return [line];
    } else {
      return line.split(",");
    }
  });
}

async function searchForQuery({ filter, query }) {
  const TOTAL_HIT = 50;
  let TOTAL_FACETS = 0;
  const client = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID,
    process.env.ALGOLIA_API_KEY
  );

  // check no. of facets with filters
  for (const [key, value] of Object.entries(filter)) {
    if (value.length > 0) TOTAL_FACETS++;
  }

  let requests = [];
  let hits = [];

  for (const [key, value] of Object.entries(filter)) {
    if (value.length > 0) {
      value.forEach((f) => {
        requests.push({
          indexName: "problems_data",
          query: "",
          facets: [key],
          facetFilters: [[`${key}:${f}`]],
          hitsPerPage: Math.round(
            TOTAL_HIT / TOTAL_FACETS / filter[key].length
          ),
        });
      });
    }
  }

  if (!requests.length) {
    requests.push({
      indexName: "problems_data",
      query: query,
      hitsPerPage: TOTAL_HIT,
    });
  }

  try {
    const { results } = await client.search({
      requests: requests,
    });

    results.forEach((result) => {
      hits.push(...result.hits);
    });
    return [...new Set(shuffleArray(hits))];
  } catch (err) {
    console.log(err);
    return false;
  }
}


// async function searchForQuery({ filter, query }) {
//   const TOTAL_HIT = 50;
//   const client = algoliasearch(
//     process.env.ALGOLIA_APPLICATION_ID,
//     process.env.ALGOLIA_API_KEY
//   );

//   const index = client.initIndex("problems_data");

//   // Construct facetFilters
//   const facetFilters = [];

//   for (const [key, values] of Object.entries(filter)) {
//     if (Array.isArray(values) && values.length > 0) {
//       // OR within the same facet (e.g., difficulty:easy OR difficulty:medium)
//       facetFilters.push(values.map((v) => `${key}:${v}`));
//     }
//   }

//   try {
//     let hits = [];

//     // Send primary search request with filters (if any)
//     const { hits: initialHits } = await index.search(query, {
//       hitsPerPage: TOTAL_HIT,
//       ...(facetFilters.length > 0 && { facetFilters }),
//     });

//     hits = initialHits;

//     // 🔁 If no hits and filters were applied, fallback with no filters
//     if (hits.length === 0 && facetFilters.length > 0) {
//       const { hits: fallbackHits } = await index.search(query, {
//         hitsPerPage: TOTAL_HIT,
//       });
//       hits = fallbackHits;
//     }

//     return shuffleArray(hits); // optional randomization
//   } catch (err) {
//     console.error("Algolia error:", err);
//     return false;
//   }
// }




export async function POST(request) {
  let status = 200;
  const body = await request.json();
  const q = body["query"];

  // send api request to gemini for the query
  let geminiResponse = await geminiResponseToQuery({ query: q });
  let [facets, query] = [geminiResponse.slice(0, 3), geminiResponse[3]];

  // validate the response from gemini
  let assumptionValidation = assumption_validate(query[0], facets);
  console.log({ assumptionValidation });
  // // send api request to algolia for the query
  let searchResult = await searchForQuery({
    filter: assumptionValidation,
    query: query[0],
  });

  // if (!geminiResponse[0] || !searchResult) status = 500;

  // // remove the description from the result to reduce the size of data that will be send to user
  // searchResult = searchResult.map(({ description, ...result }) => result);
  console.log(searchResult.length);
  console.log(searchResult.splice(0, 5));
  return NextResponse.json({ assumptionValidation });
}
