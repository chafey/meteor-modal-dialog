# meteor-modal-dialog

This repository contains a prototype mini framework for dialog management in meteor using bootstrap 3 and a test
harness to help with development and illustrate its use.  This will probably be broken out into a separate
package once it matures.

Features
========

* automatic mapping of data from DOM elements in a template to properties in an object
    * The element must use the name attribute to describe which property to map the value into int the object
* hook for customized initialization
* hook for customized data mapping
* hook for customized validation logic
* hook for customized saving
* automatic insert or update to a collection when saved
* automatically sets the focus to the element with the autofocus attribute when the dialog is shown
* template oriented naming conventions minimizes configuration effort

Backlog
=======
* revisit the data clearing mechanism - removing the dialog from the DOM seems hacky and may not be reliable.
  Maybe inject the dialog into the DOM via Blaze.renderWithData()
* make the clearing of the dialog data optional
  NOTE: injecting the dialog each time via Blaze.renderWithData() would allow control over this
* consider using the data property of the template instance rather than {{dialogData}
  NOTE: this would impact the automated data clearing mechanism
* consider replacing use of session with ReactiveVar
* consider automatically showing dialogs that are currently shown during a hot code reload
* consider moving the hooks into the template itself?

* consider adding support for arrays and child objects (NOTE: possible now via customized data mapping hook)
* add support for mapping to Number types (NOTE: possible now via customized data mapping hook)
* add support for mapping to Date types (NOTE: possible now via customized data mapping hook)
* create a generic validator mechanism to integrate with third party packages (e.g. SimpleSchema)
  (NOTE: possible now via customized validation logic hook)
* create a generic mapping mechanism to integrate with third party packages (e.g. bootstrap datetime picker)
  (NOTE: possible now via customized data mapping hook and customized initialization hook)
