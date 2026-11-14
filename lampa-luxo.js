(function () {
    'use strict';
    var ID='lampa_luxo_v2', STYLE_ID='luxo-v2-style', initialized=false;
    var defaults={enabled:true,accent:'violet',cardShape:'rounded',compact:false,reduceMotion:false,showMenu:true};
    var accents={violet:'#922cff',blue:'#368cff',crimson:'#e94b67',mint:'#21b995',amber:'#e6a23c'};
    function get(k){try{var v=Lampa.Storage.get('luxo_v2_'+k);return v===undefined||v===null?defaults[k]:v;}catch(e){return defaults[k];}}
    function set(k,v){try{Lampa.Storage.set('luxo_v2_'+k,v);}catch(e){}}
    function styles(){
      var a=accents[get('accent')]||accents.violet, r=get('cardShape')==='square'?'7px':'18px';
      return [
        'html.luxo-v2{--luxo-accent:'+a+';--luxo-radius:'+r+';--luxo-glow:color-mix(in srgb,'+a+' 35%,transparent)}',
        'html.luxo-v2 body{background:#08090d!important}',
        'html.luxo-v2 .head,html.luxo-v2 .head__body{background:rgba(8,9,14,.9)!important;backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}',
        'html.luxo-v2 .menu,html.luxo-v2 .menu__body{background:rgba(9,10,16,.96)!important}',
        'html.luxo-v2 .menu__item{border-radius:13px!important;transition:background .18s ease,transform .18s ease}',
        'html.luxo-v2 .menu__item.focus,html.luxo-v2 .menu__item.hover{background:var(--luxo-accent)!important;box-shadow:0 5px 22px var(--luxo-glow)!important}',
        'html.luxo-v2 .card__view{border-radius:var(--luxo-radius)!important;overflow:hidden}',
        'html.luxo-v2 .card.focus .card__view,html.luxo-v2 .card.hover .card__view{box-shadow:0 0 0 2px var(--luxo-accent),0 12px 28px rgba(0,0,0,.4)!important}',
        'html.luxo-v2 .full-start__button,html.luxo-v2 .button--primary{background:var(--luxo-accent)!important;border-color:var(--luxo-accent)!important;border-radius:999px!important}',
        'html.luxo-v2 .selector.focus,html.luxo-v2 .selector.hover{outline-color:var(--luxo-accent)!important}',
        'html.luxo-v2 .modal__content,html.luxo-v2 .selectbox__content{border-radius:18px}',
        get('compact')?'html.luxo-v2 .card__title{font-size:.88em!important}html.luxo-v2 .card{margin-right:.45em!important}':'',
        get('reduceMotion')?'html.luxo-v2 *,html.luxo-v2 *:before,html.luxo-v2 *:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}':'',
        '.luxo-screen{min-height:70vh;padding:1.4em 2em 3em;color:#fff;box-sizing:border-box;background:radial-gradient(ellipse at 78% 8%,rgba(146,44,255,.22),transparent 38%),linear-gradient(145deg,#10111a,#08090d 62%)}',
        '.luxo-hero{position:relative;min-height:290px;border-radius:22px;overflow:hidden;padding:2.1em;box-sizing:border-box;display:flex;align-items:flex-end;background:radial-gradient(ellipse at 78% 28%,rgba(146,44,255,.5),transparent 38%),linear-gradient(110deg,#171321,#242039 52%,#10111a);border:1px solid rgba(255,255,255,.08)}',
        '.luxo-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,8,13,.96),rgba(7,8,13,.25) 75%),linear-gradient(0deg,rgba(7,8,13,.6),transparent 60%);pointer-events:none}',
        '.luxo-hero__content{position:relative;z-index:1;max-width:620px}',
        '.luxo-kicker{display:inline-block;color:#fff;background:var(--luxo-accent);border-radius:999px;padding:.38em .85em;font-size:.82em;margin-bottom:1em}',
        '.luxo-hero h1{font-size:2.7em;line-height:1.05;margin:0 0 .35em;font-weight:800}',
        '.luxo-hero p{color:rgba(255,255,255,.72);font-size:1.05em;max-width:540px;line-height:1.5;margin:.4em 0 1.2em}',
        '.luxo-actions{display:flex;flex-wrap:wrap;gap:.7em}',
        '.luxo-action{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:.85em 1.25em;background:rgba(255,255,255,.08);color:#fff;font-weight:700;cursor:pointer}',
        '.luxo-action--primary{background:var(--luxo-accent);border-color:var(--luxo-accent)}',
        '.luxo-section-title{font-size:1.35em;font-weight:800;margin:1.7em 0 .8em}',
        '.luxo-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.9em}',
        '.luxo-tile{min-height:112px;border-radius:16px;padding:1.15em;background:linear-gradient(135deg,rgba(255,255,255,.09),rgba(255,255,255,.025));border:1px solid rgba(255,255,255,.09);display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;color:#fff}',
        '.luxo-tile.focus,.luxo-tile:hover{border-color:var(--luxo-accent);background:linear-gradient(135deg,var(--luxo-glow),rgba(255,255,255,.04))}',
        '.luxo-tile__icon{font-size:1.65em;margin-bottom:.5em}',
        '.luxo-tile__title{font-size:1.05em;font-weight:750}',
        '.luxo-tile__sub{font-size:.82em;color:rgba(255,255,255,.55);margin-top:.25em}',
        '@media(max-width:700px){.luxo-screen{padding:1em}.luxo-hero{min-height:250px;padding:1.3em}.luxo-hero h1{font-size:2em}.luxo-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}'
      ].join('\n');
    }
    function apply(){
      var root=document.documentElement, old=document.getElementById(STYLE_ID);
      if(old)old.remove();
      if(!get('enabled')){root.classList.remove('luxo-v2');return;}
      root.classList.add('luxo-v2');
      var s=document.createElement('style');s.id=STYLE_ID;s.textContent=styles();
      (document.head||document.documentElement).appendChild(s);
    }
    function category(title,url,type){
      Lampa.Activity.push({url:url,title:title,component:'category',source:'tmdb',card_type:type||'movie',page:1});
    }
    function Home(){
      var html;
      function tile(icon,title,sub,fn){
        return $('<div class="luxo-tile selector"><div><div class="luxo-tile__icon">'+icon+'</div><div class="luxo-tile__title">'+title+'</div></div><div class="luxo-tile__sub">'+sub+'</div></div>').on('hover:enter click',fn);
      }
      this.create=function(){
        html=$('<div class="luxo-screen"><section class="luxo-hero"><div class="luxo-hero__content"><span class="luxo-kicker">ВАШ КИНОМИР</span><h1>Смотри. Выбирай.<br>Наслаждайся.</h1><p>Фильмы, сериалы и подборки в одном месте. Новый визуальный стиль Lampa без вмешательства в воспроизведение.</p><div class="luxo-actions"><div class="luxo-action luxo-action--primary selector">Открыть популярное</div><div class="luxo-action selector">Новинки кино</div></div></div></section><div class="luxo-section-title">Исследуй каталог</div><div class="luxo-grid"></div></div>');
        var a=html.find('.luxo-action');
        a.eq(0).on('hover:enter click',function(){category('Популярные фильмы','movie/popular','movie');});
        a.eq(1).on('hover:enter click',function(){category('Новинки кино','movie/now_playing','movie');});
        var g=html.find('.luxo-grid');
        g.append(tile('▶','Популярные фильмы','То, что смотрят сейчас',function(){category('Популярные фильмы','movie/popular','movie');}));
        g.append(tile('▣','Популярные сериалы','Сериалы для вечера',function(){category('Популярные сериалы','tv/popular','tv');}));
        g.append(tile('✦','Сейчас в кино','Свежие премьеры',function(){category('Сейчас в кино','movie/now_playing','movie');}));
        g.append(tile('★','Лучшие фильмы','Высокие оценки',function(){category('Лучшие фильмы','movie/top_rated','movie');}));
        g.append(tile('🔥','В тренде','Популярное сегодня',function(){category('В тренде','trending/all/day','movie');}));
        g.append(tile('⚙','Настройки Luxo','Цвета и внешний вид',function(){Lampa.Activity.push({url:'',title:'Настройки Luxo',component:'settings'});}));
        return this.render();
      };
      this.start=function(){};this.render=function(){return html;};this.stop=function(){};this.destroy=function(){if(html)html.remove();};
    }
    function addMenu(){
      if(!get('showMenu'))return;
      var list=$('.menu .menu__list').eq(0);
      if(!list.length||list.find('.luxo-menu-entry').length)return;
      var b=$('<li class="menu__item selector luxo-menu-entry"><div class="menu__ico"><svg width="44" height="44" viewBox="0 0 44 44" fill="none"><path d="M22 4l4.2 8.5 9.4 1.4-6.8 6.6 1.6 9.3-8.4-4.4-8.4 4.4 1.6-9.3-6.8-6.6 9.4-1.4L22 4z" fill="currentColor"/></svg></div><div class="menu__text">Luxo</div></li>');
      b.on('hover:enter click',function(){Lampa.Activity.push({url:'',title:'Luxo',component:'luxo_home',page:1});});
      list.append(b);
    }
    function settings(){
      Lampa.SettingsApi.addComponent({component:ID,name:'Luxo — новый интерфейс',icon:'<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l2 2 3-.2 1.2 2.7 2.7 1.2-.2 3 2 2-2 2 .2 3-2.7 1.2L17 21l-3-.2-2 2-2-2-3 .2-1.2-2.7L3 17l.2-3-2-2 2-2L3 7l2.7-1.2L7 3l3 .2z"/><circle cx="12" cy="12" r="3"/></svg>'});
      function param(k,t,d,values,label,cb){
        var p={component:ID,param:{name:'luxo_v2_'+k,type:t,default:d},field:{name:label}};
        if(values)p.param.values=values;
        p.onChange=function(v){set(k,v);if(cb)cb();apply();};
        Lampa.SettingsApi.addParam(p);
      }
      param('enabled','trigger',true,null,'Включить оформление Luxo');
      param('accent','select','violet',{violet:'Фиолетовый',blue:'Синий',crimson:'Малиновый',mint:'Бирюзовый',amber:'Золотой'},'Акцентный цвет');
      param('cardShape','select','rounded',{rounded:'Скруглённые',square:'Прямые'},'Форма карточек');
      param('compact','trigger',false,null,'Компактные карточки');
      param('reduceMotion','trigger',false,null,'Уменьшить анимации');
      param('showMenu','trigger',true,null,'Показывать пункт Luxo в меню',function(){if(get('showMenu'))addMenu();else $('.luxo-menu-entry').remove();});
    }
    function init(){
      if(initialized||!window.Lampa||!Lampa.SettingsApi||!Lampa.Component)return;
      initialized=true;
      if(!Lampa.Component.get('luxo_home'))Lampa.Component.add('luxo_home',Home);
      settings();apply();addMenu();
      Lampa.Listener.follow('app',function(e){if(e.type==='ready'){apply();addMenu();}});
      console.log('[Luxo] v2 loaded');
    }
    if(!window[ID+'_ready']){
      window[ID+'_ready']=true;
      if(window.appready)init();
      else if(window.Lampa&&Lampa.Listener)Lampa.Listener.follow('app',function(e){if(e.type==='ready')init();});
      else window.addEventListener('load',init);
    }
})();