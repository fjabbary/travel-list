import { useState } from 'react';
import Logo from './components/Logo';
import Form from './components/Form';
import PackingList from './components/PackingList';
import Sort from './components/Sort';
import Stats from './components/Stats';

export default function App() {

  const [items, setItems] = useState([]);

  function addTripItem(newItem) {
    if (newItem.description) {
      setItems([...items, newItem]);
    }
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