Template.registerHelper("checked", function (value) {
  if(value === true) {
    return 'checked';
  }
  return '';
});

Template.registerHelper("checkedIf", function (value, match) {
  if(value === match) {
    return 'checked';
  }
  return '';
});

Template.registerHelper("literalBoolean", function (value) {
  return value ? 'true' : 'false';
});

Template.registerHelper("selectedIf", function (value, match) {
  if(value === match) {
    return 'selected';
  }
  return '';
});


