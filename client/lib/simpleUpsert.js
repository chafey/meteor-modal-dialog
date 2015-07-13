/**
 * Function compatible with baseDialog's save() signature that will do an upsert to a collection
 * @param collection - The collection to upsert to
 * @returns {Function}
 */
Dialog.simpleUpsert = function(collection) {
  return function(data, cb) {
    if (data._id) {
      var id = data._id;
      delete data._id;
      collection.update(id, {$set: data});
      cb();
    } else {
      collection.insert(data);
      cb();
    }
  }
}