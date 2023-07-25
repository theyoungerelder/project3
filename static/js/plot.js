// Setting up bar charts 
function plotGraph(x1,y1,type,ytitle,title,ID){
  // ploting the data passed in
  let trace1 = {
    x: x1,
    y: y1,
    type: type,
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
    autosize: true,
    yaxis: {
      title: ytitle
    }
  };

  Plotly.newPlot(ID, data, layout);
}

// pass in data from CSV's to plot using the function
d3.csv("https://raw.githubusercontent.com/theyoungerelder/project3/Nicks_Branch/Value_Trends1.csv").then((data)=>{
  let x1 = [];
  let y1 = [];
  let ytitle = "Home Value";
  let title = "Housing Trend";
  let ID = "plots1";
  let type = "line";
  
  // loop through rows to get data to pass into the above arrays
  for (let i = 0; i < data.length; i++){
    let row = data[i]
    let rowX = row["Year"].slice(5);
    let rowY = row["Home Value"];
    x1.push(rowX);
    y1.push(rowY);
  }
  
  console.log(x1,y1,ID,title)
  plotGraph(x1,y1,type,ytitle,title,ID)
})

d3.csv("https://raw.githubusercontent.com/theyoungerelder/project3/Nicks_Branch/2021_non_fam_income.csv").then((data)=>{
  let x1 = [];
  let y1 = [];
  let ytitle = "# of People in Category";
  let title = "2021 Income for Individual Households";
  let ID = "plots2";
  let type = "bar";
  
  // loop through rows to get data to pass into the above arrays
  for (let i = 0; i < data.length; i++){
    let row = data[i]
    let rowX = row["Label (Grouping)"];
    let rowY = row["Nonfamily Households"];
    x1.push(rowX);
    y1.push(rowY);
  }

  console.log(x1,y1,ID,title)
  plotGraph(x1,y1,type,ytitle,title,ID)
})