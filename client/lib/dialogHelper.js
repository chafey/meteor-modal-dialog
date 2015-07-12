
dialogHelper = function(settings) {

  // default the session key to the template name if not specified
  if(!settings.sessionKey) {
    settings.sessionKey = settings.template;
  }

  // default the dialogSelector to the template name as an id if not specified
  if(!settings.dialogSelector) {
    settings.dialogSelector = '#' + settings.template;
  }

  if(!settings.saveSelector) {
    settings.saveSelector = '#save';
  }

  // the template instance for this dialog
  var template;

  // initialize the session to empty object so the template doesn't error out
  Session.set(settings.sessionKey, {});

  // hook onRendered so we can initialize ourself
  Template[settings.template].onRendered(function() {
    template = this;

    // on dialog shown, set the focus to the element with the autofocus attribute
    template.$(settings.dialogSelector).on('shown.bs.modal', function () {
      template.$('[autofocus]').focus()
    });
    // on dialog hide, set the session variable to undefined.  This will remove the dialog from the DOM.  This
    // is used to reset the input elements to default values for the "Add" case
    template.$(settings.dialogSelector).on('hide.bs.modal', function () {
      Session.set(settings.sessionKey, undefined);
    });
    // on dialog hidden, set the session variable to an empty object.  This will add the dialog back to the DOM
    // with default values for input elements
    // NOTE: Resetting the default values depends on the dialog being removed from the DOM first so the old
    //       values are discarded.  This is done via the hide event handler above.  We are assuming that the
    //       dialog is removed between the hide and hidden events - hopefully this assumption holds up.
    this.$(settings.dialogSelector).on('hidden.bs.modal', function () {
      Session.set(settings.sessionKey, {});
    });
  });

  // Add helpers to access to dialog data
  Template[settings.template].helpers({
    dialogData: function()  {
      return Session.get(settings.sessionKey);
    }
  });

  // Add support for saving the data if saveSelector is defined
  if(settings.saveSelector) {
    var events = {};
    events['click ' + settings.saveSelector] = function (event, template) {
      //console.log('saving');

      // map data from the DOM into our data object based on the name attribute
      var data = Session.get(settings.sessionKey);
      map(template, data);

      // if a map function was supplied, call it so it can do custom data mapping
      if(settings.map) {
        settings.map(template, data);
      }

      //console.log(data);

      // Invoke the validation function if it is defined
      if (settings.validate) {
        if (settings.validate(template, data) !== true) {
          // display error
          return;
        }
      }

      // if a save function is defined, use that to save
      if(settings.save) {
        if(settings.save(data) !== true) {
          return;
        }
      } else {
        // if collection is defined, update or insert the document to it
        if (settings.collection) {
          if (data._id) {
            var id = data._id;
            delete data._id;
            settings.collection.update(id, {$set: data});
          } else {
            settings.collection.insert(data);
          }
        }
      }

      // hide the dialog
      $(settings.dialogSelector).modal('hide');
    };
    Template[settings.template].events(events);
  }

  return {
    show: function(data) {
      data = data || {};

      // Set the session variable for this dialog
      Session.set(settings.sessionKey, data);

      // invoke the initialize callback so it can do custom initialization of the template instance if necessary
      if(settings.initialize) {
        settings.initialize(template, data);
      }

      // show dialog
      $(settings.dialogSelector).modal();
    },
    hide: function() {
      $(settings.dialogSelector).modal('hide')
    }
  }
};