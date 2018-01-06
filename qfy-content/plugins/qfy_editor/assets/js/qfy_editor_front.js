document.documentElement.className += ' js_active ';
document.documentElement.className += 'ontouchstart' in document.documentElement ? ' vc_mobile ' : ' vc_desktop ';
(function(){
    var prefix = ['-webkit-','-o-','-moz-','-ms-',""];
    for (var i in prefix) { if(prefix[i]+'transform' in document.documentElement.style) document.documentElement.className += " vc_transform "; }
})();

/*
   On document ready jQuery will fire set of functions.
   If you want to override function behavior then copy it to your theme js file
   with the same name.
*/
function vc_js_init(){
	//BEGIN
	jQuery("#shopping-cart-bitcommerce .carsize:not(.pulse1)").addClass("pulse1");
	
	jQuery(".srollupdown:not(.load)").each(function(){
		jQuery(this).addClass("load");
		var all = jQuery(this).attr("data-scroll-all");
		var num = jQuery(this).attr("data-scroll-num");
		var speed = jQuery(this).attr("data-scroll-speed");
		var delay = jQuery(this).attr("data-scroll-delay");
		var slideBox = jQuery(this).find("ul:first");
	
		var allheight = slideBox.css("height").replace("px","")*1;

		var delay = delay||1000,speed = speed||20;
		var tid = null,pause = false;
		var s = function(){		slideBox.attr("style","overflow:hidden !important;height:"+allheight+"px;");slideBox.find("li").removeClass("displaynone");tid=setInterval(slide_scroll, speed); }
		var slide_scroll = function(){
			if(pause) return;
			slideBox.scrollTop(slideBox.scrollTop()+ 2);
			var scrolltop = slideBox.scrollTop();
			if(num>1){
				var first_height = 0;
				var marginbottom =  0;
				slideBox.find("li").each(function(i){
					if(i<num){
						first_height = first_height*1 +jQuery(this).css("height").replace("px","")*1;
						marginbottom =  marginbottom*1 +jQuery(this).css("margin-bottom").replace("px","")*1;
					}
				})
			}else{
				var first_height = slideBox.find("li:eq(0)").css("height").replace("px","");
				var marginbottom =  slideBox.find("li:eq(0)").css("margin-bottom").replace("px","");
			}
			if(scrolltop>=first_height*1+marginbottom*1){
				clearInterval(tid);
				if(num>1){
					slideBox.find("li").each(function(i){
						if(i<num){
							slideBox.append(slideBox.find("li")[0]);
						}
					})
				}else{
					slideBox.append(slideBox.find("li")[0]);
				}
				slideBox.scrollTop(0);
				setTimeout(s, delay);
				}
		}
		slideBox[0].onmouseover=function(){pause=true;}
		slideBox[0].onmouseout=function(){pause=false;}
		setTimeout(s, delay);
	});
	jQuery('.qfy_datatable_event:not(.loaded)').each(function(){
		$this = jQuery(this);
		if(typeof jQuery.fn.DataTable=="undefined"){
			jQuery.getScript("/FeiEditor/bitSite/js/dataTables/jquery.dataTables.js").done(function() {
				 qfy_dataTable_event($this);
			 })
		}else{
			qfy_dataTable_event($this);
		}
	})
	jQuery(".opentip:not(.played)").each(function(){
		var $this = jQuery(this);
		var imageurl = jQuery(this).attr("op-image");
		var title = jQuery(this).attr("op-title");
		var data_pop = jQuery(this).attr("op-style");
		var titlealign = jQuery(this).attr("op-titlealign");
		var stylealign = jQuery(this).attr("op-stylealign");
		var tiptitle= "";
		var download = false;
		if(imageurl){
			
			tiptitle +="<img style='max-width:100%;' src='"+imageurl+"'  />";
		}
		if(title){
			tiptitle +="<div style='margin-top:5px;text-align:"+titlealign+"'>"+title+"</div>";
		}
		if(stylealign){
			var data = { tipJoint:stylealign, fixed:true,style: data_pop };
		}else{
			var data = { style: data_pop };
		}
		if(imageurl){
			jQuery("<img />").attr("src", imageurl).load(function(){
				setTimeout(function(){new Opentip( $this, tiptitle, data);},1500);
			})
			$this.addClass("played");
		   
		}else{
			new Opentip( $this, tiptitle, data);
			$this.addClass("played");
		}
	})
	
	jQuery('.qfy-jiathis:not(".loaded")').each(function(){
		
		var title = jQuery(this).find(".jiathis_style").attr("data-config-title");
		var url = jQuery(this).find(".jiathis_style").attr("data-config-url");
		var imageurl = jQuery(this).find(".jiathis_style").attr("data-config-pic");
		var str = "";
		if(title&&url){
			str = '<script type="text/javascript" >var jiathis_config={url:"'+url+'",summary:"",title:"'+title+'",pic:"'+imageurl+'"}</script>';
		}
		jQuery(this).append(str+'<script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>').addClass("loaded");
	})
	jQuery('.video.preload:not(.played)').each(function(){
		jQuery(this).waypoint({
			handler: function(direction) {
				jQuery(this).addClass("played").attr("src",jQuery(this).attr("data-src"));
			},
			triggerOnce: true,
			offset: "95%",
		})
	})
	
	
	
	vc_royalSlider_gallery_init();
	if(top==self){
		accordioncontent();
	}
	jQuery('.qfy-accordioncontent .a_content .panel-title').each(function(){
		 var curr = jQuery(this);
		 var pcontent = curr.closest(".a_content");
		 curr.unbind();
		 if(pcontent.hasClass("mo")){
			 curr.unbind().bind("mouseenter",function(e){
				  e.stopPropagation();
				 var n = curr.next();
				 var p = curr.closest(".qfy-accordioncontent");
				 var activeicon = p.attr("activeicon");
				 var normalicon = p.attr("normalicon");
				 var animation = p.attr("animation");
				 var hc =  p.attr("hc");
				 var display = n.css("display");
				  if(hc=="true" &&  !curr.hasClass("active")){
					  p.find(".a_content>section,.a_content>div").slideUp(animation,function(){
						var now = jQuery(this);
						
						now.prev().removeClass("active");
						now.prev().find("i").attr("class",normalicon).css("font-size",p.attr("data-normalicon-size")+"px").css("left",p.attr("data-normalicon-position")+"px").css("top",p.attr("data-normalicon-pt")+"px");
						if(p.attr("data-normalicon-scale")!="1"){
							now.prev().find("i").css("transform","scale('"+p.attr("data-normalicon-scale")+"','"+p.attr("data-normalicon-scale")+"')");
						}
					  });
				  }
				  if(display=="none"){
					  n.next().css("visibility","hidden");
					  curr.addClass("active");
					  n.slideDown(animation,function(){
						 n.next().css("visibility","visible");
						 if(jQuery("body").width()<760 && !curr.hasClass("defaultclick")){
							jQuery("html, body").animate({scrollTop: curr.offset().top - 30});
						 }
						 curr.removeClass("defaultclick");
						 if(n.find(".qfe_map_wraper iframe").length>0){
							n.find(".qfe_map_wraper iframe").attr("src",n.find(".qfe_map_wraper iframe").attr("src"));
						 }
					  });
					  curr.find("i").attr("class",activeicon).css("font-size",p.attr("data-activeicon-size")+"px").css("left",p.attr("data-activeicon-position")+"px").css("top",p.attr("data-activeicon-pt")+"px");
					  if(p.attr("data-activeicon-scale")!="1"){
						  curr.find("i").css("transform","scale('"+p.attr("data-activeicon-scale")+"','"+p.attr("data-activeicon-scale")+"')");
						}
					  n.find(".qfe_start_animation").each(function(i){
								var $this = this;
								jQuery($this).removeClass("qfe_start_animation");
								setTimeout(function(){qfe_animate_fun($this);},50);
								
					  })
				  }
			 })
		 }else{
			 curr.unbind().click(function(e){
				  e.stopPropagation();
				  var n = jQuery(this).next();
				  var p = jQuery(this).closest(".qfy-accordioncontent");
				  var activeicon = p.attr("activeicon");
				  var normalicon = p.attr("normalicon");
				  var animation = p.attr("animation");
				  var hc =  p.attr("hc");
				  var display = n.css("display");
				 if(hc=="true"){
					
					 p.find(".a_content>section,.a_content>div").slideUp(animation,function(){
						var now = jQuery(this);
						now.prev().removeClass("active");
						now.prev().find("i").attr("class",normalicon).css("font-size",p.attr("data-normalicon-size")+"px").css("left",p.attr("data-normalicon-position")+"px").css("top",p.attr("data-normalicon-pt")+"px");
						if(p.attr("data-normalicon-scale")!="1"){
							  now.prev().find("i").css("transform","scale("+p.attr("data-normalicon-scale")+","+p.attr("data-normalicon-scale")+")");
						}
					  });
				  }
				 
		
				  if(display=="none"){
					  n.next().css("visibility","hidden");
					  curr.addClass("active");
					  curr.find("i").attr("class",activeicon).css("font-size",p.attr("data-activeicon-size")+"px").css("left",p.attr("data-activeicon-position")+"px").css("top",p.attr("data-activeicon-pt")+"px");
					
					  if(p.attr("data-activeicon-scale")!="1"){
						  curr.find("i").find("i").css("transform","scale("+p.attr("data-activeicon-scale")+","+p.attr("data-activeicon-scale")+")");
					}
					  n.slideDown(animation,function(){
						 n.next().css("visibility","visible");
						 if(jQuery("body").width()<760 && !curr.hasClass("defaultclick")){
							jQuery("html, body").animate({scrollTop: curr.offset().top - 30});
						 }
						 curr.removeClass("defaultclick");
						 if(n.find(".qfe_map_wraper iframe").length>0){
							n.find(".qfe_map_wraper iframe").attr("src",n.find(".qfe_map_wraper iframe").attr("src"));
						 }
					  });
					  
					  n.find(".qfe_start_animation").each(function(i){
								var $this = this;
								jQuery($this).removeClass("qfe_start_animation");
								setTimeout(function(){qfe_animate_fun($this);},50);
								
					  })
				  }else{
					 
					  n.slideUp(animation,function(){
						curr.removeClass("active");
						curr.find("i").attr("class",normalicon).css("font-size",p.attr("data-normalicon-size")+"px").css("left",p.attr("data-normalicon-position")+"px").css("top",p.attr("data-normalicon-pt")+"px");
						if(p.attr("data-normalicon-scale")!="1"){
							  curr.find("i").find("i").css("transform","scale("+p.attr("data-normalicon-scale")+","+p.attr("data-normalicon-scale")+")");
						}
					  });
				  }
			 });
		 }	
	 })
	 
	 
	
	 jQuery('.qfy-accordioncontent:not(.loaded)').each(function(){
		 jQuery(this).addClass("loaded");
		  var accordion_default = jQuery(this).attr("default");
		  
		  if(accordion_default>0){
			 var defaultobj = jQuery(this).find(".a_content .panel-title:eq("+(accordion_default-1)+")");
			 var display =defaultobj.next().css("display");
			 if(top!=self && jQuery("body").hasClass("compose-mode")){
				 //编辑情况
				 if(display=="block"){
					 defaultobj.next().hide();
					 display =defaultobj.next().css("display");
				 }
			 }
			 if(display=="none"){
				defaultobj.addClass("defaultclick");
				if(defaultobj.closest(".a_content").hasClass("mo")){
					defaultobj.mouseenter();
				}else{
					defaultobj.click();
				}
			 }
			 
		  }
	  
	 })

	jQuery( ".dl-qfymobile-menu:not(.loaded)" ).each(function(){
		var backCap = jQuery(this).find(".menu-back").html();
		jQuery(this).find(".children.dl-submenu").prepend("<li class='menu-item dl-back'><a href='#'><span>"+backCap+"</a></li>");
		jQuery(this).addClass("loaded").dlmenu();
	})

	if(top==self){
		jQuery( ".background-media.mediagallery:not(.loaded)" ).each(function(){
			var $this = jQuery(this);
			jQuery(this).addClass("loaded On");
			var imagebgs = jQuery(this).attr("data-imagebgs");
			
			var imagebgs_arr = imagebgs.split("|^|");
			var imagebgs_count = imagebgs_arr.length;
			var imagebgs_current = 0;
			var time =  jQuery(this).attr("data-time")?jQuery(this).attr("data-time"):3;
			var thishtml = $this.prop("outerHTML");
			var tmp = "";
			for(var i=0;i<imagebgs_count-1;i++){
				$this.before(thishtml);
				$this.prev().css({'opacity':'0','background-image': 'url('+imagebgs_arr[i]+')'}).removeAttr("data-imagebgs").removeClass("On");
			}
			var p =  jQuery(this).parent();
			setInterval(function(){
				if(p.attr("id")){
					imagebgs_current = p.find(".background-media.On").index('#'+p.attr("id")+'>.background-media');
				}else{
					imagebgs_current = p.find(".background-media.On").index('.background-media');
				}
				p.find(".background-media.On").removeClass("On").css({'opacity':'0'})
				if(imagebgs_current==imagebgs_count-1){
					p.find(".background-media:eq(0)").addClass("On").css({'opacity':'1'});
				}else{
					p.find(".background-media:eq("+(imagebgs_current+1)+")").addClass("On").css({'opacity':'1'});
				}
			},time*1000);
			
		})
	
	     if(jQuery(".qfy-comments .commentlist:hidden").length>0){
			jQuery(".qfy-comments").each(function(){
				
				var p = jQuery(this);
				if(p.find(".commentlist:visible").length>0) return;
				var loadhtml = "<div class='commentlist_loading' style='text-align:center;height:30px;margin:15px auto;' ><img src='/qfy-content/plugins/qfbook/templates/default/images/loader.gif' /></div>";
				p.find(".commentlist").after(loadhtml);
				
				var form =p.find("form#commentform");
				var comment_post_ID = form.find("#comment_post_ID").val();
				var url  = form.attr("action");
				
				jQuery.post(url,{action:"search",comment_post_ID:comment_post_ID,short_atts:p.attr("data-atts")},function(data){
					if(data.indexOf("success")>-1){
						
						var tmp = data.split('|<result>|');
						var commentlist = $(tmp).find(".commentlist");
						p.find(".commentlist").html(commentlist.html());
					}
					p.find(".commentlist").show();
					p.find(".commentlist_loading").remove();
				})
				
			})
		}
	}

	var objs = jQuery(".qfy-icons_list .qfy-icon");
	objs.each(function(){
		var obj = jQuery(this);
		var name = obj.attr("data-desc");
		var image = obj.attr("data-image");
		var tj = obj.attr("data-tj")=="0"?"top":"bottom";
		var ta = obj.attr("data-ta");
		var width = obj.attr("data-width");
		var align="left";
		if(ta=="1") align="right";
		else if(ta=="2") align="center";
		obj.attr("title", '');
		var text = "";
		if(name){
			text ="<div style='text-align:"+align+";'>"+base64_decode(name)+"</div>";
		}
		if(image){
			if(width){
				var title ="<div style='width:"+width+"px;text-align:center;'><img src='"+image+"' style='max-width:100%;' /><div style='word-break: break-all;'>"+text+"</div></div>";
			}else{
				var title ="<div style='text-align:center;  '><img src='"+image+"' width='160' style='max-width:100%;' /><div style='word-break: break-all;'>"+text+"</div></div>";
			}
			var img = new Image();
	        img.onload = img.onerror =function() {
	        	var data = { tipJoint: tj,style: "dark" };
				new Opentip(obj, title, data);
	        };
	        img.src = image;
		}else if(text){
			if(width){
				var last = "<div style='width:"+width+"px;word-break: break-all;'>"+text+"</div>";
			}else{
				var last = "<div style='word-break: break-all;'>"+text+"</div>";
			}
			
			var data = { tipJoint: tj,style: "dark" };
			new Opentip(obj, last, data);
		}
	})
	jQuery(".qfyvideo").unbind().mouseenter(function(){
		 if(! jQuery(this).parent().hasClass("qfy_popup")){
			 jQuery(this).get(0).play();
		 }
     }).mouseleave(function(){
    	 if(! jQuery(this).parent().hasClass("qfy_popup")){
	    	 if(jQuery(this).get(0).currentTime>0){
	    		 jQuery(this).get(0).load();
	    	 }
    	 }
     })

	
	 jQuery('[data-ride="vc-carousel"]').each(function(){
				qfy_carousel_fun(jQuery(this))
		})
	jQuery(".qfy_scroll_box:not(.load)").each(function(){
		jQuery(this).addClass("load");
		var box = jQuery(this).attr("id");
		var delay = jQuery(this).attr("data-delay");
		var speed = jQuery(this).attr("data-speed");
		var h = jQuery(this).attr("data-h");
		slideLine(box,"div",delay,speed,h);
	});
	jQuery("a[href^='qfy_notice']").unbind().click(function(e){
		 e.preventDefault();
		 e.stopPropagation();
		 var id = jQuery(this).attr("href");
		 if(jQuery("#"+id).length>0){
			 notice_pre_event("#"+id+" .notice_warp","preview");
		 }
	})
	
	jQuery(".qfyanimate:not(.qfyanimated)").each(function(){
		var animaleinbegin =  jQuery(this).attr("data-animaleinbegin");
		if(!animaleinbegin) animaleinbegin = "bottom-in-view";
 		jQuery(this).waypoint({
			handler: function(direction) {
				var delay = jQuery(this).attr("data-delay");
				var duration = jQuery(this).attr("data-duration");
				if(delay===""){
					//专栏使用
					if(jQuery(this).hasClass("qfy-column-inner")){
						delay = jQuery(this).index()*0.1/2;
					}
				}
				var animalename = jQuery(this).attr("data-animalename");
				if(duration){
					jQuery(this).css("animation-duration",duration+"s");
				}
				jQuery(this).css("animation-delay",delay+"s").css("animation-name",animalename).css("visibility","visible");
				jQuery(this).addClass("qfyanimated");
			},
			triggerOnce: true,
			offset: animaleinbegin,
		})
	})
	
	typed_event();
	
	prenext_event();
	//END
}
function vc_js_init2(){
	 //console.trace();
	 init_usermange_detail();
	  vc_slidersBehaviour();
	  vc_waypoints();
	  vc_teaserGrid();
	  vc_carouselBehaviour();
	  vc_plugin_flexslider();
	  resizefullpageheader();
	  bitLibLayout();
	  bit_circliful();
	  bit_counter();
	  bit_counterdown();
	  bit_newgallery();
	  qfy_jplayer_init();
	  bit_myaccountLayout();
	  bit_qfbook();
	  bit_qfbookform();
	  setTimeout(function(){  bit_reloadiframevideo();},1000);
	
}

