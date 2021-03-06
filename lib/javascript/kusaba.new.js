﻿var style_cookie;
var style_cookie_txt;
var style_cookie_site;
var kumod_set=false;
var ispage;
var is_entering=false;
var injectDestination = "img_global.css";

var embed_class =
{
	link_templates : 
	[
		{
			src  : 'youtube\\.com/watch\\?v=',
			tgt  : 'youtube.com/watch?v=',
			code : '<div class="thumb youtube embed wrapper" style="margin: 0px 20px 0px 0px; background-image:url(https://i.ytimg.com/vi/$3/0.jpg)" data-id="$3" data-site="youtube"></div>'
		},
		{
			src  : 'youtu\\.be/',
			tgt  : 'youtu.be/',
			code : '<div class="thumb youtube embed wrapper" style="margin: 0px 20px 0px 0px; background-image:url(https://i.ytimg.com/vi/$3/0.jpg)" data-id="$3" data-site="youtube"></div>'
		},
		{
			src  : 'vimeo\\.com/',
			tgt  : 'vimeo.com/',
			code : '<div style="margin: 0px 20px 0px 0px;"><iframe src="https://player.vimeo.com/video/$3" width="368" height="237" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>'
		},
		{
			src  : 'coub\\.com/view/',
			tgt  : 'coub.com/view/',
			code : '<div style="margin: 0px 20px 0px 0px;"><iframe src="//coub.com/embed/$3?muted=false&autostart=false&originalSize=false&startWithHD=false" allowfullscreen="true" frameborder="0" width="368" height="207"></iframe></div>'
		}
	],

	link_replacements: new Array,
	
	init: function()
	{
		embed_class.link_templates.forEach(function(item)
		{
			// Four different cases. I don't know how to simplify it more.
			
			embed_class.link_replacements.push // !alwaysvisible + !nospan
			({
				regexp: new RegExp('<a target="_new" href="http(s)?://(www\\.)?'+item.src+'(.*?)">(.*?)</a>','gm'),
				data:   '<span class="newvideolink"><a target="_new" href="http$1://$2'+item.tgt+'$3">$4</a></span><span class="newvideobox"><span style="float: left;">'+item.code+'</span></span>'
			});
			embed_class.link_replacements.push // !alwaysvisible + nospan
			({
				regexp: new RegExp('<a target="_new" class="nospan" href="http(s)?://(www\\.)?'+item.src+'(.*?)">(.*?)</a>','gm'),
				data:   '<span class="newvideolink"><a target="_new" href="http$1://$2'+item.tgt+'$3">$4</a></span><span class="newvideobox">'+item.code+'</span>'
			});
			embed_class.link_replacements.push // alwaysvisible + !nospan
			({
				regexp: new RegExp('<a target="_new" class="alwaysvisible" href="http(s)?://(www\\.)?'+item.src+'(.*?)">(.*?)</a>','gm'),
				data:   '<span style="float: left;">'+item.code+'</span>'
			});
			embed_class.link_replacements.push // alwaysvisible + nospan
			({
				regexp: new RegExp('<a target="_new" class="nospan alwaysvisible" href="http(s)?://(www\\.)?'+item.src+'(.*?)">(.*?)</a>','gm'),
				data:   item.code
			});
		});
	},
	
	process_links: function(where)
	{
		$(where + 'blockquote').each(function(index,element)
		{
			embed_class.link_replacements.forEach(function(link)
			{
				var txt = element.innerHTML;
				var txt_new = txt.replace(link.regexp,link.data);
				if (txt != txt_new)
				{
					element.innerHTML = txt_new;
				}
			});
		});
		$('.catalogtd').each(function(index,element)
		{
			embed_class.link_replacements.forEach(function(link)
			{
				var txt = element.innerHTML;
				var txt_new = txt.replace(link.regexp,link.data);
				if (txt != txt_new)
				{
					element.innerHTML = txt_new;
				}
			});
		});
	}
}

embed_class.init();

var touhou = false;

function touhou_replaceText(selector, text, newText, flags) {
  var matcher = new RegExp(text, flags);
  $(selector).each(function () {
    var $this = $(this);
    if (!$this.children().length)
       $this.text($this.text().replace(matcher, newText));
  });
}

function touhou_replaceAllText() {
  touhou_replaceText('*', '/sg/ - steins;gate', '/gs/ - gen;soukyo', 'g');
  touhou_replaceText('*', '/vg/ - video;games', '/hg/ - haku;gyokurou', 'g');
  $('.postmessage').each(function() {$(this).html($(this).html().replace(new RegExp('урисач','g'),'ирисамеач'))});
  $('.logo').before('<center><img src="/images/cirno_banner.png"></center>');
  if (document.forms[1] && document.forms[1].v) document.forms[1].v.value = "BAKA JANAI!";
}

if (touhou)
{
	$('head').append('<link rel="stylesheet" type="text/css" href="/css/styles/menu_winter.css">');
	$('head').append('<link rel="stylesheet" type="text/css" href="/css/styles/winter.css">');
	$('document').ready(function() {touhou_replaceAllText();});
}

var _messages = {
  en: {
    noLocalStorage: "Your browser does not support LocalStorage",
    loading: "Загрузка",
    oops: "Something went wrong...",
    blankResponse: "blank response",
    watchlistAdd: "Тред добавлен в список избранных.",
    expandingThread: "Expanding thread...",
    newThread: "new thread",
    NewThread: "New thread",
    replyTo: "reply to",
    cancel: "Cancel",
    close: "Close",
    update: "Update", 
    search: "Search", 
    updatingCounts: "Updating...",
    couldntFetch: "Cold not fetch this post",
    noNewPosts: "No new posts",
    replies: "Replies",
    settings_fxEnabled: "Animation effects",
    settings_scrollMode: "Show scrolling controls",
    settings_showReplies: "Show replies inside posts",
    settings_sfwMode: "NSFW mode",
    settings_widthMode: "Full-width posts",
    settings_postnumberMode: "Show post numbers",
	settings_autoRefresh: "Automatically get new posts",
	settings_soundRefresh: "Play sound on new posts",
	settings_closePrevewOnClick: "Close post preview on click rather than moving mouse out",
    settings_smiliesMode: "Cirno-thread smilies",
    settings_postingMode: "Update page after posting rather than reload",
    settings_sendThroughJS: "Send posts through javascript",
	settings_sendCtrlEnter: "Send post by Ctrl+Enter",
    settings_expandImgFull: "Expand images to full size",
    settings_animatedPreviews: "Show animated previews",
    settings_oldSearch: "Show search at right rather than in menu",
    settings_videoboxes: "Expand every video link",
    settings_showyou: "Show (You) in posts",
    deletePost: "Delete post", 
    deleteAndBan: "Delete post and ban poster",
    enterCaptcha: "Please enter captcha.",
    selectText: "Select some text",
    dcls: "Double click to show source",
    watchOn: "Watch on",
    captcharot: "Captcha has rotted",
    threadUpdationAutomatically: "Tread is being updated automatically.",
    stopFuckingDolls: "<b>Отключите AJAX-отправку постов и AJAX-обновление треда.</b><br />(Кликните, чтобы закрыть)",
    delete: "Delete",
    delandban: "Delete and ban",
    ban: "Ban",
    stickthread: "Stick thread",
    unstickthread: "Unstick thread",
    lockthread: "Lock thread",
    unlockthread: "Unlock thread",
    returnDesktop: "Switch to desktop interface",
    returnTouch: "Switch to touch interface",
    impliedTouch: "Your device is recognized as touch device.",
    impliedDesktop: "Your device is recognized as desktop device.",
    forceDesktop: "Force Desktop interface",
    okay: "Okay",
    captchalang: "Captcha language",
    reply: "Reply",
    imageDownscaledBy: "Image was downscaled by",
    videoDownscaledBy: "Video was downscaled by",
    toFit: "to feet screen",
    newReplies: "New replies",
    newThreadsAvailable: "New threads available.",
    loading: "Loading"
  },
  ru: {
    noLocalStorage: "localStorage не поддерживается браузером",
    loading: "Загрузка",
    oops: "Что-то пошло не так...",
    blankResponse: "пустой ответ",
    watchlistAdd: "Тред добавлен в список избранных.",
    watchlistRemove: "Тред удалён из списка избранных.",
    expandingThread: "Разворачиваем тред...",
    newThread: "новый тред",
    NewThread: "Создать тред",
    replyTo: "ответ на",
    cancel: "Отмена",
    close: "Закрыть",
    update: "Обновить", 
    search: "Поиск", 
    updatingCounts: "Ищем новые посты...",
    couldntFetch: "Не удалось загрузить этот пост",
    noNewPosts: "Нет новых постов",
    replies: "Ответы",
    settings_fxEnabled: "Анимированные эффекты",
    settings_scrollMode: "Показывать кнопки прокрутки",
    settings_showReplies: "Показывать ответы внутри поста",
    settings_sfwMode: "Мамка в комнате",
    settings_widthMode: "Посты в ширину экрана",
	settings_autoRefresh: "Автоматически получать новые посты",
	settings_soundRefresh: "Звуковые оповещения о новых постах",
	settings_closePrevewOnClick: "Закрывать предпросмотр поста по клику, а не отведению мышки",
    settings_postnumberMode: "Показывать номера постов",
    settings_smiliesMode: "Смайлы для обитателей сырнотреда",
    settings_postingMode: "Javascript-подгрузка постов после отправки",
    settings_sendThroughJS: "Отправлять посты через javascript",
	settings_sendCtrlEnter: "Отправка поста по Ctrl+Enter",
    settings_expandImgFull: "Разворачивать картинки до исходного размера",
    settings_animatedPreviews: "Анимированный предпросмотр картинок",
    settings_oldSearch: "Показывать поиск справа, а не в меню",
    settings_videoboxes: "Разворачивать все ссылки на видео",
    settings_showyou: "Показывать (You) в постах",
    deletePost: "Удалить пост", 
    deleteAndBan: "Удалить пост и забанить постера",
    enterCaptcha: "Пожалуйста, введите капчу.",
    selectText: "Текст не выделен",
    dcls: "Double click to show source",
    watchOn: "Смотреть на",
    odc: "javascript:LatexIT.replaceWithSrc(this);",  
    captcharot: "Капча протухла",
    threadUpdationAutomatically: "Тред обновляется автоматически",
    stopFuckingDolls: "<b>Отключите AJAX-отправку постов и AJAX-обновление треда.</b><br />(Кликните, чтобы закрыть)",
    delete: "Удалить",
    delandban: "Удалить и забанить",
    ban: "Забанить",
    stickthread: "Прикрепить тред",
    unstickthread: "Отлепить тред",
    lockthread: "Закрыть тред",
    unlockthread: "Открыть тред",
    returnDesktop: "Switch to desktop interface",
    returnTouch: "Switch to touch interface",
    impliedTouch: "Your device is recognized as touch device.",
    impliedDesktop: "Your device is recognized as desktop device.",
    forceDesktop: "Force Desktop interface",
    okay: "Ясно",
    captchalang: "Язык капчи",
    reply: "Ответить",
    imageDownscaledBy: "Картинка ужата на",
    videoDownscaledBy: "Видео ужато на",
    toFit: "по размеру окна",
    newReplies: "Новых ответов",
    newThreadsAvailable: "Доступны новые треды.",
    loading: "Загружаем"
  }
}

var _ = (typeof locale !== 'undefined' && _messages.hasOwnProperty(locale)) ? _messages[locale] : _messages.ru;

function trace() {
  if (!console.log) return;
  
  var f = arguments.callee.caller;
  var path = arguments[0];
  if (path == '') path += "trace()";
  
  while (f != null) {
    var re = /function ([^\(]+)/;
    var fname = re.exec(f.toString());
    if (fname == null) fname = ''; else fname = fname[1];
    var args = [];
    for (var i = 0; i < f.arguments.length; i++) args.push(f.arguments[i]);
    fname += "(" + args.join(', ') + ")"; 
    path += ' <- ' + fname;
    f = f.caller;
  }
  console.log(path);
}

/* IE/Opera fix, because they need to go learn a book on how to use indexOf with arrays */
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(elt /*, from*/) {
  var len = this.length;

  var from = Number(arguments[1]) || 0;
  from = (from < 0) ? Math.ceil(from) : Math.floor(from);
  if (from < 0)
    from += len;

  for (; from < len; from++) {
    if (from in this &&
      this[from] === elt)
    return from;
  }
  return -1;
  };
}
  
/* Utf8 strings de-/encoder */
var Utf8 = {
  // public method for url encoding
  encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  },
  // public method for url decoding
  decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while ( i < utftext.length ) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}

function Cookie(name) {
  if (arguments.length == 1) {
    with(document.cookie) {
      var regexp=new RegExp("(^|;\\s+)"+name+"=(.*?)(;|$)");
      var hit=regexp.exec(document.cookie);
      if(hit&&hit.length>2) return Utf8.decode(unescape(replaceAll(hit[2],'+','%20')));
      else return '';
    }
  } else {
    var value = arguments[1];
    var days = arguments[2];
    if(days) {
      var date=new Date();
      date.setTime(date.getTime()+10800+(days*24*60*60*1000));
      var expires="; expires="+date.toGMTString();
    } else expires="";
    document.cookie=name+"="+value+expires+"; path=/";
  }
}

function replaceAll(str, from, to) {
  var idx = str.indexOf( from );
  while ( idx > -1 ) {
    str = str.replace( from, to );
    idx = str.indexOf( from );
  }
  return str;
}

function textareaInsert(text) {
	var textarea = document.forms.postform.message;
	if(!textarea) {
		textarea = document.forms.postform.elements['top-textarea'];
	}
	if (!textarea) return false;
	
	if(textarea.createTextRange && textarea.caretPos) { // IE 
		var caretPos = textarea.caretPos;
		caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == " " ? text + " " : text;
	} else if(textarea.setSelectionRange) { // Firefox 
		var start = textarea.selectionStart;
		var end = textarea.selectionEnd;
		textarea.value = textarea.value.substr(0,start) + text + textarea.value.substr(end);
		textarea.setSelectionRange(start+text.length,start+text.length);
	} else {
		textarea.value+=text+" ";
	}
	textarea.focus();
}

function textareaGetBeforeCursor(text) {
	var textarea = document.forms.postform.message;
	if(!textarea) {
		textarea = document.forms.postform.elements['top-textarea'];
	}
	if (!textarea) return false;
	
	if(textarea.setSelectionRange) {
		var start = textarea.selectionStart;
		return textarea.value.substr(0,start);
	} else {
		return false;
	}
}

function insert(text) {
	textareaInsert(text);
	return false;
}

function markup($target, start, end, istart, iend) {
  element = $target.find('textarea').get(0);
  if (element.selectionStart || element.selectionStart == '0') {
    var startPos = element.selectionStart;
    var endPos = element.selectionEnd;
    var selected = element.value.substring(startPos, endPos);
    if(selected.indexOf('\n') === (-1) && typeof istart !== "undefined" && typeof iend !== "undefined") {
      start = istart; end = iend;
    }
    if (selected === "" && start === ">>>" && end === "<<<")
      if (sph_get_selected_text() !== "") {
          /* only if nothing is selected in textarea, and something is selected in page */
	      sph_quote_selected();
	      return;
	  }

    var beforeSelection = element.value.substring(0, startPos);
    var textSelection = element.value.substring(startPos, endPos);
    var afterSelection = element.value.substring(endPos, element.value.length);
    element.value = beforeSelection + start + textSelection + end + afterSelection;
	
	// Alter cursor position
	element.setSelectionRange(startPos + start.length, endPos + start.length);
  } else {
    element.value += start + end;
  }
  element.focus();
}

function bullets($target, bullet, istart, iend) {
  var $area = $target.find('textarea');
  var element = $area.get(0);
  var startPos = element.selectionStart;
  var endPos = element.selectionEnd;
  var selected = $area.val().substring(startPos, endPos); 
  if(selected.indexOf('\n') === (-1) && typeof istart !== "undefined" && typeof iend !== "undefined") {
    element.value = element.value.substring(0, startPos) + istart + element.value.substring(startPos, endPos) + iend + element.value.substring(endPos, element.value.length);
  }
  else {
    var selected = $area.val().substring(startPos, endPos).split('\n');
    var newtxt = "";
    for(var i=0; i<selected.length; i++) {
      newtxt += (bullet + selected[i]);
      if(i < (selected.length - 1)) newtxt += '\n';
    }
    $area.val(
      $area.val().substring(0, startPos) 
      + newtxt + 
      $area.val().substring(endPos)
    );  
  }
} 
  
function quote(b, a) { 
  var v = eval("document." + a + ".message");
  v.value += ">>" + b + "\n";
  v.focus();
}

