import { useState, useEffect } from 'react';

function App() {
  const [apiData, setApiData] = useState({});
  const [state, setState] = useState('');
  const [favoritePlaces, setFavoritePlaces] = useState([]); 
  const [isfav, setIsFav] = useState("white");

  const apiKey = "fd5ee6ffa5e43c0d36df3b257141b3fa";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setState(event.target.value);
    checkIfFav();
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  }; 

  const addFavPlace = () => {
    setFavoritePlaces([...favoritePlaces, state]);
    setIsFav(isfav === "white" ? "orange" : "white");
  }

  const showFavPlace = (e) => {
    setState(e.target.value);
    checkIfFav();
  }

  const checkIfFav = () => {
    if(!favoritePlaces.map((place) => place === state)) {
      setIsFav("white");
    }
    else {
      setIsFav("orange"); 
    }
  }

  const favList = favoritePlaces.map((place) => <button value={place} onClick={showFavPlace} className='h-[60px] font-semibold w-[120px] text-center p-4 m-2 
  rounded-md border border-l-amber-400 border-b-amber-400 transition-all text-white hover:mx-3'>{place}</button>);

  return (
    <div className="bg-gray-900 h-[100vh]">
      <div className="flex items-center justify-center">
          <div className='absolute top-4 p-2 left-8 border border-l-amber-400 border-b-amber-400 border-white h-[96%] w-[150px]'>
            <div className='flex justify-center'>
              <h1 className='text-amber-400 mb-2 font-bold text-center'>Favorite</h1>
              <h1 className='text-white font-bold text-center'>places</h1>
            </div> 
          
            {favList}
          </div>
          <input className='m-4 p-2 h-[48px] w-[50%] bg-transparent text-white font-semibold border outline-none border-white rounded-sm' placeholder='Enter city' onChange={inputHandler} value={state}/>
      </div>

        <div className='flex justify-center'>
          {apiData.main ? (
            <div className='relative text-white flex flex-col align-center border rounded-[2px] mt-12 border-white'>
              <img src={`http://openweathermap.org/img/wn/${apiData.weather[0].icon}@4x.png`} className='h-[300px] border-b border-gray-600'/>

              <div className='flex justify-around'>
                <p className="m-3 text-2xl font-bold">
                  <strong>{apiData.name}</strong>
                </p>

                <p className="font-bold m-3 text-2xl">
                  {kelvinToFarenheit(apiData.main.temp)}&deg; C
                </p>
              </div>

              <p className='absolute right-3 top-2'>
                <strong>{apiData.weather[0].main}</strong>
              </p>

              <button className='absolute left-3 top-3 border border-amber-500 bg-white h-[15px] w-[15px] rotate-[45deg]' style={{backgroundColor: isfav}} onClick={addFavPlace}></button>
            </div>
          ) : (
            <div>
              <h1 className='text-center text-white text-2xl tracking-[5px] transition-all'>...</h1>
            </div>
          )}
        </div>
    </div>
  );
}

export default App;
