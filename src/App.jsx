import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import getRandomLocation from './utils/getRandomLocation'

import SearchDimension from './components/SearchDimension'
import SearchCharacter from './components/SearchCharacter'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import ButtonUp from './components/ButtonUp'
import HasError from './components/HasError'


function App() {
  // Crea un estado de React para almacenar la información de la ubicación
  const [location, setLocation] = useState()
  // Crea un estado para almacenar un número que identifica una ubicación en la API, el valor incial es Random
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  // Crea un estado para almacenar un URL seleccionado
  const [selectedUrl, setSelectedUrl] = useState(null);
  // Crea un estado para almacenar un ID de dimensión
  const [dimensionId, setDimensionId] = useState(null);
  // Crea un estado para almacenar el tipo de búsqueda (ubicación, nombre de ubicación o personaje), Valor inicial Ubicacion
  const [searchType, setSearchType] = useState('location')
  // Crea un estado para controlar si ha ocurrido un error
  const [hasError, setHasError] = useState(false)
  // Crea un estado para almacenar una ubicación seleccionada
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Efecto de React que se ejecuta cuando el número de ubicación cambia
  useEffect(() => {
    let url = '';
    if (numberLocation) {
      url = `https://rickandmortyapi.com/api/location/${numberLocation}`;
    }

    axios.get(url)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => {
        console.log(err)
        setHasError(true)
      })
  }, [numberLocation])

  // Función que se ejecuta cuando el tipo de búsqueda cambia
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  // Función que limpia el URL seleccionada en el imput
  const clearSelectedUrl = () => {
    setSelectedUrl(null);
  };
  // Función que controla los errores en el formulario antes de enviar la solicitud a la API
  const handleSubmit = (e) => {
    e.preventDefault();
    clearSelectedUrl();
    setHasError(false);

    let inputValue = '';
    // Búsqueda por id de ubicación
    if (searchType === 'location') {
      inputValue = e.target.inputLocation.value.trim();
      if (!inputValue || inputValue < 1 || inputValue > 126 || isNaN(inputValue)) {
        setHasError(true);
        return;
      }
      // Búsqueda por nombre de la ubicación
    } else if (searchType === 'Name-Location') {
      inputValue = dimensionId || '';
      // Búsqueda por residente
    } else if (searchType === 'character') {
      inputValue = selectedLocation || '';
    }
    if (inputValue) {
      setNumberLocation(inputValue);
    }
  };


  return (
    <div className="App">
      <div className="card__head-front">
        <h1 className="card__title">Rick and Morty</h1>
        <form className="card__form" onSubmit={e => handleSubmit(e, dimensionId)}>
          <select className="card__select" value={searchType} onChange={handleSearchTypeChange}>
            <option value="location">Location</option>
            <option value="Name-Location">Name Location</option>
            <option value="character">Character</option>
          </select>
          {searchType === 'Name-Location' ? (
            <SearchDimension dimensionId={dimensionId} setDimensionId={setDimensionId} />
          ) : searchType === 'character' ? (
            <div>
              <SearchCharacter setSelectedUrl={setSelectedUrl} setSelectedLocation={setSelectedLocation} />
            </div>
          ) : (
            <input className="card__input" id="inputLocation" type="text" placeholder="Enter a location" />
          )}
          <button>
            <i className="bx bx-search-alt"></i>
          </button>
        </form>
      </div>
      <div>
        {hasError ? (
          <HasError />
        ) : (
          <div className="container__location">
            <LocationInfo location={location} />
          </div>
        )}
        <div className="card__residents">
          {selectedUrl ? (
            <ResidentInfo url={selectedUrl} />
          ) : location?.residents?.map((url) => (
            <ResidentInfo key={url} url={url} />
          ))}
        </div>
      </div>
      <div>
        <ButtonUp show={!hasError} />
      </div>
    </div>
  )
}

export default App