jQuery(document).ready(function($) {
	
  if(top==self){
	  vc_js_init();
	  vc_js_init2();
  }
  jQuery(document).click(function(e) {
	 if(jQuery("body.clicktoaddmodel").length>0){
		 var target = jQuery(e.target);
		 if(target.closest(".vc-element.vc-vc_row").length==0){
			jAlert("亲，您点在了不能插入区块的地方。请选择内容区域的一个区块。");
			return false;
		 }
	 }
  });

}); // END jQuery(document).ready

jQuery(window).resize(function() {
	 //手机上滚动会触发这个resize
	 var body_width = jQuery("body").width();
	 if(body_width>768){
		 bitLibLayout();
	 }
	 var maxwidth = 0;
	 jQuery(".qfe_gallery .qfe_gallery_slides").find('img').each(function(){
		if(jQuery(this).width()>maxwidth){
			maxwidth = jQuery(this).width();
		}
	 })
	 if(maxwidth>body_width) {
		 vc_plugin_flexslider();
	 }
});
jQuery(window).on("debouncedresize", function() {
		jQuery(".ts-circliful-counter").each(function() {
			if ("true" == jQuery(this).attr("data-responsive")) {
				var t = jQuery(this),
					e = parseInt(jQuery(this).parent().width()),
					a = parseInt(jQuery(this).attr("data-size"));
				e != a && (t.empty(), t.circliful())
			}
		})	
});
function resizefullpageheader(){
	if(jQuery(".bit-html .fullscreenpage.fullpage_layout2").length>0||jQuery(".bit-html .fullscreenpage.fullpage_layout3").length>0||jQuery(".bit-html .fullscreenpage.fullpage_layout4").length>0){
		jQuery(".bit-html .fullscreenpage #fullscreenheader").css("margin-top","-"+(jQuery(".bit-html .fullscreenpage #fullscreenheader").height()/2)+"px");
	}
}
function typed_event(){
	if(jQuery(".qfy-simple_header:not(.loaded)").length==0) return;
	if(typeof Typed!="function"){
		 jQuery.getScript("/FeiEditor/bitSite/js/typed.min.js").done(function() {
			 _typed_event();
		 })
	 }else{
		 _typed_event();
	 }
}
function _typed_event(){
	jQuery(".qfy-simple_header:not(.loaded)").each(function(){
		var $this = jQuery(this);
		$this.addClass("loaded");
		var load = $this.attr("data-load");
		var id =  $this.attr("id");
		var loop = $this.attr("data-loop")=="true"?true:false;
		if($this.attr("data-typeSpeed")){
			var typeSpeed = parseInt($this.attr("data-typeSpeed"));
		}else{
			var typeSpeed = 30;
		}

		if(load=="1"){
			jQuery(this).waypoint({
				handler: function(direction) {
						Typed.new("#"+id+" .qfy-typed", {
					        stringsElement: $this.find(".inner"),
					        typeSpeed: typeSpeed,
					        backDelay: 500,
					        loop: loop,
					        contentType: 'html', // or text
					        loopCount: null,
					    });
				},
				triggerOnce: true,
				offset: "bottom-in-view",
			})
			
		}else{
				 Typed.new("#"+id+" .qfy-typed", {
				        stringsElement: $this.find(".inner"),
				        typeSpeed: typeSpeed,
				        backDelay: 500,
				        loop: loop,
				        contentType: 'html', // or text
				        loopCount: null,
				    });
		}
	})
}
function prenext_event(){
	var lrmiddlelayout = jQuery("#page .lrmiddlelayout:first:not(.loaded)");
	if(lrmiddlelayout.length>0 ){
		lrmiddlelayout.addClass("loaded");
		 jQuery(".lrmiddlelayout.wrap").remove();
		var pre_html = '<div class="lrmiddlelayout wrap" style="position: fixed;top:35%;left:0px;z-index:4;display:table;"><div class="prenext_inner" style="width:auto;">';
		pre_html += lrmiddlelayout.find(".pre_inner").prop("outerHTML");
		pre_html += '</div></div>';
		var next_html = '<div class="lrmiddlelayout wrap" style="position: fixed;top:35%;right:0px;z-index:4;display:table;"><div class="prenext_inner" style="width:auto;">';
		next_html += lrmiddlelayout.find(".next_inner.first").prop("outerHTML");
		next_html += '</div></div>';
		jQuery("body").append(pre_html+next_html);
	}
	if( jQuery("#page .lrmiddlelayout").length==0){	
		jQuery(".lrmiddlelayout.wrap").remove();
	}
}
function bit_circliful(obj){
	//don't support ie8
	if (jQuery.browser.version < 10.0) {
		return false;
	}
	if( "undefined" != typeof obj ){
		obj = obj.find(".ts-circliful-counter:not(.loaded)");
	}else{
		obj	= jQuery(".ts-circliful-counter:not(.loaded)");
	}
	if(obj.length==0) return;
	if(typeof jQuery.fn.circliful=="undefined"){
		jQuery.getScript("/qfy-content/plugins/qfy_editor/js/jquery.circliful.min.js").done(function() {
			_bit_circliful(obj);
		 })
	}else{
		_bit_circliful(obj);
	}
	
}
function _bit_circliful(obj){
	"undefined" != typeof jQuery.fn.waypoint && "undefined" != typeof jQuery.fn.circliful && obj.each(function() {
		jQuery(this).bind("inview", function(t, e, a, i) {
			if (e) {
				var r = jQuery(this);
				"top" == i || "bottom" == i || r.addClass("ts-circliful-visible")
			} else {
				var r = jQuery(this);
				r.removeClass("ts-circliful-visible")
			}
		})
				
		jQuery(this).addClass("loaded").circliful();
		
	});
}
function formatNumber(s,o){
	 s = s+"";
	 if(/[^0-9\.]/.test(s)) return false;
        s=s.replace(/^(\d*)$/,"$1.");
        s=s.replace(".",o);
        var re=/(\d)(\d{3},)/;
        while(re.test(s))
                s=s.replace(re,"$1,$2");
        s=s.replace(/,(\d\d)$/,".$1");
		s=s.substring(0,s.length-1);
        return s;
}
function qfy_dataTable_event($this){
	$this.addClass("loaded");
	var alltext = base64_decode($this.attr("data-r-alltext"));
	var obj=jQuery.parseJSON(alltext);

	$this.DataTable( {
	    "lengthMenu": [[20, 40, 100, -1], [20, 40, 100, "全部"]],
	     "searching": $this.attr("data-r-search")=="1"?true:false,
	     "ordering": $this.attr("data-r-order")=="1"?true:false,
	    //"filter": false,
	     "info": $this.attr("data-r-info")=="1"?true:false,
	    "paginate": $this.attr("data-r-paginate")=="1"?true:false,
        "processing": true,
        //"scrollX": true,
        "serverSide": true,
        "rowReorder": {
            selector: 'td:nth-child(2)'
        },
        "responsive": true,
        "language": {
            "lengthMenu": obj.table_text_lengthmenu+"_MENU_"+obj.table_text_dw,
            "zeroRecords": obj.table_text_zerorecords,
            "info": obj.table_text_info+" _PAGE_ of _PAGES_",
            "infoEmpty": obj.table_text_infoempty,
            "infoFiltered": "",
            "processing":     obj.table_text_processing,
            "search":         obj.table_text_search,
            "paginate": {
                "first":      obj.table_text_first,
                "last":       obj.table_text_last,
                "next":       obj.table_text_next,
                "previous":   obj.table_text_previous
            },
        },
         "ajax": {
        	 "url": "/admin/admin-ajax.php",
        	 "type": "POST",
        	 "data": function ( d ) {
                 d.action = "qfy_dy_user_list";
                 d.customcontenttype = $this.attr("data-r-type");
                 d.customcontent = $this.attr("data-r-param");
             }
         },

    } );
}

