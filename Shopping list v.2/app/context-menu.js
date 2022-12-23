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
			this.menus.elements = templateName
		} else{
			throw 'No template with that name!'
		}
	}

	showContextMenu(element){
		let found = false
		let menuKeys = Object.keys(this.menus)
		for (let i = 0; i < menuKeys.length; i++){ // Loop though all the objects in this.menus. If the element is found parse elements context menu
			let elements = menuKeys[i]
			if (elements.includes(element) == true){
				this.parseShowTemplate(this.menus.elements, element)
				found = true
				break
			}
		}
		if (found == false){
			this.parseShowTemplate(this.templates.Default_, element)
		}
	}

	parseShowTemplate(template, element){
		while (this.contextMenuDivision.lastElementChild){
			this.contextMenuDivision.removeChild(this.contextMenuDivision.lastElementChild)
		}
		let templateKeys = Object.keys(template)
		templateKeys.forEach((key) => {
			let func = template[key]
			if (func =! null){
				let button = document.createElement('button')
				button.innerHTML = key
				button.onclick = function() {return template[key](element)}
				this.contextMenuDivision.appendChild(button)
			}
		})

		this.contextMenuDivision.style.display = 'block'
		this.contextMenuDivision.style.top = `${this.y}px`
		this.contextMenuDivision.style.left = `${this.x}px`
	}
}