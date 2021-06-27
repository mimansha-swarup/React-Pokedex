import React, { useContext } from 'react'
import {PokeContext} from "../../Context/PokeContext"


const PokeDataCard = () => {
    const {pokeData,typeColor} =useContext(PokeContext)
  
    return ( 
        <div className="data-card">
          <hr/>
          {/*Height*/}
          <div className="row">
              <p className="data-label" >Height: </p>
              <p className="data-label" >:</p>
              <p>{pokeData.height/10} m</p>
            </div>
            <hr/>
              {/*Weight*/}
            <div className="row">
              <p className="data-label">Weight</p>
              <p className="data-label" >:</p>
              <p>{pokeData.weight/10} kg</p>
            </div>
            <hr/>
            {/*Habitat*/}
            <div className="row">
             <p className="data-label" >Habitat</p>
             <p className="data-label" >:</p>
             <p>{pokeData.habitat?.name}</p>
             </div>
            <hr/>
            {/*Base Experience*/}
            <div className="row">
             <p className="data-label" >Base Exp</p>
             <p className="data-label" >:</p>
             <p>{pokeData.baseExp}</p>
             </div>
            <hr/>
            {/*Catch Rate*/}
            <div className="row">
             <p className="data-label" >Catch Rate</p>
             <p className="data-label" >:</p>
             <p>{pokeData.catchRate}</p>
             </div>
             <hr/>
              {/*Type*/}
              
            <p className="data-label" >Type</p>
            <div className="row">
              {
                pokeData.types.map((type,i)=>(
                  <div key={i} style={{background:typeColor[type.name] }} className="poke-badge" >{type.name}</div>
                  ))
                }
            </div>
            <hr/>
            {/*Abilities*/}
            <p className="data-label" >Abilities</p>
            <div className="row">
            {
              pokeData.abilities.map((ability,i)=>(
                <div key={i}  style={{background:ability["is_hidden"]? "#78716C":"#64748B" }} className="poke-badge" >{ability.ability.name}</div>
              ))
            }
            </div>
            <hr/>
             

          </div>
     );
}
 
export default PokeDataCard;