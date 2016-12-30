// Board
function board(bdObj){
(function($){
// Option
	var bd = $(bdObj);
	var default_style = bd.attr('data-default_style');
	var bdBubble = bd.attr('data-bdBubble');
	var lstViewer = bd.attr('data-lstViewer');
	var bdFilesType = bd.attr('data-bdFilesType');
	var bdImgOpt = bd.attr('data-bdImgOpt');
	var bdImgLink = bd.attr('data-bdImgLink');
	var bdNavSide = bd.attr('data-bdNavSide');

	ie8Check = navigator.userAgent.match(/msie [7]/i) || navigator.userAgent.match(/msie [8]/i);
// Login
	if(bdLogin){
		bd.find('a.bd_login').click(function(){
			if(confirm(bdLogin.split('@')[0])) window.location.href = bdLogin.split('@')[1];
			return false;
		});
	};

// Category Navigation
	var cnb = bd.find('div.bd_cnb');
	var cnb2 = bd.find('ul.cTab');
	if(cnb.length){
		var cMore = bd.find('li.cnbMore');
	    var cItem = cnb.find('>ul>li');
	    var lastEvent = null;
	    function cnbToggle(){
	        var t = $(this);
	        if(t.next('ul').is(':hidden') || t.next('ul').length==0){
	            cItem.find('>ul').fadeOut(100);
	            t.next('ul').fadeIn(200);
	        };
	    };
	    function cnbOut(){
	        cItem.find('ul').fadeOut(100);
	    };
	    cItem.find('>a').mouseover(cnbToggle).focus(cnbToggle);
	    cItem.mouseleave(cnbOut);
		cItem.find('>ul').each(function(){
			var t = $(this);
			t.append('<i class="bubble_edge"></i>');
			if(ie8Check) t.prepend('<i class="ie8_only bl"></i><i class="ie8_only br"></i>');
			if(t.width() > $('body').width()-t.offset().left){
				t.addClass('flip');
			};
		});
		cItem.find('>ul>li.on').parents('ul:first').show().prev().addClass('on');
	    function cnbStart(){
			// If Overflow
			cItem.each(function(){
				if($(this).offset().top!=cMore.offset().top){
					$(this).addClass('cnb_hide').nextAll().addClass('cnb_hide');
					cMore.css('visibility','visible');
					return false;
				} else {
					$(this).removeClass('cnb_hide').nextAll().removeClass('cnb_hide');
					cMore.css('visibility','hidden');
				};
			});
			cnb.find('>.bg_f_f9').css('overflow','visible');
		};
		cnbStart();
		$(window).resize(cnbStart);
		function cnbMore(){
			cnb.toggleClass('open').find('i.fa').toggleClass('fa-caret-up').toggleClass('fa-caret-down');
			return false;
		};
		if((cnb.find('.cnb_hide a,.cnb_hide li').hasClass('on')) && !cnb.hasClass('open')) cnbMore();
		cMore.click(cnbMore);
	} else if(cnb2.length){
		cnb2.find('>li>ul>li.on').parents('li:first').addClass('on');
		$(window).resize(function(){
			var h = cnb2.find('>li>ul').height();
			if(h>20){
				cnb2.css('margin-bottom',20+h);
			} else {
				cnb2.removeAttr('style');
			};
		}).resize();
	};

// Speech Bubble
	if(!bdBubble){
		bd.find('a.bubble').hover(function(){
			var t = $(this);
			if(!t.hasClass('no_bubble') && !t.find('.wrp').length){
				t.append('<span class="wrp"><span class="speech">'+t.attr('title')+'</span><i class="bubble_edge"></i></span>').removeAttr('title');
				if($('html,body').width()-t.offset().left < 80){
					t.addClass('left').find('.wrp').css({marginTop:t.parent('.wrp').height()/2})
				} else if(t.offset().top < 80 && !t.parent().parent().hasClass('rd_nav_side')){
					t.addClass('btm').find('.wrp').css({marginLeft:-t.find('.wrp').width()/2})
				} else {
					t.find('.wrp').css({marginLeft:-t.find('.wrp').width()/2})
				};
				if(ie8Check) t.find('.wrp').prepend('<i class="ie8_only bl"></i><i class="ie8_only br"></i>');
			};
			if(ie8Check) return;
			if(t.is('.left,.right,.btm')){
				t.find('.wrp:hidden').fadeIn(150)
			} else {
				t.find('.wrp:hidden').css('bottom','150%').animate({
					bottom:'100%'
				},{duration:150,specialEasing:{left:'easeInOutQuad'},complete:function(){
					},step:null,queue:false
				}).fadeIn(150)
			}
		},function(){
			if(ie8Check) return;
			$(this).find('.wrp').fadeOut(100)
		})
	};

// sketchbook's Toggle2 (Original : XE UI)
	var tgC2 = bd.find('.tg_cnt2');
	bd.find('.tg_btn2').click(function(){
		var t = $(this);
		var h = t.attr('data-href');
		if(t.next(h).is(':visible')){
			t.focus().next().fadeOut(200);
		} else {
			tgC2.filter(':visible').hide();
			t.after($(h)).next().fadeIn(200).css('display','block').find('a,input,button:not(.tg_blur2),select,textarea').eq(0).focus();
		};
		return false;
	});
	function tgClose2(){
		tgC2.filter(':visible').fadeOut(200).prev().focus();
	};
	$(document).keydown(function(event){
		if(event.keyCode != 27) return true; // ESC
		return tgClose2();
	});
	tgC2.mouseleave(tgClose2);
	bd.find('.tg_blur2').focusin(tgClose2);
	bd.find('.tg_close2,#install_ng2 .close').click(tgClose2);

// Form Label Overlapping
	bd.find('.itx_wrp label').next()
		.focus(function(){
			$(this).prev().css('visibility','hidden');
		})
		.blur(function(){
			if($(this).val()==''){
				$(this).prev().css('visibility','visible');
			} else {
				$(this).prev().css('visibility','hidden');
			};
		});
	// IE8 Fix;
	if(ie8Check){
		bd.find('.bd_guest .itx_wrp label').click(function(){
			$(this).next().focus();
		});
	};

// Scroll
	bd.find('a.back_to').click(function(){
		var t = $('body');
		if(navigator.userAgent.toLowerCase().match(/trident/i)) var t = $('html');
		t.animate({scrollTop:$($(this).attr('href')).offset().top},{duration:1000,specialEasing:{scrollTop:'easeInOutExpo'}});
		return false;
	});

// Search
	var srchWindow = bd.find('.bd_faq_srch');
	bd.find('a.show_srch').click(function(){
		if(srchWindow.is(':hidden')){
			srchWindow.fadeIn().find('.itx').focus();
		} else {
			srchWindow.fadeOut();
			$(this).focus();
		};
		return false;
	});
	bd.find('.bd_srch_btm_itx').focus(function(){
		bd.find('.bd_srch_btm .itx_wrp').animate({width:140},{duration:1000,specialEasing:{width:'easeOutBack'}}).parent().addClass('on');
	});

// With Viewer
	var wView = bd.find('a.viewer_with');
	wView.click(function(){
		if(wView.hasClass('on')){
			$.cookie('cookie_viewer_with','N');
			wView.removeClass('on');
			bd.find('.bd_lst a.hx').removeAttr('onClick');
		} else {
			$.cookie('cookie_viewer_with','Y');
			wView.addClass('on');
			bd.find('.bd_lst a.hx').attr('onClick','window.open(jQuery(this).attr(\'data-viewer\'),\'viewer\',\'width=9999,height=9999,scrollbars=yes,resizable=yes,toolbars=no\');return false;');
		};
		return false;
	});
	if($.cookie('cookie_viewer_with')=='Y') bd.find('.bd_lst a.hx').attr('onClick','window.open(jQuery(this).attr(\'data-viewer\'),\'viewer\',\'width=9999,height=9999,scrollbars=yes,resizable=yes,toolbars=no\');return false;');

// List Viewer
	if(lstViewer) bd.find('.bd_lst a.hx').append('<button class="bg_color" title="'+lstViewer+'" onClick="window.open(jQuery(this).parent().attr(\'data-viewer\'),\'viewer\',\'width=9999,height=9999,scrollbars=yes,resizable=yes,toolbars=no\');return false;">Viewer</button>');

// Gallery hover effect
	bd.find('.info_wrp').hover(function(){
		var t = $(this);
		var st = t.find('.info.st,.info.st1');
		var tL = bd.find('ol.bd_tmb_lst');
		if(tL.hasClass('tmb_bg3')){
			st.stop(true,true).animate({opacity:.8},200);
		} else {
			if(ie8Check){
				st.stop(true,true).animate({opacity:.7},200);
			} else {
				st.stop(true,true).animate({opacity:1},200);
			};
		};
		t.find('.info').stop(true,true).animate({top:0,left:0},200);
	},
	function(){
		var t = $(this);
		t.find('.info.st,.info.st1').animate({opacity:0},200);
		t.find('.info.st2').animate({top:'-100%'},200);
		t.find('.info.st3').animate({left:'-100%'},200);
		t.find('.info.st4').animate({top:'-100%',left:'-100%'},200);
	});

// Imagesloaded
	var bdOl = bd.find('ol.bd_lst');
	if(bdOl.length && !bdOl.hasClass('img_loadN')){
		bdOl.find('.tmb').each(function(){
			var t = $(this);
			t.imagesLoaded(function(){
				t.parent().addClass('fin_load').fadeIn(250);
			});
		});
	};

// List Style
if(default_style=='webzine'){
// Webzine
	var bd_zine = bd.find('ol.bd_zine');
	if(bd_zine.attr('data-masonry')){
		if(bd_zine.attr('data-masonry')!='_N'){
			bd_zine.imagesLoaded(function(){
				bd_zine.masonry({
					itemSelector:'li',
					isFitWidth:true,
					isAnimated:true,
					animationOptions:{duration:500,easing:'easeInOutExpo',queue:false}
				});
			});
		} else {
			bd_zine.imagesLoaded(function(){
				bd_zine.masonry({
					itemSelector:'li',
					isFitWidth:true
				});
			});
		};
	};
} else if(default_style=='gallery'){
// Gallery
	var bd_tmb_lst = bd.find('ol.bd_tmb_lst');
	if(bd_tmb_lst.attr('data-gall_deg')){
		if(ie8Check) return;
		var gall_deg = bd_tmb_lst.attr('data-gall_deg');
		bd_tmb_lst.find('.tmb_wrp').each(function(){
			var m = Math.floor(Math.random()*gall_deg*2-gall_deg);
			$(this).css({
				'msTransform':'rotate('+m+'deg)',
				'-moz-transform':'rotate('+m+'deg)',
				'-webkit-transform':'rotate('+m+'deg)'
			});
		});
	};
} else if(default_style=='cloud_gall'){
// Cloud Gallery
	bdCloud(bd);
} else if(default_style=='guest'){
// Guest
	// Editor
	bd.find('form>.simple_wrt textarea').focus(function(){
		$(this).parent().parent().next().slideDown();
	})
	.autoGrow();
	bd.find('form input[type=submit]').click(function(){
		$.removeCookie('socialxe_content');
	});
	if(bd.find('form>div.wysiwyg').length){
		if($('#re_cmt').length) editorStartTextarea(2,'content','comment_srl');
	} else {
		$.getScript("modules/editor/tpl/js/editor_common.min.js",function(){
			if($('#re_cmt').length) editorStartTextarea(2,'content','comment_srl');
			var cmtWrt = bd.find('form.cmt_wrt textarea');
			if(bd.find('form.bd_wrt_main textarea').length){
				$.getScript('files/cache/js_filter_compiled/35d29adbe4b14641f9eac243af40093b.'+lang_type+'.compiled.js');
				editorStartTextarea(1,'content','document_srl');
			};
			cmtWrt.each(function(){
				editorStartTextarea($(this).attr('id').split('_')[1],'content','comment_srl');
			});
		});
	};
	
};

// Link Board
	if(bd.attr('data-link_board')){
		bd.find('a.viewer_with').click(function(){
			location.reload();
			return false;
		});
		if(bd.attr('data-link_board')==3) bdLinkBoard(bd);
	};

// Read Page Only
if(bd.find('div.rd').length){
	// Prev-Next
	bdPrevNext(bd);
	function rdPrev(){
		var a = bd.find('.bd_rd_prev .wrp');
		$(this).append(a).attr('href',bd.find('.bd_rd_prev').attr('href'));
		a.css({marginLeft:-a.width()/2});
	};
	bd.find('a.rd_prev').mouseover(rdPrev).focus(rdPrev);
	function rdNext(){
		var a = bd.find('.bd_rd_next .wrp');
		$(this).append(a).attr('href',bd.find('.bd_rd_next').attr('href'));
		a.css({marginLeft:-a.width()/2});
	};
	bd.find('a.rd_next').mouseover(rdNext).focus(rdNext);
	// Hide : et_vars, prev_next
	bd.find('.fdb_hide,.rd_file.hide_file,.fdb_lst .cmt_files').hide();
	if(bd.find('.rd table.et_vars th').length) bd.find('.rd table.et_vars').show();
	if(!bd.find('.bd_rd_prev').length) bd.find('a.rd_prev').hide();
	if(!bd.find('.bd_rd_next').length) bd.find('a.rd_next').hide();
	// Read Navi
	bd.find('.print_doc').click(function(){
		if($(this).hasClass('this')){
			print();
		} else {
			window.open(this.href,'print','width=860,height=999,scrollbars=yes,resizable=yes').print();
		};
		return false;
	});
	bd.find('.font_plus').click(function(){
		var c = $('.bd .xe_content');
		var font_size = parseInt(c.css('fontSize'))+1;
		c.css('font-size',''+font_size+'px');
		return false;
	});
	bd.find('.font_minus').click(function(){
		var c = $('.bd .xe_content');
		var font_size = parseInt(c.css('fontSize'))-1;
		c.css('font-size',''+font_size+'px');
		return false;
	});
	// File Type
	if(bdFilesType=='Y'){
		if(bd.find('.rd_file li').length==0){
			bd.find('.rd_file,.rd_nav .file').hide();
		} else {
			if(default_style!='blog'){
				bd.find('.rd_file strong b').text(bd.find('.rd_file li').length);
			} else {
				bd.find('.rd_file strong b').text($(this).parents('.rd').find('.rd_file li').length);
			};
		};
	};

	// Content Images
	if(bdImgOpt) bd.find('.xe_content img').draggable();
	if(bdImgLink){
		bd.find('.xe_content img').click(function(){
			window.location.href=$(this).attr('src');
		});
	};
	// Side Navi Scoll
	if(!bdNavSide){
		$(window).scroll(function(){
			var sT = $(this).scrollTop();
			var o = bd.find('div.rd_nav_side .rd_nav');
			if((sT > bd.find('div.rd_body').offset().top) && (sT < bd.find('hr.rd_end').offset().top-$(this).height())){
				o.fadeIn(200);
			} else {
				o.fadeOut(200);
			};
		});
	};
	// To SNS
	bd.find('.to_sns a').click(function(){
		var t = $(this);
		var type = t.data('type');
		var p = t.parent();
		var href = p.data('url');
		var permanentUrl = p.data('permanenturl');
		var title = p.data('title');
		var img = bd.find('div.xe_content img:first').attr('src');
		if(!type){
			return;
		} else if(type=="facebook"){
			var loc = '//www.facebook.com/sharer/sharer.php?u='+href+'&t='+title;
		} else if(type=="twitter"){
			loc = '//twitter.com/home?status='+encodeURIComponent(title)+' '+href;
		} else if(type=="google"){
			loc = '//plus.google.com/share?url='+href;
		} else if(type=="pinterest"){
			if(!img){
				alert('No Image!');
				return false;
			};
			loc = '//www.pinterest.com/pin/create/button/?url='+href+'&media='+img+'&description='+encodeURIComponent(title);
		} else if(type=="kakaostory"){
			loc = 'https://story.kakao.com/share?url='+encodeURIComponent(href);
		} else if(type=="band"){
			loc = 'http://www.band.us/plugin/share?body='+encodeURIComponent(title)+'%0A'+encodeURIComponent(href);
		} else if(type=="kakao"){
			if(img){
				Kakao.Link.sendTalkLink({
					label:title,
					image:{
						src:img,
						width: '300',
						height: '200'
					},
					webLink:{
						text:permanentUrl,
						url:href
					}
				});
			} else {
				Kakao.Link.sendTalkLink({
					label:title,
					webLink:{
						text:permanentUrl,
						url:href
					}
				});
			};
			return false;
		};
		window.open(loc);
		return false;
	});
	// Comment Count
	if(!bd.find('.rd .nametag').length) bdCmtPn(bd);
	// Editor
	if(bd.find('form.bd_wrt').length){
		bd.find('form>.simple_wrt textarea').focus(function(){
			$(this).parent().parent().next().slideDown();
		})
		.autoGrow();
		bd.find('form [type=submit]').click(function(){
			$.removeCookie('socialxe_content');
		});
		if(bd.find('form>div.wysiwyg').length){
			editorStartTextarea(2,'content','comment_srl');
		} else {
			$.getScript(request_uri+'modules/editor/tpl/js/editor_common.min.js',function(){
				editorStartTextarea(2,'content','comment_srl');
				var cmtWrt = bd.find('form.cmt_wrt textarea');
				if(default_style=='blog'){
					cmtWrt.each(function(){
						editorStartTextarea($(this).attr('id').split('_')[1],'content','comment_srl');
					});
				} else {
					editorStartTextarea(cmtWrt.attr('id').split('_')[1],'content','comment_srl');
					cmtWrt.val($.cookie('socialxe_content'))
					.bind('keydown change',function(){
						$.cookie('socialxe_content',$(this).val());
					});
				};
			});
		};
	};
};

})(jQuery)
}

