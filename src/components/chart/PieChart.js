import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";



const PieChart = ({ covidData }) => {
    // console.log(covidData);
    let data = {
        lables: ['Active Cases', 'Total Recovered', 'Total Deaths', 'Total Cases'],
        datasets: [{
            label: 'Statistics',
            data: [covidData.cases.active, covidData.cases.recovered, covidData.deaths.total, covidData.cases.total],
            backgroundColor: ['yellowgreen', 'green', 'red', 'yellow']
        }]
    }
    return <Pie data={data} />
};



export default PieChart;