function bit_counter(obj){
	if( "undefined" != typeof obj ){
		obj = obj.find(".ts-icon-counter");
		if(obj.length==0) return false;
	}else{
		obj	= jQuery(".ts-icon-counter");
	}
	if(obj.length==0) return;
	 if(typeof jQuery.fn.countTo=="undefined"){
		 jQuery.getScript("/qfy-content/plugins/qfy_editor/js/jquery.countto.min.js").done(function() {
			 _bit_counter(obj);
		 })
	 }else{
		 _bit_counter(obj);
	 }
}
function _bit_counter(obj){

	 "undefined" != typeof jQuery.fn.waypoint && obj.waypoint({
			handler: function() {
					var t = parseInt(jQuery(this).find(".ts-counter-value").attr("data-start")),
						e = parseInt(jQuery(this).find(".ts-counter-value").attr("data-end")),
						a = parseInt(jQuery(this).find(".ts-counter-value").attr("data-speed")),
						i = jQuery(this).find(".ts-counter-value").attr("data-before"),
						r = jQuery(this).find(".ts-counter-value").attr("data-after"),
						s = jQuery(this).find(".ts-counter-value").attr("data-format"),
						n = jQuery(this).find(".ts-counter-value").attr("data-plus"),
						o = jQuery(this).find(".ts-counter-value").attr("data-seperator"),
						u = jQuery(this).find(".ts-counter-value").attr("data-animation"),
						d = jQuery(this).find(".ts-font-icon");
					jQuery(this).find(".ts-counter-value").countTo({
						from: t,
						to: e,
						speed: a,
						refreshInterval: 50,
						decimals: 0,
						formatter: function(t, e) {
							return i + t.toFixed(e.decimals) + r
						},
						onUpdate: function() {},
						onComplete: function() {
							
							"true" == s ? "true" == n && "" != o ? jQuery(this).empty().html(i + formatNumber(e, o) + "+" + r) : "true" == n ? jQuery(this).empty().html(i + e + "+" + r) : "" != o ? jQuery(this).empty().html(i + formatNumber(e, o) + r) : jQuery(this).empty().html(i + e + r) : jQuery(this).empty().html(e), d.addClass(u), setTimeout(function() {
							d.removeClass(u)
							}, 2e3)
						}
					})
			},
			offset: "85%",
			triggerOnce: !0
		})

}

