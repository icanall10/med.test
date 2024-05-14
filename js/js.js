(function ($) {

    function behaviors() {

        $('[data-dropdown-link]')
            .once()
            .click(function () {
                let $this = $(this);
                let wrapper = $this.closest('.menu');
                let links = wrapper.find('a');
                let code = $this.attr('data-dropdown-link');
                let dropdowns = $('[data-dropdown]');

                links.not(this).removeClass('open');

                $this.toggleClass('open');

                dropdowns
                    .not('[data-dropdown="' + code + '"]')
                    .removeClass('open');

                dropdowns
                    .filter('[data-dropdown="' + code + '"]')
                    .toggleClass('open');

                return false;
            });


        $('[data-menu-popup]')
            .once()
            .on('openMenu', function () {
                $(this).addClass('open');
                $('html, body').addClass('menu-open');
            })
            .on('closeMenu', function () {
                $(this).removeClass('open');
                $('html, body').removeClass('menu-open');
            })
            .on('toggleMenu', function () {
                $(this).toggleClass('open');
                $('html, body').toggleClass('menu-open');
            });


        $('[data-dropdown]')
            .once()
            .on('openDropdown', function () {
                $(this).addClass('open');
                $('[data-dropdown-link]').addClass('open');
            })
            .on('closeDropdown', function () {
                $(this).removeClass('open');
                $('[data-dropdown-link]').removeClass('open');
            })
            .on('toggleDropdown', function () {
                $(this).toggleClass('open');
                $('[data-dropdown-link]').toggleClass('open');
            });


        $('[data-menu-popup-close-link], [data-menu-popup-link]')
            .once()
            .click(function () {
                $('[data-menu-popup]').trigger('toggleMenu');
                $('[data-dropdown]').trigger('closeDropdown');

                return false;
            });


        $('.slider-block .owl-carousel')
            .once()
            .owlCarousel({
                items: 1,
                dots: true,
                autoplay: true,
                autoplayHoverPause: true,
                loop: true
            });


        $('.services-slider-block .owl-carousel')
            .once()
            .owlCarousel({
                dots: true,
                margin: 32,
                items: (isMobile || isTablet) ? 1 : 2,
                autoplay: true,
                autoplayHoverPause: true,
                loop: true
            });


        $('.gallery-block .owl-carousel')
            .once()
            .owlCarousel({
                dots: true,
                margin: 32,
                autoWidth: true,
                loop: true
            });


        $('.doctors-block .owl-carousel')
            .once()
            .owlCarousel({
                dots: false,
                margin: 31,
                autoWidth: true
            });


        $('.videos-block .owl-carousel')
            .once()
            .owlCarousel({
                dots: false,
                margin: 32,
                items: isMobile ? 1 : 2
            });


        $('#footer')
            .find('.menu .name')
            .once()
            .click(function () {
                $(this)
                    .closest('.item')
                    .find('ul')
                    .toggle();

                return false;
            });


        $('[data-modal]')
            .once()
            .on('modalOpen', function () {
                $(this).addClass('open');
                $('html, body').addClass('modal-open');
            })
            .on('modalClose', function () {
                $(this).removeClass('open');
                $('html, body').removeClass('modal-open');
            });


        $('[data-modal-link]')
            .once('modal')
            .click(function () {
                var id = $(this).attr('data-modal-link');
                var modal = $('[data-modal="' + id + '"]');

                if (modal.length) modal.trigger('modalOpen');

                return false;
            });


        $('[data-modal] .modal-overlay, [data-modal-close]')
            .once()
            .click(function () {
                $(this)
                    .closest('[data-modal]')
                    .trigger('modalClose');
            });


        $('input[data-mobile-date]')
            .once()
            .focus(function () {
                if (isMobile) {
                    var $this = $(this);

                    var dateInput = $this
                        .closest('.form-group')
                        .find('input[type=date]');

                    $this.prop('disabled', true);

                    dateInput
                        .prop('disabled', false)
                        .trigger('click')
                        .focus();
                }
            });


        $('.order-form input[name="date"]')
            .once(function () {
                if (isDesktop || isTablet) {
                    $(this).datepicker();
                }
            });


        $('select')
            .once()
            .selectize();


        $('.sticky-menu')
            .once('sticky-menu')
            .on('refreshState', function () {
                let $this = $(this);
                let offsetTop = $this.offset().top;
                let scrollTop = $(window).scrollTop();

                console.log(scrollTop >= offsetTop);

                if (scrollTop > offsetTop) {
                    $this.addClass('fixed');
                } else {
                    $this.removeClass('fixed');
                }
            })
            .trigger('refreshState');

    }


    $(document).scroll(function () {
        $('.sticky-menu').trigger('refreshState');
    });


    $(document).ready(function () {
        calcVars();
        behaviors();
    });


    $(document).ajaxComplete(function () {
        behaviors();
    });


    $(document).resize(function () {
        calcVars();
    });


    $(document).click(function (event) {
        let dropdown = '[data-dropdown]';
        let dropdownLink = '[data-dropdown-link]';

        if (!$(event.target).closest(dropdown).length && !$(event.target).closest(dropdownLink).length) {
            if ($(dropdown).is(":visible")) {
                $(dropdown).trigger('closeDropdown');
            }
        }
    });

})(jQuery);