define([
  'okta/underscore',
  'shared/views/components/BaseButtonLink'
],
function (_, BaseButtonLink) {

  /**
   * A factory method wrapper for {@link BaseButtonLink} creation
   * @class module:Okta.internal.util.ButtonFactory
   */

  function normalizeEvents(options) {
    var events = _.extend(options.click ? {click: options.click} : {}, options.events || {}),
        target = {};
    _.each(events, function (fn, eventName) {
      target[eventName] = function (e) {
        if (!options.href) {
          e.preventDefault();
          e.stopPropagation();
        }
        fn.apply(this, arguments);
      };
    });
    return target;
  }

  return /** @lends module:Okta.internal.util.ButtonFactory */ {
    /**
     * Creates a {@link module:Okta.internal.views.components.BaseButtonLink|BaseButtonLink}.
     * @param  {Object} options Options hash
     * @param  {String} [options.title] The button text
     * @param  {String} [options.icon]
     * CSS class for the icon to display. See [Style guide](http://rain.okta1.com:1802/su/dev/style-guide#icons)
     * @param {String} [options.href] The button link
     * @param {Function} [options.click] On click callback
     * @param {Object} [options.events] a [Backbone events](http://backbonejs.org/#View-delegateEvents) hash
     * @returns {module:Okta.internal.views.components.BaseButtonLink} BaseButtonLink prototype ("class")
     */
    create: function (options) {
      options = _.clone(options);
      return BaseButtonLink.extend(_.extend(options, {
        events: normalizeEvents(options)
      }));
    }
  };

});
