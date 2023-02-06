import '../styles/ResidentInfo.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ResidentInfo = ({ url }) => {
    const [character, setCharacter] = useState()
    useEffect(() => {
        axios.get(url)
            .then(res => setCharacter(res.data))
            .catch(err => console.log(err))
    }, [url])

    return (

        <article className="card__resident">
            <header className="card__header">
                <img className="card__avatar" src={character?.image} alt="" />
                <div className="card__circle-container">
                    <span className={`card__circle ${character?.status}`}></span>
                    <span className="card__circle-label">{character?.status}</span></div>
            </header>
            <section className="card__body">
                <h3 className="card__name">{character?.name}</h3>
                <ul className="card__list">
                    <li className="card__item">
                        <span className="card__item-label">Species</span>
                        <span className="card__item-value">{character?.species}</span>
                    </li>
                    <li className="card__item">
                        <span className="card__item-label">Origin </span>
                        <span className="card__item-value">{character?.origin.name}</span>
                    </li>
                    <li className="card__item">
                        <span className="card__item-label">Episodes where appear </span>
                        <span className="card__item-value">{character?.episode.length}</span>
                    </li>
                </ul>
            </section>
        </article>
    )
}

export default ResidentInfo