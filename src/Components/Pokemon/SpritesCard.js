import React, { useContext } from 'react'
import {PokeContext} from "../../Context/PokeContext"


const SpritesCard = () => {
    const {pokeData} =useContext(PokeContext)
  
    return ( 
    <div className="sprite-cont">
        <h2 className="heading" >Sprites</h2>

        <div className="sprite-card">
            {
                Object.keys(pokeData.sprites).slice(0,-2).map((sprite,i)=>(
                    <div key={i}>
                    {
                        
                        pokeData.sprites[sprite] && <img className="sprtie-pic" src={pokeData.sprites[sprite] } alt=""/>
                    }
                    </div>
                ))
            }
            
            
          </div>
    </div>
     );
}
 
export default SpritesCard;