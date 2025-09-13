/*
  createRequests(filters, curr_facet_filter = [], i, requests) -> generate all the combination of facet filters recursively

  input_format ->
    filters -> array of array of facet filters
      e.g. [
              ["difficulty:Easy", "difficulty:Medium"],
              ["topics:Array", "topics:String"],
              ["companies:Google", "companies:Amazon"]
            ]
    
    curr_facet_filter -> array of current facet filter (used in recursion)
      e.g. ["difficulty:Easy", "topics:Array"]  

    i -> current index of filters (used in recursion)

    requests -> array of all the combination of facet filters (used in recursion)

*/

const createRequests = (filters, curr_facet_filter = [], i, requests) => {
  if (i >= filters.length) {
    requests.push([...curr_facet_filter]);
    return;
  }

  for (let x = 0; x < filters[i].length; x++) {
    curr_facet_filter.push([filters[i][x]]);
    createRequests(filters, curr_facet_filter, i + 1, requests);
    curr_facet_filter.pop();
  }
};

export default createRequests;
