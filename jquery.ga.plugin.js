(function($) {

  $.fn.ga = function(options, callback) {

    // default options
    $.fn.ga.defaults = {
      eventCategory: 'button',
      eventAction: 'click',
      eventLabel: null,
      eventValue: null,
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
      opts.eventLabel = opts.eventLabel || $this.attr('data-label') || $this[0].name || null;
      // use the default, or try using the value of the element, is there a data-value attribute?, well it's nothing
      opts.eventValue = opts.eventValue || $this.attr('data-value') || $this.val() || null;
      // use the default, or try using the value of the element, is there a data-value attribute?, well it's nothing
      opts.eventCategory = $this.attr('data-category') || $this.attr('type') || $this.prop('tagName') || opts.eventCategory || null;
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
