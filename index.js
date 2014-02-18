
/**
 * Expose `subscribe`.
 */

module.exports = subscribe;

/**
 * Subscribe `fn` to events on `url`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Function} unbind
 */

function subscribe(url, fn){
  var source = new EventSource(url);
  source.onmessage = function(e){
    fn(e.data);
  };
  source.onerror = function(e){
    if (source.readyState == EventSource.CLOSED) return;
    console.error(e);
  };
  return source.close.bind(source);
};
