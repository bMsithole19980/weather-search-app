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
    const [darkMode, setDarkMode]=useState(false);
    const handleSearch = async () => {

        try {
            const response = await axios.get(
                `https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags`
            );
            setCountries(response.data);
            console.log(response.data)

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

    const toogleDarkMode=()=>{
        setDarkMode((prevDarkMode)=>!prevDarkMode);
    }

    useEffect(()=>{
        if(darkMode){
            document.body.classList.add('dark-mode');

        }else{
            document.body.classList.remove('dark-mode');

        }
    },[darkMode])


    return (

        <div className='container'>
            <div className='nav'>
                <h1> Where in the world ?</h1>
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                enableBackground="new 0 0 40 40" 
                viewBox="0 0 40 40" 
                id="dark-mode"
                width="40"
                height="70"
                onClick={toogleDarkMode}
                ><path 
                fill="white" 
                d="M21.0518,32.2988c-1.5781,0-3.1567-0.3076-4.6606-0.9248c-3.0361-1.2451-5.4062-3.5996-6.6738-6.6289
		c-1.2676-3.0303-1.2798-6.3711-0.0347-9.4072c1.2456-3.0361,3.5996-5.4062,6.6299-6.6729c2.1885-0.916,4.5542-1.1846,6.8403-0.7734
		c0.2061,0.0371,0.3677,0.1992,0.4038,0.4053c0.0366,0.2061-0.0596,0.4141-0.2407,0.5195
		c-4.1094,2.3906-5.8213,7.5088-3.9819,11.9053c1.8389,4.3965,6.6836,6.7715,11.2734,5.5244
		c0.2012-0.0547,0.418,0.0215,0.5391,0.1934c0.1211,0.1709,0.123,0.3994,0.0044,0.5723c-1.3149,1.917-3.166,3.4131-5.353,4.3271
		C24.2686,31.9795,22.6602,32.2988,21.0518,32.2988z M21.0488,8.7051c-1.4751,0-2.9517,0.2969-4.3506,0.8818
		c-2.7837,1.1641-4.9463,3.3418-6.0903,6.1309c-1.1436,2.7891-1.1323,5.8574,0.0322,8.6406
		c1.1641,2.7842,3.3413,4.9463,6.1304,6.0908s5.8579,1.1328,8.6416-0.0322c1.5942-0.667,2.9932-1.6689,4.1055-2.9326
		c-4.6431,0.6279-9.2544-1.9492-11.1064-6.376c-1.8521-4.4277-0.4438-9.5186,3.2578-12.3857
		C21.4624,8.7109,21.2554,8.7051,21.0488,8.7051z"></path>
        </svg>
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
                        <div className='img-display' >
                        <img alt='country' src={country.flags?.png  || 'placeholder.png'}></img>
                        </div>
                       <div>
                       <h4>{country.name.common}</h4>
                        <span>Population :{country.population}</span><br></br>
                        <span className='span-two'>Region :{country.region}</span><br></br>
                        <span>Capital: {country.capital}</span>

                       </div>
                        
                        
                    </div>
                ))}
                <div className='spacing'> </div>

            </div>

            




        </div>
    )
}

export default Home;