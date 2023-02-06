import '../styles/SearchDimension.css'
import axios from "axios";
import { useEffect, useState } from "react";

const SearchDimension = ({ setDimensionId }) => {
    const [dimensionName, setDimensionName] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
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

    const handleClick = (result) => {
        setDimensionName(result.name);
        setDimensionId(result.id);
        setResults([]);
    };


    return (
        <div className="card__SearchDimension">
            <input
                className="card__input"
                placeholder="Enter a Name location"
                type="text"
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
                                {result.name}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default SearchDimension;