function checkhighlight() {
  var match;
  if(match=/#i([0-9]+)/.exec(document.location.toString()))
    if(!document.forms.postform.message.value)
      insert_postnum(match[1]);
  if(match=/#([0-9]+)/.exec(document.location.toString()))
    highlight(match[1]);
}

function highlight(post, checknopage) {
  if (checknopage && ispage)  return;
  closePostPreviews();
  var timer = setTimeout(function()
  {
	  $('.highlight').removeClass('highlight').addClass('reply');
	  $("#reply" + post).removeClass('reply').addClass('highlight');
	  var match = /^([^#]*)/.exec(document.location.toString());
	  document.location = match[1] + "#" + post;
  }, 150);
}    
  
function get_password(name) {
  var pass = getCookie(name);
  if(pass) return pass;

  var chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var pass='';

  for(var i=0;i<8;i++) {
    var rnd = Math.floor(Math.random()*chars.length);
    pass += chars.substring(rnd, rnd+1);
  }
  Cookie(name, pass, 365);
  return(pass);
}

/* used for textboards only, deleted, src in clean */
function toggleOptions(D,C,B){ trace('deprecated!') }

// proxied functions
function getCookie(name)                {   return Cookie(name)                     }  
function set_cookie(name,value,days)    {   return Cookie(name,value,days)          }       

var Styles = {
  all: [], titles: [],
  init: function() {
    iter(document.getElementsByTagName("link"), function(link) {
      if(link.getAttribute("rel").indexOf("style")!=-1 && link.getAttribute("title")) {
        Styles.all.push(link);
        Styles.titles.push(link.getAttribute("title"));
        if(link.getAttribute("rel").indexOf("alternate")===-1) {
          Styles.default = link.getAttribute("title");
        }
        if(link.hasAttribute("data-custom")) {
          Styles.custom = link.getAttribute("title");
        }
      }
    });
    this.current = this.default;
    var customBypass = getCookie('bypasscustom');
    this.customBypass = (customBypass.length && typeof this_board_dir !== 'undefined' && in_array(this_board_dir, customBypass.split('|'))) ? true : false;
  },
  decide: function() {
    this.init();        
    if(this.hasOwnProperty('custom') && !this.customBypass) 
      return this.setCustom();
    var sc = getCookie(style_cookie);
    if(sc && in_array(sc, this.titles))
      this.setStyle(sc);
    else {
      this.setDefault();
      set_cookie("kustyle_site",this.default,365);
      set_cookie("kustyle",this.default,365); 
    }
  },
  change: function(stylename) {
    if(!in_array(stylename, this.titles) || this.current === stylename) return;
    this.setStyle(stylename);
    if(this.hasOwnProperty('custom') && this.custom === stylename) {
      this.removeBypass();
    }
    else {
      if(this.hasOwnProperty('custom'))
        this.addBypass();
      set_cookie("kustyle_site",stylename,365);
      set_cookie("kustyle",stylename,365);    
    }
	if(parent.menu){parent.menu.location.reload();}
	if(parent.main){parent.main.location.reload();}
  },
  removeBypass: function() {
    if(!this.customBypass || typeof this_board_dir === 'undefined') return;
    this.customBypass = false;
    var oldcookie = getCookie('bypasscustom').split('|'), newcookie = [];
    iter(oldcookie, function(brd) {
      if(brd !== this_board_dir) newcookie.push(brd);
    });
    newcookie = newcookie.length ? newcookie.join('|') : '';
    set_cookie("bypasscustom",newcookie,365);
  },
  addBypass: function() {
    if(this.customBypass || typeof this_board_dir === 'undefined') return;
    this.customBypass = true;
    var cookie = getCookie('bypasscustom').split('|');
    if(!in_array(this_board_dir, cookie)) {
      cookie.push(this_board_dir);
      set_cookie("bypasscustom",cookie.join('|'),365);
    }
  },
  setDefault: function() {
    if(this.hasOwnProperty('default') && this.current !== this.default)
      this.setStyle(this.default);
  },
  setCustom: function() {
    if(this.hasOwnProperty('custom'))
      this.setStyle(this.custom);
  },
  setStyle: function(stylename) {
    if(!in_array(stylename, this.titles)) return;
    iter(this.all, function(sheet) {
      sheet.disabled=true;    // Hello IE
      if(sheet.getAttribute("title") === stylename)
        sheet.disabled=false;
    });
    this.current = stylename;
  }
}

if(style_cookie) Styles.decide();

function delandbanlinks($scope, force) {
  if(typeof force === 'undefined') force = false;
  if ((!kumod_set && !force) || typeof $scope === 'undefined') return;
  $scope.find('span[id^=dnb]').each(function(index,element) {
    dnbinfo = $(this).attr('id').split('-');

    if (dnbinfo[2] != '?????')
	{
		var newhtml = '&nbsp;<span class="btngroup">';
		
		newhtml += '<a href="' + ku_cgipath + '/manage_page.php?action=delposts&boarddir=' + dnbinfo[1] + '&delpostid=' + dnbinfo[2] + '" title="'+_.delete+'" onclick="return confirm(\''+_.deletePost+'?\');"><img src="'+ku_boardspath+'/css/icons/blank.gif" class="delete spritebtn sb-l"><\/a>';
		
		newhtml += '<a href="' + ku_cgipath + '/manage_page.php?action=delposts&do_ban=true&boarddir=' + dnbinfo[1] + '&delpostid=' + dnbinfo[2] + '" title="'+_.delandban+'" onclick="return confirm(\''+_.deleteAndBan+'?\');"><img src="'+ku_boardspath+'/css/icons/blank.gif" class="dandb spritebtn sb-c"><\/a>';
		
		newhtml +='<a href="' + ku_cgipath + '/manage_page.php?action=bans&banboard=' + dnbinfo[1] + '&banpost=' + dnbinfo[2] + '" title="'+_.ban+'"><img src="'+ku_boardspath+'/css/icons/blank.gif" class="ban spritebtn sb-r"><\/a></span>&nbsp;';

		if (dnbinfo[3] == 'y')
		{
		  
		  newhtml += '<span class="btngroup"><a href="' + ku_cgipath + '/manage_page.php?action=stickypost&board=' + dnbinfo[1] + '&postid=' + dnbinfo[2] + '" title="'+_.stickthread+'" ><img src="'+ku_boardspath+'/css/icons/blank.gif" class="stick spritebtn sb-l"><\/a><a href="' + ku_cgipath + '/manage_page.php?action=unstickypost&board=' + dnbinfo[1] + '&postid=' + dnbinfo[2] + '" title="'+_.unstickthread+'" ><img src="'+ku_boardspath+'/css/icons/blank.gif" class="unstick spritebtn sb-r"><\/a></span>&nbsp;';
		  
		  newhtml += '<span class="btngroup"><a href="' + ku_cgipath + '/manage_page.php?action=lockpost&board=' + dnbinfo[1] + '&postid=' + dnbinfo[2] + '" title="'+_.lockthread+'" ><img src="'+ku_boardspath+'/css/icons/blank.gif" class="lock spritebtn sb-l"><\/a><a href="' + ku_cgipath + '/manage_page.php?action=unlockpost&board=' + dnbinfo[1] + '&postid=' + dnbinfo[2] + '" title="'+_.unlockthread+'" ><img src="'+ku_boardspath+'/css/icons/blank.gif" class="unlock spritebtn sb-r"><\/a></span>';
		  
		}
	}

    $(this).html(newhtml);
  });
}

var HiddenThreads = {
  list: function() {
    if (localStorage == null) {
      trace(_.noLocalStorage);
      return [];
    }
    var list = localStorage.getItem('hiddenThreads.' + this_board_dir);
    if (list == null) return [];
    return list.split(',');
  },
  isHidden: function(threadid) { return HiddenThreads.list().indexOf(threadid) != -1 },
  hide: function(threadid) { 
    if (localStorage == null) alert(_.noLocalStorage);
    else {
      var newlist = HiddenThreads.list();
      newlist.push(threadid.toString());
      localStorage.setItem('hiddenThreads.' + this_board_dir, newlist.join(','));
    }
  },
  unhide: function(threadid) { 
    if (localStorage == null) alert(_.noLocalStorage);
    else {
      var list = HiddenThreads.list();
      var i = list.indexOf(threadid.toString());
      if (i == -1) return;
      var newlist = list.slice(0,i);
      newlist = newlist.concat(list.slice(i+1));
      localStorage.setItem('hiddenThreads.' + this_board_dir, newlist.join(','));
    }
  }
}
  
function togglethread(threadid) {
  if (HiddenThreads.isHidden(threadid)) {
    $('#unhidethread' + threadid + this_board_dir).slideUp();
    $('#thread' + threadid + this_board_dir).slideDown();
    HiddenThreads.unhide(threadid);
  } else {
    $('#unhidethread' + threadid + this_board_dir).slideDown();
    $('#thread' + threadid + this_board_dir).slideUp();
    HiddenThreads.hide(threadid);
  }
  return false;
}
  
function toggleblotter() {
  $('.blotter-entries').each(function(index,element) {
    $(this).slideToggle(function() {
      if($(this).is(":hidden")) {
        Cookie('ku_showblotter', '0', 365);
      } else {
        Cookie('ku_showblotter', '1', 365);
      }
    });
  });
}

function hideblotter() {
   $('.blotter-entries').each(function(index,element) {
    $(this).hide();
  });
}

function showemails()
{
	// Cloudflare hack.
	(function(){try{var s,a,i,j,r,c,l=document.getElementsByTagName("a"),t=document.createElement("textarea");for(i=0;l.length-i;i++){try{a=l[i].getAttribute("href");if(a&&a.indexOf("/cdn-cgi/l/email-protection") > -1  && (a.length > 28)){s='';j=27+ 1 + a.indexOf("/cdn-cgi/l/email-protection");if (a.length > j) {r=parseInt(a.substr(j,2),16);for(j+=2;a.length>j&&a.substr(j,1)!='X';j+=2){c=parseInt(a.substr(j,2),16)^r;s+=String.fromCharCode(c);}j+=1;s+=a.substr(j,a.length-j);}t.innerHTML=s.replace(/</g,"&lt;").replace(/>/g,"&gt;");l[i].setAttribute("href","mailto:"+t.value);}}catch(e){}}}catch(e){}})();	
}

function expandthread(threadid, board) {
  if(dcxt.enabled) {
    $('#replies' + threadid + board).parent().find('.de-btn-expthr').trigger('click');
  }
  else if ($('#replies' + threadid + board).get() != '') {
    $('#replies' + threadid + board).prepend("<img src=\""+ku_boardspath+"/images/loading16x16.gif\" style=\"vertical-align: text-bottom;\" /> " + _.expandingThread + '<br />');
    $.ajax({
      url: ku_boardspath + '/expand.php?board=' + board + '&threadid=' + threadid,
      success: function(data) {
        var rep = $('#replies' + threadid + board);
        if (data) {
          rep.html(data);
		  tasksAfterModify('#replies' + threadid + board);
          rep.hide().fadeIn();
        } else {
          $('#replies' + threadid + board).prepend(_.oops + " ("+_.blankResponse+")");
        }
      },
      error: function(xhr, status) {
        $('#replies' + threadid + board).prepend(_.oops + " (" + status + ")");
      }
    });
    return false;
  }
  
}   

function tasksAfterModify(newly_added)
{
	// newly_added = false if no complex processing needed
	// newly_added = '' (or not specified) to process whole page
	// newly_added = '#selector' to process only a selector
	
	if (typeof newly_added === "undefined") newly_added = '';
	if (newly_added !== false)
	{
		hide_unwanted_posts(newly_added);
		if (newly_added != '') newly_added += ' ';
		embed_class.process_links(newly_added);
	}

	Settings.sfwMode(false);
	Settings.showReplies(false);
	Settings.smiliesMode(false);
	// Change double quotes to new class
	$('.unkfunc').filter(function(){return this.innerHTML.substr(0,8) == '&gt;&gt;';}).toggleClass('unkfunc unkfunc2');
	showemails();
	showreplies();
	Settings.videoboxes(false);
	Settings.showyou(false);
}

function hide_unwanted_posts(newly_added)
{
	if(newly_added == '') newly_added = 'td.reply';

	if (!localStorage.getItem('hidden_posts')) localStorage['hidden_posts'] = '[]';
	var hiddenposts = JSON.parse(localStorage['hidden_posts']);
	
	hiddenposts.forEach(function(post_to_hide)
	{
		if ($('#reply' + post_to_hide.post).is(":visible") && $('#reply' + post_to_hide.post + ' .qrl').attr('data-boardname') == post_to_hide.board)
		{
			$('#reply' + post_to_hide.post).hide();
			$('#reply' + post_to_hide.post).after("<td id=\"reply"+post_to_hide.post+"hiddenbyid\">Пост "+post_to_hide.post+" скрыт по номеру. Показать вновь: <a class=\"extrabtns\" href=\"#\" onclick=\"unhidepost_num('"+post_to_hide.board+"',"+post_to_hide.post+");return false;\" title=\"Показать этот пост\"><img src=\"/css/icons/blank.gif\" border=\"0\" class=\"unhidethread spritebtn\" alt=\"Показать этот пост\" /></a></td>");
		}
		// Shown at unhide
	});

	if (!localStorage.getItem('hidden_authors')) localStorage['hidden_authors'] = '[]';
	var hiddenauthors = JSON.parse(localStorage['hidden_authors']);
	$(newly_added).each(function(index, post_to_check)
	{
		var author = $('#' + post_to_check.id + ' .hideablename').text().trim();
		if($('#' + post_to_check.id).is(":visible"))
		{
			if (in_array(author, hiddenauthors)) 
			{
				$('#' + post_to_check.id).hide();
				$('#' + post_to_check.id).after("<td id=\""+post_to_check.id+"hiddenbyauthor\">Пост "+$('#' + post_to_check.id + ' input').val()+", написанный " + author + ", скрыт по автору. Показать его посты вновь: <a class=\"extrabtns\" href=\"#\" onclick=\"unhidepost_author('" + author + "');return false;\" title=\"Показать посты\"><img src=\"/css/icons/blank.gif\" border=\"0\" class=\"unhidethread spritebtn\" alt=\"Показать этот пост\" /></a></td>");
			}
		}
		else if ($('#' + post_to_check.id + 'hiddenbyauthor')[0])
		{
			if (!in_array(author, hiddenauthors)) 
			{
				$('#' + post_to_check.id).show();
				$('#' + post_to_check.id + 'hiddenbyauthor').remove();
			}
		}
	});

	if (typeof localStorage['hidden_words'] === 'undefined') localStorage['hidden_words']='';
	var hiddenwords = localStorage['hidden_words'].split(';');
	$(newly_added).each(function(index, post_to_check)
	{
		var hiddenword_found = false;
		var actual_hiddenword = '';
		hiddenwords.forEach(function(hiddenword)
		{
			if (hiddenword.trim() != '' && !hiddenword_found)
			{
				if ($('#' + post_to_check.id + ' blockquote').text().toLocaleLowerCase().indexOf(hiddenword.toLocaleLowerCase()) > -1)
				{
					actual_hiddenword = hiddenword;
					hiddenword_found = true;
				}
			}
		});

		if (hiddenword_found)
		{
			if (!$('#' + post_to_check.id + 'hiddenbyword')[0])
			{
				$('#' + post_to_check.id).hide();
				$('#' + post_to_check.id).after("<td id=\""+post_to_check.id+"hiddenbyword\">Пост "+$('#' + post_to_check.id + ' input').val()+" скрыт по слову &laquo;"+actual_hiddenword+"&raquo;. Показать посты с этими словами вновь: <a class=\"extrabtns\" href=\"#\" onclick=\"unhidepost_text('"+actual_hiddenword+"');return false;\" title=\"Показать посты\"><img src=\"/css/icons/blank.gif\" border=\"0\" class=\"unhidethread spritebtn\" alt=\"Показать этот пост\" /></a></td>");
			}
			else
			{
				$('#' + post_to_check.id + 'hiddenbyword').html("Пост "+$('#' + post_to_check.id + ' input').val()+" скрыт по слову &laquo;"+actual_hiddenword+"&raquo;. Показать посты с этими словами вновь: <a class=\"extrabtns\" href=\"#\" onclick=\"unhidepost_text('"+actual_hiddenword+"');return false;\" title=\"Показать посты\"><img src=\"/css/icons/blank.gif\" border=\"0\" class=\"unhidethread spritebtn\" alt=\"Показать этот пост\" /></a>");
			}
		}
		else
		{
			if ($('#' + post_to_check.id + 'hiddenbyword')[0])
			{
				$('#' + post_to_check.id).show();
				$('#' + post_to_check.id + 'hiddenbyword').remove();
			}
		}
	});
	
	return false;
}

function hide_by_words()
{
	localStorage['hidden_words'] = $('#wordstohide').val();
	window.location.reload();
	return false;
}

function hide_poster(name)
{
	if (!localStorage.getItem('hidden_authors')) localStorage['hidden_authors'] = '[]';
	
	var hiddenauthors = JSON.parse(localStorage['hidden_authors']);
	hiddenauthors.push(name);
	localStorage['hidden_authors'] = JSON.stringify(hiddenauthors);

	hide_unwanted_posts('');
	return false;
}

function hidepost_num(board, post)
{
	if (!localStorage.getItem('hidden_posts')) localStorage['hidden_posts'] = '[]';
	
	var hiddenposts = JSON.parse(localStorage['hidden_posts']);
	hiddenposts.push({'board':board,'post':post});
	localStorage['hidden_posts'] = JSON.stringify(hiddenposts);

	hide_unwanted_posts('reply' + post);
	return false;
}

function unhidepost_num(board, post)
{
	if (!localStorage.getItem('hidden_posts')) localStorage['hidden_posts'] = '[]';
	
	var hiddenposts = JSON.parse(localStorage['hidden_posts']);
	hiddenposts.forEach(
		function(item, i, arr)
		{
			if (item.board == board && item.post == post)
			{
				arr.splice(i, 1);
				$('#reply'+post).show();
				$('#reply'+post+'hiddenbyid').remove();
			}
		}
	);
	localStorage['hidden_posts'] = JSON.stringify(hiddenposts);
	return false;
}

function unhidepost_text(text)
{
	if (!localStorage.getItem('hidden_words')) localStorage['hidden_words'] = '';
	
	var hiddenwords = localStorage['hidden_words'].split(';');
	hiddenwords.forEach(
		function(item, i, arr)
		{
			if (item == text)
			{
				arr.splice(i, 1);
			}
		}
	);
	localStorage['hidden_words'] = hiddenwords.join(';');

	$('#wordstohide').val(localStorage['hidden_words']);
	hide_unwanted_posts('');
	return false;
}

function unhidepost_author(author)
{
	if (!localStorage.getItem('hidden_authors')) localStorage['hidden_authors'] = '[]';
	
	var hiddenauthors = JSON.parse(localStorage['hidden_authors']);
	hiddenauthors.forEach(
		function(item, i, arr)
		{
			if (item == author)
			{
				arr.splice(i, 1);
			}
		}
	);
	localStorage['hidden_authors'] = JSON.stringify(hiddenauthors);

	hide_unwanted_posts('');
	return false;
}

function expand_post(element,board,threadid,postid)
{
	var abbrev = element.parentNode;
	var replyblock = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	abbrev.innerHTML = '<img src="'+ku_boardspath+'/images/loading16x16.gif" style="vertical-align: text-bottom;" /> Разворачиваю пост...';
	$.ajax({
		url: ku_boardspath + "/read.php?b=" + board + "&t=" + threadid + "&p=" + postid + "&single",
		success: function(data) {
			if (data)
			{
				replyblock.outerHTML = data;
				tasksAfterModify('#reply'+postid);
			}
			else
			{
				replyblock.innerHTML = 'Невозможно развернуть пост. Перейди в тред, чтобы посмотреть его целиком.';
			}
		},
		error: function(xhr, status) {
			replyblock.innerHTML = 'Невозможно развернуть пост. Перейди в тред, чтобы посмотреть его целиком.';
		}
	});
	return false;
}   

function forms_reset()
{
	// Full sequence of form resetting
	document.forms['postform'].reset();
	document.getElementById('attachdrop_tr') .style.display = 'none';
	document.getElementById('attachembed_tr').style.display = 'none';
	document.getElementById('attachlink_tr') .style.display = 'none';
	document.getElementById('attachfile_tr') .style.display = 'table-row';
	set_inputs('postform');
	document.getElementById('drop_file_name').value = '';
	$('#dropZone').removeClass('hover');
	$('#dropZone').removeClass('drop');
	$('#dropZone').removeClass('error');
	$('#dropZone').text('Перетащи файл сюда');
}

var preview_enabled = false;

function start_deletion(plural, postlist, delformd, errors)
{
	var post = postlist.pop();
	var delform_data = new FormData();
	delform_data.append("through_js", "true");
	delform_data.append("deletepost", "true");
	delform_data.append("post[]", post.value);
	delform_data.append("board", delformd.board.value);
	delform_data.append("postpassword", delformd.postpassword.value);

	var msgdel1 = 'Удаляется пост ';
	var msgdel2 = 'Пост'+plural+' успешно удалён'+plural+'!';
	var msgdel3 = 'Произошла ошибка при удалении поста ';
	if (delformd.elements['fileonly'].checked)
	{
		msgdel1 = 'Удаляется файл из поста ';
		msgdel2 = 'Файл'+plural+' успешно удалён'+plural+'!';
		msgdel3 = 'Произошла ошибка при удалении файла из поста ';
		delform_data.append("fileonly", "true");
	}

	popupMessageNewText('<table align=center><tbody><tr><td><img src=/images/loading.gif></td><td valign=center>&nbsp;'+msgdel1+post.value+'...</td></tr></tbody></table>');
	var xhr = new XMLHttpRequest();
	xhr.open("POST", ku_boardspath + "/board.php");
	xhr.send(delform_data);
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4)
		{
			if (xhr.status == 200)
			{
				if (xhr.responseText.search('REDIRECT-TO:') == 0)
				{
					// Remove checkmark and image (if needed) from post
					post.checked = false;
					if (delformd.elements['fileonly'].checked)
					{
						$('#thumblink'+post.value).replaceWith('<div id="thumblink'+post.value+'" class="nothumb">Фейл<br />Удалён</div>');
					}
					
					// Continue to next deletion if ok
					if (postlist.length > 0)
					{
						start_deletion(plural, postlist, delformd, errors);
						return false;
					}
					// If no posts left: finish and (when it will be implemented) list errors.
					popupMessage(msgdel2);
					if (document.location.href.split('#')[0] == xhr.responseText.substr(12).split('#')[0])
					{
						if (($('#postform')[0].replythread.value != '0') && Settings.postingMode(false))
						{
							getnewposts(undefined,true,true);
							window.location.replace(xhr.responseText.substr(12));
						}
						else
						{
							window.location.replace(xhr.responseText.substr(12));
							window.location.reload();
						}
					}
					else
					{
						document.location.href = xhr.responseText.substr(12);
					}						
				}
				else
				{
					if(($('#postform')[0].replythread.value != '0') && Settings.postingMode(false)) { getnewposts(undefined,true,true); }
					popupMessageNewText(msgdel3 + post.value + ':<br/>' + xhr.responseText + '<div style="font-weight: normal; font-size: 11px;"><br />Кликни, чтобы закрыть</div>');
				}
			}
			else
			{
				if(($('#postform')[0].replythread.value != '0') && Settings.postingMode(false)) { getnewposts(undefined,true,true); }
				popupMessageNewText('Кажется, что-то пошло не так! XMLHttpRequest::status = ' + xhr.status + '<div style="font-weight: normal; font-size: 11px;"><br />Кликни, чтобы закрыть</div>');
			}
		}
	};
	return false;
}

var delform_submit = 'Delete';
function js_send_delform(form)
{
	var through_js = true;
	if (!through_js)
	{
		return true;
	}

	var delformd = $('#delform')[0];
	var postlist = new Array();
	
	for(var i = 0; i < delformd.length; ++i)
	{
		if (delformd[i].checked && delformd[i].name != "fileonly")
		{
			postlist.push(delformd[i]);
		}
	}
	
	if (postlist.length == 0)
	{
		popupMessage('Посты не выбраны.');
		return false;
	}

	var plural = (postlist.length > 1) ? 'ы' : '';
	
	// Report posts: do it in one request
	if (delform_submit == 'Report')
	{
		var formData = new FormData(form);
		formData.append("through_js", "true");
		formData.append("reportpost", "true");
		popupMessageOn('<table align=center><tbody><tr><td><img src=/images/loading.gif></td><td valign=center>&nbsp;Репортим пост'+plural+'...</td></tr></tbody></table>');
		var xhr = new XMLHttpRequest();
		xhr.open("POST", ku_boardspath + "/board.php");
		xhr.send(formData);
		xhr.onreadystatechange = function()
		{
			if (xhr.readyState == 4)
			{
				if (xhr.status == 200)
				{
					if (xhr.responseText.search('REDIRECT-TO:') == 0)
					{
						popupMessage('Репорт'+plural+' отправлен'+plural+'!');
						for(var i = 0; i < delformd.length; ++i)
						{
							if (delformd[i].checked && delformd[i].name != "fileonly")
							{
								delformd[i].checked = false;
							}
						}
					}
					else
					{
						popupMessageNewText(xhr.responseText + '<div style="font-weight: normal; font-size: 11px;"><br />Кликни, чтобы закрыть</div>');
					}
				}
				else
				{
					popupMessageNewText('Кажется, что-то пошло не так! XMLHttpRequest::status = ' + xhr.status + '<div style="font-weight: normal; font-size: 11px;"><br />Кликни, чтобы закрыть</div>');
				}
			}
		};
		return false;
	}
		
	// Delete posts: do it in separate requests.
	// What may be possibly implemented:
	//  1. Don't stop on first error, but log them (that's 'errors' array for it) and show error list after all (may be more dangerous than now);
	//  2. Don't rebuild on each deletion, but only on last (unneeded now as mass deletion is not actually intensely used).
	popupMessageOn('');
	start_deletion(plural, postlist, delformd, new Array());
	return false;
}

function js_send_postbox()
{
	var form = document.forms.postform;
	var through_js = form.submit_through_js.checked;
	
	if(form.deletepostp && form.deletepostp.value != '')
	{
		if(!through_js)
		{
			popupMessage('Переотправка доступна только через javascript!');
			return false;
		}

		var delform_data = new FormData();
		delform_data.append("through_js", "true");
		delform_data.append("deletepost", "true");
		delform_data.append("post[]", form.deletepostp.value);
		delform_data.append("board", form.deletepostb.value);
		delform_data.append("postpassword", form.postpassword.value);
		delform_data.append("savepicture", "true");

		popupMessageOn('<table align=center><tbody><tr><td><img src=/images/loading.gif></td><td valign=center>&nbsp;Удаляем пост '+form.deletepostp.value+'...</td></tr></tbody></table>');
		var xhr = new XMLHttpRequest();
		xhr.open("POST", ku_boardspath + "/board.php");
		xhr.send(delform_data);
		xhr.onreadystatechange = function()
		{
			if (xhr.readyState == 4)
			{
				if (xhr.status == 200)
				{
					if (xhr.responseText.search('REDIRECT-TO:') == 0)
					{
						// Continue to posting.
						if (form.replythread.value == form.deletepostp.value)
						{
							document.forms.postform.elements['replythread'].value = 0;
							$('#postform #posttypeindicator').html('Новый тред');
						}
						else
						{
							$('#postform #posttypeindicator').html('<a class="xlink" href="#'+form.replythread.value+'"> &gt;&gt;'+form.replythread.value+'</a>');
						}
						var parent = form.replythread.value;

						// Address directly documents' forms, but not one passed to function:
						document.forms.postform.elements['deletepostb'].value = '';
						document.forms.postform.elements['deletepostp'].value = '';
						if((form.replythread.value != '0') && Settings.postingMode(false)) { getnewposts(undefined,true,true,true); }
						js_send_postbox();
					}
					else
					{
						popupMessageNewText('Произошла ошибка при удалении поста ' + form.deletepostp.value + ':<br/>' + xhr.responseText + '<div style="font-weight: normal; font-size: 11px;"><br />Кликни, чтобы закрыть</div>');
					}
				}
				else
				{
					popupMessageNewText('Кажется, что-то пошло не так! XMLHttpRequest::status = ' + xhr.status + '<div style="font-weight: normal; font-size: 11px;"><br />Кликни, чтобы закрыть</div>');
				}
			}
		};
		return false;
	}
	
	// *** TOUHOU HIJACK ***

	if (touhou)
	{
		var random_pers = (new Array(
			'Пачули','Суйка','Сырно','Бякурен','Дайёсей','Сувако','Рейму','Мариса','Медисин','Комачи','Тенши','Рейсен Удонгейн Инаба','Фудзивара-но-Моко','Ремилия','Фландр','Алиса','Шанхай','Хорай','Хун Мейлин','Мистия Лорелей','Люмия','Юка','Лирика','Лунаса','Ёму','Ююко','Ран Якумо','Юкари Якумо','Сайгё Аякаси, Великая и Ужасная лол','Мерлин','Эйрин','Кагуя','Теви','Кейне','Ямазанаду','Койши','Ринноске','Луна Чайлд','Стар Сапфир','Санни Милк','Ая Шамеймару','Хиэда-сан',''
		))[Math.round(Math.random()*42)];
		if (form.elements['name'].value	== '')
		{
			form.elements['name'].value	= random_pers;
		}
	}
	
	// *** END TOUHOU HIJACK ***
	
	if (!through_js)
	{
		return true;
	}

	var formData = new FormData(form);
	formData.append("through_js", "true");
	if(document.URL.indexOf('+50') != -1)
	{
		formData.append("plus50", "true");
	}
	if(document.URL.indexOf('-100') != -1)
	{
		formData.append("minus100", "true");
	}

	var xhr = new XMLHttpRequest();
	xhr.open("POST", ku_boardspath + "/board.php");
	popupMessageOn('<table align="center"><tbody><tr><td><img src="/images/loading.gif"></td><td valign="center">&nbsp;Отправляем пост...</td></tr></tbody></table>');
	xhr.send(formData);

    xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4)
		{
			if (xhr.status == 200)
			{
				if (xhr.responseText.search('REDIRECT-TO:') == 0)
				{
					popupMessageOff();
					quickreply_hide();
					if (document.location.href.split('#')[0] == xhr.responseText.substr(12).split('#')[0])
					{
						refreshCaptcha();
						forms_reset();
						
						if (($('#postform')[0].replythread.value != '0') && Settings.postingMode(false))
						{
							getnewposts();
							window.location.replace(xhr.responseText.substr(12));
						}
						else
						{
							// Feed should redirect to feed, not the board page
							if (window.location.href.indexOf("single.php") == -1)
							{
								window.location.replace(xhr.responseText.substr(12));
							}
							window.location.reload();
						}
					}
					else
					{
						// Feed should redirect to feed, not the board page
						if (window.location.href.indexOf("single.php") == -1)
						{
							document.location.href = xhr.responseText.substr(12);
						}
						else
						{
							refreshCaptcha();
							window.location.reload();
						}
					}
				}
				else
				{
					refreshCaptcha();
					popupMessageNewText(xhr.responseText + '<div style="font-weight: normal; font-size: 11px;"><br />Кликни, чтобы закрыть</div>');
				}
			}
			else
			{
				refreshCaptcha();
				popupMessageNewText('Кажется, что-то пошло не так! XMLHttpRequest::status = ' + xhr.status  + ' (' + xhr.statusText  + ').<br>Подробности: ' + xhr.getAllResponseHeaders() + '<div style="font-weight: normal; font-size: 11px;"><br />Кликни, чтобы закрыть</div>');
			}
        }
    };
	
	return false;
}

