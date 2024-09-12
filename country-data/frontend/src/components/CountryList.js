
import React, { useEffect, useState } from 'react';  
import Link from 'next/link';  
import axios from 'axios';  

const CountryList = () => {  
  const [countries, setCountries] = useState([]);  

  useEffect(() => {  
    const fetchCountries = async () => {  
      try {  
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/countries`);  
        setCountries(response.data); // Ajusta según el formato de respuesta  
      } catch (error) {  
        console.error('Error fetching countries:', error);  
      }  
    };  
    fetchCountries();  
  }, []);  

  return (  
    <div class="container">  
      <h1>Available Countries</h1>  
      <ul>  
  {countries.map((country) => (  
    <li key={country.countryCode}>  
      <Link href={`/countries/${country.countryCode}`}>{country.name}</Link> 
    </li>  
  ))}  
</ul> 
    </div>  
  );  
};    

export default CountryList; 