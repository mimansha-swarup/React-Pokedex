import React, { useContext } from 'react'
import {PokeContext} from "../../Context/PokeContext"


const PokeStats = () => {
    const {pokeData} =useContext(PokeContext)
    return (
        <div className="stat-holder">
            <h2>Base stats</h2>
            <table className="stat-table" >
                <tbody>


                {
                    Object.keys(pokeData.stats).map((stat,i)=>(
                                               
                        <tr key={i} >
                            <td className="stat-label" >{stat}</td>
                            <td>

                            <div className="bar-chart" style={{width:pokeData.stats[`${stat}`], background:pokeData.themeColor }}></div>
                            </td>
                            <td className="stat-value" >{pokeData.stats[`${stat}`]}</td>
                            
                        </tr>
                        )
                    )
                    // pokeData.stats.map(e=>console.log(e))
                }
                </tbody>
                
            </table>
           
            
        </div>
    );
}

export default PokeStats;