import '../styles/SearchDimension.css'
import axios from "axios";
import { useEffect, useState } from "react";

const SearchDimension = ({ setDimensionId }) => {
    // Crea un estado para almacenar el nombre de la dimensión
    const [dimensionName, setDimensionName] = useState("");
    // Crea un estado para almacenar los resultados
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Si el nombre de dimensión está vacío, se vacía la lista de resultados
        if (dimensionName === "") {
            setResults([]);
            return;
        }
        const url = `https://rickandmortyapi.com/api/location/?name=${dimensionName}`;
        axios
            .get(url)
            .then(res => setResults(res.data.results))
            .catch(err => console.log(err));
    }, [dimensionName]);

    // Función que maneja el evento click al seleccionar un resultado
    const handleClick = (result) => {
        // Actualiza el nombre de dimensión
        setDimensionName(result.name);
        // Actualiza el ID de dimensión
        setDimensionId(result.id);
        // Vacía la lista de resultados
        setResults([]);
    };


    return (
        <div className="card__SearchDimension">
            <input
                className="card__input"
                type="text"
                placeholder="Enter a Name location"
                value={dimensionName ? dimensionName : ''}
                onChange={(e) => setDimensionName(e.target.value)}
            />
            {results?.length > 0 && (
                <>
                    <ul>
                        {results?.map((result) => (
                            <li
                                className="card__Srch-list"
                                key={result.id}
                                onClick={() => handleClick(result)}
                            >
                                <p>{result.name}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default SearchDimension;