jQuery(function($){
// NanumPen Font
	$('body').append('<div class="fontcheckWrp"><p id="fontcheck_np1" style="font-family:\'나눔손글씨 펜\',\'Nanum Pen Script\',np,monospace,Verdana !important">Sketchbook5, 스케치북5</p><p id="fontcheck_np2" style="font-family:monospace,Verdana !important">Sketchbook5, 스케치북5</p></div>');
	var bd = $('div.bd');
	if($('#fontcheck_np1').width()==$('#fontcheck_np2').width()){
		bd.removeClass('use_np');
		$.removeCookie('use_np');
	} else {
		bd.addClass('use_np');
		$.cookie('use_np','use_np');
	};
});

// Prev-Next
function bdPrevNext(bd){
	jQuery(document).keydown(function(event){
		var eT = event.target.nodeName.toLowerCase();
		if(eT=='textarea' || eT=='input' || eT=='select') return true;
		var p = bd.find('.bd_rd_prev');
		var n = bd.find('.bd_rd_next');
		// fixed for 'prettyphoto' addon
		if(!jQuery('div.pp_overlay').length){
			if(event.keyCode==37 && p.length){
				window.location.href = p.attr('href');
			} else	if(event.keyCode==39 && n.length){
				window.location.href = n.attr('href');
			} else 	if(event.keyCode==27 && jQuery('#viewer').length){
				self.close();
			} else {
				return true;
			};
		};
	});
}

