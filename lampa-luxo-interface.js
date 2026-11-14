(function () {
    'use strict';

    if (window.__lampa_luxo_interface_v4) return;
    window.__lampa_luxo_interface_v4 = true;

    var STYLE_ID = 'lampa-luxo-interface-style-v4';
    var COMPONENT = 'luxo_interface_v4';
    var KEYS = {
        enabled: 'luxo_v4_enabled',
        accent: 'luxo_v4_accent',
        radius: 'luxo_v4_radius',
        scale: 'luxo_v4_scale',
        blur: 'luxo_v4_blur',
        compact: 'luxo_v4_compact'
    };

    var defaults = {
        enabled: true,
        accent: '#e50914',
        radius: '18px',
        scale: '1.045',
        blur: '12px',
        compact: false
    };

    function read(key) {
        try {
            if (window.Lampa && Lampa.Storage && Lampa.Storage.field) {
                var value = Lampa.Storage.field(KEYS[key]);
                if (value !== undefined && value !== null) return value;
            }
        } catch (e) {}
        return defaults[key];
    }

    function safeAccent(value) {
        var text = String(value || defaults.accent);
        if (/^#[0-9a-fA-F]{6}$/.test(text)) return text;
        if (/^#[0-9a-fA-F]{3}$/.test(text)) return text;
        return defaults.accent;
    }

    function removeStyle() {
        var old = document.getElementById(STYLE_ID);
        if (old && old.parentNode) old.parentNode.removeChild(old);
    }

    function apply() {
        removeStyle();
        if (read('enabled') === false) {
            if (document.documentElement) document.documentElement.classList.remove('luxo-v4');
            return;
        }

        var accent = safeAccent(read('accent'));
        var radius = read('radius') === '12px' ? '12px' : (read('radius') === '24px' ? '24px' : '18px');
        var scale = read('scale') === '1.02' ? '1.02' : (read('scale') === '1.07' ? '1.07' : '1.045');
        var blur = read('blur') === '6px' ? '6px' : (read('blur') === '18px' ? '18px' : '12px');
        var compact = read('compact') === true;

        var css = [
            ':root{--luxo-accent:' + accent + ';--luxo-radius:' + radius + ';--luxo-scale:' + scale + ';--luxo-blur:' + blur + '}',
            'html.luxo-v4 body{background:#090a0e!important}',
            'html.luxo-v4 .head,html.luxo-v4 .head__body{background:rgba(9,10,14,.88)!important;backdrop-filter:blur(var(--luxo-blur));-webkit-backdrop-filter:blur(var(--luxo-blur))}',
            'html.luxo-v4 .menu,html.luxo-v4 .menu__body{background:rgba(13,14,19,.97)!important}',
            'html.luxo-v4 .menu__item{border-radius:12px;margin:3px 8px;transition:background .18s ease,color .18s ease}',
            'html.luxo-v4 .menu__item.focus,html.luxo-v4 .menu__item.traverse,html.luxo-v4 .menu__item:hover{background:var(--luxo-accent)!important;color:#fff!important}',
            'html.luxo-v4 .card__view{border-radius:var(--luxo-radius)!important;overflow:hidden;transition:transform .18s ease,box-shadow .18s ease}',
            'html.luxo-v4 .card.focus .card__view,html.luxo-v4 .card:hover .card__view{transform:scale(var(--luxo-scale));box-shadow:0 9px 28px rgba(0,0,0,.48),0 0 0 2px var(--luxo-accent)}',
            'html.luxo-v4 .card__title{font-weight:600!important}',
            'html.luxo-v4 .card__vote{background:var(--luxo-accent)!important;border-radius:7px!important}',
            'html.luxo-v4 .items-line__title,html.luxo-v4 .category__title{font-weight:700!important;letter-spacing:.2px}',
            'html.luxo-v4 .full-start-new__title,html.luxo-v4 .full-start__title{font-weight:800!important}',
            'html.luxo-v4 .button--primary,html.luxo-v4 .selector__item.focus,html.luxo-v4 .settings-param__value.focus{background:var(--luxo-accent)!important;border-color:var(--luxo-accent)!important}',
            'html.luxo-v4 .settings-param__name{font-weight:600!important}',
            'html.luxo-v4 .modal__title,html.luxo-v4 .selectbox__title{font-weight:800!important}',
            'html.luxo-v4 .card__view img{border-radius:var(--luxo-radius)!important}',
            compact ? 'html.luxo-v4 .items-line{margin-bottom:1.1em!important}html.luxo-v4 .items-line__title{margin-bottom:.55em!important}' : '',
            '@media (prefers-reduced-motion:reduce){html.luxo-v4 *{transition:none!important;animation:none!important}}'
        ].join('\n');

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        (document.head || document.documentElement).appendChild(style);
        if (document.documentElement) document.documentElement.classList.add('luxo-v4');
    }

    function addSettings() {
        if (!Lampa.SettingsApi || !Lampa.SettingsApi.addComponent || !Lampa.SettingsApi.addParam) return;

        try {
            Lampa.SettingsApi.addComponent({
                component: COMPONENT,
                name: 'Luxo — оформление',
                icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20h1.2a2.8 2.8 0 0 0 2.1-4.7c-.5-.6-.1-1.3.7-1.3H18a4 4 0 0 0 4-4c0-5.5-4.5-10-10-10Zm-5.5 11A1.5 1.5 0 1 1 6.5 10a1.5 1.5 0 0 1 0 3Zm3-4A1.5 1.5 0 1 1 9.5 6a1.5 1.5 0 0 1 0 3Zm5 0A1.5 1.5 0 1 1 14.5 6a1.5 1.5 0 0 1 0 3Zm3 4A1.5 1.5 0 1 1 17.5 10a1.5 1.5 0 0 1 0 3Z"/></svg>'
            });

            function param(name, type, def, label, values, change) {
                var data = {
                    component: COMPONENT,
                    param: { name: name, type: type, default: def },
                    field: { name: label }
                };
                if (values) data.param.values = values;
                if (change) data.onChange = change;
                Lampa.SettingsApi.addParam(data);
            }

            param(KEYS.enabled, 'trigger', true, 'Включить оформление', null, apply);
            param(KEYS.accent, 'select', defaults.accent, 'Цвет акцента', [
                { title: 'Netflix — красный', value: '#e50914' },
                { title: 'Синий', value: '#168cff' },
                { title: 'Фиолетовый', value: '#8b5cf6' },
                { title: 'Бирюзовый', value: '#00bfa6' },
                { title: 'Оранжевый', value: '#ff8a00' }
            ], apply);
            param(KEYS.radius, 'select', defaults.radius, 'Скругление карточек', [
                { title: 'Небольшое', value: '12px' },
                { title: 'Среднее', value: '18px' },
                { title: 'Большое', value: '24px' }
            ], apply);
            param(KEYS.scale, 'select', defaults.scale, 'Увеличение при фокусе', [
                { title: 'Слабое', value: '1.02' },
                { title: 'Среднее', value: '1.045' },
                { title: 'Сильное', value: '1.07' }
            ], apply);
            param(KEYS.blur, 'select', defaults.blur, 'Размытие верхней панели', [
                { title: 'Слабое', value: '6px' },
                { title: 'Среднее', value: '12px' },
                { title: 'Сильное', value: '18px' }
            ], apply);
            param(KEYS.compact, 'trigger', false, 'Компактные отступы', null, apply);
        } catch (e) {
            if (window.console && console.log) console.log('[Luxo] settings error:', e);
        }
    }

    function init() {
        if (!window.Lampa) return;
        addSettings();
        apply();
        if (Lampa.Listener && Lampa.Listener.follow) {
            Lampa.Listener.follow('settings', function () {
                apply();
            });
        }
    }

    if (window.appready) {
        init();
    } else if (window.Lampa && Lampa.Listener && Lampa.Listener.follow) {
        Lampa.Listener.follow('app', function (event) {
            if (event && event.type === 'ready') init();
        });
        setTimeout(function () {
            if (window.appready) init();
        }, 1500);
    } else {
        var attempts = 0;
        var wait = setInterval(function () {
            attempts++;
            if (window.Lampa && (window.appready || (Lampa.Listener && Lampa.Listener.follow))) {
                clearInterval(wait);
                init();
            } else if (attempts > 30) {
                clearInterval(wait);
            }
        }, 500);
    }
})();