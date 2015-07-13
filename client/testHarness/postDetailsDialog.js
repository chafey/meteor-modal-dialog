/**
 * This file demonstrates how to use the mini dialog framework.
 */

// Here we setup our options to handle customized data mapping and validation
var options = {

  // We use a customized data mapper to handle the datetimepicker since it exposes the
  // Date via an API call which the automapper doesn't know about
  map :function(template, data) {
    data.timestamp = template.$('.datetimepicker').data("DateTimePicker").date().toDate();
    // return a string here if error
    //return 'error mapping';
  },

  // We use a customized validation function to check to make sure the title is not empty
  // if its, we indicate this to the user
  validate: function(template, data) {
    if(data.title.length ===0) {
      // focus the element and make it red
      template.$('#title').parent().addClass('has-error');
      template.$('#title').focus();
      // Return an error string to display to the user
      return 'Title must not be empty';
    } else {
      // data passed validation, remove the has-error class.
      // NOTE: it would be better to use reactivity to control validation errors
      template.$('#title').parent().removeClass('has-error');
    }
  }
};

function saveFail(data, cb) {
  cb('saved failed');
}

// base requires the template and a function that is called to save the dialog contents.  Optional
// settings are passed via the optional third argument.  In this case, we use simpleUpset to upsert directly
// to a collection - but we could pass another function which does the upsert via meteor methods or other.
//postDetailsDialog = Dialog.base(Template.postDetailsDialog, saveFail, options);
postDetailsDialog = Dialog.base(Template.postDetailsDialog, Dialog.simpleUpsert(Posts), options);

// we can also wrap baseDialog() with our own function to customize the behavior further.
//postDetailsDialog = myDialog(Template.postDetailsDialog, simpleUpsert(Posts), options);

// here we hook the dialog show event so we can initialize the datetime picker since it is not reactive
Template.postDetailsDialog.onRendered(function() {

  var self = this;

  // hook dialog show so we can manually update the date since it is not reactive
  self.$('.modal').first().on('show.bs.modal', function () {
    var data = postDetailsDialog.getData();
    var defaultDate = data.timestamp || new Date();
    self.$('.datetimepicker').datetimepicker({format : 'YYYY/MM/DD HH:mm:ss', defaultDate: defaultDate});
  });

});

