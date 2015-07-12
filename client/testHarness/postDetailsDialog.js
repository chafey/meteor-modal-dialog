
// To setup our dialog, simply call dialogHelper with an object providing the needed data
postDetailsDialog = dialogHelper({
  // The name of the template
  template: 'postDetailsDialog',

  // Function that can be hooked to do the actual save (e.g. via meteor methods instead of collection).
  // Takes precedence over the collection property
  // Returns: true on success, false on failure
  //save :function(data) { return true},

  // Validation function
  // Returns: true on successful validation, false on validation failure
  validate: function(template, data) {
    if(data.title.length ===0) {
      // focus the element and make it red
      template.$('#title').parent().addClass('has-error');
      template.$('#title').focus();
      return false;
    } else {
      template.$('#title').parent().removeClass('has-error');
    }

    return true;
  },

  // Function that can do custom data mapping
  map :function(template, data) {
    data.timestamp = template.$('.datetimepicker').data("DateTimePicker").date().toDate();
  },

  // callback invoked before the dialog is shown so we can do custom initialization
  initialize : function(template, data) {
    //console.log('onShowing', templateInstance, data);
    var defaultDate = Session.get('postDetailsDialog').timestamp;
    template.$('.datetimepicker').datetimepicker({format : 'YYYY/MM/DD HH:mm:ss', defaultDate: defaultDate ? new Date(defaultDate) : new Date()});
  },

  // The collection to save to via insert() or update().  Ignored if a save function is provided
  collection: Posts,

  // The selector to use to find the dialog (defaults to an id with the template name)
  //dialogSelector : '#postDetailsDialog',

  // The session key to use for this dialog (defaults to the template name)
  //sessionKey : 'postDetailsDialog',

  // The selector to hook for automatic saving (defaults to #save)
  //saveSelector : '#save',


});

Template.postDetailsDialog.helpers({
  dialogMode: function () {
    var data = Session.get('postDetailsDialog');
    return (data && data._id) ? 'Edit' : "Add";
  }
});

Template.postDetailsDialog.onRendered(function() {
  //console.log('onRendered = ', this.timestamp);
});

