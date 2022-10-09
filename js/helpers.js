(function ($) {

    var cache = {}, uuid = 0;

    $.fn.once = function (id, fn) {
        if (typeof id != 'string') {
            // Generate a numeric ID if the id passed can't be used as a CSS class.
            if (!(id in cache)) {
                cache[id] = ++uuid;
            }
            // When the fn parameter is not passed, we interpret it from the id.
            if (!fn) {
                fn = id;
            }
            id = 'jquery-once-' + cache[id];
        }
        // Remove elements from the set that have already been processed.
        var name = id + '-processed';
        var elements = this.not('.' + name).addClass(name);

        return $.isFunction(fn) ? elements.each(fn) : elements;
    };


    calcVars = function () {
        windowWidth = $(window).width();
        isTablet = (windowWidth <= 1200 && windowWidth > 768);
        isMobile = (windowWidth <= 768);
        isDesktop = (!isTablet && !isMobile);
    }

})(jQuery);