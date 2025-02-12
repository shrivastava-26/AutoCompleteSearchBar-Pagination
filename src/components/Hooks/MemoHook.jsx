import React, { useMemo } from "react";

function FilteredList({ items, filterText }) {
    

  const filteredItems = useMemo(() => {
    console.log("Filtering items...");
    return items.filter((item) => item.includes(filterText));
  }, [items, filterText]);


  return (
    <ul>
      {filteredItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default FilteredList;
