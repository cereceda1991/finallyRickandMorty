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
    // Construye una URL con el número de ubicación
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`

    // Hace una llamada a la API con axios
    axios.get(url)
      .then(res => {
        // Si la llamada es exitosa, actualiza el estado de ubicación
        setLocation(res.data)
        // Indica que no hay errores
        setHasError(false)
      })
      .catch(err => {
        // Si ha ocurrido un error, lo muestra en la consola
        console.log(err)
        // Indica que ha ocurrido un error
        setHasError(true)
      })
  }, [numberLocation])

  // Función que se ejecuta cuando el tipo de búsqueda cambia
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  // Función que limpia el URL seleccionado
  const clearSelectedUrl = () => {
    setSelectedUrl(null);
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Limpiar la URL seleccionada
    clearSelectedUrl();
    // Verificar el tipo de búsqueda seleccionada
    if (searchType === 'location') {
      // Verificar si el campo de entrada está vacío o es igual a "0"
      if (e.target.inputLocation.value.trim().length === 0 || e.target.inputLocation.value.trim() === '0') {
        // Establecer error en verdadero
        setHasError(true);
      } else {
        // Limpiar el error
        setHasError(null);
        // Establecer el nuevo número de ubicación a buscar
        setNumberLocation(e.target.inputLocation.value.trim());
      }
      //Buscar por nombre de ubicación
    } else if (searchType === 'Name-Location') {
      // Verificar si se ha seleccionado una dimensión
      if (dimensionId) {
        // Establecer el nuevo número de ubicación a buscar
        setNumberLocation(dimensionId);
      }
      //Buscar por nombre de personaje
    } else if (searchType === 'character') {
      // Verificar si se ha seleccionado una ubicación
      if (selectedLocation) {
        // Establecer el nuevo número de ubicación a buscar
        setNumberLocation(selectedLocation);
      }
    };
  }
  return (
    <div className="App">
      <div className='card__head-front'>
        <h1 className='card__title'>Rick and Morty</h1>
        <form className='card__form' onSubmit={(e) => handleSubmit(e, dimensionId)}>

          <select className='card__select' value={searchType} onChange={handleSearchTypeChange}>
            <option value="location">Location</option>
            <option value="Name-Location">Name Location</option>
            <option value="character">Character</option>
          </select>
          {searchType === 'Name-Location' ? (
            <SearchDimension
              dimensionId={dimensionId}
              setDimensionId={setDimensionId}
            />
          ) : (
            searchType === 'character' ? (
              <div>
                <SearchCharacter
                  setSelectedUrl={setSelectedUrl}
                  setSelectedLocation={setSelectedLocation}
                />
              </div>

            ) : (
              <input className='card__input' id='inputLocation' type="text" placeholder='Enter a location' />
            )
          )}

          <button ><i className='bx bx-search-alt'></i></button>
        </form>
      </div >
      <div>
        <div>
          {hasError ?
            <HasError />
            :
            <div className='container__location'>
              <LocationInfo
                location={location}
              />
              <div className="card__residents">
                {selectedUrl ? (
                  <ResidentInfo key={selectedUrl} url={selectedUrl} />
                ) : (
                  location?.residents?.map(url => (
                    <ResidentInfo key={url} url={url} />
                  ))
                )}
              </div>
            </div>
          }
        </div>
        {/* Muestro o escondo el botón-Up dependiendo si se renderiza normalmente o hay un error */}
        <ButtonUp show={!hasError} />
      </div>
    </div >
  )
}

export default App

