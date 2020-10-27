;(function ($) {

var style_tag = $('<style>').appendTo('body');
var letsee_custom_css = {};

if (window.letsee_custom_css)
    letsee_custom_css = window.letsee_custom_css;

function set_css(css) {
    style_tag.text(css);
}


function gen_base_css() {
    return ('*:not(.letsee-guard) {' +
            '   line-height: 1.3 !important;' +
            '   text-shadow: none !important;' +
            '}' +
            'a:not(.letsee-guard) {' +
            '   text-decoration: underline !important;' +
            '}')
}


function gen_font_size_css(font_size) {
    if (font_size == null)
        return '';

    return ('*:not(.letsee-guard) {'
          + '     font-size: ' + font_size + 'px !important;'
          + '}');
}

function gen_images_css(hide) {
    if (! hide)
        return '';

    return (letsee_custom_css.images_hidden || '') + 'img { display: none !important; }';
}

function gen_colors_css(colors) {
    if (! colors)
        return '';

    var props;
    switch (colors)
    {
        case 'bonw': props = 'color: #000 !important; background: #fff !important;'; break;
        case 'wonb': props = 'color: #fff !important; background: #000 !important;'; break;
    }

    if (props)
        return (letsee_custom_css.colors && letsee_custom_css.colors[colors] || '') + '*:not(.letsee-guard) {' + props + '}';
    else
        return '';
}

function gen_css(options) {
    if (!options.enabled)
        return '';

    return (
        (letsee_custom_css.enabled || '') +
        gen_base_css() +
        gen_font_size_css(options.font_size) +
        gen_images_css(options.hide_images) +
        gen_colors_css(options.colors)
    );
}


var panel = $(
        '<dl id="letsee-panel">'
      +     '<dt>Размер шрифта:</dt>'
      +     '<dd>'
      +         '<a href="#" class="letsee-change-fontsize letsee-fontsize-small letsee-fontsize-active" data-letsee-fontsize="17">A</a>'
      +         '<a href="#" class="letsee-change-fontsize letsee-fontsize-medium" data-letsee-fontsize="21">A</a>'
      +         '<a href="#" class="letsee-change-fontsize letsee-fontsize-large"  data-letsee-fontsize="25">A</a>'
      +     '</dd>'
      +     '<dt>'
      +         '<label for="letsee-hide-images">'
      +             'Отключить изображения'
      +             '<input type="checkbox" id="letsee-hide-images" class="letsee-hide-images"/>'
      +         '</label>'
      +     '</dt>'
      +     '<dt>Цвета:</dt>'
      +     '<dd>'
      +         '<a href="#" class="letsee-colors letsee-colors-bonw letsee-colors-active" data-letsee-colors="bonw"><span>A</span></a>'
      +         '<a href="#" class="letsee-colors letsee-colors-wonb" data-letsee-colors="wonb"><span>A</span></a>'
      +     '</dd>'

      +     '<dt><a href="#" class="letsee-turn-off">Выключить</a></dt>'
      + '</dl>'
    )
    .addClass('letsee-guard')
    .find('*')
        .addClass('letsee-guard')
        .end()

    .find('.letsee-change-fontsize')
        .on('click', function () {
            $(this).closest('dl').find('.letsee-change-fontsize').removeClass('letsee-fontsize-active');
            $(this).addClass('letsee-fontsize-active');
            apply_panel();
            return false;
        })
        .end()

    .find('.letsee-colors')
        .on('click', function () {
            $(this).closest('dl').find('.letsee-colors').removeClass('letsee-colors-active');
            $(this).addClass('letsee-colors-active');
            apply_panel();
            return false;
        })
        .end()

    .find('.letsee-hide-images')
        .on('change', apply_panel)
        .end()

    .on('click', '.letsee-turn-off', function () {
        letsee_toggle_panel();
        return false;
    })

    .prependTo('body');

function panel2options() {
    return {
        enabled: $('body').hasClass('letsee-active'),
        font_size: panel.find('.letsee-fontsize-active').attr('data-letsee-fontsize'),
        hide_images: panel.find('.letsee-hide-images').prop('checked'),
        colors: panel.find('.letsee-colors-active').attr('data-letsee-colors')
    };
}
function options2panel(options) {
    $('body').toggleClass('letsee-active', !!options.enabled);

    panel.find('.letsee-change-fontsize')
         .removeClass('letsee-fontsize-active')
         .filter('[data-letsee-fontsize="' + (options.font_size || 17) + '"]')
         .addClass('letsee-fontsize-active');

    panel.find('.letsee-hide-images').prop('checked', !!options.hide_images);

    panel.find('.letsee-colors')
         .removeClass('letsee-colors-active')
         .filter('[data-letsee-colors="' + (options.colors || 'bonw') + '"]')
         .addClass('letsee-colors-active');
}

function apply_panel() {
    set_css(gen_css(panel2options()));
    save_options(panel2options());
}


function set_cookie(name, value) {
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=Mon,01-Jan-2050 00:00:00 GMT;path=/';
}
function get_cookie(name) {
    if (!document.cookie) return null;

    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++)
    {
        var cookie = $.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) == (name + '='))
            return decodeURIComponent(cookie.substring(name.length + 1));
    }
}
function save_options(options) {
    set_cookie('letsee', JSON.stringify(options));
}
function load_options() {
    try
    {
        return JSON.parse(get_cookie('letsee'));
    }
    catch (e)
    {
        return {}
    }
}


window.letsee_toggle_panel = function () {
    $('body').toggleClass('letsee-active');
    apply_panel();
}


var options = load_options();
options2panel(options);
set_css(gen_css(options));

})(jQuery);
