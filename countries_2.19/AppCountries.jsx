import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
 
  const [cvalue, setcValue] = useState('') 
  const [country, setCountry] = useState([])

 
  useEffect(() => {
   if (country) {
   axios
         
         .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
         .then(response => { 
        setCountry(response.data);
        })
        }
      } , [])

   const showedCountries =  country.map((e)=>e)
  .filter((e)=>e.name.common.toLowerCase().includes(cvalue.toLowerCase()))

 const handleChange = (event) => {
 setcValue(event.target.value);
 }

 const showCountry = (countryName) => {
setcValue(countryName)

return displayResult

 }

 let displayResult

 if (cvalue && showedCountries.length > 10) 
 { displayResult = <div>Too many matches, specify another filter </div>}

 if (showedCountries.length > 1 && showedCountries.length <= 10) 
 { displayResult = showedCountries.map( (el,i)=><div key={i}>{el.name.common} <button onClick={()=>showCountry(el.name.common)}>Show</button> </div>)}


 else if (showedCountries.length === 1) 
 { 

displayResult =

<div>
    <h1>{showedCountries[0].name.common}</h1>
     <div>Capital {showedCountries[0].capital}</div>
     <div>Area {showedCountries[0].area} </div>     
    

  <h2>Languages</h2>
     <ul>
            {Object.values(showedCountries[0].languages).map((language,y) => (
                     <li key={y}>{language}</li>
                     ))}
    </ul>
    <div>
         <img src={showedCountries[0].flags.png} alt="" style={{marginTop:"20px"}}/> 
    </div> 

  
    </div>
   

  }

 return (
    
    <div> 
      find countries : <input value={cvalue} onChange={handleChange} />
  
      {displayResult}
   
     </div>
    ) 
  
}

export default App