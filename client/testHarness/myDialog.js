/**
 * Wrapper function for baseDialog() which applies some behavior custom to several dialogs in our application.  In
 * this case, a helper indicating if we are in edit or add mode but other things could be added to (help button,
 * cancel button handler, etc)
 *
 * @param template
 * @param save
 * @param options
 * @returns {}
 */

myDialog = function(template, save, options) {

  var dialog = Dialog.base(template, save, options);

  template.helpers({
    dialogMode: function () {
      var data = dialog.getData();
      return (data && data._id) ? 'Edit' : "Add";
    }
  });

  return dialog;
};