import { useEffect, useState } from "react";
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [basket, setBasket] = useState(localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [])

  useEffect(() => {
    getFetch()
    localStorage.setItem('items', JSON.stringify(basket));
  }, [basket]);

  const getFetch = () => {
    fetch("https://northwind.vercel.app/api/products")
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }
  const remove = (id) => {
    setBasket(basket.filter((x) => x.id !== id))
  }

  const addBasket = (item) => {
    const elementIndex = basket.findIndex((x) => x.id === item.id)
    console.log(elementIndex);
    if (elementIndex !== -1) {
      const newBasket = [...basket]
      newBasket[elementIndex].count++
      setBasket(newBasket)
    }
    else {
      setBasket([...basket, { ...item, count: 1 }])
    }
  }
  const setCountValue = (isAdd, item) => {
    const elementIndex = basket.findIndex((x) => x.id === item.id)
    const newBasket = [...basket]
    if (isAdd) {
      newBasket[elementIndex].count++
      setBasket(newBasket)

    }
    else {
      if (newBasket[elementIndex].count > 0) {
        newBasket[elementIndex].count--
        setBasket(newBasket)

      }
    }
  }

  return (
    <div className="App">
      <div className="basket">
        <h1>Basket</h1>
        {basket.map((item) => (
          <ul>
            <li>{item.id}</li>
            <li>{item.name}</li>
            <div>Count : {item.count}</div>
            <button onClick={() => setCountValue(false, item)}>-</button>
            <button onClick={() => setCountValue(true, item)}>+</button>
            <button onClick={() => remove(item.id, item.count)}>Remove</button>
          </ul>
        ))}
      </div>

      {data.map(x => <ul key={x.id}>
        <li>{x.id}</li>
        <li>{x.name}</li>
        <button onClick={() => addBasket(x)}>Add to Basket</button>

      </ul>)}

    </div>
  )
};


export default App;