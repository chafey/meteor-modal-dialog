/**
 * Function compatible with baseDialog's save() signature that will do an upsert to a collection
 * @param collection - The collection to upsert to
 * @returns {Function}
 */
simpleUpsert = function(collection) {
  return function(data) {
    if (data._id) {
      var id = data._id;
      delete data._id;
      collection.update(id, {$set: data});
    } else {
      collection.insert(data);
    }
    return true;
  }
}