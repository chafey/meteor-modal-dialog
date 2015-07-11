function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomDate() {
  var date = new Date();
  date.setSeconds(getRandomInt(0,59));
  return date;
}

function randomPriority() {
  return getRandomInt(0,2) === 0 ? 'N' : 'H';
}

function randomNotes() {
  return 'notes ' + Random.id();
}

function randomTitle() {
  return 'title ' + Random.id();
}

function randomFlagged() {
  return getRandomInt(0,2) === 0 ? true : false;
}

function randomColor() {
  var colors = ['R', 'G', 'B'];
  var num = getRandomInt(0,3);
  return colors[num];
}


function makePost(post) {
  post = post || {};
  post.title = post.title || randomTitle();
  if(post.flagged === undefined) {
    post.flagged = randomFlagged();
  }
  post.notes = post.notes || randomNotes();
  post.timestamp = post.timestamp || randomDate();
  post.priority = post.priority || randomPriority();
  post.color = post.color || randomColor();

  return post;
}

Posts = new Mongo.Collection(null);

Posts.insert(makePost({flagged: true, priority : 'N'}));
Posts.insert(makePost({flagged: false, priority : 'H'}));


for(var i=0; i < 10; i++) {
  Posts.insert(makePost());
}
