# The memo game, by Sylvain Brochard

I decided to start from a fresh React project and to use static files.

The idea was to create an array of object containing images properties like path and categories (themes).
The array is first shuffled, then truncated with desired number of images to play with (8 by default) and concatenated with itself to create pair of images and finaly shuffled again.

MemoryContainer is the card deck component. It holds the state of the game and controls the Cards component that display the picture or the back of the card depending on the game state. I used a ready-made component to animate the Card (react-card-flip).

Finaly, when the player find all pairs, a button is displayed to reset the game and play again.

# installation

git clone git@github.com:sylv1b/memogame.git
cd memogame
npm install
npm start