function check_field(id,focused)
{
	if (focused)
	{
		if($('#'+id).hasClass("defaultfield"))
		{
			$('#'+id).removeClass("defaultfield");
			$('#'+id).val("");
		}		 
	}
	else
	{
		if($('#'+id).val() == "")
		{
			$('#'+id).addClass("defaultfield");
			if(id.substr(0,10) == "searchtext")
			{
				$('#'+id).val(search_phrases[Math.floor(Math.random()*search_phrases.length)]);
			}
			else
			{
				$('#'+id).val("206");
			}
		}		 
	}
}

function generate_reply_map(item)
{
	var generated_map = '';
	var prev_text = "<br>Ответы: ";
	
	item.forEach
	(
		function(ritem, ri, rarr)
		{
			generated_map += prev_text + '<a class="ref-reply" onclick="javascript:highlight('+"'"+ritem.id+"'"+', true);" href="/'+ritem.boardname+'/res/'+ritem.parentid+'.html#'+ritem.id+'">&gt;&gt;'+ritem.id+'</a>';
			prev_text = ', ';
		}
	)
	return generated_map;
}

var newposts_request_mutex = false;

function getnewposts(threadid, automatic, notutturu, noredirect)
{
	if (typeof newupd_posts === 'undefined')
	{
		if (!noredirect)
		{
			popupMessageOn('Перезагрузка страницы...');
			document.location.reload();
		}
		return false;
	}
	if (typeof threadid === 'undefined') threadid = $('input[name=replythread]').val();
	
	// Synchronization, lol
	if (newposts_request_mutex) return false;
	var xhr = new XMLHttpRequest();
	newposts_request_mutex = true;
	
	xhr.open("POST", ku_cgipath + '/json_update.php');
	var data = new FormData();
	data.append("board",  boardname);
	data.append("thread", threadid);
	
	var posts_json = JSON.stringify(newupd_posts);
	data.append("posts", posts_json);
	xhr.send(data);

	$('#newposts_get').hide();
	$('#newposts_load').show();

    xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4)
		{
			$('#newposts_get').show();
			$('#newposts_load').hide();
			if (xhr.status == 200)
			{
				var result;
				try
				{
					result = JSON.parse(xhr.response);
				}
				catch(e) {}
				if (typeof result == 'undefined')
				{
					popupMessage('Сервер вернул некорректные данные при обновлении!');
				}
				else if (typeof result.state == 'undefined')
				{
					popupMessage('Сервер вернул испорченные данные при обновлении!');
				}
				else if (result.state != 'ok')
				{
					popupMessage('Сервер вернул ошибку ('+result.state+') при обновлении!');
				}
				else
				{
					// Server reply consists of the following fields:
					//
					// state    == (string) must be 'ok'; (additional results may be 'Тред удалён')
					// posts    == (array)  new 'posts' variable
					// notify   == (bool)   were there new posts;
					// delposts == (array)  ids of posts to remove (can not be op-post)
					// addposts == (html)   what to add after last reply
					// replymap == (array)  new 'replymap' variable (raw);
					
					var doTasksAfterModify;
					var whereToDoTasksAfterModify = false;
					
					// Delete deleted posts
					doTasksAfterModify = (result.delposts.length > 0);
					result.delposts.forEach
					(
						function(item, i, arr)
						{
							$('#reply'+item).remove();
							//console.log('Post '+item+' removed.');
						}
					);
					
					// Add new posts
					if (result.notify)
					{
						doTasksAfterModify = true;
						whereToDoTasksAfterModify = ''; // TODO: strictly determine where to do tasks (a selector of newly added posts).
						if (automatic)
						{
							var $target = ($('table.postnode').length > 1) ? $('table.postnode').last() : $('#optable');
							$target.after(result.addposts);
							//console.log('Some new posts were added after last post.');
						}
						else
						{
							var $target = ($('table.postnode').length > 1) ? $('table.postnode').last() : $('#optable');
							$target.after('<div class="newposts">' + result.addposts + '</div>');
							$('.newposts').last().hide().fadeIn();
							//console.log('Some new posts were added into [div .newposts].');
						}
					}

					// Alter reply map
					for(var i in result.replymap)
					{
						var item = result.replymap[i];
						var postselector = (i == threadid) ? '.op' : '#reply'+i;
						// It's raw map; remove duplicates and sort here
						item.sort(function (a,b) {return a['id']-b['id'];});
						item = item.filter
						(
							function(ritem,ri)
							{
								return !ri || ritem['boardname'] != item[ri - 1]['boardname'] || ritem['id'] != item[ri - 1]['id'];
							}
						);
						result.replymap[i] = item;
						
						// Compare with corresponding existing reply map entry; delete from newupd_replymap when ok
						if (typeof newupd_replymap[i] !== 'undefined')
						{
							// Check if reply maps are identical
							var differences = newupd_replymap[i].length != item.length || item.some
							(
								function(ritem, ri)
								{
									return ritem.boardname != newupd_replymap[i][ri].boardname || ritem.id != newupd_replymap[i][ri].id;
								}
							);
							
							if(!differences)
							{
								//console.log('Reply map for post '+i+' left intact.');
							}
							else
							{
								var replybox = $(postselector)[0];
								if(typeof replybox === 'undefined')
								{
									//console.log('ERROR: Post '+i+', for which reply map is about to alter, is not exist.');
								}
								else
								{
									var replyboxlist = replybox.getElementsByClassName('replieslist')[0];
									if(typeof replyboxlist === 'undefined')
									{
										//console.log('ERROR: Post '+i+', for which reply map is about to alter, does not contain a reply map.');
									}
									else
									{
										replyboxlist.innerHTML = generate_reply_map(item);
										//console.log('Reply map for post '+i+' altered.');
									}
								}
							}
							delete newupd_replymap[i];
						}
						else
						{
							var replybox = $(postselector)[0];
							if(typeof replybox === 'undefined')
							{
								//console.log('ERROR: Post '+i+', for which reply map is about to add, is not exist.');
							}
							else
							{
								var replyboxlist = replybox.getElementsByClassName('replieslist')[0];
								if(typeof replyboxlist !== 'undefined')
								{
									//console.log('ERROR: Post '+i+', for which reply map is about to add, does already contain a reply map.');
								}
								else
								{
									replyboxlist = $(postselector+' blockquote').after('<div class="replieslist"></div>');
									$(postselector+' .replieslist').html(generate_reply_map(item));
									//console.log('Reply map for post '+i+' added.');
								}
							}
						}
					}

					// Delete reply maps from posts remained in newupd_replymap (where is no replies now)
					for(var i in newupd_replymap)
					{
						var postselector = (i == threadid) ? '.op' : '#reply'+i;
						var replybox = $(postselector)[0];
						var postinthread = $('#reply'+i+' .reflink .shl');
						if (postinthread.length > 0)
						{
							var post_threadid = postinthread.attr('href').split('/').pop().split('.')[0];
							if(typeof replybox !== 'undefined' && threadid == post_threadid)
							{
								$(postselector+' .replieslist').remove();
								//console.log('Reply map from post '+i+' removed.');
							}
						}
					}
					
					// Modify variables
					newupd_posts =    result.posts;
					newupd_replymap = result.replymap;

					// Notify on new posts if automatic refresh, sound enabled in settings and not forbidden by script
					if(result.notify && automatic && Settings.soundRefresh(false) && !notutturu)
					{
						// May it be easier with <audio id="tutturu" src="{%KU_WEBPATH}/sounds/tutturu.mp3" preload="true"></audio> ? Nope.
						//new Audio(ku_boardspath + '/sounds/tutturu.mp3').play();
						var tutturu = new Audio(ku_boardspath + '/sounds/tutturu.ogg');
						tutturu.play();
						delete tutturu;
					}
					
					// No new posts: notify only if not automatic
					if (!result.notify && !automatic) popupMessage(_.noNewPosts);

					// Do specific tasks for newly added posts
					if (doTasksAfterModify) tasksAfterModify(whereToDoTasksAfterModify);
					
					// Scroll to bottom of page
					if(!automatic) document.location = document.location.toString().split('#')[0] + '#boardlist_footer';
				}
			}
			else
			{
				popupMessage('Кажется, что-то пошло не так! XMLHttpRequest::status = ' + xhr.status);
			}
			newposts_request_mutex = false;
			//console.log('new update: mutex released');
        }
    };
	
	return false;
}

/* "singleLink" by aoi_miko */
function hrefParse(href) { /* "(http(s)://server.com)/sg/res/88357.html#88710" to ["sg", "88357", "88710"]. false if error */
	var arr = href.split("/res/");
	if (arr.length !== 2) return false;
	var pre = arr[0]; /* "(http(s)://server.com)/sg" */
	var post = arr[1]; /* "88357.html#88710" */
	var ret = Array(); /* return array */
	pre = pre.split("/");
	ret[0] = pre[pre.length-1]; /* get substr after last "/". So, "sg" */
	if (ret[0] === "") return false;
	ret[1] = post.split(".")[0]; /* get before ".". So, "88357" */
	ret[2] = post.split("#")[1]; /* get after "#". So, "88710" */
	if ((ret[2] === "") || (ret[2] === undefined)) return false;
	return ret;
}

function directLinkToSingleLink(href) { /* returns "" if error */
	var url = hrefParse(href);
	if (url === false) return "";
	
	return "/read.php?b=" + url[0] + "&p=" + url[2] + "&t=0&issearch=true";
}

function showLinks(ev) {
  var href = $(this).attr('href');
  $('#directLink').val(ku_boardspath + href);
  $('#singleLink').val(ku_boardspath + directLinkToSingleLink(href));
  $('#quoteLink').val('>>'+href.split('/res/')[0]+'/'+href.split('#')[1]);
  $('#viewlink').css({
    top: $(this).offset().top + $(this).height(),
    left: $(this).offset().left
  }).fadeIn('fast');
  return false;
}  

var quickreply_not_shown_before = true;
var quickreply_shown = false;
var quickreply_save_replythread;
var quickreply_save_board;
var quickreply_save_MAX_FILE_SIZE;
var quickreply_save_posttypeindicator;

function quickreply_show(top, left, recalc_pos)
{
	if (quickreply_shown) return;
	
	var preferUnpinned = (localStorage['pinPreference'] === 'unpinned');

	quickreply_save_replythread       = $('#postform input[name="replythread"]').val();
	quickreply_save_board             = $('#postform input[name="board"]').val();
	quickreply_save_MAX_FILE_SIZE     = $('#postform input[name="MAX_FILE_SIZE"]').val();
	quickreply_save_posttypeindicator = $('#postform #posttypeindicator').html();

	// Coordinate magic should be performed when form is hidden
	$('#postform').hide();
	window_make_float(); // Great thanks to Reimu for this function!
	$('#postform').show();
	
	$('#postform').addClass('reflinkpreview');
	$('#postform').addClass('content-background');
	$('#postform').addClass('qreplyform');
	//$('#postform input[name="name"]').attr('size', 66);
	$('#postform input[name="name"]').css({'width':'460px'});
	$('#editwarning').hide();
	$('.postboxcontrol').show();
	$('#rswapper').hide();

	quickreply_not_shown_before = false;
	quickreply_shown = true;
}

function quickedit_cleanup()
{
  // Clean up after cancelled edit
  if (document.forms.postform.elements['deletepostp'].value != '')
  {
	var dst = document.forms.postform.message;
	if (!dst) dst = document.forms.postform.elements['top-textarea'];
	dst.style.display = 'block';
	dst.value='';

	$('#editwarning').hide();
    $('#quickeditloading').hide();
	document.forms.postform.elements['em'].checked = false;
	document.forms.postform.elements['embed'].value = '';
	document.forms.postform.elements['name'].value = getCookie("name");
	document.forms.postform.elements['subject'].value = '';
	document.forms.postform.elements['attach_type'][0].checked = true; // File
	document.forms.postform.elements['attach_type'][0].onchange();
	document.forms.postform.elements['embedlink'].value = '';
	document.forms.postform.elements['deletepostb'].value = '';
	document.forms.postform.elements['deletepostp'].value = '';
	document.forms.postform.imagefile.value='';
  }
}

function quickreply_hide()
{
	if (!quickreply_shown) return;
	window_unmake_float();
	$('#postform').removeClass('reflinkpreview');
	$('#postform').removeClass('content-background');
	$('#postform').removeClass('qreplyform');
	//$('#postform input[name="name"]').attr('size', 76);
	$('#postform input[name="name"]').css({'width':'500px'});
	$('#editwarning').hide();
	$('.postboxcontrol').hide();
	$('#rswapper').show();

	$('#postform input[name="replythread"]').val(quickreply_save_replythread);
	$('#postform input[name="board"]').val(quickreply_save_board);
	$('#postform input[name="MAX_FILE_SIZE"]').val(quickreply_save_MAX_FILE_SIZE);
	$('#postform #posttypeindicator').html(quickreply_save_posttypeindicator);

	quickedit_cleanup();
	
	quickreply_shown = false;
}