function bit_newgallery(obj){
	
	if( "undefined" != typeof obj ){
		obj = obj.find(".royalSlider_gallery");
		if(obj.length==0) return false;
	}else{
		obj	= jQuery(".royalSlider_gallery");
	}
	 if(obj.length==0) return;
	 if(typeof jQuery.fn.royalSlider=="undefined"){
		 jQuery.getScript("/FeiEditor/bitSite/js/jquery.royalslider.min.js").done(function() {
			 _bit_newgallery(obj);
		 })
	 }else{
		 _bit_newgallery(obj);
	 }
	
}
function _bit_newgallery(obj){
	obj.each(function(){
		var imageScaleMode = jQuery(this).attr("imageScaleMode")?jQuery(this).attr("imageScaleMode"):"fit-if-smaller";
		var slidesOrientation = jQuery(this).attr("slidesOrientation")?jQuery(this).attr("slidesOrientation"):"horizontal";
		//var autoScaleSlider = jQuery(this).attr("autoScaleSlider")==""?true:false;
		var arrowsNavAutoHide = jQuery(this).attr("arrowsNavAutoHide")=="true"?true:false;
		//var showfullscreen = jQuery(this).attr("showfullscreen")=="true"?true:false;
		var g_width = jQuery(this).attr("g_width")?jQuery(this).attr("g_width"):"";
		var g_height = jQuery(this).attr("g_height")?jQuery(this).attr("g_height"):"";
		var transitionSpeed = jQuery(this).attr("transitionSpeed");
		var loop = jQuery(this).attr("g_loop")=="true"?true:false;
		var visiblenearby = jQuery(this).attr("visiblenearby")=="true"?true:false;
		var autoPlay  = jQuery(this).attr("auto_Play")=="true"?true:false;
		var arrowsNav = jQuery(this).attr("arrowsNav")=="true"?true:false;
		
		var controlNavigation = jQuery(this).attr("controlNavigation");
		if(controlNavigation=="thumbnails") controlNavigation="thumbnails";
		else if(controlNavigation=="none") controlNavigation="none";
		else controlNavigation = "bullets";
		var thumbnails_orientation = jQuery(this).attr("thumbnails_orientation")?jQuery(this).attr("thumbnails_orientation"):"horizontal";
		var disabledclick = jQuery(this).attr("disabledclick")=="true"?false:true;
		jQuery(this).royalSlider({
		    fullscreen: {
			      enabled: true,
			      nativeFS: true
			    },
			    controlNavigation: controlNavigation,
				slidesOrientation:slidesOrientation,
			    autoScaleSlider: false, 
			    autoScaleSliderWidth: g_width,     
			    autoScaleSliderHeight: g_height,
			    loop: loop,
			    imageScaleMode: imageScaleMode,
			    navigateByClick: disabledclick,
			    numImagesToPreload:2,
			    arrowsNav:arrowsNav,
			    arrowsNavAutoHide: arrowsNavAutoHide,
			    arrowsNavHideOnTouch: true,
			    keyboardNavEnabled: true,
			    fadeinLoadedSlide: true,
			    globalCaption: false,
			    globalCaptionInside: false,
			    addActiveClass:true,
			    thumbs: {
				  orientation :thumbnails_orientation, 
			      appendSpan: true,
			      firstMargin: true,
			      paddingBottom: 4
			    },
			    visibleNearby: {
			        enabled: visiblenearby,
			        centerArea: 0.7,
			        center: true,
			        breakpoint: 650,
			        breakpointCenterArea: 0.64,
			        navigateByCenterClick: true
			    },
			    autoPlay: {
		    		enabled: autoPlay,
		    		pauseOnHover: true
		    	}
			  });
	})

}
function fullscreenclick(obj){	
	jQuery(obj).closest(".royalSlider_gallery").find(".rsFullscreenIcn").click();
}
function bit_myaccountLayout(){
	var defaultindex=getCookie("qfy_order_index");
	
	if(jQuery(".qfy_account.tablayout").length>0 && jQuery(".qfy_account.tablayout.ontab").length==0){
		jQuery(".qfy_account > .bitcommerce").append('<div class="bitcommerce-tabs tabbed-content bitcommerce-tabs-info" style="min-height:500px;"><ul class="tabs"></ul></div>	');
		
		jQuery(".qfy_account .my_account_orders_h2").each(function(i){
			var name = jQuery(this);
			var content = jQuery(this).next();
			if(content.hasClass("my_account_orders_h2")||content.hasClass("bitcommerce-tabs-info")||content.length==0){
				content_html = '<div style="min-height:400px;"></div>';
			}else{
				content_html = content.prop('outerHTML');
				content.remove();
			}
			jQuery( '.bitcommerce-tabs-info ul.tabs' ).append('<li class="description_tab active"><a href="#tab-info-'+i+'" class="no-opennew">'+name.text()+'</a></li>');
			jQuery( '.bitcommerce-tabs-info ul.tabs' ).after('<div style="word-break: break-all; display: block;" id="tab-info-'+i+'" class="panel entry-content">'+content_html+'</div>');
			name.remove();
			
		});
		jQuery(".qfy_account.tablayout").addClass("ontab");
		var titlesize = jQuery(".qfy_account.tablayout").attr("data-size");
		if(titlesize){
			jQuery( '.bitcommerce-tabs-info ul.tabs li a' ).css("font-size",titlesize+"px");
		}
		jQuery( '.bitcommerce_account_subscriptions').hide();
		jQuery( '.bitcommerce-tabs-info .panel' ).hide();
		jQuery( '.bitcommerce-tabs-info ul.tabs li a' ).click( function() {
			
			var $tab = jQuery( this ),
				$tabs_wrapper = $tab.closest( '.bitcommerce-tabs-info' );
	
			jQuery( 'ul.tabs li', $tabs_wrapper ).removeClass( 'active' );
			jQuery( 'div.panel', $tabs_wrapper ).hide();
			jQuery( 'div' + $tab.attr( 'href' ), $tabs_wrapper).show();
			$tab.parent().addClass( 'active' );
			var index = $tab.parent().index();
			qfy_setCookie("qfy_order_index",index);
			return false;
		});
		if(defaultindex>0){
			jQuery( '.bitcommerce-tabs-info ul.tabs li:eq('+defaultindex+') a' ).click();
		}else{
			jQuery( '.bitcommerce-tabs-info ul.tabs li:first a').click();
		}
	}

}
function bit_qfbook(){
	setTimeout(function(){
		jQuery(".QFBOOKCalendar-text-message").each(function(){
			var $this = jQuery(this);
			var id = $this.attr("id");
			var val = $this.val();
			jQuery("#QFBOOKCalendar"+id).QFBOOKCalendar(jQuery.parseJSON(val));
			
		})
		jQuery(".QFBOOKCalendar-search-message").each(function(){
			var $this = jQuery(this);
			var id = $this.attr("id");
			var val = $this.val();
			jQuery(".QFBOOKSearch-wrapper"+id).QFBOOKSearch(jQuery.parseJSON(val));
			
		})
	},500)
}
function bit_qfbookform(){	
	if(jQuery('#QFBOOKSearch-check-in-input').length>0){
		jQuery('#QFBOOKSearch-check-in-input').datepicker({minDate: new Date(), onSelect:function(dateText,inst){
	       jQuery("#QFBOOKSearch-check-out-input").datepicker("option","minDate",dateText);
	    }});
	}
	if(jQuery('#QFBOOKSearch-check-out-input').length>0){
	    jQuery('#QFBOOKSearch-check-out-input').datepicker({minDate: new Date(), onSelect:function(dateText,inst){
	       jQuery("#QFBOOKSearch-check-in-input").datepicker("option","maxDate",dateText);
	    }});
	}
}
function bit_reloadiframevideo(time){
	if(jQuery("div.ts_html5_video_frame_insert").length>0){
		jQuery("div.ts_html5_video_frame_insert").each(function(){
			var $this = jQuery(this);
			var auto_play = $this.attr("data-auto-play");
			if(auto_play=="true"){
				$this = $this.changeTag("iframe");
			}else{
				$this.unbind().click(function(){
					$this.changeTag("iframe").attr("data-auto-play","true");
				})
			}
		})
	}
}
function qfy_jplayer_init(){
	 if( jQuery(".vc_jplayer_container:not(.played)").length==0) return;
	 if(typeof jQuery.fn.videoPlayer=="undefined"){
			 jQuery.when(
				 jQuery.getScript( "/FeiEditor/bitSite/js/jsplayer/jplayer/jquery.jplayer.min.js" ),
				 jQuery.getScript( "/FeiEditor/bitSite/js/jsplayer/jplayer/jplayer.cleanskin.js" ),
				 jQuery.Deferred(function( deferred ){
					 jQuery( deferred.resolve );
			    })
			).done(function(){
				 _qfy_jplayer_init();
			});
			
	 }else{
		 _qfy_jplayer_init();
	 }

}
function _qfy_jplayer_init(){
	//音频
	jQuery(".vc_jplayer_container:not(.played)").each(function(){
		var title = jQuery.trim(jQuery(this).find(">.audio-info").html());
		var mp3 = jQuery(this).find(">.audio-info").attr("data-mp3");
		var autoplay =  jQuery(this).find(">.audio-info").attr("data-auto");
		if(autoplay!=1) autoplay=null;
		var loop =  jQuery(this).find(">.audio-info").attr("data-loop");
		if(loop==1){loop=true;}else{loop=false;};
		jQuery(this).find('>.webPlayer').videoPlayer({
				"name": title,
				"autoplay":autoplay,
				"keyEnabled":false,
				"loop":loop,
				"swfPath":"/FeiEditor/bitSite/js/jsplayer/jplayer",
				"size": {"width": "100%",},
				"media": {"mp3": mp3}
				});
		jQuery(this).addClass("played");
	})
}
function bit_counterdown(){
	 if(jQuery(".ts-countdown-parent").length==0) return;
	 if(typeof jQuery.fn.countEverest=="undefined"){
		 jQuery.getScript("/FeiEditor/bitSite/js/jquery.vcsc.counteverest.min.js").done(function() {
			 jQuery('head').append('<link href="/FeiEditor/bitSite/css/jquery.vcsc.counteverest.min.css" rel="stylesheet" type="text/css" />');
			 _bit_counterdown();
		 })
	 }else{
		 _bit_counterdown();
	 }
}
function _bit_counterdown(){
	jQuery(".ts-countdown-parent").each(function() {
			$TS_VCSC_Countdown_DaysLabel = $TS_VCSC_Countdown_DayLabel = jQuery(this).parent().find(".hidecountdownlabel").data("day");
			$TS_VCSC_Countdown_HoursLabel =  $TS_VCSC_Countdown_HourLabel = jQuery(this).parent().find(".hidecountdownlabel").data("hour");
			$TS_VCSC_Countdown_MinutesLabel =  $TS_VCSC_Countdown_MinuteLabel = jQuery(this).parent().find(".hidecountdownlabel").data("minute");
			$TS_VCSC_Countdown_SecondsLabel =  $TS_VCSC_Countdown_SecondLabel  = jQuery(this).parent().find(".hidecountdownlabel").data("second");
			function t(_) {
				var k = new Date,
					z = Date.UTC(k.getFullYear(), k.getMonth(), k.getDate()),
					P = k.getTimezoneOffset() / -60;
				if (0 == u && (u = P), 1 == r && 0 == o) {
					k.setHours(k.getHours() + parseInt(Q)), k.setMinutes(k.getMinutes() + parseInt(w)), k.setSeconds(k.getSeconds() + parseInt(b)), z = Date.UTC(k.getFullYear(), k.getMonth(), k.getDate()), $countdown_target_day = k.getDate(), $countdown_target_month = k.getMonth() + 1, $countdown_target_year = k.getFullYear(), $countdown_target_hour = k.getHours(), $countdown_target_minute = k.getMinutes(), $countdown_target_second = k.getSeconds(); {
						var E = new Date($countdown_target_year, k.getMonth(), $countdown_target_day, $countdown_target_hour, $countdown_target_minute, $countdown_target_second, 0);
						Date.UTC($countdown_target_year, k.getMonth(), $countdown_target_day, $countdown_target_hour, $countdown_target_minute, $countdown_target_second, 0)
					}
				} else if (1 == o) {
					$countdown_target_day = k.getDate(), $countdown_target_month = k.getMonth() + 1, $countdown_target_year = k.getFullYear(), $countdown_target_hour = k.getHours(), $countdown_target_minute = k.getMinutes(), $countdown_target_second = k.getSeconds(); {
						var E = new Date($countdown_target_year, k.getMonth(), $countdown_target_day, $countdown_target_hour, $countdown_target_minute, $countdown_target_second, 0);
						Date.UTC($countdown_target_year, k.getMonth(), $countdown_target_day, $countdown_target_hour, $countdown_target_minute, $countdown_target_second, 0)
					}
				} else if (1 == s) {
					k.getHours() >= parseInt(y) && k.getMinutes() >= parseInt(v) && k.getSeconds() >= parseInt(j) && k.setDate(k.getDate() + 1), $countdown_target_day = k.getDate(), $countdown_target_month = k.getMonth() + 1, $countdown_target_year = k.getFullYear(), $countdown_target_hour = parseInt(y), $countdown_target_minute = parseInt(v), $countdown_target_second = parseInt(j); {
						var E = new Date($countdown_target_year, k.getMonth(), $countdown_target_day, $countdown_target_hour, $countdown_target_minute, $countdown_target_second, 0);
						Date.UTC($countdown_target_year, k.getMonth(), $countdown_target_day, $countdown_target_hour, $countdown_target_minute, $countdown_target_second, 0)
					}
				} else {
					$countdown_target_day = parseInt(m), $countdown_target_month = parseInt(f), $countdown_target_year = parseInt(g), $countdown_target_hour = parseInt(y), $countdown_target_minute = parseInt(v), $countdown_target_second = parseInt(j); {
						var E = new Date($countdown_target_year, $countdown_target_month - 1, $countdown_target_day, $countdown_target_hour, $countdown_target_minute, $countdown_target_second, 0);
						Date.UTC($countdown_target_year, $countdown_target_month - 1, $countdown_target_day, $countdown_target_hour, $countdown_target_minute, $countdown_target_second, 0)
					}
				}
				n = 0 == s && (k > E && 1 == n || 1 == o) ? !0 : !1, e.countEverest({
					day: $countdown_target_day,
					month: $countdown_target_month,
					year: $countdown_target_year,
					hour: $countdown_target_hour,
					minute: $countdown_target_minute,
					second: $countdown_target_second,
					countUp: n,
					leftHandZeros: d,
					timeZone: u,
					wrapDigits: "horizontal" == i ? !1 : !0,
					daysLabel: $TS_VCSC_Countdown_DaysLabel,
					dayLabel: $TS_VCSC_Countdown_DayLabel,
					daysWrapper: "horizontal" == i ? ".ce-days .ce-flip-back" : ".ce-days",
					hoursLabel: $TS_VCSC_Countdown_HoursLabel,
					hourLabel: $TS_VCSC_Countdown_HourLabel,
					hoursWrapper: "horizontal" == i ? ".ce-hours .ce-flip-back" : ".ce-hours",
					minutesLabel: $TS_VCSC_Countdown_MinutesLabel,
					minuteLabel: $TS_VCSC_Countdown_MinuteLabel,
					minutesWrapper: "horizontal" == i ? ".ce-minutes .ce-flip-back" : ".ce-minutes",
					secondsLabel: $TS_VCSC_Countdown_SecondsLabel,
					secondLabel: $TS_VCSC_Countdown_SecondLabel,
					secondsWrapper: "horizontal" == i ? ".ce-seconds .ce-flip-back" : ".ce-seconds",
					onInit: function() {},
					beforeCalculation: function() {},
					afterCalculation: function() {
						if ("flipboard" == i) {
							var t = this,
								a = {
									days: this.days,
									hours: this.hours,
									minutes: this.minutes,
									seconds: this.seconds
								},
								r = {
									hours: "23",
									minutes: "59",
									seconds: "59"
								},
								s = "active",
								o = "before";
							1 == L && 1 == _ ? (L = !1, e.find(".unit-wrap div").each(function() {
								for (var t = jQuery(this), e = t.attr("class"), i = a[e], r = "", s = "", n = 0; 10 > n; n++) r += ['<div class="digits-inner">', '<div class="flip-wrap">', '<div class="up">', '<div class="shadow"></div>', '<div class="inn">' + n + "</div>", "</div>", '<div class="down">', '<div class="shadow"></div>', '<div class="inn">' + n + "</div>", "</div>", "</div>", "</div>"].join("");
								for (var o = 0; o < i.length; o++) s += '<div class="digits">' + r + "</div>";
								t.append(s)
							})) : 1 == L && 0 == _ && (L = !1), jQuery.each(a, function(a) {
								for (var i, d = e.find("." + a + " .digits").length, u = r[a], l = t.strPad(this, d, "0"), c = l.length - 1; c >= 0; c--) {
									var h = e.find("." + a + " .digits:eq(" + c + ")"),
										p = h.find("div.digits-inner");
									i = u ? n ? 9 == u[c] ? 0 : u[c] : 0 == u[c] ? 9 : u[c] : n ? 0 : 9;
									var m = parseInt(l[c]);
									if (n) var f = m == i ? 9 : m - 1;
									else var f = m == i ? 0 : m + 1;
									p.eq(f).hasClass(s) && p.parent().addClass("play"), p.removeClass(s).removeClass(o), p.eq(m).addClass(s), p.eq(f).addClass(o)
								}
							})
						}
					},
					onChange: function() {
						if ("bars" == i && ("true" == l && TS_VCSC_Countdown_SetBar(I, this.days, 365), "true" == c && TS_VCSC_Countdown_SetBar(S, this.hours, 24), "true" == h && TS_VCSC_Countdown_SetBar(T, this.minutes, 60), "true" == p && TS_VCSC_Countdown_SetBar($, this.seconds, 60)), "columns" == i && "true" == x) {
							var t = 0;
							e.find(".col").each(function() {
								jQuery(this).width() > t && (t = jQuery(this).width())
							}), e.find(".col").each(function() {
								jQuery(this).width(t)
							})
						}
						"clock2" == i && TS_VCSC_Countdown_Animate(e.find(".number")), "circles" == i && ("true" == l && TS_VCSC_Countdown_DrawCircle(document.getElementById("days_" + a), this.days, 365, D, M, H), "true" == c && TS_VCSC_Countdown_DrawCircle(document.getElementById("hours_" + a), this.hours, 24, D, V, H), "true" == h && TS_VCSC_Countdown_DrawCircle(document.getElementById("minutes_" + a), this.minutes, 60, D, A, H), "true" == p && TS_VCSC_Countdown_DrawCircle(document.getElementById("seconds_" + a), this.seconds, 60, D, F, H)), "horizontal" == i && TS_VCSC_Countdown_Animate3D(e.find(".col").find("div:first-child"), this)
					},
					onComplete: function() {
						1 == r && (e.countEverest("destroy"), jQuery("#ts-vcsc-countdown-" + a + "_link").click(), "true" == C && t(!1)), 1 == s && (e.countEverest("destroy"), t(!0))
					}
				})
			}
			var e = jQuery(this).find(".ts-countdown"),
				a = jQuery(this).attr("data-id"),
				i = jQuery(this).attr("data-type"),
				r = "true" == jQuery(this).attr("data-reset") ? !0 : !1,
				s = "true" == jQuery(this).attr("data-repeat") ? !0 : !1,
				n = "true" == jQuery(this).attr("data-countup") ? !0 : !1,
				o = "true" == jQuery(this).attr("data-pageload") ? !0 : !1,
				d = "true" == jQuery(this).attr("data-zeros") ? !0 : !1,
				u = jQuery(this).attr("data-zone");
			u = "false" != u ? parseInt(u) : !1; {
				var l = jQuery(this).attr("data-show-days"),
					c = jQuery(this).attr("data-show-hours"),
					h = jQuery(this).attr("data-show-minutes"),
					p = jQuery(this).attr("data-show-seconds"),
					m = jQuery(this).attr("data-day"),
					f = jQuery(this).attr("data-month"),
					g = jQuery(this).attr("data-year"),
					y = jQuery(this).attr("data-hour"),
					v = jQuery(this).attr("data-minute"),
					j = jQuery(this).attr("data-second"),
					Q = jQuery(this).attr("data-resethours"),
					w = jQuery(this).attr("data-resetminutes"),
					b = jQuery(this).attr("data-resetseconds"),
					C = jQuery(this).attr("data-resetrestart"),
					_ = jQuery(this).attr("data-resetlink");
				jQuery(this).attr("data-resettarget")
			}
			if ("" != _ && jQuery("#ts-vcsc-countdown-" + a + "_link").click(function(t) {
				t.preventDefault();
				var e = jQuery(this),
					a = e.attr("target");
				jQuery.trim(a).length > 0 ? window.open(e.attr("href"), a) : window.location = e.attr("href")
			}), "columns" == i) var x = jQuery(this).attr("data-equalize");
			if ("bars" == i) {
				var k = jQuery(this),
					I = (k.find("#ce-days_" + a), k.find("#ce-hours_" + a), k.find("#ce-minutes_" + a), k.find("#ce-seconds_" + a), jQuery("#bar-days_" + a).find(".fill")),
					S = jQuery("#bar-hours_" + a).find(".fill"),
					T = jQuery("#bar-minutes_" + a).find(".fill"),
					$ = jQuery("#bar-seconds_" + a).find(".fill"),
					z = new Date;
				new Date(z.getTime() + 12096e5)
			}
			if ("circles" == i) var D = jQuery(this).attr("data-color-back"),
				M = jQuery(this).attr("data-color-days"),
				V = jQuery(this).attr("data-color-hours"),
				A = jQuery(this).attr("data-color-minutes"),
				F = jQuery(this).attr("data-color-seconds"),
				H = jQuery(this).attr("data-color-width");
			if ("horizontal" == i && (-1 !== navigator.userAgent.indexOf("MSIE") || navigator.appVersion.indexOf("Trident/") > 0) && jQuery("html").addClass("internet-explorer"), "flipboard" == i) var L = !0;
			t(!0)
		});

}
function bitLibLayout(obj){
   jQuery(".old-ie [backgroundSize='true']").css({backgroundSize: "cover"});

   if (typeof obj === 'undefined') {
		obj = jQuery(".qfe_images_lib_isotope")
   }
   obj.each(function () {
	   var current_obj = jQuery(this);
	   var curr_action = current_obj.attr("data-liblayout");
	   var filter = jQuery(this).parent().find(".isotope_image");
	   filter.each(function(){
			jQuery(this).unbind("click").bind("click",function(){
				 var f = jQuery(this).attr("data-filter");
				 var c = jQuery(this).closest(".vcgroup").attr("data-color");
				 var hc = jQuery(this).closest(".vcgroup").attr("data-hovercolor");
				 filter.removeClass("on");
				 filter.css("color",c);
				 jQuery(this).addClass("on");
				 jQuery(this).css("color",hc);
				if(curr_action=="" || curr_action=="undefined"){
					current_obj.find(">.vc-item").hide();
					current_obj.find(f).show();
				}else{
				  
				   current_obj.isotope({
					filter: f
				   });
				}
		   }).bind("mouseover",function(){
				 var hc = jQuery(this).closest(".vcgroup").attr("data-hovercolor");
				 if( !jQuery(this).hasClass("on")){
					jQuery(this).css("color",hc);
				 }
				
		   }).bind("mouseout",function(){
				 var c = jQuery(this).closest(".vcgroup").attr("data-color");
				 if( !jQuery(this).hasClass("on")){
					jQuery(this).css("color",c);
				 }
				
		   })
	   });
   });

 
   var action = obj.attr("data-liblayout");
   var columnWidth= obj.attr("data-width");

   if(obj.length==0 || action=="" || action=="undefined"){
	  return false;
   }
   obj.isotope({
		itemSelector: '.vc-item',
		layoutMode : action,
		 filter: ".images,.templates"
	
   });
   
   var all_load = true;
   
   obj.find('img').each(function(){
	   if(!jQuery(this).prop('complete')){
		   all_load = false;
	   }
   });
   
   if(!all_load) {
	  window.setTimeout(function(){
		  bitLibLayout(obj);
	  }, 500);
	  return;
   }
   obj.isotope("reLayout");
}


