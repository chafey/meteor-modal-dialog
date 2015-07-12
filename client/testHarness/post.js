Template.post.events({
  'click a' : function() {
    //console.log('edit ', this);

    postDetailsDialog.show(this);
  }
})