/**
 * The Mediator DS is used to reduce the complexity of communication between multiple objects or classes.
 * It creates a master object that controls the communication between the objects. This promotes loose coupling and allows for
 * easy extensibility via inheritance.
 *
 * Think of React component such as a edit user dialogue. When we open the edit user dialogue, we need to ensure certain conditions
 * before allowing a user to edit the user. We may even need to force the user to change one selection after they edit another. It would
 * become confusing if each sub-component directly communicated with each other. Instead, we can use a mediator to control the communication
 * between the components.
 */

class Mediator {
	modal: Modal
	okButton: OkWidget
	cancelButton: CancelWidget
	textWidget: TextWidget
	textEntered: boolean = false

	constructor() {
		this.modal = new Modal(this)
		this.okButton = new OkWidget(this)
		this.cancelButton = new CancelWidget(this)
		this.textWidget = new TextWidget(this)
		this.modal.addWidgets([this.okButton, this.cancelButton, this.textWidget])
	}

	public clearWidgetValues() {
		this.textWidget.value = ''
		this.okButton.status = 'unchecked'
		this.cancelButton.status = 'unchecked'
	}

	public widgetChanged(comp: Widget | Modal) {
		if (!this.modal.open) {
			console.log('Modal is closed. How are you clicking buttons?')
			return
		}

		if (comp === this.okButton) {
			console.log('OK button clicked')
			if (this.textEntered) {
				console.log(`Thank you for entering text. Text: ${this.textWidget.getValue()}`)
				this.modal.closeModal()
				this.clearWidgetValues()
			} else {
				this.okButton.status = 'unchecked'
				console.log('Please enter text before clicking OK')
			}
		} else if (comp === this.textWidget) {
			console.log('Text entered')
			if (this.textWidget.getValue() === '') {
				this.textEntered = false
				console.log('You have cleared the text field')
			} else {
				this.textEntered = true
				console.log('You have entered a valid value in the text field')
			}
		} else {
			console.log('Cancel button clicked')
			this.modal.closeModal()
			this.clearWidgetValues()
		}
	}
}

class Modal {
	open: boolean = false
	mediator: Mediator
	widgets: Widget[] = []

	constructor(mediator: Mediator) {
		this.mediator = mediator
	}

	addWidgets(widgets: Widget[]) {
		this.widgets = widgets
	}
	openModal() {
		console.log('Modal opened')
		this.open = true
	}
	closeModal() {
		console.log('Modal closed')
		this.open = false
	}
}

abstract class Widget {
	mediator: Mediator
	constructor(mediator: Mediator) {
		this.mediator = mediator
	}
}

class TextWidget extends Widget {
	public value: string = ''

	getValue() {
		return this.value
	}

	setValue(value: string) {
		this.value = value
		this.mediator.widgetChanged(this)
	}
}

class OkWidget extends Widget {
	public status: 'checked' | 'unchecked' = 'unchecked'
	public clickable: boolean = false

	public click() {
		this.status = 'checked'
		this.mediator.widgetChanged(this)
	}
}

class CancelWidget extends Widget {
	public status: 'checked' | 'unchecked' = 'unchecked'

	public click() {
		this.status = 'checked'
		this.mediator.widgetChanged(this)
	}
}

// Usage
// Calling class methods will mimic a GUI
const mediator = new Mediator()
const { cancelButton, modal, okButton, textWidget } = mediator
// Click button before modal is open
cancelButton.click()
modal.openModal()
// Click OK button without entering text
okButton.click()
cancelButton.click()
// reopen modal
modal.openModal()
// Enter text
textWidget.setValue('Hello World')
// Click OK button
okButton.click()

export {}
