import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchCharacter = ({ setSelectedUrl, setSelectedLocation }) => {
    const [characterName, setCharacterName] = useState("");
    const [characters, setCharacters] = useState([]);

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

    const handleClick = (result) => {
        setCharacterName(result.name);
        setCharacters([]);
        setSelectedUrl(result.url);
        setSelectedLocation(getDimensionId(result.location.url));
    };

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
