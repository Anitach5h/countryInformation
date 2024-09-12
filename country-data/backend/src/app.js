const express = require('express');  
const cors = require('cors');
const { config } = require('dotenv');  
const countriesRouter = require('./controllers/countries.controller');  

config(); 

const app = express();  
const PORT = process.env.PORT || 3001;  


app.use(cors());
app.use(express.json());  

app.use('/api/countries', countriesRouter);  


app.listen(PORT, () => {  
  console.log(`Server is running on http://localhost:${PORT}`);  
});  
