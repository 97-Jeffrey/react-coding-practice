import { useState , useEffect } from "react"
import '../styles/colorPicker.css'

const ColorPicker  =() =>{

    const colorOptions = [
        "#FF5733", // Red-Orange
        "#33FF57", // Green
        "#3357FF", // Blue
        "#F1C40F", // Yellow
        "#8E44AD", // Purple
        "#E74C3C", // Red
        "#1ABC9C", // Teal
        "#2ECC71", // Emerald Green
        "#3498DB", // Light Blue
        "#9B59B6"  // Lavender
    ]

    const [colors, setColors] = useState([])
    const [selectedColor, setSelectedColor] = useState('')
    const [triggerNext, setTriggerNext] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    useEffect(()=>{
        const newColors = colorOptions.sort(()=> Math.random()-0.5).slice(0,3)
        const newSelectedColr = newColors[Math.floor(Math.random()* newColors.length)];
        setColors(newColors);
        setSelectedColor(newSelectedColr)

    }, [triggerNext]);

    const handleButtonClick  = (color) => {
        setSuccess(false)
        setError(false)

        if(color === selectedColor) {
            setSuccess(true)
            setTriggerNext(prev => !prev)
            return
        }else{
            setError(true)
        }
    }
    
    console.log(selectedColor)





    return (
        <>
           <div className="color-container">
              <div className='color-block' style={{ backgroundColor: selectedColor }}>
                
              </div>
              <div className='color-list'>
                {colors.map((color, index)=> (
                    <button onClick={()=>handleButtonClick(color)} key={index}>{color}</button>
                ))}

              </div>

              <div className={error? 'error-message': 'correct-message'}>{error? 'Wrong Answer': success? 'Right Answer':''}</div>

           </div>
        </>
    )
}


export default ColorPicker