function reComment(doc_srl,cmt_srl,edit_url){
//!!!S
	jQuery('#comment_'+cmt_srl+' input[name=comment_srl]').val('');
//!!!E
	var o = jQuery('#re_cmt').eq(0);
	o.find('input[name=error_return_url]').val('/'+doc_srl);
	o.find('input[name=mid]').val(current_mid);
	o.find('input[name=document_srl]').val(doc_srl);
	o.appendTo(jQuery('#comment_'+cmt_srl)).fadeIn().find('input[name=parent_srl]').val(cmt_srl);
	o.find('a.wysiwyg').attr('href',edit_url);
//!!!S
  	o.find('strong').html("댓글 쓰기");
	if(bdLogin){
		o.find('.itx_wrp').show();
	}

//!!!E
	o.find('textarea').focus();

//!!!S
	o.find('.reply_stk').attr('onclick', 'loadStickerList(undefined, '+cmt_srl+');');
	o.find('.stk_display').addClass('display-toggle');
	o.find('.stk_display>.stk_head>.sticker_pack, .stk_display>.stk_body').html('');

	jQuery("#re_cmt .simple_wrt textarea").val('');
//!!!E

}

function bdCmtPn(bd){
	var t = jQuery('#'+bd.find('.rd').attr('data-docSrl')+'_comment .bd_pg');
	t.clone().toggleClass('bd_pg cmt_pg').appendTo(t.prev().prev());
}