if ( typeof window['vc_plugin_flexslider'] !== 'function' ) {
 function vc_plugin_flexslider() {
	 if( jQuery('.qfe_flexslider').length==0) return;
	 if(typeof jQuery.fn.flexslider=="undefined"){
		 jQuery.getScript("/qfy-content/plugins/qfy_editor/assets/lib/flexslider/jquery.flexslider-min.js").done(function() {
			 jQuery('head').append('<link href="/qfy-content/plugins/qfy_editor/assets/lib/flexslider/flexslider.css" rel="stylesheet" type="text/css" />');
			 _vc_plugin_flexslider();
		 })
	 }else{
		 _vc_plugin_flexslider();
	 }
 }
 function _vc_plugin_flexslider(){
	 jQuery('.qfe_flexslider').each(function() {
			
	     var this_element = jQuery(this);
	     var sliderSpeed = 800,
	       sliderTimeout = parseInt(this_element.attr('data-interval'))*1000,
	       sliderFx = this_element.attr('data-flex_fx'),
	       sliderShowDirection = this_element.attr('data-direction'),
	       sliderShowBottomNav = this_element.attr('data-bottom_nav'),
		   minItems = this_element.attr('data-per-view'),
		    itemWidth = this_element.attr('data-itemWidth'),
			
	       slideshow = true;
		 var body_width = jQuery("body").width();
		 var img =null;
		 var maxwidth = 0;
		 this_element.find('img').each(function(){
			if(jQuery(this).width()>maxwidth){
				maxwidth = jQuery(this).width();
				img = jQuery(this);
			}
		 })

		 if(maxwidth>body_width) {
			  this_element.parent().parent().css("max-width","100%");
			  this_element.parent().parent().css("max-height","auto");
		 }else{
			  this_element.parent().parent().css("max-width","auto");
			  this_element.parent().parent().css("max-height","auto");
		 }
	   
	     if ( sliderTimeout == 0 ) slideshow = false;
		if (sliderShowDirection == 0) sliderShowDirection= false;
		if (sliderShowBottomNav == 0) sliderShowBottomNav= false;
		
	     this_element.flexslider({
	       animation: sliderFx,
	       slideshow: slideshow,
	       slideshowSpeed: sliderTimeout,
	       sliderSpeed: sliderSpeed,
	       controlNav: sliderShowBottomNav,
	       directionNav: sliderShowDirection,
	       smoothHeight: true,
		   minItems:minItems,
		   itemWidth:itemWidth,
	     });
	   });
 }
}
function bit_product(){
	if ( jQuery( '.bitcommerce').length==0 )
		return false;
	// Tabs
	jQuery( '.bitcommerce-tabs .panel' ).hide();

	jQuery( '.bitcommerce-tabs ul.tabs li a' ).click( function() {

		var $tab = jQuery( this ),
			$tabs_wrapper = $tab.closest( '.bitcommerce-tabs' );

		jQuery( 'ul.tabs li', $tabs_wrapper ).removeClass( 'active' );
		jQuery( 'div.panel', $tabs_wrapper ).hide();
		jQuery( 'div' + $tab.attr( 'href' ), $tabs_wrapper).show();
		$tab.parent().addClass( 'active' );

		return false;
	});

	jQuery( '.bitcommerce-tabs' ).each( function() {
		var hash	= window.location.hash,
			url		= window.location.href,
			tabs	= jQuery( this );

		if ( hash.toLowerCase().indexOf( "comment-" ) >= 0 ) {
			jQuery('ul.tabs li.reviews_tab a', tabs ).click();

		} else if ( url.indexOf( "comment-page-" ) > 0 || url.indexOf( "cpage=" ) > 0 ) {
			jQuery( 'ul.tabs li.reviews_tab a', jQuery( this ) ).click();

		} else {
			jQuery( 'ul.tabs li:first a', tabs ).click();
		}
	});

	jQuery( 'a.bitcommerce-review-link' ).click( function() {
		jQuery( '.reviews_tab a' ).click();
		return true;
	});
	jQuery( '#rating' ).hide();
	if(jQuery("p.stars").length==0){
		jQuery( '#rating' ).before( '<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>' );
	}
	// Star ratings for comments
	

	jQuery( 'body' )
		.on( 'click', '#respond p.stars a', function() {
			var $star   = jQuery( this ),
				$rating = jQuery( this ).closest( '#respond' ).find( '#rating' );

			$rating.val( $star.text() );
			$star.siblings( 'a' ).removeClass( 'active' );
			$star.addClass( 'active' );

			return false;
		})
		.on( 'click', '#respond #submit', function() {
			var $rating = jQuery( this ).closest( '#respond' ).find( '#rating' ),
				rating  = $rating.val();

			if ( $rating.size() > 0 && ! rating && wc_single_product_params.review_rating_required === 'yes' ) {
				alert( wc_single_product_params.i18n_required_rating_text );

				return false;
			}
		});
	
	jQuery("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").addClass('buttons_added').append('<input type="button" value="+" class="plus" />').prepend('<input type="button" value="-" class="minus" />').find(".input-text").attr("type","text");
	
	// prevent double form submission
	jQuery( 'form.cart' ).submit( function() {
		jQuery( this ).find( ':submit' ).attr( 'disabled','disabled' );
	});
	jQuery( '.bitcommerce-main-image a' ).removeAttr("href").click(function(){
		jAlert("请在预览下，查看图片效果！");
	});
	jQuery( '.button.add_to_cart_button,.button.product_type_simple' ).removeAttr("href").click(function(){
		jAlert("编辑情况下，无法使用购物车功能。如果修改商城默认页面，你可以从左上角选择功能页面进行编辑！");
		
	});
	jQuery('.bitcommerce-ordering select.orderby').change(function(){
		jAlert("编辑情况下，无法使用排序功能！");
	})

	jQuery(".qfy_carousel .vc-carousel").each(function(){
		qfy_carousel_fun(jQuery(this))
	})
	if(jQuery(".addon-custom-datepicker" ).length>0){
		jQuery(".addon-custom-datepicker" ).datepicker({
			dateFormat: "yy-mm-dd",
			numberOfMonths: 1,
		});
	}
	if(jQuery(".addon-custom-datetimepicker" ).length>0 ){
		jQuery(".addon-custom-datetimepicker" ).datetimepicker({
					dateFormat: "yy-mm-dd",
					numberOfMonths: 1,
					showTime: true,
					constrainInput: false
		});
	}
}
function qfy_carousel_fun($carousel){

	var is_carousel_ok =true;
	$carousel.find('img').each(function(){
		if(!jQuery(this).prop('complete')){
			is_carousel_ok = false;
		}
	
	})
	if(!is_carousel_ok) {
	  window.setTimeout(function(){
		  qfy_carousel_fun($carousel);
	  }, 500);
	  return;
   }
	
   $carousel.carousel($carousel.data());
}