function quickreply(ev)
{
  var externalBoard = $(this).data('boardname');
  if(externalBoard === this_board_dir && $(this).data('forceexternalboard') != "yes" ) externalBoard = false;
  var parent = $(this).data('parent'), current = $(this).data('postnum') || parent;

  quickreply_show($(this).offset().top + $(this).height(), 0, true);

  $('#postform input[name="replythread"]').val(parent);
  $('#postform input[name="board"]').val($(this).data('boardname'));
  $('#postform input[name="MAX_FILE_SIZE"]').val($(this).data('maxfilesize'));
  if(externalBoard) {
    $('#postform input[name="board"]').val(externalBoard);
    $('#postform #posttypeindicator').html('<a href="'+ku_boardspath+'/'+externalBoard+'/res/'+parent+'.html?i#'+current+'"> &gt;&gt;/'+externalBoard+'/'+parent+'</a>');
  }
  else {
    $('#postform #posttypeindicator').html('<a class="xlink" href="#'+current+'"> &gt;&gt;'+parent+'</a>');
  }

  quickedit_cleanup();
  
  insert_postnum(current);
  
  return false;
} 

function quickedit(ev)
{
  var externalBoard = $(this).data('boardname');
  if(externalBoard === this_board_dir && $(this).data('forceexternalboard') != "yes" ) externalBoard = false;
  var parent = $(this).data('parent'), current = $(this).data('postnum') || parent;

  quickreply_show($(this).offset().top + $(this).height(), 0, true);

  $('#postform input[name="replythread"]').val(parent);
  $('#postform input[name="board"]').val($(this).data('boardname'));
  $('#postform input[name="MAX_FILE_SIZE"]').val($(this).data('maxfilesize'));
  if(externalBoard) {
    $('#postform input[name="board"]').val(externalBoard);
    $('#postform #posttypeindicator').html('Фикс /'+externalBoard+'/'+current);
  }
  else {
    $('#postform #posttypeindicator').html('Фикс '+current);
  }
  
  emgr_save_tmp();
  var dst = document.forms.postform.message;
  if (!dst) dst = document.forms.postform.elements['top-textarea'];
  dst.style.display = 'none';
  $('#quickeditloading').show();

  if(parent == current)
  {
	$('#editwarning').show();
  }

  board = externalBoard ? externalBoard : this_board_dir;
  $.getJSON
  (
    ku_boardspath + '/api.php?id=0&method=get_posts_by_id&params={"msgtype":"source","board":"' + board + '","ids":[' + current + ']}',
	function(result)
	{
      $('#quickeditloading').hide();
	  dst.style.display = 'block';
	  if (result.error !== null)
	  {
		dst.value = "Ошибка " + result.error + " в API при загрузке поста (" + result.result.message + ").";
	  }
	  else
	  {
	    result = result.result[current];

		embed = '';
		// Option values from selection box
		if (result.filetype == 'you') embed = 'youtube';
		if (result.filetype == 'vim') embed = 'vimeo';
		if (result.filetype == 'cob') embed = 'coub';
		
		dst.value = result.text;
		if (document.forms.postform.elements['name'].value == '')
		{
			// Rewrite name only if not saved; tripcode saving issue
			document.forms.postform.elements['name'].value = result.name;
		}
		document.forms.postform.elements['subject'].value = result.subject;
		document.forms.postform.elements['em'].checked = (result.email == 'sage');
		document.forms.postform.elements['deletepostb'].value = board; 
		document.forms.postform.elements['deletepostp'].value = current;
		if (embed != '')
		{
			document.forms.postform.elements['attach_type'][2].checked = true; // Video
			document.forms.postform.elements['attach_type'][2].onchange();
			document.forms.postform.elements['embed'].value = result.filename;
			document.forms.postform.elements['embedtype'].value = embed;
		}
		else
		{
			if (result.filename != '')
			{
				document.forms.postform.elements['attach_type'][3].checked = true; // Link
				document.forms.postform.elements['attach_type'][3].onchange();
				document.forms.postform.elements['embedlink'].value = '>>' + result.filename + '.' + result.filetype;
			}
			else
			{
				document.forms.postform.elements['attach_type'][0].checked = true; // File
				document.forms.postform.elements['attach_type'][0].onchange();			
				document.forms.postform.imagefile.value='';
			}
		}
	  }
    }
  )
  .fail
  (
    function(xhr, status)
    {
      $('#quickeditloading').hide();
	  dst.style.display = 'block';
      dst.value = "Ошибка " + status + " в XML HTTP Request при загрузке поста.\r\nЗакрой и заново открой форму переотправки.";
    }
  );
  
  return false;
} 
  
function popupMessage(text, delay) {
  if(refreshSet) { clearInterval(refreshTimer); refreshSet = false; }
  if (delay == null) delay = 1000;
  popupMessageOn(text);
  $('#popupMessage').delay(delay).fadeOut(300);
  Settings.autoRefresh(false);
}

function popupMessageOn(text) {
  // Stop refresh timer
  if(refreshSet) { clearInterval(refreshTimer); refreshSet = false; }

  if ($('#popupMessage').get() == '') {
    $('body').children().last().after('<div id="popupMessage" class="reflinkpreview"></div>');
    $('#popupMessage').css('position', 'fixed');
    $('#popupMessage').css('top', '50px');
    $('#popupMessage').css('padding', '20px');
    $('#popupMessage').css('width', '40%');
    $('#popupMessage').css('left', '30%');
    $('#popupMessage').css('text-align', 'center');
    $('#popupMessage').on("click", function(){$(this).fadeOut('300');Settings.autoRefresh(false);});
    $('#popupMessage').hide();
  }
  $('#popupMessage').html("<span class=\"postername\">" + text + "</span>");
  $('#popupMessage').fadeIn(150);
}

var skip_close_preview = 0;

function close_post_preview(ismouseout)
{
	if (Settings.closePrevewOnClick() && ismouseout) return false;
	if (!Settings.closePrevewOnClick() && !ismouseout) return false;

	if ((skip_close_preview > 0) && !ismouseout)
	{
		skip_close_preview--;
	}
	else
	{
		document.body.onclick = null;
		$('#post_preview').delay(50).fadeOut(250).queue('fx', function() {$('#post_preview').remove();});
	}
}

function post_preview(e)
{
	if ($('#post_preview').get() == '') {
		$('body').children().last().after('<div id="post_preview"></div>');
		$('#post_preview').addClass('reflinkpreview content-background'); 
		$('#post_preview').css({zIndex: 20});      
		$('#post_preview').hide();
	}

	if(e.clientY < ($(window).height() / 1.5)) { 
		$('#post_preview').css({top:e.pageY+5}); 
	} else {
		$('#post_preview').css({bottom:$(window).height()-e.pageY+5}); 
	}
	if(e.clientX < ($(window).width() / 1.5)) {
		$('#post_preview').css({left:e.pageX+15}); 
	} else {
		$('#post_preview').css({right:$(window).width()-e.pageX+15}); 
	}

	var formData = new FormData(document.getElementById('postform'));

	var xhr = new XMLHttpRequest();
	xhr.open('POST', ku_cgipath + '/board.php');
	formData.append("preview_mode", true);
	formData.append("through_js", true);
	$('#post_preview').html('<table align="center"><tbody><tr><td><img src="'+ku_boardspath+'/images/loading.gif"></td><td valign="center">&nbsp;Создаём предпросмотр поста...</td></tr></tbody></table>');
	xhr.send(formData);

	xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4)
		{
			if (xhr.status == 200)
			{
				$('#post_preview').html(xhr.responseText);
				$('#post_preview').mouseleave(function(){close_post_preview(true);});
				$('#post_preview').click(function(){close_post_preview(false);});
				document.body.onclick = function() {close_post_preview(false);};
				tasksAfterModify('#post_preview');
				$('#post_preview .thumb').click(function(){skip_close_preview = 2;});
				$('#post_preview .cut').click(function(){skip_close_preview = 2;});
			}
			else
			{
				$('#post_preview').html('Кажется, что-то пошло не так! XMLHttpRequest::status = ' + xhr.status + '.');
				$('#post_preview').mouseleave(function(){close_post_preview(true);});
				$('#post_preview').click(function(){close_post_preview(false);});
				document.body.onclick = function() {close_post_preview(false);};
			}
		}
	};

	$('#post_preview').fadeIn(200);
}

function popupMessageNewText(text) {
  $('#popupMessage').html("<span class=\"postername\">" + text + "</span>");
}

function popupMessageOff() {
  // Restart refresh timer
  Settings.autoRefresh(false);
  
  $('#popupMessage').fadeOut(300);
}

function refreshCaptcha() {
  var captchaid = Math.random();
  $('#'+$(this).parents('[name="postform"]').attr('id')).find('[name="captcha"]').val('').focus();
  $('.captchaimage').attr('src', ku_boardspath+'/captcha.php?act=refresh&captchaid='+captchaid);
  $('.captchaid').attr('value', captchaid);
}

function checkcaptcha(formid) {
  if($('input[name=captcha]').length > 0) {
    if($('#'+formid+' input[name=captcha]').val() =='') {
      popupMessage(_.enterCaptcha);
      return false;
    }
  }
  return true;
}
 
var expandedimgs = {};
 
function expandimg(postnum, imgurl, thumburl, imgw, imgh, thumbw, thumbh) {
  
  var element = document.getElementById("thumb" + postnum);
  if (element == null) return false;
  if(typeof event !== 'undefined' && event.which === 2) return true;
  if (element.getElementsByTagName('img')[0].getAttribute('alt').substring(0,4)!='full') {
	// Expansion
	expandedimgs[imgurl] = $(element).html();
    $(element).html('<img src="'+imgurl+'" alt="full'+postnum+'" class="thumb" height="'+imgh+'" width="'+imgw+'">'); 
	if (postnum == '?????') $(element).click(function(){skip_close_preview = 2;});
    if (Settings.expandImgFull()) return false;    
    var element = document.getElementById("thumb" + postnum);
    var img = element.getElementsByTagName('img')[0];
    var max_w = document.documentElement?document.documentElement.clientWidth : document.body.clientWidth;
	max_w = (max_w - 16) * 0.98 - 20; // magic based on styles
    var offset = 0;
    var offset_el = img;

    while (offset_el != null) {
        offset += offset_el.offsetLeft;
        offset_el = offset_el.offsetParent;
    }
    var new_w = max_w - offset;
    if (img.width > new_w) {
        var ratio = img.width / img.height;
        var zoom = 1 - new_w / img.width;
        var new_h = new_w / ratio;
        var notice = document.createElement('div');
        notice.setAttribute('class', 'filesize');
        notice.style.textDecoration = 'underline'; 
        var textNode = document.createTextNode(_.imageDownscaledBy + " " + Math.round(zoom*100) + "% "+_.toFit);
        notice.appendChild(textNode);  
        element.insertBefore(notice, img);
        $(img).width(new_w);
        $(img).height(new_h);

    }     
  } else{
	// Contraction
	thumbhtml = expandedimgs[imgurl];
	//delete expandedimgs[imgurl]; - we may contract image twice as it may be in preview
    element.innerHTML = thumbhtml; //'<img src="' + thumburl + '" alt="' + postnum + '" class="thumb" height="' + thumbh + '" width="' + thumbw + '">';
	if (postnum == '?????') $(element).click(function(){skip_close_preview = 2;});
    if (Settings.sfwMode()) {
      $(element).find('img').stop(true, true).animate({opacity: 0.05}, {duration: 100});
    }
  }

  return false;
}

// Variable postbox fields by Smilefag
function showembedfield(element)
{
	if (element.checked)
	{
		document.getElementById('attachfile_tr') .style.display = 'none';
		document.getElementById('attachdrop_tr') .style.display = 'none';
		document.getElementById('attachembed_tr').style.display = 'none';
		document.getElementById('attachlink_tr') .style.display = 'none';
		if (element.value == "file")  document.getElementById('attachfile_tr') .style.display = 'table-row';
		if (element.value == "drop")  document.getElementById('attachdrop_tr') .style.display = 'table-row';
		if (element.value == "embed") document.getElementById('attachembed_tr').style.display = 'table-row';
		if (element.value == "link")  document.getElementById('attachlink_tr') .style.display = 'table-row';
	}
}

function showsmilebox(element)
{
	if (element.checked)
	{
		var collection = document.getElementsByClassName('smilies_group');
		for (var i = 0; i < collection.length; ++i) { collection[i].style.display = 'none'; collection[i].innerHTML = ''; }
		document.getElementById('smilies_group_' + element.value).style.display = 'table-row';
		document.getElementById('smilies_group_' + element.value).innerHTML = smilies_array[element.value];
		
	}
}

// Drag and drop files by Smilefag (see http://habrahabr.ru/post/125424/)
$(document).ready(function()
{
	if ($('#dropZone').length > 0)
	{
		var dropZone, drag_maxFileSize;
		drag_maxFileSize = (typeof ku_maxfilesize === "undefined")? 0: ku_maxfilesize;
		dropZone = $('#dropZone');
		if (typeof(window.FileReader) == 'undefined') { dropZone.text('Не поддерживается браузером!'); dropZone.addClass('error'); }
		dropZone[0].onclick = function()
		{
			document.forms['postform'].attach_type.value='file';
			document.getElementById('attachdrop_tr').style.display = 'none';
			document.getElementById('attachfile_tr') .style.display = 'table-row';
			$('input#imagefile').click();
			return false;
		};
		dropZone[0].ondragover = function() { dropZone.addClass('hover'); return false; };
		dropZone[0].ondragleave = function() { dropZone.removeClass('hover'); return false; };
		dropZone[0].ondrop = function(event)
		{
			document.getElementById('drop_file_name').value = '';
			event.preventDefault();
			dropZone.removeClass('hover');
			dropZone.addClass('drop');
			var drag_file = event.dataTransfer.files[0];
			if (drag_file.size > drag_maxFileSize) { dropZone.text('Файл слишком большой!'); dropZone.addClass('error'); return false; }
			var drag_xhr = new XMLHttpRequest();
			drag_xhr.upload.addEventListener('progress', function(event) { var percent = parseInt(event.loaded / event.total * 100); dropZone.text('Загрузка: ' + percent + '%'); }, false);
			drag_xhr.onreadystatechange = function(event)
			{
				if (event.target.readyState == 4) {
					if (event.target.status == 200) {
						var local_ext = drag_xhr.responseText.substr(drag_xhr.responseText.length - 4, 4);
						var local_filename = drag_xhr.responseText.replace(ku_boardsdir,'');
						var message = 'Загрузка успешно завершена!';
						if (local_ext == '.png' || local_ext == '.jpg' || local_ext == '.gif')
						{
							message += '<br><center><img style="max-width: 380px;" src="/'+local_filename+'"></center>';
						}
						dropZone[0].innerHTML = message;
						document.getElementById('drop_file_name').value = drag_xhr.responseText;
					} else {
						dropZone.text('Ошибка: ' + drag_xhr.responseText);
						dropZone.removeClass('drop');
						dropZone.addClass('error');
					}
				}
			};
			drag_xhr.open('POST', '/upload_xhr.php');
			var formData = new FormData();
			formData.append("file", drag_file);
			drag_xhr.send(formData);
		};
	}
});

/* CLIPBOARD CLASS TO ENABLE PASTING PICTURES (source: https://stackoverflow.com/questions/18377891) */
// But a bit fixed, since Chrome does not understand some code magic, and Firefox even does not require it.

// This function goes from: http://stackoverflow.com/questions/4998908
function dataURItoBlob(dataURI)
{
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

function CLIPBOARD_CLASS()
{
	var _self = this;
	var ctrl_pressed = false;
	var command_pressed = false;
	var paste_event_support;
	var pasteCatcher;

	//constructor - we ignore security checks here
	this.init = function () {
		pasteCatcher = document.createElement("div");
		pasteCatcher.setAttribute("id", "paste_ff");
		pasteCatcher.setAttribute("contenteditable", "");
		pasteCatcher.style.cssText = 'opacity:0;position:fixed;top:0px;left:0px;width:10px;margin-left:-20px;';
		document.body.appendChild(pasteCatcher);

		// create an observer instance
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (paste_event_support === true /*|| ctrl_pressed == false*/ || mutation.type != 'childList'){
					//we already got data in paste_auto()
					return true;
				}

				//if paste handle failed - capture pasted object manually
				if(mutation.addedNodes.length == 1) {
					if (mutation.addedNodes[0].src != undefined) {
						//image
						_self.paste_createImage(mutation.addedNodes[0].src);
					}
					//register cleanup after some time.
					setTimeout(function () {
						pasteCatcher.innerHTML = '';
					}, 20);
				}
			});
		});
		var target = document.getElementById('paste_ff');
		var config = { attributes: true, childList: true, characterData: true };
		observer.observe(target, config);
	}();
	//default paste action
	this.paste_auto = function (e) {
		paste_event_support = false;
		if(pasteCatcher != undefined){
			pasteCatcher.innerHTML = '';
		}
		if (e.clipboardData) {
			var items = e.clipboardData.items;
			if (items) {
				var prevent_default = false;
				paste_event_support = true;
				//access data directly
				for (var i = 0; i < items.length; i++) {
					if (items[i].type.indexOf("image") !== -1) {
						//image
						var blob = items[i].getAsFile();
						var URLObj = window.URL || window.webkitURL;
						var source = URLObj.createObjectURL(blob);
						this.paste_createImage(source);
						prevent_default = true;
					}
				}
				if (prevent_default) e.preventDefault();
			}
			else {
				if (typeof document.activeElement == 'undefined' || (document.activeElement.type != 'text' && document.activeElement.type != 'textarea')) {
					pasteCatcher.focus(); // for firefox
				}
			}
		}
	};

	this.paste_createImage = function (source)
	{
		var pastedImage = new Image();
		pastedImage.onload = function ()
		{
			// this code goes from: http://stackoverflow.com/questions/934012
			var canvas = document.createElement("canvas");
			canvas.width = pastedImage.width;
			canvas.height = pastedImage.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(pastedImage, 0, 0);
			var dataURL = canvas.toDataURL("image/png");		
			
			var fileBlob = dataURItoBlob(dataURL);

			var pasteZone, paste_file_name, paste_form, paste_form_id;

			pasteZone = $('#dropZone');
			paste_file_name = document.getElementById('drop_file_name');
			paste_form = document.forms.postform;
			paste_form.elements['attach_type'][1].checked = true; // Drag
			paste_form.elements['attach_type'][1].onchange();
			paste_form.scrollIntoView();
			
			paste_file_name.value = '';
			pasteZone.removeClass('hover');
			pasteZone.addClass('drop');
			pasteZone.text('Загрузка...');
			var paste_file = fileBlob;
			var paste_maxFileSize = (typeof ku_maxfilesize === "undefined")? 0: ku_maxfilesize;
			if (paste_file.size > paste_maxFileSize) { pasteZone.text('Картинка слишком большая!'); pasteZone.addClass('error'); return false; }
			var paste_xhr = new XMLHttpRequest();
			paste_xhr.upload.addEventListener('progress', function(event) { var percent = parseInt(event.loaded / event.total * 100); pasteZone.text('Загрузка: ' + percent + '%'); }, false);
			paste_xhr.onreadystatechange = function(event)
			{
				if (event.target.readyState == 4) {
					if (event.target.status == 200) {
						var local_ext = paste_xhr.responseText.substr(paste_xhr.responseText.length - 4, 4);
						var local_filename = paste_xhr.responseText.replace(ku_boardsdir,'');
						var message = 'Загрузка успешно завершена!';
						//if (local_ext == '.png' || local_ext == '.jpg' || local_ext == '.gif')
						//{
							message += '<br><center><img style="max-width: 380px;" src="/'+local_filename+'"></center>';
						//}
						pasteZone[0].innerHTML = message;
						paste_file_name.value = paste_xhr.responseText;
					} else {
						pasteZone.text('Ошибка: ' + paste_xhr.responseText);
						pasteZone.removeClass('drop');
						pasteZone.addClass('error');
					}
				}
			};
			paste_xhr.open('POST', '/upload_xhr.php');
			var formData = new FormData();
			formData.append("file", paste_file);

			paste_xhr.send(formData);

		};
		pastedImage.src = source;
	};

	document.onpaste   = function (e) { _self.paste_auto(e); }; //official paste handler
}

