# meteor-modal-dialog

This repository contains a prototype mini framework for dialog management in meteor using bootstrap 3 and a test
harness to help with development and illustrate its use.  This will probably be broken out into a separate
package once it matures.

Features
========

* automatic mapping of data from DOM elements in a template to properties in an object
    * The element must use the name attribute to describe which property to map the value into int the object
    * this gives you the benefits of two way data binding but gives flexibility with mapping and
      works with blaze, not against it
* hook for customized data mapping
    * for cases the automaper can't handle (e.g. making an API call to get a value)
* hook for customized validation logic
* hook for customized saving
    * simpleUpsert is included to automatically insert or update to a collection when saved
    * can also provide your own function to save via meteor methods or otherwise
* automatically sets the focus to the element with the autofocus attribute when the  dialog is shown
* template oriented naming conventions minimizes configuration effort

Backlog
=======
* revisit the data clearing mechanism - removing the dialog from the DOM seems hacky and may not be reliable.
  Maybe inject the dialog into the DOM via Blaze.renderWithData()
* make the clearing of the dialog data optional?  Not sure what the use case is for this
  NOTE: injecting the dialog each time via Blaze.renderWithData() would allow control over this
* consider using the data property of the template instance rather than {{dialogData}
  NOTE: this would impact the automated data clearing mechanism
* consider replacing use of session with ReactiveVar
  NOTE: The counter against this is that it would not survive hot code reload
* consider moving the hooks into the template itself?  This might be bad practice..

* consider adding support for arrays and child objects (NOTE: possible now via customized data mapping hook)
* add support for mapping to Number types (NOTE: possible now via customized data mapping hook)
* add support for mapping to Date types (NOTE: possible now via customized data mapping hook)
* create a generic validator mechanism to integrate with third party packages (e.g. SimpleSchema)
  (NOTE: possible now via customized validation logic hook)
* create a generic mapping mechanism to integrate with third party packages (e.g. bootstrap datetime picker)
  (NOTE: possible now via customized data mapping hook and customized initialization hook)
