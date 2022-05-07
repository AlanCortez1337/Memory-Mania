import { useState } from 'react'
import shuffle from './utilities/shuffle'
import './App.css'

function App() {
  const [cards, setCards] = useState(shuffle);


  return (
    <div>
      <h1>yo mama</h1>
      {/* images are broken lol */}
      <img src="./images/image1.jpg" alt="asdfsad" />

      {cards.map((card) => {
        return (<img src="./images/image1.jpg" alt="asdfd" />);
        // <h1>1</h1>
        // <img src={card.image} alt="asdf" />
      })}
    </div>
  )
}

export default App
