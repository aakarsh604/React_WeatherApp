import { useEffect, useState } from "react";
import "./App.css";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [query, setQuery] = useState({q : "berlin"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const message = query.q ? query.q : "current location."
    toast.info("Fetching weather for " + message) ;

    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units }).then(data=> {
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
        setWeather(data);
      })
    }
    fetchWeather();
  }, [ query, units])
console.log(weather);

//function for changing the background color
const formatBackground = () => {
    if ( !weather) return "from-cyan-700 to-blue-700"
    const threshold = units === "metric" ? 25 : 70;
    if( weather.temp <= threshold ) return "from-cyan-700 to-blue-700"
    return "from-yellow-700 to-orange-500"
}

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
        <TopButtons setQuery={setQuery} />
         <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

         { weather && (
            <>
                <TimeAndLocation weather={weather}/>
                <TemperatureAndDetails weather={weather}/>

                <Forecast title="hourly forecast" items={weather.hourly}/>
                <Forecast title="daily forecast" items={weather.daily}/>
            </>
         )};

          <ToastContainer autoClose={4000} theme="colored" newestOnTop={true}/>

    </div>
  );
}

export default App;
