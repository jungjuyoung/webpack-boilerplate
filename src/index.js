import './styles/main.scss';
import cat from './images/nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
  // document.body.innerHTML = `<img src="${cat}"/>`
});

// Create a class property without a constructor
class Game {
  name = 'Violin Charades';
}
const myGame = new Game();
// Create paragraph node
const p = document.createElement('p');
p.textContent = `I like ${myGame.name}.`;

// Create heading node
const heading = document.createElement('h1');
heading.textContent = 'Interesting!';

// Append SVG and heading nodes to the DOM
const app = document.querySelector('#root');

app.append(heading, p);
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
console.log(word);
console.log(api.domain);
