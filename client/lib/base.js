/**
 * Function to automate common dialog tasks such as setting autofocus, management of the data being edited,
 * mapping from the dialog elements to a js object, validation of the object, saving of the object and resetting
 * the dialog after each use
 *
 * @param template
 * @param save
 * @param options
 * @returns {{show: Function, getData: Function, hide: Function}}
 */

Dialog.base = function(template, save, options) {

  var sessionDataKey = 'baseDialog.' + template.viewName;
  var sessionVisibleKey = sessionDataKey + '.visible';
  var sessionErrorMessageKey = sessionDataKey + '.errorMessage';

  //console.log('sessionDataKey=' + sessionDataKey);
  if(!Session.get(sessionDataKey)) {
    Session.set(sessionDataKey, {});
  }
  if(!Session.get(sessionVisibleKey)) {
    Session.set(sessionVisibleKey, false);
  }
  if(!Session.get(sessionErrorMessageKey)) {
    Session.set(sessionErrorMessageKey, '');
  }

  template.helpers({
    dialogData: function() {
      return Session.get(sessionDataKey);
    },
    dialogErrorMessage: function() {
      return Session.get(sessionErrorMessageKey);
    }
  });

  template.onRendered(function() {

    var self = this;

    // ensure focus is on the autofocus element in the dialog
    Dialog.autoFocus(self);

    // hide or show the dialog based on the sessionVisibleKey
    this.autorun(function() {
      //console.log('sessionVisible=', Session.get(sessionVisibleKey));
      if(Session.get(sessionVisibleKey) === true) {
        //console.log("showing dialog");
        self.$('.modal').first().modal('show');
        Session.set(sessionErrorMessageKey, '');
      } else {
        //console.log("hiding dialog");
        self.$('.modal').first().modal('hide');
      }
    });


    this.$('.modal').first().on('hide.bs.modal', function () {
      //console.log('hide.bs.modal');
      // Clear the visible session key when the dialog is closed by bootstrap (e.g. pressing escape, clicking outside
      // of the dialog or perhaps programmatically
      Session.set(sessionVisibleKey, false);

      // set the session variable to undefined.  This will remove the dialog from the DOM.  This
      // is used to reset the input elements to default values for the "Add" case.  See the autorun below
      // where it re-initializes the sessionDateKey to an empty object after the DOM has been cleared (presumably....)
      Session.set(sessionDataKey, undefined);
    });

    // reset the sessionDataKey to empty object after it is set to undefined.  This allows the DOM to be repopulated
    // with the dialog with initial/default values
    this.autorun(function() {
      if (!Session.get(sessionDataKey)) {
        Session.set(sessionDataKey, {});
      }
    });

  });

  template.events({
    'click #save' : function(event, templateInstance) {
      var data = Session.get(sessionDataKey);

      // map from DOM elements into data
      Dialog.automap(templateInstance, data);

      // if a map function was supplied, call it so it can do custom data mapping.  It is up to the
      // map function to tell the user what went wrong
      if(options.map) {
        var error = options.map(templateInstance, data);
        if(error) {
          Session.set(sessionErrorMessageKey, error);
          return;
        }
      }

      // Invoke the validation function if it is defined.  It is up to the validation
      // routine to tell the user what went wrong
      if (options.validate) {
        var error = options.validate(templateInstance, data);
        if(error) {
          Session.set(sessionErrorMessageKey, error);
          return;
        }
      }

      // call the save function
      save(data, function(error) {
        //console.log(error);
        if(error) {
          console.log('save returned error:' + error);
          Session.set(sessionErrorMessageKey, error);
          return;
        }
        // Hide the dialog on successful save
        //console.log("save - hiding dialog");
        Session.set(sessionVisibleKey, false);
      });
    }
  });

  return {
    // shows the dialog with data
    show: function(data) {
      Session.set(sessionDataKey, data);
      Session.set(sessionVisibleKey, true);
    },
    // returns the data the dialog is working against
    getData: function() {
      return Session.get(sessionDataKey);
    },
    // updates the data the dialog is working agains
    setData: function(data) {
      Session.set(sessionDataKey, data);
    },
    // hides the dialog
    hide: function() {
      Session.set(sessionVisibleKey, false);
    }
  }

};