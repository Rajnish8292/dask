import { NextResponse } from "next/server";
import { algoliasearch } from "algoliasearch";
import { GoogleGenAI } from "@google/genai";
import assumption_validate from "@/app/lib/assumptionValidation.mjs";
import createRequests from "@/app/lib/createRequest.mjs";

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
  let TOTAL_REQUEST = 1;
  let facet_filters = [];
  let facets = [];
  const client = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID,
    process.env.ALGOLIA_API_KEY
  );

  // check no. of facets with filters
  for (const [key, value] of Object.entries(filter)) {
    if (value.length > 0) {
      facets.push(key);
      facet_filters.push(value.map((e) => `${key}:${e}`));
      TOTAL_REQUEST *= value.length;
    }
  }

  let requests = [];
  let hits = [];

  /* create all the combination of facet filter recu */
  createRequests(facet_filters, [], 0, requests);
  requests = requests.map((e) => {
    return {
      indexName: "problems_data",
      query: "",
      facets: facets,
      facetFilters: e,
      hitsPerPage: Math.round(TOTAL_HIT / TOTAL_REQUEST),
    };
  });

  if (requests[0].facets.length == 0) {
    requests = [];
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
    console.log({ results });
    results.forEach((result) => {
      hits.push(...result.hits);
    });

    return hits;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function POST(request) {
  let status = 200;
  const body = await request.json();
  const q = body["query"];

  // send api request to gemini for the query
  let geminiResponse = await geminiResponseToQuery({ query: q });
  let [facets, query] = [geminiResponse.slice(0, 3), geminiResponse[3]];

  // validate the response from gemini
  let assumptionValidation = assumption_validate(query[0], facets);

  // // send api request to algolia for the query
  let searchResult = await searchForQuery({
    filter: assumptionValidation,
    query: query[0],
  });

  if (!geminiResponse[0] || !searchResult) status = 500;

  // remove the description from the result to reduce the size of data that will be send to user
  searchResult = searchResult.map(
    ({ description, _highlightResult, ...result }) => result
  );

  return NextResponse.json({
    result: searchResult,
    facets: assumptionValidation,
    status: 200,
  });
}