// FAQ
function bdFaq(a){
	var t = jQuery('#bdFaq_'+a);
	if(t.hasClass('open')){
		t.removeClass('open').find('.a').slideUp(200);
	} else {
		t.addClass('open').find('.a').slideDown(200).end().siblings().removeClass('open').find('.a').slideUp(200);
	};
}

// Cloud Gallery
function bdCloud(bd){
(function($){
	var cGall = bd.find('.bd_cloud');
	var cgRt = bd.find('button.bd_cg_rt');
	var cgRd = bd.find('button.bd_cg_rd');
	var cgRf = bd.find('button.bd_cg_rf');
	var cloud_deg = Number(cGall.attr('data-deg'));
	var cloud_y = Number(cGall.attr('data-y'));
	var thumbnail_width = Number(cGall.attr('data-tmb'));
	var cloud_z = Number(cGall.attr('data-z'));
	counts = [cloud_z+1];
	cGall.find('a').draggable({
		containment:"document",
		start: function(){
			$(this).css('zIndex',counts[0]++)
		}
	});
    function cloud(){
		cGall.find('a').each(function(){
			var t = $(this);
			var m = Math.floor(Math.random()*cloud_deg*2-cloud_deg);
			t.css({
				top:Math.floor(Math.random()*(cloud_y-thumbnail_width-51)),
				left:Math.floor(Math.random()*(cGall.width()-(thumbnail_width+22))),
				'msTransform':'rotate('+m+'deg)',
				'-moz-transform':'rotate('+m+'deg)',
				'-webkit-transform':'rotate('+m+'deg)'
			});
			t.imagesLoaded(function(){
				t.fadeIn(200);
			});
		});
    };
	function yesRand(){
		cGall.removeClass('no_rd');
		cgRd.removeClass('off');
		$.removeCookie('cg_rd');
		cloud();
	};
	function noRand(){
		cGall.addClass('no_rd').css('height','');
		cgRd.addClass('off');
		$.cookie('cg_rd','N');
		noRotate();
		cGall.imagesLoaded(function(){
			if($(window).width()<640){
				cGall.masonry({
					itemSelector:'a',
					isFitWidth:true
				});
			} else {
				cGall.masonry({
					itemSelector:'a',
					isFitWidth:true,
					isAnimated:true,
					animationOptions:{duration:500,easing:'easeInOutExpo',queue:false}
				});
			};
			$(this).find('a').fadeIn(200);
		})
	};
	function yesRotate(){
		if(cGall.hasClass('no_rd')) return true;
		cGall.removeClass('no_rt');
		cgRt.removeClass('off');
		$.removeCookie('cg_rt');
	};
	function noRotate(){
		cGall.addClass('no_rt');
		cgRt.addClass('off');
		$.cookie('cg_rt','N');
	};
	cgRf.click(function(){
		if(cgRd.hasClass('off')){
			cGall.removeClass('no_rd');
			cgRd.removeClass('off');
			$.removeCookie('cg_rd');
		};
		cloud();
	});
	cgRd.click(function(){
		if(cgRd.hasClass('off')){
			yesRand();
		} else {
			noRand();
		};
	});
	cgRt.click(function(){
		if(cgRt.hasClass('off')){
			yesRotate();
		} else {
			noRotate();
		};
	});
	if($(window).width()<640 || cgRd.hasClass('off')){
		noRand();
	} else {
		cloud();
		if(cgRt.hasClass('off')) noRotate();
	};
})(jQuery)
}

