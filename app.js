// Import the data from data.js
const tableData = data

// Reference the HTML table using d3
var tbody = d3.select("tbody");

// Building a table to hold UFO sightings info
function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
  
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }

  // Empty filters variable that keeps track of all the elements
  // that change when a search is entered.
  // Will be used to store property id and value that was entered from user input
  var filters = {};

  // Updates the filters variable
  function updateFilters() {

    // Variable that saves the element that was changed 
    let changedElement = d3.select(this);

    // Variable that saves the value of the changed elements property
    // Printing to the console to make sure this works
    let elementValue = changedElement.property("value");
    console.log(elementValue);

    // Variable that saves the id of the changed elements property
    // Printing to the console to make sure this works
    let filterId = changedElement.attr("id");
    console.log(filterId);

    // if-else statement that checks if a value was changed by the user
    // If the value was changed, add the elements id as the property and the value to the filters variable
    if (elementValue) {
        filters[filterId] = elementValue;
    }

    // If the value was not changed/entered, clear the element id form the fitlers variable
    else {
        delete filters[filterId];
    }

    //Will loop through the filters variable and search through the table to match the indicated filters/parameters
    updateTable();
  }

  // Function to filter the table based on the user input that is stored
  // in the fitlers variable
  function updateTable() {

    // Variable for the filtered data that is equal 
    // to the data that builds the table.
    // This tbale will
    let filteredData = tableData;
  
    // Loop through the filters object and store the data that matches the 
    // filter values in the filters variable
    Object.entries(filters).forEach(([key, value]) => {
      filteredData = filteredData.filter(row => row[key] === value);
    });
  
     // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
  }
  
  // Attach an event to listen for the form change 
  // on each input element and calls the updateFilters() function
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
