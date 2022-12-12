const fs = require("fs")

const template = fs.readFileSync('app/items.json', {encoding:'utf8', flag:'r'}) // Get template from items.json

function generateForm() {
	let form = document.querySelector(".add-item-form")
}