// YOBA previews w/#snivystuff
var PostPreviews = {
  zindex:  30,
  cached: {},
  parent: {},
  shown: [],
  
  _mouseover: function(e) {
    e.stopPropagation();
    var href = this.getAttribute("href");
    var isCatalog = $(this).hasClass('catalog-entry');
    
    var board = href.split('/res/')[0].split('/').reverse()[0];
    var postid = isCatalog ? href.split('.html')[0].split('/').reverse()[0] : href.split("#")[1];

    var previewid = 'preview_'+board+'_'+postid;
    var preview = $('#' + previewid);
    if (preview.length == 0) {
      $('body').children().first().before('<div id="'+previewid+'"></div>');
      preview = $('#preview_'+board+'_'+postid);
      preview.addClass('reflinkpreview content-background');     
      preview.mouseleave(PostPreviews._mouseout);
      preview.mouseover(PostPreviews.onMouseOver);
    }
	PostPreviews.shown.push(previewid);
    var parent = $(this).parents('div[id^=preview]');
    if (parent.length > 0) {
      if (previewid == parent.attr('id')) { return; } // anti-recursion
      for(var id in PostPreviews.parent) { if (id == previewid || PostPreviews.parent[id] == previewid) return }
      PostPreviews.parent[previewid] = parent.attr('id');
    } else {
      for(var id in PostPreviews.parent) {
        $('#'+id).stop(true, true);
        $('#'+id).fadeOut(1);
        $('#'+PostPreviews.parent[id]).stop(true, true);
        $('#'+PostPreviews.parent[id]).fadeOut(1);
      }
      PostPreviews.parent = [];
    }
    if(e.clientY < ($(window).height() / 1.5)) { 
      preview.css({top:e.pageY+5}); 
    } else {
      preview.css({bottom:$(window).height()-e.pageY+5}); 
    }
    if(e.clientX < ($(window).width() / 1.5)) {
      preview.css({left:e.pageX+15}); 
    } else {
      preview.css({right:$(window).width()-e.pageX+15}); 
    }
    preview.css({zIndex: PostPreviews.zindex++});      
    if (PostPreviews.cached[previewid] != null) {  
      preview.html(PostPreviews.cached[previewid]);
	  if (preview.position().left + preview.width() > $('body').width() - 8)
	  {
		preview.width(($('body').width() - 8) * 0.99 - 10 - preview.position().left);
		preview.find('.reply').width(preview.width()-2);
	  }
      if(isCatalog) $(preview).find('.quickreply').remove();
      $(preview).fadeIn(100);
      tasksAfterModify('#'+previewid);
      spr_highlighter(preview.get(0), e.target);
    } else {
      preview.html("<img alt=\"...\" src=\""+ku_boardspath+"/images/loading.gif\" />");
      (function(board, id, callback) {
        var $post = $('a[name='+id+']');
        if(board === this_board_dir && $post.length) {
			var obj = $post.parents('.postnode')[0];
			if (obj.localName == 'td') obj = obj.parentNode.parentNode.parentNode;
			callback(false, obj.outerHTML)
        }
        else {
          $.ajax({
            url: ku_boardspath+"/read.php?b="+board+"&t=_&p="+id+"&single",
            success: function(data) {
              callback(false, data);
            },
            error: function(err) {
              callback(true, err)
            }
          });
        }
      })(board, postid, function(err, data) {
        if(err) {
          preview.html(_.couldntFetch);
          $(preview).fadeIn(100);
        }
        else {
          var text = data||(_.oops + " (" + _.blankResponse + ")");
          preview.html(text);
		  if (preview.position().left + preview.width() > $('body').width() - 8)
		  {
			preview.width(($('body').width() - 8) * 0.99 - 10 - preview.position().left);
			preview.find('.reply').width(preview.width()-2);
		  }
          if (data) {                        
            PostPreviews.cached[previewid] = data;
          }
          if(isCatalog) $(preview).find('.quickreply').remove();
          $(preview).fadeIn(100);
        }
		tasksAfterModify('#'+previewid);
		spr_highlighter(preview.get(0), e.target);
      })
    }
    e.preventDefault();
  },

  onMouseOver: function() {
    var preview = $(this);
    if ($(this).is('a')) {
      var href = this.getAttribute("href");
      var board = href.split('/res/')[0].split('/').reverse()[0];
      var postid = $(this).hasClass('catalog-entry') ? href.split('.html')[0].split('/').reverse()[0] : href.split("#")[1];
      preview = $('#preview_'+board+"_"+postid).first();
    }
    while (preview.length > 0) {
      preview.stop(true,true);
      preview.fadeIn(1);
	  var newselector = PostPreviews.parent[preview.attr('id')];
      preview = $('#' + newselector);
	  if (typeof newselector != 'undefined') tasksAfterModify('#' + newselector);
    }
  },
  
  _mouseout: function() {
    var preview = $(this);
    if ($(this).is('a')) {
      var href = this.getAttribute("href");
      var board = href.split('/res/')[0].split('/').reverse()[0];
      var postid = $(this).hasClass('catalog-entry') ? href.split('.html')[0].split('/').reverse()[0] : href.split("#")[1];
      preview = $('#preview_'+board+"_"+postid).first();
    }
    while (preview.length > 0) {
      preview.delay(50).fadeOut(250).queue('fx', function() { 
        delete PostPreviews.parent[$(this).attr('id')];
		PostPreviews.shown.splice(PostPreviews.shown.indexOf('preview_'+board+"_"+postid),1);
        $(this).remove();
		tasksAfterModify(false);
      });
      preview = $('#' + PostPreviews.parent[preview.attr('id')]);   
    }
  }
}

function closePostPreviews()
{
	for(var preview_id in PostPreviews.shown)
	{
	  //console.log(preview_id + ' ' + PostPreviews.shown[preview_id]);
      var preview = $('#' + PostPreviews.shown[preview_id]);   
      preview.fadeOut(100).queue('fx', function() { 
        delete PostPreviews.parent[$(this).attr('id')];
        $(this).remove();
      });
	}
	PostPreviews.shown  = [];
	PostPreviews.zIndex = 30;
	PostPreviews.parent = {};
}

/* txt only. deleted. src in clean */
function postpreview(D,A,C,B){}
  
function set_inputs(id) {
  if (document.getElementById(id)) {
    with(document.getElementById(id)) {
      if(!name.value) name.value = getCookie("name");
      if(!em.value) em.value = getCookie("email");
      if(!postpassword.value) postpassword.value = get_password("postpassword");
    }
  }
}
  
function set_delpass(id) {
  if (document.getElementById(id).postpassword) {
    with(document.getElementById(id)) {
      if(!postpassword.value) postpassword.value = get_password("postpassword");
    }
  }
}   

(function ($) {
  $.event.special.load = {
    add: function (callback) {
      if ( this.nodeType === 1 && this.tagName.toLowerCase() === 'img' && this.src !== '' ) {
        if ( this.complete || this.readyState === 4 ) {
          callback.handler.apply(this);
        }
        else if ( this.readyState === 'uninitialized' && this.src.indexOf('data:') === 0 ) {
          $(this).trigger('error');
        }

        else {
          $(this).bind('load', callback.handler);
        }
      }
    }
  };
}(jQuery));

// Dollchan detecting facility
function dollchanPresent() { return (document.getElementById('de-panel-logo')    !== null); }
function dollchanEnabled() { return (document.getElementById('de-panel-refresh') !== null); }

function kill_dollchan_incompatible_features()
{
	if(dollchanEnabled())
	{
		if (localStorage['dollchan_notified'] == null)
		{
			popupMessageOn('Обнаружен куклоскрипт!<br>Функции в настройках, несовместимые с куклоскриптом, будут выключены.<br>Позже их можно будет включить заново, но перед этим<br>неплохо было бы отключить аналогичные фичи куклы.<div style="font-weight: normal; font-size: 11px;"><br />Кликни, чтобы закрыть</div>');
			localStorage['dollchan_notified'] = true;
			localStorage['postnumberMode']    = false;
			localStorage['autoRefresh']       = false;
			localStorage['showReplies']       = false;
			localStorage['sendThroughJS']     = false;
			Settings.postnumberMode(false);
			Settings.autoRefresh(false);
			Settings.showReplies(false);
			Settings.sendThroughJS(false);
		}
	}
}

var refreshSet = false;
var refreshTimer;
var refreshCounter;

var Settings = {
  _checkbox: function(clicked, settingName, defaultValue) {
    if (localStorage == null) {
      trace(_.noLocalStorage);
      return;
    }
    if (localStorage[settingName] == null) {
      localStorage[settingName] = defaultValue;
    }
    if (clicked == true)
	{
      // save it
      localStorage[settingName] = $('#settings_' + settingName).is(":checked");
    }
	else
	{
		// update checkbox (called on load)
		if (localStorage[settingName] == 'true' || localStorage[settingName] == true)
		{
			$('#settings_' + settingName).attr("checked","checked");
		}
		else
		{
			$('#settings_' + settingName).removeAttr("checked");
		}
	}
    return (localStorage[settingName] == 'true') || (localStorage[settingName] == true) ;
  },
  
  fxEnabled: function(changed) { 
    var enabled = Settings._checkbox(changed, 'fxEnabled', true);
    if (changed != null) {
      $.fx.off = !enabled;
    }
    return enabled;
  },
  
  scrollMode: function(changed) {
    var enabled = Settings._checkbox(changed, 'scrollMode', true);
    if (changed != null) {
      enabled ? $('.scroll').show() : $('.scroll').hide();
    }
    return enabled;
  },

  showReplies: function(changed) {
    var enabled = Settings._checkbox(changed, 'showReplies', true);
    if (changed != null) {
      enabled ? $('.replieslist').show() : $('.replieslist').hide();
    }
    return enabled;
  },

  showyou: function(changed) {
    var enabled = Settings._checkbox(changed, 'showyou', true);
    if (changed != null) {
      enabled ? $('.youindicator').show() : $('.youindicator').hide();
    }
    return enabled;
  },
  
  sfwMode: function(changed) {
    var enabled = Settings._checkbox(changed, 'sfwMode', false);
    if (changed != null) {
      var target = $('img.thumb');
      if(enabled) {
        injectCSS([[".thumb { opacity: 0.05;}", 1], [".thumb:hover { opacity: 1;}", 2]]);
      } else if(changed) { 
        removeCSS([1, 2]);
      }
    }
    return enabled;
  },
  
  expandImgFull: function(changed) {
    return Settings._checkbox(changed, 'expandImgFull', false);
  },

  autoRefresh: function(changed) {
    var enabled = Settings._checkbox(changed, 'autoRefresh', false);
    if (changed != null) {
	  var info_span = $('#newposts_seconds');
      if(!enabled)
	  {
		if (info_span.length > 0)
		{
		  if (refreshSet) clearInterval(refreshTimer);
		  info_span.hide();
		  refreshSet = false;
		}
      }
	  else
	  { 
	    if (info_span.length > 0)
		{
		  info_span.show();
		  info_span.html('(20)');
		  refreshCounter = 20;
		  if (!refreshSet) refreshTimer = setInterval(function()
		  {
			refreshCounter--;
		    info_span.html('('+refreshCounter+')');
			if (refreshCounter == 0)
			{
			  getnewposts(undefined, true);
			  refreshCounter = 20;
			  info_span.html('(20)');
			}
		  }, 1000);
		  refreshSet = true;
		}
      }
    }
    return enabled;
  },

  soundRefresh: function(changed) {
    return Settings._checkbox(changed, 'soundRefresh', false);
  },
  
  closePrevewOnClick: function(changed) {
    return Settings._checkbox(changed, 'closePrevewOnClick', true);
  },
  
  postingMode: function(changed) {
    return Settings._checkbox(changed, 'postingMode', true);
  },
  
  animatedPreviews: function(changed) {
    var enabled = Settings._checkbox(changed, 'animatedPreviews', false);
	if (changed != null)
	{
      if(enabled)
	  {
		$('img.thumb.unanimated').hide();
		$('img.thumb.animated').show();
      }
	  else if(changed)
	  { 
		$('img.thumb.animated').hide();
		$('img.thumb.unanimated').show();
	  }
    }
    return enabled;
  },

  oldSearch: function(changed) {
    var enabled = Settings._checkbox(changed, 'oldSearch', false);
	if (changed != null)
	{
      if(enabled)
	  {
		$('.newsearch').hide();
		$('.oldsearch').show();
      }
	  else
	  { 
		$('.oldsearch').hide();
		$('.newsearch').show();
	  }
    }
    return enabled;
  },
  
  sendThroughJS: function(changed) {
    var enabled = Settings._checkbox(changed, 'sendThroughJS', true);
    if (changed != null)
	{
      if(enabled)
	  {
		if (typeof document.forms['postform'] != 'undefined') document.forms.postform.submit_through_js.checked=true;
      }
	  else if(changed)
	  { 
		if (typeof document.forms['postform'] != 'undefined') document.forms.postform.submit_through_js.checked=false;
      }
    }
    return enabled;
 
  },
  
  sendCtrlEnter: function(changed) {
    return Settings._checkbox(changed, 'sendCtrlEnter', true);
  },
  
  widthMode: function(changed) {
    var enabled = Settings._checkbox(changed, 'widthMode', true);
    if (changed != null) {
      if(!enabled) {
        injectCSS(".replies table, .replies table tbody { display: block; }", 11);
      } else if(changed) { 
        removeCSS(11);
      }
    }
    return enabled;
  },

  postnumberMode: function(changed) {
    var enabled = Settings._checkbox(changed, 'postnumberMode', true);
    if (changed != null) {
      if(!enabled) {
        injectCSS(".postnumber { display: none; }", 19);
      } else if(changed) { 
        removeCSS(19);
      }
    }
    return enabled;
  },

  smiliesMode: function(changed) {
    var enabled = Settings._checkbox(changed, 'smiliesMode', false);
	var s, i;
    
	if(!enabled) {
		s = document.getElementsByClassName('smilies_tr');   for(i = 0; i < s.length; ++i) s[i].style.display = 'none';
		s = document.getElementsByClassName('smilies_div');  for(i = 0; i < s.length; ++i) s[i].style.display = 'none';
		s = document.getElementsByClassName('smilies_span'); for(i = 0; i < s.length; ++i) s[i].style.display = 'none';
    } else { 
		s = document.getElementsByClassName('smilies_tr');   for(i = 0; i < s.length; ++i) s[i].style.display = 'table-row';
		s = document.getElementsByClassName('smilies_div');  for(i = 0; i < s.length; ++i) s[i].style.display = 'block';
		s = document.getElementsByClassName('smilies_span'); for(i = 0; i < s.length; ++i) s[i].style.display = 'inline';
    }
    
	return enabled;
  },
  
  videoboxes: function(changed) {
    var enabled = Settings._checkbox(changed, 'videoboxes', false);
    if (changed != null) {
      if(!enabled)
	  {
        $('.newvideolink').show();
        $('.newvideobox').hide();
      }
	  else
	  { 
        $('.newvideolink').hide();
        $('.newvideobox').show();
      }
    }
    return enabled;
  }
}

var rswap = {
  i: true,
  swap: function() {
    if(this.i) $('#delform').before($('#rswapper')).after($('.postarea'));
    else $('#delform').before($('.postarea')).after($('#rswapper'));
    this.i = !this.i;
  }
}

var isTouchDevice = (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch) || navigator.userAgent.match(/Android|BlackBerry|Opera Mini|IEMobile|iPhone|iPad|iPod/i)) ? true : false;
var interfaceType = localStorage['interfaceType'] || false;

var captchalang = getCookie('captchalang') || 'ru';
function setCaptchaLang(lang) {
  if(!in_array(lang, ['ru', 'en', 'num'])) return;
  captchalang = lang;
  set_cookie('captchalang', lang, 365);
}

var CLIPBOARD;