/* Waypoints magic
---------------------------------------------------------- */
if ( typeof window['vc_waypoints'] !== 'function' ) {
  function qfe_animate_fun($this){
		
		var p =  jQuery($this).closest(".qfy-element");
		var delay = p.attr("css_animation_delay");
		var anitime = p.attr("data-anitime");
		var anilength = p.attr("data-anilength");
		if(anitime && anitime>0){
			jQuery($this).css("animation-duration",anitime+"s");
			jQuery($this).css("-webkit-animation-duration",anitime+"s");
		}
		jQuery($this).removeClass("anlength1 anlength2");
		if(anilength && anilength!=0){
			jQuery($this).addClass(anilength);
		}
		if(delay){
			setTimeout(function(){jQuery($this).addClass('qfe_start_animation');},delay*1000);
		}else{
			if(jQuery($this).hasClass("delay1")){
				setTimeout(function(){jQuery($this).addClass('qfe_start_animation');},1000);
			}else if(jQuery($this).hasClass("delay0.5")){
				setTimeout(function(){jQuery($this).addClass('qfe_start_animation');},500);
			}else if(jQuery($this).hasClass("delay1.5")){
				setTimeout(function(){jQuery($this).addClass('qfe_start_animation');},1500);
			}else if(jQuery($this).hasClass("delay2")){
				setTimeout(function(){jQuery($this).addClass('qfe_start_animation');},2000);
			}else if(jQuery($this).hasClass("delay3")){
				setTimeout(function(){jQuery($this).addClass('qfe_start_animation');},3000);
			}else if(jQuery($this).hasClass("delay4")){
				setTimeout(function(){jQuery($this).addClass('qfe_start_animation');},4000);
			}else if(jQuery($this).hasClass("delay5")){
				setTimeout(function(){jQuery($this).addClass('qfe_start_animation');},5000);
			}else if(jQuery($this).hasClass("delay6")){
				setTimeout(function(){jQuery($this).addClass('qfe_start_animation');},6000);
			}else{
				jQuery($this).addClass('qfe_start_animation');
			}
		}
  
  }
  function vc_waypoints() {
	if(typeof resetSectionHeight !== 'undefined') resetSectionHeight();
	if (typeof jQuery.fn.waypoint !== 'undefined') {
    jQuery('.qfe_animate_when_almost_visible:not(.qfe_start_animation)').waypoint(function() {
			qfe_animate_fun(this);

		}, { offset: '85%' });
	}
  }
}

