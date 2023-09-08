import Item from './Item';

function PackingList({ items, updateList, removeItem }) {
    return (
        <div className="list">
            <ul>
                {items?.map(item => <Item item={item} key={item.id} updateList={updateList} removeItem={removeItem} />)}
            </ul>
        </div>
    )
}

export default PackingList;