
// To setup our dialog, simply call dialogHelper with an object providing the needed data
postDetailsDialog = dialogHelper({
  // the name of the template
  template: 'postDetailsDialog',
  dialogSelector : '.post-details-dialog',
  // the session key to use for this dialog
  sessionKey : 'post-details-dialog',
  // the selector to set the focus to when the dialog is shown
  focusSelector : "[name='title']",
  // the selector to hook for automatic saving
  saveSelector : 'click #save',
  // the collection to save to
  collection: Posts,
  // function that can update the data before save
  setData :function(data) {},
  // validation function - return true on succes, false on error
  validate: function(data) {
    // validate the data
    return true;
  }
});

Template.postDetailsDialog.helpers({
  // note this should be replaced by {{isChecked flagged true}} but isChecked is buggy
  // see: https://github.com/raix/Meteor-handlebar-helpers/issues/53
  flaggedIsChecked : function() {
    return (Session.get('post-details-dialog').flagged  === true)? 'checked' : '';
  }
});