/*
 * jQuery Foundation Joyride Plugin 2.0.2
 * http://foundation.zurb.com
 * Copyright 2012, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
/*jslint unparam: true, browser: true, indent: 2 */
(function(e,t,n){"use strict";var r={version:"2.0.1",tipLocation:"bottom",nubPosition:"auto",scrollSpeed:300,timer:0,startTimerOnClick:!0,startOffset:0,nextButton:!0,tipAnimation:"fade",pauseAfter:[],tipAnimationFadeSpeed:300,cookieMonster:!1,cookieName:"joyride",cookieDomain:!1,tipContainer:"body",postRideCallback:e.noop,postStepCallback:e.noop,template:{link:'<a href="#close" class="joyride-close-tip">X</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>'}},i=i||!1,s={},o={init:function(n){return this.each(function(){if(e.isEmptyObject(s)){s=e.extend(r,n),s.document=t.document,s.$document=e(s.document),s.$window=e(t),s.$content_el=e(this),s.body_offset=e(s.tipContainer).position(),s.$tip_content=e("> li",s.$content_el),s.paused=!1,s.attempts=0,s.tipLocationPatterns={top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},o.jquery_check(),e.isFunction(e.cookie)||(s.cookieMonster=!1);if(!s.cookieMonster||!e.cookie(s.cookieName))s.$tip_content.each(function(t){o.create({$li:e(this),index:t})}),!s.startTimerOnClick&&s.timer>0?(o.show("init"),o.startTimer()):o.show("init");s.$document.on("click.joyride",".joyride-next-tip, .joyride-modal-bg",function(e){e.preventDefault(),s.$li.next().length<1?o.end():s.timer>0?(clearTimeout(s.automate),o.hide(),o.show(),o.startTimer()):(o.hide(),o.show())}),s.$document.on("click.joyride",".joyride-close-tip",function(e){e.preventDefault(),o.end()}),s.$window.bind("resize.joyride",function(e){o.is_phone()?o.pos_phone():o.pos_default()})}else o.restart()})},resume:function(){o.set_li(),o.show()},tip_template:function(t){var n,r;return t.tip_class=t.tip_class||"",n=e(s.template.tip).addClass(t.tip_class),r=e.trim(e(t.li).html())+o.button_text(t.button_text)+s.template.link+o.timer_instance(t.index),n.append(e(s.template.wrapper)),n.first().attr("data-index",t.index),e(".joyride-content-wrapper",n).append(r),n[0]},timer_instance:function(t){var n;return t===0&&s.startTimerOnClick&&s.timer>0||s.timer===0?n="":n=o.outerHTML(e(s.template.timer)[0]),n},button_text:function(t){return s.nextButton?(t=e.trim(t)||"Next",t=o.outerHTML(e(s.template.button).append(t)[0])):t="",t},create:function(t){var n=t.$li.attr("data-button")||t.$li.attr("data-text"),r=t.$li.attr("class"),i=e(o.tip_template({tip_class:r,index:t.index,button_text:n,li:t.$li}));e(s.tipContainer).append(i)},show:function(t){var r={},i,u=[],a=0,f,l=null;if(s.$li===n||e.inArray(s.$li.index(),s.pauseAfter)===-1){s.paused?s.paused=!1:o.set_li(t),s.attempts=0;if(s.$li.length&&s.$target.length>0){u=(s.$li.data("options")||":").split(";"),a=u.length;for(i=a-1;i>=0;i--)f=u[i].split(":"),f.length===2&&(r[e.trim(f[0])]=e.trim(f[1]));s.tipSettings=e.extend({},s,r),s.tipSettings.tipLocationPattern=s.tipLocationPatterns[s.tipSettings.tipLocation],/body/i.test(s.$target.selector)||o.scroll_to(),o.is_phone()?o.pos_phone(!0):o.pos_default(!0),l=e(".joyride-timer-indicator",s.$next_tip),/pop/i.test(s.tipAnimation)?(l.outerWidth(0),s.timer>0?(s.$next_tip.show(),l.animate({width:e(".joyride-timer-indicator-wrap",s.$next_tip).outerWidth()},s.timer)):s.$next_tip.show()):/fade/i.test(s.tipAnimation)&&(l.outerWidth(0),s.timer>0?(s.$next_tip.fadeIn(s.tipAnimationFadeSpeed),s.$next_tip.show(),l.animate({width:e(".joyride-timer-indicator-wrap",s.$next_tip).outerWidth()},s.timer)):s.$next_tip.fadeIn(s.tipAnimationFadeSpeed)),s.$current_tip=s.$next_tip}else s.$li&&s.$target.length<1?o.show():o.end()}else s.paused=!0},is_phone:function(){return i?i.mq("only screen and (max-width: 767px)"):s.$window.width()<767?!0:!1},hide:function(){s.postStepCallback(s.$li.index(),s.$current_tip),e(".joyride-modal-bg").hide(),s.$current_tip.hide()},set_li:function(e){e?(s.$li=s.$tip_content.eq(s.startOffset),o.set_next_tip(),s.$current_tip=s.$next_tip):(s.$li=s.$li.next(),o.set_next_tip()),o.set_target()},set_next_tip:function(){s.$next_tip=e(".joyride-tip-guide[data-index="+s.$li.index()+"]")},set_target:function(){var t=s.$li.attr("data-class"),n=s.$li.attr("data-id"),r=function(){return n?e(s.document.getElementById(n)):t?e("."+t).first():e("body")};s.$target=r()},scroll_to:function(){var t,n;t=s.$window.height()/2,n=Math.ceil(s.$target.offset().top-t+s.$next_tip.outerHeight()),e("html, body").stop().animate({scrollTop:n},s.scrollSpeed)},paused:function(){return e.inArray(s.$li.index()+1,s.pauseAfter)===-1?!0:!1},destroy:function(){s.$document.off(".joyride"),e(t).off(".joyride"),e(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),e(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(s.automate),s={}},restart:function(){o.hide(),s.$li=n,o.show("init")},pos_default:function(t){var n=Math.ceil(s.$window.height()/2),r=s.$next_tip.offset(),i=e(".joyride-nub",s.$next_tip),u=Math.ceil(i.outerHeight()/2),a=t||!1;a&&(s.$next_tip.css("visibility","hidden"),s.$next_tip.show()),/body/i.test(s.$target.selector)?s.$li.length&&o.pos_modal(i):(o.bottom()?(s.$next_tip.css({top:s.$target.offset().top+u+s.$target.outerHeight(),left:s.$target.offset().left}),o.nub_position(i,s.tipSettings.nubPosition,"top")):o.top()?(s.$next_tip.css({top:s.$target.offset().top-s.$next_tip.outerHeight()-u,left:s.$target.offset().left}),o.nub_position(i,s.tipSettings.nubPosition,"bottom")):o.right()?(s.$next_tip.css({top:s.$target.offset().top,left:s.$target.outerWidth()+s.$target.offset().left}),o.nub_position(i,s.tipSettings.nubPosition,"left")):o.left()&&(s.$next_tip.css({top:s.$target.offset().top,left:s.$target.offset().left-s.$next_tip.outerWidth()-u}),o.nub_position(i,s.tipSettings.nubPosition,"right")),!o.visible(o.corners(s.$next_tip))&&s.attempts<s.tipSettings.tipLocationPattern.length&&(i.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),s.tipSettings.tipLocation=s.tipSettings.tipLocationPattern[s.attempts],s.attempts++,o.pos_default(!0))),a&&(s.$next_tip.hide(),s.$next_tip.css("visibility","visible"))},pos_phone:function(t){var n=s.$next_tip.outerHeight(),r=s.$next_tip.offset(),i=s.$target.outerHeight(),u=e(".joyride-nub",s.$next_tip),a=Math.ceil(u.outerHeight()/2),f=t||!1;u.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),f&&(s.$next_tip.css("visibility","hidden"),s.$next_tip.show()),/body/i.test(s.$target.selector)?s.$li.length&&o.pos_modal(u):o.top()?(s.$next_tip.offset({top:s.$target.offset().top-n-a}),u.addClass("bottom")):(s.$next_tip.offset({top:s.$target.offset().top+i+a}),u.addClass("top")),f&&(s.$next_tip.hide(),s.$next_tip.css("visibility","visible"))},pos_modal:function(t){o.center(),t.hide(),e(".joyride-modal-bg").length<1&&e("body").append('<div class="joyride-modal-bg">').show(),/pop/i.test(s.tipAnimation)?e(".joyride-modal-bg").show():e(".joyride-modal-bg").fadeIn(s.tipAnimationFadeSpeed)},center:function(){var e=s.$window;return s.$next_tip.css({top:(e.height()-s.$next_tip.outerHeight())/2+e.scrollTop(),left:(e.width()-s.$next_tip.outerWidth())/2+e.scrollLeft()}),!0},bottom:function(){return/bottom/i.test(s.tipSettings.tipLocation)},top:function(){return/top/i.test(s.tipSettings.tipLocation)},right:function(){return/right/i.test(s.tipSettings.tipLocation)},left:function(){return/left/i.test(s.tipSettings.tipLocation)},corners:function(e){var t=s.$window,n=t.width()+t.scrollLeft(),r=t.width()+t.scrollTop();return[e.offset().top<=t.scrollTop(),n<=e.offset().left+e.outerWidth(),r<=e.offset().top+e.outerHeight(),t.scrollLeft()>=e.offset().left]},visible:function(e){var t=e.length;while(t--)if(e[t])return!1;return!0},nub_position:function(e,t,n){t==="auto"?e.addClass(n):e.addClass(t)},startTimer:function(){s.$li.length?s.automate=setTimeout(function(){o.hide(),o.show(),o.startTimer()},s.timer):clearTimeout(s.automate)},end:function(){s.cookieMonster&&e.cookie(s.cookieName,"ridden",{expires:365,domain:s.cookieDomain}),s.timer>0&&clearTimeout(s.automate),e(".joyride-modal-bg").hide(),s.$current_tip.hide(),s.postStepCallback(s.$li.index(),s.$current_tip),s.postRideCallback(s.$li.index(),s.$current_tip)},jquery_check:function(){return e.isFunction(e.fn.on)?!0:(e.fn.on=function(e,t,n){return this.delegate(t,e,n)},e.fn.off=function(e,t,n){return this.undelegate(t,e,n)},!1)},outerHTML:function(e){return e.outerHTML||(new XMLSerializer).serializeToString(e)},version:function(){return s.version}};e.fn.joyride=function(t){if(o[t])return o[t].apply(this,Array.prototype.slice.call(arguments,1));if(typeof t=="object"||!t)return o.init.apply(this,arguments);e.error("Method "+t+" does not exist on jQuery.joyride")}})(jQuery,this);