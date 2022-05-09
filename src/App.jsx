import { useState, useEffect } from 'react'
import shuffle from './utilities/shuffle'
import Card from './components/card'
import Header from './components/header'
import ScoreBoard from './components/footer'
import './App.css'

function App() {
  const [revealAll, setRevealAll] = useState(false);
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [activeGame, setActiveGame] = useState(false);
  const [revealStats, setRevealStats] = useState(false);
  const [wins, setWins] = useState(0);

  const handleClick = (card) => {
    if(!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  }

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  }

  const handleReveal = () => {
    setRevealAll(false);
    
    setRevealStats(true);
    setTimeout(()=>{
      setRevealAll(true);
    }, 1000);
  }

  useEffect(()=>{
    handleReveal();
  },[])

  // if there has been any state change on the cards
  useEffect(()=>{
    //used later for if the player guesses incorrectly
    let pickTimer;
    //if the user selects two cards
    if(pickOne && pickTwo) {
      // check if the cards are the same
      if(pickOne.image === pickTwo.image) {
        //if they are we want to update the cards object list to add
        //the new property, matched, to true
        setCards((prevCard) =>{
          // loop through the cards array until we find the matched one
          return prevCard.map((card) => {
            if(card.image === pickOne.image) {
              return {...card, matched: true };
            // if we havent found the match yet then we just return the card
            } else {
              return card;
            }
          });
        });
        // we essentially just reset so that no cards are selected and that we can
        // pick new cards
        handleTurn();
      } else {
      // if we chose incorrectly we have to make it so that the user cant click any more cards
        setDisabled(true);
      // give the user a small timeout to reflect before we give them access to click again
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }
    // just for safety to wipe any unneccessary timeouts
    return () => {
      clearTimeout(pickTimer);
    };
  },[cards, pickOne, pickTwo]);


  //if the player won
  useEffect(()=>{

    const checkWin = cards.filter((card) => !card.matched);
    
    if(cards.length && checkWin.length < 1) {
      setActiveGame(true);
      setTimeout(() => {
        setWins(wins + 1);
        console.log('Winner!!!', wins);
        setActiveGame(false);
        handleTurn();
        setCards(shuffle);
        setTimeout(() => { handleReveal(); }, 1000);
      }, 1200);

    }

  },[cards, wins]);


  const handleNewGame = () => {
    setWins(0)
    handleTurn()
    setCards(shuffle);
    handleReveal();
  };

  return (
    <div className="screen">

      <Header handleNewGame={handleNewGame} wins={wins}/>

      <div className='grid'>
        
        {/* if start or new game => reveal cards for 100ms => once done setTrue => hide cards */}
        { !revealAll ? 
          // Reveals all the cards 
          cards.map((card) => {
            const {image, id} = card
  
            return (
              <Card 
                image={image} 
                selected={true} 
                id={id}
                active={activeGame}
                onClick={() => handleClick(card)}
              />
              );
          }) :
          // Hide Cards 
          cards.map((card) => {
            const {image, id, matched} = card
  
  
            return (
              <Card 
                image={image} 
                selected={card === pickOne || card === pickTwo || matched} 
                id={id}
                active={activeGame}
                onClick={() => handleClick(card)}
              />
              );
          }) 
        
        }
      </div>
        <ScoreBoard revealScore={revealStats}/>
    </div>
  )
}

export default App
