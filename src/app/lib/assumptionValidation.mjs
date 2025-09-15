const synonyms = {
  difficulty: {
    easy: [
      "beginner",
      "simple",
      "basic",
      "effortless",
      "straightforward",
      "light",
      "entry-level",
      "painless",
      "entry level",
    ],
    medium: [
      "intermediate",
      "moderate",
      "average",
      "balanced",
      "manageable",
      "fair",
      "semi-challenging",
    ],
    hard: [
      "difficult",
      "tough",
      "challenging",
      "complex",
      "advanced",
      "demanding",
      "grueling",
      "arduous",
      "intense",
    ],
  },
  topic: {
    "dynamic programming": ["dp"],
    array: ["arr"],
    "ordered map": ["map", "treemap"],
    "unordered map": ["map", "hashmap", "dict", "hmap"],
    string: ["str"],
    integer: ["int", "num", "n"],
    character: ["char", "ch", "c"],
    function: ["func", "fn"],
    variable: ["var", "v"],
    pointer: ["ptr", "p"],
    iterator: ["it", "iter"],
    "binary search": ["bs"],
    "depth-first search": ["dfs"],
    "breadth-first search": ["bfs"],
    "linked list": ["llist", "ll"],
    "binary tree": ["btree", "bt"],
    "binary search tree": ["bst"],
    matrix: ["mat", "grid"],
    vector: ["vec"],
    stack: ["st"],
    queue: ["q"],
    "hash set": ["set", "hset"],
    boolean: ["bool", "flag"],
    window: ["win"],
    "sliding window": ["sw"],
    "two pointers": ["tp"],
    "quick sort": ["qsort"],
    "merge sort": ["msort"],
    recursion: ["rec"],
    memoization: ["memo"],
    "topological sort": ["toposort"],
    "suffix array": ["sa"],
    "prefix sum": ["ps"],
    "segment tree": ["segtree", "st"],
    "binary indexed tree": ["bit", "fenwick"],
    "disjoint set union": ["dsu", "union-find"],
  },
};

/*

    assumption_validate(query, facets) -> function to validate the assumption made by gemini for the query

    input_format - >
        query -> string
        e.g. "find me a easy array problem from google"

        facets -> array of 3 arrays [difficulty[], topics[], companies[]]
        e.g. [
                ["Easy", "Medium", "Hard"],
                ["Array", "String", "Dynamic Programming"],
                ["Google", "Amazon", "Microsoft"]
              ]

    output_format - > return object of arrays with keys difficulty, topics, companies
        e.g.  {
                difficulty: [array of valid difficulties],
                topics: [array of valid topics],
                companies: [array of valid companies]
              }
        or
    return false if input is not valid

    working ->
        check if the difficulty, topics, or companies exist in the query or their synonyms exist in the query
        if exist then push them to the respective array in the output object
        return the output object

*/

const assumption_validate = (query, facets) => {
  if (!query || !facets) return false;
  if (typeof query != "string") return false;

  query = query.toLowerCase();

  const [diffculty, topics, companies] = facets;

  let n_difficulty = [],
    n_topics = [],
    n_companies = [];

  topics.forEach((topic) => {
    topic = topic.toLowerCase();

    if (query.includes(topic)) {
      let isFound = false;
      if (synonyms["topic"].hasOwnProperty(topic)) {
        n_topics.push(topic);
        isFound = true;
      } else {
        for (const [original, synonym] of Object.entries(synonyms["topic"])) {
          synonym.forEach((s) => {
            if (topic == s) {
              n_topics.push(original);
              isFound = true;
            }
          });
        }
      }
      if (!isFound) n_topics.push(topic);
    }
  });

  /*
    check if company name exists in query then just push that company in n_companies[]
  */
  companies.forEach((company) => {
    if (query.includes(company.toLowerCase())) n_companies.push(company);
  });

  diffculty.forEach((d) => {
    d = d.toLowerCase();

    if (query.includes(d)) {
      n_difficulty.push(d);
    } else {
      for (const [original, synonym] of Object.entries(
        synonyms["difficulty"]
      )) {
        synonym.forEach((s) => {
          if (query.includes(s.toLowerCase())) {
            n_difficulty.push(original);
          }
        });
      }
    }
  });

  return {
    difficulty: [...new Set(n_difficulty)],
    topics: [...new Set(n_topics)],
    companies: [...new Set(n_companies)],
  };
};

export default assumption_validate;
