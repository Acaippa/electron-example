const {ipcRenderer} = require('electron')

import {ContextMenu} from "./context-menu.js"

const fs = require("fs")

var json = fs.readFileSync('app/items.json', {encoding:'utf8', flag:'r'}) // Get template from items.json

json = JSON.parse(json)

const template = json["template"]

const items = json["items"]
	
const form = document.querySelector("#add-item-form")

const itemList = []

const itemContainer = document.querySelector("#item-container")

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
		itemList.push(item)
	}
	updateItemContainer()
}

function addItem(){
	let item = {}
	for (let i = 0; i < form.children.length; i++){
		let input = form.children[i]
		if (input.type != "submit"){
			item[input.name] = input.value
		}
	}
	itemList.push(item)
	updateItemContainer()
}

function removeItem(item){
	let itemIndex = itemList.indexOf(item)
	itemList.splice(itemIndex, 1)
	updateItemContainer()
}

function clearChildren(element){
	let last = element.lastElementChild

	while (last){
		element.removeChild(last)
		last = element.lastElementChild
	}
}

function updateItemContainer() {
	clearChildren(itemContainer)
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

		heading.innerHTML = `${item.name.charAt(0).toUpperCase()}${item.name.slice(1)}` // Capitalize the first letter
		amount.innerHTML = `Amount: ${item.amount}`
		notes.innerHTML = `Notes: ${item.notes}`

		element.appendChild(heading)
		element.appendChild(amount)
		element.appendChild(notes)

		itemContainer.appendChild(element)
	}
}
generateForm()
loadItems() // Load items from JSON

ipcRenderer.on('json:save', (e) => {
	json.items = itemList
	fs.writeFile('app/items.json', JSON.stringify(json), (err) => {
		if (err){
			console.log(err)
		}else{
			ipcRenderer.send("app:close", {})
		}
	})
})

let contextMenu = new ContextMenu()

contextMenu.createMenu("test", {
	"Remove item" : function(element) {removeItem(element)},
	"Duplicate item" : function(element) {duplicateitem(element)}

})
contextMenu.bindMenu("document.querySelectorAll('.item-div')*", "test")

