
const express = require('express');  
const axios = require('axios');  

const router = express.Router();  

 
router.get('/', async (req, res) => {  
  try {  
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');  
    res.json(response.data);  
  } catch (error) {  
    res.status(500).send('Error fetching countries');  
  }  
});  

 
router.get('/:countryCode', async (req, res) => {  
  try {  
    const countryCode = req.params.countryCode.toUpperCase(); 

    const response = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);  
  

    if (!response.data) {  
      return res.status(404).send('Country not found');  
    }  

  
    const { commonName, officialName, borders } = response.data;  


    res.json({   
      commonName,   
      officialName,   
      countryCode,   
      borders   
    });  
  } catch (error) {  
    console.error('Error fetching country info:', error);  
    res.status(500).send('Error fetching country info');  
  }  
});  


module.exports = router; 