function readyset() {
  if(!ispage) $('.mgoback').show();

  CLIPBOARD = new CLIPBOARD_CLASS();
  
  if(interfaceType) {
    if(interfaceType == 'touch') {
      isTouchDevice = true;
      $('#js_settings').prepend('<a href="javascript: localStorage.setItem(\'interfaceType\', \'desktop\'); location.reload();">'+_.returnDesktop+'</a><br>');
    } 
    else if(interfaceType == 'desktop') {
      isTouchDevice = false;
      $('#js_settings').prepend('<a href="javascript: localStorage.setItem(\'interfaceType\', \'touch\'); location.reload();">'+_.returnTouch+'</a><br>');
    }
  }
  else if(isTouchDevice) {
    $('#boardlist_header').after('<div id="interface-notifier" class="content-background reflinkpreview"><div class="ifcn-text">'+_.impliedTouch+'</div><div class="incn-buttons">'+
      '<button class="ifcnbtn" onclick="javascript: localStorage.setItem(\'interfaceType\', \'touch\'); $(\'#interface-notifier\').fadeOut(\'fast\');">'+_.okay+'</button>&nbsp;'+
      '<button class="ifcnbtn" onclick="javascript: localStorage.setItem(\'interfaceType\', \'desktop\'); location.reload();">'+_.forceDesktop+'</button></div></div>');
  }
  else {
    $('#js_settings').prepend('<a title="'+_.impliedDesktop+'" href="javascript: localStorage[\'interfaceType\']=\'touch\'; location.reload();">'+_.returnTouch+'</a><br>');
  }
  $('#js_settings').prepend(_.captchalang+': <a href="javascript:setCaptchaLang(\'ru\');">Cyrillic</a> | <a href="javascript:setCaptchaLang(\'num\');">Numeral</a> | <a href="javascript:setCaptchaLang(\'en\');">Simple</a><br />');

  LatexIT.init();

  if (!localStorage.getItem('hidden_words')) localStorage['hidden_words'] = '';
  if($('#wordstohide').length > 0) $('#wordstohide').val(localStorage['hidden_words']);

  checkhighlight();
  checkgotothread();
  checknamesave();

  if(getCookie('ku_menutype')) {
    var c = Cookie('ku_menutype');
    if(c != 'default' && c != '')
	{
      document.getElementById('overlay_menu').style.position = c;
	}
  }

  //initial post-process
  processNodeInsertion();

  if(!isTouchDevice) {
    $('.mobile-nav').hide();
    $('.sect-exr').mouseenter(function() { menu_show('ms-'+$(this).data('toexpand')); });
    $('#overlay_menu').mouseleave(function() { menu_show('_off_'); });
    $('body').on('mouseenter', "a[class^='ref'], .catalog-entry", PostPreviews._mouseover);
    $('body').on('mouseleave', "a[class^='ref'], .catalog-entry", PostPreviews._mouseout);
  }
  else {
    $('#menubrdlist').parent().hide();
    $('.sect-exr[data-toexpand="_options"]').click(function() {
      if($('#js_settings').is(':visible')) {
        menu_show('_off_');
      }
      else {
        menu_show('ms-_options');
      }
      return false;
    });
    $('.sect-exr[data-toexpand="_search"]').click(function() {
      if($('#searchposttop').is(':visible')) {
        menu_show('_off_');
      }
      else {
        menu_show('ms-_search');
      }
      return false;
    });
    $('body').click(function(event) {
      menu_show('_off_'); 
      $('[id^=preview]').remove();
    });
    $('.mobile-nav').show();
    $('body').on('click', "a[class^='ref']", PostPreviews._mouseover);       
  
  injectCSS("body {margin-bottom: 350px;}", 3);
  }

  // new markup
  $('body').on('click', '.uib-mup', function() {
    markup($(this).parents('form'), $(this).data('mups'), $(this).data('mupe'), $(this).data('imups'), $(this).data('imupe'));
    return false;
  });
  $('body').on('click', '.uib-bul', function() {
    bullets($(this).parents('form'), $(this).data('bul'), $(this).data('imups'), $(this).data('imupe'));
    return false;
  });
  $('body').on('click', '.uib-tx', function() {
    var target = $(this).data('target');
    head.js('http://latex.codecogs.com/editor3.js', function() {
      OpenLatexEditor(target,'phpBB','en-us', false, '','full');
    });
    return false;
  });
  
  //Webm expanding
  $('body').on('click', '.movie', function(event) {expandwebm($(this), event)});
  
  //new quick reply
  $('body').on('click', '.qrl', quickreply);
  $('body').on('click', '.qed', quickedit);
  $('#postform textarea').attr('id', 'top-textarea'); $('#postform .uib-tx').data('target', 'top-textarea');
  
  if(isTouchDevice) $('.qrpinner').hide();
  
  $('.postboxcontrol .pinner').removeClass('pinned');
  $('.postboxcontrol .pinner').removeClass('unpinned');
  $('.postboxcontrol .pinner').addClass(localStorage['pinPreference'] || 'pinned');

  /* not losing floating form data */
  ffdata.load();

  //Dollscript rape begins
  //Switch captcha language   
  dcxt.addTask(function() {
    dcxt.openSettings();
    //Switch to "form" tab
    $('.de-cfg-tab[info=form]')[0].click();
    //Switch language if it's set wrong
    if(captchalang == 'ru' && $('select[info=captchaLang] option:selected').val() !== $('select[info=captchaLang] option:contains(Rus)').val()) {
      $('select[info=captchaLang]').val($('select[info=captchaLang] option:contains(Rus)').val()).triggerNative('change'); 
    }
    if(captchalang == 'en' && $('select[info=captchaLang] option:selected').val() !== $('select[info=captchaLang] option:contains(Eng)').val()) {
      $('select[info=captchaLang]').val($('select[info=captchaLang] option:contains(Eng)').val()).triggerNative('change'); 
    }
    dcxt.closeSettings();
  });

  if(react_ena && typeof io !== 'undefined') {
    // Remove malfunctioning post counter
    injectCSS('.de-ppanel-cnt:after {display: none}', 8);
    $('#postform').append($('<input type="hidden" name="token">').val(randomString()));
    $('#postform input[type="submit"]').after('<img class="sending-loading" src="'+ku_boardspath+'/images/loading.gif">')
    var socket = io.connect(react_api);
    if(ispage) {
      var subscribeTo = [react_sitename+this_board_dir+':newthreads'];
      $('.op .reflink').children(':last-child').each(function() { 
        subscribeTo.push(react_sitename+this_board_dir+':'+$(this).text());
      });
      socket.on('update', updater.bpageNotify)
      .emit('subscribe', subscribeTo);
    }
    else {
      dcxt.addTask(function() {
        dcxt.openSettings();
        $('.de-cfg-tab[info=form]')[0].click();
        //Detect if AJAX posting enabled.
        if(+$('select[info=ajaxReply]').val()) {
          updater.ajaxPosting = true;
        }
        //Switch to "posts" tab
        $('.de-cfg-tab[info=posts]')[0].click();
        //Turn off AJAX thread update
        if($('input[info=ajaxUpdThr]:checked').length) {
          $('input[info=ajaxUpdThr]:checked')[0].click();
          dcxt.changed++;
        }
        dcxt.closeSettings();
      });
      _.noNewPosts += ("<br>" + _.threadUpdationAutomatically);
      socket.emit('subscribe', react_sitename+$('input[name=board]').val()+':'+$('input[name=replythread]').val());
      socket.on('update', function(data) {
        updater.update(data);
      });
      $('body').on('submit', '#postform', function(e) {
        e.preventDefault();
        if (!dcxt.enabled || checkcaptcha($(this).attr('id')))
        updater.send($(this));
      });
    }
  }

	$('#delform').after('<div id="rswapper">[<a onclick="javascript:rswap.swap();return false;" href="#">'+(ispage ? _.NewThread : _.reply)+'</a>]</div><hr />');

	// Chrome fix: dollchan does not start WITH our page, but a bit after
	window.addEventListener('DOMContentLoaded', function ()
	{
		setTimeout(kill_dollchan_incompatible_features, 1000);
		setTimeout(function()
		{
			$('#boardlist_footer').after(dollchanPresent()?(dollchanEnabled()?
			'<table align="right" style="position: relative; top: -40px;"><tr><td><img src="'+ku_boardspath+'/images/dollchan-on.png"></td><td>Куклоскрипт включён</td></tr></table>':
			'<table align="right" style="position: relative; top: -40px;"><tr><td><img src="'+ku_boardspath+'/images/dollchan-off.png"></td><td>Куклоскрипт есть, но выключен</td></tr></table>'):
			'<table align="right" style="position: relative; top: -40px;"><tr><td><img src="'+ku_boardspath+'/images/dollchan-absent.png"></td><td>'+(/*(navigator.userAgent.search('Chrome')>=0)?'Обнаружение куклоскрипта в Chrome не работает':*/'Куклоскрипт не обнаружен')+'<br></td></tr></table>');
		}, 1000);
	}, false);

  dcxt.addTask(function() {
    $('#rswapper').remove();
  })

  tasksAfterModify('');

  set_inputs('postform');
  
  if (localStorage) {
    for(var s in Settings) {
      if (s.substring(0,1) == "_") continue;
      $("#js_settings").append('<label><input type="checkbox" onchange="javascript:Settings.'+s+'(true)" name="settings_'+s+'" id="settings_'+s+'" value="true"> '+_['settings_'+s]+'</label><br />');
      Settings[s](false);
    }
  } else {
    $("#js_settings").append("<span style=\"color:#F00\">"+_.noLocalStorage+"</span><br />Твой браузер — говно. Скачай <a href=\"/web/20110329072959/http://google.com/chrome\" target=\"_blank\">Chrome</a>, например.");
  }

  var textbox = document.getElementById('message');
  if(textbox)
  {
    textbox.onfocus=function(){is_entering = true;}
    textbox.onblur=function(){is_entering = false;}
  }

  $('body').on('click', '#posttypeindicator a', function() {
    var xl = $(this); 
    var offset = $('[name="' + xl.attr('href').substr(1) + '"]').offset() || $('[name="' + xl.text().split('>>')[1] + '"]').offset() || false;
    if(offset) {
      $('html, body').animate({
        scrollTop: offset.top - ( $('#overlay_menu').height() + 10 )
      }, 250);
    }
    return false;
  });

  $('body').on('click', '.dice', function() {
    if(typeof $(this).data('html') === 'undefined') $(this).data('html', $(this).html());
    var htm = strip($(this).html());
    $(this).html($(this).attr('title'));
    $(this).attr('title', htm);
  });

  //Permalinks and stuff
  $('<div id="viewlink"></div>').addClass('content-background reflinkpreview qreplyform').html(
    '<div style="display:inline-block"><input type="text" id="directLink"><br /><input type="text" id="singleLink"><br /><input type="text" id="quoteLink"></div>'+
    '<a href="#" onclick="javascript:$(\'#viewlink\').hide();return false;" title="'+_.close+'"><img style="vertical-align: top;" src="'+ku_boardspath+'/css/icons/blank.gif" border="0" class="closebox spritebtn"></a>'
  ).hide().appendTo('body');
  $('body').on('click', '.shl', showLinks);
  $('#directLink, #quoteLink, #singleLink').on("click", function() { $(this).select(); });

  //Ultimate YOBA Youtube embeds
  $('body').on('click','.embed', function() {$(this).unwrap() });
  
  //detect node insertions and process them
  $(document).on('animationstart webkitAnimationStart MSAnimationStart oanimationstart', function(event) {
    var $target = $(event.target);
    if (event.originalEvent.animationName == "nodeInserted" && !$target.hasClass('_inserted_')) processNodeInsertion($target);
  });
  $('body').on('mouseenter', '._country_', function() {
    if(typeof $(this).attr('title') === "undefined") {
      $(this).attr('title', countries[$(this).attr('src').split('flags/')[1].split('.png')[0].toUpperCase()]);
    }
  });
  dcxt.performTasks();
  $('body').on('click', '.audiowrap', function(ev) {
    ev.preventDefault();
    var src = $(this).attr('href');
    $(this).replaceWith('<audio src="'+src+'" controls autoplay="true"></audio>')
  })

  $('input[name=embed]').on('input', function() {
    var match = embedLinks.process($(this).val());
    if(match) {
      $(this).val(match.code)
      .parents('.postform').find('[name=embedtype]').val(match.site);
    }
  });
}

// this will be applied to every new inserted node (post) (removed for now)

function processNodeInsertion($node) {
  if(typeof $node === 'undefined') $node = $('*');
  else {
    $node.addClass('_inserted_');
    $node = $node.parents(":eq(1)");
  }
  if($node.find('.prettyprint').length) prettyprint_mod(null, $node[0]);
  LatexIT.render($node);
  delandbanlinks($node);
}

var dcxt = {
  tries: 10,
  enabled: false,
  tasks: [],
  changed: 0,
  openSettings: function() {
    if($('#de-content-cfg').length) return;
    injectCSS('#de-content-cfg {opacity: 0!important}', 7);
    $('#de-btn-settings')[0].click();
  },
  closeSettings: function() {
    if(!$('#de-content-cfg').length) return;
    $('#de-btn-settings')[0].click();
    removeCSS(7);
  },
  addTask: function(fn) {
    if(this.enabled) fn();
    else this.tasks.push(fn);
  },
  performTasks: function() {
    if(!this.enabled && $('#de-btn-settings').length) {
      this.enabled = true;
      $('#gotothread').prop('checked', true);
      iter(this.tasks, function(task) {
        task();
      });
      this.tasks = [];
      if(this.changed) location.reload();
    }
    else if(this.tries) {
      setTimeout(function() {
        dcxt.performTasks();
      }, 500);
      this.tries--;
    }
  }
}

var updater = {
  ajaxPosting: false,
  newThreads: [],
  showNewThreads: function() {
    $('#wild_thread_appeared').remove();
    iter(this.newThreads, function(thread) {
      $.get(ku_boardspath+'/read.php?b='+this_board_dir+'&t='+this_board_dir+'&p='+thread+'&single&replink=1', function(data) {
        $('#delform').prepend(data+'<br clear="left" /><hr />');
      });
    });
    this.newThreads = [];
  },
  update: function(data) {
    if(typeof data.token !== undefined) {
      if($('input[name=token][value='+ data.token +']').length) {
        // This is my post
        clearfields($('input[name=token][value='+ data.token +']').parents('form'));
        if(!this.ajaxPosting) getnewposts();
      }
      else {
        getnewposts();
      }
    }
    var lastvisits = localStorage['lastvisits'] ? (JSON.parse(localStorage['lastvisits']) || { }) : { };
    if(typeof data.timestamp !== 'undefined') {
      lastvisits[boardid] = data.timestamp;
      localStorage.setItem('lastvisits', JSON.stringify(lastvisits));
    }
  },
  bpageNotify: function(data) {
    if($('input[name=token][value='+ data.token +']').length) return;
    if(data.room == 'newthreads') {
      if(dcxt.enabled) return;
      updater.newThreads.push(data.newthread);
      if(!$('#wild_thread_appeared').length)
      $('.postarea').after('<a class="xlink" href="javascript:updater.showNewThreads();return false;" id="wild_thread_appeared">'+_.newThreadsAvailable+'<hr /></a>');
    }
    else {
      var $target = $('[id^=replies'+data.room+']');
      if(!$target.find('.fresh-replies').text(_.newReplies+': '+(Number(($target.find('.fresh-replies').text().split(':')[1]))+1)).length)
        $target.append('<a href="/'+ this_board_dir +'/res/'+data.room+'.html" class="xlink fresh-replies">'+_.newReplies+': 1</a>').find('.fresh-replies').click(function(e) {
          e.preventDefault();
          var $label = $(this);
          var after = /\d+/.exec($target.find('.reply').last().attr('id'));
          $.ajax({
            url: ku_boardspath + '/expand.php?after=' + after + '&board=' + this_board_dir + '&threadid=' + data.room,
            success: function(data) {
              if (data) {
                $target.append($(data));
                // showreplies();
				showemails();
                
              } else {
                popupMessage(_.noNewPosts);
              }
              $label.remove();
            },
            error: function(xhr, status) {
              popupMessage(_.oops + " (" + status + ")");
            }
          });
        });
    } 
  },
  send: function($form) {
    if(!this.ajaxPosting) {
      xsend($form.attr('id'));
    }
    return false;
  }
}

function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

var kumod = getCookie('kumod');
if (kumod !== '') {
  if(kumod === 'allboards') kumod_set = true;
  else kumod_set = in_array(this_board_dir, kumod.split('|'));
}

var mp3playerid = 0;
function expandmp3(id, path){
  if (mp3playerid == id)
  {
    document.getElementById('player'+id).innerHTML = '';
    document.getElementById('player'+id).style.display = 'none';
    mp3playerid = 0;
  } else {
    if(mp3playerid != 0)
    {
      document.getElementById('player'+mp3playerid).innerHTML = '';
      document.getElementById('player'+mp3playerid).style.display = 'none';
    }

    document.getElementById('player'+id).innerHTML = '<embed src="/web/20110329072959/http://www.0chan.ru/mediaplayer.swf?type=mp3&file='+path+'" width="320" height="20">';
    document.getElementById('player'+id).style.display = 'block';
    mp3playerid = id;
  }
}

var swfplayerid = 0;
function expandswf(id, path, w, h){
  if (swfplayerid == id)
  {
    document.getElementById('swfplayer'+id).innerHTML = '';
    document.getElementById('swfplayer'+id).style.display = 'none';
    swfplayerid = 0;
  } else {
    if(swfplayerid != 0)
    {
      document.getElementById('swfplayer'+swfplayerid).innerHTML = '';
      document.getElementById('swfplayer'+swfplayerid).style.display = 'none';
    }

    document.getElementById('swfplayer'+id).innerHTML = '<embed src="'+path+'" width="'+w+'" height="'+h+'">';
    document.getElementById('swfplayer'+id).style.display = 'block';
    swfplayerid = id;
  }
}

function expandwebm($mov, ev) {
  //good luck understanding this shitcode :^)
  if($mov.data('expanded') !== '1') {
    ev.preventDefault(); 
    var movieurl = $mov.attr('href'), imgh = $mov.data('height'), imgw = $mov.data('width'), dt = $mov.data('thumb'), postnum = $mov.data('id');
    var uid = '_vframe_'+makeid()+(new Date().getTime()+10800);
    $mov.replaceWith(function() {
      return '<span id="'+uid+'" data-thumb="'+dt+'" data-width="'+imgw+'"" data-height="'+imgh+'" data-href="'+movieurl+'">'+this.innerHTML + '</span>';
    });
    $mov = $("#"+uid);
    $mov.find('img').hide();
    var video = $mov.find('video').show(), notice = '';
    if(!video.length) {
      $mov.find('span').append('<video class="thumb" src="'+movieurl+'" controls loop autoplay height="'+imgh+'" width="'+imgw+'"></video>').promise().done(function() {
        video = $mov.find('video');
      });
    }
    else video.get(0).play();
    if(!Settings.expandImgFull()) {
      var offset = 50, offset_el = video[0];
      var max_w = document.documentElement?document.documentElement.clientWidth : document.body.clientWidth;
      while (offset_el != null) {
        offset += offset_el.offsetLeft;
        offset_el = offset_el.offsetParent;
      }
      var new_w = max_w - offset;
      if(imgw > new_w) {
        var ratio = imgw / imgh;
        var zoom = 1 - new_w / imgw;
        var new_h = new_w / ratio;
        video.width(new_w);
        video.height(new_h);
        notice = _.videoDownscaledBy + " " + Math.round(zoom*100) + "% "+_.toFit;
      }
    }
    $mov.parent().find('.filesize').append('<span class="videocloser"><b> [<a href="#"> x </a>]</b> '+notice+'</span>');
    $mov.parent().find('.videocloser').click(function() {
      var uid = '_vframe_'+makeid()+(new Date().getTime()+10800);
      $mov.replaceWith(function() {
        return '<a class="movie" id="'+uid+'" data-thumb="'+dt+'" data-width="'+imgw+'"" data-height="'+imgh+'" href="'+movieurl+'">'+this.innerHTML + '</a>';
      }).data('expanded', '0');
      $mov = $("#"+uid);
      $mov.find('video').hide()[0].pause();
      $mov.find('img').show();
      $(this).remove();
      return false;
    });
  }
}

function makeid()
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function checknamesave(){
  var checkd;
  if(getCookie('name') != '') {
    checkd = true;
  } else {
    checkd = false;
  }
  var doc = document.getElementById('save');
  if (doc != null) doc.checked = checkd;
}
function checkgotothread(){
  var checkd; 
  if(getCookie('tothread') == 'off') {
    checkd = false;
  } else {
    checkd = true;
  }
  $("#gotothread").attr('checked', checkd);
}

function navigatepages (event)
{
  if (!document.getElementById) return;
    if (is_entering) return;
  if (window.event) event = window.event;

  if (event.ctrlKey)
  {

    var link = null;
    var href = null;

        var docloc = document.location.toString();
        if (docloc.indexOf('/res/') != -1) {
          if( (event.keyCode ? event.keyCode : event.which ? event.which : null) == 13 )
            $('textarea[name="message"]:focus').parents('form').submit();
        }
        else {
          if (docloc.indexOf('.html') == -1 || docloc.indexOf('board.html') != -1) {
            var page = 0;
            var docloc_trimmed = docloc.substr(0, docloc.lastIndexOf('/') + 1);
          } else {
            var page = docloc.substr((docloc.lastIndexOf('/') + 1));
            page = (+page.substr(0, page.indexOf('.html')));
            var docloc_trimmed = docloc.substr(0, docloc.lastIndexOf('/') + 1);
          }
          if (page == 0) {
            var docloc_valid = docloc_trimmed;
          } else {
            var docloc_valid  = docloc_trimmed + page + '.html';
          }
          if(match=/#s([0-9]+)/.exec(docloc)) {
            var relativepost = (+match[1]);
          } else {
            var relativepost = -1;
          }
          var maxthreads = 0;
          while(document.getElementsByName('s'+(++maxthreads)).length>0){}
          switch (event.keyCode ? event.keyCode : event.which ? event.which : null)
          {
            case 13: // ctrl+Enter
				if (Settings.sendCtrlEnter())
				{
					$('textarea[name="message"]:focus').parents('form').submit();
				}
				break;

            case 0x28: // ctrl+down
              if (relativepost == maxthreads - 1) {
                break; //var newrelativepost = 0;
              } else {
                var newrelativepost = relativepost + 1;
              }
              href = docloc_valid + '#s' + newrelativepost;
              break;

            case 0x26: // ctrl+up
              if (relativepost == -1 || relativepost == 0) {
                break; //var newrelativepost = maxthreads - 1;
              } else {
                var newrelativepost = relativepost - 1;
              }
              href = docloc_valid + '#s' + newrelativepost;
              break;

            case 0x24: // ctrl+home
              document.location = docloc_trimmed;
              break;
          }

          if (link && link.action) document.location = link.action;
          if (href) document.location.href = href;
        }
  }
}
 
if (window.document.addEventListener) {
   window.document.addEventListener("keydown", navigatepages, false);
} else {
   window.document.attachEvent("onkeydown", navigatepages);
}

function showreplies(root) {}

// overlay menu
var menu_current = '';
var menu_last = '';
function menu_show(id)
{
  if(menu_current != '')
  {
    var dl = (id == '_off_') ? 125 : 0;
    $('#'+menu_current).delay(dl).slideUp(100);
    menu_last = menu_current;
  }
  if (id != '') {
    if (menu_last == id && typeof $('#' + id).queue() !== 'undefined' && $('#' + id).queue().length > 0) {
      $('#' + id).clearQueue();
    } else {
      $('#' + id).slideDown(150);
    }
  }
  menu_current = id;
}
function menu_pin(){
  if(document.getElementById('overlay_menu').style.position == 'absolute') {
    document.getElementById('overlay_menu').style.position = 'fixed';
    Cookie('ku_menutype', 'fixed', 365);
  } else { 
    document.getElementById('overlay_menu').style.position = 'absolute';
    Cookie('ku_menutype', 'absolute', 365);
  }
}

function set_oldmenu(cookie){
  if(cookie) {
    Cookie('ku_oldmenu', 'yes', 90);
  }
  var h = document.getElementById('boardlist_header');
  var f = document.getElementById('boardlist_footer');
  if (h && f) {
    h.innerHTML = f.innerHTML + ' <a href=\"#\" onclick=\"javascript:set_cookie(\'ku_oldmenu\', \'no\', 90);parent.document.location.reload(true);\">[overlay]</a>';
  }
}