// Link Board
function bdLinkBoard(bd){
	if(bd.find('a.viewer_with').hasClass('on')){
		var hx = bd.find('a.hx,.bd_tb_lst .link_url a');
		hx.each(function(){
			jQuery(this).attr('href',jQuery(this).attr('href')+'?iframe=true&width=100%&height=100%').attr('rel','prettyPhoto[iframes]');
		});
		hx.prettyPhoto({hideflash:true,social_tools:false});
	};
}






jQuery(function($){
	window.loadCommentPage = loadCommentPage;
	var document_srl = $('.xe_content[class*=document_]').attr('class') && $('.xe_content[class*=document_]').attr('class').replace(/.*document_([0-9]+).*/,'$1');

	$(document).ready(function(){
		window.completeInsertComment = function(ret_obj){
			var error = ret_obj.error;
			var message = ret_obj.message;
			var mid = ret_obj.mid;
			var document_srl = ret_obj.document_srl;
			var comment_srl = ret_obj.comment_srl;
			//var comment_page = ret_obj.comment_page;

			if(location.href.match(/dispBoardReplyComment/g)||location.href.match(/dispBoardModifyComment/g)){
				var url = current_url.setQuery('mid',mid).setQuery('document_srl',document_srl).setQuery('act','');
				if(comment_srl){
					url = url.setQuery('rnd',comment_srl) + "#comment_"+comment_srl;
				}
				location.href = url;
			}

			loadCommentPage(document_srl, undefined, comment_srl, true);
		}

	});


	var _doCallModuleAction = window.doCallModuleAction;
	window.doCallModuleAction = function(e,t,n) {
		if(t.match(/^procComment(?:Declare|Vote(?:Up|Down))$/))	{
			$.exec_json(e+'.'+t, {target_srl:n}, function(p){
				if(p.message!='success') {
					alert(p.message);
				} else {
					if(t.indexOf('VoteUp') > -1){
						alert("추천했습니다.");
					} else if(t.indexOf('VoteDown') > -1){
						alert("비추천했습니다.");
					} else if(t.indexOf('Declare') > -1){
						alert("신고했습니다.");
					}
				}

				loadCommentPage(document_srl, undefined, 0, true);
			});
		}
		else {
			_doCallModuleAction(e,t,n);
		}
	}


	$("#cmtPosition").on("click", ".fdb_nav [href]", function (e) {
		var href = $(this).attr("href");
		if (href.indexOf("#") > -1) {
			href = href.substring(0, href.indexOf("#"));
		}
		var act = href.getQuery("act");
		var comment_srl = href.getQuery("comment_srl");
		var is_anon = !$("#comment_"+comment_srl+" .meta a[href*='#popup_menu_area']").length;

		if (comment_srl && act == "dispBoardDeleteComment") {
			if(is_anon){
				checkDeleteComment(document_srl,comment_srl);
			} else {
				var cpage = $("#cmtPosition .bd_pg .this").text();
				if(cpage == ""){
					cpage = '1';
				}
				var recomment_count = $(".fdb_itm .re").length;
				var comment_count = $(".fdb_itm").length - recomment_count;
				if(cpage !=1 && 
					((jQuery(".fdb_itm").length == 1) ||
						(comment_count == 1 && $("#comment_"+comment_srl).attr("class").indexOf("re") ==-1) ||
						(comment_count == 0 && $(".fdb_itm").filter(':first').attr("id") == "comment_"+comment_srl)
					)
				){
					cpage--;
				}
				deleteComment(document_srl, comment_srl, cpage);
			}
		} else if (comment_srl && act == "dispBoardModifyComment") {
			if(is_anon){
				checkModifyComment(document_srl,comment_srl, href);
			} else {
				openModifyEditor(document_srl, comment_srl, href);
			}
		} else {
			return true;
		}

		return false;
	});


	$("#cmtPosition").on("click", ".cmt_pg [href],.bd_pg [href]", function (e) {
		var href = $(this).attr("href");
		if (href.indexOf("#") > -1) {
			href = href.substring(0, href.indexOf("#"));
		}
		var cpage = href.replace(/.*cpage=([0-9]+).*/,"$1");

		try {window.history.replaceState({}, 'page', current_url.setQuery('cpage',cpage).setQuery('cpage_detect', '')); }
   	catch(err) { }

		loadCommentPage(document_srl, cpage, 1);

		return false;
	});

	function loadCommentPage(document_srl, cpage, comment_srl, cpage_detect) {
		var url = "//"+location.hostname+"/index.php?mid="+ current_mid +"&document_srl="+ document_srl + (comment_srl ? ("&comment_srl="+comment_srl) : "") + (cpage ? ("&cpage="+cpage) : "") + (cpage_detect ? "&cpage_detect=1" : "");
		if (document.location.protocol == 'https:'){
			url = url.replace('http:', 'https:'); 
		}

		// ajax로 댓글 부분만 새로고침
		$('input[name=comment_srl]').val('');
		if($('div.xpress-editor').length > 0) {	// 댓글 작성후 댓글 에디터 클리어
			var a = $('div.xpress_xeditor_editing_area_container').attr('id').split('-')[3];
			$('#editor_iframe_' + a).contents().find('body').html('');
			if($('#uploaded_file_list_' + a + ' option').length > 0) {
				$('#uploaded_file_list_' + a + ' option').remove();
				$('#preview_uploaded_' + a).empty();
				uploadedFiles = new Array();
				uploaderSettings[a].uploadTargetSrl = '';
			}
		} else if( $('div.xeTextEditor').length > 0 ){
			$('div.xeTextEditor textarea').val('');
		}

		//대댓글 부분 유지
		$('#editor_'+document_srl).val('');
		$(".cmt_editor").append( $("#re_cmt").hide() );
		$(".autogrow-textarea-mirror").html('');

		var is_changed = false;
		$.ajax({
			type:"GET",
			dataType: "html",
			url: url,      
			success: function(response){
				var before_comment_is_exist = !!$('#cmtPosition>ul.fdb_lst_ul').length;
				var $response = $(response);

				// reset ckeditor
				if($('div.cmt_editor').find('.cke').length){
					if(
						$('div.cmt_editor div.cke_contents iframe').contents().find('body').html() != '<p><br></p>' ||
						$('div.cmt_editor span.file_count').text() != '0')
						{
							$('div.cmt_editor').html( $response.find('div.cmt_editor').html() );
							is_changed = true;
					}
				}

				$('#cmtPosition').html($response.find('#cmtPosition').html());
				var after_comment_is_exist = !!$('#cmtPosition>ul.fdb_lst_ul').length;
				if(before_comment_is_exist && !after_comment_is_exist){
					$('.fdb_lst_wrp div.cmt_editor').removeAttr('style');
				} else {
					!$('.cmt_editor').next('#cmtPosition').length && $('.fdb_lst_wrp div.cmt_editor').attr('style', 'margin-top:30px');
				}
			}, 
			complete:function(){
				if($(".bd_pg").length > 0 && $(".nametag").length < 1){
					var t = $('#'+$('.rd').attr('data-docSrl')+'_comment .bd_pg');
					t.clone().toggleClass('bd_pg cmt_pg').appendTo(t.prev().prev());
				}
				board_reinit(typeof(CKEDITOR) !== 'undefined' && is_changed ? true : false);

				if(comment_srl=="0"){
					return;
				} else if(comment_srl=="1"){
					animate("#cmtPosition");
				} else {
					animate("#comment_"+comment_srl);
				}
			},
			error:function(e){  
				alert(e.responseText);
			}  
		}); 

	}

	function checkModifyComment(document_srl, comment_srl, href){
		var params = {
			mid : current_mid,
			document_srl : document_srl,
			comment_srl : comment_srl
		};
		exec_json('comment.getCommentGrant', params, function(ret_obj){
			var error = ret_obj.error;
			var message = ret_obj.message;
			var commentGrant = ret_obj.grant;

			if(!commentGrant){
				var password = prompt("비밀번호를 입력해주세요.", "");
				if (password == null || password == ""){
					return false;
				}
				var params = {
					mid : current_mid,
					document_srl : document_srl,
					comment_srl : comment_srl,
					password : password
				};
				exec_json("board.procBoardVerificationPassword", params, function(){ 
					openModifyEditor(document_srl, comment_srl, href, password);
				});

			} else {
				openModifyEditor(document_srl, comment_srl, href);
			}

		});

	}

	function checkDeleteComment(document_srl, comment_srl){
		var params = {
			mid : current_mid,
			document_srl : document_srl,
			comment_srl : comment_srl
		};
		exec_json('comment.getCommentGrant', params, function(ret_obj){
			var cpage = $("#cmtPosition .bd_pg .this").text();
			if(cpage == ""){
				cpage = 1;
			}
			var recomment_count = $(".fdb_itm .re").length;
			var comment_count = $(".fdb_itm").length - recomment_count;
			if(cpage != 1 && 
				((jQuery(".fdb_itm").length == 1) ||
					(comment_count == 1 && $("#comment_"+comment_srl).attr("class").indexOf("re") == -1) ||
					(comment_count == 0 && $(".fdb_itm").filter(':first').attr("id") == "comment_"+comment_srl)
				)
			){
				cpage--;
			}
			var error = ret_obj.error;
			var message = ret_obj.message;
			var commentGrant = ret_obj.grant;

			if(message != 'success') {
				alert(message);
				return false;
			}
			if(!commentGrant){
				var password = prompt("비밀번호를 입력해주세요.", "");
				if (password == null || password == ""){
					return false;
				}
				var params = {
					mid : current_mid,
					document_srl : document_srl,
					comment_srl : comment_srl,
					password : password
				};
				exec_json("board.procBoardVerificationPassword", params, function(){ 
					deleteComment(document_srl, comment_srl, cpage);
				});

			} else {
				deleteComment(document_srl, comment_srl, cpage);
			}

		});
	}

	function deleteComment(document_srl, comment_srl, cpage){
		var msg = window.confirm('댓글을 삭제하시겠습니까?');
		if(msg){
			var params = new Array();
			params["comment_srl"] = comment_srl;
			params["mid"] = current_mid;
			exec_xml("board","procBoardDeleteComment", params, function(){
				loadCommentPage(document_srl, cpage, 0);
			});
		}
	}

	function animate(where){
		if($("#nc_container").length > 0) {
			$('html,body').animate({scrollTop: ($(where).offset().top-30) }, '300');
		} else {
			$('html,body').animate({scrollTop: ($(where).offset().top) }, '300');
		}
	}


	function openModifyEditor(document_srl, comment_srl, href, password){
		var text = $('#comment_'+comment_srl).find('.xe_content').html();
		if(text.indexOf("<p")+text.indexOf("<div") > -2){
			location.href = href;
		}
		var replace_text = text.replace(/(\n)/g,"").replace(/(<br>)/g,"\n").replace(/<a href[^>]*>/, '').replace(/<\/a>/ig,'');
		var o = $('#re_cmt').eq(0);    

		o.find('input[name=error_return_url]').val('/'+document_srl);
		o.find('input[name=mid]').val(current_mid);
		o.find('input[name=comment_srl]').val(comment_srl);
		o.find('input[name=document_srl]').val(document_srl);
		o.appendTo($('#comment_'+comment_srl)).fadeIn().find('input[name=comment_srl]').val(comment_srl);
		o.find('textarea').val(replace_text).focus();
		o.find('a.wysiwyg').attr('href',href);
	  	o.find('strong').html("댓글 수정");
		o.find('.close').attr("onclick","jQuery('#re_cmt').fadeOut().parent().find('a[href*=\\'dispBoardModifyComment\\']').filter(':first').focus();return false");

		o.find('.reply_stk').attr('onclick', 'loadStickerList(undefined, false, '+comment_srl+');');
		o.find('.stk_display').addClass('display-toggle');
		o.find('.stk_display>.stk_head>.sticker_pack, .stk_display>.stk_body').html('');

		if (!$("#comment_"+comment_srl+" .meta a[href*='#popup_menu_area']").length){
			o.find(".opt_chk").css("display", "none");
		} else {
			o.find(".opt_chk").css("display", "");
		}

		if(o.find('.itx_wrp').length>0){
			var id = $('#comment_'+comment_srl).find('.meta b').text().trim();
			//o.find('.itx_wrp').hide();
			o.find('#nick_name').val(id);
			o.find('#password').val(password ? password : '');
		}
	}


});

