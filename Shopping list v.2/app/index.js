const fs = require("fs")

const items = JSON.parse(fs.readFileSync('app/items.json', {encoding:'utf8', flag:'r'})) // Get template from items.json

const template = items.template 
	
const form = document.querySelector("#add-item-form")

function makeInput(params){
	let element = document.createElement("input")
	element.type = params.type
	element.name = params.name
	element.placeholder = params.name
	element.classList.add("bg-2")
	form.appendChild(element)
	
}

function makeButtonInput(){
	let button = document.createElement("button")
	button.innerHTML = "Add Item"
	button.onclick = "this.form.submit"
	form.appendChild(button)
}

function generateForm() {
	for (let i = 0; i < Object.keys(template).length; i++){
		let key = Object.keys(template)[i]
		if (key[key.length-1] != "_"){
			let params = {
				"name" : key,
				"type" : template[key]
			}
			makeInput(params)
		}
	}
	makeButtonInput()
}

generateForm()