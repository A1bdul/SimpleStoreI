/*
* iziModal | v1.6.1
* https://izimodal.marcelodolza.com
* by Marcelo Dolza.
*/
!function(i){"function"==typeof define&&define.amd?define(["jquery"],i):"object"==typeof module&&module.exports?module.exports=function(t,e){return void 0===e&&(e="undefined"!=typeof window?require("jquery"):require("jquery")(t)),i(e),e}:i(jQuery)}(function(d){var h=d(window),l=d(document),c="iziModal",o="closing",u="closed",p="opening",m="opened",e="destroyed";function f(t){if(9===t)return-1!==navigator.appVersion.indexOf("MSIE 9.");t=navigator.userAgent;return-1<t.indexOf("MSIE ")||-1<t.indexOf("Trident/")}function g(t){return parseInt(String(t).split(/%|px|em|cm|vh|vw/)[0])}function i(t){t=d(d.parseHTML("<div>"+t+"</div>",null,!1));return t.find("*").each(function(){var i;i=this,d.each(i.attributes,function(){var t=this.name,e=this.value;0!=t.indexOf("on")&&0!=e.indexOf("javascript:")||d(i).removeAttr(t)})}),t.html()}var v=function(){var t,e=document.createElement("fakeelement"),i={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(t in i)if(void 0!==e.style[t])return i[t]}(),$=!!/Mobi/.test(navigator.userAgent);window.$iziModal={},window.$iziModal.autoOpen=0,window.$iziModal.history=!1;function b(t,e){this.init(t,e)}return b.prototype={constructor:b,init:function(t,n){var o=this;this.$element=d(t),void 0!==this.$element[0].id&&""!==this.$element[0].id?this.id=this.$element[0].id:(this.id=c+Math.floor(1e7*Math.random()+1),this.$element.attr("id",this.id)),this.classes=void 0!==this.$element.attr("class")?this.$element.attr("class"):"",this.content=this.$element.html(),this.state=u,this.options=n,this.width=0,this.timer=null,this.timerTimeout=null,this.progressBar=null,this.isPaused=!1,this.isFullscreen=!1,this.headerHeight=0,this.modalHeight=0,this.$overlay=d('<div class="'+c+'-overlay"></div>').css("background-color",n.overlayColor),this.$navigate=d('<div class="'+c+'-navigate"><div class="'+c+'-navigate-caption">Use</div><button class="'+c+'-navigate-prev"></button><button class="'+c+'-navigate-next"></button></div>'),this.group={name:this.$element.attr("data-"+c+"-group"),index:null,ids:[]},this.$element.attr("aria-hidden","true"),this.$element.attr("aria-labelledby",this.id),this.$element.attr("role","dialog"),this.$element.hasClass("iziModal")||this.$element.addClass("iziModal"),void 0===this.group.name&&""!==n.group&&(this.group.name=n.group,this.$element.attr("data-"+c+"-group",n.group)),!0===this.options.loop&&this.$element.attr("data-"+c+"-loop",!0),d.each(this.options,function(t,e){var i=o.$element.attr("data-"+c+"-"+t);try{void 0!==i&&(n[t]=""===i||"true"==i||"false"!=i&&("function"==typeof e?new Function(i):i))}catch(t){}}),!1!==n.appendTo&&this.$element.appendTo(n.appendTo),!0===n.iframe?(this.$element.html('<div class="'+c+'-wrap"><div class="'+c+'-content"><iframe class="'+c+'-iframe"></iframe>'+this.content+"</div></div>"),null!==n.iframeHeight&&this.$element.find("."+c+"-iframe").css("height",n.iframeHeight)):this.$element.html('<div class="'+c+'-wrap"><div class="'+c+'-content">'+this.content+"</div></div>"),null!==this.options.background&&this.$element.css("background",this.options.background),this.$wrap=this.$element.find("."+c+"-wrap"),null===n.zindex||isNaN(parseInt(n.zindex))||(this.$element.css("z-index",n.zindex),this.$navigate.css("z-index",n.zindex-1),this.$overlay.css("z-index",n.zindex-2)),""!==n.radius&&this.$element.css("border-radius",n.radius),""!==n.padding&&this.$element.find("."+c+"-content").css("padding",n.padding),""!==n.theme&&("light"===n.theme?this.$element.addClass(c+"-light"):this.$element.addClass(n.theme)),!0===n.rtl&&this.$element.addClass(c+"-rtl"),!0===n.openFullscreen&&(this.isFullscreen=!0,this.$element.addClass("isFullscreen")),this.createHeader(),this.recalcWidth(),this.recalcVerticalPos(),!o.options.afterRender||"function"!=typeof o.options.afterRender&&"object"!=typeof o.options.afterRender||o.options.afterRender(o)},createHeader:function(){this.$header=d('<div class="'+c+'-header"><h2 class="'+c+'-header-title"></h2><p class="'+c+'-header-subtitle"></p><div class="'+c+'-header-buttons"></div></div>'),!0===this.options.closeButton&&this.$header.find("."+c+"-header-buttons").append('<a href="javascript:void(0)" class="'+c+"-button "+c+'-button-close" data-'+c+"-close></a>"),!0===this.options.fullscreen&&this.$header.find("."+c+"-header-buttons").append('<a href="javascript:void(0)" class="'+c+"-button "+c+'-button-fullscreen" data-'+c+"-fullscreen></a>"),!0===this.options.timeoutProgressbar&&this.$header.prepend(d('<div class="'+c+'-progressbar">').append(d("<div>").css("background-color",this.options.timeoutProgressbarColor))),""===this.options.subtitle?this.$header.addClass(c+"-noSubtitle"):this.$header.find("."+c+"-header-subtitle").html(i(this.options.subtitle)),""!==this.options.title&&(this.$header.find("."+c+"-header-title").html(i(this.options.title)),null!==this.options.headerColor&&(!0===this.options.borderBottom&&this.$element.css("border-bottom","3px solid "+this.options.headerColor),this.$header.css("background",this.options.headerColor)),null===this.options.icon&&null===this.options.iconText||(this.$header.prepend('<i class="'+c+'-header-icon"></i>'),null!==this.options.icon&&this.$header.find("."+c+"-header-icon").addClass(this.options.icon).css("color",this.options.iconColor),null!==this.options.iconText&&this.$header.find("."+c+"-header-icon").html(i(this.options.iconText))),this.$element.css("overflow","hidden").prepend(this.$header))},setGroup:function(t){var i,n=this,e=this.group.name||t;this.group.ids=[],void 0!==t&&t!==this.group.name&&(e=t,this.group.name=e,this.$element.attr("data-"+c+"-group",e)),void 0!==e&&""!==e&&(i=0,d.each(d("."+c+"[data-"+c+"-group="+e+"]"),function(t,e){n.group.ids.push(d(this)[0].id),n.id==d(this)[0].id&&(n.group.index=i),i++}))},toggle:function(){this.state==m&&this.close(),this.state==u&&this.open()},startProgress:function(t){var e=this;this.isPaused=!1,clearTimeout(this.timerTimeout),!0===this.options.timeoutProgressbar?(this.progressBar={hideEta:null,maxHideTime:null,currentTime:(new Date).getTime(),el:this.$element.find("."+c+"-progressbar > div"),updateProgress:function(){var t;e.isPaused||(e.progressBar.currentTime=e.progressBar.currentTime+10,t=(e.progressBar.hideEta-e.progressBar.currentTime)/e.progressBar.maxHideTime*100,e.progressBar.el.width(t+"%"),t<0&&e.close())}},0<t&&(this.progressBar.maxHideTime=parseFloat(t),this.progressBar.hideEta=(new Date).getTime()+this.progressBar.maxHideTime,this.timerTimeout=setInterval(this.progressBar.updateProgress,10))):this.timerTimeout=setTimeout(function(){e.close()},e.options.timeout)},pauseProgress:function(){this.isPaused=!0},resumeProgress:function(){this.isPaused=!1},resetProgress:function(t){clearTimeout(this.timerTimeout),this.progressBar={},this.$element.find("."+c+"-progressbar > div").width("100%")},open:function(i){var t,e,n,o,s=this;try{void 0!==i&&!1===i.preventClose&&d.each(d("."+c),function(t,e){var i;void 0!==d(e).data().iziModal&&("opened"!=(i=d(e).iziModal("getState"))&&"opening"!=i||d(e).iziModal("close"))})}catch(t){}function a(){s.state=m,s.$element.trigger(m),!s.options.onOpened||"function"!=typeof s.options.onOpened&&"object"!=typeof s.options.onOpened||s.options.onOpened(s)}if(s.options.history?(t=document.title,document.title=t+" - "+s.options.title,e="#"+s.id,n=e.replace(/^.*#/,""),(o=d(e)).attr("id",n+"-tmp"),window.location.hash=e,o.attr("id",n),document.title=t,window.$iziModal.history=!0):window.$iziModal.history=!1,this.state==u){if(s.$element.off("click","[data-"+c+"-close]").on("click","[data-"+c+"-close]",function(t){t.preventDefault();t=d(t.currentTarget).attr("data-"+c+"-transitionOut");void 0!==t?s.close({transition:t}):s.close()}),s.$element.off("click","[data-"+c+"-fullscreen]").on("click","[data-"+c+"-fullscreen]",function(t){t.preventDefault(),!0===s.isFullscreen?(s.isFullscreen=!1,s.$element.removeClass("isFullscreen")):(s.isFullscreen=!0,s.$element.addClass("isFullscreen")),s.options.onFullscreen&&"function"==typeof s.options.onFullscreen&&s.options.onFullscreen(s),s.$element.trigger("fullscreen",s)}),s.$navigate.off("click","."+c+"-navigate-next").on("click","."+c+"-navigate-next",function(t){s.next(t)}),s.$element.off("click","[data-"+c+"-next]").on("click","[data-"+c+"-next]",function(t){s.next(t)}),s.$navigate.off("click","."+c+"-navigate-prev").on("click","."+c+"-navigate-prev",function(t){s.prev(t)}),s.$element.off("click","[data-"+c+"-prev]").on("click","[data-"+c+"-prev]",function(t){s.prev(t)}),this.setGroup(),this.state=p,this.$element.trigger(p),this.$element.attr("aria-hidden","false"),!0===this.options.timeoutProgressbar&&this.$element.find("."+c+"-progressbar > div").width("100%"),!0===this.options.iframe){this.$element.find("."+c+"-content").addClass(c+"-content-loader"),this.$element.find("."+c+"-iframe").on("load",function(){d(this).parent().removeClass(c+"-content-loader")});var r=null;try{r=""!==d(i.currentTarget).attr("href")?d(i.currentTarget).attr("href"):null}catch(t){}if(null!==this.options.iframeURL&&null==r&&(r=this.options.iframeURL),null==r)throw new Error("Failed to find iframe URL");this.$element.find("."+c+"-iframe").attr("src",r)}(this.options.bodyOverflow||$)&&(d("html").addClass(c+"-isOverflow"),$&&d("body").css("overflow","hidden")),this.options.onOpening&&"function"==typeof this.options.onOpening&&this.options.onOpening(this),function(){var t;1<s.group.ids.length&&(s.$navigate.appendTo("body"),s.$navigate.addClass("fadeIn"),s.options.navigateCaption&&!$&&s.$navigate.find("."+c+"-navigate-caption").show(),t=s.$element.outerWidth(),!1!==s.options.navigateArrows?"closeScreenEdge"===s.options.navigateArrows?(s.$navigate.find("."+c+"-navigate-prev").css("left",0).show(),s.$navigate.find("."+c+"-navigate-next").css("right",0).show()):(s.$navigate.find("."+c+"-navigate-prev").css("margin-left",-(t/2+84)).show(),s.$navigate.find("."+c+"-navigate-next").css("margin-right",-(t/2+84)).show()):(s.$navigate.find("."+c+"-navigate-prev").hide(),s.$navigate.find("."+c+"-navigate-next").hide()),0===s.group.index&&0===d("."+c+"[data-"+c+'-group="'+s.group.name+'"][data-'+c+"-loop]").length&&!1===s.options.loop&&s.$navigate.find("."+c+"-navigate-prev").hide(),s.group.index+1===s.group.ids.length&&0===d("."+c+"[data-"+c+'-group="'+s.group.name+'"][data-'+c+"-loop]").length&&!1===s.options.loop&&s.$navigate.find("."+c+"-navigate-next").hide()),!0===s.options.overlay&&(!1===s.options.appendToOverlay?s.$overlay.appendTo("body"):s.$overlay.appendTo(s.options.appendToOverlay)),s.options.transitionInOverlay&&s.$overlay.addClass(s.options.transitionInOverlay);var e=s.options.transitionIn;"object"==typeof i&&(void 0===i.transition&&void 0===i.transitionIn||(e=i.transition||i.transitionIn),void 0!==i.zindex&&s.setZindex(i.zindex)),""!==e&&void 0!==v?(s.$element.addClass("transitionIn "+e).show(),s.$wrap.one(v,function(){s.$element.removeClass(e+" transitionIn"),s.$overlay.removeClass(s.options.transitionInOverlay),s.$navigate.removeClass("fadeIn"),a()})):(s.$element.show(),a()),!0!==s.options.pauseOnHover||!0!==s.options.pauseOnHover||!1===s.options.timeout||isNaN(parseInt(s.options.timeout))||!1===s.options.timeout||0===s.options.timeout||(s.$element.off("mouseenter").on("mouseenter",function(t){t.preventDefault(),s.isPaused=!0}),s.$element.off("mouseleave").on("mouseleave",function(t){t.preventDefault(),s.isPaused=!1}))}(),!1===this.options.timeout||isNaN(parseInt(this.options.timeout))||!1===this.options.timeout||0===this.options.timeout||s.startProgress(this.options.timeout),this.options.overlayClose&&!this.$element.hasClass(this.options.transitionOut)&&this.$overlay.click(function(){s.close()}),this.options.focusInput&&this.$element.find(":input:not(button):enabled:visible:first").focus(),function t(){s.recalcLayout(),s.timer=setTimeout(t,300)}(),l.on("keydown."+c,function(t){s.options.closeOnEscape&&27===t.keyCode&&s.close()})}},close:function(t){var e,i=this;function n(){i.state=u,i.$element.trigger(u),!0===i.options.iframe&&i.$element.find("."+c+"-iframe").attr("src",""),(i.options.bodyOverflow||$)&&(d("html").removeClass(c+"-isOverflow"),$&&d("body").css("overflow","auto")),i.options.onClosed&&"function"==typeof i.options.onClosed&&i.options.onClosed(i),!0===i.options.restoreDefaultContent&&i.$element.find("."+c+"-content").html(i.content),0===d("."+c+":visible").length&&d("html").removeClass(c+"-isAttached")}i.options.history&&(window.location.hash=""),this.state!=m&&this.state!=p||(l.off("keydown."+c),this.state=o,this.$element.trigger(o),this.$element.attr("aria-hidden","true"),clearTimeout(this.timer),clearTimeout(this.timerTimeout),i.options.onClosing&&"function"==typeof i.options.onClosing&&i.options.onClosing(this),e=this.options.transitionOut,"object"==typeof t&&(void 0===t.transition&&void 0===t.transitionOut||(e=t.transition||t.transitionOut)),!1===e||""===e||void 0===v?(this.$element.hide(),this.$overlay.remove(),this.$navigate.remove(),n()):(this.$element.attr("class",[this.classes,c,e,"light"==this.options.theme?c+"-light":this.options.theme,!0===this.isFullscreen?"isFullscreen":"",this.options.rtl?c+"-rtl":""].join(" ")),this.$overlay.attr("class",c+"-overlay "+this.options.transitionOutOverlay),!1===i.options.navigateArrows||$||this.$navigate.attr("class",c+"-navigate fadeOut"),this.$element.one(v,function(){i.$element.hasClass(e)&&i.$element.removeClass(e+" transitionOut").hide(),i.$overlay.removeClass(i.options.transitionOutOverlay).remove(),i.$navigate.removeClass("fadeOut").remove(),n()})))},next:function(t){var n=this,o="fadeInRight",e="fadeOutLeft",i=d("."+c+":visible"),s={};s.out=this,void 0!==t&&"object"!=typeof t?(t.preventDefault(),i=d(t.currentTarget),o=i.attr("data-"+c+"-transitionIn"),e=i.attr("data-"+c+"-transitionOut")):void 0!==t&&(void 0!==t.transitionIn&&(o=t.transitionIn),void 0!==t.transitionOut&&(e=t.transitionOut)),this.close({transition:e}),setTimeout(function(){for(var t=d("."+c+"[data-"+c+'-group="'+n.group.name+'"][data-'+c+"-loop]").length,e=n.group.index+1;e<=n.group.ids.length;e++){try{s.in=d("#"+n.group.ids[e]).data().iziModal}catch(t){}if(void 0!==s.in){d("#"+n.group.ids[e]).iziModal("open",{transition:o});break}if(e==n.group.ids.length&&0<t||!0===n.options.loop)for(var i=0;i<=n.group.ids.length;i++)if(s.in=d("#"+n.group.ids[i]).data().iziModal,void 0!==s.in){d("#"+n.group.ids[i]).iziModal("open",{transition:o});break}}},200),d(document).trigger(c+"-group-change",s)},prev:function(t){var n=this,o="fadeInLeft",e="fadeOutRight",i=d("."+c+":visible"),s={};s.out=this,void 0!==t&&"object"!=typeof t?(t.preventDefault(),i=d(t.currentTarget),o=i.attr("data-"+c+"-transitionIn"),e=i.attr("data-"+c+"-transitionOut")):void 0!==t&&(void 0!==t.transitionIn&&(o=t.transitionIn),void 0!==t.transitionOut&&(e=t.transitionOut)),this.close({transition:e}),setTimeout(function(){for(var t=d("."+c+"[data-"+c+'-group="'+n.group.name+'"][data-'+c+"-loop]").length,e=n.group.index;0<=e;e--){try{s.in=d("#"+n.group.ids[e-1]).data().iziModal}catch(t){}if(void 0!==s.in){d("#"+n.group.ids[e-1]).iziModal("open",{transition:o});break}if(0===e&&0<t||!0===n.options.loop)for(var i=n.group.ids.length-1;0<=i;i--)if(s.in=d("#"+n.group.ids[i]).data().iziModal,void 0!==s.in){d("#"+n.group.ids[i]).iziModal("open",{transition:o});break}}},200),d(document).trigger(c+"-group-change",s)},destroy:function(){var t=d.Event("destroy");this.$element.trigger(t),l.off("keydown."+c),clearTimeout(this.timer),clearTimeout(this.timerTimeout),!0===this.options.iframe&&this.$element.find("."+c+"-iframe").remove(),this.$element.html(this.$element.find("."+c+"-content").html()),this.$element.off("click","[data-"+c+"-close]"),this.$element.off("click","[data-"+c+"-fullscreen]"),this.$element.off("."+c).removeData(c).removeAttr("style"),this.$overlay.remove(),this.$navigate.remove(),this.$element.trigger(e),this.$element=null},getState:function(){return this.state},getGroup:function(){return this.group},setWidth:function(t){this.options.width=t,this.recalcWidth();t=this.$element.outerWidth();!0!==this.options.navigateArrows&&"closeToModal"!=this.options.navigateArrows||(this.$navigate.find("."+c+"-navigate-prev").css("margin-left",-(t/2+84)).show(),this.$navigate.find("."+c+"-navigate-next").css("margin-right",-(t/2+84)).show())},setTop:function(t){this.options.top=t,this.recalcVerticalPos(!1)},setBottom:function(t){this.options.bottom=t,this.recalcVerticalPos(!1)},setHeader:function(t){t?this.$element.find("."+c+"-header").show():(this.headerHeight=0,this.$element.find("."+c+"-header").hide())},setTitle:function(t){this.options.title=t,0===this.headerHeight&&this.createHeader(),0===this.$header.find("."+c+"-header-title").length&&this.$header.append('<h2 class="'+c+'-header-title"></h2>'),this.$header.find("."+c+"-header-title").html(i(t))},setSubtitle:function(t){""===t?(this.$header.find("."+c+"-header-subtitle").remove(),this.$header.addClass(c+"-noSubtitle")):(0===this.$header.find("."+c+"-header-subtitle").length&&this.$header.append('<p class="'+c+'-header-subtitle"></p>'),this.$header.removeClass(c+"-noSubtitle")),this.$header.find("."+c+"-header-subtitle").html(i(t)),this.options.subtitle=t},setIcon:function(t){0===this.$header.find("."+c+"-header-icon").length&&this.$header.prepend('<i class="'+c+'-header-icon"></i>'),this.$header.find("."+c+"-header-icon").attr("class",c+"-header-icon "+t),this.options.icon=t},setIconText:function(t){this.$header.find("."+c+"-header-icon").html(i(t)),this.options.iconText=t},setHeaderColor:function(t){!0===this.options.borderBottom&&this.$element.css("border-bottom","3px solid "+t),this.$header.css("background",t),this.options.headerColor=t},setBackground:function(t){!1===t?(this.options.background=null,this.$element.css("background","")):(this.$element.css("background",t),this.options.background=t)},setZindex:function(t){isNaN(parseInt(this.options.zindex))||(this.options.zindex=t,this.$element.css("z-index",t),this.$navigate.css("z-index",t-1),this.$overlay.css("z-index",t-2))},setFullscreen:function(t){t?(this.isFullscreen=!0,this.$element.addClass("isFullscreen")):(this.isFullscreen=!1,this.$element.removeClass("isFullscreen"))},setContent:function(t){"object"==typeof t&&(!0===(t.default||!1)&&(this.content=t.content),t=t.content),!1===this.options.iframe&&this.$element.find("."+c+"-content").html(i(t))},setTransitionIn:function(t){this.options.transitionIn=t},setTransitionOut:function(t){this.options.transitionOut=t},setTimeout:function(t){this.options.timeout=t},resetContent:function(){this.$element.find("."+c+"-content").html(this.content)},startLoading:function(){this.$element.find("."+c+"-loader").length||this.$element.append('<div class="'+c+'-loader fadeIn"></div>'),this.$element.find("."+c+"-loader").css({top:this.headerHeight,borderRadius:this.options.radius})},stopLoading:function(){var t=this.$element.find("."+c+"-loader");t.length||(this.$element.prepend('<div class="'+c+'-loader fadeIn"></div>'),t=this.$element.find("."+c+"-loader").css("border-radius",this.options.radius)),t.removeClass("fadeIn").addClass("fadeOut"),setTimeout(function(){t.remove()},600)},recalcWidth:function(){var t;this.$element.css("max-width",this.options.width),f()&&(1<(t=this.options.width).toString().split("%").length&&(t=this.$element.outerWidth()),this.$element.css({left:"50%",marginLeft:-t/2}))},recalcVerticalPos:function(t){null!==this.options.top&&!1!==this.options.top?(this.$element.css("margin-top",this.options.top),0===this.options.top&&this.$element.css({borderTopRightRadius:0,borderTopLeftRadius:0})):!1===t&&this.$element.css({marginTop:"",borderRadius:this.options.radius}),null!==this.options.bottom&&!1!==this.options.bottom?(this.$element.css("margin-bottom",this.options.bottom),0===this.options.bottom&&this.$element.css({borderBottomRightRadius:0,borderBottomLeftRadius:0})):!1===t&&this.$element.css({marginBottom:"",borderRadius:this.options.radius})},recalcLayout:function(){var t=this,e=h.height(),i=this.$element.outerHeight(),n=this.$element.outerWidth(),o=this.$element.find("."+c+"-content")[0].scrollHeight,s=o+this.headerHeight,a=this.$element.innerHeight()-this.headerHeight,r=(parseInt(-(this.$element.innerHeight()+1)/2),this.$wrap.scrollTop()),l=0;f()&&(n>=h.width()||!0===this.isFullscreen?this.$element.css({left:"0",marginLeft:""}):this.$element.css({left:"50%",marginLeft:-n/2})),!0===this.options.borderBottom&&""!==this.options.title&&(l=3),this.$element.find("."+c+"-header").length&&this.$element.find("."+c+"-header").is(":visible")?(this.headerHeight=parseInt(this.$element.find("."+c+"-header").innerHeight()),this.$element.css("overflow","hidden")):(this.headerHeight=0,this.$element.css("overflow","")),this.$element.find("."+c+"-loader").length&&this.$element.find("."+c+"-loader").css("top",this.headerHeight),i!==this.modalHeight&&(this.modalHeight=i,this.options.onResize&&"function"==typeof this.options.onResize&&this.options.onResize(this)),this.state!=m&&this.state!=p||(!0===this.options.iframe&&(e<this.options.iframeHeight+this.headerHeight+l||!0===this.isFullscreen?this.$element.find("."+c+"-iframe").css("height",e-(this.headerHeight+l)):this.$element.find("."+c+"-iframe").css("height",this.options.iframeHeight)),i==e?this.$element.addClass("isAttached"):this.$element.removeClass("isAttached"),!1===this.isFullscreen&&this.$element.width()>=h.width()?this.$element.find("."+c+"-button-fullscreen").hide():this.$element.find("."+c+"-button-fullscreen").show(),this.recalcButtons(),!1===this.isFullscreen&&(e=e-(g(this.options.top)||0)-(g(this.options.bottom)||0)),e<s?(0<this.options.top&&null===this.options.bottom&&o<h.height()&&this.$element.addClass("isAttachedBottom"),0<this.options.bottom&&null===this.options.top&&o<h.height()&&this.$element.addClass("isAttachedTop"),1===d("."+c+":visible").length&&d("html").addClass(c+"-isAttached"),this.$element.css("height",e)):(this.$element.css("height",o+(this.headerHeight+l)),this.$element.removeClass("isAttachedTop isAttachedBottom"),1===d("."+c+":visible").length&&d("html").removeClass(c+"-isAttached")),a<o&&e<s?(t.$element.addClass("hasScroll"),t.$wrap.css("height",i-(t.headerHeight+l))):(t.$element.removeClass("hasScroll"),t.$wrap.css("height","auto")),a+r<o-30?t.$element.addClass("hasShadow"):t.$element.removeClass("hasShadow"))},recalcButtons:function(){var t=this.$header.find("."+c+"-header-buttons").innerWidth()+10;!0===this.options.rtl?this.$header.css("padding-left",t):this.$header.css("padding-right",t)}},h.off("load."+c).on("load."+c,function(t){var e=decodeURIComponent(document.location.hash);if(0===window.$iziModal.autoOpen&&!d("."+c).is(":visible"))try{var i=d(e).data();void 0!==i&&!1!==i.iziModal.options.autoOpen&&d(e).iziModal("open")}catch(t){}}),h.off("hashchange."+c).on("hashchange."+c,function(t){var e=decodeURIComponent(document.location.hash);if(""!==e)try{void 0!==d(e).data()&&"opening"!==d(e).iziModal("getState")&&setTimeout(function(){d(e).iziModal("open",{preventClose:!1})},200)}catch(t){}else window.$iziModal.history&&d.each(d("."+c),function(t,e){var i;void 0!==d(e).data().iziModal&&("opened"!=(i=d(e).iziModal("getState"))&&"opening"!=i||d(e).iziModal("close"))})}),l.off("click","[data-"+c+"-open]").on("click","[data-"+c+"-open]",function(t){t.preventDefault();var e=d("."+c+":visible"),i=d(t.currentTarget).attr("data-"+c+"-open"),n=d(t.currentTarget).attr("data-"+c+"-preventClose"),o=d(t.currentTarget).attr("data-"+c+"-transitionIn"),s=d(t.currentTarget).attr("data-"+c+"-transitionOut"),t=d(t.currentTarget).attr("data-"+c+"-zindex");void 0!==t&&d(i).iziModal("setZindex",t),void 0===n&&(void 0!==s?e.iziModal("close",{transition:s}):e.iziModal("close")),setTimeout(function(){void 0!==o?d(i).iziModal("open",{transition:o}):d(i).iziModal("open")},200)}),l.off("keyup."+c).on("keyup."+c,function(t){var e,i,n,o;d("."+c+":visible").length&&!$&&(e=d("."+c+":visible")[0].id,i=d("#"+e).data().iziModal.options.arrowKeys,n=d("#"+e).iziModal("getGroup"),t=(o=t||window.event).target||o.srcElement,void 0===e||!i||void 0===n.name||o.ctrlKey||o.metaKey||o.altKey||"INPUT"===t.tagName.toUpperCase()||"TEXTAREA"==t.tagName.toUpperCase()||(37===o.keyCode?d("#"+e).iziModal("prev",o):39===o.keyCode&&d("#"+e).iziModal("next",o)))}),d.fn[c]=function(t,e){if(!d(this).length&&"object"==typeof t&&this.selector){var i={$el:document.createElement("div"),id:this.selector.split("#"),class:this.selector.split(".")};if(1<i.id.length){try{i.$el=document.createElement(id[0])}catch(t){}i.$el.id=i.id[1].trim()}else if(1<i.class.length){try{i.$el=document.createElement(i.class[0])}catch(t){}for(var n=1;n<i.class.length;n++)i.$el.classList.add(i.class[n].trim())}document.body.appendChild(i.$el),this.push(d(this.selector))}for(var o=0;o<this.length;o++){var s=d(this[o]),a=s.data(c),r=d.extend({},d.fn[c].defaults,s.data(),"object"==typeof t&&t);if(a||t&&"object"!=typeof t){if("string"==typeof t&&void 0!==a)return a[t].apply(a,[].concat(e))}else s.data(c,a=new b(s,r));r.autoOpen&&(isNaN(parseInt(r.autoOpen))?!0===r.autoOpen&&a.open():setTimeout(function(){a.open()},r.autoOpen),window.$iziModal.autoOpen++)}return this},d.fn[c].defaults={title:"",subtitle:"",headerColor:"#88A0B9",background:null,theme:"",icon:null,iconText:null,iconColor:"",rtl:!1,width:600,top:null,bottom:null,borderBottom:!0,padding:0,radius:3,zindex:999,iframe:!1,iframeHeight:400,iframeURL:null,focusInput:!0,group:"",loop:!1,arrowKeys:!0,navigateCaption:!0,navigateArrows:!0,history:!1,restoreDefaultContent:!1,autoOpen:0,bodyOverflow:!1,fullscreen:!1,openFullscreen:!1,closeOnEscape:!0,closeButton:!0,appendTo:"body",appendToOverlay:"body",overlay:!0,overlayClose:!0,overlayColor:"rgba(0, 0, 0, 0.4)",timeout:!1,timeoutProgressbar:!1,pauseOnHover:!1,timeoutProgressbarColor:"rgba(255,255,255,0.5)",transitionIn:"comingIn",transitionOut:"comingOut",transitionInOverlay:"fadeIn",transitionOutOverlay:"fadeOut",onFullscreen:function(){},onResize:function(){},onOpening:function(){},onOpened:function(){},onClosing:function(){},onClosed:function(){},afterRender:function(){}},d.fn[c].Constructor=b,d.fn.iziModal});

/**
 * @preserve jed.js https://github.com/SlexAxton/Jed
 */
/*
-----------
A gettext compatible i18n library for modern JavaScript Applications

by Alex Sexton - AlexSexton [at] gmail - @SlexAxton

MIT License

A jQuery Foundation project - requires CLA to contribute -
https://contribute.jquery.org/CLA/



Jed offers the entire applicable GNU gettext spec'd set of
functions, but also offers some nicer wrappers around them.
The api for gettext was written for a language with no function
overloading, so Jed allows a little more of that.

Many thanks to Joshua I. Miller - unrtst@cpan.org - who wrote
gettext.js back in 2008. I was able to vet a lot of my ideas
against his. I also made sure Jed passed against his tests
in order to offer easy upgrades -- jsgettext.berlios.de
*/
(function (root, undef) {

  // Set up some underscore-style functions, if you already have
  // underscore, feel free to delete this section, and use it
  // directly, however, the amount of functions used doesn't
  // warrant having underscore as a full dependency.
  // Underscore 1.3.0 was used to port and is licensed
  // under the MIT License by Jeremy Ashkenas.
  var ArrayProto    = Array.prototype,
      ObjProto      = Object.prototype,
      slice         = ArrayProto.slice,
      hasOwnProp    = ObjProto.hasOwnProperty,
      nativeForEach = ArrayProto.forEach,
      breaker       = {};

  // We're not using the OOP style _ so we don't need the
  // extra level of indirection. This still means that you
  // sub out for real `_` though.
  var _ = {
    forEach : function( obj, iterator, context ) {
      var i, l, key;
      if ( obj === null ) {
        return;
      }

      if ( nativeForEach && obj.forEach === nativeForEach ) {
        obj.forEach( iterator, context );
      }
      else if ( obj.length === +obj.length ) {
        for ( i = 0, l = obj.length; i < l; i++ ) {
          if ( i in obj && iterator.call( context, obj[i], i, obj ) === breaker ) {
            return;
          }
        }
      }
      else {
        for ( key in obj) {
          if ( hasOwnProp.call( obj, key ) ) {
            if ( iterator.call (context, obj[key], key, obj ) === breaker ) {
              return;
            }
          }
        }
      }
    },
    extend : function( obj ) {
      this.forEach( slice.call( arguments, 1 ), function ( source ) {
        for ( var prop in source ) {
          obj[prop] = source[prop];
        }
      });
      return obj;
    }
  };
  // END Miniature underscore impl

  // Jed is a constructor function
  var Jed = function ( options ) {
    // Some minimal defaults
    this.defaults = {
      "locale_data" : {
        "messages" : {
          "" : {
            "domain"       : "messages",
            "lang"         : "en",
            "plural_forms" : "nplurals=2; plural=(n != 1);"
          }
          // There are no default keys, though
        }
      },
      // The default domain if one is missing
      "domain" : "messages",
      // enable debug mode to log untranslated strings to the console
      "debug" : false
    };

    // Mix in the sent options with the default options
    this.options = _.extend( {}, this.defaults, options );
    this.textdomain( this.options.domain );

    if ( options.domain && ! this.options.locale_data[ this.options.domain ] ) {
      throw new Error('Text domain set to non-existent domain: `' + options.domain + '`');
    }
  };

  // The gettext spec sets this character as the default
  // delimiter for context lookups.
  // e.g.: context\u0004key
  // If your translation company uses something different,
  // just change this at any time and it will use that instead.
  Jed.context_delimiter = String.fromCharCode( 4 );

  function getPluralFormFunc ( plural_form_string ) {
    return Jed.PF.compile( plural_form_string || "nplurals=2; plural=(n != 1);");
  }

  function Chain( key, i18n ){
    this._key = key;
    this._i18n = i18n;
  }

  // Create a chainable api for adding args prettily
  _.extend( Chain.prototype, {
    onDomain : function ( domain ) {
      this._domain = domain;
      return this;
    },
    withContext : function ( context ) {
      this._context = context;
      return this;
    },
    ifPlural : function ( num, pkey ) {
      this._val = num;
      this._pkey = pkey;
      return this;
    },
    fetch : function ( sArr ) {
      if ( {}.toString.call( sArr ) != '[object Array]' ) {
        sArr = [].slice.call(arguments, 0);
      }
      return ( sArr && sArr.length ? Jed.sprintf : function(x){ return x; } )(
        this._i18n.dcnpgettext(this._domain, this._context, this._key, this._pkey, this._val),
        sArr
      );
    }
  });

  // Add functions to the Jed prototype.
  // These will be the functions on the object that's returned
  // from creating a `new Jed()`
  // These seem redundant, but they gzip pretty well.
  _.extend( Jed.prototype, {
    // The sexier api start point
    translate : function ( key ) {
      return new Chain( key, this );
    },

    textdomain : function ( domain ) {
      if ( ! domain ) {
        return this._textdomain;
      }
      this._textdomain = domain;
    },

    gettext : function ( key ) {
      return this.dcnpgettext.call( this, undef, undef, key );
    },

    dgettext : function ( domain, key ) {
     return this.dcnpgettext.call( this, domain, undef, key );
    },

    dcgettext : function ( domain , key /*, category */ ) {
      // Ignores the category anyways
      return this.dcnpgettext.call( this, domain, undef, key );
    },

    ngettext : function ( skey, pkey, val ) {
      return this.dcnpgettext.call( this, undef, undef, skey, pkey, val );
    },

    dngettext : function ( domain, skey, pkey, val ) {
      return this.dcnpgettext.call( this, domain, undef, skey, pkey, val );
    },

    dcngettext : function ( domain, skey, pkey, val/*, category */) {
      return this.dcnpgettext.call( this, domain, undef, skey, pkey, val );
    },

    pgettext : function ( context, key ) {
      return this.dcnpgettext.call( this, undef, context, key );
    },

    dpgettext : function ( domain, context, key ) {
      return this.dcnpgettext.call( this, domain, context, key );
    },

    dcpgettext : function ( domain, context, key/*, category */) {
      return this.dcnpgettext.call( this, domain, context, key );
    },

    npgettext : function ( context, skey, pkey, val ) {
      return this.dcnpgettext.call( this, undef, context, skey, pkey, val );
    },

    dnpgettext : function ( domain, context, skey, pkey, val ) {
      return this.dcnpgettext.call( this, domain, context, skey, pkey, val );
    },

    // The most fully qualified gettext function. It has every option.
    // Since it has every option, we can use it from every other method.
    // This is the bread and butter.
    // Technically there should be one more argument in this function for 'Category',
    // but since we never use it, we might as well not waste the bytes to define it.
    dcnpgettext : function ( domain, context, singular_key, plural_key, val ) {
      // Set some defaults

      plural_key = plural_key || singular_key;

      // Use the global domain default if one
      // isn't explicitly passed in
      domain = domain || this._textdomain;

      var fallback;

      // Handle special cases

      // No options found
      if ( ! this.options ) {
        // There's likely something wrong, but we'll return the correct key for english
        // We do this by instantiating a brand new Jed instance with the default set
        // for everything that could be broken.
        fallback = new Jed();
        return fallback.dcnpgettext.call( fallback, undefined, undefined, singular_key, plural_key, val );
      }

      // No translation data provided
      if ( ! this.options.locale_data ) {
        throw new Error('No locale data provided.');
      }

      if ( ! this.options.locale_data[ domain ] ) {
        throw new Error('Domain `' + domain + '` was not found.');
      }

      if ( ! this.options.locale_data[ domain ][ "" ] ) {
        throw new Error('No locale meta information provided.');
      }

      // Make sure we have a truthy key. Otherwise we might start looking
      // into the empty string key, which is the options for the locale
      // data.
      if ( ! singular_key ) {
        throw new Error('No translation key found.');
      }

      var key  = context ? context + Jed.context_delimiter + singular_key : singular_key,
          locale_data = this.options.locale_data,
          dict = locale_data[ domain ],
          defaultConf = (locale_data.messages || this.defaults.locale_data.messages)[""],
          pluralForms = dict[""].plural_forms || dict[""]["Plural-Forms"] || dict[""]["plural-forms"] || defaultConf.plural_forms || defaultConf["Plural-Forms"] || defaultConf["plural-forms"],
          val_list,
          res;

      var val_idx;
      if (val === undefined) {
        // No value passed in; assume singular key lookup.
        val_idx = 0;

      } else {
        // Value has been passed in; use plural-forms calculations.

        // Handle invalid numbers, but try casting strings for good measure
        if ( typeof val != 'number' ) {
          val = parseInt( val, 10 );

          if ( isNaN( val ) ) {
            throw new Error('The number that was passed in is not a number.');
          }
        }

        val_idx = getPluralFormFunc(pluralForms)(val);
      }

      // Throw an error if a domain isn't found
      if ( ! dict ) {
        throw new Error('No domain named `' + domain + '` could be found.');
      }

      val_list = dict[ key ];

      // If there is no match, then revert back to
      // english style singular/plural with the keys passed in.
      if ( ! val_list || val_idx > val_list.length ) {
        if (this.options.missing_key_callback) {
          this.options.missing_key_callback(key, domain);
        }
        res = [ singular_key, plural_key ];

        // collect untranslated strings
        if (this.options.debug===true) {
          console.log(res[ getPluralFormFunc(pluralForms)( val ) ]);
        }
        return res[ getPluralFormFunc()( val ) ];
      }

      res = val_list[ val_idx ];

      // This includes empty strings on purpose
      if ( ! res  ) {
        res = [ singular_key, plural_key ];
        return res[ getPluralFormFunc()( val ) ];
      }
      return res;
    }
  });


  // We add in sprintf capabilities for post translation value interolation
  // This is not internally used, so you can remove it if you have this
  // available somewhere else, or want to use a different system.

  // We _slightly_ modify the normal sprintf behavior to more gracefully handle
  // undefined values.

  /**
   sprintf() for JavaScript 0.7-beta1
   http://www.diveintojavascript.com/projects/javascript-sprintf

   Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:
       * Redistributions of source code must retain the above copyright
         notice, this list of conditions and the following disclaimer.
       * Redistributions in binary form must reproduce the above copyright
         notice, this list of conditions and the following disclaimer in the
         documentation and/or other materials provided with the distribution.
       * Neither the name of sprintf() for JavaScript nor the
         names of its contributors may be used to endorse or promote products
         derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
   DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
   (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
   LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
   ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */
  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }
    function str_repeat(input, multiplier) {
      for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
      return output.join('');
    }

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          }
          else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
          }

          // Jed EDIT
          if ( typeof arg == 'undefined' || arg === null ) {
            arg = '';
          }
          // Jed EDIT

          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw('[sprintf] huh?');
                }
              }
            }
            else {
              throw('[sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw('[sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();

  var vsprintf = function(fmt, argv) {
    argv.unshift(fmt);
    return sprintf.apply(null, argv);
  };

  Jed.parse_plural = function ( plural_forms, n ) {
    plural_forms = plural_forms.replace(/n/g, n);
    return Jed.parse_expression(plural_forms);
  };

  Jed.sprintf = function ( fmt, args ) {
    if ( {}.toString.call( args ) == '[object Array]' ) {
      return vsprintf( fmt, [].slice.call(args) );
    }
    return sprintf.apply(this, [].slice.call(arguments) );
  };

  Jed.prototype.sprintf = function () {
    return Jed.sprintf.apply(this, arguments);
  };
  // END sprintf Implementation

  // Start the Plural forms section
  // This is a full plural form expression parser. It is used to avoid
  // running 'eval' or 'new Function' directly against the plural
  // forms.
  //
  // This can be important if you get translations done through a 3rd
  // party vendor. I encourage you to use this instead, however, I
  // also will provide a 'precompiler' that you can use at build time
  // to output valid/safe function representations of the plural form
  // expressions. This means you can build this code out for the most
  // part.
  Jed.PF = {};

  Jed.PF.parse = function ( p ) {
    var plural_str = Jed.PF.extractPluralExpr( p );
    return Jed.PF.parser.parse.call(Jed.PF.parser, plural_str);
  };

  Jed.PF.compile = function ( p ) {
    // Handle trues and falses as 0 and 1
    function imply( val ) {
      return (val === true ? 1 : val ? val : 0);
    }

    var ast = Jed.PF.parse( p );
    return function ( n ) {
      return imply( Jed.PF.interpreter( ast )( n ) );
    };
  };

  Jed.PF.interpreter = function ( ast ) {
    return function ( n ) {
      var res;
      switch ( ast.type ) {
        case 'GROUP':
          return Jed.PF.interpreter( ast.expr )( n );
        case 'TERNARY':
          if ( Jed.PF.interpreter( ast.expr )( n ) ) {
            return Jed.PF.interpreter( ast.truthy )( n );
          }
          return Jed.PF.interpreter( ast.falsey )( n );
        case 'OR':
          return Jed.PF.interpreter( ast.left )( n ) || Jed.PF.interpreter( ast.right )( n );
        case 'AND':
          return Jed.PF.interpreter( ast.left )( n ) && Jed.PF.interpreter( ast.right )( n );
        case 'LT':
          return Jed.PF.interpreter( ast.left )( n ) < Jed.PF.interpreter( ast.right )( n );
        case 'GT':
          return Jed.PF.interpreter( ast.left )( n ) > Jed.PF.interpreter( ast.right )( n );
        case 'LTE':
          return Jed.PF.interpreter( ast.left )( n ) <= Jed.PF.interpreter( ast.right )( n );
        case 'GTE':
          return Jed.PF.interpreter( ast.left )( n ) >= Jed.PF.interpreter( ast.right )( n );
        case 'EQ':
          return Jed.PF.interpreter( ast.left )( n ) == Jed.PF.interpreter( ast.right )( n );
        case 'NEQ':
          return Jed.PF.interpreter( ast.left )( n ) != Jed.PF.interpreter( ast.right )( n );
        case 'MOD':
          return Jed.PF.interpreter( ast.left )( n ) % Jed.PF.interpreter( ast.right )( n );
        case 'VAR':
          return n;
        case 'NUM':
          return ast.val;
        default:
          throw new Error("Invalid Token found.");
      }
    };
  };

  Jed.PF.regexps = {
    TRIM_BEG: /^\s\s*/,
    TRIM_END: /\s\s*$/,
    HAS_SEMICOLON: /;\s*$/,
    NPLURALS: /nplurals\=(\d+);/,
    PLURAL: /plural\=(.*);/
  };

  Jed.PF.extractPluralExpr = function ( p ) {
    // trim first
    p = p.replace(Jed.PF.regexps.TRIM_BEG, '').replace(Jed.PF.regexps.TRIM_END, '');

    if (! Jed.PF.regexps.HAS_SEMICOLON.test(p)) {
      p = p.concat(';');
    }

    var nplurals_matches = p.match( Jed.PF.regexps.NPLURALS ),
        res = {},
        plural_matches;

    // Find the nplurals number
    if ( nplurals_matches.length > 1 ) {
      res.nplurals = nplurals_matches[1];
    }
    else {
      throw new Error('nplurals not found in plural_forms string: ' + p );
    }

    // remove that data to get to the formula
    p = p.replace( Jed.PF.regexps.NPLURALS, "" );
    plural_matches = p.match( Jed.PF.regexps.PLURAL );

    if (!( plural_matches && plural_matches.length > 1 ) ) {
      throw new Error('`plural` expression not found: ' + p);
    }
    return plural_matches[ 1 ];
  };

  /* Jison generated parser */
  Jed.PF.parser = (function(){

var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"e":4,"EOF":5,"?":6,":":7,"||":8,"&&":9,"<":10,"<=":11,">":12,">=":13,"!=":14,"==":15,"%":16,"(":17,")":18,"n":19,"NUMBER":20,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"?",7:":",8:"||",9:"&&",10:"<",11:"<=",12:">",13:">=",14:"!=",15:"==",16:"%",17:"(",18:")",19:"n",20:"NUMBER"},
productions_: [0,[3,2],[4,5],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,1],[4,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return { type : 'GROUP', expr: $$[$0-1] };
break;
case 2:this.$ = { type: 'TERNARY', expr: $$[$0-4], truthy : $$[$0-2], falsey: $$[$0] };
break;
case 3:this.$ = { type: "OR", left: $$[$0-2], right: $$[$0] };
break;
case 4:this.$ = { type: "AND", left: $$[$0-2], right: $$[$0] };
break;
case 5:this.$ = { type: 'LT', left: $$[$0-2], right: $$[$0] };
break;
case 6:this.$ = { type: 'LTE', left: $$[$0-2], right: $$[$0] };
break;
case 7:this.$ = { type: 'GT', left: $$[$0-2], right: $$[$0] };
break;
case 8:this.$ = { type: 'GTE', left: $$[$0-2], right: $$[$0] };
break;
case 9:this.$ = { type: 'NEQ', left: $$[$0-2], right: $$[$0] };
break;
case 10:this.$ = { type: 'EQ', left: $$[$0-2], right: $$[$0] };
break;
case 11:this.$ = { type: 'MOD', left: $$[$0-2], right: $$[$0] };
break;
case 12:this.$ = { type: 'GROUP', expr: $$[$0-1] };
break;
case 13:this.$ = { type: 'VAR' };
break;
case 14:this.$ = { type: 'NUM', val: Number(yytext) };
break;
}
},
table: [{3:1,4:2,17:[1,3],19:[1,4],20:[1,5]},{1:[3]},{5:[1,6],6:[1,7],8:[1,8],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16]},{4:17,17:[1,3],19:[1,4],20:[1,5]},{5:[2,13],6:[2,13],7:[2,13],8:[2,13],9:[2,13],10:[2,13],11:[2,13],12:[2,13],13:[2,13],14:[2,13],15:[2,13],16:[2,13],18:[2,13]},{5:[2,14],6:[2,14],7:[2,14],8:[2,14],9:[2,14],10:[2,14],11:[2,14],12:[2,14],13:[2,14],14:[2,14],15:[2,14],16:[2,14],18:[2,14]},{1:[2,1]},{4:18,17:[1,3],19:[1,4],20:[1,5]},{4:19,17:[1,3],19:[1,4],20:[1,5]},{4:20,17:[1,3],19:[1,4],20:[1,5]},{4:21,17:[1,3],19:[1,4],20:[1,5]},{4:22,17:[1,3],19:[1,4],20:[1,5]},{4:23,17:[1,3],19:[1,4],20:[1,5]},{4:24,17:[1,3],19:[1,4],20:[1,5]},{4:25,17:[1,3],19:[1,4],20:[1,5]},{4:26,17:[1,3],19:[1,4],20:[1,5]},{4:27,17:[1,3],19:[1,4],20:[1,5]},{6:[1,7],8:[1,8],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16],18:[1,28]},{6:[1,7],7:[1,29],8:[1,8],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16]},{5:[2,3],6:[2,3],7:[2,3],8:[2,3],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16],18:[2,3]},{5:[2,4],6:[2,4],7:[2,4],8:[2,4],9:[2,4],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16],18:[2,4]},{5:[2,5],6:[2,5],7:[2,5],8:[2,5],9:[2,5],10:[2,5],11:[2,5],12:[2,5],13:[2,5],14:[2,5],15:[2,5],16:[1,16],18:[2,5]},{5:[2,6],6:[2,6],7:[2,6],8:[2,6],9:[2,6],10:[2,6],11:[2,6],12:[2,6],13:[2,6],14:[2,6],15:[2,6],16:[1,16],18:[2,6]},{5:[2,7],6:[2,7],7:[2,7],8:[2,7],9:[2,7],10:[2,7],11:[2,7],12:[2,7],13:[2,7],14:[2,7],15:[2,7],16:[1,16],18:[2,7]},{5:[2,8],6:[2,8],7:[2,8],8:[2,8],9:[2,8],10:[2,8],11:[2,8],12:[2,8],13:[2,8],14:[2,8],15:[2,8],16:[1,16],18:[2,8]},{5:[2,9],6:[2,9],7:[2,9],8:[2,9],9:[2,9],10:[2,9],11:[2,9],12:[2,9],13:[2,9],14:[2,9],15:[2,9],16:[1,16],18:[2,9]},{5:[2,10],6:[2,10],7:[2,10],8:[2,10],9:[2,10],10:[2,10],11:[2,10],12:[2,10],13:[2,10],14:[2,10],15:[2,10],16:[1,16],18:[2,10]},{5:[2,11],6:[2,11],7:[2,11],8:[2,11],9:[2,11],10:[2,11],11:[2,11],12:[2,11],13:[2,11],14:[2,11],15:[2,11],16:[2,11],18:[2,11]},{5:[2,12],6:[2,12],7:[2,12],8:[2,12],9:[2,12],10:[2,12],11:[2,12],12:[2,12],13:[2,12],14:[2,12],15:[2,12],16:[2,12],18:[2,12]},{4:30,17:[1,3],19:[1,4],20:[1,5]},{5:[2,2],6:[1,7],7:[2,2],8:[1,8],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16],18:[2,2]}],
defaultActions: {6:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){

var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 20
break;
case 2:return 19
break;
case 3:return 8
break;
case 4:return 9
break;
case 5:return 6
break;
case 6:return 7
break;
case 7:return 11
break;
case 8:return 13
break;
case 9:return 10
break;
case 10:return 12
break;
case 11:return 14
break;
case 12:return 15
break;
case 13:return 16
break;
case 14:return 17
break;
case 15:return 18
break;
case 16:return 5
break;
case 17:return 'INVALID'
break;
}
};
lexer.rules = [/^\s+/,/^[0-9]+(\.[0-9]+)?\b/,/^n\b/,/^\|\|/,/^&&/,/^\?/,/^:/,/^<=/,/^>=/,/^</,/^>/,/^!=/,/^==/,/^%/,/^\(/,/^\)/,/^$/,/^./];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
// End parser

  // Handle node, amd, and global systems
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Jed;
    }
    exports.Jed = Jed;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define(function() {
        return Jed;
      });
    }
    // Leak a global regardless of module system
    root['Jed'] = Jed;
  }

})(this);
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Sweetalert2=t()}(this,function(){"use strict";var p={awaitingPromise:new WeakMap,promise:new WeakMap,innerParams:new WeakMap,domCache:new WeakMap};var e=e=>{const t={};for(const n in e)t[e[n]]="swal2-"+e[n];return t};const m=e(["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","default-outline","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error","no-war"]),o=e(["success","warning","info","question","error"]),D="SweetAlert2:",q=e=>e.charAt(0).toUpperCase()+e.slice(1),r=e=>{console.warn("".concat(D," ").concat("object"==typeof e?e.join(" "):e))},l=e=>{console.error("".concat(D," ").concat(e))},V=[],N=(e,t)=>{e='"'.concat(e,'" is deprecated and will be removed in the next major release. Please use "').concat(t,'" instead.'),V.includes(e)||(V.push(e),r(e))},R=e=>"function"==typeof e?e():e,F=e=>e&&"function"==typeof e.toPromise,u=e=>F(e)?e.toPromise():Promise.resolve(e),U=e=>e&&Promise.resolve(e)===e;const g=()=>document.body.querySelector(".".concat(m.container)),t=e=>{const t=g();return t?t.querySelector(e):null},n=e=>t(".".concat(e)),h=()=>n(m.popup),W=()=>n(m.icon),z=()=>n(m.title),K=()=>n(m["html-container"]),_=()=>n(m.image),Y=()=>n(m["progress-steps"]),Z=()=>n(m["validation-message"]),f=()=>t(".".concat(m.actions," .").concat(m.confirm)),b=()=>t(".".concat(m.actions," .").concat(m.deny));const d=()=>t(".".concat(m.loader)),y=()=>t(".".concat(m.actions," .").concat(m.cancel)),X=()=>n(m.actions),$=()=>n(m.footer),J=()=>n(m["timer-progress-bar"]),G=()=>n(m.close),Q=()=>{const e=Array.from(h().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((e,t)=>{e=parseInt(e.getAttribute("tabindex")),t=parseInt(t.getAttribute("tabindex"));return t<e?1:e<t?-1:0});var t=Array.from(h().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(e=>"-1"!==e.getAttribute("tabindex"));return(t=>{const n=[];for(let e=0;e<t.length;e++)-1===n.indexOf(t[e])&&n.push(t[e]);return n})(e.concat(t)).filter(e=>x(e))},ee=()=>s(document.body,m.shown)&&!s(document.body,m["toast-shown"])&&!s(document.body,m["no-backdrop"]),te=()=>h()&&s(h(),m.toast);function ne(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];const n=J();x(n)&&(t&&(n.style.transition="none",n.style.width="100%"),setTimeout(()=>{n.style.transition="width ".concat(e/1e3,"s linear"),n.style.width="0%"},10))}const i={previousBodyPadding:null},v=(t,e)=>{if(t.textContent="",e){const n=new DOMParser,o=n.parseFromString(e,"text/html");Array.from(o.querySelector("head").childNodes).forEach(e=>{t.appendChild(e)}),Array.from(o.querySelector("body").childNodes).forEach(e=>{t.appendChild(e)})}},s=(t,e)=>{if(!e)return!1;var n=e.split(/\s+/);for(let e=0;e<n.length;e++)if(!t.classList.contains(n[e]))return!1;return!0},oe=(t,n)=>{Array.from(t.classList).forEach(e=>{Object.values(m).includes(e)||Object.values(o).includes(e)||Object.values(n.showClass).includes(e)||t.classList.remove(e)})},w=(e,t,n)=>{if(oe(e,t),t.customClass&&t.customClass[n]){if("string"!=typeof t.customClass[n]&&!t.customClass[n].forEach)return r("Invalid type of customClass.".concat(n,'! Expected string or iterable object, got "').concat(typeof t.customClass[n],'"'));C(e,t.customClass[n])}},ie=(e,t)=>{if(!t)return null;switch(t){case"select":case"textarea":case"file":return e.querySelector(".".concat(m.popup," > .").concat(m[t]));case"checkbox":return e.querySelector(".".concat(m.popup," > .").concat(m.checkbox," input"));case"radio":return e.querySelector(".".concat(m.popup," > .").concat(m.radio," input:checked"))||e.querySelector(".".concat(m.popup," > .").concat(m.radio," input:first-child"));case"range":return e.querySelector(".".concat(m.popup," > .").concat(m.range," input"));default:return e.querySelector(".".concat(m.popup," > .").concat(m.input))}},re=e=>{var t;e.focus(),"file"!==e.type&&(t=e.value,e.value="",e.value=t)},ae=(e,t,n)=>{e&&t&&(t="string"==typeof t?t.split(/\s+/).filter(Boolean):t).forEach(t=>{Array.isArray(e)?e.forEach(e=>{n?e.classList.add(t):e.classList.remove(t)}):n?e.classList.add(t):e.classList.remove(t)})},C=(e,t)=>{ae(e,t,!0)},A=(e,t)=>{ae(e,t,!1)},k=(e,t)=>{var n=Array.from(e.children);for(let e=0;e<n.length;e++){var o=n[e];if(o instanceof HTMLElement&&s(o,t))return o}},a=(e,t,n)=>{(n=n==="".concat(parseInt(n))?parseInt(n):n)||0===parseInt(n)?e.style[t]="number"==typeof n?"".concat(n,"px"):n:e.style.removeProperty(t)},B=function(e){e.style.display=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"flex"},P=e=>{e.style.display="none"},se=(e,t,n,o)=>{const i=e.querySelector(t);i&&(i.style[n]=o)},ce=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"flex";t?B(e,n):P(e)},x=e=>!(!e||!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)),le=()=>!x(f())&&!x(b())&&!x(y()),ue=e=>!!(e.scrollHeight>e.clientHeight),de=e=>{const t=window.getComputedStyle(e);var e=parseFloat(t.getPropertyValue("animation-duration")||"0"),n=parseFloat(t.getPropertyValue("transition-duration")||"0");return 0<e||0<n},pe=100,E={},me=()=>{E.previousActiveElement instanceof HTMLElement?(E.previousActiveElement.focus(),E.previousActiveElement=null):document.body&&document.body.focus()},ge=o=>new Promise(e=>{if(!o)return e();var t=window.scrollX,n=window.scrollY;E.restoreFocusTimeout=setTimeout(()=>{me(),e()},pe),window.scrollTo(t,n)}),he=()=>"undefined"==typeof window||"undefined"==typeof document,fe='\n <div aria-labelledby="'.concat(m.title,'" aria-describedby="').concat(m["html-container"],'" class="').concat(m.popup,'" tabindex="-1">\n   <button type="button" class="').concat(m.close,'"></button>\n   <ul class="').concat(m["progress-steps"],'"></ul>\n   <div class="').concat(m.icon,'"></div>\n   <img class="').concat(m.image,'" />\n   <h2 class="').concat(m.title,'" id="').concat(m.title,'"></h2>\n   <div class="').concat(m["html-container"],'" id="').concat(m["html-container"],'"></div>\n   <input class="').concat(m.input,'" />\n   <input type="file" class="').concat(m.file,'" />\n   <div class="').concat(m.range,'">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="').concat(m.select,'"></select>\n   <div class="').concat(m.radio,'"></div>\n   <label for="').concat(m.checkbox,'" class="').concat(m.checkbox,'">\n     <input type="checkbox" />\n     <span class="').concat(m.label,'"></span>\n   </label>\n   <textarea class="').concat(m.textarea,'"></textarea>\n   <div class="').concat(m["validation-message"],'" id="').concat(m["validation-message"],'"></div>\n   <div class="').concat(m.actions,'">\n     <div class="').concat(m.loader,'"></div>\n     <button type="button" class="').concat(m.confirm,'"></button>\n     <button type="button" class="').concat(m.deny,'"></button>\n     <button type="button" class="').concat(m.cancel,'"></button>\n   </div>\n   <div class="').concat(m.footer,'"></div>\n   <div class="').concat(m["timer-progress-bar-container"],'">\n     <div class="').concat(m["timer-progress-bar"],'"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g,""),be=()=>{const e=g();return!!e&&(e.remove(),A([document.documentElement,document.body],[m["no-backdrop"],m["toast-shown"],m["has-column"]]),!0)},c=()=>{E.currentInstance.resetValidationMessage()},ye=()=>{const e=h(),t=k(e,m.input),n=k(e,m.file),o=e.querySelector(".".concat(m.range," input")),i=e.querySelector(".".concat(m.range," output")),r=k(e,m.select),a=e.querySelector(".".concat(m.checkbox," input")),s=k(e,m.textarea);t.oninput=c,n.onchange=c,r.onchange=c,a.onchange=c,s.oninput=c,o.oninput=()=>{c(),i.value=o.value},o.onchange=()=>{c(),i.value=o.value}},ve=e=>"string"==typeof e?document.querySelector(e):e,we=e=>{const t=h();t.setAttribute("role",e.toast?"alert":"dialog"),t.setAttribute("aria-live",e.toast?"polite":"assertive"),e.toast||t.setAttribute("aria-modal","true")},Ce=e=>{"rtl"===window.getComputedStyle(e).direction&&C(g(),m.rtl)},Ae=(e,t)=>{if(e instanceof HTMLElement)t.appendChild(e);else if("object"==typeof e){var n=e,o=t;if(n.jquery)ke(o,n);else v(o,n.toString())}else e&&v(t,e)},ke=(t,n)=>{if(t.textContent="",0 in n)for(let e=0;e in n;e++)t.appendChild(n[e].cloneNode(!0));else t.appendChild(n.cloneNode(!0))},Be=(()=>{if(!he()){var e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",animation:"animationend"};for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&void 0!==e.style[n])return t[n]}return!1})(),Pe=(e,t)=>{var n,o,i,r,a,s=X(),c=d();(t.showConfirmButton||t.showDenyButton||t.showCancelButton?B:P)(s),w(s,t,"actions"),s=s,n=c,o=t,i=f(),r=b(),a=y(),xe(i,"confirm",o),xe(r,"deny",o),xe(a,"cancel",o),function(e,t,n,o){if(!o.buttonsStyling)return A([e,t,n],m.styled);C([e,t,n],m.styled),o.confirmButtonColor&&(e.style.backgroundColor=o.confirmButtonColor,C(e,m["default-outline"]));o.denyButtonColor&&(t.style.backgroundColor=o.denyButtonColor,C(t,m["default-outline"]));o.cancelButtonColor&&(n.style.backgroundColor=o.cancelButtonColor,C(n,m["default-outline"]))}(i,r,a,o),o.reverseButtons&&(o.toast?(s.insertBefore(a,i),s.insertBefore(r,i)):(s.insertBefore(a,n),s.insertBefore(r,n),s.insertBefore(i,n))),v(c,t.loaderHtml),w(c,t,"loader")};function xe(e,t,n){ce(e,n["show".concat(q(t),"Button")],"inline-block"),v(e,n["".concat(t,"ButtonText")]),e.setAttribute("aria-label",n["".concat(t,"ButtonAriaLabel")]),e.className=m[t],w(e,n,"".concat(t,"Button")),C(e,n["".concat(t,"ButtonClass")])}const Ee=(e,t)=>{const n=G();v(n,t.closeButtonHtml),w(n,t,"closeButton"),ce(n,t.showCloseButton),n.setAttribute("aria-label",t.closeButtonAriaLabel)},Te=(e,t)=>{var n,o,i=g();i&&(o=i,"string"==typeof(n=t.backdrop)?o.style.background=n:n||C([document.documentElement,document.body],m["no-backdrop"]),o=i,(n=t.position)in m?C(o,m[n]):(r('The "position" parameter is not valid, defaulting to "center"'),C(o,m.center)),n=i,(o=t.grow)&&"string"==typeof o&&(o="grow-".concat(o))in m&&C(n,m[o]),w(i,t,"container"))};const Le=["input","file","range","select","radio","checkbox","textarea"],Se=(e,a)=>{const s=h();var t,e=p.innerParams.get(e);const c=!e||a.input!==e.input;Le.forEach(e=>{const t=k(s,m[e]);{var n=e,o=a.inputAttributes;const i=ie(h(),n);if(i){Oe(i);for(const r in o)i.setAttribute(r,o[r])}}t.className=m[e],c&&P(t)}),a.input&&(c&&(e=>{if(!T[e.input])return l('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(e.input,'"'));const t=He(e.input),n=T[e.input](t,e);B(t),setTimeout(()=>{re(n)})})(a),e=a,t=He(e.input),"object"==typeof e.customClass&&C(t,e.customClass.input))},Oe=t=>{for(let e=0;e<t.attributes.length;e++){var n=t.attributes[e].name;["type","value","style"].includes(n)||t.removeAttribute(n)}},Me=(e,t)=>{e.placeholder&&!t.inputPlaceholder||(e.placeholder=t.inputPlaceholder)},je=(e,t,n)=>{if(n.inputLabel){e.id=m.input;const i=document.createElement("label");var o=m["input-label"];i.setAttribute("for",e.id),i.className=o,"object"==typeof n.customClass&&C(i,n.customClass.inputLabel),i.innerText=n.inputLabel,t.insertAdjacentElement("beforebegin",i)}},He=e=>k(h(),m[e]||m.input),Ie=(e,t)=>{["string","number"].includes(typeof t)?e.value="".concat(t):U(t)||r('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(typeof t,'"'))},T={},De=(T.text=T.email=T.password=T.number=T.tel=T.url=(e,t)=>(Ie(e,t.inputValue),je(e,e,t),Me(e,t),e.type=t.input,e),T.file=(e,t)=>(je(e,e,t),Me(e,t),e),T.range=(e,t)=>{const n=e.querySelector("input");var o=e.querySelector("output");return Ie(n,t.inputValue),n.type=t.input,Ie(o,t.inputValue),je(n,e,t),e},T.select=(e,t)=>{if(e.textContent="",t.inputPlaceholder){const n=document.createElement("option");v(n,t.inputPlaceholder),n.value="",n.disabled=!0,n.selected=!0,e.appendChild(n)}return je(e,e,t),e},T.radio=e=>(e.textContent="",e),T.checkbox=(e,t)=>{const n=ie(h(),"checkbox");n.value="1",n.id=m.checkbox,n.checked=Boolean(t.inputValue);e=e.querySelector("span");return v(e,t.inputPlaceholder),n},T.textarea=(n,e)=>{Ie(n,e.inputValue),Me(n,e),je(n,n,e);return setTimeout(()=>{if("MutationObserver"in window){const t=parseInt(window.getComputedStyle(h()).width);new MutationObserver(()=>{var e=n.offsetWidth+(e=n,parseInt(window.getComputedStyle(e).marginLeft)+parseInt(window.getComputedStyle(e).marginRight));e>t?h().style.width="".concat(e,"px"):h().style.width=null}).observe(n,{attributes:!0,attributeFilter:["style"]})}}),n},(e,t)=>{const n=K();w(n,t,"htmlContainer"),t.html?(Ae(t.html,n),B(n,"block")):t.text?(n.textContent=t.text,B(n,"block")):P(n),Se(e,t)}),qe=(e,t)=>{var n=$();ce(n,t.footer),t.footer&&Ae(t.footer,n),w(n,t,"footer")},Ve=(e,t)=>{var e=p.innerParams.get(e),n=W();e&&t.icon===e.icon?(We(n,t),Ne(n,t)):t.icon||t.iconHtml?t.icon&&-1===Object.keys(o).indexOf(t.icon)?(l('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(t.icon,'"')),P(n)):(B(n),We(n,t),Ne(n,t),C(n,t.showClass.icon)):P(n)},Ne=(e,t)=>{for(const n in o)t.icon!==n&&A(e,o[n]);C(e,o[t.icon]),ze(e,t),Re(),w(e,t,"icon")},Re=()=>{const e=h();var t=window.getComputedStyle(e).getPropertyValue("background-color");const n=e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");for(let e=0;e<n.length;e++)n[e].style.backgroundColor=t},Fe='\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n',Ue='\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n',We=(e,t)=>{let n=e.innerHTML,o;var i;t.iconHtml?o=Ke(t.iconHtml):"success"===t.icon?(o=Fe,n=n.replace(/ style=".*?"/g,"")):o="error"===t.icon?Ue:(i={question:"?",warning:"!",info:"i"},Ke(i[t.icon])),n.trim()!==o.trim()&&v(e,o)},ze=(e,t)=>{if(t.iconColor){e.style.color=t.iconColor,e.style.borderColor=t.iconColor;for(const n of[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"])se(e,n,"backgroundColor",t.iconColor);se(e,".swal2-success-ring","borderColor",t.iconColor)}},Ke=e=>'<div class="'.concat(m["icon-content"],'">').concat(e,"</div>"),_e=(e,t)=>{const n=_();if(!t.imageUrl)return P(n);B(n,""),n.setAttribute("src",t.imageUrl),n.setAttribute("alt",t.imageAlt),a(n,"width",t.imageWidth),a(n,"height",t.imageHeight),n.className=m.image,w(n,t,"image")},Ye=(e,t)=>{var n=g();const o=h();t.toast?(a(n,"width",t.width),o.style.width="100%",o.insertBefore(d(),W())):a(o,"width",t.width),a(o,"padding",t.padding),t.color&&(o.style.color=t.color),t.background&&(o.style.background=t.background),P(Z());n=o;(n.className="".concat(m.popup," ").concat(x(n)?t.showClass.popup:""),t.toast)?(C([document.documentElement,document.body],m["toast-shown"]),C(n,m.toast)):C(n,m.modal);w(n,t,"popup"),"string"==typeof t.customClass&&C(n,t.customClass);t.icon&&C(n,m["icon-".concat(t.icon)])},Ze=(e,n)=>{const o=Y();if(!n.progressSteps||0===n.progressSteps.length)return P(o);B(o),o.textContent="",n.currentProgressStep>=n.progressSteps.length&&r("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),n.progressSteps.forEach((e,t)=>{var e=(e=>{const t=document.createElement("li");return C(t,m["progress-step"]),v(t,e),t})(e);o.appendChild(e),t===n.currentProgressStep&&C(e,m["active-progress-step"]),t!==n.progressSteps.length-1&&(e=(e=>{const t=document.createElement("li");if(C(t,m["progress-step-line"]),e.progressStepsDistance)a(t,"width",e.progressStepsDistance);return t})(n),o.appendChild(e))})},Xe=(e,t)=>{const n=z();ce(n,t.title||t.titleText,"block"),t.title&&Ae(t.title,n),t.titleText&&(n.innerText=t.titleText),w(n,t,"title")},$e=(e,t)=>{Ye(e,t),Te(e,t),Ze(e,t),Ve(e,t),_e(e,t),Xe(e,t),Ee(e,t),De(e,t),Pe(e,t),qe(e,t),"function"==typeof t.didRender&&t.didRender(h())};function Je(){var e,t=p.innerParams.get(this);if(t){const n=p.domCache.get(this);P(n.loader),te()?t.icon&&B(W()):(t=n,(e=t.popup.getElementsByClassName(t.loader.getAttribute("data-button-to-replace"))).length?B(e[0],"inline-block"):le()&&P(t.actions)),A([n.popup,n.actions],m.loading),n.popup.removeAttribute("aria-busy"),n.popup.removeAttribute("data-loading"),n.confirmButton.disabled=!1,n.denyButton.disabled=!1,n.cancelButton.disabled=!1}}const Ge=()=>f()&&f().click();const L=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),Qe=e=>{e.keydownTarget&&e.keydownHandlerAdded&&(e.keydownTarget.removeEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!1)},et=(e,t,n)=>{const o=Q();if(o.length)return(t+=n)===o.length?t=0:-1===t&&(t=o.length-1),o[t].focus();h().focus()},tt=["ArrowRight","ArrowDown"],nt=["ArrowLeft","ArrowUp"],ot=(e,n,t)=>{var o=p.innerParams.get(e);if(o&&(!n.isComposing&&229!==n.keyCode))if(o.stopKeydownPropagation&&n.stopPropagation(),"Enter"===n.key)e=e,s=n,i=o,R(i.allowEnterKey)&&s.target&&e.getInput()&&s.target instanceof HTMLElement&&s.target.outerHTML===e.getInput().outerHTML&&(["textarea","file"].includes(i.input)||(Ge(),s.preventDefault()));else if("Tab"===n.key){e=n;var i=o;var r=e.target,a=Q();let t=-1;for(let e=0;e<a.length;e++)if(r===a[e]){t=e;break}e.shiftKey?et(i,t,-1):et(i,t,1);e.stopPropagation(),e.preventDefault()}else if([...tt,...nt].includes(n.key)){var s=n.key;const l=f(),u=b(),d=y();if(!(document.activeElement instanceof HTMLElement)||[l,u,d].includes(document.activeElement)){var c=tt.includes(s)?"nextElementSibling":"previousElementSibling";let t=document.activeElement;for(let e=0;e<X().children.length;e++){if(!(t=t[c]))return;if(t instanceof HTMLButtonElement&&x(t))break}t instanceof HTMLButtonElement&&t.focus()}}else if("Escape"===n.key){e=n,n=o,o=t;if(R(n.allowEscapeKey)){e.preventDefault();o(L.esc)}}};var it={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};const rt=()=>{const e=Array.from(document.body.children);e.forEach(e=>{e===g()||e.contains(g())||(e.hasAttribute("aria-hidden")&&e.setAttribute("data-previous-aria-hidden",e.getAttribute("aria-hidden")),e.setAttribute("aria-hidden","true"))})},at=()=>{const e=Array.from(document.body.children);e.forEach(e=>{e.hasAttribute("data-previous-aria-hidden")?(e.setAttribute("aria-hidden",e.getAttribute("data-previous-aria-hidden")),e.removeAttribute("data-previous-aria-hidden")):e.removeAttribute("aria-hidden")})},st=()=>{if((/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream||"MacIntel"===navigator.platform&&1<navigator.maxTouchPoints)&&!s(document.body,m.iosfix)){var e,t=document.body.scrollTop;document.body.style.top="".concat(-1*t,"px"),C(document.body,m.iosfix);{const n=g();let t;n.ontouchstart=e=>{t=ct(e)},n.ontouchmove=e=>{t&&(e.preventDefault(),e.stopPropagation())}}{const o=navigator.userAgent,i=!!o.match(/iPad/i)||!!o.match(/iPhone/i),r=!!o.match(/WebKit/i),a=i&&r&&!o.match(/CriOS/i);a&&(e=44,h().scrollHeight>window.innerHeight-44&&(g().style.paddingBottom="".concat(44,"px")))}}},ct=e=>{var t,n=e.target,o=g();return!((t=e).touches&&t.touches.length&&"stylus"===t.touches[0].touchType||(t=e).touches&&1<t.touches.length)&&(n===o||!ue(o)&&n instanceof HTMLElement&&"INPUT"!==n.tagName&&"TEXTAREA"!==n.tagName&&(!ue(K())||!K().contains(n)))},lt=()=>{var e;s(document.body,m.iosfix)&&(e=parseInt(document.body.style.top,10),A(document.body,m.iosfix),document.body.style.top="",document.body.scrollTop=-1*e)},ut=()=>{null===i.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(i.previousBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight="".concat(i.previousBodyPadding+(()=>{const e=document.createElement("div");e.className=m["scrollbar-measure"],document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t})(),"px"))},dt=()=>{null!==i.previousBodyPadding&&(document.body.style.paddingRight="".concat(i.previousBodyPadding,"px"),i.previousBodyPadding=null)};function pt(e,t,n,o){te()?ft(e,o):(ge(n).then(()=>ft(e,o)),Qe(E)),/^((?!chrome|android).)*safari/i.test(navigator.userAgent)?(t.setAttribute("style","display:none !important"),t.removeAttribute("class"),t.innerHTML=""):t.remove(),ee()&&(dt(),lt(),at()),A([document.documentElement,document.body],[m.shown,m["height-auto"],m["no-backdrop"],m["toast-shown"]])}function mt(e){e=void 0!==(n=e)?Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},n):{isConfirmed:!1,isDenied:!1,isDismissed:!0};const t=it.swalPromiseResolve.get(this);var n=(e=>{const t=h();if(!t)return false;const n=p.innerParams.get(e);if(!n||s(t,n.hideClass.popup))return false;A(t,n.showClass.popup),C(t,n.hideClass.popup);const o=g();return A(o,n.showClass.backdrop),C(o,n.hideClass.backdrop),ht(e,t,n),true})(this);this.isAwaitingPromise()?e.isDismissed||(gt(this),t(e)):n&&t(e)}const gt=e=>{e.isAwaitingPromise()&&(p.awaitingPromise.delete(e),p.innerParams.get(e)||e._destroy())},ht=(e,t,n)=>{var o,i,r,a=g(),s=Be&&de(t);"function"==typeof n.willClose&&n.willClose(t),s?(s=e,o=t,t=a,i=n.returnFocus,r=n.didClose,E.swalCloseEventFinishedCallback=pt.bind(null,s,t,i,r),o.addEventListener(Be,function(e){e.target===o&&(E.swalCloseEventFinishedCallback(),delete E.swalCloseEventFinishedCallback)})):pt(e,a,n.returnFocus,n.didClose)},ft=(e,t)=>{setTimeout(()=>{"function"==typeof t&&t.bind(e.params)(),e._destroy()})};function bt(e,t,n){const o=p.domCache.get(e);t.forEach(e=>{o[e].disabled=n})}function yt(e,t){if(e)if("radio"===e.type){const n=e.parentNode.parentNode,o=n.querySelectorAll("input");for(let e=0;e<o.length;e++)o[e].disabled=t}else e.disabled=t}const S={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",color:void 0,backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0},vt=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","color","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","willClose"],wt={},Ct=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"],At=e=>Object.prototype.hasOwnProperty.call(S,e),kt=e=>-1!==vt.indexOf(e),Bt=e=>wt[e],Pt=e=>{!e.backdrop&&e.allowOutsideClick&&r('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');for(const n in e)t=n,At(t)||r('Unknown parameter "'.concat(t,'"')),e.toast&&(t=n,Ct.includes(t)&&r('The parameter "'.concat(t,'" is incompatible with toasts'))),t=n,Bt(t)&&N(t,Bt(t));var t};const xt=e=>{e.isAwaitingPromise()?(Et(p,e),p.awaitingPromise.set(e,!0)):(Et(it,e),Et(p,e))},Et=(e,t)=>{for(const n in e)e[n].delete(t)};e=Object.freeze({hideLoading:Je,disableLoading:Je,getInput:function(e){var t=p.innerParams.get(e||this);return(e=p.domCache.get(e||this))?ie(e.popup,t.input):null},close:mt,isAwaitingPromise:function(){return!!p.awaitingPromise.get(this)},rejectPromise:function(e){const t=it.swalPromiseReject.get(this);gt(this),t&&t(e)},handleAwaitingPromise:gt,closePopup:mt,closeModal:mt,closeToast:mt,enableButtons:function(){bt(this,["confirmButton","denyButton","cancelButton"],!1)},disableButtons:function(){bt(this,["confirmButton","denyButton","cancelButton"],!0)},enableInput:function(){yt(this.getInput(),!1)},disableInput:function(){yt(this.getInput(),!0)},showValidationMessage:function(e){const t=p.domCache.get(this);var n=p.innerParams.get(this);v(t.validationMessage,e),t.validationMessage.className=m["validation-message"],n.customClass&&n.customClass.validationMessage&&C(t.validationMessage,n.customClass.validationMessage),B(t.validationMessage);const o=this.getInput();o&&(o.setAttribute("aria-invalid",!0),o.setAttribute("aria-describedby",m["validation-message"]),re(o),C(o,m.inputerror))},resetValidationMessage:function(){var e=p.domCache.get(this);e.validationMessage&&P(e.validationMessage);const t=this.getInput();t&&(t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedby"),A(t,m.inputerror))},getProgressSteps:function(){return p.domCache.get(this).progressSteps},update:function(e){var t=h(),n=p.innerParams.get(this);if(!t||s(t,n.hideClass.popup))return r("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");t=(t=>{const n={};return Object.keys(t).forEach(e=>{if(kt(e))n[e]=t[e];else r("Invalid parameter to update: ".concat(e))}),n})(e),n=Object.assign({},n,t),$e(this,n),p.innerParams.set(this,n),Object.defineProperties(this,{params:{value:Object.assign({},this.params,e),writable:!1,enumerable:!0}})},_destroy:function(){var e=p.domCache.get(this);const t=p.innerParams.get(this);t?(e.popup&&E.swalCloseEventFinishedCallback&&(E.swalCloseEventFinishedCallback(),delete E.swalCloseEventFinishedCallback),"function"==typeof t.didDestroy&&t.didDestroy(),e=this,xt(e),delete e.params,delete E.keydownHandler,delete E.keydownTarget,delete E.currentInstance):xt(this)}});const O=e=>{let t=h();t||new An,t=h();var n=d();if(te())P(W());else{var o=t;const i=X(),r=d();!e&&x(f())&&(e=f());B(i),e&&(P(e),r.setAttribute("data-button-to-replace",e.className));r.parentNode.insertBefore(r,e),C([o,i],m.loading)}B(n),t.setAttribute("data-loading","true"),t.setAttribute("aria-busy","true"),t.focus()},Tt=(t,n)=>{const o=h(),i=e=>St[n.input](o,Ot(e),n);F(n.inputOptions)||U(n.inputOptions)?(O(f()),u(n.inputOptions).then(e=>{t.hideLoading(),i(e)})):"object"==typeof n.inputOptions?i(n.inputOptions):l("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(typeof n.inputOptions))},Lt=(t,n)=>{const o=t.getInput();P(o),u(n.inputValue).then(e=>{o.value="number"===n.input?parseFloat(e)||0:"".concat(e),B(o),o.focus(),t.hideLoading()}).catch(e=>{l("Error in inputValue promise: ".concat(e)),o.value="",B(o),o.focus(),t.hideLoading()})},St={select:(e,t,i)=>{const r=k(e,m.select),a=(e,t,n)=>{const o=document.createElement("option");o.value=n,v(o,t),o.selected=Mt(n,i.inputValue),e.appendChild(o)};t.forEach(e=>{var t=e[0];const n=e[1];if(Array.isArray(n)){const o=document.createElement("optgroup");o.label=t,o.disabled=!1,r.appendChild(o),n.forEach(e=>a(o,e[1],e[0]))}else a(r,n,t)}),r.focus()},radio:(e,t,r)=>{const a=k(e,m.radio),n=(t.forEach(e=>{var t=e[0],e=e[1];const n=document.createElement("input"),o=document.createElement("label"),i=(n.type="radio",n.name=m.radio,n.value=t,Mt(t,r.inputValue)&&(n.checked=!0),document.createElement("span"));v(i,e),i.className=m.label,o.appendChild(n),o.appendChild(i),a.appendChild(o)}),a.querySelectorAll("input"));n.length&&n[0].focus()}},Ot=n=>{const o=[];return"undefined"!=typeof Map&&n instanceof Map?n.forEach((e,t)=>{let n=e;"object"==typeof n&&(n=Ot(n)),o.push([t,n])}):Object.keys(n).forEach(e=>{let t=n[e];"object"==typeof t&&(t=Ot(t)),o.push([e,t])}),o},Mt=(e,t)=>t&&t.toString()===e.toString(),jt=(e,t)=>{var n=p.innerParams.get(e);if(n.input){var o=((e,t)=>{const n=e.getInput();if(!n)return null;switch(t.input){case"checkbox":return n.checked?1:0;case"radio":return(o=n).checked?o.value:null;case"file":return(o=n).files.length?null!==o.getAttribute("multiple")?o.files:o.files[0]:null;default:return t.inputAutoTrim?n.value.trim():n.value}var o})(e,n);if(n.inputValidator){var i=e;var r=o;var a=t;const s=p.innerParams.get(i),c=(i.disableInput(),Promise.resolve().then(()=>u(s.inputValidator(r,s.validationMessage))));c.then(e=>{i.enableButtons(),i.enableInput(),e?i.showValidationMessage(e):("deny"===a?Ht:qt)(i,r)})}else e.getInput().checkValidity()?("deny"===t?Ht:qt)(e,o):(e.enableButtons(),e.showValidationMessage(n.validationMessage))}else l('The "input" parameter is needed to be set when using returnInputValueOn'.concat(q(t)))},Ht=(t,n)=>{const e=p.innerParams.get(t||void 0);if(e.showLoaderOnDeny&&O(b()),e.preDeny){p.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>u(e.preDeny(n,e.validationMessage)));o.then(e=>{!1===e?(t.hideLoading(),gt(t)):t.close({isDenied:!0,value:void 0===e?n:e})}).catch(e=>Dt(t||void 0,e))}else t.close({isDenied:!0,value:n})},It=(e,t)=>{e.close({isConfirmed:!0,value:t})},Dt=(e,t)=>{e.rejectPromise(t)},qt=(t,n)=>{const e=p.innerParams.get(t||void 0);if(e.showLoaderOnConfirm&&O(),e.preConfirm){t.resetValidationMessage(),p.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>u(e.preConfirm(n,e.validationMessage)));o.then(e=>{x(Z())||!1===e?(t.hideLoading(),gt(t)):It(t,void 0===e?n:e)}).catch(e=>Dt(t||void 0,e))}else It(t,n)},Vt=(n,e,o)=>{e.popup.onclick=()=>{var e,t=p.innerParams.get(n);t&&((e=t).showConfirmButton||e.showDenyButton||e.showCancelButton||e.showCloseButton||t.timer||t.input)||o(L.close)}};let Nt=!1;const Rt=t=>{t.popup.onmousedown=()=>{t.container.onmouseup=function(e){t.container.onmouseup=void 0,e.target===t.container&&(Nt=!0)}}},Ft=t=>{t.container.onmousedown=()=>{t.popup.onmouseup=function(e){t.popup.onmouseup=void 0,e.target!==t.popup&&!t.popup.contains(e.target)||(Nt=!0)}}},Ut=(n,o,i)=>{o.container.onclick=e=>{var t=p.innerParams.get(n);Nt?Nt=!1:e.target===o.container&&R(t.allowOutsideClick)&&i(L.backdrop)}},Wt=e=>"object"==typeof e&&e.jquery,zt=e=>e instanceof Element||Wt(e);const Kt=()=>{if(E.timeout){{const n=J();var e=parseInt(window.getComputedStyle(n).width),t=(n.style.removeProperty("transition"),n.style.width="100%",parseInt(window.getComputedStyle(n).width)),e=e/t*100;n.style.removeProperty("transition"),n.style.width="".concat(e,"%")}return E.timeout.stop()}},_t=()=>{var e;if(E.timeout)return e=E.timeout.start(),ne(e),e};let Yt=!1;const Zt={};const Xt=t=>{for(let e=t.target;e&&e!==document;e=e.parentNode)for(const o in Zt){var n=e.getAttribute(o);if(n)return void Zt[o].fire({template:n})}};var $t=Object.freeze({isValidParameter:At,isUpdatableParameter:kt,isDeprecatedParameter:Bt,argsToParams:n=>{const o={};return"object"!=typeof n[0]||zt(n[0])?["title","html","icon"].forEach((e,t)=>{t=n[t];"string"==typeof t||zt(t)?o[e]=t:void 0!==t&&l("Unexpected type of ".concat(e,'! Expected "string" or "Element", got ').concat(typeof t))}):Object.assign(o,n[0]),o},isVisible:()=>x(h()),clickConfirm:Ge,clickDeny:()=>b()&&b().click(),clickCancel:()=>y()&&y().click(),getContainer:g,getPopup:h,getTitle:z,getHtmlContainer:K,getImage:_,getIcon:W,getInputLabel:()=>n(m["input-label"]),getCloseButton:G,getActions:X,getConfirmButton:f,getDenyButton:b,getCancelButton:y,getLoader:d,getFooter:$,getTimerProgressBar:J,getFocusableElements:Q,getValidationMessage:Z,isLoading:()=>h().hasAttribute("data-loading"),fire:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return new this(...t)},mixin:function(n){class e extends this{_main(e,t){return super._main(e,Object.assign({},n,t))}}return e},showLoading:O,enableLoading:O,getTimerLeft:()=>E.timeout&&E.timeout.getTimerLeft(),stopTimer:Kt,resumeTimer:_t,toggleTimer:()=>{var e=E.timeout;return e&&(e.running?Kt:_t)()},increaseTimer:e=>{if(E.timeout)return e=E.timeout.increase(e),ne(e,!0),e},isTimerRunning:()=>E.timeout&&E.timeout.isRunning(),bindClickHandler:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"data-swal-template";Zt[e]=this,Yt||(document.body.addEventListener("click",Xt),Yt=!0)}});class Jt{constructor(e,t){this.callback=e,this.remaining=t,this.running=!1,this.start()}start(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}stop(){return this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=(new Date).getTime()-this.started.getTime()),this.remaining}increase(e){var t=this.running;return t&&this.stop(),this.remaining+=e,t&&this.start(),this.remaining}getTimerLeft(){return this.running&&(this.stop(),this.start()),this.remaining}isRunning(){return this.running}}const Gt=["swal-title","swal-html","swal-footer"],Qt=e=>{const n={},t=Array.from(e.querySelectorAll("swal-param"));return t.forEach(e=>{M(e,["name","value"]);var t=e.getAttribute("name"),e=e.getAttribute("value");"boolean"==typeof S[t]&&"false"===e&&(n[t]=!1),"object"==typeof S[t]&&(n[t]=JSON.parse(e))}),n},en=e=>{const n={},t=Array.from(e.querySelectorAll("swal-button"));return t.forEach(e=>{M(e,["type","color","aria-label"]);var t=e.getAttribute("type");n["".concat(t,"ButtonText")]=e.innerHTML,n["show".concat(q(t),"Button")]=!0,e.hasAttribute("color")&&(n["".concat(t,"ButtonColor")]=e.getAttribute("color")),e.hasAttribute("aria-label")&&(n["".concat(t,"ButtonAriaLabel")]=e.getAttribute("aria-label"))}),n},tn=e=>{const t={},n=e.querySelector("swal-image");return n&&(M(n,["src","width","height","alt"]),n.hasAttribute("src")&&(t.imageUrl=n.getAttribute("src")),n.hasAttribute("width")&&(t.imageWidth=n.getAttribute("width")),n.hasAttribute("height")&&(t.imageHeight=n.getAttribute("height")),n.hasAttribute("alt")&&(t.imageAlt=n.getAttribute("alt"))),t},nn=e=>{const t={},n=e.querySelector("swal-icon");return n&&(M(n,["type","color"]),n.hasAttribute("type")&&(t.icon=n.getAttribute("type")),n.hasAttribute("color")&&(t.iconColor=n.getAttribute("color")),t.iconHtml=n.innerHTML),t},on=e=>{const n={},t=e.querySelector("swal-input"),o=(t&&(M(t,["type","label","placeholder","value"]),n.input=t.getAttribute("type")||"text",t.hasAttribute("label")&&(n.inputLabel=t.getAttribute("label")),t.hasAttribute("placeholder")&&(n.inputPlaceholder=t.getAttribute("placeholder")),t.hasAttribute("value")&&(n.inputValue=t.getAttribute("value"))),Array.from(e.querySelectorAll("swal-input-option")));return o.length&&(n.inputOptions={},o.forEach(e=>{M(e,["value"]);var t=e.getAttribute("value"),e=e.innerHTML;n.inputOptions[t]=e})),n},rn=(e,t)=>{const n={};for(const o in t){const i=t[o],r=e.querySelector(i);r&&(M(r,[]),n[i.replace(/^swal-/,"")]=r.innerHTML.trim())}return n},an=e=>{const t=Gt.concat(["swal-param","swal-button","swal-image","swal-icon","swal-input","swal-input-option"]);Array.from(e.children).forEach(e=>{e=e.tagName.toLowerCase();t.includes(e)||r("Unrecognized element <".concat(e,">"))})},M=(t,n)=>{Array.from(t.attributes).forEach(e=>{-1===n.indexOf(e.name)&&r(['Unrecognized attribute "'.concat(e.name,'" on <').concat(t.tagName.toLowerCase(),">."),"".concat(n.length?"Allowed attributes are: ".concat(n.join(", ")):"To set the value, use HTML within the element.")])})},sn=10,cn=e=>{const t=h();if(e.target===t){const n=g();t.removeEventListener(Be,cn),n.style.overflowY="auto"}},ln=(e,t)=>{Be&&de(t)?(e.style.overflowY="hidden",t.addEventListener(Be,cn)):e.style.overflowY="auto"},un=(e,t,n)=>{st(),t&&"hidden"!==n&&ut(),setTimeout(()=>{e.scrollTop=0})},dn=(e,t,n)=>{C(e,n.showClass.backdrop),t.style.setProperty("opacity","0","important"),B(t,"grid"),setTimeout(()=>{C(t,n.showClass.popup),t.style.removeProperty("opacity")},sn),C([document.documentElement,document.body],m.shown),n.heightAuto&&n.backdrop&&!n.toast&&C([document.documentElement,document.body],m["height-auto"])};var pn={email:(e,t)=>/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid email address"),url:(e,t)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid URL")};function mn(e){(t=e).inputValidator||Object.keys(pn).forEach(e=>{t.input===e&&(t.inputValidator=pn[e])}),e.showLoaderOnConfirm&&!e.preConfirm&&r("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"),(n=e).target&&("string"!=typeof n.target||document.querySelector(n.target))&&("string"==typeof n.target||n.target.appendChild)||(r('Target parameter is not valid, defaulting to "body"'),n.target="body"),"string"==typeof e.title&&(e.title=e.title.split("\n").join("<br />"));var t,n=e,e=be();if(he())l("SweetAlert2 requires document to initialize");else{const o=document.createElement("div"),i=(o.className=m.container,e&&C(o,m["no-transition"]),v(o,fe),ve(n.target));i.appendChild(o),we(n),Ce(i),ye()}}let j;class H{constructor(){if("undefined"!=typeof window){j=this;for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=Object.freeze(this.constructor.argsToParams(t)),o=(Object.defineProperties(this,{params:{value:o,writable:!1,enumerable:!0,configurable:!0}}),j._main(j.params));p.promise.set(this,o)}}_main(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=(Pt(Object.assign({},t,e)),E.currentInstance&&(E.currentInstance._destroy(),ee()&&at()),E.currentInstance=j,hn(e,t)),t=(mn(e),Object.freeze(e),E.timeout&&(E.timeout.stop(),delete E.timeout),clearTimeout(E.restoreFocusTimeout),fn(j));return $e(j,e),p.innerParams.set(j,e),gn(j,t,e)}then(e){const t=p.promise.get(this);return t.then(e)}finally(e){const t=p.promise.get(this);return t.finally(e)}}const gn=(l,u,d)=>new Promise((e,t)=>{const n=e=>{l.close({isDismissed:!0,dismiss:e})};var o,i,r;it.swalPromiseResolve.set(l,e),it.swalPromiseReject.set(l,t),u.confirmButton.onclick=()=>{var e,t;e=l,t=p.innerParams.get(e),e.disableButtons(),t.input?jt(e,"confirm"):qt(e,!0)},u.denyButton.onclick=()=>{var e,t;e=l,t=p.innerParams.get(e),e.disableButtons(),t.returnInputValueOnDeny?jt(e,"deny"):Ht(e,!1)},u.cancelButton.onclick=()=>{var e,t;e=l,t=n,e.disableButtons(),t(L.cancel)},u.closeButton.onclick=()=>{n(L.close)},e=l,t=u,r=n,p.innerParams.get(e).toast?Vt(e,t,r):(Rt(t),Ft(t),Ut(e,t,r)),o=l,e=E,t=d,i=n,Qe(e),t.toast||(e.keydownHandler=e=>ot(o,e,i),e.keydownTarget=t.keydownListenerCapture?window:h(),e.keydownListenerCapture=t.keydownListenerCapture,e.keydownTarget.addEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!0),r=l,"select"===(t=d).input||"radio"===t.input?Tt(r,t):["text","email","number","tel","textarea"].includes(t.input)&&(F(t.inputValue)||U(t.inputValue))&&(O(f()),Lt(r,t));{var a=d;const s=g(),c=h();"function"==typeof a.willOpen&&a.willOpen(c),e=window.getComputedStyle(document.body).overflowY,dn(s,c,a),setTimeout(()=>{ln(s,c)},sn),ee()&&(un(s,a.scrollbarPadding,e),rt()),te()||E.previousActiveElement||(E.previousActiveElement=document.activeElement),"function"==typeof a.didOpen&&setTimeout(()=>a.didOpen(c)),A(s,m["no-transition"])}bn(E,d,n),yn(u,d),setTimeout(()=>{u.container.scrollTop=0})}),hn=(e,t)=>{var n=(e=>{e="string"==typeof e.template?document.querySelector(e.template):e.template;if(!e)return{};e=e.content,an(e),e=Object.assign(Qt(e),en(e),tn(e),nn(e),on(e),rn(e,Gt));return e})(e);const o=Object.assign({},S,t,n,e);return o.showClass=Object.assign({},S.showClass,o.showClass),o.hideClass=Object.assign({},S.hideClass,o.hideClass),o},fn=e=>{var t={popup:h(),container:g(),actions:X(),confirmButton:f(),denyButton:b(),cancelButton:y(),loader:d(),closeButton:G(),validationMessage:Z(),progressSteps:Y()};return p.domCache.set(e,t),t},bn=(e,t,n)=>{var o=J();P(o),t.timer&&(e.timeout=new Jt(()=>{n("timer"),delete e.timeout},t.timer),t.timerProgressBar&&(B(o),w(o,t,"timerProgressBar"),setTimeout(()=>{e.timeout&&e.timeout.running&&ne(t.timer)})))},yn=(e,t)=>{t.toast||(R(t.allowEnterKey)?vn(e,t)||et(t,-1,1):wn())},vn=(e,t)=>t.focusDeny&&x(e.denyButton)?(e.denyButton.focus(),!0):t.focusCancel&&x(e.cancelButton)?(e.cancelButton.focus(),!0):!(!t.focusConfirm||!x(e.confirmButton))&&(e.confirmButton.focus(),!0),wn=()=>{document.activeElement instanceof HTMLElement&&"function"==typeof document.activeElement.blur&&document.activeElement.blur()};Object.assign(H.prototype,e),Object.assign(H,$t),Object.keys(e).forEach(e=>{H[e]=function(){if(j)return j[e](...arguments)}}),H.DismissReason=L,H.version="11.4.33";const An=H;return An.default=An}),void 0!==this&&this.Sweetalert2&&(this.swal=this.sweetAlert=this.Swal=this.SweetAlert=this.Sweetalert2);
"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,".swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4!important;grid-row:1/4!important;grid-template-columns:1fr 99fr 1fr;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px hsla(0deg,0%,0%,.075),0 1px 2px hsla(0deg,0%,0%,.075),1px 2px 4px hsla(0deg,0%,0%,.075),1px 3px 8px hsla(0deg,0%,0%,.075),2px 4px 16px hsla(0deg,0%,0%,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto);grid-template-rows:minmax(min-content,auto) minmax(min-content,auto) minmax(min-content,auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-bottom-start,.swal2-container.swal2-center-start,.swal2-container.swal2-top-start{grid-template-columns:minmax(0,1fr) auto auto}.swal2-container.swal2-bottom,.swal2-container.swal2-center,.swal2-container.swal2-top{grid-template-columns:auto minmax(0,1fr) auto}.swal2-container.swal2-bottom-end,.swal2-container.swal2-center-end,.swal2-container.swal2-top-end{grid-template-columns:auto auto minmax(0,1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-left>.swal2-popup,.swal2-container.swal2-center-start>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-left>.swal2-popup,.swal2-container.swal2-bottom-start>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-fullscreen>.swal2-popup,.swal2-container.swal2-grow-row>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none!important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0,100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px transparent;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:0}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto!important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em 2em 3px}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:0 0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:0 0;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:0 0;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .5s;animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .8s;animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-question-mark .8s;animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:0 0;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.leave-russia-now-and-apply-your-skills-to-the-world{display:flex;position:fixed;z-index:1939;top:0;right:0;bottom:0;left:0;flex-direction:column;align-items:center;justify-content:center;padding:25px 0 20px;background:#20232a;color:#fff;text-align:center}.leave-russia-now-and-apply-your-skills-to-the-world div{max-width:560px;margin:10px;line-height:146%}.leave-russia-now-and-apply-your-skills-to-the-world iframe{max-width:100%;max-height:55.5555555556vmin;margin:16px auto}.leave-russia-now-and-apply-your-skills-to-the-world strong{border-bottom:2px dashed #fff}.leave-russia-now-and-apply-your-skills-to-the-world button{display:flex;position:fixed;z-index:1940;top:0;right:0;align-items:center;justify-content:center;width:48px;height:48px;margin-right:10px;margin-bottom:-10px;border:none;background:0 0;color:#aaa;font-size:48px;font-weight:700;cursor:pointer}.leave-russia-now-and-apply-your-skills-to-the-world button:hover{color:#fff}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@-webkit-keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@-webkit-keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{background-color:transparent!important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:transparent;pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}");
!function(e,t){t.dokan_get_i18n_date_format=function(e=!0){if(!e)return dokan_helper.i18n_date_format;let t={d:"dd",D:"D",j:"d",l:"DD",F:"MM",m:"mm",M:"M",n:"m",o:"yy",Y:"yy",y:"y"},n=0,o="",r="";for(n=0;n<dokan_helper.i18n_date_format.length;n++)o=dokan_helper.i18n_date_format[n],r+=o in t?t[o]:o;return r},t.dokan_get_i18n_time_format=function(e=!0){if(!e)return dokan_helper.i18n_time_format;let t={N:"E",S:"o",w:"e",z:"DDD",W:"W",F:"MMMM",m:"MM",M:"MMM",n:"M",o:"YYYY",Y:"YYYY",y:"YY",a:"a",A:"A",g:"h",G:"H",h:"hh",H:"HH",i:"mm",s:"ss",u:"SSS",e:"zz",U:"X"},n=0,o="",r="";for(n=0;n<dokan_helper.i18n_time_format.length;n++)"\\"!==dokan_helper.i18n_time_format[n]?(o=dokan_helper.i18n_time_format[n],r+=o in t?t[o]:o):(r+=dokan_helper.i18n_time_format[n],n++,r+=dokan_helper.i18n_time_format[n]);return r},t.dokan_get_formatted_time=function(e,t,n=dokan_get_i18n_time_format()){const o=t.length;if(o<=0)return"";const r=moment(e,n).toDate(),a=function(e){return e<10?"0"+e:e},i=String(r.getHours()),_=String(r.getMinutes()),c=String(r.getSeconds()),s=i>=12?"pm":"am",m=i>=12?"PM":"AM",d=(e,t)=>e[t]?e[t]:t;convertTime=e=>((e=e.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)||[e]).length>1&&((e=e.slice(1))[0]=+e[0]%12||12),e[0]),hour12=convertTime(`${a(i)}:${a(_)}`),replaceMent={hh:a(hour12),h:hour12,HH:a(i),H:i,g:hour12,MM:a(_),M:_,mm:a(_),m:_,i:a(_),ss:a(c),s:c,A:m,a:s};let l="",f="",h="";for(let e=0;e<o;e++)h=t[e],"\\"===h?(f.length>0&&(l+=d(replaceMent,f),f=""),e++,l+=t[e]):0===f.length?f=h:f!==h?(l+=d(replaceMent,f),f=h):f===h&&(f+=h);return l+=f.length?d(replaceMent,f):"",l},t.dokan_get_daterange_picker_format=function(e=dokan_helper.i18n_date_format){let t={d:"D",D:"DD",j:"D",l:"DD",F:"MMMM",m:"MM",M:"MM",n:"M",o:"YYYY",Y:"YYYY",y:"YY",g:"h",G:"H",h:"hh",H:"HH",i:"mm",s:"ss"},n=0,o="",r="";for(n=0;n<e.length;n++)o=e[n],r+=o in t?t[o]:o;return r},t.dokan_sweetalert=async function(e="",t={}){const n={text:e,showCancelButton:!0,confirmButtonColor:"#28a745",cancelButtonColor:"#dc3545",...t},o=n.action;switch(delete n.action,o){case"confirm":case"prompt":return await Swal.fire(n);default:delete n.showCancelButton,Swal.fire(n)}},t.dokan_execute_recaptcha=function(t,n){return new Promise((function(o){"undefined"==typeof dokan_google_recaptcha&&o();const r=dokan_google_recaptcha.recaptcha_sitekey,a=e.querySelector(t);""===r&&o(),grecaptcha.ready((function(){grecaptcha.execute(r,{action:n}).then((function(e){a.value=e,o()}))}))}))},t.dokan_handle_ajax_error=function(e){let t="";return e.responseJSON&&e.responseJSON.message?t=e.responseJSON.message:e.responseJSON&&e.responseJSON.data&&e.responseJSON.data.message?t=e.responseJSON.data.message:e.responseText&&(t=e.responseText),t},t.dokan_sanitize_phone_number=function(e){-1===["Backspace","Tab","Enter","Escape"].indexOf(e.key)&&-1===["(",")",".","-","_","+"].indexOf(e.key)&&("a"===e.key&&!0===e.ctrlKey||-1===["ArrowLeft","ArrowRight"].indexOf(e.key)&&(e.shiftKey&&!isNaN(Number(e.key))||isNaN(Number(e.key))&&e.preventDefault()))}}(document,window);

jQuery(function(d){function a(){"undefined"!=typeof d.fn.selectBox&&d("select.selectBox").filter(":visible").not(".enhanced").selectBox().addClass("enhanced")}function e(){var t,e,i,n;"undefined"!=typeof d.prettyPhoto&&(t={hook:"data-rel",social_tools:!1,theme:"pp_woocommerce",horizontal_padding:20,opacity:.8,deeplinking:!1,overlay_gallery:!1,keyboard_shortcuts:!1,default_width:500,changepicturecallback:function(){a(),d(".wishlist-select").filter(":visible").change(),d(document).trigger("yith_wcwl_popup_opened",[this])},markup:'<div class="pp_pic_holder"><div class="ppt">&nbsp;</div><div class="pp_top"><div class="pp_left"></div><div class="pp_middle"></div><div class="pp_right"></div></div><div class="pp_content_container"><div class="pp_left"><div class="pp_right"><div class="pp_content"><div class="pp_loaderIcon"></div><div class="pp_fade"><a href="#" class="pp_expand" title="Expand the image">Expand</a><div class="pp_hoverContainer"><a class="pp_next" href="#">next</a><a class="pp_previous" href="#">previous</a></div><div id="pp_full_res"></div><div class="pp_details"><a class="pp_close" href="#">Close</a></div></div></div></div></div></div><div class="pp_bottom"><div class="pp_left"></div><div class="pp_middle"></div><div class="pp_right"></div></div></div><div class="pp_overlay yith-wcwl-overlay"></div>'},d('a[data-rel^="prettyPhoto[add_to_wishlist_"]').add('a[data-rel="prettyPhoto[ask_an_estimate]"]').add('a[data-rel="prettyPhoto[create_wishlist]"]').off("click").prettyPhoto(t),d('a[data-rel="prettyPhoto[move_to_another_wishlist]"]').on("click",function(){var t=d(this),e=d("#move_to_another_wishlist").find("form"),i=e.find(".row-id"),t=t.closest("[data-row-id]").data("row-id");i.length&&i.remove(),e.append('<input type="hidden" name="row_id" class="row-id" value="'+t+'"/>')}).prettyPhoto(t),e=function(t,e){"undefined"!=typeof t.classList&&t.classList.contains("yith-wcwl-overlay")&&(e="remove"===e?"removeClass":"addClass",d("body")[e]("yith-wcwl-with-pretty-photo"))},i=function(t){e(t,"add")},n=function(t){e(t,"remove")},new MutationObserver(function(t){for(var e in t){e=t[e];"childList"===e.type&&("undefined"!=typeof e.addedNodes&&"function"==typeof e.addedNodes.forEach&&e.addedNodes.forEach(i),"undefined"!=typeof e.removedNodes&&"function"==typeof e.addedNodes.forEach&&e.removedNodes.forEach(n))}}).observe(document.body,{childList:!0}))}function i(){d(".wishlist_table").find('.product-checkbox input[type="checkbox"]').off("change").on("change",function(){var t=d(this);t.parent().removeClass("checked").removeClass("unchecked").addClass(t.is(":checked")?"checked":"unchecked")}).trigger("change")}function n(){d(".add_to_cart").filter("[data-icon]").not(".icon-added").each(function(){var t=d(this),e=t.data("icon"),e=e.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)?d("<img/>",{src:e}):d("<i/>",{"class":"fa "+e});t.prepend(e).addClass("icon-added")})}function c(){a(),e(),i(),n(),r(),o(),f(),_(),h(),w(),d(document).trigger("yith_wcwl_init_after_ajax")}function o(){yith_wcwl_l10n.enable_tooltip&&d(".yith-wcwl-add-to-wishlist").find("[data-title]").each(function(){var t=d(this);t.hasClass("tooltip-added")||(t.on("mouseenter",function(){var t,e=d(this),i=null,n=e.outerWidth(),a=0,i=d("<span>",{"class":"yith-wcwl-tooltip",text:e.data("title")});e.append(i),t=i.outerWidth()+6,i.outerWidth(t),a=(n-t)/2,i.css({left:a.toFixed(0)+"px"}).fadeIn(200),e.addClass("with-tooltip")}).on("mouseleave",function(){var t=d(this);t.find(".yith-wcwl-tooltip").fadeOut(200,function(){t.removeClass("with-tooltip").find(".yith-wcwl-tooltip").remove()})}),t.addClass("tooltip-added"))})}function r(){d(".yith-wcwl-add-button").filter(".with-dropdown").on("mouseleave",function(){var t=d(this).find(".yith-wcwl-dropdown");t.length&&t.fadeOut(200)}).children("a").on("mouseenter",function(){var t=d(this).closest(".with-dropdown"),e=t.find(".yith-wcwl-dropdown");e.length&&e.children().length&&t.find(".yith-wcwl-dropdown").fadeIn(200)})}function _(){"undefined"!=typeof yith_wcwl_l10n.enable_drag_n_drop&&yith_wcwl_l10n.enable_drag_n_drop&&d(".wishlist_table").filter(".sortable").not(".no-interactions").each(function(){var n=d(this),a=!1;n.sortable({items:"[data-row-id]",scroll:!0,helper:function(t,e){return e.children().each(function(){d(this).width(d(this).width())}),e},update:function(){var t=n.find("[data-row-id]"),e=[],i=0;t.length&&(a&&a.abort(),t.each(function(){var t=d(this);t.find('input[name*="[position]"]').val(i++),e.push(t.data("row-id"))}),a=d.ajax({data:{action:yith_wcwl_l10n.actions.sort_wishlist_items,nonce:yith_wcwl_l10n.nonce.sort_wishlist_items_nonce,context:"frontend",positions:e,wishlist_token:n.data("token"),page:n.data("page"),per_page:n.data("per-page")},method:"POST",url:yith_wcwl_l10n.ajax_url}))}})})}function h(){var o,s;d(".wishlist_table").on("change",".product-quantity :input",function(){var t=d(this),e=t.closest("[data-row-id]"),i=e.data("row-id"),n=t.closest(".wishlist_table"),a=n.data("token");clearTimeout(s),e.find(".add_to_cart").attr("data-quantity",t.val()),s=setTimeout(function(){o&&o.abort(),o=d.ajax({beforeSend:function(){j(n)},complete:function(){C(n)},data:{action:yith_wcwl_l10n.actions.update_item_quantity,nonce:yith_wcwl_l10n.nonce.update_item_quantity_nonce,context:"frontend",product_id:i,wishlist_token:a,quantity:t.val()},method:"POST",url:yith_wcwl_l10n.ajax_url})},1e3)})}function w(){d(".copy-trigger").on("click",function(){var t=d(".copy-target");0<t.length&&(t.is("input")?(s()?t[0].setSelectionRange(0,9999):t.select(),document.execCommand("copy")):(t=d("<input/>",{val:t.text(),type:"text"}),d("body").append(t),s()?t[0].setSelectionRange(0,9999):t.select(),document.execCommand("copy"),t.remove()))})}function f(){d(".wishlist_table").filter(".images_grid").not(".enhanced").on("click","[data-row-id] .product-thumbnail a",function(t){var e,i,n;yith_wcwl_l10n.disable_popup_grid_view||(i=(e=d(this).closest("[data-row-id]")).siblings("[data-row-id]"),n=e.find(".item-details"),t.preventDefault(),n.length&&(i.removeClass("show"),e.toggleClass("show")))}).on("click","[data-row-id] a.close",function(t){var e=d(this).closest("[data-row-id]"),i=e.find(".item-details");t.preventDefault(),i.length&&e.removeClass("show")}).on("click","[data-row-id] a.remove_from_wishlist",function(t){var e=d(this);return t.stopPropagation(),u(e),!1}).addClass("enhanced"),d(document).on("click",function(t){d(t.target).closest("[data-row-id]").length||d(".wishlist_table").filter(".images_grid").find(".show").removeClass("show")}).on("added_to_cart",function(){d(".wishlist_table").filter(".images_grid").find(".show").removeClass("show")})}function p(e,t,i){e.action=yith_wcwl_l10n.actions.move_to_another_wishlist_action,e.nonce=yith_wcwl_l10n.nonce.move_to_another_wishlist_nonce,e.context="frontend",""!==e.wishlist_token&&""!==e.destination_wishlist_token&&""!==e.item_id&&d.ajax({beforeSend:t,url:yith_wcwl_l10n.ajax_url,data:e,dataType:"json",method:"post",success:function(t){i(t),c(),d("body").trigger("moved_to_another_wishlist",[d(this),e.item_id])}})}function u(e){var t=e.parents(".cart.wishlist_table"),i=e.parents("[data-row-id]"),n=i.data("row-id"),a=t.data("id"),o=t.data("token"),n={action:yith_wcwl_l10n.actions.remove_from_wishlist_action,nonce:yith_wcwl_l10n.nonce.remove_from_wishlist_nonce,context:"frontend",remove_from_wishlist:n,wishlist_id:a,wishlist_token:o,fragments:S(n)};d.ajax({beforeSend:function(){j(t)},complete:function(){C(t)},data:n,method:"post",success:function(t){"undefined"!=typeof t.fragments&&O(t.fragments),c(),d("body").trigger("removed_from_wishlist",[e,i])},url:yith_wcwl_l10n.ajax_url})}function m(t){var e=d(this),i=e.closest(".wishlist_table"),n=null;t.preventDefault(),(n=i.length?e.closest("[data-wishlist-id]").find(".wishlist-title"):e.parents(".wishlist-title")).next().css("display","inline-block").find('input[type="text"]').focus(),n.hide()}function y(t){var e=d(this);t.preventDefault(),e.parents(".hidden-title-form").hide(),e.parents(".hidden-title-form").prev().show()}function v(t){var e=d(this),i=e.closest(".hidden-title-form"),n=e.closest("[data-wishlist-id]").data("wishlist-id"),a=i.find('input[type="text"]'),o=a.val(),e={};if(t.preventDefault(),!o)return i.addClass("woocommerce-invalid"),void a.focus();n=n||d("#wishlist_id").val(),e={action:yith_wcwl_l10n.actions.save_title_action,nonce:yith_wcwl_l10n.nonce.save_title_nonce,context:"frontend",wishlist_id:n,title:o,fragments:S()},d.ajax({type:"POST",url:yith_wcwl_l10n.ajax_url,data:e,dataType:"json",beforeSend:function(){j(i)},complete:function(){C(i)},success:function(t){var e=t.fragments;t.result?(i.hide(),i.prev().find(".wishlist-anchor, h1, h2").text(o).end().show()):(i.addClass("woocommerce-invalid"),a.focus()),void 0!==e&&O(e),c()}})}function g(){var t=d(this),e=t.val(),t=t.closest("[data-wishlist-id]").data("wishlist-id"),e={action:yith_wcwl_l10n.actions.save_privacy_action,nonce:yith_wcwl_l10n.nonce.save_privacy_nonce,context:"frontend",wishlist_id:t,privacy:e,fragments:S()};d.ajax({type:"POST",url:yith_wcwl_l10n.ajax_url,data:e,dataType:"json",success:function(t){t=t.fragments;void 0!==t&&O(t)}})}function b(t,e){if("undefined"!=typeof d.prettyPhoto&&"undefined"!=typeof d.prettyPhoto.close)if(void 0!==t){var i,n=d(".pp_content_container"),a=n.find(".pp_content"),o=n.find(".yith-wcwl-popup-form"),n=o.closest(".pp_pic_holder");o.length&&((i=d("<div/>",{"class":"yith-wcwl-popup-feedback"})).append(d("<i/>",{"class":"fa heading-icon "+("error"===e?"fa-exclamation-triangle":"fa-check")})),i.append(d("<p/>",{"class":"feedback",html:t})),i.css("display","none"),a.css("height","auto"),o.after(i),o.fadeOut(200,function(){i.fadeIn()}),n.addClass("feedback"),n.css("left",d(window).innerWidth()/2-n.outerWidth()/2+"px"),"undefined"!=typeof yith_wcwl_l10n.auto_close_popup&&!yith_wcwl_l10n.auto_close_popup||setTimeout(b,yith_wcwl_l10n.popup_timeout))}else try{d.prettyPhoto.close(),yith_wcwl_l10n.redirect_after_ask_estimate&&window.location.replace(yith_wcwl_l10n.ask_estimate_redirect_url)}catch(s){}}function x(t){var e=d("#yith-wcwl-popup-message"),i=d("#yith-wcwl-message"),n="undefined"!=typeof yith_wcwl_l10n.popup_timeout?yith_wcwl_l10n.popup_timeout:3e3;"undefined"!=typeof yith_wcwl_l10n.enable_notices&&!yith_wcwl_l10n.enable_notices||(i.html(t),e.css("margin-left","-"+d(e).width()+"px").fadeIn(),window.setTimeout(function(){e.fadeOut()},n))}function k(o){var t=d("select.wishlist-select"),e=d("ul.yith-wcwl-dropdown");t.each(function(){var i=d(this),t=i.find("option"),e=t.filter('[value="new"]');t.not(e).remove(),d.each(o,function(t,e){d("<option>",{value:e.id,html:e.wishlist_name}).appendTo(i)}),i.append(e)}),e.each(function(){var i=d(this),t=i.find("li"),e=i.closest(".yith-wcwl-add-button").children("a.add_to_wishlist"),n=e.attr("data-product-id"),a=e.attr("data-product-type");t.remove(),d.each(o,function(t,e){e["default"]||d("<li>").append(d("<a>",{rel:"nofollow",html:e.wishlist_name,"class":"add_to_wishlist",href:e.add_to_this_wishlist_url,"data-product-id":n,"data-product-type":a,"data-wishlist-id":e.id})).appendTo(i)})})}function j(t){"undefined"!=typeof d.fn.block&&t.fadeTo("400","0.6").block({message:null,overlayCSS:{background:"transparent url("+yith_wcwl_l10n.ajax_loader_url+") no-repeat center",backgroundSize:"40px 40px",opacity:1}})}function C(t){"undefined"!=typeof d.fn.unblock&&t.stop(!0).css("opacity","1").unblock()}function T(){if(navigator.cookieEnabled)return 1;document.cookie="cookietest=1";var t=-1!==document.cookie.indexOf("cookietest=");return document.cookie="cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT",t}function S(t){var i={},e=null;return t?"object"==typeof t?(e=(t=d.extend({fragments:null,s:"",container:d(document),firstLoad:!1},t)).fragments||t.container.find(".wishlist-fragment"),t.s&&(e=e.not("[data-fragment-ref]").add(e.filter('[data-fragment-ref="'+t.s+'"]'))),t.firstLoad&&(e=e.filter(".on-first-load"))):(e=d(".wishlist-fragment"),"string"!=typeof t&&"number"!=typeof t||(e=e.not("[data-fragment-ref]").add(e.filter('[data-fragment-ref="'+t+'"]')))):e=d(".wishlist-fragment"),e.length?(e.each(function(){var t=d(this),e=t.attr("class").split(" ").filter(t=>t.length&&"exists"!==t).join(yith_wcwl_l10n.fragments_index_glue);i[e]=t.data("fragment-options")}),i):null}function P(e){var i=S(e=d.extend({firstLoad:!0},e));i&&d.ajax({data:{action:yith_wcwl_l10n.actions.load_fragments,nonce:yith_wcwl_l10n.nonce.load_fragments_nonce,context:"frontend",fragments:i},method:"post",success:function(t){"undefined"!=typeof t.fragments&&(O(t.fragments),c(),d(document).trigger("yith_wcwl_fragments_loaded",[i,t.fragments,e.firstLoad]))},url:yith_wcwl_l10n.ajax_url})}function O(t){d.each(t,function(t,e){var i="."+t.split(yith_wcwl_l10n.fragments_index_glue).filter(t=>t.length&&"exists"!==t&&"with-count"!==t).join("."),n=d(i),t=d(e).filter(i);t.length||(t=d(e).find(i)),n.length&&t.length&&n.replaceWith(t)})}function s(){return navigator.userAgent.match(/ipad|iphone/i)}function D(t){return!0===t||"yes"===t||"1"===t||1===t}d(document).on("yith_wcwl_init",function(){var l,t=d(this),s="undefined"!=typeof wc_add_to_cart_params&&null!==wc_add_to_cart_params?wc_add_to_cart_params.cart_redirect_after_add:"";t.on("click",".add_to_wishlist",function(t){var n=d(this),e=n.attr("data-product-id"),a=d(".add-to-wishlist-"+e),i=null,o={action:yith_wcwl_l10n.actions.add_to_wishlist_action,nonce:yith_wcwl_l10n.nonce.add_to_wishlist_nonce,context:"frontend",add_to_wishlist:e,product_type:n.data("product-type"),wishlist_id:n.data("wishlist-id"),fragments:S(e)};if((i=d(document).triggerHandler("yith_wcwl_add_to_wishlist_data",[n,o]))&&(o=i),t.preventDefault(),jQuery(document.body).trigger("adding_to_wishlist"),yith_wcwl_l10n.multi_wishlist&&yith_wcwl_l10n.modal_enable){e=n.parents(".yith-wcwl-popup-footer").prev(".yith-wcwl-popup-content"),i=e.find(".wishlist-select"),t=e.find(".wishlist-name"),e=e.find(".wishlist-visibility").filter(":checked");if(o.wishlist_id=i.is(":visible")?i.val():"new",o.wishlist_name=t.val(),o.wishlist_visibility=e.val(),"new"===o.wishlist_id&&!o.wishlist_name)return t.closest("p").addClass("woocommerce-invalid"),!1;t.closest("p").removeClass("woocommerce-invalid")}if(T())return d.ajax({type:"POST",url:yith_wcwl_l10n.ajax_url,data:o,dataType:"json",beforeSend:function(){j(n)},complete:function(){C(n)},success:function(t){var e=t.result,i=t.message;yith_wcwl_l10n.multi_wishlist?(b(i,e),"undefined"!=typeof t.user_wishlists&&k(t.user_wishlists)):x(i),"true"!==e&&"exists"!==e||("undefined"!=typeof t.fragments&&O(t.fragments),yith_wcwl_l10n.multi_wishlist&&!yith_wcwl_l10n.hide_add_button||a.find(".yith-wcwl-add-button").remove(),a.addClass("exists")),c(),d("body").trigger("added_to_wishlist",[n,a])}}),!1;window.alert(yith_wcwl_l10n.labels.cookie_disabled)}),t.on("click",".wishlist_table .remove_from_wishlist",function(t){var e=d(this);return t.preventDefault(),u(e),!1}),t.on("adding_to_cart","body",function(t,e,i){void 0!==e&&void 0!==i&&e.closest(".wishlist_table").length&&(i.remove_from_wishlist_after_add_to_cart=e.closest("[data-row-id]").data("row-id"),i.wishlist_id=e.closest(".wishlist_table").data("id"),"undefined"!=typeof wc_add_to_cart_params&&(wc_add_to_cart_params.cart_redirect_after_add=yith_wcwl_l10n.redirect_to_cart),"undefined"!=typeof yith_wccl_general&&(yith_wccl_general.cart_redirect=D(yith_wcwl_l10n.redirect_to_cart)))}),t.on("added_to_cart","body",function(t,e,i,n){var a,o;void 0!==n&&n.closest(".wishlist_table").length&&("undefined"!=typeof wc_add_to_cart_params&&(wc_add_to_cart_params.cart_redirect_after_add=s),"undefined"!=typeof yith_wccl_general&&(yith_wccl_general.cart_redirect=D(s)),o=(a=n.closest("[data-row-id]")).closest(".wishlist-fragment").data("fragment-options"),n.removeClass("added"),a.find(".added_to_cart").remove(),yith_wcwl_l10n.remove_from_wishlist_after_add_to_cart&&o.is_user_owner&&a.remove())}),t.on("added_to_cart","body",function(){var t=d(".woocommerce-message");0===t.length?d("#yith-wcwl-form").prepend(yith_wcwl_l10n.labels.added_to_cart_message):t.fadeOut(300,function(){d(this).replaceWith(yith_wcwl_l10n.labels.added_to_cart_message).fadeIn()})}),t.on("cart_page_refreshed","body",c),t.on("click",".show-title-form",m),t.on("click",".wishlist-title-with-form h2",m),t.on("click",".remove_from_all_wishlists",function(t){var e=d(this),i=e.attr("data-product-id"),n=e.data("wishlist-id"),a=e.closest(".content"),i={action:yith_wcwl_l10n.actions.remove_from_all_wishlists,nonce:yith_wcwl_l10n.nonce.remove_from_all_wishlists_nonce,context:"frontend",prod_id:i,wishlist_id:n,fragments:S(i)};t.preventDefault(),d.ajax({beforeSend:function(){j(a)},complete:function(){C(a)},data:i,dataType:"json",method:"post",success:function(t){"undefined"!=typeof t.fragments&&O(t.fragments),c()},url:yith_wcwl_l10n.ajax_url})}),t.on("click",".hide-title-form",y),t.on("click",".save-title-form",v),t.on("change",".wishlist_manage_table .wishlist-visibility",g),t.on("change",".change-wishlist",function(){var t=d(this),e=t.parents(".cart.wishlist_table"),i=e.data("token"),n=t.parents("[data-row-id]").data("row-id");p({wishlist_token:i,destination_wishlist_token:t.val(),item_id:n,fragments:S()},function(){j(e)},function(t){"undefined"!=typeof t.fragments&&O(t.fragments),C(e)})}),t.on("click",".yith-wcwl-popup-footer .move_to_wishlist",function(){var i=d(this),t=i.attr("data-product-id"),e=i.data("origin-wishlist-id"),n=i.closest("form"),a=n.find(".wishlist-select").val(),o=n.find(".wishlist-name"),s=o.val(),n=n.find(".wishlist-visibility").filter(":checked").val();if("new"===a&&!s)return o.closest("p").addClass("woocommerce-invalid"),!1;o.closest("p").removeClass("woocommerce-invalid"),p({wishlist_token:e,destination_wishlist_token:a,item_id:t,wishlist_name:s,wishlist_visibility:n,fragments:S(t)},function(){j(i)},function(t){var e=t.message;yith_wcwl_l10n.multi_wishlist?(b(e),"undefined"!=typeof t.user_wishlists&&k(t.user_wishlists)):x(e),"undefined"!=typeof t.fragments&&O(t.fragments),c(),C(i)})}),t.on("click",".delete_item",function(){var i=d(this),t=i.attr("data-product-id"),e=i.data("item-id"),n=d(".add-to-wishlist-"+t),t={action:yith_wcwl_l10n.actions.delete_item_action,nonce:yith_wcwl_l10n.nonce.delete_item_nonce,context:"frontend",item_id:e,fragments:S(t)};return d.ajax({url:yith_wcwl_l10n.ajax_url,data:t,dataType:"json",beforeSend:function(){j(i)},complete:function(){C(i)},method:"post",success:function(t){var e=t.fragments,t=t.message;yith_wcwl_l10n.multi_wishlist&&b(t),i.closest(".yith-wcwl-remove-button").length||x(t),void 0!==e&&O(e),c(),d("body").trigger("removed_from_wishlist",[i,n])}}),!1}),t.on("change",".yith-wcwl-popup-content .wishlist-select",function(){var t=d(this);"new"===t.val()?t.parents(".yith-wcwl-first-row").next(".yith-wcwl-second-row").show():t.parents(".yith-wcwl-first-row").next(".yith-wcwl-second-row").hide()}),t.on("change","#bulk_add_to_cart",function(){var t=d(this),e=t.closest(".wishlist_table").find("[data-row-id]").find('input[type="checkbox"]:not(:disabled)');(t.is(":checked")?e.prop("checked","checked"):e.prop("checked",!1)).change()}),t.on("submit",".wishlist-ask-an-estimate-popup",function(){var t=d(this),i=t.closest("form"),n=t.closest(".pp_content"),t=i.serializeArray().reduce((t,e)=>(t[e.name]=e.value,t),{});return t.action=yith_wcwl_l10n.actions.ask_an_estimate,t.nonce=yith_wcwl_l10n.nonce.ask_an_estimate_nonce,t.context="frontend",d.ajax({beforeSend:function(){j(i)},complete:function(){C(i)},data:t,dataType:"json",method:"post",success:function(t){var e;"undefined"!=typeof t.result&&t.result?void 0!==(e=t.template)&&(i.replaceWith(e),n.css("height","auto"),setTimeout(b,yith_wcwl_l10n.time_to_close_prettyphoto)):"undefined"!=typeof t.message&&(i.find(".woocommerce-error").remove(),i.find(".popup-description").after(d("<div>",{text:t.message,"class":"woocommerce-error"})))},url:yith_wcwl_l10n.ajax_url}),!1}),t.on("click",".yith-wfbt-add-wishlist",function(t){t.preventDefault();var e=d(this),t=d("#yith-wcwl-form");d("html, body").animate({scrollTop:t.offset().top},500),function(t,i){var e=t.attr("data-product-id"),n=d(document).find(".cart.wishlist_table"),a=n.data("pagination"),o=n.data("per-page"),s=n.data("id"),l=n.data("token"),t={action:yith_wcwl_l10n.actions.reload_wishlist_and_adding_elem_action,nonce:yith_wcwl_l10n.nonce.reload_wishlist_and_adding_elem_nonce,context:"frontend",pagination:a,per_page:o,wishlist_id:s,wishlist_token:l,add_to_wishlist:e,product_type:t.data("product-type")};if(!T())return window.alert(yith_wcwl_l10n.labels.cookie_disabled);d.ajax({type:"POST",url:yith_wcwl_l10n.ajax_url,data:t,dataType:"html",beforeSend:function(){j(n)},complete:function(){C(n)},success:function(t){var e=d(t),t=e.find("#yith-wcwl-form"),e=e.find(".yith-wfbt-slider-wrapper");i.replaceWith(t),d(".yith-wfbt-slider-wrapper").replaceWith(e),c(),d(document).trigger("yith_wcwl_reload_wishlist_from_frequently")}})}(e,t)}),t.on("submit",".yith-wcwl-popup-form",function(){return!1}),t.on("yith_infs_added_elem",function(){e()}),t.on("found_variation",function(t,e){var i=d(t.target).data("product_id"),n=e.variation_id,t=d(".yith-wcwl-add-to-wishlist").find('[data-product-id="'+i+'"]'),e=d(".yith-wcwl-add-to-wishlist").find('[data-original-product-id="'+i+'"]'),t=t.add(e),e=t.closest(".wishlist-fragment").filter(":visible");i&&n&&t.length&&(t.each(function(){var t=d(this),e=t.closest(".yith-wcwl-add-to-wishlist");t.attr("data-original-product-id",i),t.attr("data-product-id",n),e.length&&(void 0!==(t=e.data("fragment-options"))&&(t.product_id=n,e.data("fragment-options",t)),e.removeClass(function(t,e){return e.match(/add-to-wishlist-\S+/g).join(" ")}).addClass("add-to-wishlist-"+n).attr("data-fragment-ref",n))}),yith_wcwl_l10n.reload_on_found_variation&&(j(e),P({fragments:e,firstLoad:!1})))}),t.on("reset_data",function(t){var n=d(t.target).data("product_id"),e=d('[data-original-product-id="'+n+'"]'),t=e.closest(".wishlist-fragment").filter(":visible");n&&e.length&&(e.each(function(){var t=d(this),e=t.closest(".yith-wcwl-add-to-wishlist"),i=t.attr("data-product-id");t.attr("data-product-id",n),t.attr("data-original-product-id",""),e.length&&(void 0!==(t=e.data("fragment-options"))&&(t.product_id=n,e.data("fragment-options",t)),e.removeClass("add-to-wishlist-"+i).addClass("add-to-wishlist-"+n).attr("data-fragment-ref",n))}),yith_wcwl_l10n.reload_on_found_variation&&(j(t),P({fragments:t,firstLoad:!1})))}),t.on("yith_wcwl_reload_fragments",P),t.on("yith_wcwl_reload_after_ajax",c),t.on("yith_infs_added_elem",function(t,e){P({container:e,firstLoad:!1})}),t.on("yith_wcwl_fragments_loaded",function(t,e,i,n){n&&d(".variations_form").find(".variations select").last().change()}),t.on("click",".yith-wcwl-popup-feedback .close-popup",function(t){t.preventDefault(),b()}),"undefined"!=typeof yith_wcwl_l10n.enable_notices&&!yith_wcwl_l10n.enable_notices||!d(".yith-wcwl-add-to-wishlist").length||d("#yith-wcwl-popup-message").length||(t=d("<div>").attr("id","yith-wcwl-message"),t=d("<div>").attr("id","yith-wcwl-popup-message").html(t).hide(),d("body").prepend(t)),o(),r(),_(),h(),f(),d(document).on("click",".show-tab",function(t){var e=d(this),i=e.closest(".yith-wcwl-popup-content"),n=e.data("tab"),a=i.find(".tab").filter("."+n);if(t.preventDefault(),!a.length)return!1;e.addClass("active").siblings(".show-tab").removeClass("active"),a.show().siblings(".tab").hide(),"create"===n?i.prepend('<input type="hidden" id="new_wishlist_selector" class="wishlist-select" value="new">'):i.find("#new_wishlist_selector").remove(),d(document).trigger("yith_wcwl_tab_selected",[n,a])}),d(document).on("change",".wishlist-select",function(){var t=d(this),e=t.closest(".yith-wcwl-popup-content"),i=t.closest(".tab"),n=e.find(".tab.create"),a=e.find(".show-tab"),e=a.filter('[data-tab="create"]');"new"===t.val()&&n.length&&(i.hide(),n.show(),a.removeClass("active"),e.addClass("active"),t.find("option").removeProp("selected"),t.change())}),a(),i(),e(),n(),l=!1,yith_wcwl_l10n.is_wishlist_responsive&&d(window).on("resize",function(){var t=d(".wishlist_table.responsive"),e=t.is(".mobile"),i=window.matchMedia("(max-width: "+yith_wcwl_l10n.mobile_media_query+"px)"),n=t.closest("form"),a=n.attr("class"),o=n.data("fragment-options"),s={},n=!1;t.length&&(i.matches&&t&&!e?(o.is_mobile="yes",n=!0):!i.matches&&t&&e&&(o.is_mobile="no",n=!0),n&&(l&&l.abort(),s[a.split(" ").join(yith_wcwl_l10n.fragments_index_glue)]=o,l=d.ajax({beforeSend:function(){j(t)},complete:function(){C(t)},data:{action:yith_wcwl_l10n.actions.load_mobile_action,nonce:yith_wcwl_l10n.nonce.load_mobile_nonce,context:"frontend",fragments:s},method:"post",success:function(t){"undefined"!=typeof t.fragments&&(O(t.fragments),c(),d(document).trigger("yith_wcwl_responsive_template",[e,t.fragments]))},url:yith_wcwl_l10n.ajax_url})))}),w(),yith_wcwl_l10n.enable_ajax_loading&&P()}).trigger("yith_wcwl_init"),d("form#yith-wcwl-form .wishlist_table .product-quantity input").on("keypress",function(t){if("13"==t.keyCode)return t.preventDefault(),!1}),d(document).ready(function(){"thumbnails"===yith_wcwl_l10n.yith_wcwl_button_position&&d(".woocommerce-product-gallery + div.yith-wcwl-add-to-wishlist").appendTo(".woocommerce-product-gallery")})});
(()=>{"use strict";const e=e=>Math.abs(parseInt(e,10)),t=(e,t)=>{const a=new Map([["init","init"],["validation_failed","invalid"],["acceptance_missing","unaccepted"],["spam","spam"],["aborted","aborted"],["mail_sent","sent"],["mail_failed","failed"],["submitting","submitting"],["resetting","resetting"],["validating","validating"],["payment_required","payment-required"]]);a.has(t)&&(t=a.get(t)),Array.from(a.values()).includes(t)||(t=`custom-${t=(t=t.replace(/[^0-9a-z]+/i," ").trim()).replace(/\s+/,"-")}`);const n=e.getAttribute("data-status");return e.wpcf7.status=t,e.setAttribute("data-status",t),e.classList.add(t),n&&n!==t&&e.classList.remove(n),t},a=(e,t,a)=>{const n=new CustomEvent(`wpcf7${t}`,{bubbles:!0,detail:a});"string"==typeof e&&(e=document.querySelector(e)),e.dispatchEvent(n)},n=e=>{const{root:t,namespace:a="contact-form-7/v1"}=wpcf7.api;return r.reduceRight(((e,t)=>a=>t(a,e)),(e=>{let n,r,{url:o,path:c,endpoint:s,headers:i,body:l,data:d,...p}=e;"string"==typeof s&&(n=a.replace(/^\/|\/$/g,""),r=s.replace(/^\//,""),c=r?n+"/"+r:n),"string"==typeof c&&(-1!==t.indexOf("?")&&(c=c.replace("?","&")),c=c.replace(/^\//,""),o=t+c),i={Accept:"application/json, */*;q=0.1",...i},delete i["X-WP-Nonce"],d&&(l=JSON.stringify(d),i["Content-Type"]="application/json");const u={code:"fetch_error",message:"You are probably offline."},f={code:"invalid_json",message:"The response is not a valid JSON response."};return window.fetch(o||c||window.location.href,{...p,headers:i,body:l}).then((e=>Promise.resolve(e).then((e=>{if(e.status>=200&&e.status<300)return e;throw e})).then((e=>{if(204===e.status)return null;if(e&&e.json)return e.json().catch((()=>{throw f}));throw f}))),(()=>{throw u}))}))(e)},r=[];function o(e){var a,n;let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{target:o,scope:l=e,...d}=r;if(void 0===(null===(a=e.wpcf7)||void 0===a?void 0:a.schema))return;const p={...e.wpcf7.schema};if(void 0!==o){if(!e.contains(o))return;if(!o.closest(".wpcf7-form-control-wrap[data-name]"))return;if(o.closest(".novalidate"))return}const u=new FormData,f=[];for(const e of l.querySelectorAll(".wpcf7-form-control-wrap"))if(!e.closest(".novalidate")&&(e.querySelectorAll(":where( input, textarea, select ):enabled").forEach((e=>{if(e.name)switch(e.type){case"button":case"image":case"reset":case"submit":break;case"checkbox":case"radio":e.checked&&u.append(e.name,e.value);break;case"select-multiple":for(const t of e.selectedOptions)u.append(e.name,t.value);break;case"file":for(const t of e.files)u.append(e.name,t);break;default:u.append(e.name,e.value)}})),e.dataset.name&&(f.push(e.dataset.name),e.setAttribute("data-under-validation","1"),e.contains(o))))break;p.rules=(null!==(n=p.rules)&&void 0!==n?n:[]).filter((e=>{let{field:t}=e;return f.includes(t)}));const m=e.getAttribute("data-status");Promise.resolve(t(e,"validating")).then((t=>{if(void 0!==swv){const t=swv.validate(p,u,r);for(const[a,{error:n,validInputs:r}]of t)s(e,a),void 0!==n&&c(e,a,n,{scope:l}),i(e,a,null!=r?r:[])}})).finally((()=>{t(e,m),e.querySelectorAll(".wpcf7-form-control-wrap[data-under-validation]").forEach((e=>{e.removeAttribute("data-under-validation")}))}))}n.use=e=>{r.unshift(e)};const c=(e,t,a,n)=>{var r;const{scope:o=e,...c}=null!=n?n:{},s=`${null===(r=e.wpcf7)||void 0===r?void 0:r.unitTag}-ve-${t}`.replaceAll(/[^0-9a-z_-]+/gi,""),i=e.querySelector(`.wpcf7-form-control-wrap[data-name="${t}"] .wpcf7-form-control`);(()=>{const t=document.createElement("li");t.setAttribute("id",s),i&&i.id?t.insertAdjacentHTML("beforeend",`<a href="#${i.id}">${a}</a>`):t.insertAdjacentText("beforeend",a),e.wpcf7.parent.querySelector(".screen-reader-response ul").appendChild(t)})(),o.querySelectorAll(`.wpcf7-form-control-wrap[data-name="${t}"]`).forEach((t=>{if("validating"===e.getAttribute("data-status")&&!t.dataset.underValidation)return;const n=document.createElement("span");n.classList.add("wpcf7-not-valid-tip"),n.setAttribute("aria-hidden","true"),n.insertAdjacentText("beforeend",a),t.appendChild(n),t.querySelectorAll("[aria-invalid]").forEach((e=>{e.setAttribute("aria-invalid","true")})),t.querySelectorAll(".wpcf7-form-control").forEach((e=>{e.classList.add("wpcf7-not-valid"),e.setAttribute("aria-describedby",s),"function"==typeof e.setCustomValidity&&e.setCustomValidity(a),e.closest(".use-floating-validation-tip")&&(e.addEventListener("focus",(e=>{n.setAttribute("style","display: none")})),n.addEventListener("click",(e=>{n.setAttribute("style","display: none")})))}))}))},s=(e,t)=>{var a,n;const r=`${null===(a=e.wpcf7)||void 0===a?void 0:a.unitTag}-ve-${t}`.replaceAll(/[^0-9a-z_-]+/gi,"");null===(n=e.wpcf7.parent.querySelector(`.screen-reader-response ul li#${r}`))||void 0===n||n.remove(),e.querySelectorAll(`.wpcf7-form-control-wrap[data-name="${t}"]`).forEach((e=>{var t;null===(t=e.querySelector(".wpcf7-not-valid-tip"))||void 0===t||t.remove(),e.querySelectorAll("[aria-invalid]").forEach((e=>{e.setAttribute("aria-invalid","false")})),e.querySelectorAll(".wpcf7-form-control").forEach((e=>{e.removeAttribute("aria-describedby"),e.classList.remove("wpcf7-not-valid"),"function"==typeof e.setCustomValidity&&e.setCustomValidity("")}))}))},i=(e,t,a)=>{e.querySelectorAll(`[data-reflection-of="${t}"]`).forEach((e=>{if("output"===e.tagName.toLowerCase()){const t=e;0===a.length&&a.push(t.dataset.default),a.slice(0,1).forEach((e=>{e instanceof File&&(e=e.name),t.textContent=e}))}else e.querySelectorAll("output").forEach((e=>{e.hasAttribute("data-default")?0===a.length?e.removeAttribute("hidden"):e.setAttribute("hidden","hidden"):e.remove()})),a.forEach((a=>{a instanceof File&&(a=a.name);const n=document.createElement("output");n.setAttribute("name",t),n.textContent=a,e.appendChild(n)}))}))};function l(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(wpcf7.blocked)return d(e),void t(e,"submitting");const o=new FormData(e);r.submitter&&r.submitter.name&&o.append(r.submitter.name,r.submitter.value);const s={contactFormId:e.wpcf7.id,pluginVersion:e.wpcf7.pluginVersion,contactFormLocale:e.wpcf7.locale,unitTag:e.wpcf7.unitTag,containerPostId:e.wpcf7.containerPost,status:e.wpcf7.status,inputs:Array.from(o,(e=>{const t=e[0],a=e[1];return!t.match(/^_/)&&{name:t,value:a}})).filter((e=>!1!==e)),formData:o};n({endpoint:`contact-forms/${e.wpcf7.id}/feedback`,method:"POST",body:o,wpcf7:{endpoint:"feedback",form:e,detail:s}}).then((n=>{const r=t(e,n.status);return s.status=n.status,s.apiResponse=n,["invalid","unaccepted","spam","aborted"].includes(r)?a(e,r,s):["sent","failed"].includes(r)&&a(e,`mail${r}`,s),a(e,"submit",s),n})).then((t=>{t.posted_data_hash&&(e.querySelector('input[name="_wpcf7_posted_data_hash"]').value=t.posted_data_hash),"mail_sent"===t.status&&(e.reset(),e.wpcf7.resetOnMailSent=!0),t.invalid_fields&&t.invalid_fields.forEach((t=>{c(e,t.field,t.message)})),e.wpcf7.parent.querySelector('.screen-reader-response [role="status"]').insertAdjacentText("beforeend",t.message),e.querySelectorAll(".wpcf7-response-output").forEach((e=>{e.innerText=t.message}))})).catch((e=>console.error(e)))}n.use(((e,n)=>{if(e.wpcf7&&"feedback"===e.wpcf7.endpoint){const{form:n,detail:r}=e.wpcf7;d(n),a(n,"beforesubmit",r),t(n,"submitting")}return n(e)}));const d=e=>{e.querySelectorAll(".wpcf7-form-control-wrap").forEach((t=>{t.dataset.name&&s(e,t.dataset.name)})),e.wpcf7.parent.querySelector('.screen-reader-response [role="status"]').innerText="",e.querySelectorAll(".wpcf7-response-output").forEach((e=>{e.innerText=""}))};function p(e){const r=new FormData(e),o={contactFormId:e.wpcf7.id,pluginVersion:e.wpcf7.pluginVersion,contactFormLocale:e.wpcf7.locale,unitTag:e.wpcf7.unitTag,containerPostId:e.wpcf7.containerPost,status:e.wpcf7.status,inputs:Array.from(r,(e=>{const t=e[0],a=e[1];return!t.match(/^_/)&&{name:t,value:a}})).filter((e=>!1!==e)),formData:r};n({endpoint:`contact-forms/${e.wpcf7.id}/refill`,method:"GET",wpcf7:{endpoint:"refill",form:e,detail:o}}).then((n=>{e.wpcf7.resetOnMailSent?(delete e.wpcf7.resetOnMailSent,t(e,"mail_sent")):t(e,"init"),o.apiResponse=n,a(e,"reset",o)})).catch((e=>console.error(e)))}n.use(((e,a)=>{if(e.wpcf7&&"refill"===e.wpcf7.endpoint){const{form:a,detail:n}=e.wpcf7;d(a),t(a,"resetting")}return a(e)}));const u=(e,t)=>{for(const a in t){const n=t[a];e.querySelectorAll(`input[name="${a}"]`).forEach((e=>{e.value=""})),e.querySelectorAll(`img.wpcf7-captcha-${a.replaceAll(":","")}`).forEach((e=>{e.setAttribute("src",n)}));const r=/([0-9]+)\.(png|gif|jpeg)$/.exec(n);r&&e.querySelectorAll(`input[name="_wpcf7_captcha_challenge_${a}"]`).forEach((e=>{e.value=r[1]}))}},f=(e,t)=>{for(const a in t){const n=t[a][0],r=t[a][1];e.querySelectorAll(`.wpcf7-form-control-wrap[data-name="${a}"]`).forEach((e=>{e.querySelector(`input[name="${a}"]`).value="",e.querySelector(".wpcf7-quiz-label").textContent=n,e.querySelector(`input[name="_wpcf7_quiz_answer_${a}"]`).value=r}))}};function m(t){const a=new FormData(t);t.wpcf7={id:e(a.get("_wpcf7")),status:t.getAttribute("data-status"),pluginVersion:a.get("_wpcf7_version"),locale:a.get("_wpcf7_locale"),unitTag:a.get("_wpcf7_unit_tag"),containerPost:e(a.get("_wpcf7_container_post")),parent:t.closest(".wpcf7"),schema:void 0},t.querySelectorAll(".has-spinner").forEach((e=>{e.insertAdjacentHTML("afterend",'<span class="wpcf7-spinner"></span>')})),(e=>{e.querySelectorAll(".wpcf7-exclusive-checkbox").forEach((t=>{t.addEventListener("change",(t=>{const a=t.target.getAttribute("name");e.querySelectorAll(`input[type="checkbox"][name="${a}"]`).forEach((e=>{e!==t.target&&(e.checked=!1)}))}))}))})(t),(e=>{e.querySelectorAll(".has-free-text").forEach((t=>{const a=t.querySelector("input.wpcf7-free-text"),n=t.querySelector('input[type="checkbox"], input[type="radio"]');a.disabled=!n.checked,e.addEventListener("change",(e=>{a.disabled=!n.checked,e.target===n&&n.checked&&a.focus()}))}))})(t),(e=>{e.querySelectorAll(".wpcf7-validates-as-url").forEach((e=>{e.addEventListener("change",(t=>{let a=e.value.trim();a&&!a.match(/^[a-z][a-z0-9.+-]*:/i)&&-1!==a.indexOf(".")&&(a=a.replace(/^\/+/,""),a="http://"+a),e.value=a}))}))})(t),(e=>{if(!e.querySelector(".wpcf7-acceptance")||e.classList.contains("wpcf7-acceptance-as-validation"))return;const t=()=>{let t=!0;e.querySelectorAll(".wpcf7-acceptance").forEach((e=>{if(!t||e.classList.contains("optional"))return;const a=e.querySelector('input[type="checkbox"]');(e.classList.contains("invert")&&a.checked||!e.classList.contains("invert")&&!a.checked)&&(t=!1)})),e.querySelectorAll(".wpcf7-submit").forEach((e=>{e.disabled=!t}))};t(),e.addEventListener("change",(e=>{t()})),e.addEventListener("wpcf7reset",(e=>{t()}))})(t),(t=>{const a=(t,a)=>{const n=e(t.getAttribute("data-starting-value")),r=e(t.getAttribute("data-maximum-value")),o=e(t.getAttribute("data-minimum-value")),c=t.classList.contains("down")?n-a.value.length:a.value.length;t.setAttribute("data-current-value",c),t.innerText=c,r&&r<a.value.length?t.classList.add("too-long"):t.classList.remove("too-long"),o&&a.value.length<o?t.classList.add("too-short"):t.classList.remove("too-short")},n=e=>{e={init:!1,...e},t.querySelectorAll(".wpcf7-character-count").forEach((n=>{const r=n.getAttribute("data-target-name"),o=t.querySelector(`[name="${r}"]`);o&&(o.value=o.defaultValue,a(n,o),e.init&&o.addEventListener("keyup",(e=>{a(n,o)})))}))};n({init:!0}),t.addEventListener("wpcf7reset",(e=>{n()}))})(t),window.addEventListener("load",(e=>{wpcf7.cached&&t.reset()})),t.addEventListener("reset",(e=>{wpcf7.reset(t)})),t.addEventListener("submit",(e=>{wpcf7.submit(t,{submitter:e.submitter}),e.preventDefault()})),t.addEventListener("wpcf7submit",(e=>{e.detail.apiResponse.captcha&&u(t,e.detail.apiResponse.captcha),e.detail.apiResponse.quiz&&f(t,e.detail.apiResponse.quiz)})),t.addEventListener("wpcf7reset",(e=>{e.detail.apiResponse.captcha&&u(t,e.detail.apiResponse.captcha),e.detail.apiResponse.quiz&&f(t,e.detail.apiResponse.quiz)})),n({endpoint:`contact-forms/${t.wpcf7.id}/feedback/schema`,method:"GET"}).then((e=>{t.wpcf7.schema=e})),t.addEventListener("change",(e=>{e.target.closest(".wpcf7-form-control")&&wpcf7.validate(t,{target:e.target})}))}document.addEventListener("DOMContentLoaded",(e=>{var t;"undefined"!=typeof wpcf7?void 0!==wpcf7.api?"function"==typeof window.fetch?"function"==typeof window.FormData?"function"==typeof NodeList.prototype.forEach?"function"==typeof String.prototype.replaceAll?(wpcf7={init:m,submit:l,reset:p,validate:o,...null!==(t=wpcf7)&&void 0!==t?t:{}},document.querySelectorAll(".wpcf7 > form").forEach((e=>{wpcf7.init(e),e.closest(".wpcf7").classList.replace("no-js","js")}))):console.error("Your browser does not support String.replaceAll()."):console.error("Your browser does not support NodeList.forEach()."):console.error("Your browser does not support window.FormData()."):console.error("Your browser does not support window.fetch()."):console.error("wpcf7.api is not defined."):console.error("wpcf7 is not defined.")}))})();
/*!
 * jQuery blockUI plugin
 * Version 2.70.0-2014.11.23
 * Requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
!function(){"use strict";function e(e){e.fn._fadeIn=e.fn.fadeIn;var t=e.noop||function(){},o=/MSIE/.test(navigator.userAgent),n=/MSIE 6.0/.test(navigator.userAgent)&&!/MSIE 8.0/.test(navigator.userAgent),i=(document.documentMode,"function"==typeof document.createElement("div").style.setExpression&&document.createElement("div").style.setExpression);e.blockUI=function(e){d(window,e)},e.unblockUI=function(e){a(window,e)},e.growlUI=function(t,o,n,i){var s=e('<div class="growlUI"></div>');t&&s.append("<h1>"+t+"</h1>"),o&&s.append("<h2>"+o+"</h2>"),n===undefined&&(n=3e3);var l=function(t){t=t||{},e.blockUI({message:s,fadeIn:"undefined"!=typeof t.fadeIn?t.fadeIn:700,fadeOut:"undefined"!=typeof t.fadeOut?t.fadeOut:1e3,timeout:"undefined"!=typeof t.timeout?t.timeout:n,centerY:!1,showOverlay:!1,onUnblock:i,css:e.blockUI.defaults.growlCSS})};l();s.css("opacity");s.on("mouseover",function(){l({fadeIn:0,timeout:3e4});var t=e(".blockMsg");t.stop(),t.fadeTo(300,1)}).on("mouseout",function(){e(".blockMsg").fadeOut(1e3)})},e.fn.block=function(t){if(this[0]===window)return e.blockUI(t),this;var o=e.extend({},e.blockUI.defaults,t||{});return this.each(function(){var t=e(this);o.ignoreIfBlocked&&t.data("blockUI.isBlocked")||t.unblock({fadeOut:0})}),this.each(function(){"static"==e.css(this,"position")&&(this.style.position="relative",e(this).data("blockUI.static",!0)),this.style.zoom=1,d(this,t)})},e.fn.unblock=function(t){return this[0]===window?(e.unblockUI(t),this):this.each(function(){a(this,t)})},e.blockUI.version=2.7,e.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:!0,theme:!1,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:.6,cursor:"wait"},cursorReset:"default",growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px","border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:!1,baseZ:1e3,centerX:!0,centerY:!0,allowBodyStretch:!0,bindEvents:!0,constrainTabKey:!0,fadeIn:200,fadeOut:400,timeout:0,showOverlay:!0,focusInput:!0,focusableElements:":input:enabled:visible",onBlock:null,onUnblock:null,onOverlayClick:null,quirksmodeOffsetHack:4,blockMsgClass:"blockMsg",ignoreIfBlocked:!1};var s=null,l=[];function d(d,c){var u,b,h=d==window,k=c&&c.message!==undefined?c.message:undefined;if(!(c=e.extend({},e.blockUI.defaults,c||{})).ignoreIfBlocked||!e(d).data("blockUI.isBlocked")){if(c.overlayCSS=e.extend({},e.blockUI.defaults.overlayCSS,c.overlayCSS||{}),u=e.extend({},e.blockUI.defaults.css,c.css||{}),c.onOverlayClick&&(c.overlayCSS.cursor="pointer"),b=e.extend({},e.blockUI.defaults.themedCSS,c.themedCSS||{}),k=k===undefined?c.message:k,h&&s&&a(window,{fadeOut:0}),k&&"string"!=typeof k&&(k.parentNode||k.jquery)){var y=k.jquery?k[0]:k,m={};e(d).data("blockUI.history",m),m.el=y,m.parent=y.parentNode,m.display=y.style.display,m.position=y.style.position,m.parent&&m.parent.removeChild(y)}e(d).data("blockUI.onUnblock",c.onUnblock);var g,v,I,w,U=c.baseZ;g=o||c.forceIframe?e('<iframe class="blockUI" style="z-index:'+U+++';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+c.iframeSrc+'"></iframe>'):e('<div class="blockUI" style="display:none"></div>'),v=c.theme?e('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+U+++';display:none"></div>'):e('<div class="blockUI blockOverlay" style="z-index:'+U+++';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'),c.theme&&h?(w='<div class="blockUI '+c.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(U+10)+';display:none;position:fixed">',c.title&&(w+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(c.title||"&nbsp;")+"</div>"),w+='<div class="ui-widget-content ui-dialog-content"></div>',w+="</div>"):c.theme?(w='<div class="blockUI '+c.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(U+10)+';display:none;position:absolute">',c.title&&(w+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(c.title||"&nbsp;")+"</div>"),w+='<div class="ui-widget-content ui-dialog-content"></div>',w+="</div>"):w=h?'<div class="blockUI '+c.blockMsgClass+' blockPage" style="z-index:'+(U+10)+';display:none;position:fixed"></div>':'<div class="blockUI '+c.blockMsgClass+' blockElement" style="z-index:'+(U+10)+';display:none;position:absolute"></div>',I=e(w),k&&(c.theme?(I.css(b),I.addClass("ui-widget-content")):I.css(u)),c.theme||v.css(c.overlayCSS),v.css("position",h?"fixed":"absolute"),(o||c.forceIframe)&&g.css("opacity",0);var x=[g,v,I],C=e(h?"body":d);e.each(x,function(){this.appendTo(C)}),c.theme&&c.draggable&&e.fn.draggable&&I.draggable({handle:".ui-dialog-titlebar",cancel:"li"});var S=i&&(!e.support.boxModel||e("object,embed",h?null:d).length>0);if(n||S){if(h&&c.allowBodyStretch&&e.support.boxModel&&e("html,body").css("height","100%"),(n||!e.support.boxModel)&&!h)var E=p(d,"borderTopWidth"),O=p(d,"borderLeftWidth"),T=E?"(0 - "+E+")":0,M=O?"(0 - "+O+")":0;e.each(x,function(e,t){var o=t[0].style;if(o.position="absolute",e<2)h?o.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:"+c.quirksmodeOffsetHack+') + "px"'):o.setExpression("height",'this.parentNode.offsetHeight + "px"'),h?o.setExpression("width",'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):o.setExpression("width",'this.parentNode.offsetWidth + "px"'),M&&o.setExpression("left",M),T&&o.setExpression("top",T);else if(c.centerY)h&&o.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),o.marginTop=0;else if(!c.centerY&&h){var n="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+(c.css&&c.css.top?parseInt(c.css.top,10):0)+') + "px"';o.setExpression("top",n)}})}if(k&&(c.theme?I.find(".ui-widget-content").append(k):I.append(k),(k.jquery||k.nodeType)&&e(k).show()),(o||c.forceIframe)&&c.showOverlay&&g.show(),c.fadeIn){var B=c.onBlock?c.onBlock:t,j=c.showOverlay&&!k?B:t,H=k?B:t;c.showOverlay&&v._fadeIn(c.fadeIn,j),k&&I._fadeIn(c.fadeIn,H)}else c.showOverlay&&v.show(),k&&I.show(),c.onBlock&&c.onBlock.bind(I)();if(r(1,d,c),h?(s=I[0],l=e(c.focusableElements,s),c.focusInput&&setTimeout(f,20)):function(e,t,o){var n=e.parentNode,i=e.style,s=(n.offsetWidth-e.offsetWidth)/2-p(n,"borderLeftWidth"),l=(n.offsetHeight-e.offsetHeight)/2-p(n,"borderTopWidth");t&&(i.left=s>0?s+"px":"0");o&&(i.top=l>0?l+"px":"0")}(I[0],c.centerX,c.centerY),c.timeout){var z=setTimeout(function(){h?e.unblockUI(c):e(d).unblock(c)},c.timeout);e(d).data("blockUI.timeout",z)}}}function a(t,o){var n,i,d=t==window,a=e(t),u=a.data("blockUI.history"),f=a.data("blockUI.timeout");f&&(clearTimeout(f),a.removeData("blockUI.timeout")),o=e.extend({},e.blockUI.defaults,o||{}),r(0,t,o),null===o.onUnblock&&(o.onUnblock=a.data("blockUI.onUnblock"),a.removeData("blockUI.onUnblock")),i=d?e(document.body).children().filter(".blockUI").add("body > .blockUI"):a.find(">.blockUI"),o.cursorReset&&(i.length>1&&(i[1].style.cursor=o.cursorReset),i.length>2&&(i[2].style.cursor=o.cursorReset)),d&&(s=l=null),o.fadeOut?(n=i.length,i.stop().fadeOut(o.fadeOut,function(){0==--n&&c(i,u,o,t)})):c(i,u,o,t)}function c(t,o,n,i){var s=e(i);if(!s.data("blockUI.isBlocked")){t.each(function(e,t){this.parentNode&&this.parentNode.removeChild(this)}),o&&o.el&&(o.el.style.display=o.display,o.el.style.position=o.position,o.el.style.cursor="default",o.parent&&o.parent.appendChild(o.el),s.removeData("blockUI.history")),s.data("blockUI.static")&&s.css("position","static"),"function"==typeof n.onUnblock&&n.onUnblock(i,n);var l=e(document.body),d=l.width(),a=l[0].style.width;l.width(d-1).width(d),l[0].style.width=a}}function r(t,o,n){var i=o==window,l=e(o);if((t||(!i||s)&&(i||l.data("blockUI.isBlocked")))&&(l.data("blockUI.isBlocked",t),i&&n.bindEvents&&(!t||n.showOverlay))){var d="mousedown mouseup keydown keypress keyup touchstart touchend touchmove";t?e(document).on(d,n,u):e(document).off(d,u)}}function u(t){if("keydown"===t.type&&t.keyCode&&9==t.keyCode&&s&&t.data.constrainTabKey){var o=l,n=!t.shiftKey&&t.target===o[o.length-1],i=t.shiftKey&&t.target===o[0];if(n||i)return setTimeout(function(){f(i)},10),!1}var d=t.data,a=e(t.target);return a.hasClass("blockOverlay")&&d.onOverlayClick&&d.onOverlayClick(t),a.parents("div."+d.blockMsgClass).length>0||0===a.parents().children().filter("div.blockUI").length}function f(e){if(l){var t=l[!0===e?l.length-1:0];t&&t.trigger("focus")}}function p(t,o){return parseInt(e.css(t,o),10)||0}}"function"==typeof define&&define.amd&&define.amd.jQuery?define(["jquery"],e):e(jQuery)}();
jQuery(function(t){if("undefined"==typeof wc_add_to_cart_params)return!1;var a=function(){this.requests=[],this.addRequest=this.addRequest.bind(this),this.run=this.run.bind(this),t(document.body).on("click",".add_to_cart_button",{addToCartHandler:this},this.onAddToCart).on("click",".remove_from_cart_button",{addToCartHandler:this},this.onRemoveFromCart).on("added_to_cart",this.updateButton).on("ajax_request_not_sent.adding_to_cart",this.updateButton).on("added_to_cart removed_from_cart",{addToCartHandler:this},this.updateFragments)};a.prototype.addRequest=function(t){this.requests.push(t),1===this.requests.length&&this.run()},a.prototype.run=function(){var a=this,e=a.requests[0].complete;a.requests[0].complete=function(){"function"==typeof e&&e(),a.requests.shift(),a.requests.length>0&&a.run()},t.ajax(this.requests[0])},a.prototype.onAddToCart=function(a){var e=t(this);if(e.is(".ajax_add_to_cart")){if(!e.attr("data-product_id"))return!0;if(a.preventDefault(),e.removeClass("added"),e.addClass("loading"),!1===t(document.body).triggerHandler("should_send_ajax_request.adding_to_cart",[e]))return t(document.body).trigger("ajax_request_not_sent.adding_to_cart",[!1,!1,e]),!0;var r={};t.each(e.data(),function(t,a){r[t]=a}),t.each(e[0].dataset,function(t,a){r[t]=a}),t(document.body).trigger("adding_to_cart",[e,r]),a.data.addToCartHandler.addRequest({type:"POST",url:wc_add_to_cart_params.wc_ajax_url.toString().replace("%%endpoint%%","add_to_cart"),data:r,success:function(a){a&&(a.error&&a.product_url?window.location=a.product_url:"yes"!==wc_add_to_cart_params.cart_redirect_after_add?t(document.body).trigger("added_to_cart",[a.fragments,a.cart_hash,e]):window.location=wc_add_to_cart_params.cart_url)},dataType:"json"})}},a.prototype.onRemoveFromCart=function(a){var e=t(this),r=e.closest(".woocommerce-mini-cart-item");a.preventDefault(),r.block({message:null,overlayCSS:{opacity:.6}}),a.data.addToCartHandler.addRequest({type:"POST",url:wc_add_to_cart_params.wc_ajax_url.toString().replace("%%endpoint%%","remove_from_cart"),data:{cart_item_key:e.data("cart_item_key")},success:function(a){a&&a.fragments?t(document.body).trigger("removed_from_cart",[a.fragments,a.cart_hash,e]):window.location=e.attr("href")},error:function(){window.location=e.attr("href")},dataType:"json"})},a.prototype.updateButton=function(a,e,r,d){(d=void 0!==d&&d)&&(d.removeClass("loading"),e&&d.addClass("added"),e&&!wc_add_to_cart_params.is_cart&&0===d.parent().find(".added_to_cart").length&&d.after('<a href="'+wc_add_to_cart_params.cart_url+'" class="added_to_cart wc-forward" title="'+wc_add_to_cart_params.i18n_view_cart+'">'+wc_add_to_cart_params.i18n_view_cart+"</a>"),t(document.body).trigger("wc_cart_button_updated",[d]))},a.prototype.updateFragments=function(a,e){e&&(t.each(e,function(a){t(a).addClass("updating").fadeTo("400","0.6").block({message:null,overlayCSS:{opacity:.6}})}),t.each(e,function(a,e){t(a).replaceWith(e),t(a).stop(!0).css("opacity","1").unblock()}),t(document.body).trigger("wc_fragments_loaded"))},new a});
jQuery(function(t){if("undefined"==typeof wc_single_product_params)return!1;t("body").on("init",".wc-tabs-wrapper, .woocommerce-tabs",function(){t(this).find(".wc-tab, .woocommerce-tabs .panel:not(.panel .panel)").hide();var e=window.location.hash,i=window.location.href,o=t(this).find(".wc-tabs, ul.tabs").first();e.toLowerCase().indexOf("comment-")>=0||"#reviews"===e||"#tab-reviews"===e?o.find("li.reviews_tab a").trigger("click"):i.indexOf("comment-page-")>0||i.indexOf("cpage=")>0?o.find("li.reviews_tab a").trigger("click"):"#tab-additional_information"===e?o.find("li.additional_information_tab a").trigger("click"):o.find("li:first a").trigger("click")}).on("click",".wc-tabs li a, ul.tabs li a",function(e){e.preventDefault();var i=t(this),o=i.closest(".wc-tabs-wrapper, .woocommerce-tabs");o.find(".wc-tabs, ul.tabs").find("li").removeClass("active"),o.find(".wc-tab, .panel:not(.panel .panel)").hide(),i.closest("li").addClass("active"),o.find("#"+i.attr("href").split("#")[1]).show()}).on("click","a.woocommerce-review-link",function(){return t(".reviews_tab a").trigger("click"),!0}).on("init","#rating",function(){t("#rating").hide().before('<p class="stars">\t\t\t\t\t\t<span>\t\t\t\t\t\t\t<a class="star-1" href="#">1</a>\t\t\t\t\t\t\t<a class="star-2" href="#">2</a>\t\t\t\t\t\t\t<a class="star-3" href="#">3</a>\t\t\t\t\t\t\t<a class="star-4" href="#">4</a>\t\t\t\t\t\t\t<a class="star-5" href="#">5</a>\t\t\t\t\t\t</span>\t\t\t\t\t</p>')}).on("click","#respond p.stars a",function(){var e=t(this),i=t(this).closest("#respond").find("#rating"),o=t(this).closest(".stars");return i.val(e.text()),e.siblings("a").removeClass("active"),e.addClass("active"),o.addClass("selected"),!1}).on("click","#respond #submit",function(){var e=t(this).closest("#respond").find("#rating"),i=e.val();if(e.length>0&&!i&&"yes"===wc_single_product_params.review_rating_required)return window.alert(wc_single_product_params.i18n_required_rating_text),!1}),t(".wc-tabs-wrapper, .woocommerce-tabs, #rating").trigger("init");var e=function(e,i){this.$target=e,this.$images=t(".woocommerce-product-gallery__image",e),0!==this.$images.length?(e.data("product_gallery",this),this.flexslider_enabled="function"==typeof t.fn.flexslider&&wc_single_product_params.flexslider_enabled,this.zoom_enabled="function"==typeof t.fn.zoom&&wc_single_product_params.zoom_enabled,this.photoswipe_enabled="undefined"!=typeof PhotoSwipe&&wc_single_product_params.photoswipe_enabled,i&&(this.flexslider_enabled=!1!==i.flexslider_enabled&&this.flexslider_enabled,this.zoom_enabled=!1!==i.zoom_enabled&&this.zoom_enabled,this.photoswipe_enabled=!1!==i.photoswipe_enabled&&this.photoswipe_enabled),1===this.$images.length&&(this.flexslider_enabled=!1),this.initFlexslider=this.initFlexslider.bind(this),this.initZoom=this.initZoom.bind(this),this.initZoomForTarget=this.initZoomForTarget.bind(this),this.initPhotoswipe=this.initPhotoswipe.bind(this),this.onResetSlidePosition=this.onResetSlidePosition.bind(this),this.getGalleryItems=this.getGalleryItems.bind(this),this.openPhotoswipe=this.openPhotoswipe.bind(this),this.flexslider_enabled?(this.initFlexslider(i.flexslider),e.on("woocommerce_gallery_reset_slide_position",this.onResetSlidePosition)):this.$target.css("opacity",1),this.zoom_enabled&&(this.initZoom(),e.on("woocommerce_gallery_init_zoom",this.initZoom)),this.photoswipe_enabled&&this.initPhotoswipe()):this.$target.css("opacity",1)};e.prototype.initFlexslider=function(e){var i=this.$target,o=this,r=t.extend({selector:".woocommerce-product-gallery__wrapper > .woocommerce-product-gallery__image",start:function(){i.css("opacity",1)},after:function(t){o.initZoomForTarget(o.$images.eq(t.currentSlide))}},e);i.flexslider(r),t(".woocommerce-product-gallery__wrapper .woocommerce-product-gallery__image:eq(0) .wp-post-image").one("load",function(){var e=t(this);e&&setTimeout(function(){var t=e.closest(".woocommerce-product-gallery__image").height(),i=e.closest(".flex-viewport");t&&i&&i.height(t)},100)}).each(function(){this.complete&&t(this).trigger("load")})},e.prototype.initZoom=function(){this.initZoomForTarget(this.$images.first())},e.prototype.initZoomForTarget=function(e){if(!this.zoom_enabled)return!1;var i=this.$target.width(),o=!1;if(t(e).each(function(e,r){if(t(r).find("img").data("large_image_width")>i)return o=!0,!1}),o){var r=t.extend({touch:!1},wc_single_product_params.zoom_options);"ontouchstart"in document.documentElement&&(r.on="click"),e.trigger("zoom.destroy"),e.zoom(r),setTimeout(function(){e.find(":hover").length&&e.trigger("mouseover")},100)}},e.prototype.initPhotoswipe=function(){this.zoom_enabled&&this.$images.length>0?(this.$target.prepend('<a href="#" class="woocommerce-product-gallery__trigger">🔍</a>'),this.$target.on("click",".woocommerce-product-gallery__trigger",this.openPhotoswipe),this.$target.on("click",".woocommerce-product-gallery__image a",function(t){t.preventDefault()}),this.flexslider_enabled||this.$target.on("click",".woocommerce-product-gallery__image a",this.openPhotoswipe)):this.$target.on("click",".woocommerce-product-gallery__image a",this.openPhotoswipe)},e.prototype.onResetSlidePosition=function(){this.$target.flexslider(0)},e.prototype.getGalleryItems=function(){var e=this.$images,i=[];return e.length>0&&e.each(function(e,o){var r=t(o).find("img");if(r.length){var a=r.attr("data-large_image"),s=r.attr("data-large_image_width"),n=r.attr("data-large_image_height"),l={alt:r.attr("alt"),src:a,w:s,h:n,title:r.attr("data-caption")?r.attr("data-caption"):r.attr("title")};i.push(l)}}),i},e.prototype.openPhotoswipe=function(e){e.preventDefault();var i,o=t(".pswp")[0],r=this.getGalleryItems(),a=t(e.target);i=0<a.closest(".woocommerce-product-gallery__trigger").length?this.$target.find(".flex-active-slide"):a.closest(".woocommerce-product-gallery__image");var s=t.extend({index:t(i).index(),addCaptionHTMLFn:function(t,e){return t.title?(e.children[0].textContent=t.title,!0):(e.children[0].textContent="",!1)}},wc_single_product_params.photoswipe_options);new PhotoSwipe(o,PhotoSwipeUI_Default,r,s).init()},t.fn.wc_product_gallery=function(t){return new e(this,t||wc_single_product_params),this},t(".woocommerce-product-gallery").each(function(){t(this).trigger("wc-product-gallery-before-init",[this,wc_single_product_params]),t(this).wc_product_gallery(wc_single_product_params),t(this).trigger("wc-product-gallery-after-init",[this,wc_single_product_params])})});
/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var o=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=o,t}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}return function n(o){function t(n,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(i=e({path:"/"},t.defaults,i)).expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}i.expires=i.expires?i.expires.toUTCString():"";try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(m){}r=o.write?o.write(r,n):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=(n=(n=encodeURIComponent(String(n))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var f="";for(var s in i)i[s]&&(f+="; "+s,!0!==i[s]&&(f+="="+i[s]));return document.cookie=n+"="+r+f}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],d=/(%[0-9A-Z]{2})+/g,u=0;u<p.length;u++){var l=p[u].split("="),C=l.slice(1).join("=");'"'===C.charAt(0)&&(C=C.slice(1,-1));try{var g=l[0].replace(d,decodeURIComponent);if(C=o.read?o.read(C,g):o(C,g)||C.replace(d,decodeURIComponent),this.json)try{C=JSON.parse(C)}catch(m){}if(n===g){c=C;break}n||(c[g]=C)}catch(m){}}return c}}return t.set=t,t.get=function(e){return t.call(t,e)},t.getJSON=function(){return t.apply({json:!0},[].slice.call(arguments))},t.defaults={},t.remove=function(n,o){t(n,"",e(o,{expires:-1}))},t.withConverter=n,t}(function(){})});
jQuery(function(o){o(".woocommerce-ordering").on("change","select.orderby",function(){o(this).closest("form").trigger("submit")}),o("input.qty:not(.product-quantity input.qty)").each(function(){var e=parseFloat(o(this).attr("min"));e>=0&&parseFloat(o(this).val())<e&&o(this).val(e)});var e="store_notice"+(o(".woocommerce-store-notice").data("noticeId")||"");"hidden"===Cookies.get(e)?o(".woocommerce-store-notice").hide():o(".woocommerce-store-notice").show(),o(".woocommerce-store-notice__dismiss-link").on("click",function(s){Cookies.set(e,"hidden",{path:"/"}),o(".woocommerce-store-notice").hide(),s.preventDefault()}),o(".woocommerce-input-wrapper span.description").length&&o(document.body).on("click",function(){o(".woocommerce-input-wrapper span.description:visible").prop("aria-hidden",!0).slideUp(250)}),o(".woocommerce-input-wrapper").on("click",function(o){o.stopPropagation()}),o(".woocommerce-input-wrapper :input").on("keydown",function(e){var s=o(this).parent().find("span.description");if(27===e.which&&s.length&&s.is(":visible"))return s.prop("aria-hidden",!0).slideUp(250),e.preventDefault(),!1}).on("click focus",function(){var e=o(this).parent(),s=e.find("span.description");e.addClass("currentTarget"),o(".woocommerce-input-wrapper:not(.currentTarget) span.description:visible").prop("aria-hidden",!0).slideUp(250),s.length&&s.is(":hidden")&&s.prop("aria-hidden",!1).slideDown(250),e.removeClass("currentTarget")}),o.scroll_to_notices=function(e){e.length&&o("html, body").animate({scrollTop:e.offset().top-100},1e3)},o('.woocommerce form .woocommerce-Input[type="password"]').wrap('<span class="password-input"></span>'),o(".woocommerce form input").filter(":password").parent("span").addClass("password-input"),o(".password-input").append('<span class="show-password-input"></span>'),o(".show-password-input").on("click",function(){o(this).hasClass("display-password")?o(this).removeClass("display-password"):o(this).addClass("display-password"),o(this).hasClass("display-password")?o(this).siblings(['input[type="password"]']).prop("type","text"):o(this).siblings('input[type="text"]').prop("type","password")})});
/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isLowIE=b.isIE8=document.all&&!document.addEventListener,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",c.mainEl&&c.mainEl.length?b.ev=c.mainEl.eq(0):b.ev=d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b.st.autoFocusLast&&b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),f?b.currTemplate[d]=a(f):b.currTemplate[d]=!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(c,d){if(void 0===d||d===!1)return!0;if(e=c.split("_"),e.length>1){var f=b.find(p+"-"+e[0]);if(f.length>0){var g=e[1];"replaceWith"===g?f[0]!==d[0]&&f.replaceWith(d):"img"===g?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(p+"-"+c).html(d)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery";return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s);e.click(function(){b.prev()}),f.click(function(){b.next()}),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),A()});
/*! Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
!function () { "use strict"; var a = !1; window.JQClass = function () { }, JQClass.classes = {}, JQClass.extend = function b(c) { function d() { !a && this._init && this._init.apply(this, arguments) } var e = this.prototype; a = !0; var f = new this; a = !1; for (var g in c) if ("function" == typeof c[g] && "function" == typeof e[g]) f[g] = function (a, b) { return function () { var c = this._super; this._super = function (b) { return e[a].apply(this, b || []) }; var d = b.apply(this, arguments); return this._super = c, d } }(g, c[g]); else if ("object" == typeof c[g] && "object" == typeof e[g] && "defaultOptions" === g) { var h, i = e[g], j = c[g], k = {}; for (h in i) k[h] = i[h]; for (h in j) k[h] = j[h]; f[g] = k } else f[g] = c[g]; return d.prototype = f, d.prototype.constructor = d, d.extend = b, d } }(),/*! Abstract base class for collection plugins v1.0.2.
	Written by Keith Wood (wood.keith{at}optusnet.com.au) December 2013.
	Licensed under the MIT license (http://keith-wood.name/licence.html). */
    function ($) { "use strict"; function camelCase(a) { return a.replace(/-([a-z])/g, function (a, b) { return b.toUpperCase() }) } JQClass.classes.JQPlugin = JQClass.extend({ name: "plugin", defaultOptions: {}, regionalOptions: {}, deepMerge: !0, _getMarker: function () { return "is-" + this.name }, _init: function () { $.extend(this.defaultOptions, this.regionalOptions && this.regionalOptions[""] || {}); var a = camelCase(this.name); $[a] = this, $.fn[a] = function (b) { var c = Array.prototype.slice.call(arguments, 1), d = this, e = this; return this.each(function () { if ("string" == typeof b) { if ("_" === b[0] || !$[a][b]) throw "Unknown method: " + b; var f = $[a][b].apply($[a], [this].concat(c)); if (f !== d && void 0 !== f) return e = f, !1 } else $[a]._attach(this, b) }), e } }, setDefaults: function (a) { $.extend(this.defaultOptions, a || {}) }, _attach: function (a, b) { if (a = $(a), !a.hasClass(this._getMarker())) { a.addClass(this._getMarker()), b = $.extend(this.deepMerge, {}, this.defaultOptions, this._getMetadata(a), b || {}); var c = $.extend({ name: this.name, elem: a, options: b }, this._instSettings(a, b)); a.data(this.name, c), this._postAttach(a, c), this.option(a, b) } }, _instSettings: function (a, b) { return {} }, _postAttach: function (a, b) { }, _getMetadata: function (elem) { try { var data = elem.data(this.name.toLowerCase()) || ""; data = data.replace(/(\\?)'/g, function (a, b) { return b ? "'" : '"' }).replace(/([a-zA-Z0-9]+):/g, function (a, b, c) { var d = data.substring(0, c).match(/"/g); return d && d.length % 2 !== 0 ? b + ":" : '"' + b + '":' }).replace(/\\:/g, ":"), data = $.parseJSON("{" + data + "}"); for (var key in data) if (data.hasOwnProperty(key)) { var value = data[key]; "string" == typeof value && value.match(/^new Date\(([-0-9,\s]*)\)$/) && (data[key] = eval(value)) } return data } catch (a) { return {} } }, _getInst: function (a) { return $(a).data(this.name) || {} }, option: function (a, b, c) { a = $(a); var d = a.data(this.name), e = b || {}; return !b || "string" == typeof b && "undefined" == typeof c ? (e = (d || {}).options, e && b ? e[b] : e) : void (a.hasClass(this._getMarker()) && ("string" == typeof b && (e = {}, e[b] = c), this._optionsChanged(a, d, e), $.extend(d.options, e))) }, _optionsChanged: function (a, b, c) { }, destroy: function (a) { a = $(a), a.hasClass(this._getMarker()) && (this._preDestroy(a, this._getInst(a)), a.removeData(this.name).removeClass(this._getMarker())) }, _preDestroy: function (a, b) { } }), $.JQPlugin = { createPlugin: function (a, b) { "object" == typeof a && (b = a, a = "JQPlugin"), a = camelCase(a); var c = camelCase(b.name); JQClass.classes[c] = JQClass.classes[a].extend(b), new JQClass.classes[c] } } }(jQuery);

!function (a) { "use strict"; var b = "countdown", c = 0, d = 1, e = 2, f = 3, g = 4, h = 5, i = 6; a.JQPlugin.createPlugin({ name: b, defaultOptions: { until: null, since: null, timezone: null, serverSync: null, format: "dHMS", layout: "", compact: !1, padZeroes: !1, significant: 0, description: "", expiryUrl: "", expiryText: "", alwaysExpire: !1, onExpiry: null, onTick: null, tickInterval: 1 }, regionalOptions: { "": { labels: ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"], labels1: ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"], compactLabels: ["y", "m", "w", "d"], whichLabels: null, digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], timeSeparator: ":", isRTL: !1 } }, _rtlClass: b + "-rtl", _sectionClass: b + "-section", _amountClass: b + "-amount", _periodClass: b + "-period", _rowClass: b + "-row", _holdingClass: b + "-holding", _showClass: b + "-show", _descrClass: b + "-descr", _timerElems: [], _init: function () { function b(a) { var h = a < 1e12 ? e ? window.performance.now() + window.performance.timing.navigationStart : d() : a || d(); h - g >= 1e3 && (c._updateElems(), g = h), f(b) } var c = this; this._super(), this._serverSyncs = []; var d = "function" == typeof Date.now ? Date.now : function () { return (new Date).getTime() }, e = window.performance && "function" == typeof window.performance.now, f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null, g = 0; !f || a.noRequestAnimationFrame ? (a.noRequestAnimationFrame = null, a.countdown._timer = setInterval(function () { c._updateElems() }, 1e3)) : (g = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || d(), f(b)) }, UTCDate: function (a, b, c, d, e, f, g, h) { "object" == typeof b && b instanceof Date && (h = b.getMilliseconds(), g = b.getSeconds(), f = b.getMinutes(), e = b.getHours(), d = b.getDate(), c = b.getMonth(), b = b.getFullYear()); var i = new Date; return i.setUTCFullYear(b), i.setUTCDate(1), i.setUTCMonth(c || 0), i.setUTCDate(d || 1), i.setUTCHours(e || 0), i.setUTCMinutes((f || 0) - (Math.abs(a) < 30 ? 60 * a : a)), i.setUTCSeconds(g || 0), i.setUTCMilliseconds(h || 0), i }, periodsToSeconds: function (a) { return 31557600 * a[0] + 2629800 * a[1] + 604800 * a[2] + 86400 * a[3] + 3600 * a[4] + 60 * a[5] + a[6] }, resync: function () { var b = this; a("." + this._getMarker()).each(function () { var c = a.data(this, b.name); if (c.options.serverSync) { for (var d = null, e = 0; e < b._serverSyncs.length; e++)if (b._serverSyncs[e][0] === c.options.serverSync) { d = b._serverSyncs[e]; break } if (b._eqNull(d[2])) { var f = a.isFunction(c.options.serverSync) ? c.options.serverSync.apply(this, []) : null; d[2] = (f ? (new Date).getTime() - f.getTime() : 0) - d[1] } c._since && c._since.setMilliseconds(c._since.getMilliseconds() + d[2]), c._until.setMilliseconds(c._until.getMilliseconds() + d[2]) } }); for (var c = 0; c < b._serverSyncs.length; c++)b._eqNull(b._serverSyncs[c][2]) || (b._serverSyncs[c][1] += b._serverSyncs[c][2], delete b._serverSyncs[c][2]) }, _instSettings: function (a, b) { return { _periods: [0, 0, 0, 0, 0, 0, 0] } }, _addElem: function (a) { this._hasElem(a) || this._timerElems.push(a) }, _hasElem: function (b) { return a.inArray(b, this._timerElems) > -1 }, _removeElem: function (b) { this._timerElems = a.map(this._timerElems, function (a) { return a === b ? null : a }) }, _updateElems: function () { for (var a = this._timerElems.length - 1; a >= 0; a--)this._updateCountdown(this._timerElems[a]) }, _optionsChanged: function (b, c, d) { d.layout && (d.layout = d.layout.replace(/&lt;/g, "<").replace(/&gt;/g, ">")), this._resetExtraLabels(c.options, d); var e = c.options.timezone !== d.timezone; a.extend(c.options, d), this._adjustSettings(b, c, !this._eqNull(d.until) || !this._eqNull(d.since) || e); var f = new Date; (c._since && c._since < f || c._until && c._until > f) && this._addElem(b[0]), this._updateCountdown(b, c) }, _updateCountdown: function (b, c) { if (b = b.jquery ? b : a(b), c = c || this._getInst(b)) { if (!c.options) { return } if (b.html(this._generateHTML(c)).toggleClass(this._rtlClass, c.options.isRTL), "pause" !== c._hold && a.isFunction(c.options.onTick)) { var d = "lap" !== c._hold ? c._periods : this._calculatePeriods(c, c._show, c.options.significant, new Date); 1 !== c.options.tickInterval && this.periodsToSeconds(d) % c.options.tickInterval !== 0 || c.options.onTick.apply(b[0], [d]) } var e = "pause" !== c._hold && (c._since ? c._now.getTime() < c._since.getTime() : c._now.getTime() >= c._until.getTime()); if (e && !c._expiring) { if (c._expiring = !0, this._hasElem(b[0]) || c.options.alwaysExpire) { if (this._removeElem(b[0]), a.isFunction(c.options.onExpiry) && c.options.onExpiry.apply(b[0], []), c.options.expiryText) { var f = c.options.layout; c.options.layout = c.options.expiryText, this._updateCountdown(b[0], c), c.options.layout = f } c.options.expiryUrl && (window.location = c.options.expiryUrl) } c._expiring = !1 } else "pause" === c._hold && this._removeElem(b[0]) } }, _resetExtraLabels: function (a, b) { var c = null; for (c in b) c.match(/[Ll]abels[02-9]|compactLabels1/) && (a[c] = b[c]); for (c in a) c.match(/[Ll]abels[02-9]|compactLabels1/) && "undefined" == typeof b[c] && (a[c] = null) }, _eqNull: function (a) { return "undefined" == typeof a || null === a }, _adjustSettings: function (b, c, d) { for (var e = null, f = 0; f < this._serverSyncs.length; f++)if (this._serverSyncs[f][0] === c.options.serverSync) { e = this._serverSyncs[f][1]; break } var g = null, h = null; if (this._eqNull(e)) { var i = a.isFunction(c.options.serverSync) ? c.options.serverSync.apply(b[0], []) : null; g = new Date, h = i ? g.getTime() - i.getTime() : 0, this._serverSyncs.push([c.options.serverSync, h]) } else g = new Date, h = c.options.serverSync ? e : 0; var j = c.options.timezone; j = this._eqNull(j) ? -g.getTimezoneOffset() : j, (d || !d && this._eqNull(c._until) && this._eqNull(c._since)) && (c._since = c.options.since, this._eqNull(c._since) || (c._since = this.UTCDate(j, this._determineTime(c._since, null)), c._since && h && c._since.setMilliseconds(c._since.getMilliseconds() + h)), c._until = this.UTCDate(j, this._determineTime(c.options.until, g)), h && c._until.setMilliseconds(c._until.getMilliseconds() + h)), c._show = this._determineShow(c) }, _preDestroy: function (a, b) { this._removeElem(a[0]), a.empty() }, pause: function (a) { this._hold(a, "pause") }, lap: function (a) { this._hold(a, "lap") }, resume: function (a) { this._hold(a, null) }, toggle: function (b) { var c = a.data(b, this.name) || {}; this[c._hold ? "resume" : "pause"](b) }, toggleLap: function (b) { var c = a.data(b, this.name) || {}; this[c._hold ? "resume" : "lap"](b) }, _hold: function (b, c) { var d = a.data(b, this.name); if (d) { if ("pause" === d._hold && !c) { d._periods = d._savePeriods; var e = d._since ? "-" : "+"; d[d._since ? "_since" : "_until"] = this._determineTime(e + d._periods[0] + "y" + e + d._periods[1] + "o" + e + d._periods[2] + "w" + e + d._periods[3] + "d" + e + d._periods[4] + "h" + e + d._periods[5] + "m" + e + d._periods[6] + "s"), this._addElem(b) } d._hold = c, d._savePeriods = "pause" === c ? d._periods : null, a.data(b, this.name, d), this._updateCountdown(b, d) } }, getTimes: function (b) { var c = a.data(b, this.name); return c ? "pause" === c._hold ? c._savePeriods : c._hold ? this._calculatePeriods(c, c._show, c.options.significant, new Date) : c._periods : null }, _determineTime: function (a, b) { var c = this, d = function (a) { var b = new Date; return b.setTime(b.getTime() + 1e3 * a), b }, e = function (a) { a = a.toLowerCase(); for (var b = new Date, d = b.getFullYear(), e = b.getMonth(), f = b.getDate(), g = b.getHours(), h = b.getMinutes(), i = b.getSeconds(), j = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g, k = j.exec(a); k;) { switch (k[2] || "s") { case "s": i += parseInt(k[1], 10); break; case "m": h += parseInt(k[1], 10); break; case "h": g += parseInt(k[1], 10); break; case "d": f += parseInt(k[1], 10); break; case "w": f += 7 * parseInt(k[1], 10); break; case "o": e += parseInt(k[1], 10), f = Math.min(f, c._getDaysInMonth(d, e)); break; case "y": d += parseInt(k[1], 10), f = Math.min(f, c._getDaysInMonth(d, e)) }k = j.exec(a) } return new Date(d, e, f, g, h, i, 0) }, f = this._eqNull(a) ? b : "string" == typeof a ? e(a) : "number" == typeof a ? d(a) : a; return f && f.setMilliseconds(0), f }, _getDaysInMonth: function (a, b) { return 32 - new Date(a, b, 32).getDate() }, _normalLabels: function (a) { return a }, _generateHTML: function (b) { var j = this; b._periods = b._hold ? b._periods : this._calculatePeriods(b, b._show, b.options.significant, new Date); var k = !1, l = 0, m = b.options.significant, n = a.extend({}, b._show), o = null; for (o = c; o <= i; o++)k = k || "?" === b._show[o] && b._periods[o] > 0, n[o] = "?" !== b._show[o] || k ? b._show[o] : null, l += n[o] ? 1 : 0, m -= b._periods[o] > 0 ? 1 : 0; var p = [!1, !1, !1, !1, !1, !1, !1]; for (o = i; o >= c; o--)b._show[o] && (b._periods[o] ? p[o] = !0 : (p[o] = m > 0, m--)); var q = b.options.compact ? b.options.compactLabels : b.options.labels, r = b.options.whichLabels || this._normalLabels, s = function (a) { var c = b.options["compactLabels" + r(b._periods[a])]; return n[a] ? j._translateDigits(b, b._periods[a]) + (c ? c[a] : q[a]) + " " : "" }, t = b.options.padZeroes ? 2 : 1, u = function (a) { var c = b.options["labels" + r(b._periods[a])]; return !b.options.significant && n[a] || b.options.significant && p[a] ? '<span class="' + j._sectionClass + '"><span class="' + j._amountClass + '">' + j._minDigits(b, b._periods[a], t) + '</span><span class="' + j._periodClass + '">' + (c ? c[a] : q[a]) + "</span></span>" : "" }; return b.options.layout ? this._buildLayout(b, n, b.options.layout, b.options.compact, b.options.significant, p) : (b.options.compact ? '<span class="' + this._rowClass + " " + this._amountClass + (b._hold ? " " + this._holdingClass : "") + '">' + s(c) + s(d) + s(e) + s(f) + (n[g] ? this._minDigits(b, b._periods[g], 2) : "") + (n[h] ? (n[g] ? b.options.timeSeparator : "") + this._minDigits(b, b._periods[h], 2) : "") + (n[i] ? (n[g] || n[h] ? b.options.timeSeparator : "") + this._minDigits(b, b._periods[i], 2) : "") : '<span class="' + this._rowClass + " " + this._showClass + (b.options.significant || l) + (b._hold ? " " + this._holdingClass : "") + '">' + u(c) + u(d) + u(e) + u(f) + u(g) + u(h) + u(i)) + "</span>" + (b.options.description ? '<span class="' + this._rowClass + " " + this._descrClass + '">' + b.options.description + "</span>" : "") }, _buildLayout: function (b, j, k, l, m, n) { for (var o = b.options[l ? "compactLabels" : "labels"], p = b.options.whichLabels || this._normalLabels, q = function (a) { return (b.options[(l ? "compactLabels" : "labels") + p(b._periods[a])] || o)[a] }, r = function (a, c) { return b.options.digits[Math.floor(a / c) % 10] }, s = { desc: b.options.description, sep: b.options.timeSeparator, yl: q(c), yn: this._minDigits(b, b._periods[c], 1), ynn: this._minDigits(b, b._periods[c], 2), ynnn: this._minDigits(b, b._periods[c], 3), y1: r(b._periods[c], 1), y10: r(b._periods[c], 10), y100: r(b._periods[c], 100), y1000: r(b._periods[c], 1e3), ol: q(d), on: this._minDigits(b, b._periods[d], 1), onn: this._minDigits(b, b._periods[d], 2), onnn: this._minDigits(b, b._periods[d], 3), o1: r(b._periods[d], 1), o10: r(b._periods[d], 10), o100: r(b._periods[d], 100), o1000: r(b._periods[d], 1e3), wl: q(e), wn: this._minDigits(b, b._periods[e], 1), wnn: this._minDigits(b, b._periods[e], 2), wnnn: this._minDigits(b, b._periods[e], 3), w1: r(b._periods[e], 1), w10: r(b._periods[e], 10), w100: r(b._periods[e], 100), w1000: r(b._periods[e], 1e3), dl: q(f), dn: this._minDigits(b, b._periods[f], 1), dnn: this._minDigits(b, b._periods[f], 2), dnnn: this._minDigits(b, b._periods[f], 3), d1: r(b._periods[f], 1), d10: r(b._periods[f], 10), d100: r(b._periods[f], 100), d1000: r(b._periods[f], 1e3), hl: q(g), hn: this._minDigits(b, b._periods[g], 1), hnn: this._minDigits(b, b._periods[g], 2), hnnn: this._minDigits(b, b._periods[g], 3), h1: r(b._periods[g], 1), h10: r(b._periods[g], 10), h100: r(b._periods[g], 100), h1000: r(b._periods[g], 1e3), ml: q(h), mn: this._minDigits(b, b._periods[h], 1), mnn: this._minDigits(b, b._periods[h], 2), mnnn: this._minDigits(b, b._periods[h], 3), m1: r(b._periods[h], 1), m10: r(b._periods[h], 10), m100: r(b._periods[h], 100), m1000: r(b._periods[h], 1e3), sl: q(i), sn: this._minDigits(b, b._periods[i], 1), snn: this._minDigits(b, b._periods[i], 2), snnn: this._minDigits(b, b._periods[i], 3), s1: r(b._periods[i], 1), s10: r(b._periods[i], 10), s100: r(b._periods[i], 100), s1000: r(b._periods[i], 1e3) }, t = k, u = c; u <= i; u++) { var v = "yowdhms".charAt(u), w = new RegExp("\\{" + v + "<\\}([\\s\\S]*)\\{" + v + ">\\}", "g"); t = t.replace(w, !m && j[u] || m && n[u] ? "$1" : "") } return a.each(s, function (a, b) { var c = new RegExp("\\{" + a + "\\}", "g"); t = t.replace(c, b) }), t }, _minDigits: function (a, b, c) { return b = "" + b, b.length >= c ? this._translateDigits(a, b) : (b = "0000000000" + b, this._translateDigits(a, b.substr(b.length - c))) }, _translateDigits: function (a, b) { return ("" + b).replace(/[0-9]/g, function (b) { return a.options.digits[b] }) }, _determineShow: function (a) { var b = a.options.format, j = []; return j[c] = b.match("y") ? "?" : b.match("Y") ? "!" : null, j[d] = b.match("o") ? "?" : b.match("O") ? "!" : null, j[e] = b.match("w") ? "?" : b.match("W") ? "!" : null, j[f] = b.match("d") ? "?" : b.match("D") ? "!" : null, j[g] = b.match("h") ? "?" : b.match("H") ? "!" : null, j[h] = b.match("m") ? "?" : b.match("M") ? "!" : null, j[i] = b.match("s") ? "?" : b.match("S") ? "!" : null, j }, _calculatePeriods: function (a, b, j, k) { a._now = k, a._now.setMilliseconds(0); var l = new Date(a._now.getTime()); a._since ? k.getTime() < a._since.getTime() ? a._now = k = l : k = a._since : (l.setTime(a._until.getTime()), k.getTime() > a._until.getTime() && (a._now = k = l)); var m = [0, 0, 0, 0, 0, 0, 0]; if (b[c] || b[d]) { var n = this._getDaysInMonth(k.getFullYear(), k.getMonth()), o = this._getDaysInMonth(l.getFullYear(), l.getMonth()), p = l.getDate() === k.getDate() || l.getDate() >= Math.min(n, o) && k.getDate() >= Math.min(n, o), q = function (a) { return 60 * (60 * a.getHours() + a.getMinutes()) + a.getSeconds() }, r = Math.max(0, 12 * (l.getFullYear() - k.getFullYear()) + l.getMonth() - k.getMonth() + (l.getDate() < k.getDate() && !p || p && q(l) < q(k) ? -1 : 0)); m[c] = b[c] ? Math.floor(r / 12) : 0, m[d] = b[d] ? r - 12 * m[c] : 0, k = new Date(k.getTime()); var s = k.getDate() === n, t = this._getDaysInMonth(k.getFullYear() + m[c], k.getMonth() + m[d]); k.getDate() > t && k.setDate(t), k.setFullYear(k.getFullYear() + m[c]), k.setMonth(k.getMonth() + m[d]), s && k.setDate(t) } var u = Math.floor((l.getTime() - k.getTime()) / 1e3), v = null, w = function (a, c) { m[a] = b[a] ? Math.floor(u / c) : 0, u -= m[a] * c }; if (w(e, 604800), w(f, 86400), w(g, 3600), w(h, 60), w(i, 1), u > 0 && !a._since) { var x = [1, 12, 4.3482, 7, 24, 60, 60], y = i, z = 1; for (v = i; v >= c; v--)b[v] && (m[y] >= z && (m[y] = 0, u = 1), u > 0 && (m[v]++, u = 0, y = v, z = 1)), z *= x[v] } if (j) for (v = c; v <= i; v++)j && m[v] ? j-- : j || (m[v] = 0); return m } }) }(jQuery);
!function(t,a,i,e){var r=function(t){var a=this;a.$form=t,a.$attributeFields=t.find(".variations select"),a.$singleVariation=t.find(".single_variation"),a.$singleVariationWrap=t.find(".single_variation_wrap"),a.$resetVariations=t.find(".reset_variations"),a.$product=t.closest(".product"),a.variationData=t.data("product_variations"),a.useAjax=!1===a.variationData,a.xhr=!1,a.loading=!0,a.$singleVariationWrap.show(),a.$form.off(".wc-variation-form"),a.getChosenAttributes=a.getChosenAttributes.bind(a),a.findMatchingVariations=a.findMatchingVariations.bind(a),a.isMatch=a.isMatch.bind(a),a.toggleResetLink=a.toggleResetLink.bind(a),t.on("click.wc-variation-form",".reset_variations",{variationForm:a},a.onReset),t.on("reload_product_variations",{variationForm:a},a.onReload),t.on("hide_variation",{variationForm:a},a.onHide),t.on("show_variation",{variationForm:a},a.onShow),t.on("click",".single_add_to_cart_button",{variationForm:a},a.onAddToCart),t.on("reset_data",{variationForm:a},a.onResetDisplayedVariation),t.on("reset_image",{variationForm:a},a.onResetImage),t.on("change.wc-variation-form",".variations select",{variationForm:a},a.onChange),t.on("found_variation.wc-variation-form",{variationForm:a},a.onFoundVariation),t.on("check_variations.wc-variation-form",{variationForm:a},a.onFindVariation),t.on("update_variation_values.wc-variation-form",{variationForm:a},a.onUpdateAttributes),setTimeout(function(){t.trigger("check_variations"),t.trigger("wc_variation_form",a),a.loading=!1},100)};r.prototype.onReset=function(t){t.preventDefault(),t.data.variationForm.$attributeFields.val("").trigger("change"),t.data.variationForm.$form.trigger("reset_data")},r.prototype.onReload=function(t){var a=t.data.variationForm;a.variationData=a.$form.data("product_variations"),a.useAjax=!1===a.variationData,a.$form.trigger("check_variations")},r.prototype.onHide=function(t){t.preventDefault(),t.data.variationForm.$form.find(".single_add_to_cart_button").removeClass("wc-variation-is-unavailable").addClass("disabled wc-variation-selection-needed"),t.data.variationForm.$form.find(".woocommerce-variation-add-to-cart").removeClass("woocommerce-variation-add-to-cart-enabled").addClass("woocommerce-variation-add-to-cart-disabled")},r.prototype.onShow=function(a,i,e){a.preventDefault(),e?(a.data.variationForm.$form.find(".single_add_to_cart_button").removeClass("disabled wc-variation-selection-needed wc-variation-is-unavailable"),a.data.variationForm.$form.find(".woocommerce-variation-add-to-cart").removeClass("woocommerce-variation-add-to-cart-disabled").addClass("woocommerce-variation-add-to-cart-enabled")):(a.data.variationForm.$form.find(".single_add_to_cart_button").removeClass("wc-variation-selection-needed").addClass("disabled wc-variation-is-unavailable"),a.data.variationForm.$form.find(".woocommerce-variation-add-to-cart").removeClass("woocommerce-variation-add-to-cart-enabled").addClass("woocommerce-variation-add-to-cart-disabled")),wp.mediaelement&&a.data.variationForm.$form.find(".wp-audio-shortcode, .wp-video-shortcode").not(".mejs-container").filter(function(){return!t(this).parent().hasClass("mejs-mediaelement")}).mediaelementplayer(wp.mediaelement.settings)},r.prototype.onAddToCart=function(i){t(this).is(".disabled")&&(i.preventDefault(),t(this).is(".wc-variation-is-unavailable")?a.alert(wc_add_to_cart_variation_params.i18n_unavailable_text):t(this).is(".wc-variation-selection-needed")&&a.alert(wc_add_to_cart_variation_params.i18n_make_a_selection_text))},r.prototype.onResetDisplayedVariation=function(t){var a=t.data.variationForm;a.$product.find(".product_meta").find(".sku").wc_reset_content(),a.$product.find(".product_weight, .woocommerce-product-attributes-item--weight .woocommerce-product-attributes-item__value").wc_reset_content(),a.$product.find(".product_dimensions, .woocommerce-product-attributes-item--dimensions .woocommerce-product-attributes-item__value").wc_reset_content(),a.$form.trigger("reset_image"),a.$singleVariation.slideUp(200).trigger("hide_variation")},r.prototype.onResetImage=function(t){t.data.variationForm.$form.wc_variations_image_update(!1)},r.prototype.onFindVariation=function(a,i){var e=a.data.variationForm,r=void 0!==i?i:e.getChosenAttributes(),o=r.data;if(r.count&&r.count===r.chosenCount)if(e.useAjax)e.xhr&&e.xhr.abort(),e.$form.block({message:null,overlayCSS:{background:"#fff",opacity:.6}}),o.product_id=parseInt(e.$form.data("product_id"),10),o.custom_data=e.$form.data("custom_data"),e.xhr=t.ajax({url:wc_add_to_cart_variation_params.wc_ajax_url.toString().replace("%%endpoint%%","get_variation"),type:"POST",data:o,success:function(t){t?e.$form.trigger("found_variation",[t]):(e.$form.trigger("reset_data"),r.chosenCount=0,e.loading||(e.$form.find(".single_variation").after('<p class="wc-no-matching-variations woocommerce-info">'+wc_add_to_cart_variation_params.i18n_no_matching_variations_text+"</p>"),e.$form.find(".wc-no-matching-variations").slideDown(200)))},complete:function(){e.$form.unblock()}});else{e.$form.trigger("update_variation_values");var n=e.findMatchingVariations(e.variationData,o).shift();n?e.$form.trigger("found_variation",[n]):(e.$form.trigger("reset_data"),r.chosenCount=0,e.loading||(e.$form.find(".single_variation").after('<p class="wc-no-matching-variations woocommerce-info">'+wc_add_to_cart_variation_params.i18n_no_matching_variations_text+"</p>"),e.$form.find(".wc-no-matching-variations").slideDown(200)))}else e.$form.trigger("update_variation_values"),e.$form.trigger("reset_data");e.toggleResetLink(r.chosenCount>0)},r.prototype.onFoundVariation=function(a,i){var e=a.data.variationForm,r=e.$product.find(".product_meta").find(".sku"),n=e.$product.find(".product_weight, .woocommerce-product-attributes-item--weight .woocommerce-product-attributes-item__value"),s=e.$product.find(".product_dimensions, .woocommerce-product-attributes-item--dimensions .woocommerce-product-attributes-item__value"),c=e.$singleVariationWrap.find('.quantity input.qty[name="quantity"]'),_=c.closest(".quantity"),d=!0,m=!1,v="";if(i.sku?r.wc_set_content(i.sku):r.wc_reset_content(),i.weight?n.wc_set_content(i.weight_html):n.wc_reset_content(),i.dimensions?s.wc_set_content(t.parseHTML(i.dimensions_html)[0].data):s.wc_reset_content(),e.$form.wc_variations_image_update(i),i.variation_is_visible?(m=o("variation-template"),i.variation_id):m=o("unavailable-variation-template"),v=(v=(v=m({variation:i})).replace("/*<![CDATA[*/","")).replace("/*]]>*/",""),e.$singleVariation.html(v),e.$form.find('input[name="variation_id"], input.variation_id').val(i.variation_id).trigger("change"),"yes"===i.is_sold_individually)c.val("1").attr("min","1").attr("max","").trigger("change"),_.hide();else{var l=parseFloat(c.val());l=isNaN(l)?i.min_qty:(l=l>parseFloat(i.max_qty)?i.max_qty:l)<parseFloat(i.min_qty)?i.min_qty:l,c.attr("min",i.min_qty).attr("max",i.max_qty).val(l).trigger("change"),_.show()}i.is_purchasable&&i.is_in_stock&&i.variation_is_visible||(d=!1),e.$singleVariation.text().trim()?e.$singleVariation.slideDown(200).trigger("show_variation",[i,d]):e.$singleVariation.show().trigger("show_variation",[i,d])},r.prototype.onChange=function(t){var a=t.data.variationForm;a.$form.find('input[name="variation_id"], input.variation_id').val("").trigger("change"),a.$form.find(".wc-no-matching-variations").remove(),a.useAjax?a.$form.trigger("check_variations"):(a.$form.trigger("woocommerce_variation_select_change"),a.$form.trigger("check_variations")),a.$form.trigger("woocommerce_variation_has_changed")},r.prototype.addSlashes=function(t){return t=(t=t.replace(/'/g,"\\'")).replace(/"/g,'\\"')},r.prototype.onUpdateAttributes=function(a){var i=a.data.variationForm,e=i.getChosenAttributes().data;i.useAjax||(i.$attributeFields.each(function(a,r){var o,n=t(r),s=n.data("attribute_name")||n.attr("name"),c=t(r).data("show_option_none"),_=":gt(0)",d=t("<select/>"),m=n.val()||"",v=!0;if(!n.data("attribute_html")){var l=n.clone();l.find("option").removeAttr("attached").prop("disabled",!1).prop("selected",!1),n.data("attribute_options",l.find("option"+_).get()),n.data("attribute_html",l.html())}d.html(n.data("attribute_html"));var g=t.extend(!0,{},e);g[s]="";var f=i.findMatchingVariations(i.variationData,g);for(var u in f)if("undefined"!=typeof f[u]){var h=f[u].attributes;for(var p in h)if(h.hasOwnProperty(p)){var w=h[p],b="";if(p===s)if(f[u].variation_is_active&&(b="enabled"),w){w=t("<div/>").html(w).text();var $=d.find("option");if($.length)for(var y=0,F=$.length;y<F;y++){var C=t($[y]);if(w===C.val()){C.addClass("attached "+b);break}}}else d.find("option:gt(0)").addClass("attached "+b)}}o=d.find("option.attached").length,m&&(v=!1,0!==o&&d.find("option.attached.enabled").each(function(){var a=t(this).val();if(m===a)return v=!0,!1})),o>0&&m&&v&&"no"===c&&(d.find("option:first").remove(),_=""),d.find("option"+_+":not(.attached)").remove(),n.html(d.html()),n.find("option"+_+":not(.enabled)").prop("disabled",!0),m?v?n.val(m):n.val("").trigger("change"):n.val("")}),i.$form.trigger("woocommerce_update_variation_values"))},r.prototype.getChosenAttributes=function(){var a={},i=0,e=0;return this.$attributeFields.each(function(){var r=t(this).data("attribute_name")||t(this).attr("name"),o=t(this).val()||"";o.length>0&&e++,i++,a[r]=o}),{count:i,chosenCount:e,data:a}},r.prototype.findMatchingVariations=function(t,a){for(var i=[],e=0;e<t.length;e++){var r=t[e];this.isMatch(r.attributes,a)&&i.push(r)}return i},r.prototype.isMatch=function(t,a){var i=!0;for(var e in t)if(t.hasOwnProperty(e)){var r=t[e],o=a[e];void 0!==r&&void 0!==o&&0!==r.length&&0!==o.length&&r!==o&&(i=!1)}return i},r.prototype.toggleResetLink=function(t){t?"hidden"===this.$resetVariations.css("visibility")&&this.$resetVariations.css("visibility","visible").hide().fadeIn():this.$resetVariations.css("visibility","hidden")},t.fn.wc_variation_form=function(){return new r(this),this},t.fn.wc_set_content=function(t){void 0===this.attr("data-o_content")&&this.attr("data-o_content",this.text()),this.text(t)},t.fn.wc_reset_content=function(){void 0!==this.attr("data-o_content")&&this.text(this.attr("data-o_content"))},t.fn.wc_set_variation_attr=function(t,a){void 0===this.attr("data-o_"+t)&&this.attr("data-o_"+t,this.attr(t)?this.attr(t):""),!1===a?this.removeAttr(t):this.attr(t,a)},t.fn.wc_reset_variation_attr=function(t){void 0!==this.attr("data-o_"+t)&&this.attr(t,this.attr("data-o_"+t))},t.fn.wc_maybe_trigger_slide_position_reset=function(a){var i=t(this),e=i.closest(".product").find(".images"),r=!1,o=a&&a.image_id?a.image_id:"";i.attr("current-image")!==o&&(r=!0),i.attr("current-image",o),r&&e.trigger("woocommerce_gallery_reset_slide_position")},t.fn.wc_variations_image_update=function(i){var e=this,r=e.closest(".product"),o=r.find(".images"),n=r.find(".flex-control-nav"),s=n.find("li:eq(0) img"),c=o.find(".woocommerce-product-gallery__image, .woocommerce-product-gallery__image--placeholder").eq(0),_=c.find(".wp-post-image"),d=c.find("a").eq(0);if(i&&i.image&&i.image.src&&i.image.src.length>1){n.find('li img[data-o_src="'+i.image.gallery_thumbnail_src+'"]').length>0&&e.wc_variations_image_reset();var m=n.find('li img[src="'+i.image.gallery_thumbnail_src+'"]');if(m.length>0)return m.trigger("click"),e.attr("current-image",i.image_id),void a.setTimeout(function(){t(a).trigger("resize"),o.trigger("woocommerce_gallery_init_zoom")},20);_.wc_set_variation_attr("src",i.image.src),_.wc_set_variation_attr("height",i.image.src_h),_.wc_set_variation_attr("width",i.image.src_w),_.wc_set_variation_attr("srcset",i.image.srcset),_.wc_set_variation_attr("sizes",i.image.sizes),_.wc_set_variation_attr("title",i.image.title),_.wc_set_variation_attr("data-caption",i.image.caption),_.wc_set_variation_attr("alt",i.image.alt),_.wc_set_variation_attr("data-src",i.image.full_src),_.wc_set_variation_attr("data-large_image",i.image.full_src),_.wc_set_variation_attr("data-large_image_width",i.image.full_src_w),_.wc_set_variation_attr("data-large_image_height",i.image.full_src_h),c.wc_set_variation_attr("data-thumb",i.image.src),s.wc_set_variation_attr("src",i.image.gallery_thumbnail_src),d.wc_set_variation_attr("href",i.image.full_src)}else e.wc_variations_image_reset();a.setTimeout(function(){t(a).trigger("resize"),e.wc_maybe_trigger_slide_position_reset(i),o.trigger("woocommerce_gallery_init_zoom")},20)},t.fn.wc_variations_image_reset=function(){var t=this.closest(".product"),a=t.find(".images"),i=t.find(".flex-control-nav").find("li:eq(0) img"),e=a.find(".woocommerce-product-gallery__image, .woocommerce-product-gallery__image--placeholder").eq(0),r=e.find(".wp-post-image"),o=e.find("a").eq(0);r.wc_reset_variation_attr("src"),r.wc_reset_variation_attr("width"),r.wc_reset_variation_attr("height"),r.wc_reset_variation_attr("srcset"),r.wc_reset_variation_attr("sizes"),r.wc_reset_variation_attr("title"),r.wc_reset_variation_attr("data-caption"),r.wc_reset_variation_attr("alt"),r.wc_reset_variation_attr("data-src"),r.wc_reset_variation_attr("data-large_image"),r.wc_reset_variation_attr("data-large_image_width"),r.wc_reset_variation_attr("data-large_image_height"),e.wc_reset_variation_attr("data-thumb"),i.wc_reset_variation_attr("src"),o.wc_reset_variation_attr("href")},t(function(){"undefined"!=typeof wc_add_to_cart_variation_params&&t(".variations_form").each(function(){t(this).wc_variation_form()})});var o=function(t){var e=i.getElementById("tmpl-"+t).textContent,r=!1;return(r=(r=(r=r||/<#\s?data\./.test(e))||/{{{?\s?data\.(?!variation\.).+}}}?/.test(e))||/{{{?\s?data\.variation\.[\w-]*[^\s}]/.test(e))?wp.template(t):function(t){var i=t.variation||{};return e.replace(/({{{?)\s?data\.variation\.([\w-]*)\s?(}}}?)/g,function(t,e,r,o){if(e.length!==o.length)return"";var n=i[r]||"";return 2===e.length?a.escape(n):n})}}}(jQuery,window,document);
/*!
	Zoom 1.7.21
	license: MIT
	http://www.jacklmoore.com/zoom
*/
!function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,e,n,i){var u,a,c,r,l,m,f,s=o(t),h=s.css("position"),d=o(e);return t.style.position=/(absolute|fixed)/.test(h)?h:"relative",t.style.overflow="hidden",n.style.width=n.style.height="",o(n).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:n.width*i,height:n.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){a=s.outerWidth(),u=s.outerHeight(),e===t?(r=a,c=u):(r=d.outerWidth(),c=d.outerHeight()),l=(n.width-a)/r,m=(n.height-u)/c,f=d.offset()},move:function(o){var t=o.pageX-f.left,e=o.pageY-f.top;e=Math.max(Math.min(e,c),0),t=Math.max(Math.min(t,r),0),n.style.left=t*-l+"px",n.style.top=e*-m+"px"}}},o.fn.zoom=function(e){return this.each(function(){var n=o.extend({},t,e||{}),i=n.target&&o(n.target)[0]||this,u=this,a=o(u),c=document.createElement("img"),r=o(c),l="mousemove.zoom",m=!1,f=!1;if(!n.url){var s=u.querySelector("img");if(s&&(n.url=s.getAttribute("data-src")||s.currentSrc||s.src,n.alt=s.getAttribute("data-alt")||s.alt),!n.url)return}a.one("zoom.destroy",function(o,t){a.off(".zoom"),i.style.position=o,i.style.overflow=t,c.onload=null,r.remove()}.bind(this,i.style.position,i.style.overflow)),c.onload=function(){var t=o.zoom(i,u,c,n.magnify);function e(e){t.init(),t.move(e),r.stop().fadeTo(o.support.opacity?n.duration:0,1,"function"==typeof n.onZoomIn&&n.onZoomIn.call(c))}function s(){r.stop().fadeTo(n.duration,0,"function"==typeof n.onZoomOut&&n.onZoomOut.call(c))}"grab"===n.on?a.on("mousedown.zoom",function(n){1===n.which&&(o(document).one("mouseup.zoom",function(){s(),o(document).off(l,t.move)}),e(n),o(document).on(l,t.move),n.preventDefault())}):"click"===n.on?a.on("click.zoom",function(n){return m?void 0:(m=!0,e(n),o(document).on(l,t.move),o(document).one("click.zoom",function(){s(),m=!1,o(document).off(l,t.move)}),!1)}):"toggle"===n.on?a.on("click.zoom",function(o){m?s():e(o),m=!m}):"mouseover"===n.on&&(t.init(),a.on("mouseenter.zoom",e).on("mouseleave.zoom",s).on(l,t.move)),n.touch&&a.on("touchstart.zoom",function(o){o.preventDefault(),f?(f=!1,s()):(f=!0,e(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),t.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}).on("touchend.zoom",function(o){o.preventDefault(),f&&(f=!1,s())}),"function"==typeof n.callback&&n.callback.call(c)},c.setAttribute("role","presentation"),c.alt=n.alt||"",c.src=n.url})},o.fn.zoom.defaults=t}(window.jQuery);
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports&&"function"==typeof require?require("jquery"):jQuery)}((function(e){"use strict";function t(n,o){var s=this;s.element=n,s.el=e(n),s.suggestions=[],s.badQueries=[],s.selectedIndex=-1,s.currentValue=s.element.value,s.timeoutId=null,s.cachedResponse={},s.onChangeTimeout=null,s.onChange=null,s.isLocal=!1,s.suggestionsContainer=null,s.noSuggestionsContainer=null,s.options=e.extend(!0,{},t.defaults,o),s.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"},s.hint=null,s.hintValue="",s.selection=null,s.initialize(),s.setOptions(o)}var n={escapeRegExChars:function(e){return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")},createNode:function(e){var t=document.createElement("div");return t.className=e,t.style.position="absolute",t.style.display="none",t}},o=27,s=9,i=13,a=38,u=39,r=40,l=e.noop;t.utils=n,e.Autocomplete=t,t.defaults={ajaxSettings:{},autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:function(e,t){if(!t)return e.value;var o="("+n.escapeRegExChars(t)+")";return e.value.replace(new RegExp(o,"gi"),"<strong>$1</strong>").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/&lt;(\/?strong)&gt;/g,"<$1>")},formatGroup:function(e,t){return'<div class="autocomplete-group">'+t+"</div>"},delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:l,onSearchComplete:l,onSearchError:l,preserveInput:!1,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",currentRequest:null,triggerSelectOnValidInput:!0,preventBadQueries:!0,lookupFilter:function(e,t,n){return-1!==e.value.toLowerCase().indexOf(n)},paramName:"query",transformResult:function(t){return"string"==typeof t?e.parseJSON(t):t},showNoSuggestionNotice:!1,noSuggestionNotice:"No results",orientation:"bottom",forceFixPosition:!1},t.prototype={initialize:function(){var n,o=this,s="."+o.classes.suggestion,i=o.classes.selected,a=o.options;o.element.setAttribute("autocomplete","off"),o.noSuggestionsContainer=e('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0),o.suggestionsContainer=t.utils.createNode(a.containerClass),(n=e(o.suggestionsContainer)).appendTo(a.appendTo||"body"),"auto"!==a.width&&n.css("width",a.width),n.on("mouseover.autocomplete",s,(function(){o.activate(e(this).data("index"))})),n.on("mouseout.autocomplete",(function(){o.selectedIndex=-1,n.children("."+i).removeClass(i)})),n.on("click.autocomplete",s,(function(){o.select(e(this).data("index"))})),n.on("click.autocomplete",(function(){clearTimeout(o.blurTimeoutId)})),o.fixPositionCapture=function(){o.visible&&o.fixPosition()},e(window).on("resize.autocomplete",o.fixPositionCapture),o.el.on("keydown.autocomplete",(function(e){o.onKeyPress(e)})),o.el.on("keyup.autocomplete",(function(e){o.onKeyUp(e)})),o.el.on("blur.autocomplete",(function(){o.onBlur()})),o.el.on("focus.autocomplete",(function(){o.onFocus()})),o.el.on("change.autocomplete",(function(e){o.onKeyUp(e)})),o.el.on("input.autocomplete",(function(e){o.onKeyUp(e)}))},onFocus:function(){var e=this;e.fixPosition(),e.el.val().length>=e.options.minChars&&e.onValueChange()},onBlur:function(){var e=this;e.blurTimeoutId=setTimeout((function(){e.hide()}),200)},abortAjax:function(){var e=this;e.currentRequest&&(e.currentRequest.abort(),e.currentRequest=null)},setOptions:function(t){var n=this,o=e.extend({},n.options,t);n.isLocal=Array.isArray(o.lookup),n.isLocal&&(o.lookup=n.verifySuggestionsFormat(o.lookup)),o.orientation=n.validateOrientation(o.orientation,"bottom"),e(n.suggestionsContainer).css({"max-height":o.maxHeight+"px",width:o.width+"px","z-index":o.zIndex}),this.options=o},clearCache:function(){this.cachedResponse={},this.badQueries=[]},clear:function(){this.clearCache(),this.currentValue="",this.suggestions=[]},disable:function(){var e=this;e.disabled=!0,clearTimeout(e.onChangeTimeout),e.abortAjax()},enable:function(){this.disabled=!1},fixPosition:function(){var t=this,n=e(t.suggestionsContainer),o=n.parent().get(0);if(o===document.body||t.options.forceFixPosition){var s=t.options.orientation,i=n.outerHeight(),a=t.el.outerHeight(),u=t.el.offset(),r={top:u.top,left:u.left};if("auto"===s){var l=e(window).height(),c=e(window).scrollTop(),g=-c+u.top-i,d=c+l-(u.top+a+i);s=Math.max(g,d)===g?"top":"bottom"}if(r.top+="top"===s?-i:a,o!==document.body){var p,h=n.css("opacity");t.visible||n.css("opacity",0).show(),p=n.offsetParent().offset(),r.top-=p.top,r.top+=o.scrollTop,r.left-=p.left,t.visible||n.css("opacity",h).hide()}"auto"===t.options.width&&(r.width=t.el.outerWidth()+"px"),n.css(r)}},isCursorAtEnd:function(){var e,t=this.el.val().length,n=this.element.selectionStart;return"number"==typeof n?n===t:!document.selection||((e=document.selection.createRange()).moveStart("character",-t),t===e.text.length)},onKeyPress:function(e){var t=this;if(t.disabled||t.visible||e.which!==r||!t.currentValue){if(!t.disabled&&t.visible){switch(e.which){case o:t.el.val(t.currentValue),t.hide();break;case u:if(t.hint&&t.options.onHint&&t.isCursorAtEnd()){t.selectHint();break}return;case s:if(t.hint&&t.options.onHint)return void t.selectHint();if(-1===t.selectedIndex)return void t.hide();if(t.select(t.selectedIndex),!1===t.options.tabDisabled)return;break;case i:if(-1===t.selectedIndex)return void t.hide();t.select(t.selectedIndex);break;case a:t.moveUp();break;case r:t.moveDown();break;default:return}e.stopImmediatePropagation(),e.preventDefault()}}else t.suggest()},onKeyUp:function(e){var t=this;if(!t.disabled){switch(e.which){case a:case r:return}clearTimeout(t.onChangeTimeout),t.currentValue!==t.el.val()&&(t.findBestHint(),t.options.deferRequestBy>0?t.onChangeTimeout=setTimeout((function(){t.onValueChange()}),t.options.deferRequestBy):t.onValueChange())}},onValueChange:function(){if(!this.ignoreValueChange){var t=this,n=t.options,o=t.el.val(),s=t.getQuery(o);return t.selection&&t.currentValue!==s&&(t.selection=null,(n.onInvalidateSelection||e.noop).call(t.element)),clearTimeout(t.onChangeTimeout),t.currentValue=o,t.selectedIndex=-1,n.triggerSelectOnValidInput&&t.isExactMatch(s)?void t.select(0):void(s.length<n.minChars?t.hide():t.getSuggestions(s))}this.ignoreValueChange=!1},isExactMatch:function(e){var t=this.suggestions;return 1===t.length&&t[0].value.toLowerCase()===e.toLowerCase()},getQuery:function(t){var n,o=this.options.delimiter;return o?(n=t.split(o),e.trim(n[n.length-1])):t},getSuggestionsLocal:function(t){var n,o=this.options,s=t.toLowerCase(),i=o.lookupFilter,a=parseInt(o.lookupLimit,10);return n={suggestions:e.grep(o.lookup,(function(e){return i(e,t,s)}))},a&&n.suggestions.length>a&&(n.suggestions=n.suggestions.slice(0,a)),n},getSuggestions:function(t){var n,o,s,i,a=this,u=a.options,r=u.serviceUrl;if(u.params[u.paramName]=t,!1!==u.onSearchStart.call(a.element,u.params)){if(o=u.ignoreParams?null:u.params,e.isFunction(u.lookup))return void u.lookup(t,(function(e){a.suggestions=e.suggestions,a.suggest(),u.onSearchComplete.call(a.element,t,e.suggestions)}));a.isLocal?n=a.getSuggestionsLocal(t):(e.isFunction(r)&&(r=r.call(a.element,t)),s=r+"?"+e.param(o||{}),n=a.cachedResponse[s]),n&&Array.isArray(n.suggestions)?(a.suggestions=n.suggestions,a.suggest(),u.onSearchComplete.call(a.element,t,n.suggestions)):a.isBadQuery(t)?u.onSearchComplete.call(a.element,t,[]):(a.abortAjax(),i={url:r,data:o,type:u.type,dataType:u.dataType},e.extend(i,u.ajaxSettings),a.currentRequest=e.ajax(i).done((function(e){var n;a.currentRequest=null,n=u.transformResult(e,t),a.processResponse(n,t,s),u.onSearchComplete.call(a.element,t,n.suggestions)})).fail((function(e,n,o){u.onSearchError.call(a.element,t,e,n,o)})))}},isBadQuery:function(e){if(!this.options.preventBadQueries)return!1;for(var t=this.badQueries,n=t.length;n--;)if(0===e.indexOf(t[n]))return!0;return!1},hide:function(){var t=this,n=e(t.suggestionsContainer);e.isFunction(t.options.onHide)&&t.visible&&t.options.onHide.call(t.element,n),t.visible=!1,t.selectedIndex=-1,clearTimeout(t.onChangeTimeout),e(t.suggestionsContainer).hide(),t.signalHint(null)},suggest:function(){if(this.suggestions.length){var t,n=this,o=n.options,s=o.groupBy,i=o.formatResult,a=n.getQuery(n.currentValue),u=n.classes.suggestion,r=n.classes.selected,l=e(n.suggestionsContainer),c=e(n.noSuggestionsContainer),g=o.beforeRender,d="",p=function(e,n){var i=e.data[s];return t===i?"":(t=i,o.formatGroup(e,t))};return o.triggerSelectOnValidInput&&n.isExactMatch(a)?void n.select(0):(e.each(n.suggestions,(function(e,t){s&&(d+=p(t,0)),d+='<div class="'+u+'" data-index="'+e+'">'+i(t,a,e)+"</div>"})),this.adjustContainerWidth(),c.detach(),l.html(d),e.isFunction(g)&&g.call(n.element,l,n.suggestions),n.fixPosition(),l.show(),o.autoSelectFirst&&(n.selectedIndex=0,l.scrollTop(0),l.children("."+u).first().addClass(r)),n.visible=!0,void n.findBestHint())}this.options.showNoSuggestionNotice?this.noSuggestions():this.hide()},noSuggestions:function(){var t=this,n=t.options.beforeRender,o=e(t.suggestionsContainer),s=e(t.noSuggestionsContainer);this.adjustContainerWidth(),s.detach(),o.empty(),o.append(s),e.isFunction(n)&&n.call(t.element,o,t.suggestions),t.fixPosition(),o.show(),t.visible=!0},adjustContainerWidth:function(){var t,n=this,o=n.options,s=e(n.suggestionsContainer);"auto"===o.width?(t=n.el.outerWidth(),s.css("width",t>0?t:300)):"flex"===o.width&&s.css("width","")},findBestHint:function(){var t=this,n=t.el.val().toLowerCase(),o=null;n&&(e.each(t.suggestions,(function(e,t){var s=0===t.value.toLowerCase().indexOf(n);return s&&(o=t),!s})),t.signalHint(o))},signalHint:function(t){var n="",o=this;t&&(n=o.currentValue+t.value.substr(o.currentValue.length)),o.hintValue!==n&&(o.hintValue=n,o.hint=t,(this.options.onHint||e.noop)(n))},verifySuggestionsFormat:function(t){return t.length&&"string"==typeof t[0]?e.map(t,(function(e){return{value:e,data:null}})):t},validateOrientation:function(t,n){return t=e.trim(t||"").toLowerCase(),-1===e.inArray(t,["auto","bottom","top"])&&(t=n),t},processResponse:function(e,t,n){var o=this,s=o.options;e.suggestions=o.verifySuggestionsFormat(e.suggestions),s.noCache||(o.cachedResponse[n]=e,s.preventBadQueries&&!e.suggestions.length&&o.badQueries.push(t)),t===o.getQuery(o.currentValue)&&(o.suggestions=e.suggestions,o.suggest())},activate:function(t){var n,o=this,s=o.classes.selected,i=e(o.suggestionsContainer),a=i.find("."+o.classes.suggestion);return i.find("."+s).removeClass(s),o.selectedIndex=t,-1!==o.selectedIndex&&a.length>o.selectedIndex?(n=a.get(o.selectedIndex),e(n).addClass(s),n):null},selectHint:function(){var t=this,n=e.inArray(t.hint,t.suggestions);t.select(n)},select:function(e){this.hide(),this.onSelect(e)},moveUp:function(){var t=this;if(-1!==t.selectedIndex)return 0===t.selectedIndex?(e(t.suggestionsContainer).children("."+t.classes.suggestion).first().removeClass(t.classes.selected),t.selectedIndex=-1,t.ignoreValueChange=!1,t.el.val(t.currentValue),void t.findBestHint()):void t.adjustScroll(t.selectedIndex-1)},moveDown:function(){var e=this;e.selectedIndex!==e.suggestions.length-1&&e.adjustScroll(e.selectedIndex+1)},adjustScroll:function(t){var n=this,o=n.activate(t);if(o){var s,i,a,u=e(o).outerHeight();s=o.offsetTop,a=(i=e(n.suggestionsContainer).scrollTop())+n.options.maxHeight-u,s<i?e(n.suggestionsContainer).scrollTop(s):s>a&&e(n.suggestionsContainer).scrollTop(s-n.options.maxHeight+u),n.options.preserveInput||(n.ignoreValueChange=!0,n.el.val(n.getValue(n.suggestions[t].value))),n.signalHint(null)}},onSelect:function(t){var n=this,o=n.options.onSelect,s=n.suggestions[t];n.currentValue=n.getValue(s.value),n.currentValue===n.el.val()||n.options.preserveInput||n.el.val(n.currentValue),n.signalHint(null),n.suggestions=[],n.selection=s,e.isFunction(o)&&o.call(n.element,s)},getValue:function(e){var t,n,o=this.options.delimiter;return o?1===(n=(t=this.currentValue).split(o)).length?e:t.substr(0,t.length-n[n.length-1].length)+e:e},dispose:function(){var t=this;t.el.off(".autocomplete").removeData("autocomplete"),e(window).off("resize.autocomplete",t.fixPositionCapture),e(t.suggestionsContainer).remove()}},e.fn.devbridgeAutocomplete=function(n,o){var s="autocomplete";return arguments.length?this.each((function(){var i=e(this),a=i.data(s);"string"==typeof n?a&&"function"==typeof a[n]&&a[n](o):(a&&a.dispose&&a.dispose(),a=new t(this,n),i.data(s,a))})):this.first().data(s)},e.fn.autocomplete||(e.fn.autocomplete=e.fn.devbridgeAutocomplete)}));
/**
 * Wolmart Plugin - LiveSearch
 * 
 * @requires jquery.autocomplete
 */
'use strict';
window.Wolmart || (window.Wolmart = {});

(function ($) {
	function LiveSearch(e, $selector) {
		if (!$.fn.devbridgeAutocomplete) {
			return;
		}

		if ('undefined' == typeof $selector) {
			$selector = $('.search-wrapper');
		} else {
			$selector = $selector;
		}

		$selector.each(function () {
			var $this = $(this),
				appendTo = $this.find('.live-search-list'),
				searchCat = $this.find('.cat'),
				postType = $this.find('input[name="post_type"]').val(),
				serviceUrl = wolmart_vars.ajax_url + '?action=wolmart_ajax_search&nonce=' +
					wolmart_vars.nonce + (postType ? '&post_type=' + postType : '');

			$this.find('input[type="search"]').devbridgeAutocomplete({
				minChars: 3,
				appendTo: appendTo,
				triggerSelectOnValidInput: false,
				serviceUrl: serviceUrl,
				onSearchStart: function () {
					$this.addClass('skeleton-body');
					appendTo.children().eq(0)
						.html(wolmart_vars.skeleton_screen ? '<div class="skel-pro-search"></div><div class="skel-pro-search"></div><div class="skel-pro-search"></div>' : '<div class="w-loading"><i></i></div>')
						.css({ position: 'relative', display: 'block' });
				},
				onSelect: function (item) {
					if (item.id != -1) {
						window.location.href = item.url;
					}
				},
				onSearchComplete: function (q, suggestions) {
					if (!suggestions.length) {
						appendTo.children().eq(0).hide();
					}
				},
				beforeRender: function (container) {
					$(container).removeAttr('style');
				},
				formatResult: function (item, currentValue) {
					var pattern = '(' + $.Autocomplete.utils.escapeRegExChars(currentValue) + ')',
						html = '';
					if (item.img) {
						html += '<img class="search-image" src="' + item.img + '">';
					}
					html += '<div class="search-info">';
					html += '<div class="search-name">' + item.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>') + '</div>';
					if (item.price) {
						html += '<span class="search-price">' + item.price + '</span>';
					}
					html += '</div>';

					return html;
				}
			});

			if (searchCat.length) {
				var searchForm = $this.find('input[type="search"]').devbridgeAutocomplete();
				searchCat.on('change', function (e) {
					if (searchCat.val() && searchCat.val() != '0') {
						searchForm.setOptions({
							serviceUrl: serviceUrl + '&cat=' + searchCat.val()
						});
					} else {
						searchForm.setOptions({
							serviceUrl: serviceUrl
						});
					}

					searchForm.hide();
					searchForm.onValueChange();
				});
			}
		});
	}

	Wolmart.liveSearch = LiveSearch;
	$(window).on('wolmart_complete', Wolmart.liveSearch);
})(jQuery);
"use strict";window.Wolmart||(window.Wolmart={}),function(t){function e(t,e,a){var i;return function(){var o=this,r=arguments;function n(){a||t.apply(o,r),i=null}i?Wolmart.deleteTimeout(i):a&&t.apply(o,r),i=Wolmart.requestTimeout(n,e||100)}}if(Wolmart.$window=t(window),Wolmart.$body,Wolmart.status="loading",Wolmart.hash=location.hash.indexOf("&")>0?location.hash.substring(0,location.hash.indexOf("&")):location.hash,Wolmart.isIE=navigator.userAgent.indexOf("Trident")>=0,Wolmart.isEdge=navigator.userAgent.indexOf("Edge")>=0,Wolmart.isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),Wolmart.isMobileAndTablet=function(){let t=!1;var e;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t},Wolmart.canvasWidth=Wolmart.isMobileAndTablet?window.outerWidth:window.innerWidth,Wolmart.resizeTimeStamp=0,Wolmart.resizeChanged=!1,Wolmart.scrollbarSize=-1,Wolmart.defaults={stickySidebar:{autoInit:!0,minWidth:991,containerSelector:".sticky-sidebar-wrapper",autoFit:!0,activeClass:"sticky-sidebar-fixed",padding:{top:0,bottom:0}},isotope:{itemsSelector:".grid-item",layoutMode:"masonry",percentPosition:!0,masonry:{columnWidth:".grid-space"},getSortData:{order:"[data-creative-order] parseInt",order_lg:"[data-creative-order-lg] parseInt",order_md:"[data-creative-order-md] parseInt"}},lazyload:{effect:"fadeIn",data_attribute:"lazy",data_srcset:"lazyset",effect_speed:400,failure_limit:1e3,event:"scroll update_lazyload",load:function(){"IMG"==this.tagName?(this.style["padding-top"]="",this.classList.remove("w-lazyload")):(this.classList.contains("elementor-element-populated")||this.classList.contains("elementor-section"))&&(this.style["background-image"]=""),this.removeAttribute("data-lazy"),this.removeAttribute("data-lazyset"),this.removeAttribute("data-sizes")}},sticky:{minWidth:992,maxWidth:2e4,top:!1,bottomOrigin:!1,max_index:1059,scrollMode:!1},animation:{name:"fadeIn",duration:"1.2s",delay:".2s"},stickyMobileBar:{minWidth:0,maxWidth:767,top:150,scrollMode:!0},stickyToolbox:{minWidth:0,maxWidth:767,scrollMode:!0},minipopup:{content:"",delay:4e3}},Wolmart.call=function(t,e){wolmart_vars.a||e?setTimeout(t,e):t()},Wolmart.byId=function(t){return document.getElementById(t)},Wolmart.byTag=function(t,e){return(e||document).getElementsByTagName(t)},Wolmart.byClass=function(t,e){return e?e.getElementsByClassName(t):document.getElementsByClassName(t)},Wolmart.$=function(e,a){return"string"==typeof e&&"string"==typeof a?t(e+" "+a):e instanceof jQuery?e.is(a)||void 0===a?e:e.find(a):void 0!==e&&e?void 0===a?t(e):t(e).find(a):t(a)},Wolmart.getCache=function(){return localStorage[wolmart_vars.wolmart_cache_key]?JSON.parse(localStorage[wolmart_vars.wolmart_cache_key]):{}},Wolmart.setCache=function(t){localStorage[wolmart_vars.wolmart_cache_key]=JSON.stringify(t)},Wolmart.requestTimeout=function(t,e){var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;if(!a)return setTimeout(t,e);e||(e=0);var i,o=new Object;return o.val=a((function r(n){i||(i=n),n-i>=e?t():o.val=a(r)})),o},Wolmart.requestFrame=function(t){return{val:(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame)(t)}},Wolmart.requestInterval=function(t,e,a){var i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;if(!i)return a?setInterval(t,e):setTimeout(t,a);var o,r,n=new Object;return n.val=i((function s(l){o||(o=r=l),!a||l-o<a?l-r>e?(n.val=i(s),t(),r=l):n.val=i(s):t()})),n},Wolmart.deleteTimeout=function(t){if(t){var e=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame;return e?t.val?e(t.val):void 0:clearTimeout(t)}},t.fn.smartresize=function(t){t?this.get(0).addEventListener("resize",e(t),{passive:!0}):this.trigger("smartresize")},t.fn.smartscroll=function(t){t?this.get(0).addEventListener("scroll",e(t),{passive:!0}):this.trigger("smartscroll")},Wolmart.parseOptions=function(t){return"string"==typeof t?JSON.parse(t.replace(/'/g,'"').replace(";","")):{}},Wolmart.isOnScreen=function(t,e,a){var i=window.pageXOffset,o=window.pageYOffset,r=t.getBoundingClientRect(),n=r.left+i,s=r.top+o,l=void 0===e?0:e,m=void 0===a?0:a;return s+r.height+m>=o&&s<=o+window.innerHeight+m&&n+r.width+l>=i&&n<=i+window.innerWidth+l},Wolmart.appear=function(e,a,i){var o=t(e);if(!o.data("observer-init")){var r={rootMargin:"0px 0px 200px 0px",threshold:0,alwaysObserve:!0};return i&&Object.keys(i).length&&(r=t.extend(r,i)),new IntersectionObserver((function(t){for(var e=0;e<t.length;e++){var i=t[e];if(i.intersectionRatio>0)if("string"==typeof a)Function("return "+functionName)();else a.call(i.target)}}),r).observe(e),o.data("observer-init",!0),this}},Wolmart.fitVideoSize=function(e){if(t.fn.fitVids){var a=void 0===a?t(".fit-video"):Wolmart.$(e).find(".fit-video");a.each((function(){var e=t(this),a=e.find("video"),i=a.attr("width"),o=a.attr("height"),r=e.outerWidth();a.css({width:r,height:r/i*o}),window.wp.mediaelement&&window.wp.mediaelement.initialize(),e.fitVids(),e.hasClass("d-none")&&e.removeClass("d-none")})),"loading"==Wolmart.status&&window.addEventListener("resize",(function(){t(".fit-video").fitVids()}),{passive:!0})}},Wolmart.isotopes=function(){function e(e,a){var i=a||t(".grid");i.length&&i.each((function(e){var a=t(this);if(a.attr("data-creative-breaks")&&!a.hasClass("float-grid")){a.children(".grid-item").css({"animation-fill-mode":"none","-webkit-animation-fill-mode":"none"});var i=window.innerWidth,o=JSON.parse(a.attr("data-creative-breaks")),r=a.attr("data-current-break");if(i>=o.lg?i="":i>=o.md&&i<o.lg?i="lg":i<o.md&&(i="md"),i!=r){if(a.data("isotope"))a.isotope({sortBy:"order"+(i?"_"+i:"")}).isotope("layout");else{var n=Wolmart.parseOptions(a.attr("data-grid-options"));n.sortBy="order"+(i?"_"+i:""),a.attr("data-grid-options",JSON.stringify(n))}a.attr("data-current-break",i)}}}))}return function(a,i){t.fn.imagesLoaded&&t.fn.isotope&&(Wolmart.$(a).each((function(){var a=t(this);if(!a.hasClass("grid-float")){var o=t.extend(!0,{},Wolmart.defaults.isotope,Wolmart.parseOptions(this.getAttribute("data-grid-options")),i||{},a.hasClass("masonry")?{horizontalOrder:!0}:{});e(0,a),o.masonry.columnWidth&&!a.children(o.masonry.columnWidth).length&&delete o.masonry.columnWidth,Object.setPrototypeOf(this,HTMLElement.prototype),a.children().each((function(){Object.setPrototypeOf(this,HTMLElement.prototype)})),a.imagesLoaded((function(){a.addClass("isotope-loaded").isotope(o),"undefined"!=typeof elementorFrontend&&a.trigger("resize.waypoints")}))}})),Wolmart.$window.on("resize",e))}}(),Wolmart.stickySidebar=function(e){t.fn.themeSticky&&Wolmart.$(e).each((function(){var e=t(this),a=e.closest(".sidebar"),i=Wolmart.defaults.stickySidebar,o=0;a.hasClass("sidebar-offcanvas")||((a.length?a:e.parent()).addClass("sticky-sidebar-wrapper"),t(".sticky-sidebar > .filter-actions").length||t(".sticky-content.fix-top").each((function(e){if(!t(this).hasClass("sticky-toolbox")){var a=t(this).hasClass("fixed");o+=t(this).addClass("fixed").outerHeight(),a||t(this).removeClass("fixed")}})),t(".sticky-sidebar > .filter-actions").length||t("[data-vce-sticky-element=true]").each((function(e){o+=t(this).outerHeight()})),i.padding.top=o,e.themeSticky(t.extend({},i,Wolmart.parseOptions(e.attr("data-sticky-options")))),Wolmart.$window.on("wolmart_complete",(function(){Wolmart.refreshLayouts(),e.on("click",".nav-link",(function(){setTimeout((function(){e.trigger("recalc.pin")}))}))})))}))},Wolmart.refreshLayouts=function(){t(".sticky-sidebar").trigger("recalc.pin"),Wolmart.$window.trigger("update_lazyload")},Wolmart._lazyload_force=function(t){Wolmart.$(t).each((function(){var t=this.getAttribute("data-lazy");if(t){if("IMG"==this.tagName){var e=this.getAttribute("data-lazyset");e&&(this.setAttribute("srcset",e),this.removeAttribute("data-lazyset")),this.style["padding-top"]="",this.setAttribute("src",t),this.classList.remove("w-lazyload")}else this.style["background-image"]="url("+t+")";this.removeAttribute("data-lazy"),this.removeAttribute("data-lazyset")}}))},Wolmart.lazyload=function(e){t.fn.lazyload&&Wolmart.$(e,"[data-lazy]").lazyload(Wolmart.defaults.lazyload)},Wolmart.initPriceSlider=function(){if(t.fn.slider&&t(".price_slider").length){t("input#min_price, input#max_price").hide(),t(".price_slider, .price_label").show();var e=t(".price_slider_amount #min_price").data("min"),a=t(".price_slider_amount #max_price").data("max"),i=t(".price_slider_amount").data("step")||1,o=t(".price_slider_amount #min_price").val(),r=t(".price_slider_amount #max_price").val();t(".price_slider:not(.ui-slider)").slider({range:!0,animate:!0,min:e,max:a,step:i,values:[o,r],create:function(){t(".price_slider_amount #min_price").val(o),t(".price_slider_amount #max_price").val(r),t(document.body).trigger("price_slider_create",[o,r])},slide:function(e,a){t("input#min_price").val(a.values[0]),t("input#max_price").val(a.values[1]),t(document.body).trigger("price_slider_slide",[a.values[0],a.values[1]])},change:function(e,a){t(document.body).trigger("price_slider_change",[a.values[0],a.values[1]])}})}},Wolmart.doLoading=function(t,e){var a=Wolmart.$(t);void 0===e?a.append('<div class="w-loading"><i></i></div>'):"small"==e?a.append('<div class="w-loading small"><i></i></div>'):"simple"==e&&a.append('<div class="w-loading small"></div>'),"static"==a.css("position")&&Wolmart.$(t).css("position","relative")},Wolmart.endLoading=function(t){Wolmart.$(t).find(".w-loading").remove(),Wolmart.$(t).css("position","")},Wolmart.setCurrentMenuItems=function(e){Wolmart.getUrlParam(location.href,"s")||Wolmart.$(e,'a[href="'+location.origin+location.pathname+'"]').parent("li").each((function(){var e=t(this);e.hasClass("menu-item-object-page")&&(e.addClass("current_page_item").parent().closest(".mobile-menu li").addClass("current_page_parent"),e.parents(".mobile-menu li").addClass("current_page_ancestor")),e.addClass("current-menu-item").parent().closest(".mobile-menu li").addClass("current-menu-parent"),e.parents(".mobile-menu li").addClass("current-menu-ancestor")}))},Wolmart.lazyloadMenu=function(){var e=t(".lazy-menu").map((function(){return this.getAttribute("id").slice(5)})).get();if(e&&e.length){function s(e,a){var i=t(Wolmart.byId("menu-"+e)).removeClass("lazy-menu").children("li");t(a).filter("li").each((function(){var e=t(this),a=i.eq(e.index());a.children("ul").remove(),a.append(e.children("ul"))})),Wolmart.setCurrentMenuItems("#menu-"+e)}var a=Wolmart.getCache(),i=a.menus?a.menus:{},o=[];if(wolmart_vars.lazyload_menu&&a.menus&&a.menuLastTime&&wolmart_vars.menu_last_time&&parseInt(a.menuLastTime)>=parseInt(wolmart_vars.menu_last_time))for(var r in e){var n=e[r];i[n]?s(n,i[n]):o.push(n)}else o=e;o.length&&t.ajax({type:"POST",url:wolmart_vars.ajax_url,dataType:"json",data:{action:"wolmart_load_menu",menus:o,nonce:wolmart_vars.nonce,load_menu:!0},success:function(t){if(t)for(var e in t){var o=t[e];o&&(s(e,o=o.replace(/(class=".*)current_page_parent\s*(.*")/,"$1$2")),i[e]=o)}Wolmart.menu&&Wolmart.menu.addToggleButtons(".collapsible-menu li"),Wolmart.showEditPageTooltip&&Wolmart.showEditPageTooltip(),a.menus=i,a.menuLastTime=wolmart_vars.menu_last_time,Wolmart.setCache(a)}})}},Wolmart.disableMobileAnimations=function(){t(document.body).hasClass("wolmart-disable-mobile-animation")&&window.innerWidth<768&&t(".elementor-invisible").removeAttr("data-settings").removeData("settings").removeClass("elementor-invisible").add(t(".appear-animate").removeClass("appear-animate")).add(t("[data-vce-animate]").removeAttr("data-vce-animate").removeData("vce-animate"))},Wolmart.initLayout=function(){Wolmart.fitVideoSize(),Wolmart.isotopes(".grid"),Wolmart.stickySidebar(".sticky-sidebar"),Wolmart.lazyload(),Wolmart.$body.one("mouseenter touchstart",".lazy-menu",Wolmart.lazyloadMenu),Wolmart.initPriceSlider(),"loading"==Wolmart.status&&(Wolmart.status="load"),Wolmart.$window.trigger("wolmart_load"),wolmart_vars.resource_after_load?Wolmart.call(Wolmart.initAsync):Wolmart.initAsync(),Wolmart.$body.find(".product").length&&Wolmart.$(document).trigger("yith_infs_added_elem")},Wolmart.disableMobileAnimations(),"function"==typeof Swiper)Wolmart.Swiper=Swiper;else if(!(t(document.body).hasClass("wolmart-disable-mobile-slider")&&"ontouchstart"in document&&window.innerWidth<1200)){var a;if(!(a=document.getElementById("swiper-js"))&&wolmart_vars.swiper_url){var i=document.scripts[0];(a=document.createElement("script")).src=wolmart_vars.swiper_url,a.async=!0,a=i.parentNode.insertBefore(a,i)}a&&a.addEventListener("load",(function(){Wolmart.Swiper=Swiper}))}t(window).on("load",(function(){Wolmart.$body=t(document.body).addClass("loaded"),t("html").addClass("ontouchstart"in document?"touchable":"untouchable"),t.fn.imagesLoaded&&"function"==typeof Wolmart.skeleton?wolmart_vars.resource_after_load?Wolmart.call((function(){Wolmart.skeleton(t(".skeleton-body"),Wolmart.initLayout)})):Wolmart.skeleton(t(".skeleton-body"),Wolmart.initLayout):wolmart_vars.resource_after_load?Wolmart.call(Wolmart.initLayout):Wolmart.initLayout()}))}(jQuery);
"use strict";window.Wolmart=window.Wolmart||{},function(t){var n={init:function(){Wolmart.$body.on("click",".comments .page-numbers",this.loadComments)},loadComments:function(n){var a,o=t(n.target).closest(".page-numbers"),e=o.closest(".comments").find(".commentlist"),l=o.closest(".pagination"),s=o.attr("href");a=o.hasClass("prev")?parseInt(o.sibling("current").text())-1:o.hasClass("next")?parseInt(o.sibling("current").text())+1:parseInt(o.text()),n.preventDefault(),e.find("#cancel-comment-reply-link").length&&e.find("#cancel-comment-reply-link")[0].click(),e.addClass("loading"),Wolmart.doLoading(l,"small"),t.post(wolmart_vars.ajax_url,{action:"wolmart_comments_pagination",nonce:wolmart_vars.nonce,load_mobile_menu:!0,page:a,post:1},(function(t){t&&(history.pushState({},"",s),e.html(t.html),l.html(t.pagination))})).always((function(){e.removeClass("loading"),Wolmart.endLoading(l)}))}};Wolmart.CommentsPagination=n}(jQuery);
"use strict";window.Wolmart||(window.Wolmart={}),function(n){var o={init:function(){var n=this;Wolmart.$body.find("form.cart").on("click",".single_buy_now_button",(function(o){o.preventDefault(),n.buyNow(o.target)})),Wolmart.$body.find(".variations_form").on("hide_variation",(function(o){o.preventDefault(),n.disableBuyNow()})),Wolmart.$body.find(".variations_form").on("show_variation",(function(o,t,i){o.preventDefault(),n.enableBuyNow(t,i)}))},buyNow:function(o){var t=n(o).closest("form.cart");n(o).is(":disabled")?n("html, body").animate({scrollTop:n(o).offset().top-200},600):(t.append('<input type="hidden" value="true" name="buy_now" />'),t.find(".single_add_to_cart_button").addClass("has_buy_now"),t.find(".single_add_to_cart_button").trigger("click"))},disableBuyNow:function(o){n(".variations_form").find(".single_buy_now_button").addClass("disabled wc-variation-selection-needed")},enableBuyNow:function(o,t){t?n(".variations_form").find(".single_buy_now_button").removeClass("disabled wc-variation-selection-needed"):n(".variations_form").find(".single_buy_now_button").addClass("disabled wc-variation-selection-needed")}};Wolmart.BuyNow=o,Wolmart.$window.on("wolmart_complete",(function(){Wolmart.BuyNow.init()}))}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

 // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

}(window.jQuery);


/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('dokan-alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('dokan-close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('dokan-closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);


/*!
 * jQuery Validation Plugin v1.19.5
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2022 Jörn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.extend( $.fn, {

	// https://jqueryvalidation.org/validate/
	validate: function( options ) {

		// If nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// Check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.on( "click.validate", ":submit", function( event ) {

				// Track the used submit button to properly handle scripted
				// submits later.
				validator.submitButton = event.currentTarget;

				// Allow suppressing validation by adding a cancel class to the submit button
				if ( $( this ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			} );

			// Validate the form on submit
			this.on( "submit.validate", function( event ) {
				if ( validator.settings.debug ) {

					// Prevent form submit to be able to see console output
					event.preventDefault();
				}

				function handle() {
					var hidden, result;

					// Insert a hidden input as a replacement for the missing submit button
					// The hidden input is inserted in two cases:
					//   - A user defined a `submitHandler`
					//   - There was a pending request due to `remote` method and `stopRequest()`
					//     was called to submit the form in case it's valid
					if ( validator.submitButton && ( validator.settings.submitHandler || validator.formSubmitted ) ) {
						hidden = $( "<input type='hidden'/>" )
							.attr( "name", validator.submitButton.name )
							.val( $( validator.submitButton ).val() )
							.appendTo( validator.currentForm );
					}

					if ( validator.settings.submitHandler && !validator.settings.debug ) {
						result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( hidden ) {

							// And clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						if ( result !== undefined ) {
							return result;
						}
						return false;
					}
					return true;
				}

				// Prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			} );
		}

		return validator;
	},

	// https://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator, errorList;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			errorList = [];
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
				if ( !valid ) {
					errorList = errorList.concat( validator.errorList );
				}
			} );
			validator.errorList = errorList;
		}
		return valid;
	},

	// https://jqueryvalidation.org/rules/
	rules: function( command, argument ) {
		var element = this[ 0 ],
			isContentEditable = typeof this.attr( "contenteditable" ) !== "undefined" && this.attr( "contenteditable" ) !== "false",
			settings, staticRules, existingRules, data, param, filtered;

		// If nothing is selected, return empty object; can't chain anyway
		if ( element == null ) {
			return;
		}

		if ( !element.form && isContentEditable ) {
			element.form = this.closest( "form" )[ 0 ];
			element.name = this.attr( "name" );
		}

		if ( element.form == null ) {
			return;
		}

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );

				// Remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
				} );
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// Make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
		}

		// Make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param } );
		}

		return data;
	}
} );

// JQuery trim is deprecated, provide a trim method based on String.prototype.trim
var trim = function( str ) {

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim#Polyfill
	return str.replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "" );
};

// Custom selectors
$.extend( $.expr.pseudos || $.expr[ ":" ], {		// '|| $.expr[ ":" ]' here enables backwards compatibility to jQuery 1.7. Can be removed when dropping jQ 1.7.x support

	// https://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !trim( "" + $( a ).val() );
	},

	// https://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		var val = $( a ).val();
		return val !== null && !!trim( "" + val );
	},

	// https://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
} );

// Constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// https://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( params === undefined ) {
		return source;
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		} );
	} );
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		pendingClass: "pending",
		validClass: "valid",
		errorElement: "label",
		focusCleanup: false,
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// Hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {

			// Avoid revalidate the field when pressing one of the following keys
			// Shift       => 16
			// Ctrl        => 17
			// Alt         => 18
			// Caps lock   => 20
			// End         => 35
			// Home        => 36
			// Left arrow  => 37
			// Up arrow    => 38
			// Right arrow => 39
			// Down arrow  => 40
			// Insert      => 45
			// Num lock    => 144
			// AltGr key   => 225
			var excludedKeys = [
				16, 17, 18, 20, 35, 36, 37,
				38, 39, 40, 45, 144, 225
			];

			if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
				return;
			} else if ( element.name in this.submitted || element.name in this.invalid ) {
				this.element( element );
			}
		},
		onclick: function( element ) {

			// Click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// Or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// https://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
		step: $.validator.format( "Please enter a multiple of {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var currentForm = this.currentForm,
				groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				} );
			} );
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			} );

			function delegate( event ) {
				var isContentEditable = typeof $( this ).attr( "contenteditable" ) !== "undefined" && $( this ).attr( "contenteditable" ) !== "false";

				// Set form expando on contenteditable
				if ( !this.form && isContentEditable ) {
					this.form = $( this ).closest( "form" )[ 0 ];
					this.name = $( this ).attr( "name" );
				}

				// Ignore the element if it belongs to another form. This will happen mainly
				// when setting the `form` attribute of an input to the id of another form.
				if ( currentForm !== this.form ) {
					return;
				}

				var validator = $.data( this.form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this, event );
				}
			}

			$( this.currentForm )
				.on( "focusin.validate focusout.validate keyup.validate",
					":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
					"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
					"[type='radio'], [type='checkbox'], [contenteditable], [type='button']", delegate )

				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
			}
		},

		// https://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend( {}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// https://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				v = this,
				result = true,
				rs, group;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				// If this element is grouped, then validate all group elements already
				// containing a value
				group = this.groups[ checkElement.name ];
				if ( group ) {
					$.each( this.groups, function( name, testgroup ) {
						if ( testgroup === group && name !== checkElement.name ) {
							cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
							if ( cleanElement && cleanElement.name in v.invalid ) {
								v.currentElements.push( cleanElement );
								result = v.check( cleanElement ) && result;
							}
						}
					} );
				}

				rs = this.check( checkElement ) !== false;
				result = result && rs;
				if ( rs ) {
					this.invalid[ checkElement.name ] = false;
				} else {
					this.invalid[ checkElement.name ] = true;
				}

				if ( !this.numberOfInvalids() ) {

					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();

				// Add aria-invalid status for screen readers
				$( element ).attr( "aria-invalid", !rs );
			}

			return result;
		},

		// https://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				var validator = this;

				// Add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = $.map( this.errorMap, function( message, name ) {
					return {
						message: message,
						element: validator.findByName( name )[ 0 ]
					};
				} );

				// Remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				} );
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// https://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.invalid = {};
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			var elements = this.elements()
				.removeData( "previousValue" )
				.removeAttr( "aria-invalid" );

			this.resetElements( elements );
		},

		resetElements: function( elements ) {
			var i;

			if ( this.settings.unhighlight ) {
				for ( i = 0; elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ],
						this.settings.errorClass, "" );
					this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
				}
			} else {
				elements
					.removeClass( this.settings.errorClass )
					.removeClass( this.settings.validClass );
			}
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {

				// This check allows counting elements with empty error
				// message as invalid elements
				if ( obj[ i ] !== undefined && obj[ i ] !== null && obj[ i ] !== false ) {
					count++;
				}
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
					.filter( ":visible" )
					.trigger( "focus" )

					// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {

					// Ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			} ).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// Select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea, [contenteditable]" )
			.not( ":submit, :reset, :image, :disabled" )
			.not( this.settings.ignore )
			.filter( function() {
				var name = this.name || $( this ).attr( "name" ); // For contenteditable
				var isContentEditable = typeof $( this ).attr( "contenteditable" ) !== "undefined" && $( this ).attr( "contenteditable" ) !== "false";

				if ( !name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// Set form expando on contenteditable
				if ( isContentEditable ) {
					this.form = $( this ).closest( "form" )[ 0 ];
					this.name = name;
				}

				// Ignore elements that belong to other/nested forms
				if ( this.form !== validator.currentForm ) {
					return false;
				}

				// Select only the first element for each name, and only those with rules specified
				if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ name ] = true;
				return true;
			} );
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		resetInternals: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
		},

		reset: function() {
			this.resetInternals();
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var $element = $( element ),
				type = element.type,
				isContentEditable = typeof $element.attr( "contenteditable" ) !== "undefined" && $element.attr( "contenteditable" ) !== "false",
				val, idx;

			if ( type === "radio" || type === "checkbox" ) {
				return this.findByName( element.name ).filter( ":checked" ).val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? "NaN" : $element.val();
			}

			if ( isContentEditable ) {
				val = $element.text();
			} else {
				val = $element.val();
			}

			if ( type === "file" ) {

				// Modern browser (chrome & safari)
				if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
					return val.substr( 12 );
				}

				// Legacy browsers
				// Unix-based path
				idx = val.lastIndexOf( "/" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Windows-based path
				idx = val.lastIndexOf( "\\" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Just the file name
				return val;
			}

			if ( typeof val === "string" ) {
				return val.replace( /\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				} ).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule, normalizer;

			// Prioritize the local normalizer defined for this element over the global one
			// if the former exists, otherwise user the global one in case it exists.
			if ( typeof rules.normalizer === "function" ) {
				normalizer = rules.normalizer;
			} else if (	typeof this.settings.normalizer === "function" ) {
				normalizer = this.settings.normalizer;
			}

			// If normalizer is defined, then call it to retreive the changed value instead
			// of using the real one.
			// Note that `this` in the normalizer is `element`.
			if ( normalizer ) {
				val = normalizer.call( element, val );

				// Delete the normalizer from rules to avoid treating it as a pre-defined method.
				delete rules.normalizer;
			}

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {
					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// If a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					if ( e instanceof TypeError ) {
						e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
					}

					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// Return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// Return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ] );
		},

		// Return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++ ) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		// The second parameter 'rule' used to be a string, and extended to an object literal
		// of the following form:
		// rule = {
		//     method: "method name",
		//     parameters: "the given method parameters"
		// }
		//
		// The old behavior still supported, kept to maintain backward compatibility with
		// old code, and will be removed in the next major release.
		defaultMessage: function( element, rule ) {
			if ( typeof rule === "string" ) {
				rule = { method: rule };
			}

			var message = this.findDefined(
					this.customMessage( element.name, rule.method ),
					this.customDataMessage( element, rule.method ),

					// 'title' is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[ rule.method ],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}

			return message;
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule );

			this.errorList.push( {
				message: message,
				element: element,
				method: rule.method
			} );

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map( function() {
				return this.element;
			} );
		},

		showLabel: function( element, message ) {
			var place, group, errorID, v,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );

			if ( error.length ) {

				// Refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// Replace message on existing label
				error.html( message );
			} else {

				// Create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass )
					.html( message || "" );

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {

					// Make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement.call( this, place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {

					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );

					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby
				} else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
					errorID = error.attr( "id" );

					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {

						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						v = this;
						$.each( v.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						} );
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.escapeCssMeta( this.idOrName( element ) ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";

			// 'aria-describedby' should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + this.escapeCssMeta( describer )
					.replace( /\s+/g, ", #" );
			}

			return this
				.errors()
				.filter( selector );
		},

		// See https://api.jquery.com/category/selectors/, for CSS
		// meta-characters that should be escaped in order to be used with JQuery
		// as a literal part of a name/id or any selector.
		escapeCssMeta: function( string ) {
			if ( string === undefined ) {
				return "";
			}

			return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {

			// If radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name );
			}

			// Always apply ignore filter
			return $( element ).not( this.settings.ignore )[ 0 ];
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				$( element ).addClass( this.settings.pendingClass );
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;

			// Sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			$( element ).removeClass( this.settings.pendingClass );
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() && this.pendingRequest === 0 ) {
				$( this.currentForm ).trigger( "submit" );

				// Remove the hidden input that was used as a replacement for the
				// missing submit button. The hidden input is added by `handle()`
				// to ensure that the value of the used submit button is passed on
				// for scripted submits triggered by this method
				if ( this.submitButton ) {
					$( "input:hidden[name='" + this.submitButton.name + "']", this.currentForm ).remove();
				}

				this.formSubmitted = false;
			} else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
				this.formSubmitted = false;
			}
		},

		previousValue: function( element, method ) {
			method = typeof method === "string" && method || "remote";

			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, { method: method } )
			} );
		},

		// Cleans up all forms and elements, removes validator-specific events
		destroy: function() {
			this.resetForm();

			$( this.currentForm )
				.off( ".validate" )
				.removeData( "validator" )
				.find( ".validate-equalTo-blur" )
					.off( ".validate-equalTo" )
					.removeClass( "validate-equalTo-blur" )
				.find( ".validate-lessThan-blur" )
					.off( ".validate-lessThan" )
					.removeClass( "validate-lessThan-blur" )
				.find( ".validate-lessThanEqual-blur" )
					.off( ".validate-lessThanEqual" )
					.removeClass( "validate-lessThanEqual-blur" )
				.find( ".validate-greaterThanEqual-blur" )
					.off( ".validate-greaterThanEqual" )
					.removeClass( "validate-greaterThanEqual-blur" )
				.find( ".validate-greaterThan-blur" )
					.off( ".validate-greaterThan" )
					.removeClass( "validate-greaterThan-blur" );
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ] );
				}
			} );
		}
		return rules;
	},

	normalizeAttributeRule: function( rules, type, method, value ) {

		// Convert the value to a number for number inputs, and for text for backwards compability
		// allows type="date" and others to be compared as strings
		if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
			value = Number( value );

			// Support Opera Mini, which returns NaN for undefined minlength
			if ( isNaN( value ) ) {
				value = undefined;
			}
		}

		if ( value || value === 0 ) {
			rules[ method ] = value;
		} else if ( type === method && type !== "range" ) {

			// Exception: the jquery validate 'range' method
			// does not test for the html5 'range' type
			rules[ type === "date" ? "dateISO" : method ] = true;
		}
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// Support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );

				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}

				// Force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}

		// 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );

			// Cast empty attributes like `data-rule-required` to `true`
			if ( value === "" ) {
				value = true;
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {

		// Handle dependency check
		$.each( rules, function( prop, val ) {

			// Ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					$.data( element.form, "validator" ).resetElements( $( element ) );
					delete rules[ prop ];
				}
			}
		} );

		// Evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = typeof parameter === "function" && rule !== "normalizer" ? parameter( element ) : parameter;
		} );

		// Clean number parameters
		$.each( [ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		} );
		$.each( [ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( Array.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
				}
			}
		} );

		if ( $.validator.autoCreateRanges ) {

			// Auto-create ranges
			if ( rules.min != null && rules.max != null ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength != null && rules.maxlength != null ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			} );
			data = transformed;
		}
		return data;
	},

	// https://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	// https://jqueryvalidation.org/jQuery.validator.methods/
	methods: {

		// https://jqueryvalidation.org/required-method/
		required: function( value, element, param ) {

			// Check if dependency is met
			if ( !this.depend( param, element ) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {

				// Could be an array for select-multiple or a string, both are fine this way
				var val = $( element ).val();
				return val && val.length > 0;
			}
			if ( this.checkable( element ) ) {
				return this.getLength( value, element ) > 0;
			}
			return value !== undefined && value !== null && value.length > 0;
		},

		// https://jqueryvalidation.org/email-method/
		email: function( value, element ) {

			// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
			// Retrieved 2014-01-14
			// If you have a problem with this implementation, report a bug against the above spec
			// Or use custom methods to implement your own email validation
			return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},

		// https://jqueryvalidation.org/url-method/
		url: function( value, element ) {

			// Copyright (c) 2010-2013 Diego Perini, MIT licensed
			// https://gist.github.com/dperini/729294
			// see also https://mathiasbynens.be/demo/url-regex
			// modified to allow protocol-relative URLs
			return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})+(?::(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
		},

		// https://jqueryvalidation.org/date-method/
		date: ( function() {
			var called = false;

			return function( value, element ) {
				if ( !called ) {
					called = true;
					if ( this.settings.debug && window.console ) {
						console.warn(
							"The `date` method is deprecated and will be removed in version '2.0.0'.\n" +
							"Please don't use it, since it relies on the Date constructor, which\n" +
							"behaves very differently across browsers and locales. Use `dateISO`\n" +
							"instead or one of the locale specific methods in `localizations/`\n" +
							"and `additional-methods.js`."
						);
					}
				}

				return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
			};
		}() ),

		// https://jqueryvalidation.org/dateISO-method/
		dateISO: function( value, element ) {
			return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
		},

		// https://jqueryvalidation.org/number-method/
		number: function( value, element ) {
			return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},

		// https://jqueryvalidation.org/digits-method/
		digits: function( value, element ) {
			return this.optional( element ) || /^\d+$/.test( value );
		},

		// https://jqueryvalidation.org/minlength-method/
		minlength: function( value, element, param ) {
			var length = Array.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length >= param;
		},

		// https://jqueryvalidation.org/maxlength-method/
		maxlength: function( value, element, param ) {
			var length = Array.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length <= param;
		},

		// https://jqueryvalidation.org/rangelength-method/
		rangelength: function( value, element, param ) {
			var length = Array.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
		},

		// https://jqueryvalidation.org/min-method/
		min: function( value, element, param ) {
			return this.optional( element ) || value >= param;
		},

		// https://jqueryvalidation.org/max-method/
		max: function( value, element, param ) {
			return this.optional( element ) || value <= param;
		},

		// https://jqueryvalidation.org/range-method/
		range: function( value, element, param ) {
			return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
		},

		// https://jqueryvalidation.org/step-method/
		step: function( value, element, param ) {
			var type = $( element ).attr( "type" ),
				errorMessage = "Step attribute on input type " + type + " is not supported.",
				supportedTypes = [ "text", "number", "range" ],
				re = new RegExp( "\\b" + type + "\\b" ),
				notSupported = type && !re.test( supportedTypes.join() ),
				decimalPlaces = function( num ) {
					var match = ( "" + num ).match( /(?:\.(\d+))?$/ );
					if ( !match ) {
						return 0;
					}

					// Number of digits right of decimal point.
					return match[ 1 ] ? match[ 1 ].length : 0;
				},
				toInt = function( num ) {
					return Math.round( num * Math.pow( 10, decimals ) );
				},
				valid = true,
				decimals;

			// Works only for text, number and range input types
			// TODO find a way to support input types date, datetime, datetime-local, month, time and week
			if ( notSupported ) {
				throw new Error( errorMessage );
			}

			decimals = decimalPlaces( param );

			// Value can't have too many decimals
			if ( decimalPlaces( value ) > decimals || toInt( value ) % toInt( param ) !== 0 ) {
				valid = false;
			}

			return this.optional( element ) || valid;
		},

		// https://jqueryvalidation.org/equalTo-method/
		equalTo: function( value, element, param ) {

			// Bind to the blur event of the target in order to revalidate whenever the target field is updated
			var target = $( param );
			if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
				target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
					$( element ).valid();
				} );
			}
			return value === target.val();
		},

		// https://jqueryvalidation.org/remote-method/
		remote: function( value, element, param, method ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}

			method = typeof method === "string" && method || "remote";

			var previous = this.previousValue( element, method ),
				validator, data, optionDataString;

			if ( !this.settings.messages[ element.name ] ) {
				this.settings.messages[ element.name ] = {};
			}
			previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
			this.settings.messages[ element.name ][ method ] = previous.message;

			param = typeof param === "string" && { url: param } || param;
			optionDataString = $.param( $.extend( { data: value }, param.data ) );
			if ( previous.old === optionDataString ) {
				return previous.valid;
			}

			previous.old = optionDataString;
			validator = this;
			this.startRequest( element );
			data = {};
			data[ element.name ] = value;
			$.ajax( $.extend( true, {
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				context: validator.currentForm,
				success: function( response ) {
					var valid = response === true || response === "true",
						errors, message, submitted;

					validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
					if ( valid ) {
						submitted = validator.formSubmitted;
						validator.resetInternals();
						validator.toHide = validator.errorsFor( element );
						validator.formSubmitted = submitted;
						validator.successList.push( element );
						validator.invalid[ element.name ] = false;
						validator.showErrors();
					} else {
						errors = {};
						message = response || validator.defaultMessage( element, { method: method, parameters: value } );
						errors[ element.name ] = previous.message = message;
						validator.invalid[ element.name ] = true;
						validator.showErrors( errors );
					}
					previous.valid = valid;
					validator.stopRequest( element, valid );
				}
			}, param ) );
			return "pending";
		}
	}

} );

// Ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
	ajax;

// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
	$.ajaxPrefilter( function( settings, _, xhr ) {
		var port = settings.port;
		if ( settings.mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = xhr;
		}
	} );
} else {

	// Proxy ajax
	ajax = $.ajax;
	$.ajax = function( settings ) {
		var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
			port = ( "port" in settings ? settings : $.ajaxSettings ).port;
		if ( mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = ajax.apply( this, arguments );
			return pendingRequests[ port ];
		}
		return ajax.apply( this, arguments );
	};
}
return $;
}));
/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/daterangepicker@3.1.0/daterangepicker.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(t,e){if("function"==typeof define&&define.amd)define(["moment","jquery"],function(t,a){return a.fn||(a.fn={}),"function"!=typeof t&&t.hasOwnProperty("default")&&(t=t.default),e(t,a)});else if("object"==typeof module&&module.exports){var a="undefined"!=typeof window?window.jQuery:void 0;a||(a=require("jquery")).fn||(a.fn={});var i="undefined"!=typeof window&&void 0!==window.moment?window.moment:require("moment");module.exports=e(i,a)}else t.daterangepicker=e(t.moment,t.jQuery)}(this,function(t,e){var a=function(a,i,s){if(this.parentEl="body",this.element=e(a),this.startDate=t().startOf("day"),this.endDate=t().endOf("day"),this.minDate=!1,this.maxDate=!1,this.maxSpan=!1,this.autoApply=!1,this.singleDatePicker=!1,this.showDropdowns=!1,this.minYear=t().subtract(100,"year").format("YYYY"),this.maxYear=t().add(100,"year").format("YYYY"),this.showWeekNumbers=!1,this.showISOWeekNumbers=!1,this.showCustomRangeLabel=!0,this.timePicker=!1,this.timePicker24Hour=!1,this.timePickerIncrement=1,this.timePickerSeconds=!1,this.linkedCalendars=!0,this.autoUpdateInput=!0,this.alwaysShowCalendars=!1,this.ranges={},this.opens="right",this.element.hasClass("pull-right")&&(this.opens="left"),this.drops="down",this.element.hasClass("dropup")&&(this.drops="up"),this.buttonClasses="btn btn-sm",this.applyButtonClasses="btn-primary",this.cancelButtonClasses="btn-default",this.locale={direction:"ltr",format:t.localeData().longDateFormat("L"),separator:" - ",applyLabel:"Apply",cancelLabel:"Cancel",weekLabel:"W",customRangeLabel:"Custom Range",daysOfWeek:t.weekdaysMin(),monthNames:t.monthsShort(),firstDay:t.localeData().firstDayOfWeek()},this.callback=function(){},this.isShowing=!1,this.leftCalendar={},this.rightCalendar={},"object"==typeof i&&null!==i||(i={}),"string"==typeof(i=e.extend(this.element.data(),i)).template||i.template instanceof e||(i.template='<div class="daterangepicker"><div class="ranges"></div><div class="drp-calendar left"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-calendar right"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-buttons"><span class="drp-selected"></span><button class="cancelBtn" type="button"></button><button class="applyBtn" disabled="disabled" type="button"></button> </div></div>'),this.parentEl=i.parentEl&&e(i.parentEl).length?e(i.parentEl):e(this.parentEl),this.container=e(i.template).appendTo(this.parentEl),"object"==typeof i.locale&&("string"==typeof i.locale.direction&&(this.locale.direction=i.locale.direction),"string"==typeof i.locale.format&&(this.locale.format=i.locale.format),"string"==typeof i.locale.separator&&(this.locale.separator=i.locale.separator),"object"==typeof i.locale.daysOfWeek&&(this.locale.daysOfWeek=i.locale.daysOfWeek.slice()),"object"==typeof i.locale.monthNames&&(this.locale.monthNames=i.locale.monthNames.slice()),"number"==typeof i.locale.firstDay&&(this.locale.firstDay=i.locale.firstDay),"string"==typeof i.locale.applyLabel&&(this.locale.applyLabel=i.locale.applyLabel),"string"==typeof i.locale.cancelLabel&&(this.locale.cancelLabel=i.locale.cancelLabel),"string"==typeof i.locale.weekLabel&&(this.locale.weekLabel=i.locale.weekLabel),"string"==typeof i.locale.customRangeLabel)){(p=document.createElement("textarea")).innerHTML=i.locale.customRangeLabel;var n=p.value;this.locale.customRangeLabel=n}if(this.container.addClass(this.locale.direction),"string"==typeof i.startDate&&(this.startDate=t(i.startDate,this.locale.format)),"string"==typeof i.endDate&&(this.endDate=t(i.endDate,this.locale.format)),"string"==typeof i.minDate&&(this.minDate=t(i.minDate,this.locale.format)),"string"==typeof i.maxDate&&(this.maxDate=t(i.maxDate,this.locale.format)),"object"==typeof i.startDate&&(this.startDate=t(i.startDate)),"object"==typeof i.endDate&&(this.endDate=t(i.endDate)),"object"==typeof i.minDate&&(this.minDate=t(i.minDate)),"object"==typeof i.maxDate&&(this.maxDate=t(i.maxDate)),this.minDate&&this.startDate.isBefore(this.minDate)&&(this.startDate=this.minDate.clone()),this.maxDate&&this.endDate.isAfter(this.maxDate)&&(this.endDate=this.maxDate.clone()),"string"==typeof i.applyButtonClasses&&(this.applyButtonClasses=i.applyButtonClasses),"string"==typeof i.applyClass&&(this.applyButtonClasses=i.applyClass),"string"==typeof i.cancelButtonClasses&&(this.cancelButtonClasses=i.cancelButtonClasses),"string"==typeof i.cancelClass&&(this.cancelButtonClasses=i.cancelClass),"object"==typeof i.maxSpan&&(this.maxSpan=i.maxSpan),"object"==typeof i.dateLimit&&(this.maxSpan=i.dateLimit),"string"==typeof i.opens&&(this.opens=i.opens),"string"==typeof i.drops&&(this.drops=i.drops),"boolean"==typeof i.showWeekNumbers&&(this.showWeekNumbers=i.showWeekNumbers),"boolean"==typeof i.showISOWeekNumbers&&(this.showISOWeekNumbers=i.showISOWeekNumbers),"string"==typeof i.buttonClasses&&(this.buttonClasses=i.buttonClasses),"object"==typeof i.buttonClasses&&(this.buttonClasses=i.buttonClasses.join(" ")),"boolean"==typeof i.showDropdowns&&(this.showDropdowns=i.showDropdowns),"number"==typeof i.minYear&&(this.minYear=i.minYear),"number"==typeof i.maxYear&&(this.maxYear=i.maxYear),"boolean"==typeof i.showCustomRangeLabel&&(this.showCustomRangeLabel=i.showCustomRangeLabel),"boolean"==typeof i.singleDatePicker&&(this.singleDatePicker=i.singleDatePicker,this.singleDatePicker&&(this.endDate=this.startDate.clone())),"boolean"==typeof i.timePicker&&(this.timePicker=i.timePicker),"boolean"==typeof i.timePickerSeconds&&(this.timePickerSeconds=i.timePickerSeconds),"number"==typeof i.timePickerIncrement&&(this.timePickerIncrement=i.timePickerIncrement),"boolean"==typeof i.timePicker24Hour&&(this.timePicker24Hour=i.timePicker24Hour),"boolean"==typeof i.autoApply&&(this.autoApply=i.autoApply),"boolean"==typeof i.autoUpdateInput&&(this.autoUpdateInput=i.autoUpdateInput),"boolean"==typeof i.linkedCalendars&&(this.linkedCalendars=i.linkedCalendars),"function"==typeof i.isInvalidDate&&(this.isInvalidDate=i.isInvalidDate),"function"==typeof i.isCustomDate&&(this.isCustomDate=i.isCustomDate),"boolean"==typeof i.alwaysShowCalendars&&(this.alwaysShowCalendars=i.alwaysShowCalendars),0!=this.locale.firstDay)for(var r=this.locale.firstDay;r>0;)this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()),r--;var o,h,l;if(void 0===i.startDate&&void 0===i.endDate&&e(this.element).is(":text")){var c=e(this.element).val(),d=c.split(this.locale.separator);o=h=null,2==d.length?(o=t(d[0],this.locale.format),h=t(d[1],this.locale.format)):this.singleDatePicker&&""!==c&&(o=t(c,this.locale.format),h=t(c,this.locale.format)),null!==o&&null!==h&&(this.setStartDate(o),this.setEndDate(h))}if("object"==typeof i.ranges){for(l in i.ranges){o="string"==typeof i.ranges[l][0]?t(i.ranges[l][0],this.locale.format):t(i.ranges[l][0]),h="string"==typeof i.ranges[l][1]?t(i.ranges[l][1],this.locale.format):t(i.ranges[l][1]),this.minDate&&o.isBefore(this.minDate)&&(o=this.minDate.clone());var m=this.maxDate;if(this.maxSpan&&m&&o.clone().add(this.maxSpan).isAfter(m)&&(m=o.clone().add(this.maxSpan)),m&&h.isAfter(m)&&(h=m.clone()),!(this.minDate&&h.isBefore(this.minDate,this.timepicker?"minute":"day")||m&&o.isAfter(m,this.timepicker?"minute":"day"))){var p;(p=document.createElement("textarea")).innerHTML=l;n=p.value;this.ranges[n]=[o,h]}}var f="<ul>";for(l in this.ranges)f+='<li data-range-key="'+l+'">'+l+"</li>";this.showCustomRangeLabel&&(f+='<li data-range-key="'+this.locale.customRangeLabel+'">'+this.locale.customRangeLabel+"</li>"),f+="</ul>",this.container.find(".ranges").prepend(f)}"function"==typeof s&&(this.callback=s),this.timePicker||(this.startDate=this.startDate.startOf("day"),this.endDate=this.endDate.endOf("day"),this.container.find(".calendar-time").hide()),this.timePicker&&this.autoApply&&(this.autoApply=!1),this.autoApply&&this.container.addClass("auto-apply"),"object"==typeof i.ranges&&this.container.addClass("show-ranges"),this.singleDatePicker&&(this.container.addClass("single"),this.container.find(".drp-calendar.left").addClass("single"),this.container.find(".drp-calendar.left").show(),this.container.find(".drp-calendar.right").hide(),!this.timePicker&&this.autoApply&&this.container.addClass("auto-apply")),(void 0===i.ranges&&!this.singleDatePicker||this.alwaysShowCalendars)&&this.container.addClass("show-calendar"),this.container.addClass("opens"+this.opens),this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses),this.applyButtonClasses.length&&this.container.find(".applyBtn").addClass(this.applyButtonClasses),this.cancelButtonClasses.length&&this.container.find(".cancelBtn").addClass(this.cancelButtonClasses),this.container.find(".applyBtn").html(this.locale.applyLabel),this.container.find(".cancelBtn").html(this.locale.cancelLabel),this.container.find(".drp-calendar").on("click.daterangepicker",".prev",e.proxy(this.clickPrev,this)).on("click.daterangepicker",".next",e.proxy(this.clickNext,this)).on("mousedown.daterangepicker","td.available",e.proxy(this.clickDate,this)).on("mouseenter.daterangepicker","td.available",e.proxy(this.hoverDate,this)).on("change.daterangepicker","select.yearselect",e.proxy(this.monthOrYearChanged,this)).on("change.daterangepicker","select.monthselect",e.proxy(this.monthOrYearChanged,this)).on("change.daterangepicker","select.hourselect,select.minuteselect,select.secondselect,select.ampmselect",e.proxy(this.timeChanged,this)),this.container.find(".ranges").on("click.daterangepicker","li",e.proxy(this.clickRange,this)),this.container.find(".drp-buttons").on("click.daterangepicker","button.applyBtn",e.proxy(this.clickApply,this)).on("click.daterangepicker","button.cancelBtn",e.proxy(this.clickCancel,this)),this.element.is("input")||this.element.is("button")?this.element.on({"click.daterangepicker":e.proxy(this.show,this),"focus.daterangepicker":e.proxy(this.show,this),"keyup.daterangepicker":e.proxy(this.elementChanged,this),"keydown.daterangepicker":e.proxy(this.keydown,this)}):(this.element.on("click.daterangepicker",e.proxy(this.toggle,this)),this.element.on("keydown.daterangepicker",e.proxy(this.toggle,this))),this.updateElement()};return a.prototype={constructor:a,setStartDate:function(e){"string"==typeof e&&(this.startDate=t(e,this.locale.format)),"object"==typeof e&&(this.startDate=t(e)),this.timePicker||(this.startDate=this.startDate.startOf("day")),this.timePicker&&this.timePickerIncrement&&this.startDate.minute(Math.round(this.startDate.minute()/this.timePickerIncrement)*this.timePickerIncrement),this.minDate&&this.startDate.isBefore(this.minDate)&&(this.startDate=this.minDate.clone(),this.timePicker&&this.timePickerIncrement&&this.startDate.minute(Math.round(this.startDate.minute()/this.timePickerIncrement)*this.timePickerIncrement)),this.maxDate&&this.startDate.isAfter(this.maxDate)&&(this.startDate=this.maxDate.clone(),this.timePicker&&this.timePickerIncrement&&this.startDate.minute(Math.floor(this.startDate.minute()/this.timePickerIncrement)*this.timePickerIncrement)),this.isShowing||this.updateElement(),this.updateMonthsInView()},setEndDate:function(e){"string"==typeof e&&(this.endDate=t(e,this.locale.format)),"object"==typeof e&&(this.endDate=t(e)),this.timePicker||(this.endDate=this.endDate.endOf("day")),this.timePicker&&this.timePickerIncrement&&this.endDate.minute(Math.round(this.endDate.minute()/this.timePickerIncrement)*this.timePickerIncrement),this.endDate.isBefore(this.startDate)&&(this.endDate=this.startDate.clone()),this.maxDate&&this.endDate.isAfter(this.maxDate)&&(this.endDate=this.maxDate.clone()),this.maxSpan&&this.startDate.clone().add(this.maxSpan).isBefore(this.endDate)&&(this.endDate=this.startDate.clone().add(this.maxSpan)),this.previousRightTime=this.endDate.clone(),this.container.find(".drp-selected").html(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format)),this.isShowing||this.updateElement(),this.updateMonthsInView()},isInvalidDate:function(){return!1},isCustomDate:function(){return!1},updateView:function(){this.timePicker&&(this.renderTimePicker("left"),this.renderTimePicker("right"),this.endDate?this.container.find(".right .calendar-time select").prop("disabled",!1).removeClass("disabled"):this.container.find(".right .calendar-time select").prop("disabled",!0).addClass("disabled")),this.endDate&&this.container.find(".drp-selected").html(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format)),this.updateMonthsInView(),this.updateCalendars(),this.updateFormInputs()},updateMonthsInView:function(){if(this.endDate){if(!this.singleDatePicker&&this.leftCalendar.month&&this.rightCalendar.month&&(this.startDate.format("YYYY-MM")==this.leftCalendar.month.format("YYYY-MM")||this.startDate.format("YYYY-MM")==this.rightCalendar.month.format("YYYY-MM"))&&(this.endDate.format("YYYY-MM")==this.leftCalendar.month.format("YYYY-MM")||this.endDate.format("YYYY-MM")==this.rightCalendar.month.format("YYYY-MM")))return;this.leftCalendar.month=this.startDate.clone().date(2),this.linkedCalendars||this.endDate.month()==this.startDate.month()&&this.endDate.year()==this.startDate.year()?this.rightCalendar.month=this.startDate.clone().date(2).add(1,"month"):this.rightCalendar.month=this.endDate.clone().date(2)}else this.leftCalendar.month.format("YYYY-MM")!=this.startDate.format("YYYY-MM")&&this.rightCalendar.month.format("YYYY-MM")!=this.startDate.format("YYYY-MM")&&(this.leftCalendar.month=this.startDate.clone().date(2),this.rightCalendar.month=this.startDate.clone().date(2).add(1,"month"));this.maxDate&&this.linkedCalendars&&!this.singleDatePicker&&this.rightCalendar.month>this.maxDate&&(this.rightCalendar.month=this.maxDate.clone().date(2),this.leftCalendar.month=this.maxDate.clone().date(2).subtract(1,"month"))},updateCalendars:function(){if(this.timePicker){var t,e,a,i;if(this.endDate){if(t=parseInt(this.container.find(".left .hourselect").val(),10),e=parseInt(this.container.find(".left .minuteselect").val(),10),isNaN(e)&&(e=parseInt(this.container.find(".left .minuteselect option:last").val(),10)),a=this.timePickerSeconds?parseInt(this.container.find(".left .secondselect").val(),10):0,!this.timePicker24Hour)"PM"===(i=this.container.find(".left .ampmselect").val())&&t<12&&(t+=12),"AM"===i&&12===t&&(t=0)}else if(t=parseInt(this.container.find(".right .hourselect").val(),10),e=parseInt(this.container.find(".right .minuteselect").val(),10),isNaN(e)&&(e=parseInt(this.container.find(".right .minuteselect option:last").val(),10)),a=this.timePickerSeconds?parseInt(this.container.find(".right .secondselect").val(),10):0,!this.timePicker24Hour)"PM"===(i=this.container.find(".right .ampmselect").val())&&t<12&&(t+=12),"AM"===i&&12===t&&(t=0);this.leftCalendar.month.hour(t).minute(e).second(a),this.rightCalendar.month.hour(t).minute(e).second(a)}this.renderCalendar("left"),this.renderCalendar("right"),this.container.find(".ranges li").removeClass("active"),null!=this.endDate&&this.calculateChosenLabel()},renderCalendar:function(a){var i,s=(i="left"==a?this.leftCalendar:this.rightCalendar).month.month(),n=i.month.year(),r=i.month.hour(),o=i.month.minute(),h=i.month.second(),l=t([n,s]).daysInMonth(),c=t([n,s,1]),d=t([n,s,l]),m=t(c).subtract(1,"month").month(),p=t(c).subtract(1,"month").year(),f=t([p,m]).daysInMonth(),u=c.day();(i=[]).firstDay=c,i.lastDay=d;for(var D=0;D<6;D++)i[D]=[];var g=f-u+this.locale.firstDay+1;g>f&&(g-=7),u==this.locale.firstDay&&(g=f-6);for(var y=t([p,m,g,12,o,h]),k=(D=0,0),b=0;D<42;D++,k++,y=t(y).add(24,"hour"))D>0&&k%7==0&&(k=0,b++),i[b][k]=y.clone().hour(r).minute(o).second(h),y.hour(12),this.minDate&&i[b][k].format("YYYY-MM-DD")==this.minDate.format("YYYY-MM-DD")&&i[b][k].isBefore(this.minDate)&&"left"==a&&(i[b][k]=this.minDate.clone()),this.maxDate&&i[b][k].format("YYYY-MM-DD")==this.maxDate.format("YYYY-MM-DD")&&i[b][k].isAfter(this.maxDate)&&"right"==a&&(i[b][k]=this.maxDate.clone());"left"==a?this.leftCalendar.calendar=i:this.rightCalendar.calendar=i;var v="left"==a?this.minDate:this.startDate,C=this.maxDate,Y=("left"==a?this.startDate:this.endDate,this.locale.direction,'<table class="table-condensed">');Y+="<thead>",Y+="<tr>",(this.showWeekNumbers||this.showISOWeekNumbers)&&(Y+="<th></th>"),v&&!v.isBefore(i.firstDay)||this.linkedCalendars&&"left"!=a?Y+="<th></th>":Y+='<th class="prev available"><span></span></th>';var w=this.locale.monthNames[i[1][1].month()]+i[1][1].format(" YYYY");if(this.showDropdowns){for(var P=i[1][1].month(),x=i[1][1].year(),M=C&&C.year()||this.maxYear,I=v&&v.year()||this.minYear,S=x==I,B=x==M,A='<select class="monthselect">',L=0;L<12;L++)(!S||v&&L>=v.month())&&(!B||C&&L<=C.month())?A+="<option value='"+L+"'"+(L===P?" selected='selected'":"")+">"+this.locale.monthNames[L]+"</option>":A+="<option value='"+L+"'"+(L===P?" selected='selected'":"")+" disabled='disabled'>"+this.locale.monthNames[L]+"</option>";A+="</select>";for(var N='<select class="yearselect">',E=I;E<=M;E++)N+='<option value="'+E+'"'+(E===x?' selected="selected"':"")+">"+E+"</option>";w=A+(N+="</select>")}if(Y+='<th colspan="5" class="month">'+w+"</th>",C&&!C.isAfter(i.lastDay)||this.linkedCalendars&&"right"!=a&&!this.singleDatePicker?Y+="<th></th>":Y+='<th class="next available"><span></span></th>',Y+="</tr>",Y+="<tr>",(this.showWeekNumbers||this.showISOWeekNumbers)&&(Y+='<th class="week">'+this.locale.weekLabel+"</th>"),e.each(this.locale.daysOfWeek,function(t,e){Y+="<th>"+e+"</th>"}),Y+="</tr>",Y+="</thead>",Y+="<tbody>",null==this.endDate&&this.maxSpan){var O=this.startDate.clone().add(this.maxSpan).endOf("day");C&&!O.isBefore(C)||(C=O)}for(b=0;b<6;b++){Y+="<tr>",this.showWeekNumbers?Y+='<td class="week">'+i[b][0].week()+"</td>":this.showISOWeekNumbers&&(Y+='<td class="week">'+i[b][0].isoWeek()+"</td>");for(k=0;k<7;k++){var W=[];i[b][k].isSame(new Date,"day")&&W.push("today"),i[b][k].isoWeekday()>5&&W.push("weekend"),i[b][k].month()!=i[1][1].month()&&W.push("off","ends"),this.minDate&&i[b][k].isBefore(this.minDate,"day")&&W.push("off","disabled"),C&&i[b][k].isAfter(C,"day")&&W.push("off","disabled"),this.isInvalidDate(i[b][k])&&W.push("off","disabled"),i[b][k].format("YYYY-MM-DD")==this.startDate.format("YYYY-MM-DD")&&W.push("active","start-date"),null!=this.endDate&&i[b][k].format("YYYY-MM-DD")==this.endDate.format("YYYY-MM-DD")&&W.push("active","end-date"),null!=this.endDate&&i[b][k]>this.startDate&&i[b][k]<this.endDate&&W.push("in-range");var H=this.isCustomDate(i[b][k]);!1!==H&&("string"==typeof H?W.push(H):Array.prototype.push.apply(W,H));var j="",R=!1;for(D=0;D<W.length;D++)j+=W[D]+" ","disabled"==W[D]&&(R=!0);R||(j+="available"),Y+='<td class="'+j.replace(/^\s+|\s+$/g,"")+'" data-title="r'+b+"c"+k+'">'+i[b][k].date()+"</td>"}Y+="</tr>"}Y+="</tbody>",Y+="</table>",this.container.find(".drp-calendar."+a+" .calendar-table").html(Y)},renderTimePicker:function(t){if("right"!=t||this.endDate){var e,a,i,s=this.maxDate;if(!this.maxSpan||this.maxDate&&!this.startDate.clone().add(this.maxSpan).isBefore(this.maxDate)||(s=this.startDate.clone().add(this.maxSpan)),"left"==t)a=this.startDate.clone(),i=this.minDate;else if("right"==t){a=this.endDate.clone(),i=this.startDate;var n=this.container.find(".drp-calendar.right .calendar-time");if(""!=n.html()&&(a.hour(isNaN(a.hour())?n.find(".hourselect option:selected").val():a.hour()),a.minute(isNaN(a.minute())?n.find(".minuteselect option:selected").val():a.minute()),a.second(isNaN(a.second())?n.find(".secondselect option:selected").val():a.second()),!this.timePicker24Hour)){var r=n.find(".ampmselect option:selected").val();"PM"===r&&a.hour()<12&&a.hour(a.hour()+12),"AM"===r&&12===a.hour()&&a.hour(0)}a.isBefore(this.startDate)&&(a=this.startDate.clone()),s&&a.isAfter(s)&&(a=s.clone())}e='<select class="hourselect">';for(var o=this.timePicker24Hour?0:1,h=this.timePicker24Hour?23:12,l=o;l<=h;l++){var c=l;this.timePicker24Hour||(c=a.hour()>=12?12==l?12:l+12:12==l?0:l);var d=a.clone().hour(c),m=!1;i&&d.minute(59).isBefore(i)&&(m=!0),s&&d.minute(0).isAfter(s)&&(m=!0),c!=a.hour()||m?e+=m?'<option value="'+l+'" disabled="disabled" class="disabled">'+l+"</option>":'<option value="'+l+'">'+l+"</option>":e+='<option value="'+l+'" selected="selected">'+l+"</option>"}e+="</select> ",e+=': <select class="minuteselect">';for(l=0;l<60;l+=this.timePickerIncrement){var p=l<10?"0"+l:l;d=a.clone().minute(l),m=!1;i&&d.second(59).isBefore(i)&&(m=!0),s&&d.second(0).isAfter(s)&&(m=!0),a.minute()!=l||m?e+=m?'<option value="'+l+'" disabled="disabled" class="disabled">'+p+"</option>":'<option value="'+l+'">'+p+"</option>":e+='<option value="'+l+'" selected="selected">'+p+"</option>"}if(e+="</select> ",this.timePickerSeconds){e+=': <select class="secondselect">';for(l=0;l<60;l++){p=l<10?"0"+l:l,d=a.clone().second(l),m=!1;i&&d.isBefore(i)&&(m=!0),s&&d.isAfter(s)&&(m=!0),a.second()!=l||m?e+=m?'<option value="'+l+'" disabled="disabled" class="disabled">'+p+"</option>":'<option value="'+l+'">'+p+"</option>":e+='<option value="'+l+'" selected="selected">'+p+"</option>"}e+="</select> "}if(!this.timePicker24Hour){e+='<select class="ampmselect">';var f="",u="";i&&a.clone().hour(12).minute(0).second(0).isBefore(i)&&(f=' disabled="disabled" class="disabled"'),s&&a.clone().hour(0).minute(0).second(0).isAfter(s)&&(u=' disabled="disabled" class="disabled"'),a.hour()>=12?e+='<option value="AM"'+f+'>AM</option><option value="PM" selected="selected"'+u+">PM</option>":e+='<option value="AM" selected="selected"'+f+'>AM</option><option value="PM"'+u+">PM</option>",e+="</select>"}this.container.find(".drp-calendar."+t+" .calendar-time").html(e)}},updateFormInputs:function(){this.singleDatePicker||this.endDate&&(this.startDate.isBefore(this.endDate)||this.startDate.isSame(this.endDate))?this.container.find("button.applyBtn").prop("disabled",!1):this.container.find("button.applyBtn").prop("disabled",!0)},move:function(){var t,a={top:0,left:0},i=this.drops,s=e(window).width();switch(this.parentEl.is("body")||(a={top:this.parentEl.offset().top-this.parentEl.scrollTop(),left:this.parentEl.offset().left-this.parentEl.scrollLeft()},s=this.parentEl[0].clientWidth+this.parentEl.offset().left),i){case"auto":(t=this.element.offset().top+this.element.outerHeight()-a.top)+this.container.outerHeight()>=this.parentEl[0].scrollHeight&&(t=this.element.offset().top-this.container.outerHeight()-a.top,i="up");break;case"up":t=this.element.offset().top-this.container.outerHeight()-a.top;break;default:t=this.element.offset().top+this.element.outerHeight()-a.top}this.container.css({top:0,left:0,right:"auto"});var n=this.container.outerWidth();if(this.container.toggleClass("drop-up","up"==i),"left"==this.opens){var r=s-this.element.offset().left-this.element.outerWidth();n+r>e(window).width()?this.container.css({top:t,right:"auto",left:9}):this.container.css({top:t,right:r,left:"auto"})}else if("center"==this.opens){(o=this.element.offset().left-a.left+this.element.outerWidth()/2-n/2)<0?this.container.css({top:t,right:"auto",left:9}):o+n>e(window).width()?this.container.css({top:t,left:"auto",right:0}):this.container.css({top:t,left:o,right:"auto"})}else{var o;(o=this.element.offset().left-a.left)+n>e(window).width()?this.container.css({top:t,left:"auto",right:0}):this.container.css({top:t,left:o,right:"auto"})}},show:function(t){this.isShowing||(this._outsideClickProxy=e.proxy(function(t){this.outsideClick(t)},this),e(document).on("mousedown.daterangepicker",this._outsideClickProxy).on("touchend.daterangepicker",this._outsideClickProxy).on("click.daterangepicker","[data-toggle=dropdown]",this._outsideClickProxy).on("focusin.daterangepicker",this._outsideClickProxy),e(window).on("resize.daterangepicker",e.proxy(function(t){this.move(t)},this)),this.oldStartDate=this.startDate.clone(),this.oldEndDate=this.endDate.clone(),this.previousRightTime=this.endDate.clone(),this.updateView(),this.container.show(),this.move(),this.element.trigger("show.daterangepicker",this),this.isShowing=!0)},hide:function(t){this.isShowing&&(this.endDate||(this.startDate=this.oldStartDate.clone(),this.endDate=this.oldEndDate.clone()),this.startDate.isSame(this.oldStartDate)&&this.endDate.isSame(this.oldEndDate)||this.callback(this.startDate.clone(),this.endDate.clone(),this.chosenLabel),this.updateElement(),e(document).off(".daterangepicker"),e(window).off(".daterangepicker"),this.container.hide(),this.element.trigger("hide.daterangepicker",this),this.isShowing=!1)},toggle:function(t){this.isShowing?this.hide():this.show()},outsideClick:function(t){var a=e(t.target);"focusin"==t.type||a.closest(this.element).length||a.closest(this.container).length||a.closest(".calendar-table").length||(this.hide(),this.element.trigger("outsideClick.daterangepicker",this))},showCalendars:function(){this.container.addClass("show-calendar"),this.move(),this.element.trigger("showCalendar.daterangepicker",this)},hideCalendars:function(){this.container.removeClass("show-calendar"),this.element.trigger("hideCalendar.daterangepicker",this)},clickRange:function(t){var e=t.target.getAttribute("data-range-key");if(this.chosenLabel=e,e==this.locale.customRangeLabel)this.showCalendars();else{var a=this.ranges[e];this.startDate=a[0],this.endDate=a[1],this.timePicker||(this.startDate.startOf("day"),this.endDate.endOf("day")),this.alwaysShowCalendars||this.hideCalendars(),this.clickApply()}},clickPrev:function(t){e(t.target).parents(".drp-calendar").hasClass("left")?(this.leftCalendar.month.subtract(1,"month"),this.linkedCalendars&&this.rightCalendar.month.subtract(1,"month")):this.rightCalendar.month.subtract(1,"month"),this.updateCalendars()},clickNext:function(t){e(t.target).parents(".drp-calendar").hasClass("left")?this.leftCalendar.month.add(1,"month"):(this.rightCalendar.month.add(1,"month"),this.linkedCalendars&&this.leftCalendar.month.add(1,"month")),this.updateCalendars()},hoverDate:function(t){if(e(t.target).hasClass("available")){var a=e(t.target).attr("data-title"),i=a.substr(1,1),s=a.substr(3,1),n=e(t.target).parents(".drp-calendar").hasClass("left")?this.leftCalendar.calendar[i][s]:this.rightCalendar.calendar[i][s],r=this.leftCalendar,o=this.rightCalendar,h=this.startDate;this.endDate||this.container.find(".drp-calendar tbody td").each(function(t,a){if(!e(a).hasClass("week")){var i=e(a).attr("data-title"),s=i.substr(1,1),l=i.substr(3,1),c=e(a).parents(".drp-calendar").hasClass("left")?r.calendar[s][l]:o.calendar[s][l];c.isAfter(h)&&c.isBefore(n)||c.isSame(n,"day")?e(a).addClass("in-range"):e(a).removeClass("in-range")}})}},clickDate:function(t){if(e(t.target).hasClass("available")){var a=e(t.target).attr("data-title"),i=a.substr(1,1),s=a.substr(3,1),n=e(t.target).parents(".drp-calendar").hasClass("left")?this.leftCalendar.calendar[i][s]:this.rightCalendar.calendar[i][s];if(this.endDate||n.isBefore(this.startDate,"day")){if(this.timePicker){var r=parseInt(this.container.find(".left .hourselect").val(),10);if(!this.timePicker24Hour)"PM"===(l=this.container.find(".left .ampmselect").val())&&r<12&&(r+=12),"AM"===l&&12===r&&(r=0);var o=parseInt(this.container.find(".left .minuteselect").val(),10);isNaN(o)&&(o=parseInt(this.container.find(".left .minuteselect option:last").val(),10));var h=this.timePickerSeconds?parseInt(this.container.find(".left .secondselect").val(),10):0;n=n.clone().hour(r).minute(o).second(h)}this.endDate=null,this.setStartDate(n.clone())}else if(!this.endDate&&n.isBefore(this.startDate))this.setEndDate(this.startDate.clone());else{if(this.timePicker){var l;r=parseInt(this.container.find(".right .hourselect").val(),10);if(!this.timePicker24Hour)"PM"===(l=this.container.find(".right .ampmselect").val())&&r<12&&(r+=12),"AM"===l&&12===r&&(r=0);o=parseInt(this.container.find(".right .minuteselect").val(),10);isNaN(o)&&(o=parseInt(this.container.find(".right .minuteselect option:last").val(),10));h=this.timePickerSeconds?parseInt(this.container.find(".right .secondselect").val(),10):0;n=n.clone().hour(r).minute(o).second(h)}this.setEndDate(n.clone()),this.autoApply&&(this.calculateChosenLabel(),this.clickApply())}this.singleDatePicker&&(this.setEndDate(this.startDate),!this.timePicker&&this.autoApply&&this.clickApply()),this.updateView(),t.stopPropagation()}},calculateChosenLabel:function(){var t=!0,e=0;for(var a in this.ranges){if(this.timePicker){var i=this.timePickerSeconds?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD HH:mm";if(this.startDate.format(i)==this.ranges[a][0].format(i)&&this.endDate.format(i)==this.ranges[a][1].format(i)){t=!1,this.chosenLabel=this.container.find(".ranges li:eq("+e+")").addClass("active").attr("data-range-key");break}}else if(this.startDate.format("YYYY-MM-DD")==this.ranges[a][0].format("YYYY-MM-DD")&&this.endDate.format("YYYY-MM-DD")==this.ranges[a][1].format("YYYY-MM-DD")){t=!1,this.chosenLabel=this.container.find(".ranges li:eq("+e+")").addClass("active").attr("data-range-key");break}e++}t&&(this.showCustomRangeLabel?this.chosenLabel=this.container.find(".ranges li:last").addClass("active").attr("data-range-key"):this.chosenLabel=null,this.showCalendars())},clickApply:function(t){this.hide(),this.element.trigger("apply.daterangepicker",this)},clickCancel:function(t){this.startDate=this.oldStartDate,this.endDate=this.oldEndDate,this.hide(),this.element.trigger("cancel.daterangepicker",this)},monthOrYearChanged:function(t){var a=e(t.target).closest(".drp-calendar").hasClass("left"),i=a?"left":"right",s=this.container.find(".drp-calendar."+i),n=parseInt(s.find(".monthselect").val(),10),r=s.find(".yearselect").val();a||(r<this.startDate.year()||r==this.startDate.year()&&n<this.startDate.month())&&(n=this.startDate.month(),r=this.startDate.year()),this.minDate&&(r<this.minDate.year()||r==this.minDate.year()&&n<this.minDate.month())&&(n=this.minDate.month(),r=this.minDate.year()),this.maxDate&&(r>this.maxDate.year()||r==this.maxDate.year()&&n>this.maxDate.month())&&(n=this.maxDate.month(),r=this.maxDate.year()),a?(this.leftCalendar.month.month(n).year(r),this.linkedCalendars&&(this.rightCalendar.month=this.leftCalendar.month.clone().add(1,"month"))):(this.rightCalendar.month.month(n).year(r),this.linkedCalendars&&(this.leftCalendar.month=this.rightCalendar.month.clone().subtract(1,"month"))),this.updateCalendars()},timeChanged:function(t){var a=e(t.target).closest(".drp-calendar"),i=a.hasClass("left"),s=parseInt(a.find(".hourselect").val(),10),n=parseInt(a.find(".minuteselect").val(),10);isNaN(n)&&(n=parseInt(a.find(".minuteselect option:last").val(),10));var r=this.timePickerSeconds?parseInt(a.find(".secondselect").val(),10):0;if(!this.timePicker24Hour){var o=a.find(".ampmselect").val();"PM"===o&&s<12&&(s+=12),"AM"===o&&12===s&&(s=0)}if(i){var h=this.startDate.clone();h.hour(s),h.minute(n),h.second(r),this.setStartDate(h),this.singleDatePicker?this.endDate=this.startDate.clone():this.endDate&&this.endDate.format("YYYY-MM-DD")==h.format("YYYY-MM-DD")&&this.endDate.isBefore(h)&&this.setEndDate(h.clone())}else if(this.endDate){var l=this.endDate.clone();l.hour(s),l.minute(n),l.second(r),this.setEndDate(l)}this.updateCalendars(),this.updateFormInputs(),this.renderTimePicker("left"),this.renderTimePicker("right")},elementChanged:function(){if(this.element.is("input")&&this.element.val().length){var e=this.element.val().split(this.locale.separator),a=null,i=null;2===e.length&&(a=t(e[0],this.locale.format),i=t(e[1],this.locale.format)),(this.singleDatePicker||null===a||null===i)&&(i=a=t(this.element.val(),this.locale.format)),a.isValid()&&i.isValid()&&(this.setStartDate(a),this.setEndDate(i),this.updateView())}},keydown:function(t){9!==t.keyCode&&13!==t.keyCode||this.hide(),27===t.keyCode&&(t.preventDefault(),t.stopPropagation(),this.hide())},updateElement:function(){if(this.element.is("input")&&this.autoUpdateInput){var t=this.startDate.format(this.locale.format);this.singleDatePicker||(t+=this.locale.separator+this.endDate.format(this.locale.format)),t!==this.element.val()&&this.element.val(t).trigger("change")}},remove:function(){this.container.remove(),this.element.off(".daterangepicker"),this.element.removeData()}},e.fn.daterangepicker=function(t,i){var s=e.extend(!0,{},e.fn.daterangepicker.defaultOptions,t);return this.each(function(){var t=e(this);t.data("daterangepicker")&&t.data("daterangepicker").remove(),t.data("daterangepicker",new a(t,s,i))}),this},a});
//# sourceMappingURL=/sm/f07d8d7b2652873f485707eab4f3d300bf1f6f3b42912e189c8933b1b9b3dfde.map
(()=>{var e,t;jQuery((function(e){e(".tips").tooltip(),e("ul.order-status").on("click","a.dokan-edit-status",(function(t){return e(this).addClass("dokan-hide").closest("li").next("li").removeClass("dokan-hide"),!1})),e("ul.order-status").on("click","a.dokan-cancel-status",(function(t){return e(this).closest("li").addClass("dokan-hide").prev("li").find("a.dokan-edit-status").removeClass("dokan-hide"),!1})),e("form#dokan-order-status-form").on("submit",(function(t){t.preventDefault();var a=e(this),n=a.closest("li");n.block({message:null,overlayCSS:{background:"#fff url("+dokan.ajax_loader+") no-repeat center",opacity:.6}}),e.post(dokan.ajaxurl,a.serialize(),(function(e){if(n.unblock(),e.success){var t=n.prev();n.addClass("dokan-hide"),t.find("label").replaceWith(e.data),t.find("a.dokan-edit-status").removeClass("dokan-hide")}else dokan_sweetalert(e.data,{icon:"success"})}))})),e("form#add-order-note").on("submit",(function(t){if(t.preventDefault(),e("textarea#add-note-content").val())return e("#dokan-order-notes").block({message:null,overlayCSS:{background:"#fff url("+dokan.ajax_loader+") no-repeat center",opacity:.6}}),e.post(dokan.ajaxurl,e(this).serialize(),(function(t){e("ul.order_notes").prepend(t),e("#dokan-order-notes").unblock(),e("#add-note-content").val("")})),!1})),e("#dokan-order-notes").on("click","a.delete_note",(function(){var t=e(this).closest("li.note");e("#dokan-order-notes").block({message:null,overlayCSS:{background:"#fff url("+dokan.ajax_loader+") no-repeat center",opacity:.6}});var a={action:"dokan_delete_order_note",note_id:e(t).attr("rel"),security:e("#delete-note-security").val()};return e.post(dokan.ajaxurl,a,(function(a){e(t).remove(),e("#dokan-order-notes").unblock()})),!1})),e(".order_download_permissions").on("click","button.grant_access",(function(){var t=e(this),a=e("select.grant_access_id").val();if(a){e(".order_download_permissions").block({message:null,overlayCSS:{background:"#fff url("+dokan.ajax_loader+") no-repeat center",opacity:.6}});var n={action:"dokan_grant_access_to_download",product_ids:a,loop:e(".order_download_permissions .panel").length,order_id:t.data("order-id"),security:t.data("nonce")};return e.post(dokan.ajaxurl,n,(function(t){t?e("#accordion").append(t):dokan_sweetalert(dokan.i18n_download_access,{icon:"warning"}),e(".datepicker").datepicker(),e(".order_download_permissions").unblock()})),!1}})),e(".order_download_permissions").on("click","button.revoke_access",(async function(t){t.preventDefault();const a=await dokan_sweetalert(dokan.i18n_download_permission,{action:"confirm",icon:"warning"});if("undefined"!==a&&a.isConfirmed){var n=e(this),o=n.closest(".dokan-panel"),i=n.attr("rel").split(",")[0],r=n.attr("rel").split(",")[1];if(i>0){e(o).block({message:null,overlayCSS:{background:"#fff url("+dokan.ajax_loader+") no-repeat center",opacity:.6}});var d={action:"dokan_revoke_access_to_download",product_id:i,download_id:r,order_id:n.data("order-id"),permission_id:n.data("permission-id"),security:n.data("nonce")};e.post(dokan.ajaxurl,d,(function(t){e(o).fadeOut("300",(function(){e(o).remove()}))}))}else e(o).fadeOut("300",(function(){e(o).remove()}))}return!1}))})),e=jQuery,(t={init:function(){let t={d:"dd",D:"D",j:"d",l:"DD",F:"MM",m:"mm",M:"M",n:"m",o:"yy",Y:"yy",y:"y"},a=0,n="",o="";for(a=0;a<dokan.i18n_date_format.length;a++)n=dokan.i18n_date_format[a],o+=n in t?t[n]:n;e("#shipped-date").datepicker({dateFormat:o}),e("body").on("click","#dokan-add-tracking-number",this.showTrackingForm),e("body").on("click","#dokan-cancel-tracking-note",this.cancelTrackingForm),e("body").on("click","#add-tracking-details",this.insertShippingTrackingInfo),e("#woocommerce-order-items").on("click","button.refund-items",this.refund_items).on("click",".cancel-action",this.cancel).on("click","button.do-api-refund, button.do-manual-refund",this.refunds.do_refund).on("change",".refund input.refund_line_total, .refund input.refund_line_tax",this.refunds.input_changed).on("change keyup",".wc-order-refund-items #refund_amount",this.refunds.amount_changed).on("change","input.refund_order_item_qty",this.refunds.refund_quantity_changed).on("keyup",".woocommerce_order_items .split-input input:eq(0)",(function(){var t=e(this).next();(""===t.val()||t.is(".match-total"))&&t.val(e(this).val()).addClass("match-total")})).on("keyup",".woocommerce_order_items .split-input input:eq(1)",(function(){e(this).removeClass("match-total")}))},showTrackingForm:function(t){t.preventDefault(),e(this).closest("div").find("form#add-shipping-tracking-form").slideDown(300,(function(){e(this).removeClass("dokan-hide")}))},cancelTrackingForm:function(t){t.preventDefault(),e(this).closest("form#add-shipping-tracking-form").slideUp(300,(function(){e(this).addClass("dokan-hide")}))},insertShippingTrackingInfo:function(t){t.preventDefault();var a={shipping_provider:e("#shipping_provider").val(),shipping_number:e("#tracking_number").val(),shipped_date:e("#shipped-date").val(),action:e("#action").val(),post_id:e("#post-id").val(),security:e("#security").val()};return e("#dokan-order-notes").block({message:null,overlayCSS:{background:"#fff url("+dokan.ajax_loader+") no-repeat center",opacity:.6}}),e.post(dokan.ajaxurl,a,(function(t){e("ul.order_notes").prepend(t),e("#dokan-order-notes").unblock(),e("form#add-shipping-tracking-form").find("input[type=text], textarea").val("")})),!1},block:function(){e("#woocommerce-order-items").block({message:null,overlayCSS:{background:"#fff",opacity:.6}})},unblock:function(){e("#woocommerce-order-items").unblock()},reload_items:function(){var a={order_id:dokan_refund.post_id,action:"dokan_load_order_items",security:dokan_refund.order_item_nonce};t.block(),e.ajax({url:dokan_refund.ajax_url,data:a,type:"POST",success:function(t){e(".dokan-panel-default #woocommerce-order-items").empty(),e(".dokan-panel-default #woocommerce-order-items").append(t)}})},refund_items:function(){return e("div.wc-order-refund-items").slideDown(),e("div.wc-order-bulk-actions").slideUp(),e("div.wc-order-totals-items").slideUp(),e("#woocommerce-order-items div.refund").show(),e(".wc-order-edit-line-item .wc-order-edit-line-item-actions").hide(),!1},cancel:function(){return e(this).closest("div.wc-order-data-row").slideUp(),e("div.wc-order-bulk-actions").slideDown(),e("div.wc-order-totals-items").slideDown(),e("#woocommerce-order-items div.refund").hide(),e(".wc-order-edit-line-item .wc-order-edit-line-item-actions").show(),"true"===e(this).attr("data-reload")&&t.reload_items(),!1},refunds:{do_refund:async function(){t.block();const a=await dokan_sweetalert(dokan_refund.i18n_do_refund,{action:"confirm",icon:"warning"});if("undefined"!==a&&a.isConfirmed){var n=e("input#refund_amount").val(),o=e("input#refund_reason").val(),i={},r={},d={};e(".refund input.refund_order_item_qty").each((function(t,a){e(a).closest("tr").data("order_item_id")&&a.value&&(i[e(a).closest("tr").data("order_item_id")]=a.value)})),e(".refund input.refund_line_total").each((function(t,a){e(a).closest("tr").data("order_item_id")&&(r[e(a).closest("tr").data("order_item_id")]=accounting.unformat(a.value,dokan_refund.mon_decimal_point))})),e(".refund input.refund_line_tax").each((function(t,a){if(e(a).closest("tr").data("order_item_id")){var n=e(a).data("tax_id");d[e(a).closest("tr").data("order_item_id")]||(d[e(a).closest("tr").data("order_item_id")]={}),d[e(a).closest("tr").data("order_item_id")][n]=accounting.unformat(a.value,dokan_refund.mon_decimal_point)}}));var s={action:"dokan_refund_request",order_id:dokan_refund.post_id,refund_amount:n,refund_reason:o,line_item_qtys:JSON.stringify(i,null,""),line_item_totals:JSON.stringify(r,null,""),line_item_tax_totals:JSON.stringify(d,null,""),api_refund:e(this).is(".do-api-refund"),restock_refunded_items:e("#restock_refunded_items:checked").length?"true":"false",security:dokan_refund.order_item_nonce};e.post(dokan_refund.ajax_url,s,(function(e){e.data.message&&dokan_sweetalert(e.data.message,{icon:"success"}),t.reload_items()})).fail((function(a){var n=[];if(a.responseJSON.data){var o=a.responseJSON.data;e.isArray(o)?n=a.responseJSON.data.map((function(e){return e.message})):n.push(o)}dokan_sweetalert(n.join(" "),{icon:"error"}),t.unblock()}))}else t.unblock()},input_changed:function(){var t=0;e(".woocommerce_order_items").find("tr.item, tr.fee, tr.shipping").each((function(){e(this).find(".refund input:not(.refund_order_item_qty)").each((function(a,n){t+=parseFloat(accounting.unformat(e(n).val()||0,dokan_refund.mon_decimal_point))}))})),e("#refund_amount").val(accounting.formatNumber(t,dokan_refund.currency_format_num_decimals,"",dokan_refund.mon_decimal_point)).trigger("change")},amount_changed:function(){var t=accounting.unformat(e(this).val(),dokan_refund.mon_decimal_point);e("button .wc-order-refund-amount .amount").text(accounting.formatMoney(t,{symbol:dokan_refund.currency_format_symbol,decimal:dokan_refund.currency_format_decimal_sep,thousand:dokan_refund.currency_format_thousand_sep,precision:dokan_refund.currency_format_num_decimals,format:dokan_refund.currency_format}))},refund_quantity_changed:function(){var t=e(this).closest("tr.item"),a=t.find("input.quantity").val(),n=e(this).val(),o=e("input.line_total",t),i=e("input.refund_line_total",t),r=accounting.unformat(o.attr("data-total"),dokan_refund.mon_decimal_point)/a;i.val(parseFloat(accounting.formatNumber(r*n,dokan_refund.rounding_precision,"")).toString().replace(".",dokan_refund.mon_decimal_point)).trigger("change"),e("td.line_tax",t).each((function(){var t=e("input.line_tax",e(this)),o=e("input.refund_line_tax",e(this)),i=accounting.unformat(t.attr("data-total_tax"),dokan_refund.mon_decimal_point)/a;if(0<i){var r="yes"===dokan_refund.round_at_subtotal,d=dokan_refund[r?"rounding_precision":"currency_format_num_decimals"];o.val(parseFloat(accounting.formatNumber(i*n,d,"")).toString().replace(".",dokan_refund.mon_decimal_point)).trigger("change")}else o.val(0).trigger("change")})),n>0?e("#restock_refunded_items").closest("tr").show():(e("#restock_refunded_items").closest("tr").hide(),e(".woocommerce_order_items input.refund_order_item_qty").each((function(){e(this).val()>0&&e("#restock_refunded_items").closest("tr").show()}))),e(this).trigger("refund_quantity_changed")}}}).init(),e("#dokan-filter-customer").filter(":not(.enhanced)").each((function(){var t={allowClear:!!e(this).data("allow_clear"),placeholder:e(this).data("placeholder"),minimumInputLength:e(this).data("minimum_input_length")?e(this).data("minimum_input_length"):"1",escapeMarkup:function(e){return e},language:{errorLoading:function(){return dokan.i18n_searching},inputTooLong:function(e){var t=e.input.length-e.maximum;return 1===t?dokan.i18n_input_too_long_1:dokan.i18n_input_too_long_n.replace("%qty%",t)},inputTooShort:function(e){var t=e.minimum-e.input.length;return 1===t?dokan.i18n_input_too_short_1:dokan.i18n_input_too_short_n.replace("%qty%",t)},loadingMore:function(){return dokan.i18n_load_more},maximumSelected:function(e){return 1===e.maximum?dokan.i18n_selection_too_long_1:dokan.i18n_selection_too_long_n.replace("%qty%",e.maximum)},noResults:function(){return dokan.i18n_no_matches},searching:function(){return dokan.i18n_searching}},ajax:{url:dokan.ajaxurl,dataType:"json",delay:1e3,data:function(t){return{term:t.term,action:"dokan_json_search_vendor_customers",security:dokan.search_customer_nonce,exclude:e(this).data("exclude")}},processResults:function(t){var a=[];return t&&e.each(t,(function(e,t){a.push({id:e,text:t})})),{results:a}},cache:!0}};if(e(this).select2(t).addClass("enhanced"),e(this).data("sortable")){var a=e(this),n=e(this).next(".select2-container").find("ul.select2-selection__rendered");n.sortable({placeholder:"ui-state-highlight select2-selection__choice",forcePlaceholderSize:!0,items:"li:not(.select2-search__field)",tolerance:"pointer",stop:function(){e(n.find(".select2-selection__choice").get().reverse()).each((function(){var t=e(this).data("data").id,n=a.find('option[value="'+t+'"]')[0];a.prepend(n)}))}})}})),function(e){e("#variants-holder"),e("#product_image_gallery"),e("#product_images_container ul.product_images");var t,a,n={modal:!1,init:function(){product_type="simple",e(".product-edit-container").on("click",".dokan-section-heading",this.toggleProductSection),e(".product-edit-container").on("click","input[type=checkbox]#_downloadable",this.downloadable),e(".product-edit-container").on("click","a.sale-schedule",this.showDiscountSchedule),e("body, #dokan-product-images").on("click","a.add-product-images",this.gallery.addImages),e("body, #dokan-product-images").on("click","a.action-delete",this.gallery.deleteImage),this.gallery.sortable(),e("body, .product-edit-container").on("click","a.dokan-feat-image-btn",this.featuredImage.addImage),e("body, .product-edit-container").on("click","a.dokan-remove-feat-image",this.featuredImage.removeImage),e("body, #variable_product_options").on("click",".sale_schedule",this.saleSchedule),e("body, #variable_product_options").on("click",".cancel_sale_schedule",this.cancelSchedule),e(".product-edit-container").on("change","input[type=checkbox]#_manage_stock",this.showManageStock),e(".product-edit-container").on("click","a.upload_file_button",this.fileDownloadable),e("body").on("click","a.insert-file-row",(function(){return e(this).closest("table").find("tbody").append(e(this).data("row")),!1})),e("body").on("click","a.dokan-product-delete",(function(){return e(this).closest("tr").remove(),!1})),e("body").on("submit","form.dokan-product-edit-form",this.inputValidate),e(".dokan-product-listing").on("click","a.dokan-add-new-product",this.addProductPopup),this.loadSelect2(),this.bindProductTagDropdown(),this.attribute.sortable(),this.checkProductPostboxToggle(),e(".product-edit-container .dokan-product-attribute-wrapper").on("click","a.dokan-product-toggle-attribute, .dokan-product-attribute-heading",this.attribute.toggleAttribute),e(".product-edit-container .dokan-product-attribute-wrapper").on("click","a.add_new_attribute",this.attribute.addNewAttribute),e(".product-edit-container .dokan-product-attribute-wrapper").on("keyup","input.dokan-product-attribute-name",this.attribute.dynamicAttrNameChange),e(".dokan-product-attribute-wrapper ul.dokan-attribute-option-list").on("click","button.dokan-select-all-attributes",this.attribute.selectAllAttr),e(".dokan-product-attribute-wrapper ul.dokan-attribute-option-list").on("click","button.dokan-select-no-attributes",this.attribute.selectNoneAttr),e(".dokan-product-attribute-wrapper ul.dokan-attribute-option-list").on("click","button.dokan-add-new-attribute",this.attribute.addNewExtraAttr),e(".product-edit-container .dokan-product-attribute-wrapper").on("click","a.dokan-product-remove-attribute",this.attribute.removeAttribute),e(".product-edit-container .dokan-product-attribute-wrapper").on("click","a.dokan-save-attribute",this.attribute.saveAttribute),e("body").on("click",'.product-container-footer input[type="submit"]',this.createNewProduct),this.attribute.disbalePredefinedAttribute(),this.setCorrectProductId(),e("body").trigger("dokan-product-editor-loaded",this)},setCorrectProductId:function(){if(!e(".dokan-product-edit-form"))return;let t=e("#dokan_product_id").val();if(window.history.replaceState){let e=new URL(document.location),a=e.searchParams,n=a.get("product_id");if(""!==n&&"0"!==n)return;if(a.set("product_id",t),"edit"!==a.get("action"))return;e.search=a.toString();let o=e.toString(),i={product_id:t};window.history.replaceState(i,document.title,o)}},saleSchedule:function(){var t=e(this).closest(".dokan-product-field-content","div, table");return e(this).hide(),t.find(".cancel_sale_schedule").show(),t.find(".sale_price_dates_fields").show(),!1},cancelSchedule:function(){var t=e(this).closest(".dokan-product-field-content","div, table");return e(this).hide(),t.find(".sale_schedule").show(),t.find(".sale_price_dates_fields").hide(),t.find(".sale_price_dates_fields").find("input").val(""),!1},checkProductPostboxToggle:function(){var t=JSON.parse(localStorage.getItem("toggleClasses"));e.each(t,(function(t,a){var n=e("."+t.replace(/_/g,"-")),o=n.find(".dokan-section-content"),i=n.find("i.fa-sort-desc");a?(o.show(),i.removeClass("fa-flip-horizointal").addClass("fa-flip-vertical"),i.css("marginTop","9px")):(o.hide(),i.removeClass("fa-flip-vertical").addClass("fa-flip-horizointal"),i.css("marginTop","0px"))}))},toggleProductSection:function(t){t.preventDefault();var a=e(this);if(null!=JSON.parse(localStorage.getItem("toggleClasses")))var n=JSON.parse(localStorage.getItem("toggleClasses"));else n={};a.closest(".dokan-edit-row").find(".dokan-section-content").slideToggle(300,(function(){var t;e(this).is(":visible")?((t=a.find("i.fa-sort-desc")).removeClass("fa-flip-horizointal").addClass("fa-flip-vertical"),t.css("marginTop","9px"),n[a.data("togglehandler")]=!0):((t=a.find("i.fa-sort-desc")).removeClass("fa-flip-vertical").addClass("fa-flip-horizointal"),t.css("marginTop","0px"),n[a.data("togglehandler")]=!1),localStorage.setItem("toggleClasses",JSON.stringify(n))}))},loadSelect2:function(){e(".dokan-select2").select2({language:{noResults:function(){return dokan.i18n_no_result_found}}})},bindProductTagDropdown:function(){e(".product_tag_search").select2({allowClear:!1,tags:dokan.product_vendors_can_create_tags&&"on"===dokan.product_vendors_can_create_tags,createTag:function(t){var a=e.trim(t.term);return""===a?null:{id:a,text:a,newTag:!0}},insertTag:function(t,a){var n=!1;e.each(t,(function(t,o){e.trim(a.text).toUpperCase()==e.trim(o.text).toUpperCase()&&(n=!0)})),n||t.unshift(a)},minimumInputLength:2,maximumSelectionLength:void 0!==dokan.maximum_tags_select_length?dokan.maximum_tags_select_length:-1,ajax:{url:dokan.ajaxurl,dataType:"json",delay:250,data:function(e){return{q:e.term,action:"dokan_json_search_products_tags",security:dokan.search_products_tags_nonce,page:e.page||1}},processResults:function(t){var a=[];return t&&e.each(t,(function(e,t){a.push({id:t[0],text:t[1]})})),{results:a,pagination:{more:0!=a.length}}},cache:!0},language:{errorLoading:function(){return dokan.i18n_searching},inputTooLong:function(e){var t=e.input.length-e.maximum;return 1===t?dokan.i18n_input_too_long_1:dokan.i18n_input_too_long_n.replace("%qty%",t)},inputTooShort:function(e){var t=e.minimum-e.input.length;return 1===t?dokan.i18n_input_too_short_1:dokan.i18n_input_too_short_n.replace("%qty%",t)},loadingMore:function(){return dokan.i18n_load_more},maximumSelected:function(e){return 1===e.maximum?dokan.i18n_selection_too_long_1:dokan.i18n_selection_too_long_n.replace("%qty%",e.maximum)},noResults:function(){return dokan.i18n_no_matches},searching:function(){return dokan.i18n_searching}}})},addProductPopup:function(e){e.preventDefault(),n.openProductPopup()},openProductPopup:function(){const o=wp.template("dokan-add-new-product"),i=e("#dokan-add-product-popup");n.modal=i.iziModal({headerColor:dokan.modal_header_color,overlayColor:"rgba(0, 0, 0, 0.8)",width:690,top:32,onOpening:()=>{n.reRenderPopupElements()},onClosed:()=>{t=void 0,a=void 0,e('#dokan-add-new-product-popup input[name="_sale_price_dates_from"], #dokan-add-new-product-popup input[name="_sale_price_dates_to"]').datepicker("destroy")}}),n.modal.iziModal("setContent",o().trim()),n.modal.iziModal("open")},reRenderPopupElements:function(){n.loadSelect2(),n.bindProductTagDropdown(),e("#dokan-add-new-product-popup .sale_price_dates_fields input").daterangepicker({singleDatePicker:!0,showDropdowns:!1,autoApply:!0,parentEl:"#dokan-add-new-product-popup",opens:"left",autoUpdateInput:!1}).on("apply.daterangepicker",(function(t,a){e(this).val(a.startDate.format("YYYY-MM-DD"))})),e(".tips").tooltip(),n.gallery.sortable(),e("body").trigger("dokan-product-editor-popup-opened",n)},createNewProduct:function(t){t.preventDefault();var o=e(this),i=o.closest("form#dokan-add-new-product-form"),r=o.attr("data-btn_id");if(i.find("span.dokan-show-add-product-success").html(""),i.find("span.dokan-show-add-product-error").html(""),i.find("span.dokan-add-new-product-spinner").css("display","inline-block"),o.attr("disabled","disabled"),""==i.find('input[name="post_title"]').val())return e("span.dokan-show-add-product-error").html(dokan.product_title_required),o.removeAttr("disabled"),void i.find("span.dokan-add-new-product-spinner").css("display","none");if("-1"==i.find('select[name="product_cat"]').val())return e("span.dokan-show-add-product-error").html(dokan.product_category_required),o.removeAttr("disabled"),void i.find("span.dokan-add-new-product-spinner").css("display","none");var d={action:"dokan_create_new_product",postdata:i.serialize(),_wpnonce:dokan.nonce};n.modal.iziModal("startLoading"),e.post(dokan.ajaxurl,d,(function(t){t.success?(o.removeAttr("disabled"),"create_new"===r?(e("#dokan-add-product-popup").iziModal("close"),window.location.href=t.data):(a=void 0,e(".dokan-dashboard-product-listing-wrapper").load(window.location.href+" table.product-listing-table"),n.modal.iziModal("resetContent"),n.openProductPopup(),n.reRenderPopupElements(),e("span.dokan-show-add-product-success").html(dokan.product_created_response),setTimeout((function(){e("span.dokan-show-add-product-success").html("")}),3e3))):(o.removeAttr("disabled"),e("span.dokan-show-add-product-error").html(t.data)),i.find("span.dokan-add-new-product-spinner").css("display","none")})).always((function(){n.modal.iziModal("stopLoading")}))},attribute:{toggleAttribute:function(t){t.preventDefault();var a=e(this),n=a.closest("li").find(".dokan-product-attribute-item");return e(n).hasClass("dokan-hide")?(a.closest(".dokan-product-attribute-heading").css({borderBottom:"1px solid #e3e3e3"}),e(n).slideDown(200,(function(){a.find("i.fa").removeClass("fa-flip-horizointal").addClass("fa-flip-vertical"),e(this).removeClass("dokan-hide"),e(t.target).hasClass("dokan-product-attribute-heading")?e(t.target).hasClass("dokan-product-attribute-heading")&&a.find("a.dokan-product-toggle-attribute").css("top","12px"):e(t.target).closest("a").css("top","12px")}))):e(n).slideUp(200,(function(){e(this).addClass("dokan-hide"),a.find("i.fa").removeClass("fa-flip-vertical").addClass("fa-flip-horizointal"),e(t.target).hasClass("dokan-product-attribute-heading")?e(t.target).hasClass("dokan-product-attribute-heading")&&a.find("a.dokan-product-toggle-attribute").css("top","7px"):e(t.target).closest("a").css("top","7px"),a.closest(".dokan-product-attribute-heading").css({borderBottom:"none"})})),!1},sortable:function(){e(".dokan-product-attribute-wrapper ul").sortable({items:"li.product-attribute-list",cursor:"move",scrollSensitivity:40,forcePlaceholderSize:!0,forceHelperSize:!1,helper:"clone",opacity:.65,placeholder:"dokan-sortable-placeholder",start:function(e,t){t.item.css("background-color","#f6f6f6")},stop:function(e,t){t.item.removeAttr("style")},update:function(e,t){n.attribute.reArrangeAttribute()}})},dynamicAttrNameChange:function(t){t.preventDefault();var a=e(this),n=a.val();""==n?a.closest("li").find("strong").html(dokan.i18n_attribute_label):a.closest("li").find("strong").html(n)},selectAllAttr:function(t){return t.preventDefault(),e(this).closest("li.product-attribute-list").find("select.dokan_attribute_values option").attr("selected","selected"),e(this).closest("li.product-attribute-list").find("select.dokan_attribute_values").trigger("change"),!1},selectNoneAttr:function(t){return t.preventDefault(),e(this).closest("li.product-attribute-list").find("select.dokan_attribute_values option").removeAttr("selected"),e(this).closest("li.product-attribute-list").find("select.dokan_attribute_values").trigger("change"),!1},reArrangeAttribute:function(){e(".dokan-product-attribute-wrapper").find("ul.dokan-attribute-option-list").find("li.product-attribute-list").css("cursor","default").each((function(t){e(this).find(".attribute_position").val(t)}))},addNewExtraAttr:async function(t){t.preventDefault();var a=e(this).closest("li.product-attribute-list"),n=a.data("taxonomy"),o=(await dokan_sweetalert(dokan.new_attribute_prompt,{action:"prompt",input:"text"})).value;if(o){var i={action:"dokan_add_new_attribute",taxonomy:n,term:o,_wpnonce:dokan.nonce};e.post(dokan.ajaxurl,i,(function(e){e.error?dokan_sweetalert(e.error,{action:"alert",icon:"warning"}):e.slug&&(a.find("select.dokan_attribute_values").append('<option value="'+e.slug+'" selected="selected">'+e.name+"</option>"),a.find("select.dokan_attribute_values").trigger("change"))}))}},addNewAttribute:function(t){t.preventDefault();var a=e(this),o=a.closest(".dokan-attribute-type").find("select#predefined_attribute"),i=o.val(),r=e("ul.dokan-attribute-option-list .product-attribute-list").length,d={action:"dokan_get_pre_attribute",taxonomy:i,i:r,_wpnonce:dokan.nonce};a.closest(".dokan-attribute-type").find("span.dokan-attribute-spinner").removeClass("dokan-hide"),e.post(dokan.ajaxurl,d,(function(t){if(t.success){var r=e(".dokan-product-attribute-wrapper").find("ul.dokan-attribute-option-list");if($html=e.parseHTML(t.data),e($html).find(".dokan-product-attribute-item").removeClass("dokan-hide"),e($html).find("i.fa.fa-sort-desc").removeClass("fa-flip-horizointal").addClass("fa-flip-vertical"),e($html).find("a.dokan-product-toggle-attribute").css("top","12px"),e($html).find(".dokan-product-attribute-heading").css({borderBottom:"1px solid #e3e3e3"}),r.append($html),n.loadSelect2(),n.bindProductTagDropdown(),n.attribute.reArrangeAttribute(),"variable"!==e("select#product_type").val()){let t=e("div.dokan-product-attribute-wrapper label.show_if_variable");for(let a of t){let t=e(a).find('input[type="checkbox"]');t.length>0&&t[0].getAttribute("name")?.startsWith("attribute_variation[")&&e(a).hide()}}}a.closest(".dokan-attribute-type").find("span.dokan-attribute-spinner").addClass("dokan-hide"),i&&(o.find('option[value="'+i+'"]').attr("disabled","disabled"),o.val(""))})).done((function(){e("select#product_type").trigger("change")}))},removeAttribute:async function(t){t.stopPropagation(),t.preventDefault();const a=await dokan_sweetalert(dokan.remove_attribute,{action:"confirm",icon:"warning"});if("undefined"!==a&&a.isConfirmed){var o=e(this).closest("li.product-attribute-list");o.fadeOut(300,(function(){o.is(".taxonomy")?(o.find("select, input[type=text]").val(""),e("select.dokan_attribute_taxonomy").find('option[value="'+o.data("taxonomy")+'"]').removeAttr("disabled")):(o.find("select, input[type=text]").val(""),o.hide()),n.attribute.reArrangeAttribute()}))}return!1},saveAttribute:function(t){t.preventDefault(),e(this);var a={post_id:e("#dokan-edit-product-id").val(),data:e("ul.dokan-attribute-option-list").find("input, select, textarea").serialize(),action:"dokan_save_attributes"};e(".dokan-product-attribute-wrapper").block({message:null,fadeIn:50,fadeOut:1e3,overlayCSS:{background:"#fff",opacity:.6}}),e.post(dokan.ajaxurl,a,(function(t){e("#dokan-variable-product-options").load(window.location.toString()+" #dokan-variable-product-options-inner",(function(){e("#dokan-variable-product-options").trigger("reload"),e("select#product_type").trigger("change"),e(".dokan-product-attribute-wrapper").unblock()}))}))},disbalePredefinedAttribute:function(){e("ul.dokan-attribute-option-list li.product-attribute-list").each((function(t,a){"none"!==e(a).css("display")&&e(a).is(".taxonomy")&&e("select#predefined_attribute").find('option[value="'+e(a).data("taxonomy")+'"]').attr("disabled","disabled")}))}},inputValidate:function(t){return t.preventDefault(),""==e("#post_title").val().trim()?(e("#post_title").focus(),void e("div.dokan-product-title-alert").removeClass("dokan-hide")):(e("div.dokan-product-title-alert").hide(),-1==e("select.product_cat").val()?(e("select.product_cat").focus(),void e("div.dokan-product-cat-alert").removeClass("dokan-hide")):(e("div.dokan-product-cat-alert").hide(),e("input[type=submit]").attr("disabled","disabled"),void this.submit()))},downloadable:function(){e(this).prop("checked")?e(this).closest("aside").find(".dokan-side-body").removeClass("dokan-hide"):e(this).closest("aside").find(".dokan-side-body").addClass("dokan-hide")},showDiscountSchedule:function(t){t.preventDefault(),e(".sale-schedule-container").slideToggle("fast")},showManageStock:function(t){const a=e("#product_type").val();e(this).is(":checked")&&"external"!==a?e(".show_if_stock").slideDown("fast"):e(".show_if_stock").slideUp("fast"),"simple"===a&&(e(this).is(":checked")?e(".hide_if_stock_global").slideUp("fast"):e(".hide_if_stock_global").slideDown("fast"))},gallery:{addImages:function(a){a.preventDefault();var n=e(this),o=n.closest(".dokan-product-gallery").find("#product_images_container ul.product_images"),i=n.closest(".dokan-product-gallery").find("#product_image_gallery");t||(t=wp.media({title:dokan.i18n_choose_gallery,library:{type:"image"},button:{text:dokan.i18n_choose_gallery_btn_text},multiple:!0})).on("select",(function(){t.state().get("selection").map((function(t){t=t.toJSON(),attachment_ids=[],t.id&&"image"===t.type&&(e('<li class="image" data-attachment_id="'+t.id+'">                                    <img src="'+t.url+'" />                                    <a href="#" class="action-delete">&times;</a>                                </li>').insertBefore(o.find("li.add-image")),e("#product_images_container ul li.image").css("cursor","default").each((function(){var e=jQuery(this).attr("data-attachment_id");attachment_ids.push(e)})),i.val(attachment_ids.join(",")))}))})),t.open()},deleteImage:function(t){t.preventDefault();var a=e(this),n=(a.closest(".dokan-product-gallery").find("#product_images_container ul.product_images"),a.closest(".dokan-product-gallery").find("#product_image_gallery"));a.closest("li.image").remove();var o=[];return e("#product_images_container ul li.image").css("cursor","default").each((function(){var t=e(this).attr("data-attachment_id");o.push(t)})),n.val(o.join(",")),!1},sortable:function(){e("body").find("#product_images_container ul.product_images").sortable({items:"li.image",cursor:"move",scrollSensitivity:40,forcePlaceholderSize:!0,forceHelperSize:!1,helper:"clone",opacity:.65,placeholder:"dokan-sortable-placeholder",start:function(e,t){t.item.css("background-color","#f6f6f6")},stop:function(e,t){t.item.removeAttr("style")},update:function(t,a){var n=[];e("body").find("#product_images_container ul li.image").css("cursor","default").each((function(){var e=jQuery(this).attr("data-attachment_id");n.push(e)})),e("body").find("#product_image_gallery").val(n.join(","))}})}},featuredImage:{addImage:function(t){t.preventDefault();var n=e(this);a||(a=wp.media({title:dokan.i18n_choose_featured_img,library:{type:"image"},button:{text:dokan.i18n_choose_featured_img_btn_text}})).on("select",(function(){a.state().get("selection").map((function(e){if("image"===(e=e.toJSON()).type){n.siblings("input.dokan-feat-image-id").val(e.id);var t=n.closest(".instruction-inside"),a=t.siblings(".image-wrap");a.find("img").attr("src",e.url),a.find("img").removeAttr("srcset"),t.addClass("dokan-hide"),a.removeClass("dokan-hide")}}))})),a.open()},removeImage:function(t){t.preventDefault();var a=e(this).closest(".image-wrap"),n=a.siblings(".instruction-inside");n.find("input.dokan-feat-image-id").val("0"),a.addClass("dokan-hide"),n.removeClass("dokan-hide")}},fileDownloadable:function(t){t.preventDefault();var a,n=e(this);a||((a=wp.media({title:dokan.i18n_choose_file,button:{text:dokan.i18n_choose_file_btn_text},multiple:!0})).on("select",(function(){a.state().get("selection").map((function(e){e=e.toJSON(),n.closest("tr").find("input.wc_file_url, input.wc_variation_file_url").val(e.url)}))})),a.on("ready",(function(){a.uploader.options.uploader.params={type:"downloadable_product"}}))),a.open()}};e((function(){function t(){var t=e("#product_type").val(),a=e("input#_virtual:checked").length,n=e("input#_downloadable:checked").length;let o=e(".dokan-product-shipping-tax");var i=".hide_if_downloadable, .hide_if_virtual",r=".show_if_downloadable, .show_if_virtual";e.each(Object.keys(dokan.product_types),(function(e,t){i=i+", .hide_if_"+t,r=r+", .show_if_"+t})),e(i).show(),e(r).hide(),n&&e(".show_if_downloadable").show(),a&&e(".show_if_virtual").show(),e(".show_if_"+t).show(),n&&e(".hide_if_downloadable").hide(),a?(e(".hide_if_virtual").hide(),1===e(".dokan-product-shipping-tax .dokan-section-content").first().children().length?o.hide():(o.hasClass("hide_if_virtual")&&o.removeClass("hide_if_virtual"),o.show())):o.show(),e(".hide_if_"+t).hide(),e("input#_manage_stock").trigger("change")}n.init(),e("select#product_type").on("change",(function(){var a=e(this).val();"variable"===a&&(e("input#_manage_stock").trigger("change"),e("input#_downloadable").prop("checked",!1),e("input#_virtual").removeAttr("checked")),t(),e(document.body).trigger("dokan-product-type-change",a,e(this))})).trigger("change"),e(".product-edit-container").on("change","input#_downloadable, input#_virtual",(function(){t()})).trigger("change"),e("input#_downloadable").trigger("change"),e("input#_virtual").trigger("change"),e(".sale_price_dates_fields").each((function(){var t=e(this),a=!1,n=t.closest("div, table");t.find("input").each((function(){""!==e(this).val()&&(a=!0)})),a?(n.find(".sale_schedule").hide(),n.find(".sale_price_dates_fields").show()):(n.find(".sale_schedule").show(),n.find(".sale_price_dates_fields").hide())})),e(".product-edit-container").on("click",".sale_schedule",(function(){var t=e(this).closest(".product-edit-container, div.dokan-product-variation-itmes, table");return e(this).hide(),t.find(".cancel_sale_schedule").show(),t.find(".sale_price_dates_fields").show(),!1})),e(".product-edit-container").on("click",".cancel_sale_schedule",(function(){var t=e(".product-edit-container, div.dokan-product-variation-itmes, table");return e(this).hide(),t.find(".sale_schedule").show(),t.find(".sale_price_dates_fields").hide(),t.find(".sale_price_dates_fields").find("input").val(""),!1})),e("#dokan-product-title-area").on("click",".edit-slug",(function(){!function(){var t,a,n,o,i=0,r=e("#post_name"),d=r.val(),s=e("#sample-permalink"),l=s.html(),c=e("#sample-permalink a").html(),u=e("#edit-slug-buttons"),p=u.html(),m=e("#editable-post-name-full");for(m.find("img").replaceWith((function(){return this.alt})),m=m.html(),s.html(c),n=e("#editable-post-name"),o=n.html(),u.html('<button type="button" class="save button button-small">'+dokan.i18n_ok_text+'</button> <button type="button" class="cancel button-link">'+dokan.i18n_cancel_text+"</button>"),u.children(".save").on("click",(function(){var t=n.children("input").val();t!=e("#editable-post-name-full").text()?e.post(ajaxurl,{action:"sample-permalink",post_id:e("#dokan-edit-product-id").val(),new_slug:t,new_title:e("#post_title").val(),samplepermalinknonce:e("#samplepermalinknonce").val()},(function(a){var n=e("#edit-slug-box");n.html(a),n.hasClass("hidden")&&n.fadeIn("fast",(function(){n.removeClass("hidden")})),u.html(p),s.html(l),r.val(t),e(".edit-slug").focus(),e("#editable-post-name-full-dokan").val(e("#editable-post-name-full").html())})):u.children(".cancel").trigger("click")})),u.children(".cancel").on("click",(function(){e("#view-post-btn").show(),n.html(o),u.html(p),s.html(l),r.val(d),e(".edit-slug").focus()})),t=0;t<m.length;++t)"%"==m.charAt(t)&&i++;a=i>m.length/4?"":m,n.html('<input type="text" id="new-post-slug" value="'+a+'" autocomplete="off" />').children("input").on("keydown",(function(e){var t=e.which;13===t&&(e.preventDefault(),u.children(".save").trigger("click")),27===t&&u.children(".cancel").trigger("click")})).on("keyup",(function(){r.val(this.value)})).focus()}()})),e("#dokan-edit-product-id").val()&&e("#post_title").val()&&e("#samplepermalinknonce").val()&&e.post(ajaxurl,{action:"sample-permalink",post_id:e("#dokan-edit-product-id").val(),new_slug:e("#edited-post-name-dokan").val(),new_title:e("#post_title").val(),samplepermalinknonce:e("#samplepermalinknonce").val()},(function(t){e("#edit-slug-box").html(t)})),e(window).on("load",(function(){e("input#_virtual:checked").length&&t()}))}))}(jQuery),jQuery((function(e){function t(e,t,a){jQuery('<div class="chart-tooltip">'+a+"</div>").css({top:t-16,left:e+20}).appendTo("body").fadeIn(200)}wp.customize,e(".datepicker").datepicker({dateFormat:"yy-mm-dd"}),e(".dokan-table tbody").on("click",".toggle-row",(function(){e(this).closest("tr").toggleClass("is-expanded")})),e(".dokan-start-date").datepicker({defaultDate:"",dateFormat:"yy-mm-dd",numberOfMonths:1,onSelect:function(t){let a=new Date(t);a.setDate(a.getDate()+1),e(".dokan-end-date").datepicker("option",{minDate:a})}}),e(".dokan-end-date").datepicker({defaultDate:"",dateFormat:"yy-mm-dd",numberOfMonths:1,onSelect:function(t){let a=new Date(t);a.setDate(a.getDate()-1),e("dokan-start-date").datepicker("option",{maxDate:a})}}),e(".tips").tooltip();var a=null,n=null;jQuery(".chart-placeholder").on("plothover",(function(e,o,i){if(i){if((a!=i.dataIndex||n!=i.seriesIndex)&&(a=i.dataIndex,n=i.seriesIndex,jQuery(".chart-tooltip").remove(),i.series.points.show||i.series.enable_tooltip)){var r=i.series.data[i.dataIndex][1];tooltip_content="",i.series.prepend_label&&(tooltip_content=tooltip_content+i.series.label+": "),i.series.prepend_tooltip&&(tooltip_content+=i.series.prepend_tooltip),tooltip_content+=r,i.series.append_tooltip&&(tooltip_content+=i.series.append_tooltip),i.series.pie.show?t(o.pageX,o.pageY,tooltip_content):t(i.pageX,i.pageY,tooltip_content)}}else jQuery(".chart-tooltip").remove(),a=null}))})),function(e){e.validator.setDefaults({ignore:":hidden"});var t=function(t,a){e(a).closest(".dokan-form-group").addClass("has-error").append(t)},a=function(t,a){e(a).closest(".dokan-form-group").removeClass("has-error"),e(t).remove()},n=wp.customize,o='input[name="settings[bank][disconnect]"], input[name="settings[paypal][disconnect]"], input[name="settings[skrill][disconnect]"], input[name="settings[dokan_custom][disconnect]"]',i={init:function(){return e("a.dokan-banner-drag").on("click",this.imageUpload),e("a.dokan-remove-banner-image").on("click",this.removeBanner),e("a.dokan-pro-gravatar-drag").on("click",this.gragatarImageUpload),e("a.dokan-gravatar-drag").on("click",this.simpleImageUpload),e("a.dokan-remove-gravatar-image").on("click",this.removeGravatar),e(".dokan-update-setting-top-button").on("click",(function(){e("input[name='dokan_update_store_settings']").trigger("click")})),this.validateForm(this),e(".dokan_payment_disconnect_btn").on("click",(function(){var t=e(this).closest("form"),a=e("form#"+t.attr("id"));e(":input",t).not(":button, :submit, :reset, :hidden, :checkbox").val("").prop("selected",!1);var n=t.serializeArray().reduce((function(e,t){return e[t.name]=t.value,e}),{});n[e(this).attr("name")]="",n.form_id=t.attr("id"),n.action="dokan_settings",i.handleRequest(a,n,!0)})),!1},calculateImageSelectOptions:function(e,t){var a,o,i,r,d,s,l=parseInt(dokan.store_banner_dimension.width,10),c=parseInt(dokan.store_banner_dimension.height,10),u=!!parseInt(dokan.store_banner_dimension["flex-width"],10),p=!!parseInt(dokan.store_banner_dimension["flex-height"],10);return d=e.get("width"),r=e.get("height"),this.headerImage=new n.HeaderTool.ImageModel,this.headerImage.set({themeWidth:l,themeHeight:c,themeFlexWidth:u,themeFlexHeight:p,imageWidth:d,imageHeight:r}),t.set("canSkipCrop",!this.headerImage.shouldBeCropped()),(o=d)/(i=r)>(a=l/c)?l=(c=i)*a:c=(l=o)/a,s={handles:!0,keys:!0,instance:!0,persistent:!0,imageWidth:d,imageHeight:r,x1:0,y1:0,x2:l,y2:c},!1===p&&!1===u&&(s.aspectRatio=l+":"+c),!1===p&&(s.maxHeight=c),!1===u&&(s.maxWidth=l),s},onSelect:function(){this.frame.setState("cropper")},onCropped:function(e){var t=e.url,a=e.attachment_id,n=e.width,o=e.height;this.setImageFromURL(t,a,n,o)},onSkippedCrop:function(e){var t=e.get("url"),a=e.get("width"),n=e.get("height");this.setImageFromURL(t,e.id,a,n)},setImageFromURL:function(t,a,n,o){var i=!1;if(e(this.uploadBtn).hasClass("dokan-banner-drag"))(r=e(this.uploadBtn).closest(".dokan-banner")).find("input.dokan-file-field").val(a),r.find("img.dokan-banner-img").attr("src",t),e(this.uploadBtn).parent().siblings(".image-wrap",r).removeClass("dokan-hide"),e(this.uploadBtn).parent(".button-area").addClass("dokan-hide"),i=!0;else if(e(this.uploadBtn).hasClass("dokan-pro-gravatar-drag")){var r;(r=e(this.uploadBtn).closest(".dokan-gravatar")).find("input.dokan-file-field").val(a),r.find("img.dokan-gravatar-img").attr("src",t),i=!0,e(this.uploadBtn).parent().siblings(".gravatar-wrap",r).removeClass("dokan-hide"),e(this.uploadBtn).parent(".gravatar-button-area").addClass("dokan-hide")}!0===i&&(e(window).on("beforeunload",(function(){return dokan.dokan_banner_added_alert_msg})),e(document).ready((function(){e("#store-form").on("submit",(function(t){return e(window).off("beforeunload"),!0}))})))},removeImage:function(){n.HeaderTool.currentHeader.trigger("hide"),n.HeaderTool.CombinedList.trigger("control:removeImage")},imageUpload:function(e){e.preventDefault();var t=i;t.uploadBtn=this,t.frame=wp.media({multiple:!1,button:{text:dokan.selectAndCrop,close:!1},states:[new wp.media.controller.Library({title:dokan.chooseImage,library:wp.media.query({type:"image"}),multiple:!1,date:!1,priority:20,suggestedWidth:dokan.store_banner_dimension.width,suggestedHeight:dokan.store_banner_dimension.height}),new wp.media.controller.Cropper({suggestedWidth:5e3,imgSelectOptions:t.calculateImageSelectOptions})]}),t.frame.on("select",t.onSelect,t),t.frame.on("cropped",t.onCropped,t),t.frame.on("skippedcrop",t.onSkippedCrop,t),t.frame.open()},calculateImageSelectOptionsProfile:function(e,t){var a,o,i,r,d,s,l=150,c=150,u=!!parseInt(dokan.store_banner_dimension["flex-width"],10),p=!!parseInt(dokan.store_banner_dimension["flex-height"],10);return d=e.get("width"),r=e.get("height"),this.headerImage=new n.HeaderTool.ImageModel,this.headerImage.set({themeWidth:l,themeHeight:c,themeFlexWidth:u,themeFlexHeight:p,imageWidth:d,imageHeight:r}),t.set("canSkipCrop",!this.headerImage.shouldBeCropped()),(o=d)/(i=r)>(a=l/c)?l=(c=i)*a:c=(l=o)/a,s={handles:!0,keys:!0,instance:!0,persistent:!0,imageWidth:d,imageHeight:r,x1:0,y1:0,x2:l,y2:c},!1===p&&!1===u&&(s.aspectRatio=l+":"+c),!1===p&&(s.maxHeight=c),!1===u&&(s.maxWidth=l),s},simpleImageUpload:function(t){t.preventDefault();var a,n=e(this);a||(a=wp.media.frames.file_frame=wp.media({title:jQuery(this).data("uploader_title"),button:{text:jQuery(this).data("uploader_button_text")},multiple:!1})).on("select",(function(){var e=a.state().get("selection").first().toJSON(),t=n.closest(".dokan-gravatar");t.find("input.dokan-file-field").val(e.id),t.find("img.dokan-gravatar-img").attr("src",e.url),n.parent().siblings(".gravatar-wrap",t).removeClass("dokan-hide"),n.parent(".gravatar-button-area").addClass("dokan-hide")})),a.open()},gragatarImageUpload:function(e){e.preventDefault();var t=i;t.uploadBtn=this,t.frame=wp.media({multiple:!1,button:{text:dokan.selectAndCrop,close:!1},states:[new wp.media.controller.Library({title:dokan.chooseImage,library:wp.media.query({type:"image"}),multiple:!1,date:!1,priority:20,suggestedWidth:150,suggestedHeight:150}),new wp.media.controller.Cropper({imgSelectOptions:t.calculateImageSelectOptionsProfile})]}),t.frame.on("select",t.onSelect,t),t.frame.on("cropped",t.onCropped,t),t.frame.on("skippedcrop",t.onSkippedCrop,t),t.frame.open()},submitSettings:function(t){"undefined"!=typeof tinyMCE&&tinyMCE.triggerSave();var a=e("form#"+t),n=a.serialize()+"&action=dokan_settings&form_id="+t;i.handleRequest(a,n,!1)},handleRequest:function(t,a,n){n?t.find(".ajax_prev.disconnect").append('<span class="dokan-loading"> </span>'):t.find(".ajax_prev.save").append('<span class="dokan-loading"> </span>'),e(".dokan-update-setting-top-button span.dokan-loading").remove(),e(".dokan-update-setting-top-button").append('<span class="dokan-loading"> </span>'),e.post(dokan.ajaxurl,a,(function(a){t.find("span.dokan-loading").remove(),e(".dokan-update-setting-top-button span.dokan-loading").remove(),e("html,body").animate({scrollTop:e(".dokan-dashboard-header").offset().top}),a.success?(e(".dokan-ajax-response").html(e("<div/>",{class:"dokan-alert dokan-alert-success",html:"<p>"+a.data.msg+"</p>"})),e(".dokan-ajax-response").append(a.data.progress),dokan&&dokan.storeProgressBar&&dokan.storeProgressBar.init(),o=o.replaceAll("input","button"),n?t.find(o).addClass("dokan-hide"):t.find(o).removeClass("dokan-hide")):e(".dokan-ajax-response").html(e("<div/>",{class:"dokan-alert dokan-alert-danger",html:"<p>"+a.data+"</p>"}))}))},validateForm:function(n){e("form#settings-form, form#profile-form, form#store-form, form#payment-form").validate({submitHandler:function(e){n.submitSettings(e.getAttribute("id"))},errorElement:"span",errorClass:"error",errorPlacement:t,success:a,ignore:".select2-search__field, :hidden, .mapboxgl-ctrl-geocoder--input"})},removeBanner:function(t){t.preventDefault();var a=e(this).closest(".image-wrap"),n=a.siblings(".button-area");a.find("input.dokan-file-field").val("0"),a.addClass("dokan-hide"),n.removeClass("dokan-hide")},removeGravatar:function(t){t.preventDefault();var a=e(this).closest(".gravatar-wrap"),n=a.siblings(".gravatar-button-area");a.find("input.dokan-file-field").val("0"),a.addClass("dokan-hide"),n.removeClass("dokan-hide")}},r={init:function(){this.withdrawValidate(this)},withdrawValidate:function(n){e("form.withdraw").validate({errorElement:"span",errorClass:"error",errorPlacement:t,success:a})}},d={init:function(){this.validate(this)},validate:function(a){e("form#dokan-form-contact-seller").validate({errorPlacement:t,errorElement:"span",success:function(e,t){e.removeClass("error"),e.remove()},submitHandler:async function(t,a){a.preventDefault(),e(t).block({message:null,overlayCSS:{background:"#fff url("+dokan.ajax_loader+") no-repeat center",opacity:.6}}),await dokan_execute_recaptcha("form#dokan-form-contact-seller .dokan_recaptcha_token","dokan_contact_seller_recaptcha");var n=e(t).serialize();e.post(dokan.ajaxurl,n,(function(a){e(t).unblock(),void 0!==a.data&&e(t).find(".ajax-response").html(a.data),e(t).find("input[type=text], input[type=email], textarea, input[name=dokan_recaptcha_token]").val("").removeClass("valid")}))}})}};e((function(){i.init(),r.init(),d.init(),e(".dokan-form-horizontal").on("change","input[type=checkbox]#lbl_setting_minimum_quantity",(function(){var t=e(".show_if_needs_sw_discount");e(this).is(":checked")?(t.find('input[type="number"]').val(""),t.slideDown("slow")):t.slideUp("slow")}))}))}(jQuery),function(e){var t=DokanValidateMsg;t.maxlength=e.validator.format(t.maxlength_msg),t.minlength=e.validator.format(t.minlength_msg),t.rangelength=e.validator.format(t.rangelength_msg),t.range=e.validator.format(t.range_msg),t.max=e.validator.format(t.max_msg),t.min=e.validator.format(t.min_msg),e.validator.messages=t,e(document).on("click","#dokan_store_tnc_enable",(function(t){e(this).is(":checked")?e("#dokan_tnc_text").show():e("#dokan_tnc_text").hide()})).ready((function(t){e("#dokan_store_tnc_enable").is(":checked")?e("#dokan_tnc_text").show():e("#dokan_tnc_text").hide()}))}(jQuery),function(e){var t="undefined"!=typeof wp&&wp.customize&&wp.customize.selectiveRefresh;function a(){dokan.store_banner_dimension.width;var t=dokan.store_banner_dimension.height/dokan.store_banner_dimension.width*e("#dokan-content").width();e(".dokan-profile-frame-wrapper .profile-info-img.dummy-image").css({height:t})}a(),e(window).on("resize",(function(e){a()})),t&&wp.customize.selectiveRefresh.bind("partial-content-rendered",(function(e){console.log("placement",e),"store_header_template"===e.partial.id&&a()})),e(":input.dokan-product-search").filter(":not(.enhanced)").each((function(){var t={allowClear:!!e(this).data("allow_clear"),placeholder:e(this).data("placeholder"),minimumInputLength:e(this).data("minimum_input_length")?e(this).data("minimum_input_length"):"3",escapeMarkup:function(e){return e},language:{errorLoading:function(){return dokan.i18n_searching},inputTooLong:function(e){var t=e.input.length-e.maximum;return 1===t?dokan.i18n_input_too_long_1:dokan.i18n_input_too_long_n.replace("%qty%",t)},inputTooShort:function(e){var t=e.minimum-e.input.length;return 1===t?dokan.i18n_input_too_short_1:dokan.i18n_input_too_short_n.replace("%qty%",t)},loadingMore:function(){return dokan.i18n_load_more},maximumSelected:function(e){return 1===e.maximum?dokan.i18n_selection_too_long_1:dokan.i18n_selection_too_long_n.replace("%qty%",e.maximum)},noResults:function(){return dokan.i18n_no_matches},searching:function(){return dokan.i18n_searching}},ajax:{url:dokan.ajaxurl,dataType:"json",delay:250,data:function(t){return{term:t.term,action:e(this).data("action")||"dokan_json_search_products_and_variations",security:dokan.search_products_nonce,exclude:e(this).data("exclude"),user_ids:e(this).data("user_ids"),include:e(this).data("include"),limit:e(this).data("limit")}},processResults:function(t){var a=[];return t&&e.each(t,(function(e,t){a.push({id:e,text:t})})),{results:a}},cache:!0}};if(e(this).select2(t).addClass("enhanced"),e(this).data("sortable")){var a=e(this),n=e(this).next(".select2-container").find("ul.select2-selection__rendered");n.sortable({placeholder:"ui-state-highlight select2-selection__choice",forcePlaceholderSize:!0,items:"li:not(.select2-search__field)",tolerance:"pointer",stop:function(){e(n.find(".select2-selection__choice").get().reverse()).each((function(){var t=e(this).data("data").id,n=a.find('option[value="'+t+'"]')[0];a.prepend(n)}))}})}})),selected_items=[],e("#cb-select-all").on("change",(function(t){var a=e(this),n=e(".cb-select-items");a.is(":checked")?n.each((function(t,a){e(a).prop("checked","checked")})):n.each((function(t,a){e(a).prop("checked",""),selected_items.pop()}))}))}(jQuery),function(e){function t(t,a){const n=e(t.target).closest("li.has-submenu");n.find(".navigation-submenu").each(((t,o)=>{if(a)n.removeClass("submenu-hovered"),e(".dokan-dashboard-wrap").css("height",""),e(o).css("bottom",0),e(o).removeAttr("style");else{n.addClass("submenu-hovered");let t=n[0].getBoundingClientRect(),a=o.getBoundingClientRect(),i=e(".dokan-dashboard-wrap"),r=i[0].getBoundingClientRect(),d=Math.min(r.bottom,r.height);if(d<a.height){let e=a.height-d;t.top<t.height&&(e+=t.top),i.css("height",r.height+e)}else i.css("height","");if(t.top<t.height)e(o).css("bottom","unset"),e(o).css("top",0);else{e(o).css("top","unset");let n=t.top-a.height;if(n>0)e(o).css("bottom",0),a=o.getBoundingClientRect(),a.top<0&&(e(o).css("bottom","unset"),e(o).css("top",0));else{e(o).css("bottom",n);let t=e(".dokan-dash-sidebar")[0].getBoundingClientRect(),i=e(".entry-header")[0].getBoundingClientRect();a=o.getBoundingClientRect(),a.bottom>t.bottom?n+=a.bottom-t.bottom:a.bottom-i.bottom<a.height&&(n+=a.bottom-i.bottom-a.height-20),e(o).css("bottom",n)}}}}))}e(document.body).on("wc_add_error_tip",(function(t,a,n){var o=a.position();0===a.parent().find(".wc_error_tip").length&&(a.after('<div class="wc_error_tip '+n+'">'+dokan[n]+"</div>"),a.parent().find(".wc_error_tip").css("left",o.left+a.width()-a.width()/2-e(".wc_error_tip").width()/2).css("top",o.top+a.height()).fadeIn("100"))})).on("wc_remove_error_tip",(function(t,a,n){a.parent().find(".wc_error_tip."+n).fadeOut("100",(function(){e(this).remove()}))})).on("click",(function(){e(".wc_error_tip").fadeOut("100",(function(){e(this).remove()}))})).on("blur",".wc_input_decimal[type=text], .wc_input_price[type=text], .wc_input_country_iso[type=text]",(function(){e(".wc_error_tip").fadeOut("100",(function(){e(this).remove()}))})).on("change",".wc_input_price[type=text], .wc_input_decimal[type=text], .wc-order-totals #refund_amount[type=text]",(function(){var t,a,n=dokan.decimal_point;(e(this).is(".wc_input_price")||e(this).is("#refund_amount"))&&(n=dokan.mon_decimal_point),t=new RegExp("[^-0-9%\\"+n+"]+","gi"),a=new RegExp("\\"+n+"+","gi");var o=e(this).val(),i=o.replace(t,"").replace(a,n);o!==i&&e(this).val(i)})).on("keyup",".wc_input_price[type=text], .wc_input_decimal[type=text], .wc_input_country_iso[type=text], .wc-order-totals #refund_amount[type=text]",(function(){var t,a,n,o=!1;e(this).is(".wc_input_price")||e(this).is("#refund_amount")?(o=!0,t=new RegExp("[^-0-9%\\"+dokan.mon_decimal_point+"]+","gi"),n=new RegExp("[^\\"+dokan.mon_decimal_point+"]","gi"),a="i18n_mon_decimal_error"):e(this).is(".wc_input_country_iso")?(t=new RegExp("([^A-Z])+|(.){3,}","im"),a="i18n_country_iso_error"):(o=!0,t=new RegExp("[^-0-9%\\"+dokan.decimal_point+"]+","gi"),n=new RegExp("[^\\"+dokan.decimal_point+"]","gi"),a="i18n_decimal_error");var i=e(this).val(),r=i.replace(t,"");o&&1<r.replace(n,"").length&&(r=r.replace(n,"")),i!==r?e(document.body).triggerHandler("wc_add_error_tip",[e(this),a]):e(document.body).triggerHandler("wc_remove_error_tip",[e(this),a])})).on("change","#_sale_price.wc_input_price[type=text], .wc_input_price[name^=variable_sale_price], #_subscription_sale_price.wc_input_price[type=text]",(function(){var t,a=e(this),n=e("#product_type");t=-1!==a.attr("name").indexOf("variable")?a.parents(".variable_pricing").find(".wc_input_price[name^=variable_regular_price]"):n.length&&"subscription"===n.find(":selected").val()?e("#_subscription_price"):e("#_regular_price"),parseFloat(window.accounting.unformat(a.val(),dokan.mon_decimal_point))>=parseFloat(window.accounting.unformat(t.val(),dokan.mon_decimal_point))&&e(this).val("")})).on("keyup","#_sale_price.wc_input_price[type=text], .wc_input_price[name^=variable_sale_price], #_subscription_sale_price.wc_input_price[type=text]",(function(){var t,a=e(this),n=e("#product_type");t=-1!==a.attr("name").indexOf("variable")?a.parents(".variable_pricing").find(".wc_input_price[name^=variable_regular_price]"):n.length&&"subscription"===n.find(":selected").val()?e("#_subscription_price"):e("#_regular_price"),parseFloat(window.accounting.unformat(a.val(),dokan.mon_decimal_point))>=parseFloat(window.accounting.unformat(t.val(),dokan.mon_decimal_point))?e(document.body).triggerHandler("wc_add_error_tip",[e(this),"i18n_sale_less_than_regular_error"]):e(document.body).triggerHandler("wc_remove_error_tip",[e(this),"i18n_sale_less_than_regular_error"])})).on("init_tooltips",(function(){e(".tips, .help_tip, .woocommerce-help-tip").tipTip({attribute:"data-tip",fadeIn:50,fadeOut:50,delay:200}),e(".column-wc_actions .wc-action-button").tipTip({fadeIn:50,fadeOut:50,delay:200}),e(".parent-tips").each((function(){e(this).closest("a, th").attr("data-tip",e(this).data("tip")).tipTip({attribute:"data-tip",fadeIn:50,fadeOut:50,delay:200}).css("cursor","help")}))})),e("#dokan-navigation .dokan-dashboard-menu li.has-submenu:not(.active)").on("mouseover",(e=>{t(e)})).on("mouseout",(e=>{t(e,!0)}))}(jQuery),window.dokan_show_delete_prompt=async function(e,t){e.preventDefault();let a=await dokan_sweetalert(t,{action:"confirm",icon:"warning"});if(a.isConfirmed&&void 0!==e.target.href)window.location.href=e.target.href;else{if(!a.isConfirmed||void 0===e.target.dataset.url)return!1;window.location.href=e.target.dataset.url}},window.dokan_bulk_delete_prompt=async function(e,t,a,n){"delete"===jQuery(a).val()&&(e.preventDefault(),(await dokan_sweetalert(t,{action:"confirm",icon:"warning"})).isConfirmed&&jQuery(n).submit())},function(e){var t={query:{},form:null,cateItemStringArray:[],init:function(){e("#dokan-store-listing-filter-wrap .sort-by #stores_orderby").on("change",this.buildSortByQuery),e("#dokan-store-listing-filter-wrap .toggle-view span").on("click",this.toggleView),e("#dokan-store-listing-filter-wrap .dokan-store-list-filter-button, #dokan-store-listing-filter-wrap .dokan-icons, #dokan-store-listing-filter-form-wrap .apply-filter #cancel-filter-btn ").on("click",this.toggleForm),e("#dokan-store-listing-filter-form-wrap .store-search-input").on("change",this.buildSearchQuery),e("#dokan-store-listing-filter-form-wrap .apply-filter #apply-filter-btn").on("click",this.submitForm),this.maybeHideListView();const a=t;a.form=document.forms.dokan_store_lists_filter_form;const n=a.getLocal("dokan-layout");if(n){const t=e(".toggle-view span");a.setView(n,t)}const o=a.getParams();if(o.length){let t=!1;o.forEach((function(e){const n=Object.keys(e),i=Object.values(e);(!n.includes("stores_orderby")||o.length>1)&&(t=!0),a.setParams(n,i)})),t&&e("#dokan-store-listing-filter-form-wrap").slideToggle()}var i,r;e("#dokan-store-listing-filter-form-wrap").length&&e(".store-search-input").on("keypress",(function(t){if(13==t.which)return e("#dokan-store-listing-filter-form-wrap").submit(),!1})),e("body").on("click",(function(t){e(t.target).is("div#dokan-store-products-search-result li")||(e("#dokan-store-products-search-result").html(""),e("#dokan-store-products-search-result").removeClass("dokan-store-products-search-has-results"))})),e("body").on("keyup",".dokan-store-products-filter-search",(i=function(t){t.preventDefault();var a=e(this),n=a.val(),o=a.data("store_id");n&&(e(".dokan-store-products-filter-search").addClass("dokan-ajax-search-loader"),e("#dokan-store-products-search-result").removeClass("dokan-store-products-search-has-results"),e("#dokan-store-products-search-result").hide(),e("#dokan-store-products-search-result").html(""),jQuery.ajax({type:"post",dataType:"json",url:dokan.ajaxurl,data:{search_term:n,store_id:o,_wpnonce:dokan.store_product_search_nonce,action:"dokan_store_product_search_action"},success:function(t){e(".dokan-store-products-filter-search").removeClass("dokan-ajax-search-loader"),e("#dokan-store-products-search-result").show(),e("#dokan-store-products-search-result").addClass("dokan-store-products-search-has-results"),"success"==t.type?e("#dokan-store-products-search-result").html("<ul>"+t.data_list+"</ul>"):e("#dokan-store-products-search-result").html('<ul class="dokan-store-product-results-not-found">'+t.data_list+"</ul>")}}))},500,r=0,function(){var e=this,t=arguments;clearTimeout(r),r=setTimeout((function(){i.apply(e,t)}),500)}))},buildSortByQuery:function(e){const a=t;a.query.stores_orderby=e.target.value,a.submitForm(e)},toggleView:function(a){const n=t,o=e(a.target),i=o.parent().find("span"),r=o.data("view");n.setView(r,i),n.setLocal("dokan-layout",r)},setView:function(t,a){if(void 0===t||t.length<1||void 0===a||a.length<1)return;const n=e("#dokan-seller-listing-wrap");[...a].forEach((function(a){const o=e(a);t===o.data("view")?(o.addClass("active"),n.addClass(t)):(o.removeClass("active"),n.removeClass(o.data("view")))}))},toggleForm:function(t){t.preventDefault(),e("#dokan-store-listing-filter-form-wrap").slideToggle()},buildSearchQuery:function(e){e.target.value?t.query.dokan_seller_search=e.target.value:delete t.query.dokan_seller_search},submitForm:function(a){a.preventDefault(),t.query._store_filter_nonce&&delete t.query._store_filter_nonce,t.query._store_filter_nonce=e('input[name="_store_filter_nonce"]').first().val();const n=decodeURIComponent(e.param(t.query)),o="/page",i=window.location.pathname,r=i.includes(o)?i.substr(0,i.indexOf(o)):"";window.history.pushState(null,null,`${r}?${n}`),window.location.reload()},setLocal:function(e,t){window.localStorage.setItem(e,t)},getLocal:function(e){return window.localStorage.getItem(e)},setParams:function(a,n){const o=t,i=o.form?o.form.elements:"",r=document.forms.stores_sorting,d=r?r.elements:"";Object.values(d).forEach((function(t){t.name===a[0]&&e(t).val(n[0])})),Object.values(i).forEach((function(t){if(a.includes(t.name)&&("checkbox"===t.type?t.checked=!!["yes","true","1"].includes(n[0]):["text","search"].includes(t.type)&&(t.value=n[0])),a[0].includes("store_categories[")||a[0].includes("store_category[")){const t=n[0].split(" ").join("-"),a=e(`[data-slug=${t}]`);o.cateItemStringArray.includes(a.text().trim())||o.cateItemStringArray.push(a.text().trim()),a.addClass("dokan-btn-theme")}else if("rating"===a[0]){const t=n[0].split(" ").join("-");e(`[data-${a[0]}=${t}]`).addClass("active"),e(`[data-rating=${t}]`).parent().addClass("selected")}})),a.forEach((function(e,t){e.includes("[")||(o.query[e]=n[t])}))},getParams:function(){const e=new URLSearchParams(location.search),t=[];return e.forEach((function(e,a){t.push({[a]:e})})),t},maybeHideListView:function(){const a=t;window.matchMedia("(max-width: 767px)").matches&&"list-view"===a.getLocal("dokan-layout")&&a.setLocal("dokan-layout","grid-view"),e(window).on("resize",(function(){e(this).width()<767?(e("#dokan-seller-listing-wrap").removeClass("list-view"),e("#dokan-seller-listing-wrap").addClass("grid-view")):(e(".toggle-view.item span").last().removeClass("active"),e(".toggle-view.item span").first().addClass("active"))}))}};window.dokan&&(window.dokan.storeLists=t,window.dokan.storeLists.init())}(jQuery),(e=>{const t={init:()=>{e("#dokan-request-withdraw-button").on("click",(e=>{e.preventDefault(),t.openRequestWithdrawWindow()})),e(".dokan-withdraw-make-default-button").on("click",(e=>{e.preventDefault(),t.makeDefault(e)})),e("#dokan-withdraw-request-submit").on("click",(e=>{t.handleWithdrawRequest(e)})),e("#dokan-withdraw-display-schedule-popup").on("click",(e=>{t.opensScheduleWindow(e)})),e("#dokan-withdraw-schedule-request-submit").on("click",(e=>{t.handleScheduleChangeRequest(e)})),e("input[name='withdraw-schedule']").on("change",(e=>{t.handleScheduleChange(e)}))},openRequestWithdrawWindow:()=>{const a=wp.template("withdraw-request-popup"),n=e("#dokan-withdraw-request-popup").iziModal({width:690,overlayColor:"rgba(0, 0, 0, 0.8)",headerColor:dokan.modal_header_color});n.iziModal("setContent",a().trim()),n.iziModal("open"),t.init()},opensScheduleWindow:()=>{const a=wp.template("withdraw-schedule-popup"),n=e("#dokan-withdraw-schedule-popup").iziModal({width:690,overlayColor:"rgba(0, 0, 0, 0.8)",headerColor:dokan.modal_header_color});n.iziModal("setContent",a().trim()),n.iziModal("open"),t.init()},makeDefault:t=>{const a=e(t.target),n=e("#dokan-withdraw-payment-method-list");n.block({message:null,overlayCSS:{background:"#fff",opacity:.6}}),e.post(dokan.ajaxurl,{action:"dokan_withdraw_handle_make_default_method",nonce:n.data("security"),method:a.data("method")},(e=>{e.success?(dokan_sweetalert(e.data,{position:"bottom-end",toast:!0,icon:"success",showConfirmButton:!1,timer:2e3,timerProgressBar:!0}),n.unblock(),window.location.reload()):(dokan_sweetalert(e.data,{position:"bottom-end",toast:!0,icon:"error",showConfirmButton:!1,timer:2e3,timerProgressBar:!0}),n.unblock())}))},handleWithdrawRequest:t=>{t.preventDefault();const a=e("input#withdraw-amount").val(),n=e("input#dokan_withdraw_nonce").val(),o=e("#withdraw-request-popup"),i=e("#withdraw-method").val();o.block({message:null,overlayCSS:{background:"#fff",opacity:.6}}),e.post(dokan.ajaxurl,{action:"dokan_handle_withdraw_request",_handle_withdraw_request:n,amount:a,method:i},(async e=>{e.success?await dokan_sweetalert(e.data,{position:"bottom-end",toast:!0,icon:"success",showConfirmButton:!1,timer:2e3,timerProgressBar:!0,didOpen:e=>{setTimeout((function(){o.unblock(),window.location.reload()}),2e3)}}):(dokan_sweetalert("",{icon:"error",html:e.data}),o.unblock())}))},handleScheduleChangeRequest:t=>{t.preventDefault();const a=e("input[name='withdraw-schedule']:checked").val(),n=e("#dokan-withdraw-schedule-request-submit").data("security"),o=e("#withdraw-schedule-popup"),i=e("#withdraw-remaining-amount").val(),r=e("#minimum-withdraw-amount").val(),d=e("#preferred-payment-method").val();o.block({message:null,overlayCSS:{background:"#fff",opacity:.6}}),e.post(dokan.ajaxurl,{action:"dokan_handle_withdraw_schedule_change_request",nonce:n,schedule:a,reserve:i,minimum:r,method:d},(e=>{e.success?(dokan_sweetalert(e.data,{position:"bottom-end",toast:!0,icon:"success",showConfirmButton:!1,timer:2e3,timerProgressBar:!0}),o.unblock(),window.location.reload()):(dokan_sweetalert("",{icon:"error",html:e.data}),o.unblock())}))},handleScheduleChange:t=>{const a=e(t.target).data("next-schedule");e("#dokan-withdraw-next-scheduled-date").html(a)}};e(document).ready((function(){t.init()}))})(jQuery)})();
/*! Select2 4.0.13 | https://github.com/select2/select2/blob/master/LICENSE.md */
!function(n){"function"==typeof define&&define.amd?define(["jquery"],n):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),n(t),t}:n(jQuery)}(function(d){var e=function(){if(d&&d.fn&&d.fn.select2&&d.fn.select2.amd)var e=d.fn.select2.amd;var t,n,i,h,o,s,f,g,m,v,y,_,r,a,w,l;function b(e,t){return r.call(e,t)}function c(e,t){var n,i,r,o,s,a,l,c,u,d,p,h=t&&t.split("/"),f=y.map,g=f&&f["*"]||{};if(e){for(s=(e=e.split("/")).length-1,y.nodeIdCompat&&w.test(e[s])&&(e[s]=e[s].replace(w,"")),"."===e[0].charAt(0)&&h&&(e=h.slice(0,h.length-1).concat(e)),u=0;u<e.length;u++)if("."===(p=e[u]))e.splice(u,1),u-=1;else if(".."===p){if(0===u||1===u&&".."===e[2]||".."===e[u-1])continue;0<u&&(e.splice(u-1,2),u-=2)}e=e.join("/")}if((h||g)&&f){for(u=(n=e.split("/")).length;0<u;u-=1){if(i=n.slice(0,u).join("/"),h)for(d=h.length;0<d;d-=1)if(r=(r=f[h.slice(0,d).join("/")])&&r[i]){o=r,a=u;break}if(o)break;!l&&g&&g[i]&&(l=g[i],c=u)}!o&&l&&(o=l,a=c),o&&(n.splice(0,a,o),e=n.join("/"))}return e}function A(t,n){return function(){var e=a.call(arguments,0);return"string"!=typeof e[0]&&1===e.length&&e.push(null),s.apply(h,e.concat([t,n]))}}function x(t){return function(e){m[t]=e}}function D(e){if(b(v,e)){var t=v[e];delete v[e],_[e]=!0,o.apply(h,t)}if(!b(m,e)&&!b(_,e))throw new Error("No "+e);return m[e]}function u(e){var t,n=e?e.indexOf("!"):-1;return-1<n&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function S(e){return e?u(e):[]}return e&&e.requirejs||(e?n=e:e={},m={},v={},y={},_={},r=Object.prototype.hasOwnProperty,a=[].slice,w=/\.js$/,f=function(e,t){var n,i=u(e),r=i[0],o=t[1];return e=i[1],r&&(n=D(r=c(r,o))),r?e=n&&n.normalize?n.normalize(e,function(t){return function(e){return c(e,t)}}(o)):c(e,o):(r=(i=u(e=c(e,o)))[0],e=i[1],r&&(n=D(r))),{f:r?r+"!"+e:e,n:e,pr:r,p:n}},g={require:function(e){return A(e)},exports:function(e){var t=m[e];return void 0!==t?t:m[e]={}},module:function(e){return{id:e,uri:"",exports:m[e],config:function(e){return function(){return y&&y.config&&y.config[e]||{}}}(e)}}},o=function(e,t,n,i){var r,o,s,a,l,c,u,d=[],p=typeof n;if(c=S(i=i||e),"undefined"==p||"function"==p){for(t=!t.length&&n.length?["require","exports","module"]:t,l=0;l<t.length;l+=1)if("require"===(o=(a=f(t[l],c)).f))d[l]=g.require(e);else if("exports"===o)d[l]=g.exports(e),u=!0;else if("module"===o)r=d[l]=g.module(e);else if(b(m,o)||b(v,o)||b(_,o))d[l]=D(o);else{if(!a.p)throw new Error(e+" missing "+o);a.p.load(a.n,A(i,!0),x(o),{}),d[l]=m[o]}s=n?n.apply(m[e],d):void 0,e&&(r&&r.exports!==h&&r.exports!==m[e]?m[e]=r.exports:s===h&&u||(m[e]=s))}else e&&(m[e]=n)},t=n=s=function(e,t,n,i,r){if("string"==typeof e)return g[e]?g[e](t):D(f(e,S(t)).f);if(!e.splice){if((y=e).deps&&s(y.deps,y.callback),!t)return;t.splice?(e=t,t=n,n=null):e=h}return t=t||function(){},"function"==typeof n&&(n=i,i=r),i?o(h,e,t,n):setTimeout(function(){o(h,e,t,n)},4),s},s.config=function(e){return s(e)},t._defined=m,(i=function(e,t,n){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");t.splice||(n=t,t=[]),b(m,e)||b(v,e)||(v[e]=[e,t,n])}).amd={jQuery:!0},e.requirejs=t,e.require=n,e.define=i),e.define("almond",function(){}),e.define("jquery",[],function(){var e=d||$;return null==e&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),e}),e.define("select2/utils",["jquery"],function(o){var r={};function u(e){var t=e.prototype,n=[];for(var i in t){"function"==typeof t[i]&&"constructor"!==i&&n.push(i)}return n}r.Extend=function(e,t){var n={}.hasOwnProperty;function i(){this.constructor=e}for(var r in t)n.call(t,r)&&(e[r]=t[r]);return i.prototype=t.prototype,e.prototype=new i,e.__super__=t.prototype,e},r.Decorate=function(i,r){var e=u(r),t=u(i);function o(){var e=Array.prototype.unshift,t=r.prototype.constructor.length,n=i.prototype.constructor;0<t&&(e.call(arguments,i.prototype.constructor),n=r.prototype.constructor),n.apply(this,arguments)}r.displayName=i.displayName,o.prototype=new function(){this.constructor=o};for(var n=0;n<t.length;n++){var s=t[n];o.prototype[s]=i.prototype[s]}function a(e){var t=function(){};e in o.prototype&&(t=o.prototype[e]);var n=r.prototype[e];return function(){return Array.prototype.unshift.call(arguments,t),n.apply(this,arguments)}}for(var l=0;l<e.length;l++){var c=e[l];o.prototype[c]=a(c)}return o};function e(){this.listeners={}}e.prototype.on=function(e,t){this.listeners=this.listeners||{},e in this.listeners?this.listeners[e].push(t):this.listeners[e]=[t]},e.prototype.trigger=function(e){var t=Array.prototype.slice,n=t.call(arguments,1);this.listeners=this.listeners||{},null==n&&(n=[]),0===n.length&&n.push({}),(n[0]._type=e)in this.listeners&&this.invoke(this.listeners[e],t.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},e.prototype.invoke=function(e,t){for(var n=0,i=e.length;n<i;n++)e[n].apply(this,t)},r.Observable=e,r.generateChars=function(e){for(var t="",n=0;n<e;n++){t+=Math.floor(36*Math.random()).toString(36)}return t},r.bind=function(e,t){return function(){e.apply(t,arguments)}},r._convertData=function(e){for(var t in e){var n=t.split("-"),i=e;if(1!==n.length){for(var r=0;r<n.length;r++){var o=n[r];(o=o.substring(0,1).toLowerCase()+o.substring(1))in i||(i[o]={}),r==n.length-1&&(i[o]=e[t]),i=i[o]}delete e[t]}}return e},r.hasScroll=function(e,t){var n=o(t),i=t.style.overflowX,r=t.style.overflowY;return(i!==r||"hidden"!==r&&"visible"!==r)&&("scroll"===i||"scroll"===r||(n.innerHeight()<t.scrollHeight||n.innerWidth()<t.scrollWidth))},r.escapeMarkup=function(e){var t={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof e?e:String(e).replace(/[&<>"'\/\\]/g,function(e){return t[e]})},r.appendMany=function(e,t){if("1.7"===o.fn.jquery.substr(0,3)){var n=o();o.map(t,function(e){n=n.add(e)}),t=n}e.append(t)},r.__cache={};var n=0;return r.GetUniqueElementId=function(e){var t=e.getAttribute("data-select2-id");return null==t&&(e.id?(t=e.id,e.setAttribute("data-select2-id",t)):(e.setAttribute("data-select2-id",++n),t=n.toString())),t},r.StoreData=function(e,t,n){var i=r.GetUniqueElementId(e);r.__cache[i]||(r.__cache[i]={}),r.__cache[i][t]=n},r.GetData=function(e,t){var n=r.GetUniqueElementId(e);return t?r.__cache[n]&&null!=r.__cache[n][t]?r.__cache[n][t]:o(e).data(t):r.__cache[n]},r.RemoveData=function(e){var t=r.GetUniqueElementId(e);null!=r.__cache[t]&&delete r.__cache[t],e.removeAttribute("data-select2-id")},r}),e.define("select2/results",["jquery","./utils"],function(h,f){function i(e,t,n){this.$element=e,this.data=n,this.options=t,i.__super__.constructor.call(this)}return f.Extend(i,f.Observable),i.prototype.render=function(){var e=h('<ul class="select2-results__options" role="listbox"></ul>');return this.options.get("multiple")&&e.attr("aria-multiselectable","true"),this.$results=e},i.prototype.clear=function(){this.$results.empty()},i.prototype.displayMessage=function(e){var t=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var n=h('<li role="alert" aria-live="assertive" class="select2-results__option"></li>'),i=this.options.get("translations").get(e.message);n.append(t(i(e.args))),n[0].className+=" select2-results__message",this.$results.append(n)},i.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},i.prototype.append=function(e){this.hideLoading();var t=[];if(null!=e.results&&0!==e.results.length){e.results=this.sort(e.results);for(var n=0;n<e.results.length;n++){var i=e.results[n],r=this.option(i);t.push(r)}this.$results.append(t)}else 0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"})},i.prototype.position=function(e,t){t.find(".select2-results").append(e)},i.prototype.sort=function(e){return this.options.get("sorter")(e)},i.prototype.highlightFirstItem=function(){var e=this.$results.find(".select2-results__option[aria-selected]"),t=e.filter("[aria-selected=true]");0<t.length?t.first().trigger("mouseenter"):e.first().trigger("mouseenter"),this.ensureHighlightVisible()},i.prototype.setClasses=function(){var t=this;this.data.current(function(e){var i=h.map(e,function(e){return e.id.toString()});t.$results.find(".select2-results__option[aria-selected]").each(function(){var e=h(this),t=f.GetData(this,"data"),n=""+t.id;null!=t.element&&t.element.selected||null==t.element&&-1<h.inArray(n,i)?e.attr("aria-selected","true"):e.attr("aria-selected","false")})})},i.prototype.showLoading=function(e){this.hideLoading();var t={disabled:!0,loading:!0,text:this.options.get("translations").get("searching")(e)},n=this.option(t);n.className+=" loading-results",this.$results.prepend(n)},i.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},i.prototype.option=function(e){var t=document.createElement("li");t.className="select2-results__option";var n={role:"option","aria-selected":"false"},i=window.Element.prototype.matches||window.Element.prototype.msMatchesSelector||window.Element.prototype.webkitMatchesSelector;for(var r in(null!=e.element&&i.call(e.element,":disabled")||null==e.element&&e.disabled)&&(delete n["aria-selected"],n["aria-disabled"]="true"),null==e.id&&delete n["aria-selected"],null!=e._resultId&&(t.id=e._resultId),e.title&&(t.title=e.title),e.children&&(n.role="group",n["aria-label"]=e.text,delete n["aria-selected"]),n){var o=n[r];t.setAttribute(r,o)}if(e.children){var s=h(t),a=document.createElement("strong");a.className="select2-results__group";h(a);this.template(e,a);for(var l=[],c=0;c<e.children.length;c++){var u=e.children[c],d=this.option(u);l.push(d)}var p=h("<ul></ul>",{class:"select2-results__options select2-results__options--nested"});p.append(l),s.append(a),s.append(p)}else this.template(e,t);return f.StoreData(t,"data",e),t},i.prototype.bind=function(t,e){var l=this,n=t.id+"-results";this.$results.attr("id",n),t.on("results:all",function(e){l.clear(),l.append(e.data),t.isOpen()&&(l.setClasses(),l.highlightFirstItem())}),t.on("results:append",function(e){l.append(e.data),t.isOpen()&&l.setClasses()}),t.on("query",function(e){l.hideMessages(),l.showLoading(e)}),t.on("select",function(){t.isOpen()&&(l.setClasses(),l.options.get("scrollAfterSelect")&&l.highlightFirstItem())}),t.on("unselect",function(){t.isOpen()&&(l.setClasses(),l.options.get("scrollAfterSelect")&&l.highlightFirstItem())}),t.on("open",function(){l.$results.attr("aria-expanded","true"),l.$results.attr("aria-hidden","false"),l.setClasses(),l.ensureHighlightVisible()}),t.on("close",function(){l.$results.attr("aria-expanded","false"),l.$results.attr("aria-hidden","true"),l.$results.removeAttr("aria-activedescendant")}),t.on("results:toggle",function(){var e=l.getHighlightedResults();0!==e.length&&e.trigger("mouseup")}),t.on("results:select",function(){var e=l.getHighlightedResults();if(0!==e.length){var t=f.GetData(e[0],"data");"true"==e.attr("aria-selected")?l.trigger("close",{}):l.trigger("select",{data:t})}}),t.on("results:previous",function(){var e=l.getHighlightedResults(),t=l.$results.find("[aria-selected]"),n=t.index(e);if(!(n<=0)){var i=n-1;0===e.length&&(i=0);var r=t.eq(i);r.trigger("mouseenter");var o=l.$results.offset().top,s=r.offset().top,a=l.$results.scrollTop()+(s-o);0===i?l.$results.scrollTop(0):s-o<0&&l.$results.scrollTop(a)}}),t.on("results:next",function(){var e=l.getHighlightedResults(),t=l.$results.find("[aria-selected]"),n=t.index(e)+1;if(!(n>=t.length)){var i=t.eq(n);i.trigger("mouseenter");var r=l.$results.offset().top+l.$results.outerHeight(!1),o=i.offset().top+i.outerHeight(!1),s=l.$results.scrollTop()+o-r;0===n?l.$results.scrollTop(0):r<o&&l.$results.scrollTop(s)}}),t.on("results:focus",function(e){e.element.addClass("select2-results__option--highlighted")}),t.on("results:message",function(e){l.displayMessage(e)}),h.fn.mousewheel&&this.$results.on("mousewheel",function(e){var t=l.$results.scrollTop(),n=l.$results.get(0).scrollHeight-t+e.deltaY,i=0<e.deltaY&&t-e.deltaY<=0,r=e.deltaY<0&&n<=l.$results.height();i?(l.$results.scrollTop(0),e.preventDefault(),e.stopPropagation()):r&&(l.$results.scrollTop(l.$results.get(0).scrollHeight-l.$results.height()),e.preventDefault(),e.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(e){var t=h(this),n=f.GetData(this,"data");"true"!==t.attr("aria-selected")?l.trigger("select",{originalEvent:e,data:n}):l.options.get("multiple")?l.trigger("unselect",{originalEvent:e,data:n}):l.trigger("close",{})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(e){var t=f.GetData(this,"data");l.getHighlightedResults().removeClass("select2-results__option--highlighted"),l.trigger("results:focus",{data:t,element:h(this)})})},i.prototype.getHighlightedResults=function(){return this.$results.find(".select2-results__option--highlighted")},i.prototype.destroy=function(){this.$results.remove()},i.prototype.ensureHighlightVisible=function(){var e=this.getHighlightedResults();if(0!==e.length){var t=this.$results.find("[aria-selected]").index(e),n=this.$results.offset().top,i=e.offset().top,r=this.$results.scrollTop()+(i-n),o=i-n;r-=2*e.outerHeight(!1),t<=2?this.$results.scrollTop(0):(o>this.$results.outerHeight()||o<0)&&this.$results.scrollTop(r)}},i.prototype.template=function(e,t){var n=this.options.get("templateResult"),i=this.options.get("escapeMarkup"),r=n(e,t);null==r?t.style.display="none":"string"==typeof r?t.innerHTML=i(r):h(t).append(r)},i}),e.define("select2/keys",[],function(){return{BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46}}),e.define("select2/selection/base",["jquery","../utils","../keys"],function(n,i,r){function o(e,t){this.$element=e,this.options=t,o.__super__.constructor.call(this)}return i.Extend(o,i.Observable),o.prototype.render=function(){var e=n('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=i.GetData(this.$element[0],"old-tabindex")?this._tabindex=i.GetData(this.$element[0],"old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),e.attr("title",this.$element.attr("title")),e.attr("tabindex",this._tabindex),e.attr("aria-disabled","false"),this.$selection=e},o.prototype.bind=function(e,t){var n=this,i=e.id+"-results";this.container=e,this.$selection.on("focus",function(e){n.trigger("focus",e)}),this.$selection.on("blur",function(e){n._handleBlur(e)}),this.$selection.on("keydown",function(e){n.trigger("keypress",e),e.which===r.SPACE&&e.preventDefault()}),e.on("results:focus",function(e){n.$selection.attr("aria-activedescendant",e.data._resultId)}),e.on("selection:update",function(e){n.update(e.data)}),e.on("open",function(){n.$selection.attr("aria-expanded","true"),n.$selection.attr("aria-owns",i),n._attachCloseHandler(e)}),e.on("close",function(){n.$selection.attr("aria-expanded","false"),n.$selection.removeAttr("aria-activedescendant"),n.$selection.removeAttr("aria-owns"),n.$selection.trigger("focus"),n._detachCloseHandler(e)}),e.on("enable",function(){n.$selection.attr("tabindex",n._tabindex),n.$selection.attr("aria-disabled","false")}),e.on("disable",function(){n.$selection.attr("tabindex","-1"),n.$selection.attr("aria-disabled","true")})},o.prototype._handleBlur=function(e){var t=this;window.setTimeout(function(){document.activeElement==t.$selection[0]||n.contains(t.$selection[0],document.activeElement)||t.trigger("blur",e)},1)},o.prototype._attachCloseHandler=function(e){n(document.body).on("mousedown.select2."+e.id,function(e){var t=n(e.target).closest(".select2");n(".select2.select2-container--open").each(function(){this!=t[0]&&i.GetData(this,"element").select2("close")})})},o.prototype._detachCloseHandler=function(e){n(document.body).off("mousedown.select2."+e.id)},o.prototype.position=function(e,t){t.find(".selection").append(e)},o.prototype.destroy=function(){this._detachCloseHandler(this.container)},o.prototype.update=function(e){throw new Error("The `update` method must be defined in child classes.")},o.prototype.isEnabled=function(){return!this.isDisabled()},o.prototype.isDisabled=function(){return this.options.get("disabled")},o}),e.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(e,t,n,i){function r(){r.__super__.constructor.apply(this,arguments)}return n.Extend(r,t),r.prototype.render=function(){var e=r.__super__.render.call(this);return e.addClass("select2-selection--single"),e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),e},r.prototype.bind=function(t,e){var n=this;r.__super__.bind.apply(this,arguments);var i=t.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",i).attr("role","textbox").attr("aria-readonly","true"),this.$selection.attr("aria-labelledby",i),this.$selection.on("mousedown",function(e){1===e.which&&n.trigger("toggle",{originalEvent:e})}),this.$selection.on("focus",function(e){}),this.$selection.on("blur",function(e){}),t.on("focus",function(e){t.isOpen()||n.$selection.trigger("focus")})},r.prototype.clear=function(){var e=this.$selection.find(".select2-selection__rendered");e.empty(),e.removeAttr("title")},r.prototype.display=function(e,t){var n=this.options.get("templateSelection");return this.options.get("escapeMarkup")(n(e,t))},r.prototype.selectionContainer=function(){return e("<span></span>")},r.prototype.update=function(e){if(0!==e.length){var t=e[0],n=this.$selection.find(".select2-selection__rendered"),i=this.display(t,n);n.empty().append(i);var r=t.title||t.text;r?n.attr("title",r):n.removeAttr("title")}else this.clear()},r}),e.define("select2/selection/multiple",["jquery","./base","../utils"],function(r,e,l){function n(e,t){n.__super__.constructor.apply(this,arguments)}return l.Extend(n,e),n.prototype.render=function(){var e=n.__super__.render.call(this);return e.addClass("select2-selection--multiple"),e.html('<ul class="select2-selection__rendered"></ul>'),e},n.prototype.bind=function(e,t){var i=this;n.__super__.bind.apply(this,arguments),this.$selection.on("click",function(e){i.trigger("toggle",{originalEvent:e})}),this.$selection.on("click",".select2-selection__choice__remove",function(e){if(!i.isDisabled()){var t=r(this).parent(),n=l.GetData(t[0],"data");i.trigger("unselect",{originalEvent:e,data:n})}})},n.prototype.clear=function(){var e=this.$selection.find(".select2-selection__rendered");e.empty(),e.removeAttr("title")},n.prototype.display=function(e,t){var n=this.options.get("templateSelection");return this.options.get("escapeMarkup")(n(e,t))},n.prototype.selectionContainer=function(){return r('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>')},n.prototype.update=function(e){if(this.clear(),0!==e.length){for(var t=[],n=0;n<e.length;n++){var i=e[n],r=this.selectionContainer(),o=this.display(i,r);r.append(o);var s=i.title||i.text;s&&r.attr("title",s),l.StoreData(r[0],"data",i),t.push(r)}var a=this.$selection.find(".select2-selection__rendered");l.appendMany(a,t)}},n}),e.define("select2/selection/placeholder",["../utils"],function(e){function t(e,t,n){this.placeholder=this.normalizePlaceholder(n.get("placeholder")),e.call(this,t,n)}return t.prototype.normalizePlaceholder=function(e,t){return"string"==typeof t&&(t={id:"",text:t}),t},t.prototype.createPlaceholder=function(e,t){var n=this.selectionContainer();return n.html(this.display(t)),n.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),n},t.prototype.update=function(e,t){var n=1==t.length&&t[0].id!=this.placeholder.id;if(1<t.length||n)return e.call(this,t);this.clear();var i=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(i)},t}),e.define("select2/selection/allowClear",["jquery","../keys","../utils"],function(r,i,a){function e(){}return e.prototype.bind=function(e,t,n){var i=this;e.call(this,t,n),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(e){i._handleClear(e)}),t.on("keypress",function(e){i._handleKeyboardClear(e,t)})},e.prototype._handleClear=function(e,t){if(!this.isDisabled()){var n=this.$selection.find(".select2-selection__clear");if(0!==n.length){t.stopPropagation();var i=a.GetData(n[0],"data"),r=this.$element.val();this.$element.val(this.placeholder.id);var o={data:i};if(this.trigger("clear",o),o.prevented)this.$element.val(r);else{for(var s=0;s<i.length;s++)if(o={data:i[s]},this.trigger("unselect",o),o.prevented)return void this.$element.val(r);this.$element.trigger("input").trigger("change"),this.trigger("toggle",{})}}}},e.prototype._handleKeyboardClear=function(e,t,n){n.isOpen()||t.which!=i.DELETE&&t.which!=i.BACKSPACE||this._handleClear(t)},e.prototype.update=function(e,t){if(e.call(this,t),!(0<this.$selection.find(".select2-selection__placeholder").length||0===t.length)){var n=this.options.get("translations").get("removeAllItems"),i=r('<span class="select2-selection__clear" title="'+n()+'">&times;</span>');a.StoreData(i[0],"data",t),this.$selection.find(".select2-selection__rendered").prepend(i)}},e}),e.define("select2/selection/search",["jquery","../utils","../keys"],function(i,a,l){function e(e,t,n){e.call(this,t,n)}return e.prototype.render=function(e){var t=i('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></li>');this.$searchContainer=t,this.$search=t.find("input");var n=e.call(this);return this._transferTabIndex(),n},e.prototype.bind=function(e,t,n){var i=this,r=t.id+"-results";e.call(this,t,n),t.on("open",function(){i.$search.attr("aria-controls",r),i.$search.trigger("focus")}),t.on("close",function(){i.$search.val(""),i.$search.removeAttr("aria-controls"),i.$search.removeAttr("aria-activedescendant"),i.$search.trigger("focus")}),t.on("enable",function(){i.$search.prop("disabled",!1),i._transferTabIndex()}),t.on("disable",function(){i.$search.prop("disabled",!0)}),t.on("focus",function(e){i.$search.trigger("focus")}),t.on("results:focus",function(e){e.data._resultId?i.$search.attr("aria-activedescendant",e.data._resultId):i.$search.removeAttr("aria-activedescendant")}),this.$selection.on("focusin",".select2-search--inline",function(e){i.trigger("focus",e)}),this.$selection.on("focusout",".select2-search--inline",function(e){i._handleBlur(e)}),this.$selection.on("keydown",".select2-search--inline",function(e){if(e.stopPropagation(),i.trigger("keypress",e),i._keyUpPrevented=e.isDefaultPrevented(),e.which===l.BACKSPACE&&""===i.$search.val()){var t=i.$searchContainer.prev(".select2-selection__choice");if(0<t.length){var n=a.GetData(t[0],"data");i.searchRemoveChoice(n),e.preventDefault()}}}),this.$selection.on("click",".select2-search--inline",function(e){i.$search.val()&&e.stopPropagation()});var o=document.documentMode,s=o&&o<=11;this.$selection.on("input.searchcheck",".select2-search--inline",function(e){s?i.$selection.off("input.search input.searchcheck"):i.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(e){if(s&&"input"===e.type)i.$selection.off("input.search input.searchcheck");else{var t=e.which;t!=l.SHIFT&&t!=l.CTRL&&t!=l.ALT&&t!=l.TAB&&i.handleSearch(e)}})},e.prototype._transferTabIndex=function(e){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},e.prototype.createPlaceholder=function(e,t){this.$search.attr("placeholder",t.text)},e.prototype.update=function(e,t){var n=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),e.call(this,t),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),n&&this.$search.trigger("focus")},e.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var e=this.$search.val();this.trigger("query",{term:e})}this._keyUpPrevented=!1},e.prototype.searchRemoveChoice=function(e,t){this.trigger("unselect",{data:t}),this.$search.val(t.text),this.handleSearch()},e.prototype.resizeSearch=function(){this.$search.css("width","25px");var e="";""!==this.$search.attr("placeholder")?e=this.$selection.find(".select2-selection__rendered").width():e=.75*(this.$search.val().length+1)+"em";this.$search.css("width",e)},e}),e.define("select2/selection/eventRelay",["jquery"],function(s){function e(){}return e.prototype.bind=function(e,t,n){var i=this,r=["open","opening","close","closing","select","selecting","unselect","unselecting","clear","clearing"],o=["opening","closing","selecting","unselecting","clearing"];e.call(this,t,n),t.on("*",function(e,t){if(-1!==s.inArray(e,r)){t=t||{};var n=s.Event("select2:"+e,{params:t});i.$element.trigger(n),-1!==s.inArray(e,o)&&(t.prevented=n.isDefaultPrevented())}})},e}),e.define("select2/translation",["jquery","require"],function(t,n){function i(e){this.dict=e||{}}return i.prototype.all=function(){return this.dict},i.prototype.get=function(e){return this.dict[e]},i.prototype.extend=function(e){this.dict=t.extend({},e.all(),this.dict)},i._cache={},i.loadPath=function(e){if(!(e in i._cache)){var t=n(e);i._cache[e]=t}return new i(i._cache[e])},i}),e.define("select2/diacritics",[],function(){return{"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Œ":"OE","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","œ":"oe","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ώ":"ω","ς":"σ","’":"'"}}),e.define("select2/data/base",["../utils"],function(i){function n(e,t){n.__super__.constructor.call(this)}return i.Extend(n,i.Observable),n.prototype.current=function(e){throw new Error("The `current` method must be defined in child classes.")},n.prototype.query=function(e,t){throw new Error("The `query` method must be defined in child classes.")},n.prototype.bind=function(e,t){},n.prototype.destroy=function(){},n.prototype.generateResultId=function(e,t){var n=e.id+"-result-";return n+=i.generateChars(4),null!=t.id?n+="-"+t.id.toString():n+="-"+i.generateChars(4),n},n}),e.define("select2/data/select",["./base","../utils","jquery"],function(e,a,l){function n(e,t){this.$element=e,this.options=t,n.__super__.constructor.call(this)}return a.Extend(n,e),n.prototype.current=function(e){var n=[],i=this;this.$element.find(":selected").each(function(){var e=l(this),t=i.item(e);n.push(t)}),e(n)},n.prototype.select=function(r){var o=this;if(r.selected=!0,l(r.element).is("option"))return r.element.selected=!0,void this.$element.trigger("input").trigger("change");if(this.$element.prop("multiple"))this.current(function(e){var t=[];(r=[r]).push.apply(r,e);for(var n=0;n<r.length;n++){var i=r[n].id;-1===l.inArray(i,t)&&t.push(i)}o.$element.val(t),o.$element.trigger("input").trigger("change")});else{var e=r.id;this.$element.val(e),this.$element.trigger("input").trigger("change")}},n.prototype.unselect=function(r){var o=this;if(this.$element.prop("multiple")){if(r.selected=!1,l(r.element).is("option"))return r.element.selected=!1,void this.$element.trigger("input").trigger("change");this.current(function(e){for(var t=[],n=0;n<e.length;n++){var i=e[n].id;i!==r.id&&-1===l.inArray(i,t)&&t.push(i)}o.$element.val(t),o.$element.trigger("input").trigger("change")})}},n.prototype.bind=function(e,t){var n=this;(this.container=e).on("select",function(e){n.select(e.data)}),e.on("unselect",function(e){n.unselect(e.data)})},n.prototype.destroy=function(){this.$element.find("*").each(function(){a.RemoveData(this)})},n.prototype.query=function(i,e){var r=[],o=this;this.$element.children().each(function(){var e=l(this);if(e.is("option")||e.is("optgroup")){var t=o.item(e),n=o.matches(i,t);null!==n&&r.push(n)}}),e({results:r})},n.prototype.addOptions=function(e){a.appendMany(this.$element,e)},n.prototype.option=function(e){var t;e.children?(t=document.createElement("optgroup")).label=e.text:void 0!==(t=document.createElement("option")).textContent?t.textContent=e.text:t.innerText=e.text,void 0!==e.id&&(t.value=e.id),e.disabled&&(t.disabled=!0),e.selected&&(t.selected=!0),e.title&&(t.title=e.title);var n=l(t),i=this._normalizeItem(e);return i.element=t,a.StoreData(t,"data",i),n},n.prototype.item=function(e){var t={};if(null!=(t=a.GetData(e[0],"data")))return t;if(e.is("option"))t={id:e.val(),text:e.text(),disabled:e.prop("disabled"),selected:e.prop("selected"),title:e.prop("title")};else if(e.is("optgroup")){t={text:e.prop("label"),children:[],title:e.prop("title")};for(var n=e.children("option"),i=[],r=0;r<n.length;r++){var o=l(n[r]),s=this.item(o);i.push(s)}t.children=i}return(t=this._normalizeItem(t)).element=e[0],a.StoreData(e[0],"data",t),t},n.prototype._normalizeItem=function(e){e!==Object(e)&&(e={id:e,text:e});return null!=(e=l.extend({},{text:""},e)).id&&(e.id=e.id.toString()),null!=e.text&&(e.text=e.text.toString()),null==e._resultId&&e.id&&null!=this.container&&(e._resultId=this.generateResultId(this.container,e)),l.extend({},{selected:!1,disabled:!1},e)},n.prototype.matches=function(e,t){return this.options.get("matcher")(e,t)},n}),e.define("select2/data/array",["./select","../utils","jquery"],function(e,f,g){function i(e,t){this._dataToConvert=t.get("data")||[],i.__super__.constructor.call(this,e,t)}return f.Extend(i,e),i.prototype.bind=function(e,t){i.__super__.bind.call(this,e,t),this.addOptions(this.convertToOptions(this._dataToConvert))},i.prototype.select=function(n){var e=this.$element.find("option").filter(function(e,t){return t.value==n.id.toString()});0===e.length&&(e=this.option(n),this.addOptions(e)),i.__super__.select.call(this,n)},i.prototype.convertToOptions=function(e){var t=this,n=this.$element.find("option"),i=n.map(function(){return t.item(g(this)).id}).get(),r=[];function o(e){return function(){return g(this).val()==e.id}}for(var s=0;s<e.length;s++){var a=this._normalizeItem(e[s]);if(0<=g.inArray(a.id,i)){var l=n.filter(o(a)),c=this.item(l),u=g.extend(!0,{},a,c),d=this.option(u);l.replaceWith(d)}else{var p=this.option(a);if(a.children){var h=this.convertToOptions(a.children);f.appendMany(p,h)}r.push(p)}}return r},i}),e.define("select2/data/ajax",["./array","../utils","jquery"],function(e,t,o){function n(e,t){this.ajaxOptions=this._applyDefaults(t.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),n.__super__.constructor.call(this,e,t)}return t.Extend(n,e),n.prototype._applyDefaults=function(e){var t={data:function(e){return o.extend({},e,{q:e.term})},transport:function(e,t,n){var i=o.ajax(e);return i.then(t),i.fail(n),i}};return o.extend({},t,e,!0)},n.prototype.processResults=function(e){return e},n.prototype.query=function(n,i){var r=this;null!=this._request&&(o.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var t=o.extend({type:"GET"},this.ajaxOptions);function e(){var e=t.transport(t,function(e){var t=r.processResults(e,n);r.options.get("debug")&&window.console&&console.error&&(t&&t.results&&o.isArray(t.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),i(t)},function(){"status"in e&&(0===e.status||"0"===e.status)||r.trigger("results:message",{message:"errorLoading"})});r._request=e}"function"==typeof t.url&&(t.url=t.url.call(this.$element,n)),"function"==typeof t.data&&(t.data=t.data.call(this.$element,n)),this.ajaxOptions.delay&&null!=n.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(e,this.ajaxOptions.delay)):e()},n}),e.define("select2/data/tags",["jquery"],function(u){function e(e,t,n){var i=n.get("tags"),r=n.get("createTag");void 0!==r&&(this.createTag=r);var o=n.get("insertTag");if(void 0!==o&&(this.insertTag=o),e.call(this,t,n),u.isArray(i))for(var s=0;s<i.length;s++){var a=i[s],l=this._normalizeItem(a),c=this.option(l);this.$element.append(c)}}return e.prototype.query=function(e,c,u){var d=this;this._removeOldTags(),null!=c.term&&null==c.page?e.call(this,c,function e(t,n){for(var i=t.results,r=0;r<i.length;r++){var o=i[r],s=null!=o.children&&!e({results:o.children},!0);if((o.text||"").toUpperCase()===(c.term||"").toUpperCase()||s)return!n&&(t.data=i,void u(t))}if(n)return!0;var a=d.createTag(c);if(null!=a){var l=d.option(a);l.attr("data-select2-tag",!0),d.addOptions([l]),d.insertTag(i,a)}t.results=i,u(t)}):e.call(this,c,u)},e.prototype.createTag=function(e,t){var n=u.trim(t.term);return""===n?null:{id:n,text:n}},e.prototype.insertTag=function(e,t,n){t.unshift(n)},e.prototype._removeOldTags=function(e){this.$element.find("option[data-select2-tag]").each(function(){this.selected||u(this).remove()})},e}),e.define("select2/data/tokenizer",["jquery"],function(d){function e(e,t,n){var i=n.get("tokenizer");void 0!==i&&(this.tokenizer=i),e.call(this,t,n)}return e.prototype.bind=function(e,t,n){e.call(this,t,n),this.$search=t.dropdown.$search||t.selection.$search||n.find(".select2-search__field")},e.prototype.query=function(e,t,n){var i=this;t.term=t.term||"";var r=this.tokenizer(t,this.options,function(e){var t=i._normalizeItem(e);if(!i.$element.find("option").filter(function(){return d(this).val()===t.id}).length){var n=i.option(t);n.attr("data-select2-tag",!0),i._removeOldTags(),i.addOptions([n])}!function(e){i.trigger("select",{data:e})}(t)});r.term!==t.term&&(this.$search.length&&(this.$search.val(r.term),this.$search.trigger("focus")),t.term=r.term),e.call(this,t,n)},e.prototype.tokenizer=function(e,t,n,i){for(var r=n.get("tokenSeparators")||[],o=t.term,s=0,a=this.createTag||function(e){return{id:e.term,text:e.term}};s<o.length;){var l=o[s];if(-1!==d.inArray(l,r)){var c=o.substr(0,s),u=a(d.extend({},t,{term:c}));null!=u?(i(u),o=o.substr(s+1)||"",s=0):s++}else s++}return{term:o}},e}),e.define("select2/data/minimumInputLength",[],function(){function e(e,t,n){this.minimumInputLength=n.get("minimumInputLength"),e.call(this,t,n)}return e.prototype.query=function(e,t,n){t.term=t.term||"",t.term.length<this.minimumInputLength?this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:t.term,params:t}}):e.call(this,t,n)},e}),e.define("select2/data/maximumInputLength",[],function(){function e(e,t,n){this.maximumInputLength=n.get("maximumInputLength"),e.call(this,t,n)}return e.prototype.query=function(e,t,n){t.term=t.term||"",0<this.maximumInputLength&&t.term.length>this.maximumInputLength?this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:t.term,params:t}}):e.call(this,t,n)},e}),e.define("select2/data/maximumSelectionLength",[],function(){function e(e,t,n){this.maximumSelectionLength=n.get("maximumSelectionLength"),e.call(this,t,n)}return e.prototype.bind=function(e,t,n){var i=this;e.call(this,t,n),t.on("select",function(){i._checkIfMaximumSelected()})},e.prototype.query=function(e,t,n){var i=this;this._checkIfMaximumSelected(function(){e.call(i,t,n)})},e.prototype._checkIfMaximumSelected=function(e,n){var i=this;this.current(function(e){var t=null!=e?e.length:0;0<i.maximumSelectionLength&&t>=i.maximumSelectionLength?i.trigger("results:message",{message:"maximumSelected",args:{maximum:i.maximumSelectionLength}}):n&&n()})},e}),e.define("select2/dropdown",["jquery","./utils"],function(t,e){function n(e,t){this.$element=e,this.options=t,n.__super__.constructor.call(this)}return e.Extend(n,e.Observable),n.prototype.render=function(){var e=t('<span class="select2-dropdown"><span class="select2-results"></span></span>');return e.attr("dir",this.options.get("dir")),this.$dropdown=e},n.prototype.bind=function(){},n.prototype.position=function(e,t){},n.prototype.destroy=function(){this.$dropdown.remove()},n}),e.define("select2/dropdown/search",["jquery","../utils"],function(o,e){function t(){}return t.prototype.render=function(e){var t=e.call(this),n=o('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>');return this.$searchContainer=n,this.$search=n.find("input"),t.prepend(n),t},t.prototype.bind=function(e,t,n){var i=this,r=t.id+"-results";e.call(this,t,n),this.$search.on("keydown",function(e){i.trigger("keypress",e),i._keyUpPrevented=e.isDefaultPrevented()}),this.$search.on("input",function(e){o(this).off("keyup")}),this.$search.on("keyup input",function(e){i.handleSearch(e)}),t.on("open",function(){i.$search.attr("tabindex",0),i.$search.attr("aria-controls",r),i.$search.trigger("focus"),window.setTimeout(function(){i.$search.trigger("focus")},0)}),t.on("close",function(){i.$search.attr("tabindex",-1),i.$search.removeAttr("aria-controls"),i.$search.removeAttr("aria-activedescendant"),i.$search.val(""),i.$search.trigger("blur")}),t.on("focus",function(){t.isOpen()||i.$search.trigger("focus")}),t.on("results:all",function(e){null!=e.query.term&&""!==e.query.term||(i.showSearch(e)?i.$searchContainer.removeClass("select2-search--hide"):i.$searchContainer.addClass("select2-search--hide"))}),t.on("results:focus",function(e){e.data._resultId?i.$search.attr("aria-activedescendant",e.data._resultId):i.$search.removeAttr("aria-activedescendant")})},t.prototype.handleSearch=function(e){if(!this._keyUpPrevented){var t=this.$search.val();this.trigger("query",{term:t})}this._keyUpPrevented=!1},t.prototype.showSearch=function(e,t){return!0},t}),e.define("select2/dropdown/hidePlaceholder",[],function(){function e(e,t,n,i){this.placeholder=this.normalizePlaceholder(n.get("placeholder")),e.call(this,t,n,i)}return e.prototype.append=function(e,t){t.results=this.removePlaceholder(t.results),e.call(this,t)},e.prototype.normalizePlaceholder=function(e,t){return"string"==typeof t&&(t={id:"",text:t}),t},e.prototype.removePlaceholder=function(e,t){for(var n=t.slice(0),i=t.length-1;0<=i;i--){var r=t[i];this.placeholder.id===r.id&&n.splice(i,1)}return n},e}),e.define("select2/dropdown/infiniteScroll",["jquery"],function(n){function e(e,t,n,i){this.lastParams={},e.call(this,t,n,i),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return e.prototype.append=function(e,t){this.$loadingMore.remove(),this.loading=!1,e.call(this,t),this.showLoadingMore(t)&&(this.$results.append(this.$loadingMore),this.loadMoreIfNeeded())},e.prototype.bind=function(e,t,n){var i=this;e.call(this,t,n),t.on("query",function(e){i.lastParams=e,i.loading=!0}),t.on("query:append",function(e){i.lastParams=e,i.loading=!0}),this.$results.on("scroll",this.loadMoreIfNeeded.bind(this))},e.prototype.loadMoreIfNeeded=function(){var e=n.contains(document.documentElement,this.$loadingMore[0]);if(!this.loading&&e){var t=this.$results.offset().top+this.$results.outerHeight(!1);this.$loadingMore.offset().top+this.$loadingMore.outerHeight(!1)<=t+50&&this.loadMore()}},e.prototype.loadMore=function(){this.loading=!0;var e=n.extend({},{page:1},this.lastParams);e.page++,this.trigger("query:append",e)},e.prototype.showLoadingMore=function(e,t){return t.pagination&&t.pagination.more},e.prototype.createLoadingMore=function(){var e=n('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'),t=this.options.get("translations").get("loadingMore");return e.html(t(this.lastParams)),e},e}),e.define("select2/dropdown/attachBody",["jquery","../utils"],function(f,a){function e(e,t,n){this.$dropdownParent=f(n.get("dropdownParent")||document.body),e.call(this,t,n)}return e.prototype.bind=function(e,t,n){var i=this;e.call(this,t,n),t.on("open",function(){i._showDropdown(),i._attachPositioningHandler(t),i._bindContainerResultHandlers(t)}),t.on("close",function(){i._hideDropdown(),i._detachPositioningHandler(t)}),this.$dropdownContainer.on("mousedown",function(e){e.stopPropagation()})},e.prototype.destroy=function(e){e.call(this),this.$dropdownContainer.remove()},e.prototype.position=function(e,t,n){t.attr("class",n.attr("class")),t.removeClass("select2"),t.addClass("select2-container--open"),t.css({position:"absolute",top:-999999}),this.$container=n},e.prototype.render=function(e){var t=f("<span></span>"),n=e.call(this);return t.append(n),this.$dropdownContainer=t},e.prototype._hideDropdown=function(e){this.$dropdownContainer.detach()},e.prototype._bindContainerResultHandlers=function(e,t){if(!this._containerResultsHandlersBound){var n=this;t.on("results:all",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("results:append",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("results:message",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("select",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("unselect",function(){n._positionDropdown(),n._resizeDropdown()}),this._containerResultsHandlersBound=!0}},e.prototype._attachPositioningHandler=function(e,t){var n=this,i="scroll.select2."+t.id,r="resize.select2."+t.id,o="orientationchange.select2."+t.id,s=this.$container.parents().filter(a.hasScroll);s.each(function(){a.StoreData(this,"select2-scroll-position",{x:f(this).scrollLeft(),y:f(this).scrollTop()})}),s.on(i,function(e){var t=a.GetData(this,"select2-scroll-position");f(this).scrollTop(t.y)}),f(window).on(i+" "+r+" "+o,function(e){n._positionDropdown(),n._resizeDropdown()})},e.prototype._detachPositioningHandler=function(e,t){var n="scroll.select2."+t.id,i="resize.select2."+t.id,r="orientationchange.select2."+t.id;this.$container.parents().filter(a.hasScroll).off(n),f(window).off(n+" "+i+" "+r)},e.prototype._positionDropdown=function(){var e=f(window),t=this.$dropdown.hasClass("select2-dropdown--above"),n=this.$dropdown.hasClass("select2-dropdown--below"),i=null,r=this.$container.offset();r.bottom=r.top+this.$container.outerHeight(!1);var o={height:this.$container.outerHeight(!1)};o.top=r.top,o.bottom=r.top+o.height;var s=this.$dropdown.outerHeight(!1),a=e.scrollTop(),l=e.scrollTop()+e.height(),c=a<r.top-s,u=l>r.bottom+s,d={left:r.left,top:o.bottom},p=this.$dropdownParent;"static"===p.css("position")&&(p=p.offsetParent());var h={top:0,left:0};(f.contains(document.body,p[0])||p[0].isConnected)&&(h=p.offset()),d.top-=h.top,d.left-=h.left,t||n||(i="below"),u||!c||t?!c&&u&&t&&(i="below"):i="above",("above"==i||t&&"below"!==i)&&(d.top=o.top-h.top-s),null!=i&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+i),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+i)),this.$dropdownContainer.css(d)},e.prototype._resizeDropdown=function(){var e={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(e.minWidth=e.width,e.position="relative",e.width="auto"),this.$dropdown.css(e)},e.prototype._showDropdown=function(e){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},e}),e.define("select2/dropdown/minimumResultsForSearch",[],function(){function e(e,t,n,i){this.minimumResultsForSearch=n.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),e.call(this,t,n,i)}return e.prototype.showSearch=function(e,t){return!(function e(t){for(var n=0,i=0;i<t.length;i++){var r=t[i];r.children?n+=e(r.children):n++}return n}(t.data.results)<this.minimumResultsForSearch)&&e.call(this,t)},e}),e.define("select2/dropdown/selectOnClose",["../utils"],function(o){function e(){}return e.prototype.bind=function(e,t,n){var i=this;e.call(this,t,n),t.on("close",function(e){i._handleSelectOnClose(e)})},e.prototype._handleSelectOnClose=function(e,t){if(t&&null!=t.originalSelect2Event){var n=t.originalSelect2Event;if("select"===n._type||"unselect"===n._type)return}var i=this.getHighlightedResults();if(!(i.length<1)){var r=o.GetData(i[0],"data");null!=r.element&&r.element.selected||null==r.element&&r.selected||this.trigger("select",{data:r})}},e}),e.define("select2/dropdown/closeOnSelect",[],function(){function e(){}return e.prototype.bind=function(e,t,n){var i=this;e.call(this,t,n),t.on("select",function(e){i._selectTriggered(e)}),t.on("unselect",function(e){i._selectTriggered(e)})},e.prototype._selectTriggered=function(e,t){var n=t.originalEvent;n&&(n.ctrlKey||n.metaKey)||this.trigger("close",{originalEvent:n,originalSelect2Event:t})},e}),e.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(e){var t=e.input.length-e.maximum,n="Please delete "+t+" character";return 1!=t&&(n+="s"),n},inputTooShort:function(e){return"Please enter "+(e.minimum-e.input.length)+" or more characters"},loadingMore:function(){return"Loading more results…"},maximumSelected:function(e){var t="You can only select "+e.maximum+" item";return 1!=e.maximum&&(t+="s"),t},noResults:function(){return"No results found"},searching:function(){return"Searching…"},removeAllItems:function(){return"Remove all items"}}}),e.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(c,u,d,p,h,f,g,m,v,y,s,t,_,w,$,b,A,x,D,S,C,E,O,T,q,j,L,I,e){function n(){this.reset()}return n.prototype.apply=function(e){if(null==(e=c.extend(!0,{},this.defaults,e)).dataAdapter){if(null!=e.ajax?e.dataAdapter=$:null!=e.data?e.dataAdapter=w:e.dataAdapter=_,0<e.minimumInputLength&&(e.dataAdapter=y.Decorate(e.dataAdapter,x)),0<e.maximumInputLength&&(e.dataAdapter=y.Decorate(e.dataAdapter,D)),0<e.maximumSelectionLength&&(e.dataAdapter=y.Decorate(e.dataAdapter,S)),e.tags&&(e.dataAdapter=y.Decorate(e.dataAdapter,b)),null==e.tokenSeparators&&null==e.tokenizer||(e.dataAdapter=y.Decorate(e.dataAdapter,A)),null!=e.query){var t=u(e.amdBase+"compat/query");e.dataAdapter=y.Decorate(e.dataAdapter,t)}if(null!=e.initSelection){var n=u(e.amdBase+"compat/initSelection");e.dataAdapter=y.Decorate(e.dataAdapter,n)}}if(null==e.resultsAdapter&&(e.resultsAdapter=d,null!=e.ajax&&(e.resultsAdapter=y.Decorate(e.resultsAdapter,T)),null!=e.placeholder&&(e.resultsAdapter=y.Decorate(e.resultsAdapter,O)),e.selectOnClose&&(e.resultsAdapter=y.Decorate(e.resultsAdapter,L))),null==e.dropdownAdapter){if(e.multiple)e.dropdownAdapter=C;else{var i=y.Decorate(C,E);e.dropdownAdapter=i}if(0!==e.minimumResultsForSearch&&(e.dropdownAdapter=y.Decorate(e.dropdownAdapter,j)),e.closeOnSelect&&(e.dropdownAdapter=y.Decorate(e.dropdownAdapter,I)),null!=e.dropdownCssClass||null!=e.dropdownCss||null!=e.adaptDropdownCssClass){var r=u(e.amdBase+"compat/dropdownCss");e.dropdownAdapter=y.Decorate(e.dropdownAdapter,r)}e.dropdownAdapter=y.Decorate(e.dropdownAdapter,q)}if(null==e.selectionAdapter){if(e.multiple?e.selectionAdapter=h:e.selectionAdapter=p,null!=e.placeholder&&(e.selectionAdapter=y.Decorate(e.selectionAdapter,f)),e.allowClear&&(e.selectionAdapter=y.Decorate(e.selectionAdapter,g)),e.multiple&&(e.selectionAdapter=y.Decorate(e.selectionAdapter,m)),null!=e.containerCssClass||null!=e.containerCss||null!=e.adaptContainerCssClass){var o=u(e.amdBase+"compat/containerCss");e.selectionAdapter=y.Decorate(e.selectionAdapter,o)}e.selectionAdapter=y.Decorate(e.selectionAdapter,v)}e.language=this._resolveLanguage(e.language),e.language.push("en");for(var s=[],a=0;a<e.language.length;a++){var l=e.language[a];-1===s.indexOf(l)&&s.push(l)}return e.language=s,e.translations=this._processTranslations(e.language,e.debug),e},n.prototype.reset=function(){function a(e){return e.replace(/[^\u0000-\u007E]/g,function(e){return t[e]||e})}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:y.escapeMarkup,language:{},matcher:function e(t,n){if(""===c.trim(t.term))return n;if(n.children&&0<n.children.length){for(var i=c.extend(!0,{},n),r=n.children.length-1;0<=r;r--)null==e(t,n.children[r])&&i.children.splice(r,1);return 0<i.children.length?i:e(t,i)}var o=a(n.text).toUpperCase(),s=a(t.term).toUpperCase();return-1<o.indexOf(s)?n:null},minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,scrollAfterSelect:!1,sorter:function(e){return e},templateResult:function(e){return e.text},templateSelection:function(e){return e.text},theme:"default",width:"resolve"}},n.prototype.applyFromElement=function(e,t){var n=e.language,i=this.defaults.language,r=t.prop("lang"),o=t.closest("[lang]").prop("lang"),s=Array.prototype.concat.call(this._resolveLanguage(r),this._resolveLanguage(n),this._resolveLanguage(i),this._resolveLanguage(o));return e.language=s,e},n.prototype._resolveLanguage=function(e){if(!e)return[];if(c.isEmptyObject(e))return[];if(c.isPlainObject(e))return[e];var t;t=c.isArray(e)?e:[e];for(var n=[],i=0;i<t.length;i++)if(n.push(t[i]),"string"==typeof t[i]&&0<t[i].indexOf("-")){var r=t[i].split("-")[0];n.push(r)}return n},n.prototype._processTranslations=function(e,t){for(var n=new s,i=0;i<e.length;i++){var r=new s,o=e[i];if("string"==typeof o)try{r=s.loadPath(o)}catch(e){try{o=this.defaults.amdLanguageBase+o,r=s.loadPath(o)}catch(e){t&&window.console&&console.warn&&console.warn('Select2: The language file for "'+o+'" could not be automatically loaded. A fallback will be used instead.')}}else r=c.isPlainObject(o)?new s(o):o;n.extend(r)}return n},n.prototype.set=function(e,t){var n={};n[c.camelCase(e)]=t;var i=y._convertData(n);c.extend(!0,this.defaults,i)},new n}),e.define("select2/options",["require","jquery","./defaults","./utils"],function(i,d,r,p){function e(e,t){if(this.options=e,null!=t&&this.fromElement(t),null!=t&&(this.options=r.applyFromElement(this.options,t)),this.options=r.apply(this.options),t&&t.is("input")){var n=i(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=p.Decorate(this.options.dataAdapter,n)}}return e.prototype.fromElement=function(e){var t=["select2"];null==this.options.multiple&&(this.options.multiple=e.prop("multiple")),null==this.options.disabled&&(this.options.disabled=e.prop("disabled")),null==this.options.dir&&(e.prop("dir")?this.options.dir=e.prop("dir"):e.closest("[dir]").prop("dir")?this.options.dir=e.closest("[dir]").prop("dir"):this.options.dir="ltr"),e.prop("disabled",this.options.disabled),e.prop("multiple",this.options.multiple),p.GetData(e[0],"select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),p.StoreData(e[0],"data",p.GetData(e[0],"select2Tags")),p.StoreData(e[0],"tags",!0)),p.GetData(e[0],"ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),e.attr("ajax--url",p.GetData(e[0],"ajaxUrl")),p.StoreData(e[0],"ajax-Url",p.GetData(e[0],"ajaxUrl")));var n={};function i(e,t){return t.toUpperCase()}for(var r=0;r<e[0].attributes.length;r++){var o=e[0].attributes[r].name,s="data-";if(o.substr(0,s.length)==s){var a=o.substring(s.length),l=p.GetData(e[0],a);n[a.replace(/-([a-z])/g,i)]=l}}d.fn.jquery&&"1."==d.fn.jquery.substr(0,2)&&e[0].dataset&&(n=d.extend(!0,{},e[0].dataset,n));var c=d.extend(!0,{},p.GetData(e[0]),n);for(var u in c=p._convertData(c))-1<d.inArray(u,t)||(d.isPlainObject(this.options[u])?d.extend(this.options[u],c[u]):this.options[u]=c[u]);return this},e.prototype.get=function(e){return this.options[e]},e.prototype.set=function(e,t){this.options[e]=t},e}),e.define("select2/core",["jquery","./options","./utils","./keys"],function(o,c,u,i){var d=function(e,t){null!=u.GetData(e[0],"select2")&&u.GetData(e[0],"select2").destroy(),this.$element=e,this.id=this._generateId(e),t=t||{},this.options=new c(t,e),d.__super__.constructor.call(this);var n=e.attr("tabindex")||0;u.StoreData(e[0],"old-tabindex",n),e.attr("tabindex","-1");var i=this.options.get("dataAdapter");this.dataAdapter=new i(e,this.options);var r=this.render();this._placeContainer(r);var o=this.options.get("selectionAdapter");this.selection=new o(e,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,r);var s=this.options.get("dropdownAdapter");this.dropdown=new s(e,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,r);var a=this.options.get("resultsAdapter");this.results=new a(e,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var l=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(e){l.trigger("selection:update",{data:e})}),e.addClass("select2-hidden-accessible"),e.attr("aria-hidden","true"),this._syncAttributes(),u.StoreData(e[0],"select2",this),e.data("select2",this)};return u.Extend(d,u.Observable),d.prototype._generateId=function(e){return"select2-"+(null!=e.attr("id")?e.attr("id"):null!=e.attr("name")?e.attr("name")+"-"+u.generateChars(2):u.generateChars(4)).replace(/(:|\.|\[|\]|,)/g,"")},d.prototype._placeContainer=function(e){e.insertAfter(this.$element);var t=this._resolveWidth(this.$element,this.options.get("width"));null!=t&&e.css("width",t)},d.prototype._resolveWidth=function(e,t){var n=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==t){var i=this._resolveWidth(e,"style");return null!=i?i:this._resolveWidth(e,"element")}if("element"==t){var r=e.outerWidth(!1);return r<=0?"auto":r+"px"}if("style"!=t)return"computedstyle"!=t?t:window.getComputedStyle(e[0]).width;var o=e.attr("style");if("string"!=typeof o)return null;for(var s=o.split(";"),a=0,l=s.length;a<l;a+=1){var c=s[a].replace(/\s/g,"").match(n);if(null!==c&&1<=c.length)return c[1]}return null},d.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},d.prototype._registerDomEvents=function(){var t=this;this.$element.on("change.select2",function(){t.dataAdapter.current(function(e){t.trigger("selection:update",{data:e})})}),this.$element.on("focus.select2",function(e){t.trigger("focus",e)}),this._syncA=u.bind(this._syncAttributes,this),this._syncS=u.bind(this._syncSubtree,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._syncA);var e=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=e?(this._observer=new e(function(e){t._syncA(),t._syncS(null,e)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})):this.$element[0].addEventListener&&(this.$element[0].addEventListener("DOMAttrModified",t._syncA,!1),this.$element[0].addEventListener("DOMNodeInserted",t._syncS,!1),this.$element[0].addEventListener("DOMNodeRemoved",t._syncS,!1))},d.prototype._registerDataEvents=function(){var n=this;this.dataAdapter.on("*",function(e,t){n.trigger(e,t)})},d.prototype._registerSelectionEvents=function(){var n=this,i=["toggle","focus"];this.selection.on("toggle",function(){n.toggleDropdown()}),this.selection.on("focus",function(e){n.focus(e)}),this.selection.on("*",function(e,t){-1===o.inArray(e,i)&&n.trigger(e,t)})},d.prototype._registerDropdownEvents=function(){var n=this;this.dropdown.on("*",function(e,t){n.trigger(e,t)})},d.prototype._registerResultsEvents=function(){var n=this;this.results.on("*",function(e,t){n.trigger(e,t)})},d.prototype._registerEvents=function(){var n=this;this.on("open",function(){n.$container.addClass("select2-container--open")}),this.on("close",function(){n.$container.removeClass("select2-container--open")}),this.on("enable",function(){n.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){n.$container.addClass("select2-container--disabled")}),this.on("blur",function(){n.$container.removeClass("select2-container--focus")}),this.on("query",function(t){n.isOpen()||n.trigger("open",{}),this.dataAdapter.query(t,function(e){n.trigger("results:all",{data:e,query:t})})}),this.on("query:append",function(t){this.dataAdapter.query(t,function(e){n.trigger("results:append",{data:e,query:t})})}),this.on("keypress",function(e){var t=e.which;n.isOpen()?t===i.ESC||t===i.TAB||t===i.UP&&e.altKey?(n.close(e),e.preventDefault()):t===i.ENTER?(n.trigger("results:select",{}),e.preventDefault()):t===i.SPACE&&e.ctrlKey?(n.trigger("results:toggle",{}),e.preventDefault()):t===i.UP?(n.trigger("results:previous",{}),e.preventDefault()):t===i.DOWN&&(n.trigger("results:next",{}),e.preventDefault()):(t===i.ENTER||t===i.SPACE||t===i.DOWN&&e.altKey)&&(n.open(),e.preventDefault())})},d.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.isDisabled()?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},d.prototype._isChangeMutation=function(e,t){var n=!1,i=this;if(!e||!e.target||"OPTION"===e.target.nodeName||"OPTGROUP"===e.target.nodeName){if(t)if(t.addedNodes&&0<t.addedNodes.length)for(var r=0;r<t.addedNodes.length;r++){t.addedNodes[r].selected&&(n=!0)}else t.removedNodes&&0<t.removedNodes.length?n=!0:o.isArray(t)&&o.each(t,function(e,t){if(i._isChangeMutation(e,t))return!(n=!0)});else n=!0;return n}},d.prototype._syncSubtree=function(e,t){var n=this._isChangeMutation(e,t),i=this;n&&this.dataAdapter.current(function(e){i.trigger("selection:update",{data:e})})},d.prototype.trigger=function(e,t){var n=d.__super__.trigger,i={open:"opening",close:"closing",select:"selecting",unselect:"unselecting",clear:"clearing"};if(void 0===t&&(t={}),e in i){var r=i[e],o={prevented:!1,name:e,args:t};if(n.call(this,r,o),o.prevented)return void(t.prevented=!0)}n.call(this,e,t)},d.prototype.toggleDropdown=function(){this.isDisabled()||(this.isOpen()?this.close():this.open())},d.prototype.open=function(){this.isOpen()||this.isDisabled()||this.trigger("query",{})},d.prototype.close=function(e){this.isOpen()&&this.trigger("close",{originalEvent:e})},d.prototype.isEnabled=function(){return!this.isDisabled()},d.prototype.isDisabled=function(){return this.options.get("disabled")},d.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},d.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},d.prototype.focus=function(e){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},d.prototype.enable=function(e){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),null!=e&&0!==e.length||(e=[!0]);var t=!e[0];this.$element.prop("disabled",t)},d.prototype.data=function(){this.options.get("debug")&&0<arguments.length&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var t=[];return this.dataAdapter.current(function(e){t=e}),t},d.prototype.val=function(e){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==e||0===e.length)return this.$element.val();var t=e[0];o.isArray(t)&&(t=o.map(t,function(e){return e.toString()})),this.$element.val(t).trigger("input").trigger("change")},d.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._syncA),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&(this.$element[0].removeEventListener("DOMAttrModified",this._syncA,!1),this.$element[0].removeEventListener("DOMNodeInserted",this._syncS,!1),this.$element[0].removeEventListener("DOMNodeRemoved",this._syncS,!1)),this._syncA=null,this._syncS=null,this.$element.off(".select2"),this.$element.attr("tabindex",u.GetData(this.$element[0],"old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),u.RemoveData(this.$element[0]),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},d.prototype.render=function(){var e=o('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return e.attr("dir",this.options.get("dir")),this.$container=e,this.$container.addClass("select2-container--"+this.options.get("theme")),u.StoreData(e[0],"element",this.$element),e},d}),e.define("select2/compat/utils",["jquery"],function(s){return{syncCssClasses:function(e,t,n){var i,r,o=[];(i=s.trim(e.attr("class")))&&s((i=""+i).split(/\s+/)).each(function(){0===this.indexOf("select2-")&&o.push(this)}),(i=s.trim(t.attr("class")))&&s((i=""+i).split(/\s+/)).each(function(){0!==this.indexOf("select2-")&&null!=(r=n(this))&&o.push(r)}),e.attr("class",o.join(" "))}}}),e.define("select2/compat/containerCss",["jquery","./utils"],function(s,a){function l(e){return null}function e(){}return e.prototype.render=function(e){var t=e.call(this),n=this.options.get("containerCssClass")||"";s.isFunction(n)&&(n=n(this.$element));var i=this.options.get("adaptContainerCssClass");if(i=i||l,-1!==n.indexOf(":all:")){n=n.replace(":all:","");var r=i;i=function(e){var t=r(e);return null!=t?t+" "+e:e}}var o=this.options.get("containerCss")||{};return s.isFunction(o)&&(o=o(this.$element)),a.syncCssClasses(t,this.$element,i),t.css(o),t.addClass(n),t},e}),e.define("select2/compat/dropdownCss",["jquery","./utils"],function(s,a){function l(e){return null}function e(){}return e.prototype.render=function(e){var t=e.call(this),n=this.options.get("dropdownCssClass")||"";s.isFunction(n)&&(n=n(this.$element));var i=this.options.get("adaptDropdownCssClass");if(i=i||l,-1!==n.indexOf(":all:")){n=n.replace(":all:","");var r=i;i=function(e){var t=r(e);return null!=t?t+" "+e:e}}var o=this.options.get("dropdownCss")||{};return s.isFunction(o)&&(o=o(this.$element)),a.syncCssClasses(t,this.$element,i),t.css(o),t.addClass(n),t},e}),e.define("select2/compat/initSelection",["jquery"],function(i){function e(e,t,n){n.get("debug")&&window.console&&console.warn&&console.warn("Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"),this.initSelection=n.get("initSelection"),this._isInitialized=!1,e.call(this,t,n)}return e.prototype.current=function(e,t){var n=this;this._isInitialized?e.call(this,t):this.initSelection.call(null,this.$element,function(e){n._isInitialized=!0,i.isArray(e)||(e=[e]),t(e)})},e}),e.define("select2/compat/inputData",["jquery","../utils"],function(s,i){function e(e,t,n){this._currentData=[],this._valueSeparator=n.get("valueSeparator")||",","hidden"===t.prop("type")&&n.get("debug")&&console&&console.warn&&console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."),e.call(this,t,n)}return e.prototype.current=function(e,t){function i(e,t){var n=[];return e.selected||-1!==s.inArray(e.id,t)?(e.selected=!0,n.push(e)):e.selected=!1,e.children&&n.push.apply(n,i(e.children,t)),n}for(var n=[],r=0;r<this._currentData.length;r++){var o=this._currentData[r];n.push.apply(n,i(o,this.$element.val().split(this._valueSeparator)))}t(n)},e.prototype.select=function(e,t){if(this.options.get("multiple")){var n=this.$element.val();n+=this._valueSeparator+t.id,this.$element.val(n),this.$element.trigger("input").trigger("change")}else this.current(function(e){s.map(e,function(e){e.selected=!1})}),this.$element.val(t.id),this.$element.trigger("input").trigger("change")},e.prototype.unselect=function(e,r){var o=this;r.selected=!1,this.current(function(e){for(var t=[],n=0;n<e.length;n++){var i=e[n];r.id!=i.id&&t.push(i.id)}o.$element.val(t.join(o._valueSeparator)),o.$element.trigger("input").trigger("change")})},e.prototype.query=function(e,t,n){for(var i=[],r=0;r<this._currentData.length;r++){var o=this._currentData[r],s=this.matches(t,o);null!==s&&i.push(s)}n({results:i})},e.prototype.addOptions=function(e,t){var n=s.map(t,function(e){return i.GetData(e[0],"data")});this._currentData.push.apply(this._currentData,n)},e}),e.define("select2/compat/matcher",["jquery"],function(s){return function(o){return function(e,t){var n=s.extend(!0,{},t);if(null==e.term||""===s.trim(e.term))return n;if(t.children){for(var i=t.children.length-1;0<=i;i--){var r=t.children[i];o(e.term,r.text,r)||n.children.splice(i,1)}if(0<n.children.length)return n}return o(e.term,t.text,t)?n:null}}}),e.define("select2/compat/query",[],function(){function e(e,t,n){n.get("debug")&&window.console&&console.warn&&console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."),e.call(this,t,n)}return e.prototype.query=function(e,t,n){t.callback=n,this.options.get("query").call(null,t)},e}),e.define("select2/dropdown/attachContainer",[],function(){function e(e,t,n){e.call(this,t,n)}return e.prototype.position=function(e,t,n){n.find(".dropdown-wrapper").append(t),t.addClass("select2-dropdown--below"),n.addClass("select2-container--below")},e}),e.define("select2/dropdown/stopPropagation",[],function(){function e(){}return e.prototype.bind=function(e,t,n){e.call(this,t,n);this.$dropdown.on(["blur","change","click","dblclick","focus","focusin","focusout","input","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseup","search","touchend","touchstart"].join(" "),function(e){e.stopPropagation()})},e}),e.define("select2/selection/stopPropagation",[],function(){function e(){}return e.prototype.bind=function(e,t,n){e.call(this,t,n);this.$selection.on(["blur","change","click","dblclick","focus","focusin","focusout","input","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseup","search","touchend","touchstart"].join(" "),function(e){e.stopPropagation()})},e}),l=function(p){var h,f,e=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],t="onwheel"in document||9<=document.documentMode?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],g=Array.prototype.slice;if(p.event.fixHooks)for(var n=e.length;n;)p.event.fixHooks[e[--n]]=p.event.mouseHooks;var m=p.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var e=t.length;e;)this.addEventListener(t[--e],i,!1);else this.onmousewheel=i;p.data(this,"mousewheel-line-height",m.getLineHeight(this)),p.data(this,"mousewheel-page-height",m.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var e=t.length;e;)this.removeEventListener(t[--e],i,!1);else this.onmousewheel=null;p.removeData(this,"mousewheel-line-height"),p.removeData(this,"mousewheel-page-height")},getLineHeight:function(e){var t=p(e),n=t["offsetParent"in p.fn?"offsetParent":"parent"]();return n.length||(n=p("body")),parseInt(n.css("fontSize"),10)||parseInt(t.css("fontSize"),10)||16},getPageHeight:function(e){return p(e).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};function i(e){var t,n=e||window.event,i=g.call(arguments,1),r=0,o=0,s=0,a=0,l=0;if((e=p.event.fix(n)).type="mousewheel","detail"in n&&(s=-1*n.detail),"wheelDelta"in n&&(s=n.wheelDelta),"wheelDeltaY"in n&&(s=n.wheelDeltaY),"wheelDeltaX"in n&&(o=-1*n.wheelDeltaX),"axis"in n&&n.axis===n.HORIZONTAL_AXIS&&(o=-1*s,s=0),r=0===s?o:s,"deltaY"in n&&(r=s=-1*n.deltaY),"deltaX"in n&&(o=n.deltaX,0===s&&(r=-1*o)),0!==s||0!==o){if(1===n.deltaMode){var c=p.data(this,"mousewheel-line-height");r*=c,s*=c,o*=c}else if(2===n.deltaMode){var u=p.data(this,"mousewheel-page-height");r*=u,s*=u,o*=u}if(t=Math.max(Math.abs(s),Math.abs(o)),(!f||t<f)&&y(n,f=t)&&(f/=40),y(n,t)&&(r/=40,o/=40,s/=40),r=Math[1<=r?"floor":"ceil"](r/f),o=Math[1<=o?"floor":"ceil"](o/f),s=Math[1<=s?"floor":"ceil"](s/f),m.settings.normalizeOffset&&this.getBoundingClientRect){var d=this.getBoundingClientRect();a=e.clientX-d.left,l=e.clientY-d.top}return e.deltaX=o,e.deltaY=s,e.deltaFactor=f,e.offsetX=a,e.offsetY=l,e.deltaMode=0,i.unshift(e,r,o,s),h&&clearTimeout(h),h=setTimeout(v,200),(p.event.dispatch||p.event.handle).apply(this,i)}}function v(){f=null}function y(e,t){return m.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120==0}p.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})},"function"==typeof e.define&&e.define.amd?e.define("jquery-mousewheel",["jquery"],l):"object"==typeof exports?module.exports=l:l(d),e.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults","./select2/utils"],function(r,e,o,t,s){if(null==r.fn.select2){var a=["open","close","destroy"];r.fn.select2=function(t){if("object"==typeof(t=t||{}))return this.each(function(){var e=r.extend(!0,{},t);new o(r(this),e)}),this;if("string"!=typeof t)throw new Error("Invalid arguments for Select2: "+t);var n,i=Array.prototype.slice.call(arguments,1);return this.each(function(){var e=s.GetData(this,"select2");null==e&&window.console&&console.error&&console.error("The select2('"+t+"') method was called on an element that is not using Select2."),n=e[t].apply(e,i)}),-1<r.inArray(t,a)?this:n}}return null==r.fn.select2.defaults&&(r.fn.select2.defaults=t),o}),{define:e.define,require:e.require}}(),t=e.require("jquery.select2");return d.fn.select2.amd=e,t});
jQuery(function(e){if("undefined"==typeof wc_cart_fragments_params)return!1;var t=!0,r=wc_cart_fragments_params.cart_hash_key;try{t="sessionStorage"in window&&null!==window.sessionStorage,window.sessionStorage.setItem("wc","test"),window.sessionStorage.removeItem("wc"),window.localStorage.setItem("wc","test"),window.localStorage.removeItem("wc")}catch(f){t=!1}function n(){t&&sessionStorage.setItem("wc_cart_created",(new Date).getTime())}function o(e){t&&(localStorage.setItem(r,e),sessionStorage.setItem(r,e))}var a={url:wc_cart_fragments_params.wc_ajax_url.toString().replace("%%endpoint%%","get_refreshed_fragments"),type:"POST",data:{time:(new Date).getTime()},timeout:wc_cart_fragments_params.request_timeout,success:function(r){r&&r.fragments&&(e.each(r.fragments,function(t,r){e(t).replaceWith(r)}),t&&(sessionStorage.setItem(wc_cart_fragments_params.fragment_name,JSON.stringify(r.fragments)),o(r.cart_hash),r.cart_hash&&n()),e(document.body).trigger("wc_fragments_refreshed"))},error:function(){e(document.body).trigger("wc_fragments_ajax_error")}};function s(){e.ajax(a)}if(t){var i=null;e(document.body).on("wc_fragment_refresh updated_wc_div",function(){s()}),e(document.body).on("added_to_cart removed_from_cart",function(e,t,a){var s=sessionStorage.getItem(r);null!==s&&s!==undefined&&""!==s||n(),sessionStorage.setItem(wc_cart_fragments_params.fragment_name,JSON.stringify(t)),o(a)}),e(document.body).on("wc_fragments_refreshed",function(){clearTimeout(i),i=setTimeout(s,864e5)}),e(window).on("storage onstorage",function(e){r===e.originalEvent.key&&localStorage.getItem(r)!==sessionStorage.getItem(r)&&s()}),e(window).on("pageshow",function(t){t.originalEvent.persisted&&(e(".widget_shopping_cart_content").empty(),e(document.body).trigger("wc_fragment_refresh"))});try{var c=JSON.parse(sessionStorage.getItem(wc_cart_fragments_params.fragment_name)),_=sessionStorage.getItem(r),g=Cookies.get("woocommerce_cart_hash"),m=sessionStorage.getItem("wc_cart_created");if(null!==_&&_!==undefined&&""!==_||(_=""),null!==g&&g!==undefined&&""!==g||(g=""),_&&(null===m||m===undefined||""===m))throw"No cart_created";if(m){var d=1*m+864e5,w=(new Date).getTime();if(d<w)throw"Fragment expired";i=setTimeout(s,d-w)}if(!c||!c["div.widget_shopping_cart_content"]||_!==g)throw"No fragment";e.each(c,function(t,r){e(t).replaceWith(r)}),e(document.body).trigger("wc_fragments_loaded")}catch(f){s()}}else s();Cookies.get("woocommerce_items_in_cart")>0?e(".hide_cart_widget_if_empty").closest(".widget_shopping_cart").show():e(".hide_cart_widget_if_empty").closest(".widget_shopping_cart").hide(),e(document.body).on("adding_to_cart",function(){e(".hide_cart_widget_if_empty").closest(".widget_shopping_cart").show()}),"undefined"!=typeof wp&&wp.customize&&wp.customize.selectiveRefresh&&wp.customize.widgetsPreview&&wp.customize.widgetsPreview.WidgetPartial&&wp.customize.selectiveRefresh.bind("partial-content-rendered",function(){s()})});
window.Wolmart||(window.Wolmart={}),function(a){var e={action:"wolmart_get_comments",post_id:null,mode:"all",page:1,$tabs:null,$pagination:null,$panel:null,$activePanel:null,cache:{},init:function(){this.$tabs=a(".woocommerce-Reviews .nav-tabs"),this.$pagination=a(".woocommerce-Reviews .pagination"),this.post_id=this.$tabs.data("post_id"),a("body").on("click",".woocommerce-Reviews .nav-link",this.filterComments).on("click",".woocommerce-Reviews .woocommerce-pagination .page-numbers",this.changePage).on("click",".review-vote .comment_help, .review-vote .comment_unhelp",this.onVoteComment)},filterComments:function(t){var n=a(this);if(!e.$tabs.hasClass("loading")){var o="SPAN"==this.tagName?n.data("href"):n.attr("href");e.$panel="#"==o?n.closest(".nav").siblings(".tab-content").children(".tab-pane").eq(n.parent().index()):a(("#"==o.substring(0,1)?"":"#")+o),e.$panel.length&&(t.preventDefault(),e.$activePanel=e.$panel.parent().children(".active"),!n.hasClass("active")&&o&&(e.$tabs.find(".active").removeClass("active"),n.addClass("active"),e.mode=n.data("mode"),e.page=1,e.getComments()))}},changePage:function(t){var n=a(this),o=n.attr("href");t.preventDefault(),n.hasClass("prev")?e.page=parseInt(n.siblings(".current").text())-1:n.hasClass("next")?e.page=parseInt(n.siblings(".current").text())+1:e.page=parseInt(n.text()),e.$panel=e.$activePanel=e.$tabs.siblings(".tab-content").children(".active"),e.getComments(o)},getComments:function(t=""){e.cache[e.mode]||(e.cache[e.mode]={});var n=e.cache[e.mode],o=e.page;if(n&&n[o]){var i=n[o];!i.html.trim()&&e.$panel.data("empty")?e.$panel.html(e.$panel.data("empty")):e.$panel.html(i.html),e.$pagination.html(i.pagination),e.changeTab()}else e.$tabs.addClass("loading"),e.$activePanel.addClass("loading"),e.$pagination&&Wolmart.doLoading(e.$pagination,"small"),a.post(wolmart_vars.ajax_url,{action:this.action,nonce:wolmart_vars.nonce,post_id:this.post_id,mode:this.mode,page:this.page},(function({html:a,pagination:i}){n||(n={}),n[o]||(n[o]={}),n[o]={html:a,pagination:i},e.$pagination&&Wolmart.endLoading(e.$pagination),e.$activePanel.removeClass("loading"),e.$tabs.removeClass("loading"),!a.trim()&&e.$panel.data("empty")?e.$panel.html(e.$panel.data("empty")):e.$panel.html(a),e.$pagination.html(i),e.changeTab(),t&&history.pushState({},"",t)}))},changeTab:function(){Wolmart.loadTemplate(this.$panel),Wolmart.slider(this.$panel.find(".slider-wrapper")),this.$activePanel.removeClass("in active"),this.$panel.addClass("active in"),Wolmart.refreshLayouts()},onVoteComment:function(t){var n=a(this),o=n.data("comment_id"),i=n.hasClass("comment_help")?"fa-thumbs-up":"fa-thumbs-down";n.hasClass("already_comment")?n.parent().children(".already_vote").fadeIn().fadeOut(1e3):(n.addClass("already_comment").parent().find(".comment_unhelp").addClass("already_comment"),a("#wolmart_review_vote-"+o+" ."+i).removeClass(i).addClass("fa-spinner fas"),a.post(wolmart_vars.ajax_url,{action:"comment_vote",nonce:wolmart_vars.nonce,comment_id:o,commentvote:n.hasClass("comment_help")?"plus":"minus"},(function(a){e.$activePanel=e.$tabs.siblings(".tab-content").children(".active"),"updated"===a?(e.$activePanel.find("#wolmart_review_vote-"+o+" .fa-spinner").removeClass("fa-spinner fas").addClass(i),e.$activePanel.find("#comment"+(n.hasClass("comment_help")?"":"un")+"help-count-"+o).text(n.data("count")+1)):"voted"===a&&(e.$activePanel.find("#wolmart_review_vote-"+o+" .fa-spinner").removeClass("fa-spinner fas").addClass(i),n.parent().children(".already_vote").fadeIn().fadeOut(1e3))})))}};Wolmart.ProductHelpfulComments=e,Wolmart.$window.on("wolmart_complete",(function(){Wolmart.ProductHelpfulComments.init()}))}(jQuery);
"use strict";window.Wolmart||(window.Wolmart={}),function(e){Wolmart.productCompare=function(){function o(e,o=!0){var a=e.html(),t=o?1:-1;a=a.replace(/[^0-9]/,""),(a=parseInt(a)+t)>=0&&a<=wolmart_vars.compare_limit&&e.html(a)}e(document).on("click",".product a.compare:not(.added)",(function(o){o.preventDefault();var a=e(this),t={action:"wolmart_add_to_compare",id:a.data("product_id"),minicompare:e(".header .compare-dropdown").length?e(".header .compare-dropdown").data("minicompare-type"):""};Wolmart.doLoading(a,"small"),e.ajax({type:"post",url:wolmart_vars.ajax_url,data:t,dataType:"json",success:function(o){Wolmart.endLoading(a),void 0!==o.count&&(e(".header .compare-dropdown .widget_compare_content").length&&e(".header .compare-dropdown .widget_compare_content").html(e(o.minicompare).find(".widget_compare_content").html()),e(document).trigger("added_to_compare",o.popup_template),a.addClass("added"),a.attr("href",o.url))}})})).on("click",".remove_from_compare",(function(a){a.preventDefault();var t=e(this),r={action:"wolmart_remove_from_compare",id:t.data("product_id")};Wolmart.doLoading(t,"small"),e.ajax({type:"post",url:wolmart_vars.ajax_url,data:r,dataType:"json",success:function(a){void 0!==a.count&&(Wolmart.endLoading(t),t.closest(".compare-popup").length?(t.closest("li").empty(),o(e(".compare-popup .compare-heading mark"),!1)):void 0!==a.compare_table&&t.closest(".wolmart-compare-table").replaceWith(a.compare_table),e(document).trigger("removed_from_compare",r.id))}})})).on("click",".compare-popup-overlay",(function(){e(".page-wrapper > .compare-popup").removeClass("show")})).on("click",".wolmart-compare-table .to-left, .wolmart-compare-table .to-right",(function(o){if(o.preventDefault(),!e(this).closest(".compare-basic-info").find(".d-loading").length){var a=e(this),t=a.closest(".compare-value").index()-1;a.closest(".compare-col").hasClass("last-col")&&a.hasClass("to-right")||e(this).closest(".wolmart-compare-table").find(".compare-row").each((function(){var o=e(this).children(".compare-value").eq(t),r=a.hasClass("to-left")?o.prev():o.next(),p=(a.hasClass("to-left")?"-":"")+"20%",c=(a.hasClass("to-left")?"":"-")+"20%";r.hasClass("compare-field")||(o.animate({left:p},200,(function(){o.css("left",""),a.hasClass("to-left")?o.after(r):o.before(r)})),r.animate({left:c},200,(function(){r.css("left","")})),setTimeout((function(){(r.hasClass("last-col")||o.hasClass("last-col"))&&(o.toggleClass("last-col"),r.toggleClass("last-col"))}),200))}))}})).on("click",".compare-clean",(function(o){o.preventDefault(),e(".remove_from_compare").each((function(){var o=e(this).data("product_id");e('.compare[data-product_id="'+o+'"]').removeClass("added")})),e(".compare-popup li").empty(),e(".compare-popup .compare-heading mark").text("0"),e.post(wolmart_vars.ajax_url,{action:"wolmart_clean_compare"}),e(".header .compare-open .compare-count").html("0")})).on("added_to_compare",(function(a,t){if(t)if("offcanvas"==wolmart_vars.compare_popup_type){var r=e(".page-wrapper > .compare-popup");r.length||(e(".page-wrapper").append('<div class="compare-popup"></div><div class="compare-popup-overlay"></div>'),r=e(".page-wrapper > .compare-popup")),r.html(t),Wolmart.slider(".compare-popup .slider-wrapper",{spaceBetween:10,slidesPerView:"auto",breakpoints:{992:{spaceBetween:30},768:{spaceBetween:20}},scrollbar:{el:".slider-scrollbar",dragClass:"slider-scrollbar-drag",draggable:!0}}),Wolmart.requestTimeout((function(){r.addClass("show")}),60)}else Wolmart.minipopup.open({content:t});if(e(".header .compare-open").length){var p=e(".header .compare-open").find(".compare-count");p.length&&o(p)}})).on("removed_from_compare",(function(a,t){if(e('.compare[data-product_id="'+t+'"]').removeClass("added"),e(".header .compare-open").length){var r=e(".header .compare-open").find(".compare-count"),p=e(".header .compare-dropdown");r.length&&o(r,!1),p.find(".mini-item").length>1?p.find('.remove_from_compare[data-product_id="'+t+'"]').closest(".mini-item").remove():p.find(".widget_compare_content").html(e("script.wolmart-minicompare-no-item-html").html())}})).on("click",".compare-offcanvas .compare-open",(function(o){e(this).closest(".compare-dropdown").toggleClass("opened"),o.preventDefault()})).on("click",".compare-offcanvas .btn-close",(function(o){o.preventDefault(),e(this).closest(".compare-dropdown").removeClass("opened")})).on("click",".compare-offcanvas .compare-overlay",(function(o){e(this).closest(".compare-dropdown").removeClass("opened")}))},e(window).on("wolmart_complete",Wolmart.productCompare)}(jQuery);
window.Wolmart||(window.Wolmart={}),function(t){var e={init:function(){t("form.comment-form").attr("enctype","multipart/form-data"),t("body").on("change",".comment-form #wolmart-add-image",e.showImageCount).on("submit",".comment-form",e.checkValidate).on("click",".review-images img",e.openLightBox)},showImageCount:function(e){t(".wolmart-comment-images span").text(e.target.files.length)},checkValidate:function(e){var o=t("#wolmart-add-image");if(o.length){var r=!1,i=!1;return o[0].files.length>wolmart_product_image_comments.max_count?(alert(wolmart_product_image_comments.error_msg.count_error),void e.preventDefault()):(console.log(o[0].files),o[0].files.forEach((function(e){var o=e.size,m=String(e.type);o>wolmart_product_image_comments.max_size&&(r=!0),t.inArray(m,wolmart_product_image_comments.mime_types)<0&&(i=!0)})),i?(alert(wolmart_product_image_comments.error_msg.mime_type_error),void e.preventDefault()):r?(alert(wolmart_product_image_comments.error_msg.size_error),void e.preventDefault()):void 0)}},openLightBox:function(e){e.preventDefault();var o=t(e.currentTarget),r=o.parent().children().map((function(){return{src:this.getAttribute("data-img-src"),w:this.getAttribute("data-img-width"),h:this.getAttribute("data-img-height"),title:this.getAttribute("alt")||""}})).get();if("undefined"!=typeof PhotoSwipe){var i=t(".pswp")[0],m=new PhotoSwipe(i,PhotoSwipeUI_Default,r,{index:o.index(),closeOnScroll:!1});m.listen("afterInit",(function(){m.shout("initialZoomInEnd")})),m.init()}}};Wolmart.CommentWithImage=e,Wolmart.$window.on("wolmart_complete",(function(){Wolmart.CommentWithImage.init()}))}(jQuery);
(function($){var initDemosList=function(){$('body').on('click','.sticky-icon-links .demo-toggle',function(e){var $demos=$('.demos-list .demos'),$list=$('.demos-list'),$content=$('.demos-list .demos-content');$list.addClass('show');if(0==$demos.children().length){Wolmart.doLoading($content);$.ajax({url:wolmart_vars.ajax_url,method:'post',data:{action:"wolmart_demos_list",},success:function(data){if(data){Wolmart.endLoading($content);$demos.html(data);}}})}
e.preventDefault();}).on('click','.demos-list .demos-overlay, .demos-list .demos-close',function(e){var $this=$(this),$wrapper=$this.closest('.demos-list');$wrapper.removeClass('show');})}
$(window).on('load',function(){initDemosList();});})(jQuery);
"use strict";!function(t){t.extend(t.easing,{def:"easeOutQuad",swing:function(a,e,o,i,r){return t.easing[t.easing.def](a,e,o,i,r)},easeOutQuad:function(t,a,e,o,i){return-o*(a/=i)*(a-2)+e},easeInOutQuart:function(t,a,e,o,i){return(a/=i/2)<1?o/2*a*a*a*a+e:-o/2*((a-=2)*a*a*a-2)+e},easeOutQuint:function(t,a,e,o,i){return o*((a=a/i-1)*a*a*a*a+1)+e}}),Wolmart.defaults.popup={fixedContentPos:!0,closeOnBgClick:!1,removalDelay:350,callbacks:{beforeOpen:function(){if(this.fixedContentPos){var a=window.innerWidth-document.body.clientWidth;t(".sticky-content.fixed").css("padding-right",a),t(".mfp-wrap").css("overflow","hidden auto")}},close:function(){this.fixedContentPos&&(t(".mfp-wrap").css("overflow",""),t(".sticky-content.fixed").css("padding-right",""))}}},Wolmart.defaults.popupPresets={login:{type:"ajax",mainClass:"mfp-login mfp-fade",tLoading:'<div class="login-popup"><div class="w-loading"><i></i></div></div>',preloader:!0,items:{src:wolmart_vars.ajax_url},ajax:{settings:{method:"post",data:{action:"wolmart_account_form",nonce:wolmart_vars.nonce}},cursor:"mfp-ajax-cur"}},video:{type:"iframe",mainClass:"mfp-fade",preloader:!1,closeBtnInside:!1},firstpopup:{type:"inline",mainClass:"mfp-popup-template mfp-newsletter-popup mfp-flip-popup",callbacks:{beforeClose:function(){t('.mfp-wolmart .popup .hide-popup input[type="checkbox"]').prop("checked")&&Wolmart.setCookie("hideNewsletterPopup",!0,7)}}},popup_template:{type:"ajax",mainClass:"mfp-popup-template mfp-flip-popup",tLoading:'<div class="popup-template"><div class="w-loading"><i></i></div></div>',preloader:!0,items:{src:wolmart_vars.ajax_url},ajax:{settings:{method:"post"},cursor:"mfp-ajax-cur"}}},Wolmart.defaults.slider={a11y:!1,containerModifierClass:"slider-container-",slideClass:"slider-slide",wrapperClass:"slider-wrapper",slideActiveClass:"slider-slide-active",slideDuplicateClass:"slider-slide-duplicate"},Wolmart.preventDefault=function(t){t.preventDefault()},Wolmart.initTemplate=function(t){Wolmart.lazyload(t),Wolmart.slider(t.find(".slider-wrapper")),Wolmart.isotopes(t.find(".grid")),Wolmart.shop.initProducts(t),Wolmart.countdown(t.find(".countdown")),Wolmart.call((function(){Wolmart.$window.trigger("wolmart_loadmore")}),300),Wolmart.$body.trigger("wolmart_init_tab_template")},Wolmart.loadTemplate=function(a){var e="",o=wolmart_vars.resource_split_tasks;wolmart_vars.resource_split_tasks=0,a.children(".load-template").each((function(){e+=this.text})),e&&(a.html(e),Wolmart.skeleton?Wolmart.skeleton(t(".skeleton-body"),(function(){Wolmart.initTemplate(a)})):Wolmart.initTemplate(a)),wolmart_vars.resource_split_tasks=o},Wolmart.windowResized=function(t){return t==Wolmart.resizeTimeStamp||(Wolmart.canvasWidth!=(Wolmart.isMobileAndTablet?window.outerWidth:window.innerWidth)?Wolmart.resizeChanged=!0:Wolmart.resizeChanged=!1,Wolmart.canvasWidth=Wolmart.isMobileAndTablet?window.outerWidth:window.innerWidth,Wolmart.resizeTimeStamp=t),Wolmart.resizeChanged},Wolmart.setCookie=function(t,a,e){var o=new Date;o.setTime(o.getTime()+24*e*60*60*1e3),document.cookie=t+"="+a+";expires="+o.toUTCString()+";path=/"},Wolmart.getCookie=function(t){for(var a=t+"=",e=document.cookie.split(";"),o=0;o<e.length;++o){for(var i=e[o];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(a))return i.substring(a.length,i.length)}return""},Wolmart.scrollTo=function(a,e){var o=void 0===e?0:e;if("number"==typeof a)r=a;else{var i=Wolmart.$(a).closest(":visible");if(i.length){var r=i.offset().top,s=t("#wp-toolbar");window.innerWidth>600&&s.length&&(r-=s.parent().outerHeight()),t(".sticky-content.fix-top.fixed").each((function(){r-=this.offsetHeight}))}}t("html,body").stop().animate({scrollTop:r},o)},Wolmart.scrollToFixedContent=function(a,e){var o=0,i=window.innerWidth>600&&t("#wp-toolbar").parent().length?t("#wp-toolbar").parent().outerHeight():0;t(".sticky-content.fix-top").each((function(){if(t(this).hasClass("toolbox-top")){var a=t(this).css("padding-top").slice();a.length>2&&(o-=Number(a.slice(0,-2)))}else{var e=t(this).hasClass("fixed");o+=t(this).addClass("fixed").outerHeight(),e||t(this).removeClass("fixed")}})),Wolmart.scrollTo(a-o-i,e)},Wolmart.getUrlParam=function(t,a){var e,o=document.createElement("a");o.href=decodeURIComponent(decodeURI(t)),(e=o.search).startsWith("?")&&(e=e.substr(1));var i={};return e.split("&").forEach((function(t){var a=t.indexOf("=");a>=0&&(i[t.substr(0,a)]=t.substr(a+1))})),i[a]?i[a]:""},Wolmart.addUrlParam=function(t,a,e){var o,i,r=document.createElement("a");return t=decodeURIComponent(decodeURI(t)),r.href=t,0<=(o=r.search).indexOf(a+"=")?i=o.replace(new RegExp(a+"=[^&]*"),a+"="+e):((i=o.length&&0<=o.indexOf("?")?o:"?").endsWith("?")||(i+="&"),i+=a+"="+e),encodeURI(t.replace(o,"")+i.replace(/&+/,"&"))},Wolmart.removeUrlParam=function(t,a){var e,o,i=document.createElement("a");return t=decodeURIComponent(decodeURI(t)),i.href=t,0<=(e=i.search).indexOf(a+"=")?((o=e.replace(new RegExp(a+"=[^&]*"),"").replace(/&+/,"&").replace("?&","?")).endsWith("&")&&(o=o.substr(0,o.length-1)),o.endsWith("?")&&(o=o.substr(0,o.length-1)),o=o.replace("&&","&")):o=e,encodeURI(t.replace(e,"")+o)},Wolmart.showMore=function(t){Wolmart.$(t).after('<div class="w-loading relative"><i></i></div>')},Wolmart.hideMore=function(t){Wolmart.$(t).children(".w-loading").remove()},Wolmart.countTo=function(a){t.fn.countTo&&Wolmart.$(a).each((function(){var a=t(this);setTimeout((function(){var t={onComplete:function(){a.addClass("complete")}};a.data("duration")&&(t.speed=a.data("duration")),a.data("from-value")&&(t.from=a.data("from-value")),a.data("to-value")&&(t.to=a.data("to-value")),a.countTo(t)}),300)}))},Wolmart.countdown=function(a,e){t.fn.countdown&&Wolmart.$(a).each((function(){var a=t(this),o=a.attr("data-until"),i=a.attr("data-compact"),r=a.attr("data-format")?a.attr("data-format"):"DHMS",s=a.attr("data-labels-short")?wolmart_vars.countdown.labels_short:wolmart_vars.countdown.labels,n=a.attr("data-labels-short")?wolmart_vars.countdown.label1_short:wolmart_vars.countdown.label1;a.data("countdown")&&a.countdown("destroy"),a.countdown(t.extend(a.hasClass("user-tz")?{until:a.attr("data-relative")?o:new Date(o),format:r,padZeroes:!0,compact:i,compactLabels:[" y"," m"," w"," days, "],timeSeparator:" : ",labels:s,labels1:n,serverSync:new Date(t(this).attr("data-time-now"))}:{until:a.attr("data-relative")?o:new Date(o),format:r,padZeroes:!0,compact:i,compactLabels:[" y"," m"," w"," days, "],timeSeparator:" : ",labels:s,labels1:n},e))}))},Wolmart.parallax=function(a,e){t.fn.themePluginParallax&&Wolmart.$(a).each((function(){var a=t(this);a.themePluginParallax(t.extend(!0,Wolmart.parseOptions(a.attr("data-parallax-options")),e))}))};var a=t.fn.block;t.fn.block=function(t){return"complete"==Wolmart.status&&(this.append('<div class="w-loading"><i></i></div>'),a.call(this,t)),this};var e=t.fn.unblock;t.fn.unblock=function(t){return"complete"==Wolmart.status&&(e.call(this,t),this.hasClass("processing")||this.parents(".processing").length||this.children(".w-loading").remove(),Wolmart.shop.initAlertAction()),this},Wolmart.stickyContent=function(){function a(t,a){return this.init(t,a)}function e(){Wolmart.$window.trigger("sticky_refresh.wolmart",{index:0,offsetTop:window.innerWidth>600&&t("#wp-toolbar").length&&t("#wp-toolbar").parent().is(":visible")?t("#wp-toolbar").parent().outerHeight():0})}function o(t){t&&!Wolmart.windowResized(t.timeStamp)||(Wolmart.$window.trigger("sticky_refresh_size.wolmart"),Wolmart.requestFrame(e))}return a.prototype.init=function(a,e){this.$el=a,this.options=t.extend(!0,{},Wolmart.defaults.sticky,e,Wolmart.parseOptions(a.attr("data-sticky-options"))),Wolmart.$window.on("sticky_refresh.wolmart",this.refresh.bind(this)).on("sticky_refresh_size.wolmart",this.refreshSize.bind(this))},a.prototype.refreshSize=function(t){var a=window.innerWidth>=this.options.minWidth&&window.innerWidth<=this.options.maxWidth;this.scrollPos=window.pageYOffset,void 0===this.top&&(this.top=this.options.top),window.innerWidth>=768&&this.getTop?this.top=this.getTop():this.options.top||(this.top=this.isWrap?this.$el.parent().offset().top:this.$el.offset().top+this.$el[0].offsetHeight,this.$el.find(".toggle-menu.show-home").length&&this.$el.find(".toggle-menu .dropdown-box").length&&(this.top+=this.$el.find(".toggle-menu .dropdown-box")[0].offsetHeight)),this.isWrap?a||this.unwrap():a&&this.wrap(),t&&Wolmart.requestTimeout(this.refreshSize.bind(this),50)},a.prototype.wrap=function(){this.$el.wrap('<div class="sticky-content-wrapper"></div>'),this.isWrap=!0},a.prototype.unwrap=function(){this.$el.unwrap(".sticky-content-wrapper"),this.isWrap=!1},a.prototype.refresh=function(t,a){var e=window.pageYOffset+a.offsetTop,o=this.$el;this.refreshSize(),e>this.top&&this.isWrap?(this.height=o[0].offsetHeight,o.hasClass("fixed")||o.parent().css("height",this.height+"px"),o.hasClass("fix-top")?(o.css("margin-top",a.offsetTop+"px"),this.zIndex=this.options.max_index-a.index):o.hasClass("fix-bottom")?(o.css("margin-bottom",a.offsetBottom+"px"),this.zIndex=this.options.max_index-a.index):o.css({transition:"opacity .5s","z-index":this.zIndex}),this.options.scrollMode?(this.scrollPos>=e&&o.hasClass("fix-top")||this.scrollPos<=e&&o.hasClass("fix-bottom")?(o.addClass("fixed"),this.onFixed&&this.onFixed()):(o.removeClass("fixed").css("margin-top","").css("margin-bottom",""),this.onUnfixed&&this.onUnfixed()),this.scrollPos=e):(o.addClass("fixed"),this.onFixed&&this.onFixed()),o.hasClass("fixed")&&(o.hasClass("fix-top")?a.offsetTop+=o[0].offsetHeight:o.hasClass("fix-bottom")&&(a.offsetBottom+=o[0].offsetHeight))):(o.parent().css("height",""),o.removeClass("fixed").css({"margin-top":"","margin-bottom":"","z-index":""}),this.onUnfixed&&this.onUnfixed())},Wolmart.$window.on("wolmart_complete",(function(){window.addEventListener("scroll",e,{passive:!0}),Wolmart.$window.on("resize",o),setTimeout((function(){o()}),1e3)})),function(e,o){Wolmart.$(e).each((function(){var e=t(this);e.data("sticky-content")||e.data("sticky-content",new a(e,o))}))}}(),Wolmart.alert=function(a){Wolmart.$body.on("click",a+" .btn-close",(function(e){e.preventDefault(),t(this).closest(a).fadeOut((function(){t(this).remove()}))}))},Wolmart.accordion=function(a){Wolmart.$body.on("click",a,(function(a){var o=t(this),i=o.closest(".card"),r=o.closest(".accordion"),s=o.attr("href");(i="#"==s?i.children(".card-body"):i.find("#"==s[0]?o.attr("href"):"#"+o.attr("href"))).length&&(a.preventDefault(),r.find(".collapsing").length||r.find(".expanding").length||(i.hasClass("expanded")?r.hasClass("radio-type")||e(i):i.hasClass("collapsed")&&(r.find(".expanded").length>0?Wolmart.isIE?e(r.find(".expanded"),(function(){e(i)})):(e(r.find(".expanded")),e(i)):e(i))))}));var e=function(t,e){var o=t.closest(".card").find(a);t.hasClass("expanded")?(o.removeClass("collapse").addClass("expand"),t.addClass("collapsing").slideUp(300,(function(){t.removeClass("expanded collapsing").addClass("collapsed"),e&&e()}))):t.hasClass("collapsed")&&(o.removeClass("expand").addClass("collapse"),t.addClass("expanding").slideDown(300,(function(){t.removeClass("collapsed expanding").addClass("expanded"),e&&e()})))}},Wolmart.tab=function(a){Wolmart.$body.on("click",a+" .nav-link",(function(e){var o=t(this);if(!o.closest(a).hasClass("loading")){var i,r="SPAN"==this.tagName?o.data("href"):o.attr("href");if((i="#"==r?o.closest(".nav").siblings(".tab-content").children(".tab-pane").eq(o.parent().index()):t(("#"==r.substring(0,1)?"":"#")+r)).length){e.preventDefault();var s=i.parent().children(".active");!o.hasClass("active")&&r&&(o.parent().parent().find(".active").removeClass("active"),o.addClass("active"),Wolmart.loadTemplate(i),Wolmart.slider(i.find(".slider-wrapper")),s.removeClass("in active"),i.addClass("active in"),Wolmart.refreshLayouts())}}}))},Wolmart.playableVideo=function(a){t(a+" .video-play").on("click",(function(e){var o=t(this).closest(a);o.hasClass("playing")?o.removeClass("playing").addClass("paused").find("video")[0].pause():o.removeClass("paused").addClass("playing").find("video")[0].play(),e.preventDefault()})),t(a+" video").on("ended",(function(){t(this).closest(".post-video").removeClass("playing")}))},Wolmart.appearAnimate=function(t){var a="string"==typeof t&&t.indexOf("elementor-invisible")>0?"elementor-invisible":"appear-animate";Wolmart.$(t).each((function(){var t=this;Wolmart.appear(t,(function(){if(t.classList.contains(a)&&!t.classList.contains("appear-animation-visible")){var e=Wolmart.parseOptions(t.getAttribute("data-settings")),o=1e3;t.classList.contains("animated-slow")?o=2e3:t.classList.contains("animated-fast")&&(o=750),Wolmart.call((function(){t.style["animation-duration"]=o+"ms",t.style["animation-delay"]=e._animation_delay+"ms",t.style["transition-property"]="visibility, opacity",t.style["transition-duration"]="0s",t.style["transition-delay"]=e._animation_delay+"ms";var a=e.animation||e._animation||e._animation_name;a&&t.classList.add(a),t.classList.add("appear-animation-visible"),setTimeout((function(){t.style["transition-property"]="",t.style["transition-duration"]="",t.style["transition-delay"]=""}),e._animation_delay?e._animation_delay+500:500)}))}}))})),"object"==typeof elementorFrontend&&Wolmart.$window.trigger("resize.waypoints")};var o,i,r,s,n,l,c;Wolmart.initPopups=function(){function a(a){t(a.target).closest(".mfp-content").length&&!t(a.target).hasClass("mfp-content")||t.magnificPopup.instance.close()}Wolmart.$body.on("click",".btn-video-iframe",(function(a){a.preventDefault(),Wolmart.popup({items:{src:'<video src="'+t(this).attr("href")+'" autoplay loop controls>',type:"inline"},mainClass:"mfp-video-popup"},"video")})),Wolmart.$body.on("mousedown",".mfp-wrap",a),"ontouchstart"in document&&document.body.addEventListener("touchstart",a,{passive:!0}),t("body > .popup").each((function(a){var e=t(this);e.attr("data-popup-options")&&function(a){var e=Wolmart.parseOptions(a.attr("data-popup-options"));setTimeout((function(){Wolmart.getCookie("hideNewsletterPopup")||a.imagesLoaded((function(){Wolmart.popup({mainClass:"mfp-fade mfp-wolmart mfp-wolmart-"+e.popup_id,items:{src:a.get(0)},callbacks:{open:function(){this.content.css({"animation-duration":e.popup_duration,"animation-timing-function":"linear"}),Wolmart.$body.hasClass("vcwb")?(this.content.attr("data-vce-animate","vce-o-animate--"+e.popup_animation),this.content.attr("data-vcv-o-animated","true")):this.content.addClass(e.popup_animation+" animated"),t("#wolmart-popup-"+e.popup_id).css("display","")}}},"firstpopup")}))}),1e3*e.popup_delay)}(e)})),Wolmart.$body.on("click",".show-popup",(function(a){a.preventDefault();var e=-1;for(var o of this.classList)o&&o.startsWith("popup-id-")&&(e=o.substr(9));Wolmart.popup({mainClass:"mfp-wolmart mfp-wolmart-"+e,ajax:{settings:{data:{action:"wolmart_print_popup",nonce:wolmart_vars.nonce,popup_id:e}}},callbacks:{afterChange:function(){this.container.html('<div class="mfp-content"></div><div class="mfp-preloader"><div class="popup-template"><div class="w-loading"><i></i></div></div></div>'),this.contentContainer=this.container.children(".mfp-content"),this.preloader=!1},beforeClose:function(){this.container.empty()},ajaxContentAdded:function(){var a=this,o=this.container.find(".popup"),i=JSON.parse(o.attr("data-popup-options"));a.contentContainer.next(".mfp-preloader").css("max-width",o.css("max-width")),setTimeout((function(){a.contentContainer.next(".mfp-preloader").remove()}),1e4),this.container.css({"animation-duration":i.popup_duration,"animation-timing-function":"linear"}),Wolmart.$body.hasClass("vcwb")?(this.container.attr("data-vce-animate","vce-o-animate--"+i.popup_animation),this.container.attr("data-vcv-o-animated","true")):this.container.addClass(i.popup_animation+" animated"),t("#wolmart-popup-"+e).css("display","")}}},"popup_template")}))},Wolmart.initScrollTopButton=function(){var a=Wolmart.byId("scroll-top");if(a){function e(){if(window.pageYOffset>200){a.classList.add("show");var e=t(document).height(),o=t(window).height(),i=t(window).scrollTop()/(e-o)*214;t("#progress-indicator").length>0&&t("#progress-indicator").css("stroke-dasharray",i+", 400")}else a.classList.remove("show")}Wolmart.$body.on("click","#scroll-top",(function(t){Wolmart.scrollTo(0),t.preventDefault()})),Wolmart.call(e,500),window.addEventListener("scroll",e,{passive:!0})}},Wolmart.initScrollTo=function(){Wolmart.scrollTo(Wolmart.hash),Wolmart.$body.on("click",".scroll-to",(function(a){var e=t(this).attr("href").replace(location.origin+location.pathname,"");e.startsWith("#")&&e.length>1&&(a.preventDefault(),Wolmart.scrollTo(e))}))},Wolmart.initContactForms=function(){t('.wpcf7-form [aria-required="true"]').prop("required",!0)},Wolmart.initSearchForm=function(){var a=t(".hs-toggle");Wolmart.$body.on("click",".hs-toggle .search-toggle",Wolmart.preventDefault),"ontouchstart"in document?(a.find(".search-toggle").on("click",(function(t){a.toggleClass("show")})),Wolmart.$body.on("click",(function(t){a.removeClass("show")})),a.on("click",(function(t){Wolmart.preventDefault(t),t.stopPropagation()}))):a.find(".form-control").on("focusin",(function(t){a.addClass("show")})).on("focusout",(function(t){a.removeClass("show")}))},Wolmart.initElementor=function(){"undefined"!=typeof elementorFrontend&&elementorFrontend.waypoint(t(".elementor-counter-number"),(function(){var a=t(this),e=a.data(),o=e.toValue.toString().match(/\.(.*)/);o&&(e.rounding=o[1].length),a.numerator(e)}))},Wolmart.initVendorCompatibility=function(){Wolmart.$body.on("keydown",".store-search-input",(function(a){13==a.keyCode&&setTimeout((function(){t("#dokan-store-listing-filter-form-wrap #apply-filter-btn").trigger("click")}),150)})),Wolmart.$body.on("click",".wcmp-report-abouse-wrapper .close",(function(a){t(".wcmp-report-abouse-wrapper #report_abuse_form_custom").fadeOut(100)})).on("click",".wcmp-report-abouse-wrapper #report_abuse",(function(a){t(".wcmp-report-abouse-wrapper #report_abuse_form_custom").fadeIn(100)})),t("select#rating").prev("p.stars").prevAll("p.stars").remove(),Wolmart.$body.on("click",".goto_more_offer_tab",(function(a){a.preventDefault(),t(".singleproductmultivendor_tab").hasClass("active")||t(".singleproductmultivendor_tab a, #tab_singleproductmultivendor").trigger("click"),t(".woocommerce-tabs").length>0&&t("html, body").animate({scrollTop:t(".woocommerce-tabs").offset().top-120},1500)}))},Wolmart.initFloatingElements=function(a){t.fn.parallax&&Wolmart.$(a,".floating-wrapper").each((function(a){var e=t(this);e.data("parallax")&&(e.parallax("disable"),e.removeData("parallax"),e.removeData("options")),e.children("figure, .elementor-widget-container").addClass("layer").attr("data-depth",e.attr("data-child-depth")),e.parallax(e.data("options"))}))},Wolmart.initAdvancedMotions=function(a,e){Wolmart.isMobile||"undefined"!=typeof skrollr&&(Wolmart.$(a).data({"bottom-top":"","top-bottom":"",center:"","center-top":"","center-bottom":""}),Wolmart.$(a).removeAttr("data-bottom-top data-top-bottom data-center data-center-top data-center-bottom"),void 0!==skrollr.get&&skrollr.get()&&void 0!==skrollr.get().destroy&&skrollr.get().destroy(),"destroy"!=e?(Wolmart.$(a,".wolmart-motion-effect-widget").each((function(){var a=t(this);if(a.hasClass("wolmart-scroll-effect-widget")){var e=JSON.parse(a.attr("data-wolmart-scroll-effect-settings")),o={};for(var i in e){var r="",s="";"Vertical"==i?("up"==e[i].direction?(r=e[i].speed+"vh",s=-e[i].speed+"vh"):(r=-e[i].speed+"vh",s=e[i].speed+"vh"),o.translateY=[r,s]):"Horizontal"==i?("left"==e[i].direction?(r=e[i].speed+"vw",s=-e[i].speed+"vw"):(r=-e[i].speed+"vw",s=e[i].speed+"vw"),o.translateX=[r,s]):"Transparency"==i?("in"==e[i].direction?(r=10*(10-e[i].speed)+"%",s="100%"):(r=e[i].speed+"%",s="0%"),o.opacity=[r,s]):"Rotate"==i?("left"==e[i].direction?(r="0deg",s=36*-e[i].speed+"deg"):(r="0deg",s=36*e[i].speed+"deg"),o.rotate=[r,s]):"Scale"==i&&("in"==e[i].direction?(r=1-e[i].speed/10,s=1):(r=1+e[i].speed/10,s=1),o.scale=[r,s])}var n="",l="",c="",d="",p="",m="",u="",h="",f="",g="";for(var v in void 0!==o.translateY&&void 0!==o.translateX&&o.translateY[2]==o.translateX[2]&&(o.translate=[o.translateX[0]+","+o.translateY[0],o.translateX[1]+","+o.translateY[1],o.translateY[2]],delete o.translateX,delete o.translateY),o)"centered"==e.viewport?"opacity"==v?(l+="opacity:"+o[v][0]+";",m+="opacity:"+o[v][1]+";"):(n+=n?" "+v+"("+o[v][0]+")":v+"("+o[v][0]+")",p+=p?" "+v+"("+o[v][1]+")":v+"("+o[v][1]+")"):"top_bottom"==e.viewport?"opacity"==v?(l+="opacity:"+o[v][0]+";",d+="opacity:"+o[v][1]+";"):(n+=n?" "+v+"("+o[v][0]+")":v+"("+o[v][0]+")",c+=c?" "+v+"("+o[v][1]+")":v+"("+o[v][1]+")"):"center_top"==e.viewport?"opacity"==v?(l+="opacity:"+o[v][0]+";",h+="opacity:"+o[v][1]+";"):(n+=n?" "+v+"("+o[v][0]+")":v+"("+o[v][0]+")",u+=u?" "+v+"("+o[v][1]+")":v+"("+o[v][1]+")"):"center_bottom"==e.viewport&&("opacity"==v?(l+="opacity:"+o[v][0]+";",g+="opacity:"+o[v][1]+";"):(n+=n?" "+v+"("+o[v][0]+")":v+"("+o[v][0]+")",f+=f?" "+v+"("+o[v][1]+")":v+"("+o[v][1]+")"));n=n?"transform: "+n+";"+l:l,c=c?"transform: "+c+";"+d:d,p=p?"transform: "+p+";"+m:m,u=u?"transform: "+u+";"+h:h,f=f?"transform: "+f+";"+g:g,a.hasClass("elementor-element")&&(a=a.children(".elementor-widget-container")),n&&a.attr("data-bottom-top",n),c&&a.attr("data-top-bottom",c),p&&a.attr("data-center",p),u&&a.attr("data-center-top",u),f&&a.attr("data-center-bottom",f)}})),"function"==typeof skrollr.init&&Wolmart.$(a,".wolmart-motion-effect-widget").length&&(Wolmart.skrollr_id=skrollr.init({forceHeight:!1}))):Wolmart.$(a).data({plugin:"",options:""}))},Wolmart.initVideoPlayer=function(a){void 0===a&&(a=".btn-video-player"),Wolmart.$(a).on("click",(function(a){var e=t(this).closest(".video-banner");if(e.length&&e.find("video").length){var o=e.find("video");o=o[0],e.hasClass("playing")?(e.removeClass("playing").addClass("paused"),o.pause()):(e.removeClass("paused").addClass("playing"),o.play())}e.find(".parallax-background").length>0&&e.find(".parallax-background").css("z-index","-1"),a.preventDefault()})),Wolmart.$(a).closest(".video-banner").find("video").on("playing",(function(){t(this).closest(".video-banner").removeClass("paused").addClass("playing")})),Wolmart.$(a).closest(".video-banner").find("video").on("ended",(function(){t(this).closest(".video-banner").removeClass("playing").addClass("paused")}))},Wolmart.initAjaxLoadPost=(o={isAjaxShop:!!wolmart_vars.shop_ajax&&t(document.body).hasClass("wolmart-archive-product-layout"),isAjaxBlog:!!wolmart_vars.blog_ajax&&t(document.body).hasClass("wolmart-archive-post-layout"),scrollWrappers:!1,init:function(){o.isAjaxShop?(Wolmart.$body.on("click",".widget_product_categories a",this.filterByCategory).on("click",".widget_product_tag_cloud a",this.filterByLink).on("click",".wolmart-price-filter a",this.filterByLink).on("click",".woocommerce-widget-layered-nav a",this.filterByLink).on("click",".widget_price_filter .button",this.filterByPrice).on("submit",".wolmart-price-range",this.filterByPriceRange).on("click",".widget_rating_filter a",this.filterByRating).on("click",".filter-clean",this.filterByLink).on("click",".toolbox-show-type .btn-showtype",this.changeShowType).on("change",".toolbox-show-count .count",this.changeShowCount).on("click",".yith-woo-ajax-navigation a",this.saveLastYithAjaxTrigger).on("change",".sidebar select.dropdown_product_cat",this.filterByCategory).on("click",".categories-filter-shop .product-category a",this.filterByCategory).on("click",".product-archive + div .pagination a",this.loadmoreByPagination),t(".toolbox .woocommerce-ordering").off("change","select.orderby").on("change","select.orderby",this.sortProducts),t(".product-archive > .woocommerce-info").wrap('<ul class="products"></ul>'),wolmart_vars.skeleton_screen||t(".sidebar .dropdown_product_cat").off("change")):(Wolmart.$body.on("change",".toolbox-show-count .count",this.changeShowCountPage).on("change",".sidebar select.dropdown_product_cat",this.changeCategory),o.initSelect2()),o.isAjaxBlog&&Wolmart.$body.on("click",".widget_categories a",this.filterPostsByLink).on("click",".post-archive .blog-filters a",this.filterPostsByLink).on("click",".post-archive .pagination a",this.loadmoreByPagination),Wolmart.$body.on("click",".btn-load",this.loadmoreByButton).on("click",".products + .pagination a",this.loadmoreByPagination).on("click",".products .pagination a",this.loadmoreByPagination).on("click",".product-filters .nav-filter",this.filterWidgetByCategory).on("click",".filter-categories a",this.filterWidgetByCategory).on("click","div:not(.post-archive) > .posts + .pagination a",this.loadmoreByPagination),Wolmart.$window.on("wolmart_complete wolmart_loadmore",this.startScrollLoad),"undefined"!=typeof yith_wcan&&(t(document).on("yith-wcan-ajax-loading",this.loadingPage).on("yith-wcan-ajax-filtered",this.loadedPage),t(".yit-wcan-container").each((function(){t(this).parent(".product-archive").length||t(this).children(".products").addClass("ywcps-products").unwrap()})),yith_wcan.container=".product-archive .products")},initSelect2:function(){t.fn.selectWoo&&t(".dropdown_product_cat").selectWoo({placeholder:wolmart_vars.select_category,minimumResultsForSearch:5,width:"100%",allowClear:!0,language:{noResults:function(){return wolmart_vars.no_matched}}})},changeShowCountPage:function(t){this.value&&(location.href=Wolmart.addUrlParam(location.href.replace(/\/page\/\d*/,""),"count",this.value))},changeCategory:function(t){location.href=this.value?Wolmart.addUrlParam(wolmart_vars.home_url,"product_cat",this.value):wolmart_vars.shop_url},filterPostsByLink:function(a){if("I"!=a.target.tagName&&!a.target.classList.contains("toggle-btn")||a.target.parentElement!=a.currentTarget){var e=t(a.currentTarget);if(e.is(".nav-filters .nav-filter"))e.closest(".nav-filters").find(".nav-filter").removeClass("active"),e.addClass("active");else if(e.hasClass("active")||e.parent().hasClass("current-cat"))return;var i=t(".post-archive .posts");if(i.length&&o.isAjaxBlog&&o.doLoading(i,"filter")){a.preventDefault();var r=Wolmart.addUrlParam(a.currentTarget.getAttribute("href"),"only_posts",1),s=i.data("post-type");s&&(r=Wolmart.addUrlParam(r,"post_type",s)),t.get(encodeURI(decodeURIComponent(decodeURI(r.replace(/\/page\/(\d*)/,"")))),(function(t){t&&o.loadedPage(0,t,r)}))}}},filterByPrice:function(a){a.preventDefault(),wolmart_vars.auto_close_mobile_filter&&Wolmart.canvasWidth<=992&&t(".sidebar-close").trigger("click");var e=location.href,i=t(a.currentTarget).siblings("#min_price").val(),r=t(a.currentTarget).siblings("#max_price").val();i&&(e=Wolmart.addUrlParam(e,"min_price",i)),r&&(e=Wolmart.addUrlParam(e,"max_price",r)),o.loadPage(e)},filterByPriceRange:function(a){a.preventDefault(),wolmart_vars.auto_close_mobile_filter&&Wolmart.canvasWidth<=992&&t(".sidebar-close").trigger("click");var e=location.href,i=t(a.currentTarget).find(".min_price").val(),r=t(a.currentTarget).find(".max_price").val();e=i?Wolmart.addUrlParam(e,"min_price",i):Wolmart.removeUrlParam(e,"min_price"),(e=r?Wolmart.addUrlParam(e,"max_price",r):Wolmart.removeUrlParam(e,"max_price"))!=location.href&&o.loadPage(e)},filterByRating:function(a){wolmart_vars.auto_close_mobile_filter&&Wolmart.canvasWidth<=992&&t(".sidebar-close").trigger("click");var e=a.currentTarget.getAttribute("href").match(/rating_filter=(\d)/);e&&e[1]&&(a.preventDefault(),o.loadPage(Wolmart.addUrlParam(location.href,"rating_filter",e[1])))},filterByLink:function(a){a.preventDefault(),wolmart_vars.auto_close_mobile_filter&&Wolmart.canvasWidth<=992&&t(".sidebar-close").trigger("click"),o.loadPage(a.currentTarget.getAttribute("href"))},filterByCategory:function(a){var e;a.preventDefault(),wolmart_vars.auto_close_mobile_filter&&Wolmart.canvasWidth<=992&&t(".sidebar-close").trigger("click");var i=!1;if("change"==a.type)e=this.value?Wolmart.addUrlParam(wolmart_vars.home_url,"product_cat",this.value):wolmart_vars.shop_url;else{if(a.target.parentElement==a.currentTarget)return;var r=t(a.currentTarget);if(r.is(".categories-filter-shop .product-category a")){var s=r.closest(".product-category");if(s.hasClass("active"))return;s.closest(".categories-filter-shop").find(".product-category").removeClass("active"),s.addClass("active"),i=!0}else if(r.hasClass("active")||r.parent().hasClass("current-cat"))return;e=r.attr("href")}i||Wolmart.$body.one("wolmart_ajax_shop_layout",(function(){t(".categories-filter-shop .product-category a").each((function(){t(this).closest(".product-category").toggleClass("active",this.href==location.href)}))})),o.loadPage(e)},saveLastYithAjaxTrigger:function(t){o.lastYithAjaxTrigger=t.currentTarget},changeShowType:function(a){if(a.preventDefault(),!this.classList.contains("active")){var e=this.classList.contains("w-icon-list")?"list":"grid";t(".product-archive .products").data("loading_show_type",e),t(this).parent().children().toggleClass("active"),o.loadPage(Wolmart.addUrlParam(location.href,"showtype",e),{showtype:e})}},sortProducts:function(t){o.loadPage(Wolmart.addUrlParam(location.href,"orderby",this.value))},changeShowCount:function(t){o.loadPage(Wolmart.addUrlParam(location.href,"count",this.value))},refreshWidget:function(a,e){var o=e.find(".sidebar "+a),i=t(".sidebar "+a);i.length&&i.each((function(a){o.eq(a).length?this.innerHTML=o.eq(a).html():t(this).find(".woocommerce-widget-layered-nav-list").empty()}))},refreshButton:function(t,a,e){var o=t.siblings(".btn-load");void 0!==e&&("string"==typeof e&&e&&(e=JSON.parse(e)),!e.args||!e.args.paged||e.max>e.args.paged)?o.length?o[0].outerHTML=a.length?a[0].outerHTML:"":a.length&&t.after(a):o.remove()},loadPage:function(a,e){if(o.loadingPage(),"undefined"==typeof showtype&&(a=encodeURI(decodeURIComponent(decodeURI(a.replace(/\/page\/(\d*)/,""))))),a=e&&"list"==e.showtype||(!e||void 0===e.showtype)&&"list"==Wolmart.getUrlParam(location.href,"showtype")?Wolmart.addUrlParam(a,"showtype","list"):Wolmart.removeUrlParam(a,"showtype"),!Wolmart.getUrlParam(a,"count")){var i=Wolmart.getUrlParam(location.href,"count");i&&(a=Wolmart.addUrlParam(a,"count",i))}t.get(Wolmart.addUrlParam(a,"only_posts",1),(function(t){t&&o.loadedPage(0,t,a)}))},loadingPage:function(a){var e=t(".product-archive .products");e.length&&(a&&"yith-wcan-ajax-loading"==a.type&&e.removeClass("yith-wcan-loading").addClass("product-filtering"),o.doLoading(e,"filter")&&Wolmart.scrollToFixedContent((t(".toolbox-top").length?t(".toolbox-top"):$wrapper).offset().top-20,400))},loadedPage:function(a,e,i,r){var s=t(e);s.imagesLoaded((function(){var n,l;if(i&&!Wolmart.isIE&&"button"!=r&&"scroll"!=r&&history.pushState({pageTitle:e&&e.pageTitle?"":e.pageTitle},"",Wolmart.removeUrlParam(i,"only_posts")),void 0===r&&(r="filter"),o.isAjaxBlog)n=t(".post-archive .posts"),(l=s.find(".post-archive .posts")).length||(l=s.find(".posts"));else{if(!o.isAjaxShop){if(n=t(".post-archive .posts"),l=s.find(".post-archive .posts"),n.hasClass("posts"))o.refreshButton(n,l.siblings(".btn-load"),n.attr("data-load"));else if(n=t(".product-archive .products"),l=s.find(".product-archive .products"),n.hasClass("products")){var c=t(".product-archive"),d=s.find(".product-archive");o.refreshButton(c,d.siblings(".btn-load"),n.attr("data-load"))}return}n=t(".product-archive .products"),l=s.find(".product-archive .products")}if("filter"==r&&(n.html(l.html()),o.endLoading(n,r),l.attr("data-load")?n.attr("data-load",l.attr("data-load")):n.removeAttr("data-load")),t(".page-title-bar").html(s.find(".page-title-bar").length?s.find(".page-title-bar").html():""),t(".breadcrumb-container").length&&t(".breadcrumb").html(s.find(".breadcrumb").length?s.find(".breadcrumb").html():""),o.isAjaxBlog){o.refreshButton(n,l.siblings(".btn-load"),n.attr("data-load"));var p=n.siblings(".pagination"),m=l.siblings(".pagination");p.length?p[0].outerHTML=m.length?m[0].outerHTML:"":m.length&&n.after(m),o.refreshWidget(".widget_categories",s),o.refreshWidget(".widget_tag_cloud",s),(u=s.find(".post-archive .nav-filters")).length&&t(".post-archive .nav-filters").html(u.html()),o.fitVideos(n),Wolmart.slider(".post-media-carousel"),Wolmart.$body.trigger("wolmart_ajax_blog_layout",n,e,i,r)}else if(o.isAjaxShop){c=t(".product-archive"),d=s.find(".product-archive"),l.length||n.empty().append(s.find(".woocommerce-info"));var u,h=s.find(".main-content .toolbox .title");if(h.length&&t(".main-content .toolbox .title").html(h.html()),(u=s.find(".main-content .toolbox .nav-filters")).length&&t(".main-content .toolbox .nav-filters").html(u.html()),void 0===r||"button"!=r&&"scroll"!=r){var f=t(".main-content .woocommerce-result-count"),g=f.parent(".toolbox-pagination");v=s.find(".woocommerce-result-count").html(),f.html(v||""),v?g.removeClass("no-pagination"):g.addClass("no-pagination")}else{var v,w=t(".main-content .woocommerce-result-count > span");if(w.length&&(b=(v=w.html()).match(/\d+\–(\d+)/))&&b[1]){var _=parseInt(b[1])+l.children().length,b=v.replace(/\d+\–\d+/,"").match(/\d+/);w.html(b&&b[0]&&_==b[0]?wolmart_vars.texts.show_info_all.replace("%d",_):v.replace(/(\d+)\–\d+/,"$1–"+_))}}var y=c.siblings(".toolbox-pagination"),W=d.siblings(".toolbox-pagination");if(y.length?(p=c.siblings(".toolbox-pagination").find(".pagination"),m=d.siblings(".toolbox-pagination").find(".pagination"),p.length?p[0].outerHTML=m.length?m[0].outerHTML:"":m.length&&c.siblings(".toolbox-pagination").append(m)):W.length&&c.after(W),o.refreshButton(c,d.siblings(".btn-load"),n.attr("data-load")),"filter"==r){if(o.refreshWidget(".wolmart-price-filter",s),o.refreshWidget(".widget_rating_filter",s),Wolmart.shop.ratingTooltip(".widget_rating_filter"),o.refreshWidget(".widget_price_filter",s),Wolmart.initPriceSlider(),o.refreshWidget(".widget_product_categories",s),o.refreshWidget(".widget_product_brands",s),o.refreshWidget(".woocommerce-widget-layered-nav:not(.widget_product_brands)",s),a&&"yith-wcan-ajax-filtered"==a.type){yith_wcan&&t(yith_wcan.result_count).show();var C=t(o.lastYithAjaxTrigger);C.closest(".yith-woo-ajax-navigation").is(":hidden")&&C.parent().toggleClass("chosen"),t(".sidebar .yith-woo-ajax-navigation").show()}else o.refreshWidget(".yith-woo-ajax-navigation",s);t(".current-cat-parent ul").length&&t(".current-cat-parent ul").css("display","block"),o.initSelect2()}n.hasClass("skeleton-body")||n.data("loading_show_type")&&(n.toggleClass("list-type-products","list"==n.data("loading_show_type")),n.attr("class",n.attr("class").replace(/row|cols\-\d|cols\-\w\w-\d/g,"").replace(/\s+/," ")+n.attr("data-col-"+n.data("loading_show_type"))),t(".main-content-wrap > .sidebar.closed").length&&Wolmart.shop.switchColumns(!1)),n.removeData("loading_show_type"),Wolmart.shop.initProducts(n),Wolmart.$body.trigger("wolmart_ajax_shop_layout",n,e,i,r),n.removeClass("product-filtering")}n.removeClass("skeleton-body load-scroll"),l.hasClass("load-scroll")&&n.addClass("load-scroll"),Wolmart.menu.initCollapsibleWidgetToggle(),n.hasClass("grid")&&Wolmart.isotopes(n),Wolmart.countdown(n.find(".countdown")),Wolmart.call(o.startScrollLoad,50),Wolmart.call(Wolmart.refreshLayouts,70),Wolmart.$body.trigger("wolmart_ajax_finish_layout",n,e,i,r)}))},canLoad:function(t,a){if(("button"==a||"scroll"==a)&&t.attr("data-load")){var e=JSON.parse(t.attr("data-load"));if(e&&e.args&&e.max<=e.args.paged)return!1}return!(t.hasClass("loading-more")||t.hasClass("skeleton-body")||t.siblings(".w-loading").length)},doLoading:function(a,e){if(!o.canLoad(a,e))return!1;if(wolmart_vars.skeleton_screen&&a.closest(".product-archive, .post-archive").length){var i=12,r="";if(a.closest(".product-archive").length){if(!(i=parseInt(Wolmart.getCookie("wolmart_count")))){var s=t(".main-content .toolbox-show-count .count");s.length&&(i=s.val())}i||(i=12)}else a.closest(".post-archive").length&&(a.children(".grid-space").remove(),i=wolmart_vars.posts_per_page);if(a.hasClass("products")){var n=a.hasClass("list-type-products")?"skel-pro skel-pro-list":"skel-pro";a.data("loading_show_type")&&(n="list"==a.data("loading_show_type")?"skel-pro skel-pro-list":"skel-pro"),r='<li class="product-wrap"><div class="'+n+'"></div></li>'}else n="skel-post",a.hasClass("list-type-posts")&&(n="skel-post-list"),a.attr("data-post-type")&&(n="skel-post-"+a.attr("data-post-type")),r='<div class="post-wrap"><div class="'+n+'"></div></div>';if("page"!=e&&"filter"!=e||a.html(""),a.data("loading_show_type")&&(a.toggleClass("list-type-products","list"==a.data("loading_show_type")),a.attr("class",a.attr("class").replace(/row|cols\-\d|cols\-\w\w-\d/g,"").replace(/\s+/," ")+a.attr("data-col-"+a.data("loading_show_type")))),Wolmart.isIE){for(var l="";i--;)l+=r;a.addClass("skeleton-body").append(l)}else a.addClass("skeleton-body").append(r.repeat(i))}else"button"==e||"scroll"==e?Wolmart.showMore(a):Wolmart.doLoading(a.parent());return"page"==e&&Wolmart.scrollToFixedContent((t(".toolbox-top").length?t(".toolbox-top"):a).offset().top-20,400),a.data("isotope")&&a.isotope("destroy"),a.addClass("loading-more"),!0},endLoading:function(t,a){wolmart_vars.skeleton_screen&&t.closest(".product-archive, .post-archive").length?("button"!=a&&"scroll"!=a||t.find(".skel-pro,.skel-post").parent().remove(),t.removeClass("skeleton-body")):"button"==a||"scroll"==a?Wolmart.hideMore(t.parent()):Wolmart.endLoading(t.parent()),t.removeClass("loading-more")},filterWidgetByCategory:function(a){var e=t(a.currentTarget);if(a.preventDefault(),!(e.is(".toolbox .nav-filter")||e.is(".post-archive .nav-filter")||e.hasClass("active"))){var i,r,s=e.attr("data-cat");(i=e.closest(".nav-filters")).length?r=i.parent().find(i.hasClass("product-filters")?".products":".posts"):(i=e.closest(".filter-categories")).length&&(e.closest(".elementor-section").length?(r=e.closest(".elementor-section").find(".products[data-load]").eq(0)).length||(r=e.closest(".elementor-top-section").find(".products[data-load]").eq(0)):e.closest(".vce-row").length?r=e.closest(".vce-row").find(".products[data-load]").eq(0):e.closest(".wpb_row").length&&((r=e.closest(".wpb_row").find(".products[data-load]").eq(0)).length||e.closest(".vc_section").length&&(r=e.closest(".vc_section").find(".products[data-load]").eq(0)))),r.length&&o.loadmore({wrapper:r,page:1,type:"filter",category:s,onStart:function(){i.length&&(i.find(".cat-type-icon").length?(i.find(".cat-type-icon").removeClass("active"),e.closest(".cat-type-icon").addClass("active")):(i.find("a").removeClass("active"),e.addClass("active")))}})}},loadmoreByButton:function(a){var e=t(a.currentTarget);a.preventDefault(),o.loadmore({wrapper:e.siblings(".product-archive").length?e.siblings(".product-archive").find(".products"):e.siblings(".products, .posts"),page:"+1",type:"button",onStart:function(){e.data("text",e.html()).addClass("loading").blur().html(wolmart_vars.texts.loading)},onFail:function(){e.text(wolmart_vars.texts.loadmore_error).addClass("disabled")}})},startScrollLoad:function(){o.scrollWrappers=t(".load-scroll"),o.scrollWrappers.length&&(o.loadmoreByScroll(),Wolmart.$window.off("scroll resize",o.loadmoreByScroll),window.addEventListener("scroll",o.loadmoreByScroll,{passive:!0}),window.addEventListener("resize",o.loadmoreByScroll,{passive:!0}))},loadmoreByScroll:function(a){var e=o.scrollWrappers,i=e.attr("data-load"),r=1,s=1;i&&(r=(i=JSON.parse(i)).max,i.args&&i.args.paged&&(s=i.args.paged)),s>=r||(a&&a instanceof jQuery&&(e=a),e.length&&o.canLoad(e,"scroll")&&e.each((function(){var a=this.getBoundingClientRect();a.top+a.height>0&&a.top+a.height<window.innerHeight&&o.loadmore({wrapper:t(this),page:"+1",type:"scroll",onDone:function(t,a,e){e.max&&e.max<=e.args.paged&&a.removeClass("load-scroll"),Wolmart.call(o.startScrollLoad,50)},onFail:function(t,a){a.removeClass("load-scroll")}})})),o.scrollWrappers=o.scrollWrappers.filter((function(){var a=t(this);return a.children(".post-wrap,.product-wrap").length||a.removeClass("load-scroll"),a.hasClass("load-scroll")})),o.scrollWrappers.length||(window.removeEventListener("scroll",o.loadmoreByScroll),window.removeEventListener("resize",o.loadmoreByScroll)))},fitVideos:function(a,e){if(a.find(".fit-video").length){var o=(n=t.Deferred(),t("#wp-mediaelement-css").length?n.resolve():t(document.createElement("link")).attr({id:"wp-mediaelement-css",href:wolmart_vars.ajax_url.replace("wp-admin/admin-ajax.php","wp-includes/js/mediaelement/wp-mediaelement.min.css"),media:"all",rel:"stylesheet"}).appendTo("body").on("load",(function(){n.resolve()})),n.promise()),i=function(){var a=t.Deferred();return t("#mediaelement-css").length?a.resolve():t(document.createElement("link")).attr({id:"mediaelement-css",href:wolmart_vars.ajax_url.replace("wp-admin/admin-ajax.php","wp-includes/js/mediaelement/mediaelementplayer-legacy.min.css"),media:"all",rel:"stylesheet"}).appendTo("body").on("load",(function(){a.resolve()})),a.promise()}(),r=function(){var a=t.Deferred();if(void 0!==window.wp.mediaelement)a.resolve();else{t('<script>var _wpmejsSettings = { "stretching": "responsive" }; <\/script>').appendTo("body");var e=function(){var a=t.Deferred();return t(document.createElement("script")).attr("id","mediaelement-core-js").appendTo("body").on("load",(function(){a.resolve()})).attr("src",wolmart_vars.ajax_url.replace("wp-admin/admin-ajax.php","wp-includes/js/mediaelement/mediaelement-and-player.min.js")),a.promise()}(),o=function(){var a=t.Deferred();return setTimeout((function(){t(document.createElement("script")).attr("id","mediaelement-migrate-js").appendTo("body").on("load",(function(){a.resolve()})).attr("src",wolmart_vars.ajax_url.replace("wp-admin/admin-ajax.php","wp-includes/js/mediaelement/mediaelement-migrate.min.js"))}),100),a.promise()}();t.when(e,o).done((function(e){t(document.createElement("script")).attr("id","wp-mediaelement-js").appendTo("body").on("load",(function(){a.resolve()})).attr("src",wolmart_vars.ajax_url.replace("wp-admin/admin-ajax.php","wp-includes/js/mediaelement/wp-mediaelement.min.js"))}))}return a.promise()}(),s=function(){var a=t.Deferred();return t.fn.fitVids?a.resolve():t(document.createElement("script")).attr("id","jquery.fitvids-js").appendTo("body").on("load",(function(){a.resolve()})).attr("src",wolmart_vars.assets_url+"/vendor/jquery.fitvids/jquery.fitvids.min.js"),a.promise()}();t.when(o,i,r,s).done((function(t){Wolmart.call((function(){Wolmart.fitVideoSize(a)}),200)}))}var n},loadmoreByPagination:function(a){var e=t(a.currentTarget);if(!(Wolmart.$body.hasClass("dokan-store")&&e.closest(".dokan-single-store").length||Wolmart.$body.hasClass("wcfm-store-page")||Wolmart.$body.hasClass("wcfmmp-store-page"))){a.preventDefault();var i=e.closest(".toolbox-pagination").length?e.closest(".toolbox-pagination"):e.closest(".pagination");o.loadmore({wrapper:i.siblings(".product-archive").length?i.siblings(".product-archive").find(".products"):i.siblings(".products, .posts"),page:e.hasClass("next")?"+1":e.hasClass("prev")?"-1":e.text(),type:"page",onStart:function(t,a){Wolmart.doLoading(e.closest(".pagination"),"simple")}})}},loadmore:function(a){if(!a.wrapper||1!=a.wrapper.length||!a.wrapper.attr("data-load")||!o.doLoading(a.wrapper,a.type))return!1;var e=a.wrapper,i=JSON.parse(e.attr("data-load"));if(i.args=i.args||{},!i.args.paged&&(i.args.paged=1,e.closest(".product-archive, .post-archive").length)){var r=location.pathname.match(/\/page\/(\d*)/);r&&r[1]&&(i.args.paged=parseInt(r[1]))}"filter"==a.type?(i.args.paged=1,a.category?i.args.category=a.category:i.args.category&&delete i.args.category):"+1"===a.page?++i.args.paged:"-1"===a.page?--i.args.paged:i.args.paged=parseInt(a.page);var s=wolmart_vars.ajax_url;if(e.closest(".product-archive, .post-archive").length){var n=location.pathname;n.endsWith("/")&&(n=n.slice(0,n.length-1)),n.indexOf("/page/")>=0?n=n.replace(/\/page\/\d*/,"/page/"+i.args.paged):n+="/page/"+i.args.paged,s=Wolmart.addUrlParam(location.origin+n+location.search,"only_posts",1),i.args.category&&"*"!=i.args.category&&(s=Wolmart.addUrlParam(s,"product_cat",category))}if(e.hasClass("products")&&!e.closest(".product-archive").length&&(s=Wolmart.addUrlParam(s,"product-page",i.args.paged)),e.closest(".post-archive").length){var l=e.data("post-type");l&&(s=Wolmart.addUrlParam(s,"post_type",l))}var c={action:e.closest(".product-archive, .post-archive").length?"":"wolmart_loadmore",nonce:wolmart_vars.nonce,props:i.props,args:i.args,loadmore:a.type};return"page"==a.type&&(c.pagination=1),a.onStart&&a.onStart(e,i),t.post(s,c).done((function(r){var n="";e.hasClass("posts")&&!e.closest(".post-archive").length&&"page"==a.type&&(r=JSON.parse(r),n=r.pagination,r=r.html);var l,c=t(r);c.imagesLoaded((function(){if(l=e.closest(".product-archive").length?c.find(".product-archive .products"):e.closest(".post-archive").length?c.find(".post-archive .posts"):e.hasClass("products")?c.find(".products"):c,"page"!=a.type&&"filter"!=a.type||(e.data("slider")&&(e.data("slider").destroy(),e.removeData("slider"),e.data("slider-layout")&&e.addClass(e.data("slider-layout").join(" "))),e.data("isotope")&&e.data("isotope").destroy(),e.empty()),!e.hasClass("posts")||e.closest(".post-archive").length){var d=l.attr("data-load-max");d&&(i.max=parseInt(d)),e.append(l.children())}else e.append(l);if(e.attr("data-load",JSON.stringify(i)),e.closest(".product-archive").length||e.closest(".post-archive").length)o.loadedPage(0,r,s,a.type);else{var p="filter"==a.type?i.props.loadmore_type:a.type;if("button"==p)if("filter"!=a.type&&e.hasClass("posts")){var m=e.siblings(".btn-load");m.length&&(void 0===i.args||void 0===i.max||void 0===i.args.paged||i.max<=i.args.paged?m.remove():m.html(m.data("text")))}else o.refreshButton(e,c.find(".btn-load"),i);else if("page"==p){var u=e.parent().find(".pagination"),h=e.hasClass("posts")?t(n):c.find(".pagination");u.length?u[0].outerHTML=h.length?h[0].outerHTML:"":h.length&&e.after(h)}else"scroll"==p&&(e.addClass("load-scroll"),"filter"==a.type&&Wolmart.call((function(){o.loadmoreByScroll(e)}),50))}e.hasClass("products")&&Wolmart.shop.initProducts(e),e.hasClass("posts")&&o.fitVideos(e),e.hasClass("grid")&&(e.removeData("isotope"),Wolmart.isotopes(e)),e.hasClass("slider-wrapper")&&Wolmart.slider(e),a.onDone&&a.onDone(c,e,i),e.hasClass("filter-products")||e.hasClass("products")&&e.parent().siblings(".nav-filters").length||!i.max||!(i.max<=i.args.paged)||"page"==a.type||e.removeAttr("data-load"),o.endLoading(e,a.type),a.onAlways&&a.onAlways(r,e,i),Wolmart.refreshLayouts()}))})).fail((function(t){a.onFail&&a.onFail(t,e),o.endLoading(e,a.type),a.onAlways&&a.onAlways(result,e,i)})),!0}},function(){o.init(),Wolmart.AjaxLoadPost=o}),Wolmart.menu=function(){function a(a,e){var o=t(".mobile-menu-wrapper .mobile-menu-container");function i(){Wolmart.liveSearch&&setTimeout((function(){Wolmart.liveSearch("",t(".mobile-menu-wrapper .search-wrapper"))})),Wolmart.menu.addToggleButtons(".mobile-menu li")}if(Wolmart.$body.addClass("mmenu-active"),a.preventDefault(),o.find(".mobile-menu").length)i(),"function"==typeof e&&e();else{var r=Wolmart.getCache(r);r.mobileMenu&&r.mobileMenuLastTime&&wolmart_vars.menu_last_time&&parseInt(r.mobileMenuLastTime)>=parseInt(wolmart_vars.menu_last_time)?(o.append(r.mobileMenu),i(),Wolmart.setCurrentMenuItems(".mobile-menu-wrapper")):(Wolmart.doLoading(o),t.post(wolmart_vars.ajax_url,{action:"wolmart_load_mobile_menu",nonce:wolmart_vars.nonce,load_mobile_menu:!0},(function(t){t&&(t=t.replace(/(class=".*)current_page_parent\s*(.*")/,"$1$2")),o.css("height",""),Wolmart.endLoading(o),o.append(t),i(),Wolmart.setCurrentMenuItems(".mobile-menu-wrapper"),r.mobileMenuLastTime=wolmart_vars.menu_last_time,r.mobileMenu=t,Wolmart.setCache(r),"function"==typeof e&&e()})))}}function e(t){t&&t.type&&"resize"==t.type&&!Wolmart.windowResized(t.timeStamp)||(t.preventDefault(),Wolmart.$body.removeClass("mmenu-active"))}var o=function(){function a(){t("nav .menu.horizontal-menu .megamenu, .elementor-widget .recent-dropdown").each((function(){var a=t(this),e=a.offset().left-parseInt(a.css("margin-left")),o=a.outerWidth(),i=e+o-(window.innerWidth-20);a.hasClass("full-megamenu")&&0==a.closest(".container-fluid").length?a.css("margin-left",(t(window).width()-o)/2-e+"px"):i>0&&e>20&&a.css("margin-left",-i+"px"),a.addClass("executed")}))}if(t(".toggle-menu.dropdown").length){var e=t(".toggle-menu.dropdown .vertical-menu"),o=e.length>0&&e.offset().top,i=o;t(".vertical-menu .menu-item-has-children").on("mouseenter",(function(a){var e=t(this);if(e.children(".megamenu").length){var r=e.children(".megamenu"),s=r.offset().top-parseInt(r.css("margin-top")),n=r.outerHeight();if(void 0!==(i=window.pageYOffset>o?e.closest(".menu").offset().top:o)&&s>=i){var l=s+n-window.innerHeight-window.pageYOffset;l<=0?r.css("margin-top","0px"):l<s-i?r.css("margin-top",-(l+5)+"px"):r.css("margin-top",-(s-i)+"px")}}}))}a(),Wolmart.$window.on("resize recalc_menus",a)};return{init:function(){this.initMenu(),this.initFilterMenu(),this.initCollapsibleWidget(),this.initCollapsibleWidgetToggle()},initMenu:function(i){void 0===i&&(i=""),Wolmart.$body.on("click",i+" .menu-item .nolink",Wolmart.preventDefault).on("click",".mobile-menu-toggle",a).on("click",".mobile-menu-overlay",e).on("click",".mobile-menu-close",e).on("click",".mobile-item-categories.show-categories-menu",(function(e){a(e,(function(){t('.mobile-menu-container .nav a[href="#categories"]').trigger("click")}))})),window.addEventListener("resize",e,{passive:!0}),this.addToggleButtons(i+" .collapsible-menu li"),Wolmart.$body.on("click",".dropdown-menu-toggle",Wolmart.preventDefault),setTimeout(o),wolmart_vars.lazyload&&Wolmart.call((function(){t(".megamenu [data-lazy]").each((function(){Wolmart._lazyload_force(this)}))}))},addToggleButtons:function(a){Wolmart.$(a).each((function(){var a=t(this);a.hasClass("menu-item-has-children")&&!a.children("a").children(".toggle-btn").length&&a.children("ul").text().trim()&&a.children("a").each((function(){var t=document.createElement("span");t.className="toggle-btn",this.append(t)}))}))},initFilterMenu:function(){Wolmart.$body.on("click",".with-ul > a i, .menu .toggle-btn, .mobile-menu .toggle-btn",(function(a){var e=t(this),o=e.parent().siblings(":not(.count)");o.length>1?e.parent().toggleClass("show").next(":not(.count)").slideToggle(300):o.length>0&&o.slideToggle(300).parent().toggleClass("show"),setTimeout((function(){e.closest(".sticky-sidebar").trigger("recalc.pin")}),320),a.preventDefault()}))},initCollapsibleWidgetToggle:function(a){t(".widget .product-categories li").add(".sidebar .widget.widget_categories li").add(".widget .product-brands li").add(".store-cat-stack-dokan li").each((function(){if(this.lastElementChild&&"UL"===this.lastElementChild.tagName){var t=document.createElement("i");t.className="w-icon-angle-down",this.classList.add("with-ul"),this.classList.add("cat-item"),this.firstElementChild.appendChild(t)}})),Wolmart.$(void 0===a?".sidebar .widget-collapsible .widget-title":a).each((function(){var a=t(this);if(!(a.closest(".top-filter-widgets").length||a.closest(".toolbox-horizontal").length||a.siblings(".slider-wrapper").length||a.children(".toggle-btn").length)){var e=document.createElement("span");e.className="toggle-btn",this.appendChild(e)}}))},initCollapsibleWidget:function(){Wolmart.$body.on("click",".sidebar .widget-collapsible .widget-title",(function(a){var e=t(a.currentTarget);if(!(e.closest(".top-filter-widgets").length||e.closest(".toolbox-horizontal").length||e.siblings(".slider-wrapper").length||e.hasClass("sliding"))){var o=e.siblings("*:not(script):not(style)");e.hasClass("collapsed")||o.css("display","block"),e.addClass("sliding"),o.slideToggle(300,(function(){e.removeClass("sliding"),Wolmart.$window.trigger("update_lazyload"),t(".sticky-sidebar").trigger("recalc.pin")})),e.toggleClass("collapsed")}}))}}}(),Wolmart.popup=function(a,e){var o=t.magnificPopup.instance;o.isOpen?o.content?setTimeout((function(){Wolmart.popup(a,e)}),5e3):t.magnificPopup.close():t.magnificPopup.open(t.extend(!0,{},Wolmart.defaults.popup,e?Wolmart.defaults.popupPresets[e]:{},a))},Wolmart.sidebar=function(){function a(t){return this.init(t)}return a.prototype.init=function(a){var e=this;return e.name=a,e.$sidebar=t("."+a),e.$sidebar.length&&(Wolmart.$window.on("resize",(function(e){Wolmart.windowResized(e.timeStamp)&&(Wolmart.$body.removeClass(a+"-active"),t(".page-wrapper, .sticky-content").css({"margin-left":"","margin-right":""}))})),e.$sidebar.find(".sidebar-toggle, .sidebar-toggle-btn").add("."+a+"-toggle").on("click",(function(a){e.toggle(),a.preventDefault(),Wolmart.$window.trigger("update_lazyload"),t(".sticky-sidebar").trigger("recalc.pin.left",[400])})),e.$sidebar.find(".sidebar-overlay, .sidebar-close").on("click",(function(a){a.stopPropagation(),e.toggle("close"),a.preventDefault(),t(".sticky-sidebar").trigger("recalc.pin.left",[400])})),t(".current-cat-parent ul").length&&t(".current-cat-parent ul").css("display","block"),e.$sidebar.find(".sidebar-content").on("scroll",(function(){Wolmart.$window.trigger("update_lazyload")}))),!1},a.prototype.toggle=function(a){var e=Wolmart.$body.hasClass(this.name+"-active");if(!a||"close"!=a||e){var o=t("."+this.name+" .sidebar-content").outerWidth(),i=e?"":"right-sidebar"==this.name?-o:o,r=e?"":"right-sidebar"==this.name?o:-o;this.$sidebar.find(".sidebar-overlay .sidebar-close").css("margin-left",-(window.innerWidth-document.body.clientWidth)),Wolmart.$body.toggleClass(this.name+"-active").removeClass("closed"),window.innerWidth<=992&&(t(".page-wrapper").css({"margin-left":i,"margin-right":r}),t(".sticky-content.fixed").css({transition:"opacity .5s, margin .4s","margin-left":i,"margin-right":r}),setTimeout((function(){t(".sticky-content.fixed").css("transition","opacity .5s")}),400)),Wolmart.call(Wolmart.refreshLayouts,300)}},Wolmart.$window.on("wolmart_complete",(function(){t(".sidebar").length&&Wolmart.$window.smartresize((function(){setTimeout((function(){Wolmart.$window.trigger("update_lazyload")}),300)}))})),function(t){return(new a).init(t)}}(),Wolmart.minipopup=(r=[],s=[],n=!1,l=!1,c=function(){if(!n)for(var t=0;t<s.length;++t)(s[t]-=200)<=0&&this.close(t--)},{init:function(){var a=document.createElement("div");a.className="minipopup-area",t(Wolmart.byClass("page-wrapper")).append(a),i=t(a),this.close=this.close.bind(this),c=c.bind(this)},open:function(a,e){var o,n=this,d=t.extend(!0,{},Wolmart.defaults.minipopup,a);(o=t(d.content)).find("img").on("load",(function(){setTimeout((function(){o.addClass("show")}),300),o.offset().top-window.pageYOffset<0&&n.close(),o.on("mouseenter",(function(){n.pause()})),o.on("mouseleave",(function(t){n.resume()})),o[0].addEventListener("touchstart",(function(t){n.pause(),t.stopPropagation()}),{passive:!0}),Wolmart.$body[0].addEventListener("touchstart",(function(){n.resume()}),{passive:!0}),o.on("mousedown",(function(){o.css("transform","translateX(0) scale(0.96)")})),o.on("mousedown","a",(function(t){t.stopPropagation()})),o.on("mouseup",(function(){n.close(r.indexOf(o))})),o.on("mouseup","a",(function(t){t.stopPropagation()})),r.push(o),s.push(d.delay),s.length>1||(l=setInterval(c,200)),e&&e(o)})).on("error",(function(){o.remove()})),o.appendTo(i)},close:function(t){var a=this,e=void 0===t?0:t,o=r.splice(e,1)[0];o&&(s.splice(e,1)[0],o.css("transform","").removeClass("show"),a.pause(),setTimeout((function(){var t=o.next();t.length?t.animate({"margin-bottom":-1*o[0].offsetHeight-20},300,"easeOutQuint",(function(){t.css("margin-bottom",""),o.remove()})):o.remove(),a.resume()}),300),r.length||clearTimeout(l))},pause:function(){n=!0},resume:function(){n=!1}}),Wolmart.cartpopup=function(){var a,e='<div class="cart-popup-wrapper"><div class="cart-popup-overlay"></div><div class="cart-popup-content"><h3 class="cart-popup-title">'+wp.i18n.__("Added To Cart!","wolmart")+'<i class="popup-close mfp-close"></i></h3><div class="cart-item-wrapper"></div><h4 class="related-products-title">'+wp.i18n.__("You may also like","wolmart")+'</h4><div class="related-products-wrapper"></div><a href="#" class="btn btn-sm btn-dark btn-continue">'+wp.i18n.__("Continue Shopping","wolmart")+"</a></div></div>";return{init:function(){var e=document.createElement("div");e.className="cart-popup-area",t(Wolmart.byClass("page-wrapper")).append(e),a=t(e),Wolmart.$body.on("click",".cart-popup-wrapper .popup-close, .cart-popup-wrapper .cart-popup-overlay, .cart-popup-wrapper .btn-continue",(function(a){t(this).closest(".cart-popup-wrapper").removeClass("show"),a.preventDefault()}))},open:function(o,i){a.html(e),a.find(".cart-item-wrapper").html(o),t.ajax({type:"GET",dataType:"json",url:wolmart_vars.ajax_url,data:{action:"wolmart_cart_related_products",product_id:i},success:function(t){if(t.data){var e=t.data.html;a.find(".related-products-wrapper").html(e),Wolmart.shop.initProducts(a)}a.find(".cart-popup-wrapper").addClass("show")}})}}}(),Wolmart.createProductGallery=function(){function a(t){return this.init(t)}var e=!0;return a.prototype.init=function(a){var e=this;void 0===a.data("product_gallery")&&a.wc_product_gallery(),this.$wc_gallery=a,this.wc_gallery=a.data("product_gallery"),t(".woocommerce-product-gallery__trigger").remove(),this.$slider=a.find(".product-single-carousel"),this.$slider.length?this.initThumbs():(this.$slider=this.$wc_gallery.find(".product-gallery-carousel"),this.$slider.length?this.$slider.on("initialized.slider",this.initZoom.bind(this)):this.initZoom()),a.off("click",".woocommerce-product-gallery__image a").on("click",Wolmart.preventDefault),a.closest(".product-quickview").length||a.closest(".product-widget").length||(a.on("click",".woocommerce-product-gallery__wrapper .product-image-full",this.openImageFull.bind(this)),a.find(".product-sticky-thumbs").length&&(a.on("click",".product-sticky-thumbs img",this.clickStickyThumbnail.bind(this)),window.addEventListener("scroll",this.scrollStickyThumbnail.bind(this),{passive:!0}))),"complete"===Wolmart.status&&e.$slider&&e.$slider.length&&Wolmart.slider(e.$slider),Wolmart.$window.on("wolmart_complete",(function(){setTimeout(e.initAfterLazyload.bind(e),200)}))},a.prototype.initAfterLazyload=function(){this.currentPostImageSrc=this.$wc_gallery.find(".wp-post-image").attr("src")},a.prototype.initThumbs=function(){var t=this;!function(t){t.$thumbs=t.$wc_gallery.find(".product-thumbs"),t.$thumbsDots=t.$thumbs.children(),t.isVertical=t.$thumbs.parent().parent().hasClass("pg-vertical"),t.$thumbsWrap=t.$thumbs.parent(),Wolmart.slider(t.$thumbs,{},!0),t.isVertical&&window.addEventListener("resize",(function(){Wolmart.requestTimeout((function(){t.$thumbs.data("slider")&&t.$thumbs.data("slider").update()}),100)}),{passive:!0})}(t),this.$slider.on("initialized.slider",(function(a){t.initZoom()}))},a.prototype.openImageFull=function(a){if(!a.target.classList.contains("zoomImg")&&wc_single_product_params.photoswipe_options){a.preventDefault();var e=this.$wc_gallery.find(".product-single-carousel").data("slider");e&&(wc_single_product_params.photoswipe_options.index=e.activeIndex),this.wc_gallery.$images.filter(".yith_featured_content").length&&(wc_single_product_params.photoswipe_options.index=e?e.activeIndex-1:t(a.currentTarget).closest(".woocommerce-product-gallery__image").index()-1),this.wc_gallery.openPhotoswipe(a),a.stopPropagation()}},a.prototype.clickStickyThumbnail=function(a){var e=this,o=t(a.currentTarget);o.addClass("active").siblings(".active").removeClass("active"),this.isStickyScrolling=!0,Wolmart.scrollTo(this.$wc_gallery.find(".product-sticky-images > :nth-child("+(o.index()+1)+")")),setTimeout((function(){e.isStickyScrolling=!1}),300)},a.prototype.scrollStickyThumbnail=function(){var a=this;this.isStickyScrolling||this.$wc_gallery.find(".product-sticky-images img:not(.zoomImg)").each((function(){if(Wolmart.isOnScreen(this))return a.$wc_gallery.find(".product-sticky-thumbs-inner > :nth-child("+(t(this).closest(".woocommerce-product-gallery__image").index()+1)+")").addClass("active").siblings().removeClass("active"),!1}))},a.prototype.initZoomImage=function(a){if(wolmart_vars.single_product.zoom_enabled){var e=a.children("img"),o=e.attr("data-large_image_width"),i=t.extend({touch:!1},wolmart_vars.single_product.zoom_options);e.attr("data-src",e.attr("data-large_image")),"ontouchstart"in document.documentElement&&(i.on="click"),a.trigger("zoom.destroy").children(".zoomImg").remove(),void 0!==o&&a.width()<o&&(a.zoom(i),setTimeout((function(){a.find(":hover").length&&a.trigger("mouseover")}),100))}},a.prototype.changePostImage=function(t){var a=this.$wc_gallery.find(".wp-post-image");if(!a.hasClass("w-lazyload")&&this.currentPostImageSrc!=a.attr("src")){this.currentPostImageSrc=a.attr("src");var o=this.$wc_gallery.find(".product-thumbs img").eq(0),i=this.$wc_gallery.find(".product-gallery");o.length&&(void 0!==t?"reset"==t?(o.wc_reset_variation_attr("src"),o.wc_reset_variation_attr("srcset"),o.wc_reset_variation_attr("sizes"),o.wc_reset_variation_attr("alt")):(o.wc_set_variation_attr("src",t.image.gallery_thumbnail_src),t.image.alt&&o.wc_set_variation_attr("alt",t.image.alt),t.image.srcset&&o.wc_set_variation_attr("srcset",t.image.srcset),t.image.sizes&&o.wc_set_variation_attr("sizes",t.image.sizes)):(o.wc_set_variation_attr("src",this.currentPostImageSrc),a.attr("srcset")&&o.wc_set_variation_attr("srcset",a.attr("srcset")),a.attr("sizes")&&o.wc_set_variation_attr("sizes",a.attr("sizes")),a.attr("alt")&&o.wc_set_variation_attr("alt",a.attr("alt")))),this.initZoomImage(a.parent());var r=i.children(".product-single-carousel,.product-gallery-carousel").data("slider");r&&r.update(),e||this.$wc_gallery.closest(".product").find(".sticky-sidebar .summary").length&&Wolmart.scrollTo(this.$wc_gallery,400),e=!1}},a.prototype.initZoom=function(){if(wolmart_vars.single_product.zoom_enabled){var a=this;if(!this.$wc_gallery.closest(".product-quickview").length&&!this.$wc_gallery.closest(".product-widget").length){var e='<button class="product-gallery-btn product-image-full w-icon-zoom"></button>'+(this.$wc_gallery.data("buttons")||"");this.$slider.length&&this.$slider.hasClass("product-single-carousel")?this.$slider.after(e):this.$wc_gallery.find(".woocommerce-product-gallery__image > a").each((function(){t(this).after(e)}))}Wolmart.appear(this.$wc_gallery[0],(()=>{this.$wc_gallery.find(".woocommerce-product-gallery__image > a").each((function(){a.initZoomImage(t(this))})).on("click",(function(t){t.stopPropagation(),t.preventDefault()}))}),{alwaysObserve:!1})}},function(e){t.fn.wc_product_gallery&&Wolmart.$(e).each((function(){var e=t(this);e.data("wolmart_product_gallery",new a(e))}))}}(),Wolmart.initProductGallery=function(){Wolmart.$body.on("click",".product-image-full",(function(a){var e=t(a.currentTarget);a.preventDefault(),e.siblings(".product-single-carousel").length?e.parent().find(".slider-slide-active a").trigger("click"):e.prev("a").trigger("click")}))},Wolmart.createProductSingle=function(){function a(t){return this.init(t)}return a.prototype.init=function(a){this.$product=a,a.find(".woocommerce-product-gallery").each((function(){Wolmart.createProductGallery(t(this))})),t(".reset_variations").hide().removeClass("d-none"),"complete"===Wolmart.status?(t.fn.wc_variation_form&&"undefined"!=typeof wc_add_to_cart_variation_params&&this.$product.find(".variations_form").wc_variation_form(),Wolmart.quantityInput(this.$product.find(".qty")),Wolmart.countdown(this.$product.find(".product-countdown"))):this.$product.hasClass("product-widget")&&!this.$product.hasClass("product-quickview")||this.stickyCartForm(this.$product.find(".product-sticky-content"))},a.prototype.stickyCartForm=function(t){var a=Wolmart.$(t);if(1==a.length){var e=a.closest(".product"),o=e.find(".product_title").get(0),i=e.find(".woocommerce-product-gallery .wp-post-image").eq(0),r=wolmart_vars.lazyload?i.attr("data-lazy"):i.attr("src"),s=e.find("p.price");r||(r=i.attr("src")),a.find(".quantity-wrapper").before('<div class="sticky-product-details">'+(i.length?'<img src="'+r+'" width="'+i.attr("width")+'" height="'+i.attr("height")+'" alt="'+i.attr("alt")+'">':"")+"<div>"+(o?o.outerHTML.replace("<h1","<h3").replace("h1>","h3>").replace("product_title","product-title"):"")+(s.length?s[0].outerHTML:"")+"</div>");var n=a.data("sticky-content");n&&(n.getTop=function(){var t;return a.closest(".sticky-sidebar").length?t=e.find(".woocommerce-product-gallery"):(t=a.closest(".product-single > *")).hasClass("elementor")&&(t=a.closest(".cart")),t.offset().top+t.height()},n.onFixed=function(){Wolmart.$body.addClass("addtocart-fixed")},n.onUnfixed=function(){Wolmart.$body.removeClass("addtocart-fixed")}),Wolmart.$window.on("sticky_refresh_size.wolmart",l),l()}function l(){Wolmart.requestTimeout((function(){a.removeClass("fix-top fix-bottom").addClass(window.innerWidth<768?"fix-top":"fix-bottom")}),50)}},function(e){Wolmart.$(e).each((function(){var e=t(this);e.data("wolmart_product_single",new a(e))}))}}(),Wolmart.initProductSingle=function(a){void 0===a&&(a=""),Wolmart.$body.on("init",".woocommerce-tabs.accordion",(function(){var a=t(this);setTimeout((function(){var t="";t=Wolmart.hash.toLowerCase().indexOf("comment-")>=0||"#reviews"===Wolmart.hash||"#tab-reviews"===Wolmart.hash||location.href.indexOf("comment-page-")>0||location.href.indexOf("cpage=")>0?".reviews_tab a":"#tab-additional_information"===Wolmart.hash?".additional_information_tab a":".card:first-child > .card-header a",a.find(t).trigger("click")}),100)})),function(a){if(wolmart_vars.skeleton_screen&&t.fn.wc_product_gallery&&t(a+" .woocommerce-product-gallery").each((function(){var a=t(this);void 0===a.data("product_gallery")&&a.wc_product_gallery()})),t.fn.wc_variation_form&&"undefined"!=typeof wc_add_to_cart_variation_params&&Wolmart.$(a,".variations_form").each((function(){var a=t(this);if("load"!=Wolmart.status||a.closest(".summary").length){var e=jQuery._data(this,"events");e&&e.show_variation?Wolmart.requestTimeout((function(){a.trigger("check_variations")}),100):a.wc_variation_form()}})),wolmart_vars.skeleton_screen&&!Wolmart.$body.hasClass("wolmart-use-vendor-plugin"))t(".wc-tabs-wrapper, .woocommerce-tabs").trigger("init"),Wolmart.$(a,"#rating").trigger("init");else{t(".woocommerce-tabs.accordion").trigger("init");var e=Wolmart.$(".woocommerce-product-gallery .wp-post-image");e.length&&(e.attr("data-lazy")&&e.attr("data-o_src")&&e.attr("data-o_src").indexOf("lazy.png")>=0&&e.attr("data-o_src",e.attr("data-lazy")),e.attr("data-lazyset")&&e.attr("data-o_srcset")&&e.attr("data-o_srcset").indexOf("lazy.png")>=0&&e.attr("data-o_srcset",e.attr("data-lazyset")))}}(),Wolmart.createProductSingle(a+".product-single"),Wolmart.initProductGallery(),Wolmart.$window.on("wolmart_complete",(function(){Wolmart.$body.on("click",".single_add_to_cart_button",(function(a){var e=t(a.currentTarget);if(!e.hasClass("disabled")&&!e.hasClass("has_buy_now")){var o=e.closest(".product-single");if(o.length&&!o.hasClass("product-type-external")&&!o.hasClass("product-type-grouped")&&(o.hasClass("product-widget")||o.hasClass("product-quickview"))){a.preventDefault();var i=e.closest("form.cart");if(!i.hasClass("w-loading")){var r=i.find('input[name="variation_id"]').val(),s=r?i.find('input[name="product_id"]').val():e.val(),n=i.find('input[name="quantity"]').val(),l=i.find("select[data-attribute_name]"),c={product_id:r||s,quantity:n};l.each((function(){var a=t(this);c[a.attr("data-attribute_name")]=a.val()}));var d="";o.hasClass("product-widget")||o.hasClass("product-quickview")?(d=wolmart_vars.ajax_url,c.action="wolmart_ajax_add_to_cart"):d=wc_add_to_cart_params.wc_ajax_url.toString().replace("%%endpoint%%","add_to_cart"),Wolmart.doLoading(e,"small"),e.removeClass("added"),Wolmart.$body.trigger("adding_to_cart",[e,c]),t.ajax({type:"POST",url:d,data:c,dataType:"json",success:function(a){if(a)if(a.error&&a.product_url)location=a.product_url;else if("yes"!==wc_add_to_cart_params.cart_redirect_after_add){t(document.body).trigger("added_to_cart",[a.fragments,a.cart_hash,e]);var s=i.attr("action"),n=o.find(".wp-post-image").attr("src"),l=o.find(".product_title").text(),c=r?i.find(".woocommerce-variation-price .price").html():o.find(".price").html(),d=parseInt(i.find(".qty").val()),p=o.attr("id");if(c||(c=o.find(".price").html()),"cart-popup"==wolmart_vars.cart_popup_type)Wolmart.cartpopup.open('<div class="product product-list-sm" id="'+p+'">\t\t\t\t\t\t\t\t<figure class="product-media"><a href="'+s+'"><img src="'+n+'"></img></a></figure>\t\t\t\t\t\t\t\t<div class="product-details"><a class="product-title" href="'+s+'"><span class="cart-count">'+d+"</span> x "+l+"</a>"+wolmart_vars.texts.cart_suffix+'</div></div>\t\t\t\t\t\t\t\t<div class="minipopup-footer"><a href="'+wolmart_vars.pages.cart+'" class="btn btn-sm btn-rounded">'+wolmart_vars.texts.view_cart+'</a><a href="'+wolmart_vars.pages.checkout+'" class="btn btn-sm btn-dark btn-rounded">'+wolmart_vars.texts.view_checkout+"</a></div>",p);else{var m=t(".minipopup-area").find("#"+p);p==m.attr("id")?m.find(".cart-count").html(parseInt(m.find(".cart-count").html())+d):Wolmart.minipopup.open({content:'<div class="minipopup-box">\t\t\t\t\t\t\t\t\t\t<div class="product product-list-sm" id="'+p+'">\t\t\t\t\t\t\t\t\t\t\t<figure class="product-media"><a href="'+s+'"><img src="'+n+'"></img></a></figure>\t\t\t\t\t\t\t\t\t\t\t<div class="product-details"><a class="product-title" href="'+s+'"><span class="cart-count">'+d+"</span> x "+l+"</a>"+wolmart_vars.texts.cart_suffix+'</div></div>\t\t\t\t\t\t\t\t\t\t\t<div class="minipopup-footer"><a href="'+wolmart_vars.pages.cart+'" class="btn btn-sm btn-rounded">'+wolmart_vars.texts.view_cart+'</a><a href="'+wolmart_vars.pages.checkout+'" class="btn btn-sm btn-dark btn-rounded">'+wolmart_vars.texts.view_checkout+"</a></div></div>"})}}else location=wc_add_to_cart_params.cart_url},complete:function(){Wolmart.endLoading(e)}})}}}})),Wolmart.$body.on("click",".variations .product-variations button",(function(a){var e=t(a.currentTarget);e.hasClass("disabled")||(e.hasClass("active")?e.removeClass("active").parent().next().val("").change():(e.addClass("active").siblings().removeClass("active"),e.parent().next().val(e.attr("name")).change()))})).on("click",".reset_variations",(function(a){t(a.currentTarget).closest(".variations_form").find(".active").removeClass("active")})).on("check_variations",".variations_form",(function(){var a=t(Wolmart.byClass("reset_variations",this));"hidden"==a.css("visibility")?a.hide():a.show()})).on("found_variation",".variations_form",(function(a,e){var o=t(a.currentTarget).closest(".product"),i=o.find(".woocommerce-product-gallery").data("wolmart_product_gallery");i&&i.changePostImage(e);var r=o.find(".countdown-variations");if(r.length)if(e&&e.is_purchasable&&e.wolmart_date_on_sale_to){var s=r.find(".countdown");s.data("until")!=e.wolmart_date_on_sale_to&&(Wolmart.countdown(s,{until:new Date(e.wolmart_date_on_sale_to)}),s.data("until",e.wolmart_date_on_sale_to)),r.slideDown()}else r.slideUp()})).on("reset_image",".variations_form",(function(a){var e=t(a.currentTarget).closest(".product"),o=e.find(".woocommerce-product-gallery");if(o.length){var i=o.data("wolmart_product_gallery");i&&i.changePostImage("reset")}e.find(".countdown-variations").slideUp()})).on("update_variation_values",".variations_form",(function(){var a=t(this);a.find(".product-variations>button").addClass("disabled"),a.find("select").each((function(){var a=t(this),e=a.closest(".variations > *").find(".product-variations");a.children(".enabled").each((function(){e.children('[name="'+this.getAttribute("value")+'"]').removeClass("disabled")})),a.children(":selected").each((function(){e.children('[name="'+this.getAttribute("value")+'"]').addClass("active")}))}))})),Wolmart.$body.on("click",".guide-link",(function(){var a=t(this.getAttribute("href")+">a");a.length&&a.trigger("click")})),Wolmart.hash.toLowerCase().indexOf("tab-title-wolmart_pa_block_")&&t(Wolmart.hash+">a").trigger("click")}))},Wolmart.shop={init:function(){var a;this.removerId=0,Wolmart.$body.on("click",".product-variation-wrapper button",(function(a){var e=t(this),o=e.parent(),i=e.closest(".product-variation-wrapper"),r="attribute_"+String(o.data("attr")),s=i.data("product_variations"),n=i.data("product_attrs"),l=e.attr("name"),c=i.closest(".product-loop").find(".price"),d=i.data("price");if(e.hasClass("disabled"))return;var p=s;null==n&&(n=[],i.find(".product-variations").each((function(){n.push("attribute_"+String(t(this).data("attr")))})),i.data("product_attrs",n)),null==d&&(d=c.html(),i.data("price",d)),l==i.data(r)?i.removeData(r):i.data(r,l);let m=[];s.forEach((function(t,a){var e=!0;n.forEach((function(a){null!=i.data(a)&&i.data(a)!=t.attributes[a]&&""!=t.attributes[a]&&(e=!1)})),e&&m.push(t)})),p=m;var u=!0;n.forEach((function(a){if(r!=a||a==r&&null==i.data(r)){let e=i.find("."+a.slice(10)+" > *:not(.guide-link)");e.each((function(){var a=t(this);a.hasClass("select-box")?a.find("option").css("display","none"):a.addClass("disabled")})),s.forEach((function(o){let r=!0;n.forEach((function(t){null!=i.data(t)&&a!=t&&o.attributes[t]!=i.data(t)&&""!=o.attributes[t]&&(r=!1)})),1==r&&(""==o.attributes[a]?(e.removeClass("disabled"),e.each((function(){var a=t(this);a.hasClass("select-box")?a.find("option").css("display",""):a.removeClass("disabled")}))):e.each((function(){var e=t(this);e.hasClass("select-box")?e.find("option").each((function(){var e=t(this);e.attr("value")!=o.attributes[a]&&""!=e.attr("value")||e.css("display","")})):e.attr("name")==o.attributes[a]&&e.removeClass("disabled")})))}))}null==i.data(a)&&(u=!1)})),1==u&&1==p.length&&p[0].availability_html&&p[0].availability_html.indexOf("out-of-stock")<0?(c.closest(".product-loop").data("variation",p[0].variation_id),c.html(t(p[0].price_html).html()),c.closest(".product-loop").find(".add_to_cart_button").removeClass("product_type_variable").addClass("product_type_simple")):(c.html(d),c.closest(".product-loop").removeData("variation").find(".add_to_cart_button").removeClass("product_type_simple").addClass("product_type_variable"))})).on("change",".product-variation-wrapper select",(function(a){var e=t(this),o=(e.parent(),e.closest(".product-variation-wrapper")),i=e.data("attribute_name"),r=o.data("product_variations"),s=o.data("product_attrs"),n=e.val(),l=o.closest(".product-loop").find(".price"),c=o.data("price"),d=r;if(null==s&&(s=[],o.find(".product-variations").each((function(){s.push("attribute_"+String(t(this).data("attr")))})),o.data("product_attrs",s)),null==c&&(c=l.html(),o.data("price",c)),""==n){o.removeData(i);let t=[];r.forEach((function(a,e){var i=!0;s.forEach((function(t){null!=o.data(t)&&o.data(t)!=a.attributes[t]&&""!=a.attributes[t]&&(i=!1)})),i&&t.push(a)})),d=t}else{o.data(i,n);let t=[];r.forEach((function(a,e){var i=!0;s.forEach((function(t){null!=o.data(t)&&o.data(t)!=a.attributes[t]&&""!=a.attributes[t]&&(i=!1)})),i&&t.push(a)})),d=t}var p=!0;s.forEach((function(a){if(i!=a||a==i&&null==o.data(i)){let e=o.find("."+a.slice(10)+" > *");e.each((function(){var a=t(this);a.hasClass("select-box")?a.find("option").css("display","none"):a.addClass("disabled")})),r.forEach((function(i){let r=!0;s.forEach((function(t){null!=o.data(t)&&a!=t&&i.attributes[t]!=o.data(t)&&""!=i.attributes[t]&&(r=!1)})),1==r&&(""==i.attributes[a]?(e.removeClass("disabled"),e.each((function(){var a=t(this);a.hasClass("select-box")?a.find("option").css("display",""):a.removeClass("disabled")}))):e.each((function(){var e=t(this);e.hasClass("select-box")?e.find("option").each((function(){var e=t(this);e.attr("value")!=i.attributes[a]&&""!=e.attr("value")||e.css("display","")})):e.attr("name")==i.attributes[a]&&e.removeClass("disabled")})))}))}null==o.data(a)&&(p=!1)})),1==p&&1==d.length&&(!d[0].availability_html||d[0].availability_html&&d[0].availability_html.indexOf("out-of-stock")<0)?(l.closest(".product-loop").data("variation",d[0].variation_id),l.html(t(d[0].price_html).html()),l.closest(".product-loop").find(".add_to_cart_button").removeClass("product_type_variable").addClass("product_type_simple")):(l.html(c),l.closest(".product-loop").removeData("variation").find(".add_to_cart_button").removeClass("product_type_simple").addClass("product_type_variable"))})).on("click",".product-loop.product-type-variable .add_to_cart_button",(function(a){var e=t(this),o=e.closest(".product").find(".product-variation-wrapper"),i=o.data("product_attrs"),r=e.closest(".product-loop");if(null!=r.data("variation")){let s={action:"wolmart_add_to_cart",product_id:r.data("variation"),quantity:1};i.forEach((function(t){s[t]=o.data(t)})),t.ajax({type:"POST",dataType:"json",url:wolmart_vars.ajax_url,data:s,success:function(a){t(document.body).trigger("added_to_cart",[a.fragments,a.cart_hash,e])}}),a.preventDefault()}})),Wolmart.$body.on("click",".btn-quickview",(function(a){a.preventDefault();var e=t(this),o={action:"wolmart_quickview",product_id:e.data("product")},i=wolmart_vars.quickview_type||"loading";function r(){Wolmart.createProductSingle(".mfp-product .product-single"),e.closest(".shop_table").length&&Wolmart.endLoading(e)}function s(t){Wolmart.popup({type:"ajax",mainClass:"mfp-product mfp-fade"+("offcanvas"==t?" mfp-offcanvas":""),items:{src:wolmart_vars.ajax_url},ajax:{settings:{method:"POST",data:o},cursor:"mfp-ajax-cur",tError:'<div class="alert alert-warning alert-round alert-inline">'+wolmart_vars.texts.popup_error+'<button type="button" class="btn btn-link btn-close"><i class="close-icon"></i></button></div>'},preloader:!1,callbacks:{afterChange:function(){var a;if(wolmart_vars.skeleton_screen){var e="horizontal"==wolmart_vars.quickview_thumbs?"":" pg-vertical";a="offcanvas"==t?'<div class="product skeleton-body'+e+'"><div class="skel-pro-gallery"></div><div class="skel-pro-summary" style="margin-top: 20px"></div></div>':'<div class="product skeleton-body row"><div class="col-md-6'+e+'"><div class="skel-pro-gallery"></div></div><div class="col-md-6"><div class="skel-pro-summary"></div></div></div>'}else a='<div class="product product-single"><div class="w-loading"><i></i></div></div>';this.container.html('<div class="mfp-content"></div><div class="mfp-preloader">'+a+"</div>"),this.contentContainer=this.container.children(".mfp-content"),this.preloader=!1},beforeClose:function(){this.container.empty()},ajaxContentAdded:function(){var t=this;this.wrap.imagesLoaded((function(){r()})),this.wrap.find(".mfp-close").appendTo(this.content),setTimeout((function(){t.contentContainer.next(".mfp-preloader").remove()}),300)}}})}if("zoom"==i&&window.innerWidth<768&&(i="loading"),e.closest(".shop_table").length&&Wolmart.doLoading(e,"small"),wolmart_vars.skeleton_screen&&"zoom"!=i)s(i);else if("zoom"==i){var n,l="";function d(){var a=t.magnificPopup.instance;if(a.isOpen&&a.content&&a.wrap.hasClass("zoom-start2")&&!a.wrap.hasClass("zoom-finish")&&l)var e=1,o=Wolmart.requestInterval((function(){if(a.wrap.addClass("zoom-start3"),a.content){var i=t(l),s=i.find(".woocommerce-product-gallery"),n=i.find(".summary"),c=a.content.find(".product-single");c.children(".col-md-6:first-child").html(s),c.find(".col-md-6 > .summary").remove(),c.attr("id",i.attr("id")),c.attr("class",i.attr("class")),a.content.css("clip-path",e<30?"inset(0 calc("+50*(31-e)/30+"% - 20px) 0 0)":"none"),e>=30&&(Wolmart.deleteTimeout(o),a.wrap.addClass("zoom-finish"),c.children(".col-md-6:last-child").append(n),t(".mfp-animated-image").remove(),Wolmart.requestTimeout((function(){a.wrap.addClass("zoom-loaded mfp-anim-finish"),Wolmart.endLoading(c.children(".col-md-6:last-child")),r()}),50)),++e}else Wolmart.deleteTimeout(o)}),16)}if(!(n=e.parent(".hotspot-product").length?e.parent().find(".product-media img"):e.closest(".shop_table").length?e.closest("tr").find(".product-thumbnail img"):e.closest(".product").find(".product-media img:first-child")).length)return void s("loading");var c=n.attr("src");t('<img src="'+c+'">').imagesLoaded((function(){e.data("magnificPoup")||e.attr("data-mfp-src",c).magnificPopup({type:"image",mainClass:"mfp-product mfp-zoom mfp-anim",preloader:!1,item:{src:n},closeOnBgClick:!1,zoom:{enabled:!0,duration:550,easing:"cubic-bezier(.55,0,.1,1)",opener:function(){return n}},callbacks:{beforeOpen:Wolmart.defaults.popup.callbacks.beforeOpen,open:function(){"horizontal"!=wolmart_vars.quickview_thumbs&&window.innerWidth>=992&&this.content.addClass("vertical"),this.content.find("figcaption").remove(),this.items[0]&&this.items[0].img.wrap('<div class="product-single product-quickview product row product-quickview-loading"><div class="col-md-6"></div><div class="col-md-6"></div></div>').after('<div class="thumbs"><img src="'+this.items[0].img.attr("src")+'" /><img src="'+this.items[0].img.attr("src")+'" /><img src="'+this.items[0].img.attr("src")+'" /><img src="'+this.items[0].img.attr("src")+'" /></div>');var t=this;setTimeout((function(){t.bgOverlay.removeClass("mfp-ready")}),16),setTimeout((function(){t.wrap.addClass("zoom-start"),Wolmart.requestFrame((function(){var a=t.content.find(".thumbs>img:first-child"),e=a.width(),o=a.height(),i=0;t.bgOverlay.addClass("mfp-ready");var r=Wolmart.requestInterval((function(){t.content?(t.content.css("clip-path","horizontal"!=wolmart_vars.quickview_thumbs&&window.innerWidth>=992?"inset("+(30-i)+"px calc(50% + "+(10-i)+"px) "+(30-i)+"px "+(30-i)*(30+e)/30+"px)":"inset("+(30-i)+"px calc(50% + "+(10-i)+"px) "+(30-i)*(30+o)/30+"px "+(30-i)+"px)"),i>=30?(Wolmart.deleteTimeout(r),t.wrap.addClass("zoom-start2"),l||Wolmart.doLoading(t.content.find(".product > .col-md-6:first-child")),d()):i+=3):Wolmart.deleteTimeout(r)}),16)}))}),560)},beforeClose:function(){e.removeData("magnificPopup").removeAttr("data-mfp-src"),e.off("click.magnificPopup"),t(".mfp-animated-image").remove()},close:Wolmart.defaults.popup.callbacks.close}}),e.magnificPopup("open")})),t.post(wolmart_vars.ajax_url,o).done((function(a){t(a).imagesLoaded((function(){l=a,d()}))}))}else Wolmart.doLoading(e.closest(".product").find(".product-media")),t.post(wolmart_vars.ajax_url,o).done((function(a){t(a).imagesLoaded((function(){Wolmart.popup({type:"inline",mainClass:"mfp-product mfp-fade "+("offcanvas"==i?"mfp-offcanvas":"mfp-anim"),items:{src:a},callbacks:{open:function(){var t=this;function a(){t.wrap.addClass("mfp-anim-finish")}"offcanvas"==i?setTimeout(a,316):Wolmart.requestFrame(a),r()}}}),Wolmart.endLoading(e.closest(".product").find(".product-media"))}))}))})),Wolmart.$body.on("click",".add_to_cart_button:not(.product_type_variable)",(function(a){t(".minicart-icon").addClass("adding"),Wolmart.doLoading(a.currentTarget,"small")})).on("click",".cart-offcanvas .cart-toggle",(function(a){t(this).parent().toggleClass("opened"),a.preventDefault()})).on("click",".cart-offcanvas .btn-close",(function(a){t(this).closest(".cart-offcanvas").removeClass("opened")})).on("click",".cart-offcanvas .cart-overlay",(function(a){t(this).parent().removeClass("opened")})).on("added_to_cart",(function(a,e,o,i){var r=i.closest(".product");if(i.next(".added_to_cart").remove(),!r.hasClass("product-single")){var s=r.find(".product-media .woocommerce-loop-product__link").attr("href"),n=r.find(".product-media img:first-child").attr("src"),l=r.find(".woocommerce-loop-product__title a").text(),c=r.find(".price").html(),d=r.attr("data-product-id");if("cart-popup"==wolmart_vars.cart_popup_type)Wolmart.cartpopup.open('<div class="product product-list-sm" data-product-id='+d+' id="product-'+d+'">\t\t\t\t\t\t\t\t<figure class="product-media"><a href="'+s+'"><img src="'+n+'"></img></a></figure>\t\t\t\t\t\t\t\t<div class="product-details"><a class="product-title" href="'+s+'">'+l+'</a><span class="product-price">'+c+'</span></div></div>\t\t\t\t\t\t\t\t<div class="cart-popup-footer"><a href="'+wolmart_vars.pages.cart+'" class="btn btn-sm btn-rounded">'+wolmart_vars.texts.view_cart+'</a><a href="'+wolmart_vars.pages.checkout+'" class="btn btn-sm btn-dark btn-rounded">'+wolmart_vars.texts.view_checkout+"</a></div>",d);else{var p=t(".minipopup-area").find("#product-"+d);d==p.attr("data-product-id")?p.find(".cart-count").html(parseInt(p.find(".cart-count").html())+1):Wolmart.minipopup.open({content:'<div class="minipopup-box">\t\t\t\t\t\t\t\t\t\t<div class="product product-list-sm" data-product-id='+d+' id="product-'+d+'">\t\t\t\t\t\t\t\t\t\t\t<figure class="product-media"><a href="'+s+'"><img src="'+n+'"></img></a></figure>\t\t\t\t\t\t\t\t\t\t\t<div class="product-details"><a class="product-title" href="'+s+'"><span class="cart-count">1</span> x '+l+"</a>"+wolmart_vars.texts.cart_suffix+'</div></div>\t\t\t\t\t\t\t\t\t\t\t<div class="minipopup-footer"><a href="'+wolmart_vars.pages.cart+'" class="btn btn-sm btn-rounded">'+wolmart_vars.texts.view_cart+'</a><a href="'+wolmart_vars.pages.checkout+'" class="btn btn-sm btn-dark btn-rounded">'+wolmart_vars.texts.view_checkout+"</a></div></div>"})}}t(".minicart-icon").removeClass("adding")})).on("added_to_cart ajax_request_not_sent.adding_to_cart",(function(t,a,e,o){void 0!==o&&Wolmart.endLoading(o)})).on("wc_fragments_refreshed",(function(a,e){Wolmart.quantityInput(".shop_table .qty"),setTimeout((function(){t(".sticky-sidebar").trigger("recalc.pin")}),400)})).off("click",".widget_shopping_cart .remove").on("click",".widget_shopping_cart .remove",(function(a){a.preventDefault();var e=t(this).data("cart_item_key");return t.ajax({type:"POST",dataType:"json",url:wolmart_vars.ajax_url,data:{action:"wolmart_cart_item_remove",nonce:wolmart_vars.nonce,cart_id:e},success:function(a){var e=location.toString(),o=t(a.fragments["div.widget_shopping_cart_content"]).find(".mini_cart_item").length;e=e.replace("add-to-cart","added-to-cart"),t(document.body).trigger("wc_fragment_refresh"),0==o&&(t("body").hasClass("woocommerce-cart")||t("body").hasClass("woocommerce-checkout"))?t(".page-content").block():t(".shop_table.cart, .shop_table.review-order, .updating, .cart_totals").block(),t(".widget_shopping_cart, .updating").stop(!0).unblock(),0==o&&(t("body").hasClass("woocommerce-cart")||t("body").hasClass("woocommerce-checkout"))?t(".page-content").load(e+" .page-content:eq(0) > *",(function(){t(".page-content").unblock()})):(t(".shop_table.cart").load(e+" .shop_table.cart:eq(0) > *",(function(){t(".shop_table.cart").unblock(),Wolmart.quantityInput(".shop_table .qty")})),t(".cart_totals").load(e+" .cart_totals:eq(0) > *",(function(){t(".cart_totals").unblock()})),t(".shop_table.review-order").load(e+" .shop_table.review-order:eq(0) > *",(function(){t(".shop_table.review-order").unblock()})))}}),!1})).on("click",".remove_from_cart_button",(function(a){var e=t(this).data("product_id");Wolmart.$body.trigger("update_sticky_cart",[e]),Wolmart.doLoading(t(this).closest(".mini_cart_item"),"small")})),function(){function a(){var a=t(".mini-basket-dropdown .widget_wishlist_content");a.length&&(a.find(".w-loading").length||Wolmart.doLoading(a,"small"),t.ajax({url:wolmart_vars.ajax_url,data:{action:"wolmart_update_mini_wishlist"},type:"post",success:function(e){a.closest(".mini-basket-dropdown").find(".wish-count").length&&a.closest(".mini-basket-dropdown").find(".wish-count").text(t(e).find(".wish-count").text()),a.html(t(e).find(".widget_wishlist_content").html())}}))}Wolmart.$body.on("click",".add_to_wishlist",(function(a){Wolmart.doLoading(t(a.currentTarget).closest(".yith-wcwl-add-to-wishlist"),"small")})).on("added_to_wishlist",(function(){t(".wish-count").each((function(){t(this).html(parseInt(t(this).html())+1)})),a()})).on("removed_from_wishlist",(function(){t(".wish-count").each((function(){t(this).html(parseInt(t(this).html())-1)})),a()})).on("added_to_cart",(function(e,o,i,r){r.closest("#yith-wcwl-form").length&&t(".wish-count").each((function(){t(this).html(parseInt(t(this).html())-1)})),a()})).on("click",".wishlist-dropdown .wishlist-item .remove_from_wishlist",(function(a){a.preventDefault();var e=t(this).attr("data-product_id"),o=t(".yith-wcwl-add-to-wishlist.add-to-wishlist-"+e),i=t(".wishlist_table #yith-wcwl-row-"+e+" .remove_from_wishlist");Wolmart.doLoading(t(this).closest(".wishlist-item"),"small"),o.length?o.find("a").trigger("click"):i.length?i.trigger("click"):t.ajax({url:yith_wcwl_l10n.ajax_url,data:{action:yith_wcwl_l10n.actions.remove_from_wishlist_action,remove_from_wishlist:e,from:"theme"},method:"post",success:function(t){Wolmart.$body.trigger("removed_from_wishlist")}})})).on("click",".wishlist-offcanvas > .wishlist",(function(a){t(this).closest(".wishlist-dropdown").toggleClass("opened"),a.preventDefault()})).on("click",".wishlist-offcanvas .btn-close",(function(a){a.preventDefault(),t(this).closest(".wishlist-dropdown").removeClass("opened")})).on("click",".wishlist-offcanvas .wishlist-overlay",(function(a){t(this).closest(".wishlist-dropdown").removeClass("opened")}))}(),function(){if(t("html").hasClass("touchable")&&wolmart_vars.prod_open_click_mob){var a=!1;Wolmart.$body.on("click",".product-wrap .product",(function(e){a&&!t(this).hasClass("hover-active")&&(e.preventDefault(),t(".hover-active").removeClass("hover-active"),t(this).addClass("hover-active"))})),t(document).on("click",e),document.addEventListener("touchstart",e,{passive:!0})}function e(e){a="touchstart"==e.type,t(e.target).closest(".hover-active").length||t(".hover-active").removeClass("hover-active")}}(),t(".toolbox-horizontal .shop-sidebar .widget .chosen").each((function(a){t(this).find("a").attr("href")!=window.location.href&&(t('<a href="#" class="select-item">'+t(this).find("a").text()+'<i class="w-icon-times-solid"></i></a>').insertBefore(".toolbox-horizontal + .select-items .filter-clean").attr("data-type",t(this).closest(".widget").attr("id").split("-").slice(0,-1).join("-")).data("link_id",t(this).closest(".widget").attr("id")).data("link_idx",t(this).index()),t(".toolbox-horizontal + .select-items").fadeIn())})),Wolmart.$body.on("click",".toolbox-horizontal .shop-sidebar .widget-title, .wolmart-filters .select-ul-toggle",(function(a){t(this).parent().siblings().removeClass("opened"),t(this).parent().toggleClass("opened"),a.stopPropagation()})).on("click",".toolbox-horizontal .shop-sidebar .widget-title + *",(function(t){t.stopPropagation()})).on("click",(function(a){t(".toolbox-horizontal .shop-sidebar .widget, .wolmart-filters .select-ul").removeClass("opened")})).on("click",".toolbox-horizontal .shop-sidebar .widget a",(function(a){var e=t(this);if(!e.closest(".widget").hasClass("yith-woo-ajax-reset-navigation"))if(e.closest(".product-categories").length&&t(".toolbox-horizontal + .select-items .select-item").remove(),e.parent().hasClass("chosen"))t(".toolbox-horizontal + .select-items .select-item").filter((function(a,o){return t(o).data("link_id")==e.closest(".widget").attr("id")&&t(o).data("link_idx")==e.closest("li").index()})).fadeOut((function(){t(this).remove(),t(".select-items").children().length<2&&t(".select-items").hide()}));else{var o=e.closest(".widget").attr("id").split("-").slice(0,-1).join("-");"wolmart-price-filter"==o&&(t(".toolbox-horizontal + .select-items").find('[data-type="wolmart-price-filter"]').remove(),e.closest("li").addClass("chosen").siblings().removeClass("chosen")),t('<a href="#" class="select-item">'+e.text()+'<i class="w-icon-times-solid"></i></a>').insertBefore(".toolbox-horizontal + .select-items .filter-clean").hide().fadeIn().attr("data-type",o).data("link_id",e.closest(".widget").attr("id")).data("link_idx",e.closest("li").index()),t(".select-items").children().length>=2&&t(".select-items").show()}})).on("click",".toolbox-horizontal + .select-items .select-item",(function(a){a.preventDefault();var e=t(this),o=e.data("link_id");if(o){var i=t(".toolbox-horizontal .shop-sidebar #"+o).find("li").eq(e.data("link_idx")).children("a");i.length&&(i.closest(".product-categories").length?e.siblings(".filter-clean").trigger("click"):i.trigger("click"))}})).on("click",".toolbox-horizontal + .select-items .filter-clean",(function(a){a.preventDefault(),t(this).parent(".select-items").fadeOut((function(){t(this).children(".select-item").remove()}))})).on("click",".wolmart-filters .select-ul a",(function(a){a.preventDefault(),a.stopPropagation(),"or"==t(this).closest(".wolmart-filter").attr("data-filter-query")?t(this).closest("li").toggleClass("chosen"):t(this).closest("li").toggleClass("chosen").siblings().removeClass("chosen");var e=t(this).closest(".wolmart-filters").find(".btn-filter"),o=e.attr("href"),i=t(this).closest(".wolmart-filters");(o=o.split("/"))[o.length-1]="",i.length&&i.find(".wolmart-filter").each((function(a){var e=t(this).find(".chosen");if(e.length){var r=[],s=t(this).attr("data-filter-attr");e.each((function(){r.push(t(this).attr("data-value"))})),o[o.length-1]+="filter_"+s+"="+r.join(",")+"&query_type_"+s+"="+t(this).attr("data-filter-query")+(a!=i.length?"&":"")}})),o[o.length-1]="?"+o[o.length-1],e.attr("href",o.join("/"))})),Wolmart.$body.on("click",".shipping-calculator-button",(function(a){var e=a.currentTarget;setTimeout((function(){t(e).closest(".sticky-sidebar").trigger("recalc.pin")}),400)})),wolmart_vars.cart_auto_update&&(Wolmart.$body.on("click",".shop_table .quantity-minus, .shop_table .quantity-plus",(function(){t('.shop_table button[name="update_cart"]').trigger("click")})),Wolmart.$body.on("keyup",".shop_table .quantity .qty",(function(){t('.shop_table button[name="update_cart"]').trigger("click")}))),Wolmart.$body.on("mouseover",".wolmart-hover-multi-image-item",(function(a){var e=t(this),o=e.closest(".product-loop").find(".product-media > a > img"),i=e.closest(".product-loop").find(".wolmart-multi-image-dot"),r=e.data("image-url");if(i.eq(e.data("number")-1).addClass("active").siblings().removeClass("active"),r){var s=document.createElement("img");s.src=r,s.onload=function(){o.attr("src",r)}}})),Wolmart.$body.on("mouseleave",".wolmart-hover-multi-image-wrapper",(function(a){var e=t(this),o=e.closest(".product-loop").find(".product-media > a > img"),i=e.closest(".product-loop").find(".wolmart-multi-image-dot"),r=e.find(".wolmart-hover-multi-image-item").eq(0).data("image-url");i.eq(0).addClass("active").siblings().removeClass("active"),o.attr("src",r)})),a=function(a,e){t(a).each((function(){var a=t(this);0==e?(a.find(".product-sticky-cart-control").removeClass("show").siblings(".btn-product").removeClass("hide"),a.find(".product-sticky-cart-qty").html(e+1)):(a.find(".product-sticky-cart-control").addClass("show").siblings(".btn-product").addClass("hide"),a.find(".product-sticky-cart-control:not(.main-product)").addClass("qty-only"),a.find(".product-sticky-cart-control").removeClass("main-product"),a.find(".product-sticky-cart-qty").html(e))}))},Wolmart.$body.on("added_to_cart",(function(e,o,i,r){var s=r.closest(".product-loop"),n=s.find(".add_to_cart_button").data("product_id");s.hasClass("product-sticky-cart")&&(s.find(".product-sticky-cart-control").addClass("show").siblings(".btn-product").addClass("hide"),t.ajax({type:"GET",dataType:"json",url:wolmart_vars.ajax_url,data:{action:"wolmart_cart_item_count",product_id:n},success:function(t){s.find(".product-sticky-cart-control").addClass("main-product"),a(".product-loop.product-sticky-cart.post-"+n,t)}}),s.find(".product-add-cart").removeClass("loading").find(".w-loading").remove())})),Wolmart.$body.on("focusout",".product-sticky-cart.product-loop",(function(a){var e=t(this);t(a.originalEvent.relatedTarget).addClass("focused"),0==e.find(".focused").length?e.find(".product-sticky-cart-control").addClass("qty-only"):t(a.originalEvent.relatedTarget).removeClass("focused")})),Wolmart.$body.on("click",".product-sticky-cart-control",(function(a){t(this).closest(".product-loop").find(".product-sticky-cart-control").removeClass("qty-only")})),Wolmart.$body.on("click",".product-add-cart",(function(a){var e=t(this),o=t(this).closest(".product-loop");e.append('<div class="w-loading"><i></i></div>').addClass("loading"),o.find(".product_type_simple.add_to_cart_button").trigger("click"),o.trigger("focus")})),Wolmart.$body.on("click",".product-remove-cart",(function(e){var o=t(this),i=o.closest(".product-loop"),r=i.find(".add_to_cart_button").data("product_id");o.append('<div class="w-loading"><i></i></div>').addClass("loading"),t.ajax({type:"GET",dataType:"json",url:wolmart_vars.ajax_url,data:{action:"wolmart_remove_cart_item",product_id:r},success:function(t){o.removeClass("loading").find(".w-loading").remove(),i.find(".product-sticky-cart-control").addClass("main-product"),a(".product-loop.product-sticky-cart.post-"+r,t),Wolmart.$body.trigger("wc_fragment_refresh")}})})),Wolmart.$body.on("update_sticky_cart",(function(t,e){a(".product-loop.product-sticky-cart.post-"+e,0)})),this.initAlertAction(),Wolmart.call(this.initProducts.bind(this),500)},initProducts:function(a){this.ratingTooltip(a),this.initProductType(a),Wolmart.countdown(t(a).find(".product-countdown")),Wolmart.initSlider(t(a).find(".product-hover-slider"))},ratingTooltip:function(t){var a=function(){var t=this.firstElementChild.getBoundingClientRect().width/this.getBoundingClientRect().width*5;this.lastElementChild.innerText=t?t.toFixed(2):t};Wolmart.$(t,".star-rating").each((function(){if(this.lastElementChild&&!this.lastElementChild.classList.contains("tooltiptext")){var t=document.createElement("span");t.classList.add("tooltiptext"),t.classList.add("tooltip-top"),this.appendChild(t),this.addEventListener("mouseover",a),this.addEventListener("touchstart",a,{passive:!0})}}))},initProductType:function(a){Wolmart.$(a,".product-popup .product-details").each((function(a){var e=t(this),o=e.find(".product-hide-details").outerHeight(!0);e.height(e.height()-o)})),Wolmart.$(a,".product-popup").on("mouseenter touchstart",(function(a){var e=t(this),o=e.find(".product-hide-details").outerHeight(!0);e.find(".product-details").css("transform","translateY("+(e.hasClass("product-boxed")?11-o:-o)+"px)"),e.find(".product-hide-details").css("transform","translateY("+-o+"px)")})).on("mouseleave touchleave",(function(a){var e=t(this);e.find(".product-details").css("transform","translateY(0)"),e.find(".product-hide-details").css("transform","translateY(0)")}))},initAlertAction:function(){this.removerId&&clearTimeout(this.removerId),this.removerId=setTimeout((function(){t(".woocommerce-page .main-content .alert:not(.woocommerce-info) .btn-close").not(":hidden").trigger("click")}),1e4)}},Wolmart.initAccount=function(){Wolmart.$body.on("click",".header .account > a:not(.logout)",(function(t){if(!this.classList.contains("logout")){t.preventDefault();var a=this.classList.contains("register");Wolmart.popup({callbacks:{afterChange:function(){this.container.html('<div class="mfp-content"></div><div class="mfp-preloader"><div class="login-popup"><div class="w-loading"><i></i></div></div></div>'),this.contentContainer=this.container.children(".mfp-content"),this.preloader=!1},beforeClose:function(){this.container.empty()},ajaxContentAdded:function(){var t=this;a&&this.wrap.find('[href="signup"]').trigger("click"),setTimeout((function(){t.contentContainer.next(".mfp-preloader").remove()}),200),"function"==typeof c4wp_loadrecaptcha&&c4wp_loadrecaptcha()}}},"login")}})).on("submit","#customer_login form",(function(a){var e=t(this),o=e[0].classList.contains("login");e.find("p.submit-status").show().text("Please wait...").addClass("loading"),e.find("button[type=submit]").attr("disabled","disabled"),t.ajax({type:"POST",dataType:"json",url:wolmart_vars.ajax_url,data:e.serialize()+"&action=wolmart_account_"+(o?"signin":"signup")+"_validate",success:function(t){e.find("p.submit-status").html(t.message.replace("/<script.*?/script>/s","")).removeClass("loading"),e.find("button[type=submit]").removeAttr("disabled"),!0===t.loggedin&&location.reload()}}),a.preventDefault()}))},Wolmart.slider=function(){function a(t,a){return this.init(t,a)}function e(){var a=t(this.slider.wrapperEl),e=this.slider;a.trigger("initialized.slider",e),a.find(".slider-slide:not(.slider-slide-active) .appear-animate").removeClass("appear-animate"),a.find("video").removeAttr("style").on("ended",(function(){if(t(this).closest(".slider-slide").hasClass("slider-slide-active"))if(!0===e.params.autoplay.enabled){if(e.params.loop&&e.slides.length===e.activeIndex){this.loop=!0;try{this.play()}catch(t){}}e.slideNext(),e.autoplay.start()}else{this.loop=!0;try{this.play()}catch(t){}}})),r.call(this)}function o(){t(window).trigger("appear.check");var a=t(this.slider.wrapperEl),e=this.slider,o=a.find(".slider-slide-active video");(a.find(".slider-slide:not(.slider-slide-active) video").each((function(){this.paused||e.autoplay.start(),this.pause(),this.currentTime=0})),o.length)&&((e=a.data("slider"))&&e.params&&e.params.autoplay.enabled&&e.autoplay.stop(),o.each((function(){try{this.paused&&this.play()}catch(t){}})));r.call(this)}function i(){var a=this;t(this.slider.wrapperEl).find(".slider-slide-active .slide-animate").each((function(){var e,o=t(this),i=o.data("settings"),r=i._animation_delay?i._animation_delay:0,s=i._animation_name;e=o.hasClass("animated-slow")?2e3:o.hasClass("animated-fast")?750:1e3,o.css("animation-duration",e+"ms"),e=e||750;var n=Wolmart.requestTimeout((function(){o.addClass(s),o.addClass("show-content"),a.timers.splice(a.timers.indexOf(n),1)}),r||0)}))}function r(){t.fn.lazyload&&t(this.slider.wrapperEl).find("[data-lazy]").filter((function(){return!t(this).data("_lazyload_init")})).data("_lazyload_init",1).each((function(){t(this).lazyload(Wolmart.defaults.lazyload)}))}function s(){t(this.slider.wrapperEl).find(".slider-slide-active .slide-animate").each((function(){t(this).addClass("show-content").css({"animation-name":"","animation-duration":"","animation-delay":""})}))}function n(){var a=this,e=t(this.slider.wrapperEl);a.translateFlag=1,a.prev=a.next,e.find(".slider-slide .slide-animate").each((function(){var a=t(this),e=a.data("settings");e&&a.removeClass(e._animation_name+" animated appear-animation-visible elementor-invisible appear-animate")}))}function l(){var a=this,e=t(this.slider.wrapperEl);if(1==a.translateFlag){if(e.find(".show-content").removeClass("show-content"),a.next=this.slider.activeIndex,a.prev!=a.next){if(e.find(".show-content").removeClass("show-content"),e.hasClass("animation-slider")){for(var o=0;o<a.timers.length;o++)Wolmart.deleteTimeout(a.timers[o]);a.timers=[]}t(this.slider.slides[this.slider.activeIndex]).find(".slide-animate").each((function(){var e,o=t(this),i=o.data("settings"),r=i._animation_delay?i._animation_delay:0,s=i._animation_name;if(e=o.hasClass("animated-slow")?2e3:o.hasClass("animated-fast")?750:1e3,o.css({"animation-duration":e+"ms","animation-delay":r+"ms","transition-property":"visibility, opacity","transition-duration":e+"ms","transition-delay":r+"ms"}).addClass(s),o.hasClass("maskLeft")){o.css("width","fit-content");var n=o.width();o.css("width",0).css("transition","width "+(e||750)+"ms linear "+(r||"0s")).css("width",n)}e=e||750,o.addClass("show-content");var l=Wolmart.requestTimeout((function(){o.css("transition-property",""),o.css("transition-delay",""),o.css("transition-duration",""),a.timers.splice(a.timers.indexOf(l),1)}),r?r+200:200);a.timers.push(l)}))}else e.find(".slider-slide").eq(this.slider.activeIndex).find(".slide-animate").addClass("show-content");a.translateFlag=0}}return a.presets={"product-single-carousel":{pagination:!1,navigation:!0,autoHeight:!0,zoom:!1,thumbs:{slideThumbActiveClass:"active"}},"product-gallery-carousel":{spaceBetween:20,slidesPerView:t(".main-content-wrap > .sidebar-fixed").length?2:3,navigation:!0,pagination:!1,breakpoints:{767:{slidesPerView:2}}},"product-thumbs":{slidesPerView:4,navigation:!0,pagination:!1,spaceBetween:10,normalizeSlideIndex:!1,freeMode:!0,watchSlidesVisibility:!0,watchSlidesProgress:!0},"products-flipbook":{onInitialized:function(){function a(a){t(a.target).closest(".product-single-carousel, .product-gallery-carousel, .product-thumbs").length&&a.stopPropagation()}this.wrapperEl.addEventListener("mousedown",a),"ontouchstart"in document&&this.wrapperEl.addEventListener("touchstart",a,{passive:!0})}},"product-hover-slider":{slidesPerView:1,navigation:!0,pagination:!1,spaceBetween:0,loop:!0}},a.prototype.init=function(c,d){this.timers=[],this.translateFlag=0;var p=t.extend(!0,{},Wolmart.defaults.slider);c.attr("class").split(" ").forEach((function(e){a.presets[e]&&t.extend(!0,p,a.presets[e])})),t.extend(!0,p,Wolmart.parseOptions(c.attr("data-slider-options")),d),c.find("video").each((function(){this.loop=!1}));var m=c.children(),u=m.length;u&&(m.filter(".row").length?(m.wrap('<div class="slider-slide"></div>'),m=c.children()):m.addClass("slider-slide"));var h=c.attr("class"),f=/gutter\-\w\w|cols\-\d|cols\-\w\w-\d/g,g=h.match(f)||"";g&&(g.push("row"),c.data("slider-layout",g),c.attr("class",h.replace(f,"").replace(/\s+/," ")).removeClass("row"));var v=[];if(p.breakpoints){var w=["d-none","d-sm-none","d-md-none","d-lg-none","d-xl-none"],_=["d-block","d-sm-block","d-md-block","d-lg-block","d-xl-block"],b=0;for(var y in p.breakpoints)u<=p.breakpoints[y].slidesPerView?v.push(w[b]):v.length&&v.push(_[b]),++b}v=" "+v.join(" ");var W="";if(!p.dotsContainer&&p.pagination&&(W+='<div class="slider-pagination'+v+'"></div>'),p.navigation&&(W+='<button class="slider-button slider-button-prev'+v+'" aria-label="Prev"></button><button class="slider-button slider-button-next'+v+'" aria-label="Next"></button>'),c.siblings(".slider-button,.slider-pagination").remove(),c.parent().addClass("slider-container"+(p.statusClass?" "+p.statusClass:"")+(c.attr("data-slider-status")?" "+c.attr("data-slider-status"):"")).parent().addClass("slider-relative"),c.after(W),!p.dotsContainer&&p.pagination&&(p.pagination={clickable:!0,el:c.siblings(".slider-pagination")[0],bulletClass:"slider-pagination-bullet",bulletActiveClass:"active",modifierClass:"slider-pagination-"}),p.navigation&&(p.navigation={prevEl:c.siblings(".slider-button-prev")[0],nextEl:c.siblings(".slider-button-next")[0],hideOnClick:!0,disabledClass:"disabled",hiddenClass:"slider-button-hidden"}),c.hasClass("product-thumbs")){var C=c.parent().parent().hasClass("pg-vertical");C&&(p.direction="vertical",p.breakpoints={0:{slidesPerView:4,direction:"horizontal"},992:{slidesPerView:"auto",direction:"vertical"}}),c.closest(".container-fluid").length&&(p.breakpoints||(p.breakpoints={}),p.breakpoints[1600]=C?{slidesPerView:"auto",direction:"vertical",spaceBetween:20}:{spaceBetween:20},C&&(p.breakpoints[1600].slidesPerView="auto"))}if(c.hasClass("product-single-carousel")){var x=c.closest(".product-gallery").find(".product-thumbs");p.thumbs.swiper=x.data("slider")}if(p.legacy=!1,this.slider=new Wolmart.Swiper(c[0].parentElement,p),e.call(this),this.slider.on("resize",r.bind(this)),this.slider.on("transitionEnd",o.bind(this)),p.onInitialized&&p.onInitialized.call(this.slider),c.hasClass("animation-slider")&&(i.call(this),this.slider.on("resize",s.bind(this)),this.slider.on("transitionStart",n.bind(this)),this.slider.on("transitionEnd",l.bind(this))),p.dotsContainer&&"preview"!=p.dotsContainer){var k=this.slider;Wolmart.$body.on("click",p.dotsContainer+" button",(function(){k.slideTo(t(this).index())})),this.slider.on("transitionStart",(function(){t(p.dotsContainer).children().removeClass("active").eq(this.realIndex).addClass("active")}))}c.trigger("initialize.slider",[this.slider]),c.data("slider",this.slider)},function(e,o,i){Wolmart.$body.hasClass("wolmart-disable-mobile-slider")&&"ontouchstart"in document&&Wolmart.$window.width()<1200||Wolmart.$(e).each((function(){var r=t(this);if(!r.data("slider")){var s=r.find(".elementor-invisible, .appear-animate");s.length&&(r.addClass("animation-slider"),s.addClass("slide-animate").each((function(){var a=t(this),e=a.data("settings");if(e){var o={_animation_name:e._animation?e._animation:e.animation,_animation_delay:Number(e._animation_delay)};a.removeClass("appear-animate").data("settings",o).attr("data-settings",JSON.stringify(o))}})));var n=function(){if(".slider-wrapper"==e){var t=r.closest(".tab-pane");if(t.length&&!t.hasClass("active")&&t.closest(".elementor-widget-wolmart_widget_products_tab").length)return}new a(r,o)};i?new n:setTimeout(n)}}))}}(),Wolmart.initSlider=function(t){Wolmart.slider(t)},Wolmart.quantityInput=function(){function a(t){return this.init(t)}return a.min=1,a.max=1e6,a.prototype.init=function(t){var e=this;e.$minus=!1,e.$plus=!1,e.$value=!1,e.value=!1,e.startIncrease=e.startIncrease.bind(e),e.startDecrease=e.startDecrease.bind(e),e.stop=e.stop.bind(e),e.min=parseInt(t.attr("min")),e.max=parseInt(t.attr("max")),e.min||t.attr("min",e.min=a.min),e.max||t.attr("max",e.max=a.max),e.$value=t.val(e.value=Math.max(parseInt(t.val()),1)),e.$minus=t.parent().find(".quantity-minus").on("click",Wolmart.preventDefault),e.$plus=t.parent().find(".quantity-plus").on("click",Wolmart.preventDefault),"ontouchstart"in document&&e.$minus.length>0?(e.$minus.on("touchstart",e.startDecrease),e.$plus.on("touchstart",e.startIncrease)):(e.$minus.on("mousedown",e.startDecrease),e.$plus.on("mousedown",e.startIncrease)),Wolmart.$body.on("mouseup",e.stop).on("touchend",e.stop)},a.prototype.startIncrease=function(t){var a=this;a.value=a.$value.val(),a.value<a.max&&(a.$value.val(++a.value),a.$value.trigger("change")),a.increaseTimer=Wolmart.requestTimeout((function(){a.speed=1,a.increaseTimer=Wolmart.requestInterval((function(){a.$value.val(a.value=Math.min(a.value+Math.floor(a.speed*=1.05),a.max))}),50)}),400)},a.prototype.stop=function(t){(this.increaseTimer||this.decreaseTimer)&&this.$value.trigger("change"),this.increaseTimer&&(Wolmart.deleteTimeout(this.increaseTimer),this.increaseTimer=0),this.decreaseTimer&&(Wolmart.deleteTimeout(this.decreaseTimer),this.decreaseTimer=0)},a.prototype.startDecrease=function(t){var a=this;a.value=a.$value.val(),a.value>a.min&&(a.$value.val(--a.value),a.$value.trigger("change")),a.decreaseTimer=Wolmart.requestTimeout((function(){a.speed=1,a.decreaseTimer=Wolmart.requestInterval((function(){a.$value.val(a.value=Math.max(a.value-Math.floor(a.speed*=1.05),a.min))}),50)}),400)},function(e){Wolmart.$(e).each((function(){var e=t(this);e.data("quantityInput")||e.data("quantityInput",new a(e))}))}}(),Wolmart.initCookiePopup=function(){var a=wolmart_vars.cookie_version;if("accepted"!==Wolmart.getCookie("wolmart_cookies_"+a)){var e=t(".cookies-popup");setTimeout((function(){e.addClass("show"),Wolmart.$body.on("click",".accept-cookie-btn",(function(t){t.preventDefault(),e.removeClass("show"),Wolmart.setCookie("wolmart_cookies_"+a,"accepted",60)})),Wolmart.$body.on("click",".decline-cookie-btn",(function(t){t.preventDefault(),e.removeClass("show")}))}),2500)}},Wolmart.floatSVG=function(){function a(a,e){this.$el=t(a),this.set(e),this.start()}return a.prototype.set=function(a){this.options=t.extend({delta:15,speed:10,size:1},"string"==typeof a?JSON.parse(a):a)},a.prototype.getDeltaY=function(t){return Math.sin(2*Math.PI*t/this.width*this.options.size)*this.options.delta},a.prototype.start=function(){this.update=this.update.bind(this),this.timeStart=Date.now()-parseInt(100*Math.random()),this.$el.find("path").each((function(){t(this).data("original",this.getAttribute("d").replace(/([\d])\s*\-/g,"$1,-"))})),window.addEventListener("resize",this.update,{passive:!0}),window.addEventListener("scroll",this.update,{passive:!0}),Wolmart.$window.on("check_float_svg",this.update),this.update()},a.prototype.update=function(){var t=this;this.$el.length&&Wolmart.isOnScreen(this.$el[0])&&Wolmart.requestTimeout((function(){t.draw()}),16)},a.prototype.draw=function(){var a=this,e=(Date.now()-this.timeStart)*this.options.speed/200;this.width=this.$el.width(),this.width&&(this.$el.find("path").each((function(){var o=e,i=0;this.setAttribute("d",t(this).data("original").replace(/M([\d|\.]*),([\d|\.]*)/,(function(t,e,r){return e&&r?"M"+e+","+(parseFloat(r)+(i=a.getDeltaY(o+=parseFloat(e)))).toFixed(3):t})).replace(/([c|C])[^A-Za-z]*/g,(function(t,r){if(r){var s=t.slice(1).split(",").map(parseFloat);if(6==s.length)return"C"==r?(s[1]+=a.getDeltaY(e+s[0]),s[3]+=a.getDeltaY(e+s[2]),s[5]+=a.getDeltaY(o=e+s[4])):(s[1]+=a.getDeltaY(o+s[0])-i,s[3]+=a.getDeltaY(o+s[2])-i,s[5]+=a.getDeltaY(o+=s[4])-i),i=a.getDeltaY(o),r+s.map((function(t){return t.toFixed(3)})).join(",")}return t})))})),this.update())},function(e){Wolmart.$(e).each((function(){var e,o=t(this);"svg"==this.tagName&&((e=o.data("float-svg"))?e.set(o.attr("data-float-options")):o.data("float-svg",new a(this,o.attr("data-float-options"))))}))}}(),Wolmart.showEditPageTooltip=function(){t.fn.tooltip&&(t(".wolmart-edit-link").each((function(){var a=t(this),e=a.data("title");a.next(".wolmart-block").addClass("wolmart-has-edit-link").tooltip({html:!0,template:'<div class="tooltip wolmart-tooltip-wrap" role="tooltip"><div class="arrow"></div><div class="tooltip-inner wolmart-tooltip"></div></div>',trigger:"manual",title:'<a href="'+a.data("link")+'" target="_blank">'+e+"</a>",delay:300});var o=a.next(".wolmart-block").data("bs.tooltip");o&&o.element&&(t(o.element).on("mouseenter.bs.tooltip",(function(t){o._enter(t)})),t(o.element).on("mouseleave.bs.tooltip",(function(t){o._leave(t)})))})),Wolmart.$body.on("mouseenter mouseleave",'.tooltip[role="tooltip"]',(function(a){var e=t('.wolmart-block[aria-describedby="'+t(this).attr("id")+'"]');if(e.length&&e.data("bs.tooltip")){var o="mouseenter"==a.type?"_enter":"_leave";e.data("bs.tooltip")[o](!1,e.data("bs.tooltip"))}})))},Wolmart.currencySwitcher={init:function(){return this.events(),this},events:function(){var a=this;return t(document.body).on("click",".wcml-switcher li",(function(e){if(e.preventDefault(),"disabled"!=t(this).parent().attr("disabled")){var o=t(this).attr("rel");a.loadCurrency(o)}})),t(document.body).on("click",".woocs-switcher li",(function(e){if("disabled"!=t(this).parent().attr("disabled")){var o=t(this).attr("rel");a.loadWoocsCurrency(o)}})),a},loadCurrency:function(a){t(".wcml-switcher").attr("disabled","disabled"),t(".wcml-switcher").append('<li class="loading"></li>');t.ajax({type:"post",url:wolmart_vars.ajax_url,data:{action:"wcml_switch_currency",currency:a},success:function(a){t(".wcml-switcher").removeAttr("disabled"),t(".wcml-switcher").find(".loading").remove(),window.location=window.location.href}})},loadWoocsCurrency:function(a){t(".woocs-switcher").attr("disabled","disabled"),t(".woocs-switcher").append('<li class="loading"></li>');var e=window.location.href;e=(e=e.split("?"))[0];var o="?";woocs_array_of_get.currency=a,Object.keys(woocs_array_of_get).length>0&&jQuery.each(woocs_array_of_get,(function(t,a){o=o+"&"+t+"="+a})),window.location=e+o},removeParameterFromUrl:function(t,a){return t.replace(new RegExp("[?&]"+a+"=[^&#]*(#.*)?$"),"$1").replace(new RegExp("([?&])"+a+"=[^&]*&"),"$1")}},wolmart_vars.mobile_scripts.length>0&&wolmart_vars.mobile_scripts.forEach((function(t){let a=document.createElement("script");a.setAttribute("src",t.src),a.setAttribute("defer",t.defer),a.setAttribute("id",t.handle),document.body.appendChild(a)})),Wolmart.initMobileSwitcher=function(){t("body").on("click",".mobile-fs-switcher > li > a",(function(a){var e=t(this).closest(".mobile-fs-switcher"),o=e.find("ul");e.addClass("show"),o.append('<li class="close">×</li>'),t("body").css("overflow","hidden"),a.preventDefault()})),t("body").on("click",".mobile-fs-switcher ul > li",(function(a){var e=t(this).closest(".mobile-fs-switcher");e.removeClass("show"),e.find("li.close").remove(),t("body").css("overflow","")}))},Wolmart.initAsync=function(){Wolmart.appearAnimate(".appear-animate"),wolmart_vars.resource_disable_elementor&&"object"!=typeof elementorFrontend&&(Wolmart.appearAnimate(".elementor-invisible"),Wolmart.countTo(".elementor-counter-number")),"cart-popup"==wolmart_vars.cart_popup_type?Wolmart.cartpopup.init():Wolmart.minipopup.init(),Wolmart.stickyContent(".sticky-content:not(.mobile-icon-bar):not(.sticky-toolbox)"),Wolmart.stickyContent(".mobile-icon-bar",Wolmart.defaults.stickyMobileBar),Wolmart.stickyContent(".sticky-toolbox",Wolmart.defaults.stickyToolbox),Wolmart.shop.init(),Wolmart.initProductSingle(),setTimeout((function(){Wolmart.initSlider(".slider-wrapper:not(.product-hover-slider)")})),setTimeout((function(){Wolmart.initSlider(".product-hover-slider")}),300),Wolmart.sidebar("left-sidebar"),Wolmart.sidebar("right-sidebar"),Wolmart.sidebar("top-sidebar"),Wolmart.quantityInput(".qty"),Wolmart.playableVideo(".post-video"),Wolmart.accordion(".card-header > a"),Wolmart.tab(".nav-tabs:not(.wolmart-comment-tabs)"),Wolmart.alert(".alert"),Wolmart.parallax(".parallax"),Wolmart.countTo(".count-to"),Wolmart.countdown(".product-countdown, .countdown:not(.lottery-time)"),Wolmart.menu.init(),Wolmart.initPopups(),Wolmart.initAccount(),Wolmart.initScrollTopButton(),setTimeout(Wolmart.initScrollTo),Wolmart.initContactForms(),Wolmart.initSearchForm(),Wolmart.initVideoPlayer(),Wolmart.initAjaxLoadPost(),Wolmart.floatSVG(".float-svg"),Wolmart.initElementor(),Wolmart.initVendorCompatibility(),Wolmart.initFloatingElements(),setTimeout(Wolmart.initAdvancedMotions),Wolmart.initCookiePopup(),Wolmart.currencySwitcher.init(),Wolmart.initMobileSwitcher(),Wolmart.$window.on("resize",Wolmart.onResize),"load"==Wolmart.status&&(Wolmart.status="complete"),Wolmart.$window.trigger("wolmart_complete"),Wolmart.showEditPageTooltip()}}(jQuery);
!function(t,e){"object"==typeof exports?module.exports=e(t):"function"==typeof define&&define.amd?define([],e):t.LazyLoad=e(t)}("undefined"!=typeof global?global:this.window||this.global,(function(t){"use strict";"function"==typeof define&&define.amd&&(t=window);const e={src:"data-lazy",srcset:"data-lazyset",sizes:"data-sizes",selector:"[data-lazy]",root:null,rootMargin:"0px",threshold:0},r=function(){let t={},e=!1,s=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],s++);let n=function(s){for(let o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e&&"[object Object]"===Object.prototype.toString.call(s[o])?t[o]=r(!0,t[o],s[o]):t[o]=s[o])};for(;s<o;s++){n(arguments[s])}return t};function s(t,s){this.settings=r(e,s||{}),this.images=t||document.querySelectorAll(this.settings.selector),this.observer=null,this.init()}if(s.prototype={init:function(){if(!t.IntersectionObserver)return void this.loadImages();let e=this,r={root:this.settings.root,rootMargin:this.settings.rootMargin,threshold:[this.settings.threshold]};this.observer=new IntersectionObserver((function(t){Array.prototype.forEach.call(t,(function(t){if(t.isIntersecting){e.observer.unobserve(t.target);let s=t.target.getAttribute(e.settings.src),o=t.target.getAttribute(e.settings.srcset),n=t.target.getAttribute(e.settings.sizes);if("img"===t.target.tagName.toLowerCase()?(s&&(t.target.src=s),o&&(t.target.srcset=o),n&&(t.target.sizes=n)):(t.target.style.background="",t.target.style.backgroundImage=s?"url("+s+")":""),s){var r=document.createElement("img");r.src=s,o&&(r.srcset=o),r.onload=function(){e.settings.load.call(t.target)}}}}))}),r),Array.prototype.forEach.call(this.images,(function(t){e.observer.observe(t)}))},loadAndDestroy:function(){this.settings&&(this.loadImages(),this.destroy())},loadImages:function(){if(!this.settings)return;let t=this;Array.prototype.forEach.call(this.images,(function(e){let r=e.getAttribute(t.settings.src),s=e.getAttribute(t.settings.srcset);"img"===e.tagName.toLowerCase()?(r&&(e.src=r),s&&(e.srcset=s)):(entry.target.style.background="",entry.target.style.backgroundImage=r?"url("+r+")":"")}))},destroy:function(){this.settings&&(this.observer.disconnect(),this.settings=null)}},t.lazyload=function(t,e){return new s(t,e)},t.jQuery){const e=t.jQuery;e.fn.lazyload=function(t){return(t=t||{}).attribute=t.attribute||"data-src",new s(e.makeArray(this),t),this}}return s}));
!function(t,o){"use strict";jQuery.fn[o]=function(t){return t?this.bind("resize",(e=t,function(){var t=this,o=arguments;function n(){i||e.apply(t,o),a=null}a?clearTimeout(a):i&&e.apply(t,o),a=setTimeout(n,s||100)})):this.trigger(o);var e,s,i,a}}(jQuery,"smartresize"),function(t){"use strict";t.fn.themePin=function(o){var e=0,s=0,i=[],a=!1,n=t(window),p=[],r=[],c=[];o=o||{};var f=function(){for(var e=0,s=i.length;e<s;e++){var p=i[e];if(o.minWidth&&n.width()<=o.minWidth)p.parent().is(".pin-wrapper")&&p.unwrap(),p.css({width:"",left:"",top:"",position:""}),a=!0;else{a=!1;var r=o.containerSelector?p.closest(o.containerSelector).length?p.closest(o.containerSelector):t(o.containerSelector):t(document.body),c=p.offset(),f=r.offset();if(void 0!==f){var d=p.parent().offset();p.parent().is(".pin-wrapper")||p.wrap("<div class='pin-wrapper'>");var l=t.extend({top:0,bottom:0},o.padding||{}),h=parseInt(p.parent().parent().css("padding-top")),u=parseInt(p.parent().parent().css("padding-bottom"));void 0!==o.paddingOffsetTop?l.top+=parseInt(o.paddingOffsetTop,10):l.top+=18,void 0!==o.paddingOffsetBottom?l.bottom=parseInt(o.paddingOffsetBottom,10):l.bottom=0;var m=p.css("border-bottom"),v=p.outerHeight();p.css("border-bottom","1px solid transparent");var g=p.outerHeight()-v-1;p.css("border-bottom",m),p.css({width:p.outerWidth()<=p.parent().width()?p.outerWidth():p.parent().width()}),p.parent().css("height",p.outerHeight()+g),p.outerHeight()<=n.height()?p.data("themePin",{pad:l,from:(o.containerSelector?f.top:c.top)-l.top+h,pb:u,parentTop:d.top-h,offset:g}):p.data("themePin",{pad:l,fromFitTop:(o.containerSelector?f.top:c.top)-l.top+h,from:(o.containerSelector?f.top:c.top)+p.outerHeight()-t(window).height()+h,pb:u,parentTop:d.top-h,offset:g})}}}},d=function(){if(!a){e=n.scrollTop();for(var f=window.innerHeight||n.height(),d=0,l=i.length;d<l;d++){var h,u=t(i[d]),m=u.data("themePin");if(m){var v=o.containerSelector?u.closest(o.containerSelector).length?u.closest(o.containerSelector):t(o.containerSelector):t(document.body),g=u.outerHeight()+m.pad.top<=f;if(m.end=v.offset().top+v.height(),g?m.to=v.offset().top+v.height()-u.outerHeight()-m.pad.bottom-m.pb:(m.to=v.offset().top+v.height()-f-m.pb,m.to2=v.height()-u.outerHeight()-m.pad.bottom-m.pb),0===c[d]&&(c[d]=m.to),c[d]!=m.to&&r[d]&&u.height()+u.offset().top+m.pad.bottom<e+f&&(r[d]=!1),g){var b=m.from-m.pad.bottom,C=m.to-m.pad.top-m.offset;if(void 0!==m.fromFitTop&&m.fromFitTop&&(b=m.fromFitTop-m.pad.bottom),b+u.outerHeight()>m.end||b>=C){u.css({position:"",top:"",left:""}),o.activeClass&&u.removeClass(o.activeClass);continue}e>b&&e<C?("fixed"!=u.css("position")&&u.css({left:u.offset().left,top:m.pad.top}).css("position","fixed"),o.activeClass&&u.addClass(o.activeClass)):e>=C?(u.css({left:"",top:C-m.parentTop+m.pad.top}).css("position","absolute"),o.activeClass&&u.addClass(o.activeClass)):(u.css({position:"",top:"",left:""}),o.activeClass&&u.removeClass(o.activeClass))}else if(u.height()+m.pad.top+m.pad.bottom>f||p[d]||r[d]){var w=parseInt(u.parent().parent().css("padding-top"));e+m.pad.top-w<=m.parentTop?(u.css({position:"",top:"",bottom:"",left:""}),p[d]=r[d]=!1,o.activeClass&&u.removeClass(o.activeClass)):e>=m.to?(u.css({left:"",top:m.to2,bottom:""}).css("position","absolute"),o.activeClass&&u.addClass(o.activeClass)):e>s?p[d]?(p[d]=!1,h=u.offset().top-m.parentTop,u.css({left:"",top:h,bottom:""}).css("position","absolute"),o.activeClass&&u.addClass(o.activeClass)):!r[d]&&u.height()+u.offset().top+m.pad.bottom<e+f&&(r[d]=!0,"fixed"!=u.css("position")&&u.css({left:u.offset().left,bottom:m.pad.bottom,top:""}).css("position","fixed"),o.activeClass&&u.addClass(o.activeClass)):e<s?r[d]?(r[d]=!1,h=u.offset().top-m.parentTop,u.css({left:"",top:h,bottom:""}).css("position","absolute"),o.activeClass&&u.addClass(o.activeClass)):!p[d]&&u.offset().top>=e+m.pad.top&&(p[d]=!0,"fixed"!=u.css("position")&&u.css({left:u.offset().left,top:m.pad.top,bottom:""}).css("position","fixed"),o.activeClass&&u.addClass(o.activeClass)):(p[d]=!1,p[d]=!1)}else e>=m.parentTop-m.pad.top?u.css({position:"fixed",top:m.pad.top}):u.css({position:"",top:"",bottom:"",left:""}),p[d]=r[d]=!1;c[d]=m.to}}s=e}},l=function(){f(),d()};return this.each((function(){var o=t(this),e=t(this).data("themePin")||{};e&&e.update||(i.push(o),t("img",this).one("load",f),e.update=l,t(this).data("themePin",e),p.push(!1),r.push(!1),c.push(0))})),n.on("touchmove scroll",d),f(),n.on("load",l),t(this).on("recalc.pin",(function(){f(),d()})),t(this).on("recalc.pin.left",(function(e,s){!function(e){void 0===e&&(e=400);for(var s=0,a=i.length;s<a;s++){var n=t(i[s]);if(n.data("themePin")){var p=o.containerSelector?n.closest(o.containerSelector).length?n.closest(o.containerSelector):t(o.containerSelector):t(document.body);if("fixed"==n.css("position")){var r=n.offset().top-p.offset().top;n.css({position:"absolute",left:"",top:r,bottom:""})}}}}(s)})),this};var o="__sticky",e=function(t,o){return this.initialize(t,o)};e.defaults={autoInit:!1,minWidth:767,padding:{top:0,bottom:0},offsetTop:0,offsetBottom:0},e.prototype={initialize:function(t,e){return t.data(o)||(this.$el=t,this.setData().setOptions(e).build()),this},setData:function(){return this.$el.data(o,this),this},setOptions:function(o){return this.options=t.extend(!0,{},e.defaults,o,{wrapper:this.$el}),this},build:function(){if(!t.isFunction(t.fn.themePin))return this;var o,e=this.options.wrapper;return e.themePin(this.options),t(window).smartresize((function(){o&&clearTimeout(o),o=setTimeout((function(){e.trigger("recalc.pin")}),800);var t=e.parent();e.outerWidth(t.width()),"fixed"==e.css("position")&&e.css("left",t.offset().left)})),this}},t.fn.themeSticky=function(s){return this.map((function(){var i=t(this);return i.data(o)?(i.trigger("recalc.pin"),setTimeout((function(){i.trigger("recalc.pin")}),800),i.data(o)):new e(i,s)}))}}.apply(this,[jQuery]);
(function(t,i){t=t||{};var a=function(t,i){return this.initialize(t,i)};a.defaults={speed:1.5,horizontalPosition:"50%",offset:0,parallaxHeight:"180%"},a.prototype={initialize:function(t,i){return t.data("__parallax")?this:(this.$el=t,this.setData().setOptions(i).build(),this)},setData:function(){return this.$el.data("__parallax",this),this},setOptions:function(t){return this.options=i.extend(!0,{},a.defaults,t,{wrapper:this.$el}),this},build:function(){var t,a,o,s=this,n=i(window);(o=i('<div class="parallax-background"></div>')).css({"background-image":"url("+s.options.wrapper.data("image-src")+")","background-size":"cover",position:"absolute",top:0,left:0,width:"100%",height:s.options.parallaxHeight}),s.options.wrapper.prepend(o),s.options.wrapper.css({position:"relative",overflow:"hidden"});return n.on("scroll resize",function(){t=s.options.wrapper.offset(),a=-(n.scrollTop()-(t.top-100))/(s.options.speed+2),plxPos=a<0?Math.abs(a):-Math.abs(a),o.css({transform:"translate3d(0, "+(plxPos-50+s.options.offset)+"px, 0)","background-position-x":s.options.horizontalPosition})}),n.trigger("scroll"),this}},i.extend(t,{PluginParallax:a}),i.fn.themePluginParallax=function(t){return this.map(function(){var o=i(this);return o.data("__parallax")?o.data("__parallax"):new a(o,t)})}}).apply(this,[window.theme,jQuery]);
