d3.json("http://127.0.0.1:5000/api/v1.0/parks").then((data)=>{
    
console.log(data);

})

// Call the data into the inspector console. 
function init() {
  d3.json("http://127.0.0.1:5000/api/v1.0/parks").then(function (data) {
    console.log("http://127.0.0.1:5000/api/v1.0/parks", data);
    // Set up the DropDown:
    let DropDown = d3.select(`dropdown`);

    for (var index = 0; index < parks.length; index++) {
      var park = parks[index];

    //   DropDown.append(`option`).text(name).property(`value`, name);
    // });


       data.names.forEach((name) => {
        DropDown.append(`option`).text(park.fullName).property(`value`, park.fullName);
    });
    // Reset demographic info and visuals to first subject when page is refreshed.
    const firstSample = park.fullName[0];
    charts(firstSample);
    demo(firstSample);
  });
}