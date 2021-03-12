import {useState,useEffect} from 'react'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

function App() {

const[pos,setPos] = useState({})
const[query,setQuery] = useState("");

const onChange = (e) =>{
  setQuery(e.target.value);
}

const search = (evt) =>{
  if(evt.key === "Enter" && evt.target.value != ""){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=ro&appid=${api.key}`).then(response => response.json()).
    then(data =>
       setPos({
        name: data.name,
        temp: Math.floor(data.main.temp),
        temp_min: Math.floor(data.main.temp_min),
        temp_max: Math.floor(data.main.temp_max),
        country: data.sys.country,
        description: data.weather[0].description}))
      setQuery("");
    }
}



const api = {
  key: "a0c46801720d8fd9bc4ccefe15fe70f5",
  url: "api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid="
}
useEffect(()=> {
navigator.geolocation.getCurrentPosition(async position=>{
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  
  const api_fetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ro&units=metric&appid=${api.key}`)
  const response = await api_fetch.json();
  //nconsole.log(response)
  setPos({
    name: response.name,
    temp: Math.floor(response.main.temp),
    temp_min: Math.floor(response.main.temp_min),
    temp_max: Math.floor(response.main.temp_max),
    country: response.sys.country,
    description: response.weather[0].description

  });
})
},[])

const date = new Date();
const data = date.toLocaleDateString('ro', {weekday: "long"}).toUpperCase();

  return (
    <div className={pos.temp >=5 ? "App-hot" : "App"}>
        <main>
         <div className = "search"></div>
          <input onChange = {onChange} 
            onKeyPress = {search} 
            value = {query} 
            type="text"
            className = "searchInput" 
            placeholder="Cauta..."/>
           <div className ="location"></div>
            <div className ="location-city">{pos.name}, {pos.country}</div>
            <div className = "location-date">{data}</div>
          <div className ="temperatura"> 
            <div className ="temperatura-medie">{pos.temp} &deg;C</div>
            <div className = "temperatura-minima-maxima">Min {pos.temp_min}&deg; - Max {pos.temp_max}&deg;</div>
            <div className = "temperatura-text">{pos.description} {pos.temp >=5 ? <WbSunnyIcon/> : <AcUnitIcon/>}</div>
           </div> 
        </main>
    </div>
  );
}

export default App;
