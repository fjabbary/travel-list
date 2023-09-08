function Item({ item, updateList, removeItem }) {

    function handleCheckbox(e, item) {
        e.target.checked ? item.packed = true : item.packed = false;
        updateList(item)
    }

    return (
        <li>
            <input type="checkbox" onChange={(e) => handleCheckbox(e, item)} checked={item.packed} />
            <span className={item.packed ? 'packed' : ''}>{item.quantity} {item.description}</span>
            <button title="remove" className="btn-remove" onClick={(() => removeItem(item.id))}>X</button>
        </li>
    )
}

export default Item;