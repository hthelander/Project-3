
//using jquery
$(document).ready(function () {
  d3.json(weatherurl).then((data) => {

    console.log(data);
    let loc = [], ag = [], mea = [];

    for (let i = 0; i < data.length; i++) {

      loc.push(data[i].Location);
      ag.push(data[i].Average);
      mea.push(data[i].Mean);
     // console.log(mea);
    }
    var bar_data1 = [
      {
        y: ag,

        x: loc,

        type: "bar",

        name: "Value",
      }
    ];
    var bar_data2 = [
      {
        y: mea,
        x: loc,
        type: "bar",
        name: "Mean of all years",

      }
    ];
   let chart_data = [bar_data1, bar_data2];

    var barLayout = {
      barmode:"group",
      title: "Summary of all months",
      xaxis: {
        title: {
          text: "LOCATION",
        },
      },
      yaxis: {
        title: {
          text: "TEMPERATURES",
        },
      },
    };

    Plotly.newPlot("plot", chart_data, barLayout);
  });

  //using jquery again to checkon id of dropdown menu
  $('#aggregate').on('change', optionChanged);
});
var optionChanged = function () {
  var months = ["January", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov"];

  console.log(monthlyurl)

  for (var i = 0; i <= months.length; i++) {
    console.log(months[i]);
    var result = months[i].substr(0, 3);
    console.log(result);
    if (result = $('#aggregate').val()) {

      d3.json(monthlyurl[result]).then((data) => {
        console.log(data);

        let loc = [], ag = [], mea = [];

        // For loop to populate arrays
        for (let j = 0; j < data.length; j++) {

          loc.push(data[j].Location);
          ag.push(data[j].Average);
          mea.push(data[j].Mean);

        }

        let trace1 = {
          x: loc,
          y: ag,
          type: "bar",
          name: "Average"

        };
        let trace2 = {
          x: loc,
          y: mea,
          type: "bar",
          name: "Mean of all Years"
          //color: 'rgb(204,204,204)'
        };


        let graph1 = [trace1, trace2];

        var layout = {
          barmode: "group",
          title: '  Weather for  months',
          xaxis: {
            title: {
              text: "LOCATION",
            },
          },
          yaxis: {
            title: {
              text: "TEMPERATURES",
            },
          },
          margin: {
            l: 100,
            b: 100,
            r: 100,
            t: 100,
          }
        }
        console.log("test")
        Plotly.newPlot("plot", graph1, layout);
      });
    }
  }
}
