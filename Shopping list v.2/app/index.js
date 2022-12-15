const fs = require("fs")

const json = JSON.parse(fs.readFileSync('app/items.json', {encoding:'utf8', flag:'r'})) // Get template from items.json

const template = json.template

const items = json.items
	
const form = document.querySelector("#add-item-form")

const itemList = []

const itemDiv = document.querySelector("#item-div")
console.log(itemDiv)

function makeInput(params){
	let element = document.createElement("input")
	element.type = params.type
	element.name = params.name
	element.placeholder = params.name
	element.classList.add("bg-2")
	form.appendChild(element)
	
}

function makeButtonInput(){ // Add button to form
	let button = document.createElement("button")
	button.innerHTML = "Add Item"
	button.onclick = function() {addItem()}
	form.appendChild(button)
}

function generateForm() {
	for (let i = 0; i < Object.keys(template).length; i++){
		let key = Object.keys(template)[i]
		if (key[key.length-1] != "_"){ // Only add items which names do not end with "_"
			let params = {
				"name" : key,
				"type" : template[key]
			}
			makeInput(params)
		}
	}
	makeButtonInput()
}

function loadItems(){
	for (let i = 0; i < items.length; i++) {
		let item = items[i]
		itemList.push(JSON.parse(item))
	}
}

function addItem(){
	let item = {}
	for (let i = 0; i < form.children.length; i++){
		let input = form.children[i]
		item[input.name] = input.value
	}
	itemList.push(item)
	updateItemDiv()
}

function clearChildren(element){
	let last = element.lastElementChild

	while (last){
		element.removeChild(last)
		last = element.lastElementChild
	}
}

function updateItemDiv() {
	clearChildren(itemDiv)
	for (let i = 0; i < itemList.length; i++){
		let item = itemList[i]

		// Convert object to HTML

		let element = document.createElement("div")
		let heading = document.createElement("h3")
		let amount = document.createElement("p")
		let notes = document.createElement("p")

		element.classList.add("item-div")
		heading.classList.add("item-header")
		amount.classList.add("item-amount")
		notes.classList.add("item-notes")

		heading.innerHTML = item.name
		amount.innerHTML = item.amount
		notes.innerHTML = item.notes

		element.appendChild(heading)
		element.appendChild(amount)
		element.appendChild(notes)

		itemDiv.appendChild(element)
	}
}
generateForm()
loadItems() // Load items from JSON

window.onbeforeunload = function() {
	for (let i = 0; i < itemList.length; i++){
		json.items.push(item)
	}
	fs.writeFile('app/items.json', JSON.stringify(json), (err) => {console.log(err)})
	return false
}
