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
  //Scores
  const [totalClicks, setTotalClicks] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [totalMismatches, setTotalMismatches] = useState(0);
  const [mismatches, setMismatches] = useState(0);
  const [wins, setWins] = useState(0);
  //Message
  const [message, setMessage] = useState('');


  const handleClick = (card) => {
    if(!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
      setClicks(clicks + 1);
      
    setTotalClicks(totalClicks + 1);
    } 
  }

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  }

  const handleReveal = () => {
    setRevealAll(false);
    setTimeout(()=>{
      setRevealAll(true);
    }, 1000);
  }
  // Session Begins
  useEffect(()=>{
    handleReveal();
    let playerScores = window.localStorage.getItem('PLAYER_SCORES');
    if(playerScores !== null) {
      setWins(JSON.parse(playerScores).totWins);
      setTotalClicks(JSON.parse(playerScores).totClicks);
      setTotalMismatches(JSON.parse(playerScores).totMismatches);
    }
  },[])
  // Wins, total Clicks and Misclicks changed
  useEffect(()=>{
    // as long as clicks is not 0 it should not override the other values to 0
    // EX: when game intially startes, setClicks by default is 0 and it changes state from stored value
    // hence triggers this useEffect() and overrides it to 0
    if(totalClicks !== 0) {
      window.localStorage.setItem('PLAYER_SCORES', JSON.stringify({
        totWins: wins,
        totClicks: totalClicks,
        totMismatches: totalMismatches
      }));
    }


  },[wins, totalClicks, totalMismatches])



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
        setMismatches(mismatches + 1);
        setTotalMismatches(totalMismatches + 1);
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
      setRevealStats(true);
      handleNotification();
      setTimeout(() => {
        handleNewScores();
        console.log('Winner!!!', wins);
        setActiveGame(false);
        handleTurn();
        setCards(shuffle);
        setTimeout(() => { 
          setRevealStats(false);
          handleReveal(); 
        }, 1500);
      }, 1200);

    }

  },[cards, wins]);

  const handleNewScores = () => {
    setWins(wins + 1);
    setTimeout(()=>{
      setClicks(0);
      setMismatches(0);   
    },3000);
  }

  const handleNotification = () => {
    const notifications = [
        `Wow relax, you clicked a total of ${totalClicks} times`,
        `Wow you really need to remember more, you had ${totalMismatches} mismatches this game`,
        `Well I suppose ${totalMismatches} mismatches could be worse...`,
        `Not bad you've clicked ${totalClicks} times so far :)`,
        `Don't worry I know it your ${totalMismatches} mismatches were misclicks ;)`,
        "🔥🔥💯💯 You're epic swag master 💯💯🔥🔥",
        "Did you know that you are playing a game?",
    ]

    setMessage(notifications[Math.floor(Math.random() * 7)]) ;
};

  const handleNewGame = () => {
    setWins(0);
    handleTurn();
    setCards(shuffle);
    setTotalClicks(0);
    setMismatches(0);
    setClicks(0);
    setMismatches(0);
    handleReveal();
    window.localStorage.setItem('PLAYER_SCORES', JSON.stringify({
      totWins: 0,
      totClicks: 0,
      totMismatches: 0
    }));
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
        <ScoreBoard 
          revealScore={revealStats} //
          amtClicks={clicks}
          amtMismatches={mismatches}
          message={message}
        />
    </div>
  )
}

export default App