/* Teaser grid: isotope
---------------------------------------------------------- */
if ( typeof window['vc_teaserGrid'] !== 'function' ) {
	
	function vc_teaserGrid() {

        var layout_modes = {
            fitrows: 'fitRows',
            masonry: 'masonry'
        }
    	if(jQuery(".list-style9").length>0){ 
    		jQuery(".list-style9").each(function(){
    			vc_isotope_init_load(jQuery(this).find(".vc-carousel-slideline-inner"));
    		})
    		
    	}
		if(jQuery("body.compose-mode").length==1){
			jQuery(".vc-element .vc_ca_post_id a:not(.cate)").each(function(){
					if( !jQuery(this).hasClass("thickbox")){
						var href = jQuery(this).attr("href");
						jQuery(this).removeAttr("href");
						var p  = jQuery(this).closest(".vc_ca_post_id");
						jQuery(this).unbind("click").bind("click",function(){
							top.menuRedirect(href,p);
							return false;
						})
					}
			})
			if(!top.jQuery("body").hasClass("caterole")){
				jQuery(".content-wrapper .vc-element .vc_ca_post_id").mouseenter(function(){
							
							jQuery(this).css("outline","2px dotted #5E87B0");
							if(jQuery(this).find(".vc_list_edit_button").length==0){
								if(jQuery(this).find(".blog-media .toEditor,#item_block .toEditor").length==0){
									jQuery(this).find(".blog-media,#item_block").append("<span class='toEditor' ><span class='edit e_copy' style='display:inline' onclick='toCopy(this)'>复制</span><span class='edit e_edit' style='display:inline' onclick='toVisit(this)'>打开</span><span class='edit e_delete' style='display:inline' onclick='toDelete(this)'>删除</span></span>");
								}
								if(jQuery(this).closest(".vc-element").attr("data-model-id")){
									var editname = "更换图片";
									if(jQuery(this).closest(".qfy-element").attr("data-post")=="attachment"){
										editname = "编辑";
									}
									jQuery(this).find(".blog-media").append("<span class='vc_list_edit_button vc_list_edit_action' style='display:inline;'><span style='display:inline;' onclick='toEditor(this,event)'>"+editname+"</span><span style='display:inline;' onclick='parent.toeditlistmore(this,event,\"vc_scrolllist_image_element\")' title='修改样式，格式'>设置</span>");
									jQuery(this).find(".item_img").append("<span class='vc_list_edit_button vc_list_edit_action' style='display:inline;'><span style='display:inline;' onclick='toEditor(this,event)'>"+editname+"</span><span style='display:inline;' onclick='parent.toeditlistmore(this,event,\"vc_advanced_image_element\")' title='修改样式，格式'>设置</span>");
									var p = jQuery(this);
									if(p.find(".post-title").length>0 && p.find(".post-title .vc_list_edit_action").length==0){
										var actionstr = '<span class="fa fa-pencil vc_list_edit_action"  style="margin-left:10px;display:inline;" onclick="toEditor(this,event)" title="编辑"></span><span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;display:inline;" onclick="parent.toeditlistmore(this,event,\'vc_advanced_list_title_element\')" title="修改样式，格式"></span>';
										var title = p.find(".post-title");
			
										if(p.find(".post-title >a").length>0){
											var title = jQuery(this).find(".post-title >a");
											if(title.html().length>15){
												var newtitle = title.html().substr(0, title.html().length-6);
												title.html("<span class='hidetitle' style='display:none'>"+title.html()+"</span><span class='edittitle' >"+newtitle+"</span>")
											}
											p.find(".post-title >a:first").append(actionstr);
										}else{
											var title = jQuery(this).find(".post-title >span:first");
											if(title.html().length>15){
												var newtitle = title.html().substr(0, title.html().length-6);
												title.html("<span class='hidetitle' style='display:none'>"+title.html()+"</span><span class='edittitle' >"+newtitle+"</span>")
											}
											p.find(".post-title >span:first").append(actionstr);
										}
									}
									if(p.find(".post_excerpt").length>0 && p.find(".post_excerpt .vc_list_edit_action").length==0){
										var actionstr = '<span class="fa fa-pencil vc_list_edit_action"  style="margin-left:10px;display:inline;z-index:2;position:relative;" onclick="toEditor(this,event)" title="编辑"></span><span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;display:inline;z-index:2;position:relative;" onclick="parent.toeditlistmore(this,event,\'vc_advanced_list_text_element\')" title="修改样式，格式"></span>';
										if(p.find(".post_excerpt >p").length>0){
											p.find(".post_excerpt >p").append(actionstr);
										}else{
											p.find(".post_excerpt").append(actionstr);
										}
										
									}

									if(jQuery(this).find(".title").length>0  && jQuery(this).find(".title .vc_list_edit_action").length==0){
										var actionstr = '<span class="fa fa-pencil vc_list_edit_action"  style="margin-left:10px;display:inline;z-index:2;position:relative;" onclick="toEditor(this,event)" title="编辑"></span><span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;display:inline;z-index:2;position:relative;" onclick="parent.toeditlistmore(this,event,\'vc_advanced_list_title_element\')" title="修改样式，格式"></span>';
										jQuery(this).find(".title").append(actionstr);
										
									}
									if(jQuery(this).find(".details").length>0  && jQuery(this).find(".details .vc_list_edit_action").length==0){
										var actionstr = '<span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;display:inline;z-index:2;position:relative;" onclick="parent.toeditlistmore(this,event,\'vc_advanced_list_details_element\')" title="修改样式，格式"></span>';
										jQuery(this).find(".details").append(actionstr);
										
									}
									if(jQuery(this).find(".subtitle").length>0  && jQuery(this).find(".subtitle .vc_list_edit_action").length==0){
										var actionstr = '<span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;display:inline;z-index:2;position:relative;" onclick="parent.toeditlistmore(this,event,\'vc_advanced_list_subtitle_element\')" title="修改样式，格式"></span>';
										jQuery(this).find(".subtitle").append(actionstr);
										
									}
									
									if(jQuery(this).find(".post_date").length>0  && jQuery(this).find(".post_date .vc_list_edit_action").length==0){
										var actionstr = '<span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;display:inline;z-index:2;position:relative;" onclick="parent.toeditlistmore(this,event,\'vc_advanced_list_postdate_element\')" title="修改样式，格式"></span>';
										jQuery(this).find(".post_date").append(actionstr);
										
									}
									
									if(jQuery(this).find(".price_warp").length>0  && jQuery(this).find(".price_warp .vc_list_edit_action").length==0){
										var current_pid = jQuery(this).attr("data-postid");
										var actionstr = '<span class="fa fa-pencil vc_list_edit_action"  style="margin-left:10px;display:inline;z-index:2;position:relative;" onclick="parent.bitSettingsEdit('+current_pid+',\'设置商品\', \'product\');" title="编辑"></span><span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;display:inline;z-index:2;position:relative;" onclick="parent.toeditlistmore(this,event,\'vc_advanced_list_price_element\')" title="修改样式，格式"></span>';
										jQuery(this).find(".price_warp").append(actionstr);
										
									}
								}
							}
					}).mouseleave(function(){
						jQuery(this).css("outline","0").find(".vc_list_edit_action").remove();					
						jQuery(this).find(".blog-media,#item_block").find(".toEditor").remove();
						jQuery(this).find(".edittitle").remove();
						jQuery(this).find(".hidetitle").each(function(){
							var t = jQuery(this).html();
							 jQuery(this).parent().html(t);
						})
					});
				
				if(jQuery(".product-content.single-product").length==0){
					jQuery(".bitcommerce-main-image,.wd_product_wrapper .product_a").mouseenter(function(){
								jQuery(this).removeAttr("href").append("<span class='toEditor' style='right:0;width:100px;'><span class='edit' style='display:inline' onclick='toEditProduct(this)'><i class='glyphicon glyphicon-edit'></i>数据</span><span style='display:inline' class='delete' onclick='toRedirectProduct(this)'><i class='glyphicon glyphicon-forward'></i>页面</span></span>");
							}).mouseleave(function(){
								jQuery(this).find(".toEditor").remove();
					});
				}
			}
			jQuery('.content-wrapper .qfy-listcatecontrols li').each(function(){
				var $li = jQuery(this);
				$li.mouseenter(function(){
					jQuery(this).css("outline","1px dotted #5E87B0");
					if(jQuery(this).find(".toEditor").length==0){
						jQuery(this).append("<span class='toEditor' style='border:0;padding:0;'><span  style='display:inline;border:0;padding:0;background:transparent;' onclick='toDeleteCate(this)'><img src='//fast.qifeiye.com/FeiEditor/bitSite/images/close_hover.png' /></span>");
					}
				}).mouseleave(function(){
					jQuery(this).css("outline","0");
					jQuery(this).find(".toEditor").remove();
				});
			
			}); 
		}
		

        jQuery('.qfe_grid .teaser_grid_container:not(.qfe_carousel), .qfe_filtered_grid .teaser_grid_container:not(.qfe_carousel)').each(function(){
            var $container = jQuery(this);
			
            var $thumbs = $container.find('.qfe_thumbnails');
            var layout_mode = $thumbs.attr('data-layout-mode');
			
			//..
			if(jQuery("body.compose-mode").length==1){
				var p = $container.closest(".qfy-element");
				var iscontent = $container.closest(".content-wrapper");
				//&& $thumbs.closest(".vc-element").length>0
				if(!top.jQuery("body").hasClass("caterole") ){
					$thumbs.find(".isotope-item").mouseenter(function(){
						if(iscontent.length==0) return;
						jQuery(this).css("outline","2px dotted #5E87B0");
						if(jQuery(this).find(".vc_list_edit_button").length==0){
							var editor_html = "<span class='toEditor' ><span class='edit e_set' style='display:inline' onclick='parent.toeditlistmore(this,event,\"vc_list_element_ui\");'>设置</span><span class='edit e_copy' style='display:inline' onclick='toCopy(this)'>复制</span><span class='edit e_edit' style='display:inline' onclick='toVisit(this)'>打开</span><span class='edit e_delete' style='display:inline' onclick='toDelete(this)'>删除</span></span>"
							
							jQuery(this).append(editor_html);
							//<span class='edit' style='display:inline' onclick='toEditor(this)'><i class='glyphicon glyphicon-edit'></i>编辑</span>
							if($container.closest(".vc-element").attr("data-model-id")){
								jQuery(this).find(".post-thumb").css("position","relative");
								var editname = "更换图片";
								if(jQuery(this).closest(".qfy-element").attr("data-post")=="attachment"){
									editname = "编辑";
								}
								jQuery(this).find(".post-thumb").append("<span class='vc_list_edit_button vc_list_edit_action' style='display:inline;'><span style='display:inline;' onclick='toEditor(this,event)'>"+editname+"</span><span style='display:inline;' onclick='parent.toeditlistmore(this,event,\"vc_list_image_element\")' title='修改样式，格式'>设置</span>");
								if(jQuery(this).find(".post-title").length>0  && jQuery(this).find(".post-title .vc_list_edit_action").length==0){
									var actionstr = '<span class="fa fa-pencil vc_list_edit_action"  style="margin-left:10px;display:inline;" onclick="toEditor(this,event)" title="编辑"></span><span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;display:inline;" onclick="parent.toeditlistmore(this,event,\'vc_list_title_element\')" title="修改样式，格式"></span>';
									if(jQuery(this).find(".post-title >a").length>0){
										var title = jQuery(this).find(".post-title >a");
										if(title.html().length>15){
											var newtitle = title.html().substr(0, title.html().length-6);
											title.html("<span class='hidetitle' style='display:none'>"+title.html()+"</span><span class='edittitle' >"+newtitle+"</span>")
										}
										jQuery(this).find(".post-title >a:first").append(actionstr);
									}else{
										var title = jQuery(this).find(".post-title >span:first");
										if(title.html().length>15){
											var newtitle = title.html().substr(0, title.html().length-6);
											title.html("<span class='hidetitle' style='display:none'>"+title.html()+"</span><span class='edittitle' >"+newtitle+"</span>")
										}
										jQuery(this).find(".post-title >span:first").append(actionstr);
										
									}
									if(jQuery(this).find(".post-title i.glyphicon").length>0){
										jQuery(this).find(".post-title i.glyphicon").append('<span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;" onclick="parent.toeditlistmore(this,event,\'vc_list_icon_element\')" title="修改样式，格式"></span>');
									}
								}
								
								
								
								if(jQuery(this).find(".post_excerpt").length>0){
									var actionstr = '<span class="fa fa-pencil vc_list_edit_action"  style="margin-left:10px;" onclick="toEditor(this,event)" title="编辑内容"></span><span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;" onclick="parent.toeditlistmore(this,event,\'vc_text_element\')" title="修改内容样式，格式"></span>';
									if(jQuery(this).find(".post_excerpt >p").length>0  && jQuery(this).find(".post_excerpt .vc_list_edit_action").length==0){
										jQuery(this).find(".post_excerpt >p").append(actionstr);
									}else{
										jQuery(this).find(".post_excerpt").append(actionstr);
									}
								}
								if(jQuery(this).find(".subtitle").length>0  && jQuery(this).find(".subtitle .vc_list_edit_action").length==0){
									var actionstr = '<span class="fa fa-pencil vc_list_edit_action"  style="margin-left:10px;" onclick="toEditor(this,event)" title="编辑内容"></span><span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;display:inline;z-index:2;position:relative;" onclick="parent.toeditlistmore(this,event,\'vc_list_subtitle_element\')" title="修改样式，格式"></span>';
									jQuery(this).find(".subtitle").append(actionstr);
									
								}
								if(jQuery(this).find(".price_warp").length>0  && jQuery(this).find(".price_warp .vc_list_edit_action").length==0){
										var current_pid = jQuery(this).attr("data-postid");
										var actionstr = '<span class="fa fa-pencil vc_list_edit_action"  style="margin-left:10px;display:inline;z-index:2;position:relative;" onclick="parent.bitSettingsEdit('+current_pid+',\'设置商品\', \'product\');" title="编辑"></span><span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;display:inline;z-index:2;position:relative;" onclick="parent.toeditlistmore(this,event,\'vc_list_price_element\')" title="修改样式，格式"></span>';
										jQuery(this).find(".price_warp").append(actionstr);
										
								}
								if(jQuery(this).find(".post-comment").length>0 && jQuery(this).find(".post-comment .vc_list_edit_action").length==0){
									jQuery(this).find(".post-comment").append('<span class="fa fa-pencil vc_list_edit_action"  style="margin-left:10px;display:inline;" onclick="toEditor(this,event)" title="编辑"></span><span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;" onclick="parent.toeditlistmore(this,event,\'vc_list_comment_element\')" title="修改样式，格式"></span>');
								}
								if(jQuery(this).find(".vc_read_more").length>0 && jQuery(this).find(".vc_read_more .vc_list_edit_action").length==0){
									jQuery(this).find(".vc_read_more").append('<span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;" onclick="parent.toeditlistmore(this,event,\'vc_list_readmore_element\')" title="修改样式，格式"></span>');
								}
							}
							
						}
					}).mouseleave(function(){
						jQuery(this).css("outline","0");
						jQuery(this).find(".toEditor,.vc_list_edit_action").remove();
						jQuery(this).find(".edittitle").remove();
						jQuery(this).find(".hidetitle").each(function(){
							var t = jQuery(this).html();
							 jQuery(this).parent().html(t);
						})
					
					});

					
					if(p.find(".mypages").length>0){
						p.find(".mypages").mouseenter(function(){
							if(p.find(".mypages .vc_list_edit_action").length==0){
								p.find(".mypages").append('<span class="fa fa-cog vc_list_edit_action" style="margin-left:10px;" onclick="parent.toeditlistmore(this,event,\'vc_list_pagenav_element\')" title="修改样式，格式"></span>');
							}
						}).mouseleave(function(){
							p.find(".vc_list_edit_action").remove();
						});
									
					}

				}
				$thumbs.find("a:not(.cate)").each(function(){
					if( !jQuery(this).hasClass("thickbox")){
						var href = jQuery(this).attr("href");
						jQuery(this).removeAttr("href");
						var p  = jQuery(this).closest(".isotope-item");
						jQuery(this).unbind("click").bind("click",function(){
							top.menuRedirect(href,p);
							return false;
						})
					}
				})
			}
			
			$container.find('.categories_filter a:not(.link)').data('isotope', $thumbs).click(function(e){
					e.preventDefault();
					var $thumbs = jQuery(this).data('isotope');
					jQuery(this).parent().parent().find('.active').removeClass('active');
					jQuery(this).parent().addClass('active');
					if(!$container.hasClass("noanimale")){
						$thumbs.isotope({filter: jQuery(this).attr('data-filter'),  itemSelector : '.isotope-item',layoutMode :'fitRows' });
					}else{
						var filter = jQuery(this).data('filter');
						if(filter=="*"){
							$thumbs.find(">li").show();
						}else{
							$thumbs.find(">li").hide();
							$thumbs.find(filter).show();
						}
					}

				});
			if(!jQuery(this).hasClass("noanimale")){   
			  vc_isotope_init_load($thumbs);
			}
           
        });
	}
	


}
function vc_isotope_init_load(obj){

	   if( obj.find('.post-thumb img,.item_img img').length==0){
			 obj.isotope({filter: '*',  itemSelector : '.isotope-item',layoutMode :obj.attr("data-layout-mode")?obj.attr("data-layout-mode"):'fitRows' });
			 return;
	   }
	   var all_load = true;
	   obj.find('.post-thumb img,.post-thumb video,.item_img img').each(function(){
		   if(!jQuery(this).prop('complete')){
			   all_load = false;
		   }
	   });
	   
   if(!all_load) {
	  window.setTimeout(function(){
		  vc_isotope_init_load(obj);
	  }, 500);
	  return;
   }
   obj.isotope({filter: '*',  itemSelector : '.isotope-item',layoutMode :obj.attr("data-layout-mode")?obj.attr("data-layout-mode"):'fitRows'  });
}
if ( typeof window['vc_carouselBehaviour'] !== 'function' ) {
  function vc_carouselBehaviour() {
    jQuery(".qfe_carousel").each(function() {
            var $this = jQuery(this);
            if($this.data('carousel_enabled') !== true && $this.is(':visible')) {
                $this.data('carousel_enabled', true);
                var carousel_width = jQuery(this).width(),
                    visible_count = getColumnsCount(jQuery(this)),
                    carousel_speed = 500;
                if ( jQuery(this).hasClass('columns_count_1') ) {
                    carousel_speed = 900;
                }
                /* Get margin-left value from the css grid and apply it to the carousele li items (margin-right), before carousele initialization */
                var carousele_li = jQuery(this).find('.qfe_thumbnails-fluid li');
                carousele_li.css({"margin-right": carousele_li.css("margin-left"), "margin-left" : 0 });

                jQuery(this).find('.qfe_wrapper:eq(0)').jCarouselLite({
                    btnNext: jQuery(this).find('.next'),
                    btnPrev: jQuery(this).find('.prev'),
                    visible: visible_count,
                    speed: carousel_speed
                })
                    .width('100%');//carousel_width

                var fluid_ul = jQuery(this).find('ul.qfe_thumbnails-fluid');
                fluid_ul.width(fluid_ul.width()+300);

                jQuery(window).resize(function() {
                    var before_resize = screen_size;
                    screen_size = getSizeName();
                    if ( before_resize != screen_size ) {
                        window.setTimeout('location.reload()', 20);
                    }
                });
            }

    });
       
        if(window.Swiper !== undefined) {

            jQuery('.swiper-container').each(function(){
                var $this = jQuery(this),
                    my_swiper,
                    max_slide_size = 0,
                    options = jQuery(this).data('settings');

                    if(options.mode === 'vertical') {
                        $this.find('.swiper-slide').each(function(){
                            var height = jQuery(this).outerHeight(true);
                            if(height > max_slide_size) max_slide_size = height;
                        });
                        $this.height(max_slide_size);
                        $this.css('overflow', 'hidden');
                    }
                    jQuery(window).resize(function(){
                        $this.find('.swiper-slide').each(function(){
                            var height = jQuery(this).outerHeight(true);
                            if(height > max_slide_size) max_slide_size = height;
                        });
                        $this.height(max_slide_size);
                    });
                    my_swiper = jQuery(this).swiper(jQuery.extend(options, {
                    onFirstInit: function(swiper) {
                        if(swiper.slides.length < 2) {
                            $this.find('.vc-arrow-left,.vc-arrow-right').hide();
                        } else if(swiper.activeIndex === 0  && swiper.params.loop !== true) {
                            $this.find('.vc-arrow-left').hide();
                        } else {
                            $this.find('.vc-arrow-left').show();
                        }
                    },
                    onSlideChangeStart: function(swiper) {
                        if(swiper.slides.length > 1 && swiper.params.loop !== true) {
                            if(swiper.activeIndex === 0) {
                                $this.find('.vc-arrow-left').hide();
                            } else {
                                $this.find('.vc-arrow-left').show();
                            }
                            if(swiper.slides.length-1 === swiper.activeIndex) {
                                $this.find('.vc-arrow-right').hide();
                            } else {
                                $this.find('.vc-arrow-right').show();
                            }
                        }
                    }
                }));
                $this.find('.vc-arrow-left').click(function(e){
                    e.preventDefault();
                    my_swiper.swipePrev();
                });
                $this.find('.vc-arrow-right').click(function(e){
                    e.preventDefault();
                    my_swiper.swipeNext();
                });
                my_swiper.reInit();
            });

        }

	}
}

