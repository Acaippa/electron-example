export class ContextMenu {
	constructor() {
		this.menus = {}
		this.templates = {
			"Default_" : {
				"Default button" : function(elem) {console.log("Element: ", elem)}
			}
		}

		this.contextMenuDivision = document.createElement('div')
		this.contextMenuDivision.classList.add('context-menu')
		document.body.appendChild(this.contextMenuDivision)

		document.addEventListener("contextmenu", (event) => {this.x = event.x, this.y = event.y; this.showContextMenu(event.target)})

		document.addEventListener("click", (event) => {this.hideContextMenuDiv()})
		document.addEventListener("mousewheel", (event) => {this.hideContextMenuDiv()})
	}

	createMenu(name, template){ // Add Ojbect to this.templates with name as the key and template as the value.
		if (template.constructor == Object){
			this.templates[`${name}`] = template
		}
		else{
			throw 'Template needs to be an Object!'
		}
	}

	hideContextMenuDiv(){
		this.contextMenuDivision.style.display = 'none'
	}

	bindMenu(elements, templateName){
		if (this.templates.hasOwnProperty(templateName)){ // If there is a template with this name, add an object with the elements being the key and the template name being the value.
			this.menus[`${templateName}`] = elements // Bind the name of the template to a certain collection of elements
		} else{
			throw 'No template with that name!'
		}
	}

	showContextMenu(element){ // Check if the element has a template bounded to it
		let found = false
		let menuKeys = Object.keys(this.menus)

		for (let i = 0; i < menuKeys.length; i++){ // Loop though all the objects in this.menus. If the element is found parse elements context menu

			let templateName = menuKeys[i]

			let elements = Array.from(this.menus[templateName])

			if (elements.includes(element) == true){
				this.parseShowTemplate(templateName, element)
				found = true
				break
			}
		}
		if (found == false){
			this.parseShowTemplate("Default_", element)
		}
	}

	parseShowTemplate(templateName, element){ // Convert the template into context menu and display it
		while (this.contextMenuDivision.lastElementChild){
			this.contextMenuDivision.removeChild(this.contextMenuDivision.lastElementChild)
		}

		let template = this.templates[templateName]

		let templateItems = Object.keys(template)

		templateItems.forEach((item) => {
			let func = template[item]

			if (func =! null){
				let button = document.createElement('button')
				button.innerHTML = item
				button.onclick = function() {return template[item](element)}
				this.contextMenuDivision.appendChild(button)
			}
		})

		this.contextMenuDivision.style.display = 'block'
		this.contextMenuDivision.style.top = `${this.y}px`
		this.contextMenuDivision.style.left = `${this.x}px`
	}
}