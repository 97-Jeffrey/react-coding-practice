import '../../styles/color.css'
import { useState } from 'react'

const Color = ({ data }) =>{

    const colors = Object.values(data);
    const [showColorTable, setShowColorTable] =useState(false)
    const [selectedColors, setSelectedColors] = useState([])

    const handleToggleButton = () =>{
       setShowColorTable(prev => !prev)
    }

    const handleColorsSelect =(color) =>{
        if(selectedColors.includes(color)){
            setSelectedColors(prev=> [...prev].filter(eachColor=>eachColor !==color))
        }else{
            setSelectedColors(prev=> [...prev, color])
        }
    }

    const handleColorClear = () =>{
        setSelectedColors([])
        setShowColorTable(false)
    }

    return (
        <>
           <div className='container'>
           <div className='button-group'>
              <button className='button' onClick={handleToggleButton}>
                Select colors 
                {selectedColors.length? 
                `: ${selectedColors.length} selected`:
                ""}
              </button>
              <button className='button' onClick={handleColorClear}>Clear all</button>
           </div>

           {
            showColorTable 
               &&
            <div className='color-picker'>
                {colors.map(color=> (<div 

                    key={color.name} 
                    className='color-tile'
                    style={{ backgroundColor: color.hex}}
                    onClick={()=> handleColorsSelect(color.name)}
                    >
                        {selectedColors.includes(color.name)? 'X':""}
                    </div>
                ))}
            </div>
            }


           <table>
                <thead> 
                    <tr> 
                    <td>Color Name</td>
                    <td>Color Hex #</td>
                    </tr>
    
                </thead>
                <tbody>
                    {colors
                    .filter(eachColor=> selectedColors.length? selectedColors.includes(eachColor.name): eachColor  )
                    .map(color=> (<tr key={color.name}> 
                        <td>{color.name}</td>
                        <td>{color.hex}</td>
                    </tr>))}
                   
                </tbody>
            </table>
            </div>
        </>
    )
}

export default Color;