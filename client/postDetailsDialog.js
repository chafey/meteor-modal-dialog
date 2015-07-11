
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
  setData :function(data) {
    //data.timestamp = new Date();
  },
  // function that can be hooked to do the actual save (e.g. via meteor methods instead of collection).
  // returns true on success, false on failure
  //save :function(data) { return true},
});

Template.postDetailsDialog.helpers({
});

Template.postDetailsDialog.onRendered(function() {
  console.log('onRendered = ', this.timestamp);
  var self = this;

  //self.$('.datetimepicker').datetimepicker({format : 'YYYY/MM/DD HH:MM:ss'});
  //self.$('.datetimepicker').datetimepicker({format : 'YYYY/MM/DD HH:MM:ss'});//, defaultDate: new Date(defaultDate)});

  self.$('#postDetailsDialog').on('show.bs.modal', function () {
    console.log('self', self);
    console.log('showing...' + Session.get('postDetailsDialog').timestamp);
    //console.log(self.$('.datetimepicker'));//.datetimepicker({format : 'YYYY/MM/DD HH:MM:ss'}).data('DateTimePicker'));
    //console.log(self.$('.datetimepicker').data('DateTimePicker'));//.datetimepicker({format : 'YYYY/MM/DD HH:MM:ss'}).data('DateTimePicker'));
    var defaultDate = Session.get('postDetailsDialog').timestamp;
    console.log(defaultDate);
    console.log(self.$('.datetimepicker'));
    self.$('.datetimepicker').datetimepicker({format : 'YYYY/MM/DD HH:MM:ss', defaultDate: defaultDate ? new Date(defaultDate) : new Date()});
    //self.$('.datetimepicker').data('DateTimePicker').date(defaultDate);
/*    self.$('.datetimepicker').datetimepicker({
      //format : 'YYYY/MM/DD HH:MM:ss',
      defaultDate: defaultDate
    });*/
  });

  self.$('#postDetailsDialog').on('hide.bs.modal', function () {
    //self.$('.datetimepicker').data('DateTimePicker').destroy();
  });

});
