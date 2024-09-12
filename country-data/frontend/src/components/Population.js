import { Line } from 'react-chartjs-2';  
import { useEffect, useState } from 'react';  
import axios from 'axios';  
import {  
  Chart as ChartJS,  
  LinearScale,  
  CategoryScale,   
  PointElement,  
  LineElement,  
  Tooltip,  
  Legend,  
  Title,  
} from 'chart.js';  


ChartJS.register(  
  LinearScale,  
  CategoryScale,  
  PointElement,  
  LineElement,  
  Tooltip,  
  Legend,  
  Title  
);  

const PopulationChart = ({ countryCode }) => {  
  const [populationData, setPopulationData] = useState([]);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {  
    const fetchPopulationData = async () => {  
      try {  
        const response = await axios.get(`http://localhost:3001/api/population/${countryCode}`); 
        setPopulationData(response.data.data.populationCounts);  
        setLoading(false);  
      } catch (error) {  
        console.error('Error fetching population data:', error);  
        setLoading(false);  
      }  
    };  

    fetchPopulationData();  
  }, [countryCode]);  

  if (loading) return <div>Loading population chart...</div>;  


  const years = populationData.map((entry) => entry.year);  
  const populations = populationData.map((entry) => entry.value);  

  const data = {  
    labels: years,  
    datasets: [  
      {  
        label: 'Population',  
        data: populations,  
        fill: false,  
        backgroundColor: 'rgba(75,192,192,0.4)',  
        borderColor: 'rgba(75,192,192,1)',  
        tension: 0.1,  
      },  
    ],  
  };  

  const options = {  
    scales: {  
      x: {  
        type: 'category', 
      },  
      y: {  
        beginAtZero: true,  
      },  
    },  
  };  

  return (  
    <div>  
      <h2>Population Over Time</h2>  
      <Line data={data} options={options} />  
    </div>  
  );  
};  

export default PopulationChart;