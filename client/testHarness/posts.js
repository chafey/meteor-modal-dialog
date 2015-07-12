
Template.posts.helpers({
  postsList: function() {
    return Posts.find();
  }
});

Template.posts.events({
  'click #add' : function() {
    //console.log('add');
    postDetailsDialog.show();
  }
});