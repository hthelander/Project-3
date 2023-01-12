const url = "http://127.0.0.1:5000/api/v1.0/parks"

const dataPromise = d3.json(url)
console.log("Data Promise: ", dataPrmoise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data.names);

  let names = data.cost;

  let metadata = data.fullName;

  let samples = data.activity;
});

