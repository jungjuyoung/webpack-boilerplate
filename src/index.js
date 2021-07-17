import style from './assets/scss/main.scss'
import beati from './assets/images/beauti.png'
import _, { divide } from 'lodash'

const component = () => {
	let img = document.createElement('img')
	let element = document.createElement('div')
	element.innerHTML = _.join(
		[
			'Hello',
			'Webpack',
		],
		''
	)

	const body = document.querySelector('body')
	img.alt = 'beautiful a woman'
	img.width = 500
	img.src = beati

	body.appendChild(img)
	body.appendChild(element)
}
component()
