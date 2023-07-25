
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
function CountryDetailsPage() {
    const { countryName } = useParams();
    const [country, setCountry] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await axios.get(
                    `https://restcountries.com/v3.1/name/${countryName}`
                );
                setCountry(response.data[0]);
                console.log(response.data[0]);

            } catch (error) {
                console.log(error.message);

            }

        };
        fetchCountry();

    }, [countryName])

    const toogleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    }

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');

        } else {
            document.body.classList.remove('dark-mode');

        }
    }, [darkMode])

    //function to get native name based on the language code
    const getNativeName = (userLanguage) => {
        if (country && country.name && country.name.native) {
            const nativeName =country.name.native[userLanguage]?.common;
            console.log("Native name: " ,nativeName);
            return nativeName || 'Native not availble';
        }
        
    };

    return (
        <div className='container' >
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
            <div className='btn-back'>
                <button style={{ width: "100px", height: "40px", backgroundColor: "#2f2e2e", fontSize: "20px", textAlign: "right" }}><Link to='/' style={{ textDecoration: "none", color: "white" }} > ← Back</Link> </button>
            </div>
            <div className='country-card1'>
                {country ? (
                    <div key={country.name.common} className='country-info' >
                        <div className='img-country'>
                            <img className='img-country' alt='country' src={country.flags?.png || 'placeholder.png'}></img>
                        </div>
                        <div className='country-detail'>
                            <h2 style={{ fontSize: "50px", fontWeight: "lighter" }}>{country.name.common}</h2>
                            <span>Native Name : {getNativeName('eng')}</span><br></br>
                            <span>Population :{country.population}</span><br></br>
                            <span className='span-two'>Region :{country.region}</span><br></br>
                            <span>Capital: {country.capital.join(', ')}</span><br></br><br></br>
                            <span>Border Countries: {country.borders.join(', ')}</span>
                        </div>
                        <div className='extra-detail'>
                            <span>Top Level Domain: {country.tld[0]} </span><br></br>
                            <span>Currencies: {Object.values(country.currencies || {}).map(currency => currency.name).join(', ')} </span><br></br>
                            <span>Languages: {Object.values(country.languages || {}).join(', ')}</span>
                        </div>



                    </div>

                ) : (
                    <p></p>
                )}

            </div>





        </div>
    );
}

export default CountryDetailsPage;


