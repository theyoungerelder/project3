// Setting up bar charts 
let xValue = ['Product A', 'Product B', 'Product C'];

let yValue = [20, 14, 23];

let trace1 = {
  x: xValue,
  y: yValue,
  type: 'bar',
  text: yValue.map(String),
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
  title: 'January 2013 Sales Report',
  barmode: 'stack',
  autosize: true
};

Plotly.newPlot('plots', data, layout);

  