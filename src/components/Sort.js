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

export default Sort;