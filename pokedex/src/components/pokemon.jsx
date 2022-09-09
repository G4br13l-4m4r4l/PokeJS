import React, {useEffect, useState} from "react";
import axios from 'axios';

export default function Poke(){

    const [pokemon, setPokemon] = useState("");
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonType, setPokemonType] = useState("");

    const getPokemon = async ()=>{
        const toArray = [];
        try{
            const url = `https:pokeapi.co/api/v2/pokemon/${pokemon}`;
            const res = await axios.get(url);
            toArray.push(res.data);
            setPokemonType(res.data.types[0].type.name);
            setPokemonData(toArray);
            console.log(res);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getPokemon();
    },[]);

    const handleChange = (e)=>{
        setPokemon(e.target.value.toLowerCase());
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        getPokemon();
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" onChange={handleChange} placeholder="Enter the pokemon name"/>
                </label>
            </form>
            {pokemonData.map((data) =>{
                return(
                    <div className="container">
                        <img src={data.sprites["front_default"]}/>
                        <div className="divTable">
                            <div className="divTableBody">
                            <div className="divTableRow">
                                <div className="divTableCell">Type</div>
                                <div className="divTableCell">{pokemonType}</div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">Height</div>
                                <div className="divTableCell">{" "}{Math.round(data.height*3.9)}</div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">Weight</div>
                                <div className="divTableCell">{" "}{Math.round(data.weight /4.3)} lbs</div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">Number of battles</div>
                                <div className="divTableCell">{data.game_indices.length}</div>
                            </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}