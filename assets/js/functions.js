/*
 *   Template Name: Euforia - Responsive Vcard Template
 *   Version: 1.1
 *   Author:  Lukasz Lelek
 *   Website: www.ht2.pl
*/


/* 
 * ----------------------------------------------------------
 * FUBCTIONS - Contact Validate
 * ----------------------------------------------------------
 */
function contact_form_validate(t) {
    var e = void 0 !== t && t.length > 0 ? t : $("#contact-valid-form");
    e.each(function() {
        var t = $(this);
        t.find(".field-validation").each(function() {
            $(this).change(function() {
                if ($(this).siblings(".alert").remove().fadeOut("slow", function() {
                    $(this).remove();
                }), "" !== $(this).val().trim()
                ) {
                    var e = contact_field_validation(t, $(this));
                    if (e.length > 0 && void 0 !== e[0].message && "" !== e[0].message && "success" !== e[0].message) {
                        var i = '<div class="alert"><i class="fa fa-exclamation-triangle"></i> ' + e[0].message + "</div>";
                        $(this).after(i), $(this).siblings(".alert").fadeIn("slow");
                    }
                }
            })
        }), t.submit(function(e) {
            e.preventDefault(), $(this).find(".form-loader").fadeIn("slow");

            var i = $(this).attr("action");
            if (void 0 == i && "" == i)
                return !1;
            $(this).find(".alert").remove().fadeOut("fast", function() {
                $(this).remove();
            }), $(this).find(".alert-validate-form").fadeOut("fast", function() {
                $(this).empty();
            });
            var a = !1;
            return $(this).find(".field-validation").each(function() {
                var e = contact_field_validation(t, $(this));
                if (e.length > 0 && void 0 !== e[0].message && "" != e[0].message && "success" != e[0].message) {
                    var i = '<div class="alert"><i class="fa fa-exclamation-triangle"></i> ' + e[0].message + "</div>";
                    $(this).after(i), $(this).siblings(".alert").fadeIn(), a =! 0;

                }
            }), 1 == a ? ($(this).find(".form-loader").fadeOut("fast"), !1) : ($.ajax({
                type: "POST",
                url: i,
                data: $(this).serialize(),
                dataType: "json",
                success: function(e) {
                    t.find(".form-loader").fadeOut("fast");
                    var i = "1" == e.status ? !0 : !1, a = '<div class="alert ';
                    a += 1 == i ? "success" : "error", a += '"><i class="fa fa-check-circle"></i> ' + e.text + '</div>', t.find(".alert-validate-form").html(a).fadeIn("fast", function() {
                        $(this).delay(1e4).fadeOut("fast", function() {
                           // $(this).remove();
                        });
                    }), 1 == i && t.find(".form-control").val("");
                },
                error: function() {
                    t.find(".form-loader").fadeOut("fast");
                    var e = '<div class="alert"><i class="fa fa-exclamation-triangle"></i> Ha ocurrido un error. Por favor, intentelo mas tarde.</div>';
                    t.find(".alert-validate-form").html(e).fadeIn("fast");
                }
            }), void 0)
        })
    })
}
function contact_field_validation(t, e) {
    if (void 0 !== t && t.length > 0) {
        var i = void 0 !== e && e.length > 0 ? e : t.find(".validate"), a = new Array;
        return i.each(function() {
            var t = $(this).attr("data-validation-type"), e = $(this).hasClass("required"), i = $(this).val().trim(), n = new Array;
            n.field_object = $(this), n.message = "success", 1 != e || "" != i && null !== i && void 0 !== i || (n.message = "Este es un campo requerido"), "string" == t && "" != i && null !== i && void 0 !== i ? null == i.match(/^[a-z0-9 .\-]+$/i) && (n.message = "Invalid characters found.") : "email" == t && "" != i && null !== i && void 0 !== i ? null == i.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && (n.message = "Por favor, entre una dirección de correo valida.") : "phone" == t && "" != i && null !== i && void 0 !== i && null == i.match(/^\(?\+?[\d\(\-\s\)]+$/) && (n.message = "Invalid characters found."), a.push(n)
        }), a
    }
}


/* 
 * ----------------------------------------------------------
 * FUNCTIONS - Page Transitions
 * ----------------------------------------------------------
 */
PageTransitions = (function() {
    
                    var isAnimating = false,
                        endCurrPage = true,
                        endNextPage = false,
                        animEndEventNames = {
                            'WebkitAnimation': 'webkitAnimationEnd',
                            'OAnimation': 'oAnimationEnd',
                            'msAnimation': 'MSAnimationEnd',
                            'animation': 'animationend'
                        },
                        animEndEventName = animEndEventNames[ Modernizr.prefixed('animation') ],
                        support = Modernizr.cssanimations;


        function init(options) {

                        $main = options.pages,
                        $pages = $main.children('section'),
                        menu = options.menu,
                        animcursor = options.animcursor,
                        nextAnimcursor = options.nextAnimcursor,
                        pageStart = getPageActiv(),
                        pageActiv = '',
                        
                        $pages.each(function () {
                            var $page = $(this);
                            if ($page.attr('class')) {
                                pageClass = $page.attr('class');
                            }
                            else {
                                pageClass = "";
                            }
                            $page.data('originalClassList', pageClass);
                        });

                        nextPage(animcursor, pageStart);
                        $(menu+' a[href="'+pageStart+'"]').addClass('active');
                        
                        navigationPage();
                        

        }
    
    
        function navigationPage() {
            
                /* --- CLICK TO PAGE TRANSACTIONS  --- */
                $(document).on("click", ".page-link", function (e) {
                    e.preventDefault();
                   
                    ahref = $(this).attr('href').split("#");
                    ahrefhash = '#'+ahref[1];
                    
                    // validate page
                    if ( ahrefhash === "#"+pageActiv.attr('id') ) {
                       return false;
                    }
                   
                    animcursor = getAnimcursor(animcursor);
                    //location.hash = ahrefhash;
                    nextPage(animcursor, ahrefhash, $(this));
                       
                });
                
                /* --- CLICJ TO PAGE LINK AJAX LOADER  --- */
                $(document).on("click", ".ajax-loader", function (e) {
                    e.preventDefault();
                    clickToNextPage($(this));
                });
            
            
        }
        
        
        function clickToNextPage(dane) {
                var a = dane;   
                activeMenuLink(a);
                animcursor = getAnimcursor( animcursor );
                
                var wzor = /ajax-loader/;
                
                if( wzor.test(dane.attr('class')) ) {

                var $this = dane,
                $remote = $this.data('remote') || $this.attr('href');
        
                        $.ajax({
                            url: $remote,
                            cache: false,
                            context: document.body
                        })
                        .done(function (html) {

                          $section = $(html).children('section');
                          $section_content = $section.children('div.content');
                          $section_prev = $section.children('a.btn-prev');
                          
                          $($section_prev).addClass('page-link');
                          
                          $('#page-ajax').html($section_prev).append($section_content);
                          $(".loader").fadeOut(1000);
                            nextPage(animcursor, '#page-ajax');
                          })
                        .fail(function () {
                            $('#page-ajax').html('<h1 class="text-center">Error - page not found!</h1>');
                            $(".loader").fadeOut(1000);
                            nextPage(animcursor, '#page-ajax');
                        });

                } else {
                        nextPage(animcursor, a.attr('href'));
                }

        }
        
        function updateAnimcursor(animid) {
            
                animcursor = animid;
                ++animcursor;
                //return animcursor;
        }
        
        function updateNextAnimcursor(animid) {
            
                nextAnimcursor = false;
                if(animid) {
                    nextAnimcursor = true;
                }
                return nextAnimcursor;
                
        }
        
        function getAnimcursor(animcursor) {
            
                if (nextAnimcursor) {
                    ++animcursor;
                    if (animcursor > 67) {
                        animcursor = 1;
                    }
                }
                return animcursor;  
        }
        
        function activeMenuLink(pageId) {
            
                if ( !pageId ) {
                    return false;
                }
                var nameClass = /page-sublink/;            
                if ( !nameClass.test(pageId.attr('class')) ) {

                     $(menu+' li a').removeClass('active');
                     $(menu+' a[href="'+pageId.attr('href')+'"]').addClass('active');
                }
        }
           
        function getPageActiv(page) {

               if( location.hash !== "") {
                   return location.hash;
               } 
               else if(page) {
                   return page;
               } 
               else {
                   return '#'+$("section.page-activ").attr('id');
               }
        }
        
        function validatePage(pageId) {
              
               if(document.querySelector(pageId)) {
                   
                  return true; 
               } else {
                  return false; 
               }     
        }

	function nextPage(animation,pageId,menuLink) {
            
		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
                
               
                if( ! validatePage(pageId) )  {
                    
                    pageId = '#error404';
                    
                }
                
		activeMenuLink( menuLink );
                
		var $currPage = $(pageActiv);
		var $nextPage = $(pageId).addClass( 'section-current' ), outClass = '', inClass = '';
                
                animationClass = getClassAnimate(animation);
                
		$currPage.addClass( animationClass.out ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
                        
		} );
                
                
		$nextPage.addClass( animationClass.in ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
                        
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
            
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' section-current' );
                pageActiv = $inpage; 
	}
        
        
        function getClassAnimate(idAnimation) {
            
            switch( idAnimation ) {

			case 1:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 2:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 3:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 4:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 5:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 6:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 7:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 8:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 9:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 10:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 11:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 12:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 13:
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case 14:
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 15:
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 16:
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			case 17:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 18:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 19:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 20:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 21:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case 22:
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case 23:
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 24:
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 25:
				outClass = 'pt-page-moveToTop pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 26:
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 27:
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case 28:
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case 29:
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case 30:
				outClass = 'pt-page-rotateTopSideFirst';
				inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
				break;
			case 31:
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case 32:
				outClass = 'pt-page-flipOutRight';
				inClass = 'pt-page-flipInLeft pt-page-delay500';
				break;
			case 33:
				outClass = 'pt-page-flipOutLeft';
				inClass = 'pt-page-flipInRight pt-page-delay500';
				break;
			case 34:
				outClass = 'pt-page-flipOutTop';
				inClass = 'pt-page-flipInBottom pt-page-delay500';
				break;
			case 35:
				outClass = 'pt-page-flipOutBottom';
				inClass = 'pt-page-flipInTop pt-page-delay500';
				break;
			case 36:
				outClass = 'pt-page-rotateFall pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 37:
				outClass = 'pt-page-rotateOutNewspaper';
				inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
				break;
			case 38:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 39:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 40:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 41:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 42:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-rotatePullRight pt-page-delay180';
				break;
			case 43:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-rotatePullLeft pt-page-delay180';
				break;
			case 44:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-rotatePullBottom pt-page-delay180';
				break;
			case 45:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-rotatePullTop pt-page-delay180';
				break;
			case 46:
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 47:
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 48:
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 49:
				outClass = 'pt-page-rotateFoldBottom';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 50:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 51:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 52:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 53:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
			case 54:
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case 55:
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case 56:
				outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomTopIn';
				break;
			case 57:
				outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomBottomIn';
				break;
			case 58:
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case 59:
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case 60:
				outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeTopIn';
				break;
			case 61:
				outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeBottomIn';
				break;
			case 62:
				outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselLeftIn';
				break;
			case 63:
				outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselRightIn';
				break;
			case 64:
				outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselTopIn';
				break;
			case 65:
				outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselBottomIn';
				break;
			case 66:
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case 67:
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;

		}
                
                return anim = {
                    'out': outClass,
                    'in': inClass
                };
        
        } 
        


	return { init : init, updateAnimcursor: updateAnimcursor };

})();
