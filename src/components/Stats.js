function Stats({ items }) {
    const numberOfPackedItems = items?.filter(item => item.packed).length;
    const ratio = (numberOfPackedItems / items?.length) * 100

    return <div className="stats">💼 You have {items?.length} items on your list,and you already packed {numberOfPackedItems} ({parseInt(ratio)}%)</div>
}

export default Stats;