var LatexIT = {
  mode : 'gif',
  init : function() {
  if(document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"))
    this.mode='svg';
  },
  odc: "javascript:LatexIT.replaceWithSrc(this);",
  dcls: "Double click to show source", 

  pre : function(eqn) {
    var txt=eqn.innerHTML;
    if ( !txt.match(/<img.*?>/i) && !txt.match(/<object.*?>/i))
    {
      //Clean code
      txt=txt.replace(/<br>/gi,"").replace(/<br \/>/gi,"").replace(/&amp;/mg,'&');
      var atxt = "[tex]"+txt+"[/tex]"; 
      txt=escape(txt.replace(/\\/mg,'\\'));
      // Add coloring according to style of text
      var c = eval("LatexIT.normalize"+$(eqn).parent().css('color'));
      var extxt = "{\\color[rgb]{"+c.r+','+c.g+','+c.b+"}"+txt+"}";
      txt = " <img src=\"http://latex.codecogs.com/"+this.mode+".latex?"+ extxt +"\" title=\""+this.dcls+"\" alt=\""+atxt+"\" ondblclick=\""+this.odc+"\" border=\"0\" class=\"latex\" /> ";
    }
    return txt;
  },
  
  replaceWithSrc: function(eqn) {
    var txt = $(eqn).attr('alt');
    $(eqn).parent().html(txt);
  },

  render : function($scope) {
    var scope = (typeof $scope === 'undefined') ? window.document : $scope[0];
    var eqn = scope.getElementsByTagName("*");
    for (var i=0; i<eqn.length; i++) {
      if(eqn[i].getAttribute("lang") == "latex" || eqn[i].getAttribute("xml:lang") == "latex")
      eqn[i].innerHTML = this.pre(eqn[i]);
    } 
  },

  normalizergb : function(r, g, b) {
    return {r: (r/255).toFixed(3), g: (g/255).toFixed(2), b: (b/255).toFixed(2) }
  },
  normalizergba : function(r, g, b, a) {
    return this.normalizergb(r, g, b);
  }
};

function iter(array, callback) {
  if(typeof array !== 'undefined' && array) {
    if(typeof array.length === 'undefined') return callback(array);
    var i=0, len = array.length;
    for ( ; i < len ; i++ ) {
      callback(array[i]);
    }
  }
}

function in_array(needle, haystack) {
  if(typeof haystack !== 'object') {
    if(needle === haystack) return true;
    else return false;
  }
  for(var key in haystack) {
    if(needle === haystack[key]) {
      return true;
    }
  }
  return false;
}

function prettyprint_mod() {
  prettyPrint.apply(this, arguments);
  $(".prettyprint").each(function() {
    $(this).parents().filter(".reply").addClass('prettyprint-container');
  });
}

(function($) {
  $.fn.drags = function(opt) {
    opt = $.extend({handle:"",cursor:"move"}, opt);

    if(opt.handle === "") {
      var $el = this;
    } else {
      var $el = this.find(opt.handle);
    }

  }
  $.fn.dragsOff = function(opt) {
    opt = $.extend({handle:"",cursor:"default"}, opt);

    if(opt.handle === "") {
     var $el = this;
     $(this).removeClass('draggable');
    } else {
     var $el = this.find(opt.handle);
     $(this).removeClass('active-handle')
        .parent()
        .removeClass('draggable');
    }
    return $el.css('cursor', "default")
      .off("mousedown")
      .off("mouseup")
      .off("mousemove");
  }
  $.fn.pin = function() {
  	window_pin_switch();
    if( window_pinned == 1) {
      this.find('.pinner').removeClass('unpinned').addClass('pinned');
    } else {
      this.find('.pinner').removeClass('pinned').addClass('unpinned');
    }
  }
  $.fn.unwrap = function () {
	// Fix by Reimu
    //$(this).off().removeClass('wrapper').addClass('unwrapping').empty().css({'background-image': 'none'});
    $(this).off().removeClass('wrapper').empty().css({'background-image': 'none'});
    var vid = $(this).data('id'), htm = '';
    var embedHTMLs = {
      youtube: '<iframe style="display:none" class="embedded-content" width="368" height="237" src="//www.youtube.com/embed/'+vid+'?wmode=transparent" frameborder="0" allowfullscreen></iframe>',
      vimeo: '<iframe style="display:none" src="//player.vimeo.com/video/'+vid+'?badge=0" width="368" height="210" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
      coub: '<iframe src="http://coub.com/embed/'+vid+'?muted=false&autostart=false&originalSize=false&hideTopBar=false&noSiteButtons=false&startWithHD=false" allowfullscreen="true" frameborder="0" width="368" height="207"></iframe>',
	  nicovideo: '<script type="text/javascript" src="http://ext.nicovideo.jp/thumb_watch/'+vid+'"></script>'
    }
    var htm = embedHTMLs[$(this).data('site')] || false;
    if(!htm) return false;
    var container = $(this);
    var content = $(htm)
    .appendTo(container)
    .load(function() {
      $(this).show();
      container.removeClass('unwrapping');
    });
  };
  $.fn.triggerNative = function(eventName) {
    return this.each(function() {
      var el = $(this).get(0);
      triggerNativeEvent(el, eventName);
    });
  };
  function triggerNativeEvent(el, eventName){
    if (el.fireEvent) { // < IE9
    (el.fireEvent('on' + eventName));
    } else {
    var evt = document.createEvent('Events');
    evt.initEvent(eventName, true, false);
    el.dispatchEvent(evt);
    }
  }
})(jQuery);


/* Floating window code by Reimu */
var window_id = "postform";
//var editbox_id = "pop-textarea";
var editbox_tag = "textarea";

var window_x = 100;
var window_y = 100;
var window_last_mouse_x = 0;
var window_last_mouse_y = 0;
var window_move_is_active = 0;
var window_whitelist = [ "input", "textarea", "button", "select", "a" ];
var window_pinned = 1; /* is pinned to screen */

function window_elem_get () {
	return document.getElementById( window_id );
}

function window_editbox_elem_get () {
	//return document.getElementById( editbox_id );
	return window_elem_get().getElementsByTagName( editbox_tag )[0];
}

function window_is_whitelisted ( tag ) {
	return window_whitelist.indexOf( tag ) != -1;
}

function window_readback_coords () {
	var e = window_elem_get();
	window_y = parseInt( e.style.top.split("px")[0] );
	window_x = parseInt( e.style.left.split("px")[0] );
}

function window_readback_pinned () {
	var e = window_elem_get();
	if ( e.style.position == "fixed" )
		window_pinned = 1;
	else
		window_pinned = 0;
}

function window_apply_coords () {
	var e = window_elem_get();
	e.style.top = window_y + "px";
	e.style.left = window_x + "px";
}

function editor_get_size () { /* returns space separated "w h" or just space " " */
	var e = window_editbox_elem_get();
	if ( e.style.width === undefined ) return " ";
	
	return e.style.width.split("px")[0] + " " + e.style.height.split("px")[0];
}

function editor_set_size ( str ) { /* takes string, separated by space "w h" */
	if ( str == " " ) return;
	var e = window_editbox_elem_get();
	var w = str.split(" ")[0];
	var h = str.split(" ")[1];
	e.style.width = w + "px";
	e.style.height = h + "px";
}

function window_hide () {
	window_elem_get().style.display = "none";
}

function window_unhide () {
	window_elem_get().style.display = "";
	if ( window_pinned == 0 ) {
		window_unpinned_init_coords();
		window_apply_coords();
	}
}

function window_is_hidden () {
	return window_elem_get().style.display == "none";
}

function window_localStore () {
	if ( window_elem_get() === null) return;
	if ( window_is_hidden() ) return;
	
	if ( window_pinned == 1 )
		localStorage['pinPreference'] = 'pinned';
	else
		localStorage['pinPreference'] = 'unpinned';
		
	localStorage['posXPreference'] = window_x;
	localStorage['posYPreference'] = window_y;

	localStorage['editsizePreference'] = editor_get_size();
}

function window_localReStore () {
	if ( localStorage.getItem("posXPreference") === null ) return false;
	
	if ( localStorage['pinPreference'] == 'unpinned' )
		window_pinned = 0;
	else
		window_pinned = 1;
	
	window_x = parseInt(localStorage['posXPreference']);
	window_y = parseInt(localStorage['posYPreference']);
	
	editor_set_size( localStorage['editsizePreference'] );
	
	return true;
}

function window_onmove ( event ) {
	var mouse_x = event.clientX;
	var mouse_y = event.clientY;
	
	window_x += mouse_x - window_last_mouse_x;
	window_y += mouse_y - window_last_mouse_y;
	
	window_last_mouse_x = mouse_x;
	window_last_mouse_y = mouse_y;
	
	window_apply_coords();
}

function window_start_drag ( event ) {
	if ( window_move_is_active == 1 ) return;
	
	window_last_mouse_x = event.clientX;
	window_last_mouse_y = event.clientY;
	
	window_readback_coords();
	
	window_move_is_active = 1;
	
	document.addEventListener( "mousemove", window_onmove );
	document.addEventListener( "mouseup", window_stop_drag );
}

function window_stop_drag ( event ) {
	if ( window_move_is_active == 0 ) return;
	document.removeEventListener( "mousemove", window_onmove );
	document.removeEventListener( "mouseup", window_stop_drag );
	
	window_last_mouse_x = 0;
	window_last_mouse_y = 0;
	window_move_is_active = 0;
	window_localStore();
}

function window_mousedown ( e ) {
	if ( window_is_whitelisted( e.target.tagName.toLowerCase() ) ) return;
	window_start_drag( e );
	e.preventDefault();
	return false;
}

function window_set_unpinned () {
	var e = window_elem_get();
	window_readback_coords();
	
	window_x += document.documentElement.scrollLeft;
	window_y += document.documentElement.scrollTop;
	
	//e.className = e.className.split(" win_unpinned").join("") + " win_pinned";
	e.style.position = 'absolute';
	window_pinned = 0;
}

function window_set_pinned () {
	var e = window_elem_get();
	window_readback_coords();
	
	window_x -= document.documentElement.scrollLeft;
	window_y -= document.documentElement.scrollTop;
	
	//e.className = e.className.split(" win_pinned").join("") + " win_unpinned";
	e.style.position = 'fixed';
	window_pinned = 1;
}

function window_unpinned_init_coords () {
	window_x = document.documentElement.scrollLeft + 100;
	window_y = document.documentElement.scrollTop + 100;
}

function window_pin_switch () {
	window_readback_pinned();
	
	if ( window_pinned == 0 )
		window_set_pinned();
	else
		window_set_unpinned();
		
	window_apply_coords();
	window_localStore();
}

function window_make_float () {
	if ( isTouchDevice !== false ) return true;
	var e = window_elem_get();
	if ( e == null ) return false;
	
	window_localReStore();
	
	if ( window_pinned == 0 ) {
		e.style.position = 'absolute';
		window_unpinned_init_coords();
	} else {
		e.style.position = 'fixed';
	}
	
	e.style.cursor = 'move';
	
	window_apply_coords();
	
	//e.onmousedown = window_mousedown;
	e.addEventListener('mousedown', window_mousedown, false);
	
	// Moved from function
	//window.addEventListener('unload', window_localStore, false);
	
	return true;
}

function window_unmake_float() {
	if ( isTouchDevice !== false ) return true;
	var e = window_elem_get();
	if ( e == null ) return false;
	
	e.style.position = 'relative';
	e.style.cursor = '';
	e.style.top = '';
	e.style.left = '';
	
	e.removeEventListener('mousedown', window_mousedown, false);

	return true;

}

// Do it not at page load, but on first switch to "floating" mode
//window.addEventListener('DOMContentLoaded', window_init, false);

// Moved from window_make_float()
window.addEventListener('unload', window_localStore, false);


/* edit manager (emgr): */

/* JSON format: { values:[1,2,3,..], valnames:[1,2,3,...], cur:0 } */
/* "cur" is a ring buffer write pointer. "cur" is last written index */

/* zero index is not to be counted at all. It contains temporary, last save. */
/* cur starts count from 1 */

/* insert( emgr_storage_load().values.join("\n\n-----\n\n") ); */

var emgr_store_prefix = "emgr_";
var emgr_store_target = emgr_store_prefix + "data";

var emgr_max_cur_count = 10;

var emgr_min_save_len = 45; /* minimal post length to save */

function emgr_textarea_elem_get() { return window_editbox_elem_get(); /* Nuff said */ }

function emgr_storage_get() { return localStorage[emgr_store_target]; }
function emgr_storage_set(data) { localStorage[emgr_store_target] = data; }

function emgr_textarea_get() { return emgr_textarea_elem_get().value; }
function emgr_textarea_set(data) { emgr_textarea_elem_get().value = data; }

function emgr_type_init() {
	return { values:[], valnames:[], cur:0 };
}

function emgr_storage_load() {
	var val = emgr_storage_get();
	if (val === undefined) return emgr_type_init();
	return JSON.parse(val);
}

function emgr_storage_save(obj_type) {
	emgr_storage_set( JSON.stringify(obj_type) );
}

function emgr_save_last() {
	if ( window_elem_get() === null) return;
	var to_save = emgr_textarea_get();
	if ( to_save == "" ) return;

	if ( to_save.length < emgr_min_save_len ) return;

	var obj = emgr_storage_load();
	var cur = ( obj.cur + 1 ) % emgr_max_cur_count;

	obj.cur = cur;
	var index = cur + 1; /* count starts from 1 */
	obj.valnames[index] = index + "";
	obj.values[index] = to_save;

	obj.valnames[0] = "last";
	obj.values[0] = to_save;
	emgr_storage_save( obj );
}

function emgr_load(index) {
	var data = emgr_storage_load().values[index];
	if ( data === undefined ) return false;
	emgr_save_tmp();
	emgr_textarea_set( data );
}

function emgr_load_last() { emgr_load(0); }

function emgr_save_tmp() { emgr_save_last(); }
function emgr_load_tmp() { emgr_load_last(); }

function emgr_ui_onclick() { emgr_load_tmp(); }

window.addEventListener('unload', emgr_save_tmp, false);


/* SpeedPost Helpers module */

var sph_textarea_get = emgr_textarea_get; /* nuff said */
var sph_textarea_set = emgr_textarea_set;

function sph_textarea_get_before_cursor() {
	return textareaGetBeforeCursor();
}

/* http://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text */
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

function sph_get_selected_text() { return getSelectionText(); }

function sph_trim_text(str) {
	var arr = str.split('\n');
	for(var i = 0, len = arr.length; i < len; i++) {
		arr[i] = arr[i].trim();
	}
	return arr.join('\n').trim();
}

function sph_numeric_test(str){
    return /^\d+$/.test(str);
}

function sph_enquote_str_ku(s) {
	if (s === "") return s; /* empty line */

	if ( ( s[0] + s[1] ) === ">>" ) {
		if ( s[2] !== undefined )
			if (sph_numeric_test(s[2]))
				return "> " + s; /* post reply: ">>12345" to "> >>12345" */
		return ">>\\\\\\>\\\\\\" + s.substr(2);
	} else {
		if (s[0] === ">" && s[1] !== undefined)
			if (sph_numeric_test(s[1]))
				/* ">12 chairs" to ">\\\>1\\\2 chairs" */
				return ">\\\\\\>" + s[1] + "\\\\\\" + s.substr(2);
		return ">" + s;
	}
}

function sph_enquote_text(str) {
	var arr = str.split('\n');
	for(var i = 0, len = arr.length; i < len; i++) {
		arr[i] = sph_enquote_str_ku(arr[i]);
	}
	return arr.join('\n').trim();
}

function sph_text_find_last_quotenum(text) {
	var index = text.lastIndexOf(">>"); /*IE9+*/
	if (index == -1) return -1;
	var sub = text.substr(index + 2);
	var nums = sub.match(/^\d+/);
	if ( nums === null ) return -1;
	return parseInt( nums[0] );
}

function sph_text_find_last_quotenum(text) {
	var stext = "\n" + text; /* FIXME kind of bad hook */
	var arr = stext.split("[hr]").join("\n").split("\n>>"); /* just a note here. it catches only ">>" at line start or after "[hr]" */
	for (var i = arr.length - 1; i >= 0; i--) {
		var nums = arr[i].match(/^\d+/);
		if ( nums !== null )
			return parseInt( nums[0] );
	}
	return -1;
}

function sph_textarea_find_last_quotenum() {
	return sph_text_find_last_quotenum( sph_textarea_get_before_cursor() );
}

function sph_quote_selected () {
	var selection = sph_get_selected_text();
	var to_insert = sph_enquote_text(sph_trim_text(selection)) + "\n";
	return insert(to_insert);
}

function insert_postnum(postnum_src) {
	var postnum = parseInt(postnum_src);
	var selection = sph_get_selected_text();
	var to_insert = "";
	if (selection !== "") {
		to_insert = sph_enquote_text(sph_trim_text(selection)) + "\n";
	}
	if (postnum == sph_textarea_find_last_quotenum())
		return insert(to_insert);
	else
		return insert(">>" + postnum + '\n' + to_insert);
}

/*
var insert_orig = insert;

function insert(str) {
	var s = (str + "").trim();
	if (s === "") return;

	if ( ( s[0] + s[1] ) === ">>" )
		if ( s[2] !== undefined )
			if (sph_numeric_test(s.substr(2))) {
				console.log("Gotcha: insert postnum catcher catched");
				insert_postnum(s.substr(2));
				return;
			}

	insert_orig(str);
}
*/

/* SpeedPost Read highlighter module */

function spr_highlighter(preview, href) {
	if (typeof spr_highlighter_dev === "undefined")
		return false;

	spr_highlighter_dev(preview, href);
}

/* longpost_parser module start */

if (!HTMLElement.prototype.hasClass) {
  HTMLElement.prototype.hasClass = function(className) {
    return ( (" " + this.className + " ").indexOf(" " + className + " ") != -1 )
  }
}

if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'');};}

/* WARNING may be a security hole. I use it, passing only safe values */
function parseAmp(encoded) {
  var elem = document.createElement('textarea');
  elem.innerHTML = encoded;
  return elem.value;
}

/*function make_text(node) {
  var dupNode = node.cloneNode(true);
  var prettyprints = dupNode.getElementsByClassName("prettyprint");
  for (var len = prettyprints.length, i = len-1; i>=0; --i) {
    var e = prettyprints[i];
    e.parentNode.removeChild(e);
  }
  return dupNode.innerHTML;
}*/

function nodesRemoveExBR (xml) { /* except <br> */
  //xml = xml.replace(/<br>/g, '&BR&');
  xml = xml.replace(/<[^>]*>?/g, '');
  //xml = xml.replace(/\&BR\&/g, '<br>');
  return xml;
}

/* elemB is element of blockquote */
function hlGetElemBText (elemB) {
  var txt = elemB.innerHTML;
  txt = txt.split("\n").join("").split("<br>").join("\n");
  txt = parseAmp(nodesRemoveExBR(txt));
  return txt;
}

function hlElemBFromPostRoot (elem) {
  if (elem.tagName === "BLOCKQUOTE") return elem;
  return elem.getElementsByTagName("blockquote")[0];
}

function hlElemBFromPostNum (postNum) {
  var node = document.getElementById("reply" + postNum);
  var target = hlElemBFromPostRoot(node);
  return target;
}

function HighlighterGenerate() {
  var e = document.createElement('hr');
  e.style = "display: block; height: 2px; border: 0; border-top: 2px solid #FF6600; margin: 0em 0; padding: 0;";
  e.style.visibility = "hidden";
  e.className = "highlighter";
  return e;
}

function HighlightersFind(elem) {
  return elem.getElementsByClassName("highlighter");
}

function HighlightersRemoveAll() {
  var arr = HighlightersFind(document);
  var len = arr.length;
  for (var i = len - 1; i >= 0; --i) {
    var e = arr[i];
    if (e.parentNode) {
      e.parentNode.removeChild(e);
    }
  }
}

function insertAtStart (node, parent) {
  range = document.createRange();
  range.selectNode(parent);
  range.insertNode(node);
}

function insertAfter(elem, refElem) {
    var parent = refElem.parentNode;
    var next = refElem.nextSibling;
    if (next) {
        return parent.insertBefore(elem, next);
    } else {
        return parent.appendChild(elem);
    }
}

function insertNodeAtBR (elemB, brNum, node) {
  var arr = elemB.getElementsByTagName("br");
  //brNum -= 1;
  
  if (brNum == 0) {
    insertAtStart(node, elemB);
  } else if (brNum == arr.length)
    elemB.appendChild(node);
  else {
    if (typeof arr[brNum - 1] === "undefined") {
      //console.log("cannot find " + brNum + " br.");
      return false;
    } else {
      var parent = arr[brNum - 1].parentNode;
      //parent.insertBefore(node, arr[brNum - 1]);
      insertAfter(node, arr[brNum - 1]);
    }
  }
}

function insertAtBRHighlighter (elemB, brNum) {
  insertNodeAtBR(elemB, brNum, HighlighterGenerate());
}

/* finds only unique. non-unique or not found < 0 */
function arrayFind (arr, substr) {
  var len = arr.length;
  var res = -1;
  for (var i = 0; i < len; ++i) {
    if (arr[i].indexOf(substr) != -1) {
      if (res != -1) return -2;
      res = i;
    }
  }
  return res;
}

