import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from './components/home';
import CountryDetailsPage from './components/countryDetailsPage';
function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/countryDetailsPage/:countryName' element={<CountryDetailsPage/>}/>
      </Routes>
      
      </BrowserRouter>
     
    </div>
  );
}

export default App;
