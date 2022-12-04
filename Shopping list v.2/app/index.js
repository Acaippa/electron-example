const ipcRenderer = require('electron').ipcRenderer
const itemList = [] // TODO: make item template

function addItem(form) {
	if validateForm(form) {
		appendToItemList(form)
		updateDiv()

	} else {
		raiseInvalidInput(form)
	}
}

function deleteItem(item) {
	removeItem(item)
	updateDiv()
}

function editItem(item) {
	editItemPopUp(item)
}

function duplicateItem(item) {
	itemList.push(item)
	updateDiv()
}

function validateForm(form) { // Loop though all the items inside form and check if input, and if allowed to be empty.
	for(let i = 0; i < form.children.length; i++){
		let tagName = form.children[i].tagName
		if (tagName == "input"){
			// TODO: Check if the inputs name ends with "_"
			// TODO: Check if the input is empty or not
			return true
		} else {
			return false
		}
	}
}

function raiseInvalidInput(input) { // Change the border color of empty inputs to red
	input.classList.add("invalidInput")
}

function appendToItemList(form) {
	let tempItem = {}
	for (let i = 0; i < form.children.length; i++){
		let formChild = form.children[i]
		if (formChild.tagName = "input"):
			// TODO: Add all keys and values to tempItem and add to itemList
	}
}

function createForm(evt, message) { // Create and configure an input in the form
	let form = document.querySelector(".inputForm")
	for (let i = 0; i < message.length; i++) {
		if (message[i][message.length - 1] !== "_") { // Check if the name ends with "_"
			let templateItem = message[i]
			let input = document.createElement("input")
			input.type = Object.values(message)[i] // Get the value of the key at the current index
			form.appendChild(input)
		}
	}
}

ipcRenderer.on("form:create", createForm(event, message))

function removeItem(item) { // Loop through itemList then find and remove the item with similar ID
	for (let i = 0; i < itemList.length; i++){
		let item = itemList[i]
		if (item.ID == item.ID){
			ïtemList.remove[i]
		}
	}
}

function updateItemvalues(item, dict) { // Update the item paramater according to dictionary with parameters and values
	// ! Potential security hazard. Client may be able to add own functions into item
	let item = item
	let dict = dict

	for (let i = 0; i < dict.length; i++){
		item[dict[i]] = dict[i].keys[i]
	}
}

function editItemPopup(item){
	ipcRenderer.send("item:edit", item)
}

ipcRenderer.on("item:editdone", (e, msg) => updateItemvalues(msg))