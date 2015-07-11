
// To setup our dialog, simply call dialogHelper with an object providing the needed data
postDetailsDialog = dialogHelper({
  // the name of the template
  template: 'postDetailsDialog',
  // the collection to save to
  collection: Posts,
  // the selector to use to find the dialog (defaults to an id with the template name)
  //dialogSelector : '#postDetailsDialog',
  // the session key to use for this dialog (defaults to the template name)
  //sessionKey : 'postDetailsDialog',
  // the selector to hook for automatic saving (defaults to #save)
  //saveSelector : '#save',
  // validation function - return true on success, false on error
  //validate: function(data) { return true;}
  // function that can update the data before save
  //setData :function(data) {},
  // function that can be hooked to do the actual save (e.g. via meteor methods instead of collection).
  // returns true on success, false on failure
  //save :function(data) { return true},
});

Template.postDetailsDialog.helpers({
  // note this should be replaced by {{isChecked flagged true}} but isChecked is buggy
  // see: https://github.com/raix/Meteor-handlebar-helpers/issues/53
  flaggedIsChecked : function() {
    return (Session.get('postDetailsDialog').flagged  === true)? 'checked' : '';
  }
});