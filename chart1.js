const ctx = document.getElementById('barchart').getContext('2d');
drawChart();
async function drawChart(){
    const tabledatapoints = await getData();
const barchart = new Chart(ctx,{
    type: 'line',
    data: {
        labels: tabledatapoints.labels,
        datasets: [{
            label: tabledatapoints.stockname1,
            data: tabledatapoints.retail_and_recreation_percent_change_from_baseline,
            backgroundColor: ['rgba(255,99,132,0.2)'
            ],
            borderColor:['rgba(255,99,132,1)',    
            ],
            borderWidth: 1,
            tension:0.2
        },{ label:tabledatapoints.stockname2,
            data: tabledatapoints.grocery_and_pharmacy_percent_change_from_baseline,
            backgroundColor: 'rgba(255,26,104,0.2)',
            borderColor:'rgba(255,26,104,1)',
            tension:0.4
        }, {
            label:tabledatapoints.stockname3,
            data: tabledatapoints. parks_percent_change_from_baseline,
            backgroundColor: 'rgba(54,162,235,0.2)',
            borderColor:'rgba(54,162,235,0.2)',
            tension:0.4
        },{
            label:tabledatapoints.stockname4,
            data: tabledatapoints.transit_stations_percent_change_from_baseline,
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderColor:'rgba(0,0,0,1)',
            tension:0.4
        },{label:tabledatapoints.stockname5,
            data: tabledatapoints.workplaces_percent_change_from_baseline,
            backgroundColor: 'rgba(255,26,104,0.2)',
            borderColor:'rgba(255,26,104,1)',
            tension:0.4

        },{
            label:tabledatapoints.stockname6,
            data: tabledatapoints.residential_percent_change_from_baseline,
            backgroundColor: 'rgba(255,26,104,0.2)',
            borderColor:'rgba(255,26,104,1)',
            tension:0.4
        }   
    
   ] },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        }
                
            }
        },
        title:{
            text: 'Mobility Trendline in SA in 2022',
            font:{
                size: 14
            }
        }
    }

}
});
async function getData(){
    const labels = [];
    const retail_and_recreation = [];
    const grocery_and_pharmacy = [];
    const parks_percent_change = [];
    const transit_stations= [];
    const workplaces_percent_change= [];
    const residential = [];
    const response = await fetch('https://raw.githubusercontent.com/sandranh/GMT320Assignment2/main/2022_ZA_Region_Mobility_Report.csv');
    const datapoints = await response.text();
    //console.log(datapoints);
    const table = datapoints.split('\n');
    //console.log(table);
    table.forEach(row=>{
    const column = row.split(',');
    //console.log(column);
    
    const date = column[8];
    const retail_and_recreation_percent_change_from_baseline = parseFloat( column[9]);
    const grocery_and_pharmacy_percent_change_from_baseline = parseFloat(column[10]);
    const parks_percent_change_from_baseline = parseFloat(column[11]);
    const transit_stations_percent_change_from_baseline = parseFloat(column[12]);
    const workplaces_percent_change_from_baseline = parseFloat(column[13]);
    const residential_percent_change_from_baseline = parseFloat(column[14]);
    labels.push(date);
    retail_and_recreation.push(retail_and_recreation_percent_change_from_baseline);
    grocery_and_pharmacy.push(grocery_and_pharmacy_percent_change_from_baseline);
    parks_percent_change.push(parks_percent_change_from_baseline);
    transit_stations.push(transit_stations_percent_change_from_baseline);
    workplaces_percent_change.push(workplaces_percent_change_from_baseline);
    residential.push(residential_percent_change_from_baseline);
    });
    //retail_and_recreation_percent_change_from_baseline.shift();
    const stockname1 = "Retail_and_recreation";
    const stockname2 ="Grocery_and_pharmacy";
    const stockname3 ="Parks_percent_change";
    const stockname4="transit_station";
    const stockname5="workplaces_percent_change";
    const stockname6="Residential";
   console.log(retail_and_recreation);
   return{
    labels,retail_and_recreation,grocery_and_pharmacy, parks_percent_change,transit_stations,workplaces_percent_change,residential,
    stockname1,stockname2,stockname3,stockname4,stockname5,stockname6
   }
}
};