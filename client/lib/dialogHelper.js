
dialogHelper = function(settings) {

  // create a unique sessionKey based on the template name and a randomly generated id
  var sessionKey = settings.template.viewName + Random.id();

  // the template instance for this dialog - this is set the when the dialog is rendered
  var templateInstance;

  // initialize the session to empty object so the template doesn't error out
  Session.set(sessionKey, {});

  // hook onRendered so we can initialize ourself
  settings.template.onRendered(function() {
    templateInstance = this;
    // on dialog shown, set the focus to the element with the autofocus attribute
    this.$('.modal').first().on('shown.bs.modal', function () {
      templateInstance.$('[autofocus]').focus()
    });
    // on dialog hide, set the session variable to undefined.  This will remove the dialog from the DOM.  This
    // is used to reset the input elements to default values for the "Add" case
    this.$('.modal').first().on('hide.bs.modal', function () {
      Session.set(sessionKey, undefined);
    });
    // on dialog hidden, set the session variable to an empty object.  This will add the dialog back to the DOM
    // with default values for input elements
    // NOTE: Resetting the default values depends on the dialog being removed from the DOM first so the old
    //       values are discarded.  This is done via the hide event handler above.  We are assuming that the
    //       dialog is removed between the hide and hidden events - hopefully this assumption holds up.
    this.$('.modal').first().on('hidden.bs.modal', function () {
      Session.set(sessionKey, {});
    });
  });

  // Add helpers to access to dialog data
  settings.template.helpers({
    dialogData: function()  {
      return Session.get(sessionKey);
    }
  });

  // Add support for saving the data if saveSelector is defined
  settings.template.events({

    'click #save' : function (event, template) {
      //console.log('saving');

      // map data from the DOM into our data object based on the name attribute
      var data = Session.get(sessionKey);
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
        if(settings.save(template, data) !== true) {
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
      $('.modal').first().modal('hide');
    }
  });

  return {
    show: function(data) {

      // Set the session variable for this dialog
      Session.set(sessionKey, data);

      // invoke the initialize callback so it can do custom initialization of the template instance if necessary
      if(settings.initialize) {
        settings.initialize(templateInstance, data);
      }

      // show dialog
      templateInstance.$('.modal').first().modal();
    },
    hide: function() {
      templateInstance.$(settings.dialogSelector).modal('hide')
    }
  }
};