function board_reinit(is_reset_editor){
	var module_srl = jQuery('div[id*=bd_]').attr('id');
	module_srl = module_srl ? module_srl.split("_")[1] : 0;
	var document_srl = jQuery('.xe_content[class*=document_]').attr('class') && jQuery('.xe_content[class*=document_]').attr('class').replace(/.*document_([0-9]+).*/,'$1');

	var bd = jQuery("#bd_" + module_srl + "_" + (document_srl || 0));
	bd.find('.fdb_hide,.rd_file.hide,.fdb_lst .cmt_files').hide();

// sketchbook's Toggle2 (Original : XE UI)
	var tgC2 = bd.find( (is_reset_editor ? '.cmt_editor .tg_cnt2, ' : '') + '#cmtPosition .tg_cnt2');
	bd.find((is_reset_editor ? '.cmt_editor .tg_btn2, ' : '') + '#cmtPosition .tg_btn2').click(function(){
		var t = jQuery(this);
		var h = t.attr('data-href');
		if(t.next(h).is(':visible')){
			t.focus().next().fadeOut(200);
		} else {
			tgC2.filter(':visible').hide();
			t.after(jQuery(h)).next().fadeIn(200).css('display','block').find('a,input,button:not(.tg_blur2),select,textarea').eq(0).focus();
		};
		return false;
	});
	function tgClose2(){
		tgC2.filter(':visible').fadeOut(200).prev().focus();
	};
/*	jQuery(document).keydown(function(event){
		if(event.keyCode != 27) return true; // ESC
		return tgClose2();
	});*/
	tgC2.mouseleave(tgClose2);
	bd.find('.tg_blur2').focusin(tgClose2);
	bd.find('.tg_close2,#install_ng2 .close').click(tgClose2);
}
