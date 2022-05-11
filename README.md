# Memory Mania
This game was inspired by a Fireship.io tutorial and used learn the React library. While this tutorial developed the core flipping and win tally mechanics, I did adapted the original project to my liking.
Feel free to play this [game](https://memory-game-900be.web.app/), once you are done browse the source code and what I changed.

### Tech
- Vite
- React
- Firebase

## I implemented the following features:
- tally to track of ``clicks, misclicks, total clicks, total misclicks``
- A footer bar to display the current clicks and misclicks of the match
- Notification with a personal message that is revealed when the user won
- A little animation when the user matched all the cards  
- Implemented local storage to save the user's wins and total clicks/misclicks on refresh
- Reveal the cards for a brief second at the start of each match

## I modified the following:
- Applied a different color pallete
- Used different pictures of the cards to match
- Changed the button *New Game* => *Wipe Game* in order to reset the local storage tallies and appropriately describe its use
