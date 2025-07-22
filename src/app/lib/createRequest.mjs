let createRequests = (filters, curr_facet_filter = [], i, requests) => {
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

// let requests = [];

// let filters = [];

// createRequests(filters, [], 0, requests);

// console.log(requests);

export default createRequests;
