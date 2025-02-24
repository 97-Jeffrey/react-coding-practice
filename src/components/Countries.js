
import React, { useState } from "react";
import '../styles/countries.css'

const Countries = ({ data }) =>{
   
    const [newData, setNewData] =useState(
        [...Object.keys(data), ...Object.values(data)]
        .map(item=> ({name: item, error: false}))
        .sort(()=> Math.random()-0.5)
    )
    const [selected, setSelected] = useState('')




    const handleItemSelect = (name) =>{

        // re-select after wrong match
       if(newData.filter(each=> each.error ===true).length ===2){  
            setNewData([...newData].map(each =>({...each, error:false })))
            setSelected(name)
            return;
       }
       
       if(!selected){
            setSelected(name);
            return;
       } 
       // if two words are a match
       if(name ===data[selected] || data[name] === selected){
            setNewData([...newData].filter(each=> each.name !== name && each.name!== selected ))
            setSelected('')
       }
       //if two words are wrong
       else{
           setNewData([...newData].map(each=> each.name ===name || each.name=== selected? {...each, error:true }: each ))
       }

    }

    if(!newData.length) return <h1>Congradulation!!!</h1>

    
    return (

        <>
         <div className='countries'>
             {
                newData.map(item=> 
                <div 
                    className={
                        item.error? 
                        `country-error`:
                        item.name===selected? 
                        `country-selected`:
                        `country` }
                    key={item.name}
                    onClick={()=> handleItemSelect(item.name)}
                >
                    {item.name}
                </div>)
             }
         </div>
        </>
    )
}

export default Countries