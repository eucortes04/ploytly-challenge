//Function init() to start
function init(){
    //create a variable to tie to selector in html
    var dropdownSelector = d3.select("#selDataset");

    //Give selector sample ID's
    d3.json("../samples.json").then(function (data) {
        console.log(data);
        //create an array of all the sample ID's
        var sampleIDs = data.names;

        //Add sample id's as dropdown selector options
        //loop through the IDs in ID array

        //***TEST FOR EACH */
        // sampleIDs.forEach(element => {
        //     console.log(element);
        // });
        sampleIDs.forEach(function (element) {
            //add a selector option to selector html filling in tags with array element containing sample ID
            dropdownSelector.append("option").text(element).property("value", element);
        });
    });
};



init();