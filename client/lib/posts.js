Posts = new Mongo.Collection(null);
Posts.insert( {title: 'Title One', flagged: true, notes: 'notes 1'});
Posts.insert( {title: 'Title two', flagged: false, notes: 'notes 2'});
Posts.insert( {title: 'Title three', flagged: true, notes: 'notes 3'});
Posts.insert( {title: 'Title four', flagged: false, notes: 'notes 4'});
Posts.insert( {title: 'Title five', flagged: true, notes: 'notes 5'});
