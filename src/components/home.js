import React, { useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CountryDetailsPage from './countryDetailsPage';
function Home() {
    const navigate=useNavigate();
    const [countries, setCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAll , setShowAll]= useState(true);
    const handleSearch = async () => {

        try {
            const response = await axios.get(
                `https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags/${searchQuery}`
            );
            setCountries(response.data);
            console.log(response)

        } catch (error) {
            console.log(error.message);

        }
    };

    const filteredCountries = countries.filter((country)=>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );
    useEffect(()=>{
        if(searchQuery ==='' || showAll){
          handleSearch()
        }
    },[searchQuery,showAll])

    const handedlCountryClick =(countryName)=>{
        navigate(`/countryDetailsPage/${countryName}`);
    }


    return (

        <div className='container'>
            <div className='nav'>
                <h1> Where in the world ?</h1>
                <h2>Dark Mode</h2>

            </div>
            <div className='search'>
                <input type='text' value={searchQuery} placeholder='search for a country' onChange={(event) => setSearchQuery(event.target.value)}></input>
                <button onClick={handleSearch} className='btn-search'> Search</button>
                <select onChange={(event)=>setShowAll(event.target.value ==='All')}>
                    <option value='All'>All</option>
                </select>
            </div>
            <div className='country-card-container'>
                {filteredCountries.map((country) => (
                    <div key={country.name.common} className='country-card' onClick={()=> handedlCountryClick(country.name.common)}>
                        {country.flags && country.flags.png ?(
                            <img src={country.flags.png} alt='flag'/>
                        ) :(
                            <img src='placeholder.png' alt='Placeholder'></img>
                        )}
                        
                        <h4>{country.name.common}</h4>
                        
                        
                        <span>Population :{country.population}</span><br></br>
                        <span className='span-two'>Region :{country.region}</span><br></br>
                        <span>Capital: {country.capital}</span>
                    </div>
                ))}
                <div className='spacing'> </div>

            </div>

            




        </div>
    )
}

export default Home;