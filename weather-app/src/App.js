import { useState, useEffect } from 'react';

function App() {
  const [apiData, setApiData] = useState({});
  const [state, setState] = useState('London');
  const [favoritePlaces, setFavoritePlaces] = useState([]); 

  const apiKey = "fd5ee6ffa5e43c0d36df3b257141b3fa";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setState(event.target.value);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  }; 

  const addFavPlace = () => {
    setFavoritePlaces(...favoritePlaces, state);
  }

  return (
    <div className="bg-gray-900 h-[100vh]">
      <div className="flex justify-center">
          <input className='m-4 p-2 h-[48px] w-[50%] rounded-lg' onChange={inputHandler} value={state}/>
      </div>

        <div className='flex justify-center'>
          {apiData.main ? (
            <div className='relative text-white flex flex-col align-center bg-gray-800 border rounded-[2px] mt-12 border-white'>
              <img src={`http://openweathermap.org/img/wn/${apiData.weather[0].icon}@4x.png`} className='h-[300px] border-b border-gray-600'/>

              <div className='flex justify-around'>
                <p className="m-3 text-2xl font-bold">
                  <strong>{apiData.name}</strong>
                </p>

                <p className="font-bold m-3 text-2xl">
                  {kelvinToFarenheit(apiData.main.temp)}&deg; C
                </p>
              </div>

              <p className='absolute right-2 top-1'>
                <strong>{apiData.weather[0].main}</strong>
              </p>

              <button className='absolute left-2 top-1 bg-gray-700 w-6' onClick={addFavPlace}>/</button>
            </div>
          ) : (
            <div>
              <h1 className='text-white'>Enter city</h1>
              <h1 className='text-center text-white text-2xl tracking-[5px] transition-all'>...</h1>
            </div>
          )}
        </div>
    </div>
  );
}

export default App;
