
import '../App.css';
import { useState } from 'react';

const InputTag = () => {

    const [tags, setTags] = useState([]); // State to store tags
    const [inputValue, setInputValue] = useState(""); // State for input field
    
      // Function to add a tag
    const addTag = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
        setTags([...tags, inputValue.trim()]); // Add new tag to the list
        setInputValue(""); // Clear the input field
    }
    };
    
      // Function to remove a tag
    const removeTag = (indexToRemove) => {
       setTags(tags.filter((_, index) => index !== indexToRemove)); // Filter out the tag to remove
    };
    
    return (
    <div className="tag-container">
        <div className="tags">
        {tags.map((tag, index) => (
            <div key={index} className="tag">
                <span>{tag}</span>
                <span className="remove-tag" onClick={() => removeTag(index)}>
                    ×
                </span>
            </div>
        ))}
        </div>
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={addTag}
            placeholder="Add a tag..."
        />
    </div>
    )

}

export default InputTag