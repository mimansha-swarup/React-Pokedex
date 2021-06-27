import React, { useContext } from 'react'
import {PokeContext} from "../../Context/PokeContext"


const EggCard = () => {
    const {pokeData} =useContext(PokeContext)
  
    return ( 
        <div className="data-card">
            {/* Egg Group */}
            <hr/>
             <div className="row">
              <p className="data-label" >Egg grp </p>
              <p className="data-label" >:</p>
              <div>
                  
              {
                  pokeData.eggGroups.map(egg=>(
                      <p>
                        {egg.name} 
                    </p>
                ))
            }
              </div>
            </div>
            <hr/>
            {/* Hatch step */}
            <div className="row">
              <p className="data-label" >Hatch Step</p>
              <p className="data-label" >:</p>
              <p>{pokeData.hatchSteps} </p>
            </div>
            <hr/>
            {/* Friendship */}
            <div className="row">
              <p className="data-label" >Friendship</p>
              <p className="data-label" >:</p>
              <p>{pokeData.baseHappiness} </p>
            </div>
            <hr/>
            
            
          </div>
     );
}
 
export default EggCard;