const fs = require("fs")

let template = "gay"

fs.readFile("app/items.json", "utf-8", (err, contents) => {getTemplate(err, contents)})

function getTemplate(err, contents){
	template = contents
}

function generateForm() {
	let form = document.querySelector(".add-item-form")
}

console.log(template)