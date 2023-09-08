import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

function Form({ addTripItem }) {
    const nums = Array.apply(null, Array(20)).map(function (x, i) { return i + 1; })
    const [qty, setQty] = useState(1);
    const [itemName, setItemName] = useState('');

    function handleQty(e) {
        setQty(parseInt(e.target.value));
    }

    function handleItemName(e) {
        setItemName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newItem = { id: uuidv4(), description: itemName, quantity: qty, packed: false };
        addTripItem(newItem);
        setQty(1);
        setItemName('');
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select onChange={handleQty} value={qty}>
                {
                    nums.map(num => <option value={num} key={num}>{num}</option>)
                }
            </select>
            <input type="text" placeholder="Item..." onChange={handleItemName} value={itemName} />
            <button>Add</button>
        </form>
    )
}

export default Form;