function findHiglight (elem, substr) {
  var elemB = hlElemBFromPostRoot(elem);
  if (!elemB) return false;
  var arr = hlGetElemBText(elemB).split("\n");
  var brIndex = arrayFind(arr, substr);
  if (brIndex < 0) return false;
  insertAtBRHighlighter(elemB, brIndex + 1);
}

/* iterates DOM Tree up to 'blockquote' */
function spr_DOM_tree_iterate_blockquote (elem, isSeekUp) {
  if (!isSeekUp) {
    if (elem.firstChild) return elem.firstChild;
  }
  if (elem.nextSibling) return elem.nextSibling;
  if (!elem.parentNode) return false;
  if (elem.parentNode.tagName === "BLOCKQUOTE") return false;
  if (elem.parentNode.lastChild != elem) return false; /* wtf? */
  
  return spr_DOM_tree_iterate_blockquote(elem.parentNode, true);
}

function trSingleProcess(e) {
  if (e.hasClass)
    if (e.hasClass("unkfunc")) {
      var txt = e.textContent.trim();
      if (txt.indexOf("\n") === -1 ) /* quote should not be multi-line */
        trStart.res += ( txt + "\n" );
    }
}

function trIter() {
  if (trStart.e === false) { trFinalise(); return; }
  trSingleProcess(trStart.e);
  
  trStart.e = spr_DOM_tree_iterate_blockquote(trStart.e);
  if (trStart.e === false) { trFinalise(); return; }
  if (trStart.e.className)
    if (trStart.e.className.substr(0,3) === "ref") {
      /* if current element is next reference (>>N), exit */
      trFinalise();
      trStart.e = false;
    }
}

//trTm = 0;
 /* gets all quote texts from current ref to next ref */
function trStart(startElem) {
  trStart.res = "";
  trStart.e = startElem;
  //trTm = setInterval(trIter, 1000);
  while (trStart.e) trIter();
  return trStart.res;
}

function trStop() {
  //clearInterval(trTm);
  return;
}

function trFinalise() {
  trStop();
  trStart.res = trStart.res.trim();
}

function isFromReplyList (elem) {
  if (!elem.hasClass) return false;
  /* (typeof elem.parentNode === "undefined") return false;
  return elem.parentNode.hasClass("replieslist");*/
  return elem.hasClass("ref-reply");
}

function spr_reply_up_seek(elem) {
  var e = elem;
  while (e.parentNode) {
    e = e.parentNode;

    var id = e.getAttribute("id");
    if (id)
      if (id.substr(0,5) === "reply") /* "reply10000" to "reply" */
        return e;
  }
  return false;
}

function spr_forw_reply_get_post_num(href) {
  var e = spr_reply_up_seek(href);
  if (e === false) return "";
  return e.getAttribute("id").substr(5); /* "reply10000" to "10000" */
}

function spr_highlighter_quote(preview, href) {
  var elemB = hlElemBFromPostRoot(preview);
  if (!elemB) return false;
  var quotes = trStart(href).split("\n");
  
  for (var i = 0; i < quotes.length; ++i) {
    var toFind = quotes[i].substr(1).trim(); /* quotes are starting from ">", you know. skip '>' */
    //console.log("searching: \"" + toFind + "\"");
    var res = findHiglight(preview, toFind);
    if (res !== false) break; /* we need unique occurance */
  }
}

function spr_highlighter_forw_reply(preview, href) {
  var hrefNum = spr_forw_reply_get_post_num(href);
  if (hrefNum === "") return false;

  var elemB = hlElemBFromPostRoot(preview);
  if (!elemB) return false;

  findHiglight(preview, ">>" + hrefNum);
}


function spr_scroll_highlighter(preview, elemH) {
  var p_y = preview.getBoundingClientRect();
  var e_y = elemH.getBoundingClientRect();

  if (preview.style.top !== "") {
    var diff = (e_y.top - p_y.top);
    preview.style.top = ( parseInt(preview.style.top) - diff ) + "px";
  } else if (preview.style.bottom !== "") {
    var diff = (e_y.bottom - p_y.bottom);
    preview.style.bottom = ( parseInt(preview.style.bottom) + diff ) + "px";
  }
}

function spr_hl_isHidden(preview) {
  var tds = preview.getElementsByTagName("TD");
  if (tds.length === 0) return true;
  var td = tds[tds.length - 1];
  var id = td.getAttribute("id");
  if (!id) return false; /* hidden posts has "*hidden*" in "id" of last "td" */
  if (id.indexOf("hidden") !== -1)
    return true;
  else
    return false;
}

function spr_highlighter_do (preview, href) {
  if (href.className)
    if (href.className === "youindicator") /* "(You)" is another tag */
      href = href.parentNode;
  
  if (spr_hl_isHidden(preview))
  	return;
  
  if (isFromReplyList(href))
    spr_highlighter_forw_reply(preview, href);
  else
    spr_highlighter_quote(preview, href);
  
  var h = HighlightersFind(preview);
  if (h.length === 0) return;
  
  spr_scroll_highlighter(preview, h[0]);
}

function spr_highlighter_dev (preview, href) {
  try { /* Try-catch just in case. */
    spr_highlighter_do(preview, href);
  } catch(e) {
    console.log('spr_highlighter: ' + e.name + ":" + e.message);
  }
}

function spr_test_stats(postNum) {
  var e = hlElemBFromPostNum(postNum);
  var txt = hlGetElemBText(e);
  console.log("-----------------");
  console.log("----- " + postNum);
  console.log("-----------------");
  console.log(txt);
}

/* longpost_parser module end */


function xsend(formid) {
  if(typeof formid === 'undefined') formid = "postform";
  $('#'+formid).ajaxSubmit({
    beforeSubmit: function() {
      $('#'+formid).addClass('form-sending');
    },
    success: function(responseText, statusText, xhr, $form) {
      $('#'+formid).removeClass('form-sending');
      var resp = $('<html></html>').append(responseText);
      if(resp.find('h1').text() !== '') {
        popupMessage(resp.find('h2').text());
        clearfields($(formid), true);
      }
      else if(resp.find('.big-shit').text() !== '') {
        if(resp.find('.big-shit').text() === 'Вы забанены!') {
          window.location.href = ku_cgipath + "/banned.php";
        }
        popupMessage(resp.find('.big-shit').text());
        clearfields($(formid), true);
      }
    } 
  }); 
  return false;
}

function clearfields($form, onlycaptcha) {
  if(typeof onlycaptcha === 'undefined') onlycaptcha = false;
  if(!onlycaptcha) {
    $form.find('[name="message"]').val('');
    $form.find('[name="captcha"]').val('');
    $form.find('[name="subject"]').val('');
    $form.find('[name="imagefile"]').val('');
    $form.find('[name="name"]').val('');
    $form.find('[name="embed"]').val('');
    $form.find('[name="token"]').val(randomString());
  }
  if(!dcxt.enabled) {
    $('.captchawrap').stop();
    clearTimeout(rottencaptcha);
    rotCaptcha();
  }
}

function injectCSS(rule, order) {
  iter(document.styleSheets, function(sheet) {
    if(sheet.href && sheet.href.search(ku_boardspath+'/css/styles/')===0 && sheet.href.split('/css/styles/')[1].split('?')[0] === injectDestination) {
      if(rule instanceof Array) {
        iter(rule, function(ro) {
          sheet.insertRule(ro[0], ro[1]);
        })
      }
      else { sheet.insertRule(rule, order); }
    }
  });
}

function removeCSS(order) {
  iter(document.styleSheets, function(sheet) {
    if(sheet.href && (new RegExp(injectDestination).test(sheet.href))) {
      if(order instanceof Array) {
        iter(order, function(o) {
          sheet.deleteRule(o);
        })
      }
      else { sheet.deleteRule(order); } 
    }
  });
}

function randomString() {
  var result = '', chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', length = 10;
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

var countries = {
  'A1': "Anonymous Proxy",
  'A2': "Satellite Provider",
  'O1': "Other Country",
  'AD': "Andorra",
  'AE': "United Arab Emirates",
  'AF': "Afghanistan",
  'AG': "Antigua and Barbuda",
  'AI': "Anguilla",
  'AL': "Albania",
  'AM': "Armenia",
  'AO': "Angola",
  'AP': "Asia/Pacific Region",
  'AQ': "Antarctica",
  'AR': "Argentina",
  'AS': "American Samoa",
  'AT': "Austria",
  'AU': "Australia",
  'AW': "Aruba",
  'AX': "Aland Islands",
  'AZ': "Azerbaijan",
  'BA': "Bosnia and Herzegovina",
  'BB': "Barbados",
  'BD': "Bangladesh",
  'BE': "Belgium",
  'BF': "Burkina Faso",
  'BG': "Bulgaria",
  'BH': "Bahrain",
  'BI': "Burundi",
  'BJ': "Benin",
  'BL': "Saint Bartelemey",
  'BM': "Bermuda",
  'BN': "Brunei Darussalam",
  'BO': "Bolivia",
  'BQ': "Bonaire, Saint Eustatius and Saba",
  'BR': "Brazil",
  'BS': "Bahamas",
  'BT': "Bhutan",
  'BV': "Bouvet Island",
  'BW': "Botswana",
  'BY': "Belarus",
  'BZ': "Belize",
  'CA': "Canada",
  'CC': "Cocos (Keeling) Islands",
  'CD': "Congo, The Democratic Republic of the",
  'CF': "Central African Republic",
  'CG': "Congo",
  'CH': "Switzerland",
  'CI': "Cote d'Ivoire",
  'CK': "Cook Islands",
  'CL': "Chile",
  'CM': "Cameroon",
  'CN': "China",
  'CO': "Colombia",
  'CR': "Costa Rica",
  'CU': "Cuba",
  'CV': "Cape Verde",
  'CW': "Curacao",
  'CX': "Christmas Island",
  'CY': "Cyprus",
  'CZ': "Czech Republic",
  'DE': "Germany",
  'DJ': "Djibouti",
  'DK': "Denmark",
  'DM': "Dominica",
  'DO': "Dominican Republic",
  'DZ': "Algeria",
  'EC': "Ecuador",
  'EE': "Estonia",
  'EG': "Egypt",
  'EH': "Western Sahara",
  'ER': "Eritrea",
  'ES': "Spain",
  'ET': "Ethiopia",
  'EU': "Europe",
  'FI': "Finland",
  'FJ': "Fiji",
  'FK': "Falkland Islands (Malvinas)",
  'FM': "Micronesia, Federated States of",
  'FO': "Faroe Islands",
  'FR': "France",
  'GA': "Gabon",
  'GB': "United Kingdom",
  'GD': "Grenada",
  'GE': "Georgia",
  'GF': "French Guiana",
  'GG': "Guernsey",
  'GH': "Ghana",
  'GI': "Gibraltar",
  'GL': "Greenland",
  'GM': "Gambia",
  'GN': "Guinea",
  'GP': "Guadeloupe",
  'GQ': "Equatorial Guinea",
  'GR': "Greece",
  'GS': "South Georgia and the South Sandwich Islands",
  'GT': "Guatemala",
  'GU': "Guam",
  'GW': "Guinea-Bissau",
  'GY': "Guyana",
  'HK': "Hong Kong",
  'HM': "Heard Island and McDonald Islands",
  'HN': "Honduras",
  'HR': "Croatia",
  'HT': "Haiti",
  'HU': "Hungary",
  'ID': "Indonesia",
  'IE': "Ireland",
  'IL': "Israel",
  'IM': "Isle of Man",
  'IN': "India",
  'IO': "British Indian Ocean Territory",
  'IQ': "Iraq",
  'IR': "Iran, Islamic Republic of",
  'IS': "Iceland",
  'IT': "Italy",
  'JE': "Jersey",
  'JM': "Jamaica",
  'JO': "Jordan",
  'JP': "Japan",
  'KE': "Kenya",
  'KG': "Kyrgyzstan",
  'KH': "Cambodia",
  'KI': "Kiribati",
  'KM': "Comoros",
  'KN': "Saint Kitts and Nevis",
  'KP': "Korea, Democratic People's Republic of",
  'KR': "Korea, Republic of",
  'KW': "Kuwait",
  'KY': "Cayman Islands",
  'KZ': "Kazakhstan",
  'LA': "Lao People's Democratic Republic",
  'LB': "Lebanon",
  'LC': "Saint Lucia",
  'LI': "Liechtenstein",
  'LK': "Sri Lanka",
  'LR': "Liberia",
  'LS': "Lesotho",
  'LT': "Lithuania",
  'LU': "Luxembourg",
  'LV': "Latvia",
  'LY': "Libyan Arab Jamahiriya",
  'MA': "Morocco",
  'MC': "Monaco",
  'MD': "Moldova, Republic of",
  'ME': "Montenegro",
  'MF': "Saint Martin",
  'MG': "Madagascar",
  'MH': "Marshall Islands",
  'MK': "Macedonia",
  'ML': "Mali",
  'MM': "Myanmar",
  'MN': "Mongolia",
  'MO': "Macao",
  'MP': "Northern Mariana Islands",
  'MQ': "Martinique",
  'MR': "Mauritania",
  'MS': "Montserrat",
  'MT': "Malta",
  'MU': "Mauritius",
  'MV': "Maldives",
  'MW': "Malawi",
  'MX': "Mexico",
  'MY': "Malaysia",
  'MZ': "Mozambique",
  'NA': "Namibia",
  'NC': "New Caledonia",
  'NE': "Niger",
  'NF': "Norfolk Island",
  'NG': "Nigeria",
  'NI': "Nicaragua",
  'NL': "Netherlands",
  'NO': "Norway",
  'NP': "Nepal",
  'NR': "Nauru",
  'NU': "Niue",
  'NZ': "New Zealand",
  'OM': "Oman",
  'PA': "Panama",
  'PE': "Peru",
  'PF': "French Polynesia",
  'PG': "Papua New Guinea",
  'PH': "Philippines",
  'PK': "Pakistan",
  'PL': "Poland",
  'PM': "Saint Pierre and Miquelon",
  'PN': "Pitcairn",
  'PR': "Puerto Rico",
  'PS': "Palestinian Territory",
  'PT': "Portugal",
  'PW': "Palau",
  'PY': "Paraguay",
  'QA': "Qatar",
  'RE': "Reunion",
  'RO': "Romania",
  'RS': "Serbia",
  'RU': "Russian Federation",
  'RW': "Rwanda",
  'SA': "Saudi Arabia",
  'SB': "Solomon Islands",
  'SC': "Seychelles",
  'SD': "Sudan",
  'SE': "Sweden",
  'SG': "Singapore",
  'SH': "Saint Helena",
  'SI': "Slovenia",
  'SJ': "Svalbard and Jan Mayen",
  'SK': "Slovakia",
  'SL': "Sierra Leone",
  'SM': "San Marino",
  'SN': "Senegal",
  'SO': "Somalia",
  'SR': "Suriname",
  'SS': "South Sudan",
  'ST': "Sao Tome and Principe",
  'SV': "El Salvador",
  'SX': "Sint Maarten",
  'SY': "Syrian Arab Republic",
  'SZ': "Swaziland",
  'TC': "Turks and Caicos Islands",
  'TD': "Chad",
  'TF': "French Southern Territories",
  'TG': "Togo",
  'TH': "Thailand",
  'TJ': "Tajikistan",
  'TK': "Tokelau",
  'TL': "Timor-Leste",
  'TM': "Turkmenistan",
  'TN': "Tunisia",
  'TO': "Tonga",
  'TR': "Turkey",
  'TT': "Trinidad and Tobago",
  'TV': "Tuvalu",
  'TW': "Taiwan",
  'TZ': "Tanzania, United Republic of",
  'UA': "Ukraine",
  'UG': "Uganda",
  'UM': "United States Minor Outlying Islands",
  'US': "United States",
  'UY': "Uruguay",
  'UZ': "Uzbekistan",
  'VA': "Holy See (Vatican City State)",
  'VC': "Saint Vincent and the Grenadines",
  'VE': "Venezuela",
  'VG': "Virgin Islands, British",
  'VI': "Virgin Islands, U.S.",
  'VN': "Vietnam",
  'VU': "Vanuatu",
  'WF': "Wallis and Futuna",
  'WS': "Samoa",
  'YE': "Yemen",
  'YT': "Mayotte",
  'ZA': "South Africa",
  'ZM': "Zambia",
  'ZW': "Zimbabwe",
  'XX': "OMCK"
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(array) {
  return array[getRandomInt(0, array.length-1)];
}

// jQuery form plugin
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",p),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var d in m.extraData)m.extraData.hasOwnProperty(d)&&l.push(e.isPlainObject(m.extraData[d])&&m.extraData[d].hasOwnProperty("name")&&m.extraData[d].hasOwnProperty("value")?e('<input type="hidden" name="'+m.extraData[d].name+'">').val(m.extraData[d].value).appendTo(w)[0]:e('<input type="hidden" name="'+d+'">').val(m.extraData[d]).appendTo(w)[0]);m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var p=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];p?x.responseText=p.textContent?p.textContent:p.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(y){i="parsererror",x.error=r=y||i}}catch(y){a("error caught: ",y),i="error",x.error=r=y||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,m,r])),d&&e.event.trigger("ajaxComplete",[x,m]),d&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,d,p,v,g,x,y,b,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,p="jqFormIO"+(new Date).getTime()+10800,m.iframeTarget?(v=e(m.iframeTarget),b=v.attr2("name"),b?p=b:v.attr2("name",p)):(v=e('<iframe name="'+p+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),d&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},d=m.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;y=w.clk,y&&(b=y.name,b&&!y.disabled&&(m.extraData=m.extraData||{},m.extraData[b]=y.value,"image"==y.type&&(m.extraData[b+".x"]=w.clk_x,m.extraData[b+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var p,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,p=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,d);p&&(g=g?g+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,d,p,h;for(c=0,p=u.length;p>c;c++)if(d=u[c],f=d.name,f&&!d.disabled)if(t&&o.clk&&"image"==d.type)o.clk==d&&(a.push({name:f,value:e(d).val(),type:d.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(d,!0),m&&m.constructor==Array)for(r&&r.push(d),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==d.type){r&&r.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:d.type});else a.push({name:f,value:"",type:d.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(d),a.push({name:f,value:m,type:d.type,required:d.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});

/* not losing floating form data */
var ffdata = {
  savedOn: false,
  save: function()
  {
    if(!checkcaptcha('postform')) return false;
    if(!quickreply_shown) return false;
    var data = {};
    data['top']     = $('#postform').css('top');
    data['left']    = $('#postform').css('left');
    data['savedon'] = new Date().getTime()+10800;
    ffdata.savedOn = data['savedon'];
    $('#postform [name=ffdata_savedon]').val(ffdata.savedOn);
    localStorage.setItem('ffdata_'+this_board_dir+'_'+(ispage ? 'page' : $('#postform [name=replythread]').val()), JSON.stringify(data));
    return true;
  },
  unload: function()
  {
    $('#postform [name=ffdata_savedon]').val(ffdata.savedOn || new Date().getTime()+10800);
  },
  load: function()
  {
    var key = 'ffdata_'+this_board_dir+'_'+(ispage ? 'page' : $('#postform [name=replythread]').val());
    if(!localStorage[key]) return;
    try
    {
      data = JSON.parse(localStorage[key]);
      if(data.savedon && data.savedon == $('#postform [name=ffdata_savedon]').val())
      {
        if(data.hasOwnProperty('top') && data.hasOwnProperty('left'))
        {
	  quickreply_show(data['top'], data['left'], false);
        }
      }
      else localStorage.removeItem(key);
    }
    catch(e)
    {
      localStorage.removeItem(key);
      console.log('Unable to load form data', e);
    }
  }
}

var embedLinks = {
  sites: [
    {id: 'youtube', rx: /(?:youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([\w'-]+))/ },
    {id: 'vimeo',   rx: /[\w\W]*vimeo\.com\/(?:.*?)([0-9]+)(?:.*)?/ },
    {id: 'coub',    rx: /[\w\W]*coub\.com\/view\/([\w\W]*)[\w\W]*/ },
    {id: 'nicovideo',    rx: /[\w\W]*nicovideo\.jp\/watch\/([\w\W]*)[\w\W]*/ }
  ],
  process: function(val) {
    var result = null;
    iter(this.sites, function(site) {
      var fruit = site.rx.exec(val);
      if(fruit != null) {
        result = {
          site: site.id,
          code: fruit[1]
        }
      }
    })
    return result;
  }
}

window.onbeforeunload = ffdata.unload;
