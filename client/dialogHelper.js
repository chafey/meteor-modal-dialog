dialogHelper = function(settings) {

  // initialize the session to empty object so the template doesn't error out
  Session.set(settings.sessionKey, {});

  Template[settings.template].onRendered(function() {
    // Set the focus to the title every time the dialog is shown
    $(settings.dialogSelector).on('shown.bs.modal', function () {
      $(settings.focusSelector).focus()
    });
    // reset the dialog state every time the dialog is hidden
    $(settings.dialogSelector).on('hide.bs.modal', function () {
      console.log('hiding');
      // Clear the session variable to reset the dialog data
      Session.set(settings.sessionKey, undefined);
    })
  });

  Template[settings.template].helpers({
    dialogMode: function () {
      var data = Session.get(settings.sessionKey);
      return (data && data._id) ? 'Edit' : "Add";
    },
    dialogData: function()  {
      return Session.get(settings.sessionKey);
    }
  });

  // Add support for saving the data if saveSelector is defined
  if(settings.saveSelector) {
    var events = {};
    events[settings.saveSelector] = function () {
      //console.log('saving');

      // Pull data from DOM into our data object based on the name attribute
      var data = Session.get(settings.sessionKey);
      $('input[type=text]').each(function (index, element) {
        var name = $(element).attr('name');
        data[name] = $(element).val();
        //console.log(name + ' = ' + data[name]);
      });
      $('textarea').each(function (index, element) {
        var name = $(element).attr('name');
        data[name] = $(element).val();
        //console.log(name + ' = ' + data[name]);
      });
      $('input[type=checkbox]').each(function (index, element) {
        var name = $(element).attr('name');
        data[name] = $(element).is(':checked');
        //console.log(name + ' = ' + data[name]);
      });

      // if a setData was supplied, get it a chance to set data
      if(settings.setData) {
        setData(data);
      }

      //console.log(data);

      // Invoke the validation function if it is defined
      if (settings.validate) {
        if (settings.validate(data) !== true) {
          // display error
          return;
        }
      }

      // insert or update
      if (data._id) {
        var id = data._id;
        delete data._id;
        settings.collection.update(id, {$set: data});
      } else {
        settings.collection.insert(data);
      }

      // hide the dialog
      $(settings.dialogSelector).modal('hide');
    };
    Template[settings.template].events(events);
  }

  return {
    show: function(data) {
      // Reset the dialog state
      Session.set(settings.sessionKey, data || {});

      // show dialog
      $(settings.dialogSelector).modal();
    },
    hide: function() {
      $(settings.dialogSelector).modal('hide')

    }
  }
};