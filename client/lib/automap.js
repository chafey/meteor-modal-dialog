/**
 * This function maps data from DOM elements into properties of an object based on the name attribute on the element
 *
 * @param templateInstance - the template instance to map from
 * @param data - The object to map data to
 */

// TODO: Make this extendable to support custom data mappers

automap = function(templateInstance, data) {
  // Pull data from DOM into our data object based on the name attribute
  templateInstance.$('input[type=text]').each(function (index, element) {
    var name = $(element).attr('name');
    if(!name) {
      return;
    }
    data[name] = $(element).val();
    //console.log(name + '=' + data[name]);
  });
  templateInstance.$('textarea').each(function (index, element) {
    var name = $(element).attr('name');
    if(!name) {
      return;
    }
    data[name] = $(element).val();
  });
  templateInstance.$('input[type=checkbox]').each(function (index, element) {
    var name = $(element).attr('name');
    if(!name) {
      return;
    }
    data[name] = $(element).is(':checked');
  });
  templateInstance.$('input[type=radio]').each(function (index, element) {
    var name = $(element).attr('name');
    if(!name) {
      return;
    }
    if($(element).is(':checked') === true) {
      data[name] = $(element).val();
    }
  });
  templateInstance.$('option').each(function (index, element) {
    var name = $(element).parent().attr('name');
    if(!name) {
      return;
    }
    if($(element).is(':selected') === true) {
      data[name] = $(element).val();
    }
  });
  return true;
}