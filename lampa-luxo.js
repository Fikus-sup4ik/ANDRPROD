(function () {
    'use strict';
    var READY_FLAG='__luxo_interface_v3_ready', STYLE_ID='luxo-interface-v3-style', SETTINGS_ID='luxo_interface_v3', PREFIX='luxo_v3_';
    if(window[READY_FLAG]) return;
    window[READY_FLAG]=true;
    var defaults={enabled:true,accent:'#8b35e8',background:'#090a0f',radius:'14px',focusScale:'1.10',sidebar:'glass',compact:false,motion:'normal'};
    function value(key){try{var result=Lampa.Storage.field(PREFIX+key);return result===undefined||result===null?defaults[key]:result;}catch(e){return defaults[key];}}
    function cssText(){
      var accent=value('accent'),background=value('background'),radius=value('radius'),scale=value('focusScale'),sidebar=value('sidebar'),compact=value('compact'),motion=value('motion');
      var sideCss=sidebar==='solid'?'background:rgba(8,9,14,.98)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;':sidebar==='clear'?'background:rgba(8,9,14,.48)!important;backdrop-filter:blur(24px)!important;-webkit-backdrop-filter:blur(24px)!important;':'background:rgba(8,9,14,.86)!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important;';
      return [
        ':root{--luxo-accent:'+accent+';--luxo-bg:'+background+';--luxo-radius:'+radius+';--luxo-focus-scale:'+scale+';--luxo-glow:color-mix(in srgb,'+accent+' 34%,transparent);--luxo-text:#f4f3f7}',
        'html.luxo-interface,html.luxo-interface body{background:var(--luxo-bg)!important;color:var(--luxo-text)!important}',
        'html.luxo-interface body{font-family:Inter,Roboto,"Helvetica Neue",Arial,sans-serif!important}',
        'html.luxo-interface .head,html.luxo-interface .head__body{background:rgba(8,9,14,.72)!important;backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;border-bottom:1px solid rgba(255,255,255,.045)!important}',
        'html.luxo-interface .menu,html.luxo-interface .menu__body{'+sideCss+'border-right:1px solid rgba(255,255,255,.055)!important}',
        'html.luxo-interface .menu__item{border-radius:12px!important;margin:2px 8px!important;transition:background .18s ease,color .18s ease!important}',
        'html.luxo-interface .menu__item.focus,html.luxo-interface .menu__item.hover{background:var(--luxo-glow)!important;box-shadow:inset 3px 0 0 var(--luxo-accent)!important}',
        'html.luxo-interface .menu__item.focus .menu__text,html.luxo-interface .menu__item.hover .menu__text,html.luxo-interface .menu__item.focus .menu__ico,html.luxo-interface .menu__item.hover .menu__ico{color:#fff!important}',
        'html.luxo-interface .menu__text,html.luxo-interface .head__title{font-weight:600!important;letter-spacing:.01em!important}',
        'html.luxo-interface .card{transition:transform .2s cubic-bezier(.2,.8,.2,1),z-index 0s!important;transform-origin:center center!important}',
        'html.luxo-interface .card__view{border-radius:var(--luxo-radius)!important;overflow:hidden!important;border:1px solid rgba(255,255,255,.055)!important;box-shadow:0 7px 20px rgba(0,0,0,.2)!important}',
        'html.luxo-interface .card.focus,html.luxo-interface .card.hover{z-index:20!important;transform:scale(var(--luxo-focus-scale))!important}',
        'html.luxo-interface .card.focus .card__view,html.luxo-interface .card.hover .card__view{border-color:var(--luxo-accent)!important;box-shadow:0 0 0 1px var(--luxo-accent),0 12px 30px rgba(0,0,0,.42)!important}',
        'html.luxo-interface .items-line__title{font-weight:750!important;letter-spacing:.015em!important;text-shadow:0 2px 12px rgba(0,0,0,.4)!important}',
        'html.luxo-interface .card__title{font-weight:600!important}',
        'html.luxo-interface .card__vote{border-radius:8px!important;font-weight:800!important}',
        'html.luxo-interface .full-start-new__title,html.luxo-interface .full-start__title{font-weight:800!important;letter-spacing:-.025em!important;text-shadow:0 3px 18px rgba(0,0,0,.55)!important}',
        'html.luxo-interface .full-start__button,html.luxo-interface .full-start-new__button,html.luxo-interface .button--primary{background:var(--luxo-accent)!important;border-color:var(--luxo-accent)!important;border-radius:999px!important}',
        'html.luxo-interface .selector.focus,html.luxo-interface .selector.hover{outline-color:var(--luxo-accent)!important}',
        'html.luxo-interface .modal__content,html.luxo-interface .selectbox__content{border-radius:16px!important}',
        compact?'html.luxo-interface .items-line{padding-top:.55em!important;padding-bottom:.55em!important}html.luxo-interface .card__title{font-size:.82em!important}':'',
        motion==='reduced'?'html.luxo-interface *,html.luxo-interface *:before,html.luxo-interface *:after{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}':'',
        '@media(max-width:768px){html.luxo-interface .full-start-new__title,html.luxo-interface .full-start__title{font-size:1.8em!important}html.luxo-interface .menu{max-width:86vw!important}}',
        '@media(min-width:1600px){html.luxo-interface .full-start-new__title,html.luxo-interface .full-start__title{font-size:3em!important}}'
      ].join('\n');
    }
    function apply(){
      var old=document.getElementById(STYLE_ID);if(old&&old.parentNode)old.parentNode.removeChild(old);
      if(!value('enabled')){document.documentElement.classList.remove('luxo-interface');return;}
      document.documentElement.classList.add('luxo-interface');
      var style=document.createElement('style');style.id=STYLE_ID;style.type='text/css';style.appendChild(document.createTextNode(cssText()));
      (document.head||document.documentElement).appendChild(style);
    }
    function addSettings(){
      if(!Lampa.SettingsApi)return;
      Lampa.SettingsApi.addComponent({component:SETTINGS_ID,name:'Luxo — интерфейс',icon:'<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8l1.5 2.1 2.6-.1.8 2.5 2.4 1-.5 2.5 1.4 2.1-1.8 1.8.1 2.6-2.5.8-1 2.4-2.5-.5-2.1 1.4-1.8-1.8-2.6.1-.8-2.5-2.4-1 .5-2.5-1.4-2.1 1.8-1.8-.1-2.6 2.5-.8 1-2.4 2.5.5z"/><circle cx="12" cy="12" r="3"/></svg>'});
      function param(key,type,def,values,label,description){
        var p={component:SETTINGS_ID,param:{name:PREFIX+key,type:type,default:def},field:{name:label,description:description||''},onChange:function(){apply();}};
        if(values)p.param.values=values;Lampa.SettingsApi.addParam(p);
      }
      param('enabled','trigger',true,null,'Включить оформление Luxo','Отключает или включает оформление интерфейса.');
      param('accent','select','#8b35e8',{'#8b35e8':'Фиолетовый','#e50914':'Красный','#318ce7':'Синий','#18a879':'Бирюзовый','#e5a12b':'Золотой'},'Акцентный цвет');
      param('background','select','#090a0f',{'#090a0f':'Глубокий чёрный','#11131a':'Тёмно-серый','#080d14':'Сине-чёрный'},'Цвет фона');
      param('radius','select','14px',{'4px':'Почти квадратные','10px':'Небольшое скругление','14px':'Скруглённые','20px':'Сильно скруглённые'},'Скругление карточек');
      param('focusScale','select','1.10',{'1.00':'Без увеличения','1.06':'Слабое','1.10':'Среднее','1.14':'Сильное'},'Увеличение карточки при фокусе');
      param('sidebar','select','glass',{glass:'Полупрозрачное стекло',solid:'Непрозрачное',clear:'Более прозрачное'},'Боковое меню');
      param('compact','trigger',false,null,'Компактные ряды карточек');
      param('motion','select','normal',{normal:'Обычные анимации',reduced:'Минимальные анимации'},'Анимации');
    }
    function init(){if(!window.Lampa||!Lampa.SettingsApi||!Lampa.Storage)return;addSettings();apply();console.log('[Luxo] Interface v3 initialized');}
    if(window.appready)init();
    else if(window.Lampa&&Lampa.Listener)Lampa.Listener.follow('app',function(e){if(e.type==='ready')init();});
    else window.addEventListener('load',function(){if(window.Lampa&&Lampa.Listener)Lampa.Listener.follow('app',function(e){if(e.type==='ready')init();});});
})();