import { useState } from 'react';

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: true },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!description) return;
    
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select 
        value={quantity} 
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <input 
        type="text" 
        placeholder="Item..." 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input 
        type="checkbox" 
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
        {item.description} ({item.quantity})
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item 
            key={item.id} 
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentage = numItems > 0 ? Math.round((numPacked / numItems) * 100) : 0;
  
  return (
    <footer className="stats">
      <em>
        {numItems === 0 
          ? "Start adding some items to your packing list!"
          : `You have ${numItems} items in the list. You already packed ${numPacked} (${percentage}%).`
        }
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items => 
      items.map(item => 
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList 
        items={items} 
        onDeleteItem={handleDeleteItem} 
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
