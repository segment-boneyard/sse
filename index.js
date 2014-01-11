
/**
 * Subscribe `fn` to events on `url`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Function} unbind
 */

var on = exports.on = function(url, fn){
  var source = new EventSource(url);
  source.onmessage = function(e){
    fn(e.data);
  };
  source.onerror = function(e){
    if (e.readyState == EventSource.CLOSED) return;
    console.error(e);
    on(url, fn);
  };
  return source.close.bind(source);
};

/**
 * Subscribe `fn` to one event on `url`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Function}
 */

var once = exports.once = function(url, fn){
  var unbind = on(url, function(data){
    unbind();
    fn(data);
  });
  return unbind;
};
