/**
 * Simple function to set the focus to the element with autofocus in the dialog template
 * @param templateInstance
 */
autoFocus = function(templateInstance) {
  templateInstance.$('.modal').first().on('shown.bs.modal', function () {
    templateInstance.$('[autofocus]').focus();
  });
}