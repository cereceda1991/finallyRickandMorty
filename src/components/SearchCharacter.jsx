import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchCharacter = ({ setSelectedUrl, setSelectedLocation }) => {
    const [characterName, setCharacterName] = useState("");
    const [characters, setCharacters] = useState([]);

    // UseEffect para realizar una llamada a la API al cambiar el valor de "characterName"
    // La respuesta de la llamada se almacena en el estado "characters"
    useEffect(() => {
        if (!characterName) {
            setCharacters([]);
            return;
        }
        const url = `https://rickandmortyapi.com/api/character/?name=${characterName}`

        axios
            .get(url)
            .then(res => setCharacters(res.data.results))
            .catch(err => console.log(err));
    }, [characterName]);

    // Función que se llama cuando un resultado de la búsqueda es seleccionado
    // Actualiza el nombre de personaje seleccionado y limpia la lista de resultados de búsqueda
    // Establece la URL y la ubicación del personaje seleccionado en los estados respectivos

    const handleClick = (result) => {
        setCharacterName(result.name);
        setCharacters([]);
        setSelectedUrl(result.url);
        setSelectedLocation(getDimensionId(result.location.url));
    };

    // Función que extrae el ID de la dimensión de la URL de ubicación
    const getDimensionId = (locationUrl) => {
        const parts = locationUrl.split("/");
        return parts[parts.length - 1];
    }

    return (
        <div>
            <input
                className="card__input"
                type="text"
                placeholder="Enter character name"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
            />
            {characters.length > 0 && (
                <ul>
                    {characters.map((char) => (
                        <li
                            className="card__Srch-list"
                            key={char.id}
                            onClick={() => handleClick(char)}
                        >
                            {char.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchCharacter;
