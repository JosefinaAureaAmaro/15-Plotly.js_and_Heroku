


function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url = `/metadata/${sample}`;
  console.log(url);
  var data = [];

  data[0] = d3.json(url).then(function(response){
    console.log(response);
    // Use d3 to select the panel with id of `#sample-metadata`
     var sample_container = document.getElementById("sample-metadata")
     // Use `.html("") to clear any existing metadata
     document.getElementById("sample-metadata").innerHTML= "";

      var items_list = Object.entries(response);
      console.log(items_list);
    
      var list = document.createElement("ul")
      list.setAttribute("style","list-style: none;");
      list.setAttribute("id","sample-metadata-list");
      sample_container.appendChild(list);

     // Use `Object.entries` to add each key and value pair to the panel
     items_list.forEach((item) => {
      var itemized_list = document.createElement("li");
      itemized_list.setAttribute("id","metadata-items");
      var values = document.createTextNode(`${item[0]}: ${item[1]}`)
      itemized_list.appendChild(values);
      list.appendChild(itemized_list);

      });
    });
  }

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url =  `/samples/${sample}`;
  console.log(url);

  d3.json(url).then(function(response){
    var data = [{
      x: response.otu_ids,
      y: response.sample_values,
      mode: "markers",
      type: "scatter",
      name: response.otu_labels,
      marker: {
        size: response.sample_values,
        color: response.otu_ids
      }
    }];


  // Define the plot layout
  var layout = {
      title: "Belly Button OTU Samples",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "OTU VALUES" }
    };

    // Plot the chart to a div tag with id
    Plotly.newPlot("bubble", data, layout);

    // @TODO: Build a Pie Chart

      var top10_sample_values = response.sample_values.slice(0,9); 
      var top10_sample_ids = response.otu_ids.slice(0,9);
      var top10_sample_labels = response.otu_labels.slice(0,9);

      console.log(top10_sample_values); 

      var data_pie = [{
        values: top10_sample_values,
        labels: top10_sample_ids,
        hoverinfo: top10_sample_labels,
        type: "pie"
      }];

      var layout_pie = {
        title: "Belly Button OTU Samples",
        height: 600,
        width: 800,
        showlegend: true,
      };

      // Plot the chart to a div tag with id
      Plotly.newPlot("pie", data_pie, layout_pie);

    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    let firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);

    var sample = firstSample;
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);

  sample = newSample; 
}

// Initialize the dashboard
init();