if ( typeof window['vc_slidersBehaviour'] !== 'function' ) {
	function vc_slidersBehaviour() {
		//var sliders_count = 0;
		jQuery('.qfe_gallery_slides').each(function(index) {
			var this_element = jQuery(this);
			var ss_count = 0;
			if ( this_element.hasClass('qfe_slider_nivo') ) {
				var sliderSpeed = 800,
					sliderTimeout = this_element.attr('data-interval')*1000;
	
				if ( sliderTimeout == 0 ) sliderTimeout = 9999999999;
				this_element.find('.nivoSlider').nivoSlider({
					effect: 'boxRainGrow,boxRain,boxRainReverse,boxRainGrowReverse', // Specify sets like: 'fold,fade,sliceDown'
					slices: 15, // For slice animations
					boxCols: 8, // For box animations
					boxRows: 4, // For box animations
					animSpeed: sliderSpeed, // Slide transition speed
					pauseTime: sliderTimeout, // How long each slide will show
					startSlide: 0, // Set starting Slide (0 index)
					directionNav: true, // Next & Prev navigation
					directionNavHide: true, // Only show on hover
					controlNav: true, // 1,2,3... navigation
					keyboardNav: false, // Use left & right arrows
					pauseOnHover: true, // Stop animation while hovering
					manualAdvance: false, // Force manual transitions
					prevText: 'Prev', // Prev directionNav text
					nextText: 'Next' // Next directionNav text
				});
			}
			else if ( this_element.hasClass('qfe_image_grid') ) {
				var isotope = this_element.find('.qfe_image_grid_ul');
				isotope.isotope({
					// options
					itemSelector : '.isotope-item',
					layoutMode : 'fitRows'
				});
				jQuery(window).load(function() {
					isotope.isotope("reLayout");
				});
			}
		});
	}
}

if ( typeof window['vc_prettyPhoto'] !== 'function' ) {
	function vc_prettyPhoto() {
		try {
			// just in case. maybe prettyphoto isnt loaded on this site
			jQuery('a.prettyphoto, .gallery-icon a[href*=".jpg"]').prettyPhoto({
				animationSpeed: 'normal', /* fast/slow/normal */
				padding: 15, /* padding for each side of the picture */
				opacity: 0.7, /* Value betwee 0 and 1 */
				showTitle: true, /* true/false */
				allowresize: true, /* true/false */
				counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
				//theme: 'light_square', /* light_rounded / dark_rounded / light_square / dark_square */
				hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
                deeplinking: false, /* Allow prettyPhoto to update the url to enable deeplinking. */
				modal: false, /* If set to true, only the close button will close the window */
				callback: function() {
					var url = location.href;
					var hashtag = (url.indexOf('#!prettyPhoto')) ? true : false;
					if (hashtag) location.hash = "!";
				} /* Called when prettyPhoto is closed */,
				social_tools : ''
			});
		} catch (err) { }
	}
}
/* Helper
---------------------------------------------------------- */
function getColumnsCount(el) {
	var find = false,
		i = 1;

	while ( find == false ) {
		if ( el.hasClass('columns_count_'+i) ) {
			find = true;
			return i;
		}
		i++;
	}
}

var screen_size = getSizeName();
function getSizeName() {
	var screen_size = '',
		screen_w = jQuery(window).width();

	if ( screen_w > 1170 ) {
		screen_size = "desktop_wide";
	}
	else if ( screen_w > 960 && screen_w < 1169 ) {
		screen_size = "desktop";
	}
	else if ( screen_w > 768 && screen_w < 959 ) {
		screen_size = "tablet";
	}
	else if ( screen_w > 300 && screen_w < 767 ) {
		screen_size = "mobile";
	}
	else if ( screen_w < 300 ) {
		screen_size = "mobile_portrait";
	}
	return screen_size;
}

function loadScript(url, $obj, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        /*
        script.onload = function(){

            callback();
        };
         */
    }

    script.src = url;
    $obj.get(0).appendChild(script);
}

/**
 * Prepare html to correctly display inside tab container
 *
 * @param event - ui tab event 'show'
 * @param ui - jquery ui tabs object
 */

function qfe_prepare_tab_content(event, ui) {
    var panel = ui.panel || ui.newPanel;
    vc_carouselBehaviour();
    var $ui_panel = jQuery(panel).find('.isotope'),
        $google_maps = jQuery(panel).find('.qfe_gmaps_widget');
    if ($ui_panel.length > 0) {
	    $ui_panel.isotope("reLayout");
    }

    if($google_maps.length && !$google_maps.is('.map_ready')) {
        var $frame = $google_maps.find('iframe');
        $frame.attr('src', $frame.attr('src'));
        $google_maps.addClass('map_ready');
    }
}
jQuery(window).resize(function(){
  bitResizeImageTextInit();
});
jQuery(window).ready(function(){
	setTimeout(function(){bitResizeImageTextInit();},300);
});

function bitResizeImageTextInit(){

	jQuery(".bitImageControlDiv .bit-tp-caption.wf-mobile-hidden").each(function(){
	
		var dataorgipara=jQuery(this).attr("dataorgipara");		
		if(dataorgipara)
		{
				var $this = this;
				var p =  jQuery(this).parent().parent();
				var img = p.find(".bitImageParentDiv img");
				if(img.length>0){
					var imgW=img.width();
					var imgH=img.height();
				}else{
					var imgW= p.find(".bitImageParentDiv .banner-img").width();
					var imgH = p.find(".bitImageParentDiv .banner-img").height();
				}
				var download = new Image();
			    download.src = img.attr("src");
			    if(imgW>760){
			    	initTextposition(dataorgipara,imgW,imgH,this);
			    }else{
				    /*download.onload = function () {
				    	initTextposition(dataorgipara,imgW,imgH,$this);
				    }
				    download.onerror = function (err, msg) {
				    	  initTextposition(dataorgipara,imgW,imgH,$this);
				    }*/
			    }
		}
	})	
}
function initTextposition(dataorgipara,imgW,imgH,obj){
	dataorgipara=dataorgipara.split("\|");
	var textOrgLeft=dataorgipara[0];
	var textOrgTop=dataorgipara[1];
	var width=dataorgipara[2];
	var s=dataorgipara[3];
	var textOrgRight=dataorgipara[4];
	var textOrgBottom=dataorgipara[5];
	if(imgW!=width&&imgW>0){
		
		var n=(width/imgW).toFixed(4);
		
		//if(s/n<10){n=s/10;}
		jQuery(obj).css("font-size",s/n).css("line-height","auto").css("min-height","0").css("min-width","0");
		jQuery(obj).find("slideText").css("line-height","auto");
		var textW=jQuery(obj).width();
		var textH=jQuery(obj).height();
		var paddingLeft=jQuery(obj).css("padding-left");
		if(paddingLeft&&paddingLeft.indexOf("px")){paddingLeft=paddingLeft.replace("px","")};
		var paddingTop=jQuery(obj).css("padding-top");
		if(paddingTop&&paddingTop.indexOf("px")){paddingTop=paddingTop.replace("px","")};
		var s=jQuery(obj).css("left");
		if(textOrgLeft!=0){
			if(s.indexOf("px")>-1){ s=s.replace("px","");jQuery(obj).css("left",textOrgLeft*imgW-textW/2-paddingLeft);}
		}
		if(textOrgRight==1){
			jQuery(obj).css("right","0").css("left","auto");
		}
		var s=jQuery(obj).css("top");
		
		if(textOrgTop!=0){
			if(s.indexOf("px")>-1){ s=s.replace("px","");jQuery(obj).css("top",textOrgTop*imgH-textH/2-paddingTop);}
		}
		if(textOrgBottom==1){
			jQuery(obj).css("bottom","0").css("top","auto");
		}
		
	}else{

		var css=jQuery(obj).attr("style");
		if(css){
			css=css.replace(/font-size[^p]*px;/,"");
			css=css.replace(/right: 0px/,"");
			css=css.replace(/bottom: 0px/,"");
			css=css.replace(/line-height[^;]*;/,"");
			jQuery(obj).attr("style",css);
			var left=jQuery(obj).attr("dataleft");
			jQuery(obj).css("left",left+"px");
			var top=jQuery(obj).attr("datatop");
			jQuery(obj).css("top",top+"px");
		}
	}
	jQuery(obj).addClass("on").show();
	
}
if(top!=self){
	jQuery("html").bind('paste', function(e) {
		if(!e.clipboardData){
			var clipboardData = e.originalEvent.clipboardData;
		}else{
			var clipboardData = e.clipboardData;
		}
		
		if(clipboardData){
			var text = clipboardData.getData('text/plain');
			if(text && parent){
				var tmp = parent.base64_decode(text);
				if(tmp.indexOf("|^^|")>-1){
					var tmparr = tmp.split('|^^|');
					if(tmparr.length==2){
						parent.jQuery("#vc-add-element-dialog .bit-insert-html").click();
						setTimeout(function(){
							top.jQuery(".boxy-wrapper:visible #copyText").val(text);
							top.jQuery(".boxy-wrapper:visible .copytitle").html("点击确认，将复制该组件到当前页面");
						},300);
					}
				}
			}
		}
	});
}