export class ContextMenu {
	constructor() {
		this.menuElementBindings = {} // Binds elements with a contextMenuTemplate
		this.contextMenuTemplates = {
			"Default_" : {
				"Default button" : function(elem) {console.log("Element: ", elem)}
			}
		}

		// Create contextMenu element
		this.contextMenuDivision = document.createElement('div')
		this.contextMenuDivision.classList.add('context-menu')
		document.body.appendChild(this.contextMenuDivision)

		// Overriding documents contextMenu event
		document.addEventListener("contextmenu", (event) => {this.x = event.x, this.y = event.y; this.showContextMenu(event.target)})

		// Events that hides the contextMenu
		document.addEventListener("click", (event) => {this.hideContextMenuDiv()})
		document.addEventListener("mousewheel", (event) => {this.hideContextMenuDiv()})
	}
	

	createMenu(name, template){ // Add template to this.contextMenuTemplates
		if (template.constructor == Object){ // Check if template is a dictionary
			this.contextMenuTemplates[`${name}`] = template
		}else{
			throw 'Template needs to be an Object!'
		}
	}

	hideContextMenuDiv(){
		this.contextMenuDivision.style.display = 'none'
	}

	bindMenu(elements, templateName){
		if (this.contextMenuTemplates.hasOwnProperty(templateName)){ // Check if a template with templateName exists in this.contextMenuTemplates
			this.menuElementBindings[`${templateName}`] = elements // Bind the name of the template to a collection of elements
		} else{
			throw 'No template with that name!'
		}
	}

	showContextMenu(element){ // Check if the element has a template bounded to it
		let found = false
		let menuKeys = Object.keys(this.menuElementBindings)

		for (let i = 0; i < menuKeys.length; i++){ // Loop though all the objects in this.menuElementBindings. If the element is found parse elements context menu

			let templateName = menuKeys[i]

			let elements = this.updateQuery(this.menuElementBindings[templateName])

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

		let template = this.contextMenuTemplates[templateName]

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

	updateQuery(query){
		let elements = null

		if (query.charAt(query.length-1) == "*"){ // Include the children in query
			elements = Array.from(eval(query.slice(0, query.length-1)))
			elements.forEach((element) => {
				let children = Array.from(element.children)
				children.forEach((child) => {
					elements.push(child)
				})
			})
		}else{
			elements = Array.from(eval(query))
		}

		return elements
	}
}