/*!
 * jquery.ga.plugin.js - simple jquery plugin wrapper around the google analytics window.ga function
 * @version v0.0.1
 * @link https://github.com/WARPAINTMedia/jquery.ga.plugin.js
 * @license MIT
 * @copyright (c) 6/23/2015
 */
(function($) {

  $.fn.ga = function(options, callback) {

    // default options
    $.fn.ga.defaults = {
      eventCategory: 'button',
      eventAction: 'click',
      eventLabel: false,
      eventValue: false,
      development: false
    };

    if (typeof(options) === 'function') {
      callback = options;
    }

    if (!this.length) { return this; }

    var opts = $.extend(true, {}, $.fn.ga.defaults, options);

    // hidden property that is required
    opts.hitType = 'event';

    // handle analytics not loaded/found
    if (typeof(window.ga) !== 'function' && !opts.development) {
      console.error('Google Analytics cannot be found. Development mode enabled. Make sure window.ga exists, and Google Analytics is loading.');
      opts.development = true;
    }

    this.on(opts.eventAction, function(event) {
      var $this = $(this);
      // use the default, or try using the name of the element, is there a data-label attribute?, well it's nothing
      opts.eventLabel = $this.attr('data-label') || $this[0].name || opts.eventLabel || false;
      // dont send empty labels
      if (!opts.eventLabel) {
        delete opts.eventLabel;
      }
      // use the default, or try using the value of the element, is there a data-value attribute?, well it's nothing
      opts.eventValue = $this.attr('data-value') || $this.val() || opts.eventValue || false;
      // value is supposed to be a positive integer, and only set if there is a label
      opts.eventValue = parseInt(opts.eventValue, 10);
      if (typeof(opts.eventLabel) === 'undefined' || isNaN(opts.eventValue) || opts.eventValue < 0) {
        delete opts.eventValue;
      }
      // use the default, or try using the value of the element, is there a data-value attribute?, it cant be empty
      opts.eventCategory = $this.attr('data-category') || $this.attr('type') || $this.prop('tagName') || opts.eventCategory || 'action';
      // handle development case
      if (opts.development) {
        console.log('send', opts);
      } else {
        // dont send alien props
        delete opts.development;
        ga('send', opts);
      }
      // there be callbacks
      if (callback && typeof(callback) === 'function') {
        callback.call(this);
      }
    });

    return this;
  };

})(jQuery);
