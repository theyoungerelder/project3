// Setting up bar charts 
function plotGraph(x1,y1,title,ID){
  // ploting the data passed in
  let trace1 = {
    x: x1,
    y: y1,
    type: 'pie',
    text: y1.map(String),
    textposition: 'auto',
    hoverinfo: 'none',
    marker: {
      color: 'rgb(158,202,225)',
      opacity: 0.6,
      line: {
        color: 'rgb(8,48,107)',
        width: 1.5
      }
    }
  };

  let data = [trace1];

  let layout = {
    title: title,
    barmode: 'stack',
    autosize: true
  };

  Plotly.newPlot(ID, data, layout);
}

// pass in data from CSV's to plot using the function
d3.csv("Value_Trends.csv").then((data)=>{
  let x1 = [];
  let y1 = [];
  let title = "Value Trends";
  let ID = "plots1";

  // loop through rows to get data to pass into the above arrays
  for (let i = 0; i < data.length; i++){
    let rowX = data["Year"];
    let rowY = data["Home Value"];
    x1.push(rowX);
    y1.push(rowY)
  }

  plotGraph(x1,y1,title,ID)
})

d3.csv("2021_non_fam_income.csv").then((data)=>{
  let x1 = [];
  let y1 = [];
  let title = "2021 Income for Individual Households";
  let ID = "plots2";
  // loop through rows to get data to pass into the above arrays
  for (let i = 0; i < data.length; i++){
    let rowX = data["Label (Grouping)"];
    let rowY = data["Nonfamily Households"];
    x1.push(rowX);
    y1.push(rowY);
  }
  plotGraph(x1,y1,title,ID)
})