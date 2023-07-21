import React from 'react';
import { useState ,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CountryDetailsPage() {
   const {countryName} =useParams();
   const [country , setCountry]= useState(null);

   useEffect(()=>{
    const fetchCountry= async()=>{
        try{
            const response = await axios.get(
                `https://restcountries.com/v3.1/name/${countryName}`
            );
            setCountry(response.data[0]);
            console.log(response);
    
        }catch(error){
            console.log(error.message);
    
        }

    };
    fetchCountry();
   
   },[countryName])

  return (
    <div className='div' style={{backgroundColor:"white"}}>
        {country ? (
          <h1>{country.name.population}</h1>
        ):(
            <p></p>
        )}
        
       
    </div>
  );
}

export default CountryDetailsPage;