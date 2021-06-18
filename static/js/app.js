//Function init() to start
function init(){
    //create a variable to tie to selector in html
    var dropdownSelector = d3.select("#selDataset");

    //Give selector sample ID's
    d3.json("../samples.json").then(function (data) {
        //create an array of all the sample ID's
        var sampleIDs = data.names;

        //Add sample id's as dropdown selector options
        //loop through the IDs in ID array
        sampleIDs.forEach(function (element) {
            //add a selector option to selector html filling in tags with array element containing sample ID
            dropdownSelector.append("option").text(element).property("value", element);
        });
    });
    //Build Graphs on the first execution using the first element
    buildBar(940);
    buildBubble(940);
};

//Function to build Bar chart
function buildBar(BarSampleID){
    console.log(BarSampleID)
    //Pull passed sample ID's data from json
    d3.json("../samples.json").then(function (data){
        //create variable to hold all sample data for filtering
        var allSampleData = data.samples;
        // filter using sample ID passed into build function returns array
        var filteredData = allSampleData.filter(function(sampleData){
            return sampleData.id == BarSampleID;
        });
        //convert returned array
        var barSampleData = filteredData[0];

        //bar chart values from instructions
        // values for bar chart
        var sample_values = barSampleData.sample_values;
        //labels for bar chart
        var otu_ids = barSampleData.otu_ids;
        //hovertext for bar chart
        var otu_labels = barSampleData.otu_labels

        //Trace for Bar chart
        var barTrace = [{
            //xvalues: slice to only pull 10
            x: sample_values.slice(0,10),
            //yvalues: slice to only pull 10 map to assign text values to each of the y values
            y: otu_ids.slice(0,10).map(function (otuID){
                return `OTU ${otuID}`
                }),
            //graph type
            type: "bar",
            // making barchart horizontal
            orientation: 'h',
            //tooltip
            text: otu_labels
        }];

        //Layout for bar chart
        barLayout = {
            title:"Top 10 OTUs found in that individual",
            xaxis:{title: "Sample Values"},
            yaxis:{title: "OTU ID's"}
        }
        //Plot the barchart
        Plotly.newPlot("barLocation",barTrace,barLayout);
    });
};

//Function to build Bubble chart
function buildBubble(bubbleSampleID){
    console.log(bubbleSampleID)
    //Pull passed sample ID's data from json
    d3.json("../samples.json").then(function (data){
        //create variable to hold all sample data for filtering
        var allSampleData = data.samples;
        // filter using sample ID passed into build function returns array
        var filteredData = allSampleData.filter(function(sampleData){
            return sampleData.id == bubbleSampleID;
        });
        //convert returned array
        var bubbleSampleData = filteredData[0];

        //bubble chart values from instructions
        //bubble x values and marker color
        var otu_ids = bubbleSampleData.otu_ids;
        //bubble y values and marker size
        var sample_values = bubbleSampleData.sample_values;
        //bubble text vales
        var otu_labels = bubbleSampleData.otu_labels;

        //Trace for Bar chart
        var bubbleTrace = [{
            //xvalues: slice to only pull 10
            x: otu_ids,
            //yvalues: slice to only pull 10 map to assign text values to each of the y values
            y: sample_values,
            //tooltip
            text: otu_labels,
            //graph type
            mode: 'markers',
            //bubble size and color
            marker:{
                size: sample_values,
                color: otu_ids,
            }
        }];

        //Layout for bar chart
        bubbleLayout = {
            title:"Bubble chart that displays each sample",
            xaxis:{title: "OTU ID's"},
            yaxis:{title: "Sample Values"}
        }
        //Plot the barchart
        Plotly.newPlot("bubbleLocation",bubbleTrace,bubbleLayout);
    });
};

//Function for sample Metadata
function sampleMetadata(selectedSample){
    //create variable to tie to demographic info in html
    var demographicInfo = d3.select("#sample-metadata");

    //Pull passed sample ID's data from json
    d3.json("../samples.json").then(function(data){
        //create an array of all sample metadata
        var allSampleMeta = data.metadata;
        //filter using sampleID passed into build function, returns array
        var filteredData = allSampleMeta.filter(function(sampleMeta){
            return sampleMeta.id == selectedSample;
        });
        //convert returned array
        var metaData = filteredData[0];

        // metaData.forEach(function(element){
        //     // demographicInfo.append("p").text(`${key}: ${value}`);
        // });


    });
}

// Function for when the selector is changed
//HTML REFERENCE <select id="selDataset" onchange="optionChanged(this.value)"></select>
//gets passed this.value aka selector value from init()
function optionChanged (selectedSample){
    buildBar(selectedSample);
    buildBubble(selectedSample);
    sampleMetadata(selectedSample);
};

init();