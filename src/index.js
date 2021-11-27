import './styles/main.scss'
import example from './images/bg.png'
import cat from './images/nyancat.jpg'

// Create a class property without a constructor
class Game {
  name = 'Violin Charades'
}
const myGame = new Game()
// Create paragraph node
const p = document.createElement('p')
p.textContent = `I like ${myGame.name}.`

// Create heading node
const heading = document.createElement('h1')
heading.textContent = 'Interesting!'

// Create image node
const img = document.createElement('img')
img.src = example
img.style.width = 300 + 'px'
img.style.height = 'auto'

// Append SVG and heading nodes to the DOM
const app = document.querySelector('#root')

app.append(heading, p, img)
