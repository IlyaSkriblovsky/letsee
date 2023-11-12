# `ПРОЕКТ УСТАРЕЛ И БОЛЬШЕ НЕ ПОДДЕРЖИВАЕТСЯ`

Если вы ищете как добавить на ваш сайт режим для слабовидящих, рассмотрите эти альтернативы:

* https://slabovid.ru/info/access/
* https://lidrekon.ru/slep/
* https://wp-lessons.com/comfortable-reading-premium

# letsee — Режим для слабовидящих для любого сайта

Letsee adapts any website for visually impaired people

[English version is below](#install)

## Установка

Разместите папку `letsee` там, где хранятся статические файлы (*.js, *.css) на вашем сайте. В шаблоне всех страниц сайта в блоке `<head>` разместите код подключения скрипта:
```html
<link rel="stylesheet" href="/letsee/letsee.css"/>
<script src="/letsee/letsee.js"></script>
```
Измените пути к css- и js-файлам, если необходимо.

В нужном месте шаблона разместите ссылку «Режим для слабовидящих»:
```html
<a href="javascript://" onclick="letsee_toggle_panel()">Версия для слабовидящих</a>
```

Всё готово!

## Настройка

При необходимости можно задать собственные CSS-правила для разных режимов, которые пользователь может включить с помощью `letsee`. Для этого нужно разместить такой код *перед* тэгом `<script>`, загружающим `letsee.js`:
```html
<script>
    letsee_custom_css = {
        enabled: '...', // CSS-правила, которые будут применяться когда включен режим для слабовидящих
        images_hidden: '...', // правила для режима без картинок
        colors: {
            bonw: '...', // правила для режима чёрный-на-белом
            wonb: '...' // правила для инверсного режима белый-на-чёрном
        }
    };
</script>
```

Например, такой код спрячет ссылку на режим для слабовидящих когда этот режим уже включен, а также спрячет блок слайдшоу если пользователь отключил картинки:
```html
<script>
    letsee_custom_css = {
        enabled: '#enable_letsee { display: none; }',
        images_hidden: '#slideshow { display: none; }'
    }
</script>
<a id="enable_letsee" href="javascript://" onclick="letsee_toggle_panel()">Версия для слабовидящих</a>
```


## Install

Upload `letsee` folder to your website, preferrably into where other *.js and *.css files are stored. Put this code into toplevel site template inside `<head>` block:
```html
<link rel="stylesheet" href="/letsee/letsee.css"/>
<script src="/letsee/letsee.js"></script>
```
Change paths to css- and js-file if needed.

Use this code where you want to place a link on the mode for visually impaired people:
```html
<a href="javascript://" onclick="letsee_toggle_panel()">Accessibility mode</a>
```

That's all!

## Configuration

You may set additional CSS rules for different modes that user may select using `letsee` panel. Put this code *before* `<script>` tag that includes `letsee.js`:
```html
<script>
    letsee_custom_css = {
        enabled: '...', // CSS rules that will apply when the accessibility mode is enabled
        images_hidden: '...', // CSS rules for no-images mode
        colors: {
            bonw: '...', // rules for black-on-white mode
            wonb: '...' // rules for inverse white-on-black mode
        }
    };
</script>
```

For example, this code will hide accessibility mode link if the mode is enabeld and also will hide a slideshow if user choosed to disable images:
```html
<script>
    letsee_custom_css = {
        enabled: '#enable_letsee { display: none; }',
        images_hidden: '#slideshow { display: none; }'
    }
</script>
<a id="enable_letsee" href="javascript://" onclick="letsee_toggle_panel()">Accessibility mode</a>
```
