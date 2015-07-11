
// To setup our dialog, simply call dialogHelper with an object providing the needed data
postDetailsDialog = dialogHelper({
  // the name of the template
  template: 'postDetailsDialog',
  // the collection to save to
  collection: Posts,
  //dialogSelector : '#postDetailsDialog',
  // the session key to use for this dialog
  //sessionKey : 'postDetailsDialog',
  // the selector to hook for automatic saving
  //saveSelector : 'click #save',
  // function that can update the data before save
  //setData :function(data) {},
  // validation function - return true on success, false on error
  //validate: function(data) { return true;}
});

Template.postDetailsDialog.helpers({
  // note this should be replaced by {{isChecked flagged true}} but isChecked is buggy
  // see: https://github.com/raix/Meteor-handlebar-helpers/issues/53
  flaggedIsChecked : function() {
    return (Session.get('postDetailsDialog').flagged  === true)? 'checked' : '';
  }
});