import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function App() {
  const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false }
  ];

  const [items, setItems] = useState([]);

  useEffect(() => {

    // setItems(JSON.parse(localStorage.getItem('items')));
  }, [])

  function addTripItem(newItem) {
    if (newItem.description) {
      setItems([...items, newItem]);
    }

    // localStorage.setItem('items', JSON.stringify([...items, newItem]))
  }

  function updateList(item) {
    const updatedItems = items?.map(itemEl => {
      if (itemEl.id === item.id) {
        return { ...itemEl, packed: item.packed };
      }
      return itemEl;
    })

    setItems(updatedItems)
    localStorage.setItem('items', JSON.stringify(updatedItems));
  }

  function removeItem(id) {
    const filteredItem = items.filter(el => el.id !== id)
    setItems(filteredItem)
    localStorage.setItem('items', JSON.stringify(filteredItem))
  }

  function reset() {
    setItems([])
    localStorage.setItem('items', JSON.stringify([]));
  }

  function sortItems(sortBy) {
    switch (sortBy) {
      case "sortByQty":

        const sortedQty = [...items].sort((a, b) => a.quantity - b.quantity)
        setItems(sortedQty)
        break;

      case "sortByDesc":

        const sortedDesc = [...items].sort((a, b) => {
          if (a.description < b.description) {
            return -1;
          }
          return 0;
        })
        setItems(sortedDesc)
        break;

      case "sortByPackedSatus":
        const sortedByPacked = [...items].sort((a, b) => Number(b.packed) - Number(a.packed));
        setItems(sortedByPacked)
        break;

      default:
        break;
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form addTripItem={addTripItem} />
      <PackingList items={items} updateList={updateList} removeItem={removeItem} />
      <Sort reset={reset} sortItems={sortItems} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away  💼</h1>
}

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

function PackingList({ items, updateList, removeItem }) {
  return (
    <div className="list">
      <ul>
        {items?.map(item => <Item item={item} key={item.id} updateList={updateList} removeItem={removeItem} />)}
      </ul>
    </div>
  )
}

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

function Sort({ reset, sortItems }) {

  function handleReset() {
    reset();
  }

  function handleSort(e) {
    sortItems(e.target.value)
  }

  return (
    <div className='sort'>
      <select onChange={handleSort}>
        <option value="">Sort by</option>
        <option value="sortByQty">Sort by Quantity</option>
        <option value="sortByDesc">Sort by description</option>
        <option value="sortByPackedSatus">Sort by packed status</option>
      </select>

      <button onClick={handleReset}>Reset List</button>
    </div>
  )
}

function Stats({ items }) {
  const numberOfPackedItems = items?.filter(item => item.packed).length;
  const ratio = (numberOfPackedItems / items?.length) * 100

  return <div className="stats">💼 You have {items?.length} items on your list,and you already packed {numberOfPackedItems} ({parseInt(ratio)}%)</div>
}