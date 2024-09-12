import { useEffect, useState } from 'react';  
import { useRouter } from 'next/router';  
import axios from 'axios';  
import Link from 'next/link';  
import PopulationChart from './Population';  

const CountryInfo = () => {  
  const router = useRouter();  
  const { countryCode } = router.query;  
  const [countryData, setCountryData] = useState(null);  
  const [flagData, setFlagData] = useState(null);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {  
    const fetchCountryInfo = async () => {  
      if (!countryCode) return;  

      try {  
       
        const [countryResponse, flagResponse] = await Promise.all([  
          axios.get(`http://localhost:3001/api/countries/${countryCode}`),  
          axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`)  
        ]);  

        const foundFlag = flagResponse.data.data.find(flag => flag.iso2 === countryResponse.data.countryCode);  

     
        setCountryData(countryResponse.data);  
        setFlagData(foundFlag); 
        setLoading(false);  
      } catch (error) {  
        console.error('Error fetching country info:', error);  
        setLoading(false);  
      }  
    };  

    fetchCountryInfo();  
  }, [countryCode]);  

  if (loading) return <div>Loading...</div>;  

  if (!countryData || !flagData) return <div>No data available for this country.</div>;  

  return (  
    <div class="container">  
      <h1>  
        {countryData.commonName || countryData.officialName}   
        {flagData && (  
          <img   
            src={flagData.flag}   
            alt={`Flag of ${countryData.commonName}`}   
           
          />  
        )}  
      </h1>  
      <h2>Information</h2>  
      <p><strong>Official Name:</strong> {countryData.officialName}</p>  
      <p><strong>Country Code:</strong> {countryData.countryCode}</p>  

      
      <PopulationChart countryCode={countryData.countryCode} />  

      <h2>Border Countries</h2>  
      <ul>  
        {countryData.borders && countryData.borders.length > 0 ? (  
          countryData.borders.map((border) => (  
            <li key={border.countryCode}>  
              <Link href={`/countries/${border.countryCode}`}>{border.commonName}</Link>  
            </li>  
          ))  
        ) : (  
          <li>No bordering countries.</li>  
        )}  
      </ul>  
    </div>  
  );  
};  

export default CountryInfo;