/*-----------------------------------------------------/
 * 
 *   Styles Switcher
 * 
 *   Template Name: Euforia - Responsive Vcard Template
 *   Version: 1.0
 *   Author:  Lukasz Lelek (http://smq.ht2.pl)
 *   
------------------------------------------------------*/
jQuery(document).ready(function() {
    //"use strict";
    
    // Install Switcher
    $("body").append('<div id="style-switcher"></div>');
    $("#style-switcher").load("assets/style-switcher/style-switcher.html");


    // Color Navigation
    $(document).on("click", "#style-switcher .navi-switcher a", function () {
        x = $(this).attr('class');
        switcher_navi(x);
    });
    // Color bg
    $(document).on("click", "#style-switcher .bg-switcher a", function () {
        x = $(this).attr('class');
        switcher_bg(x);
    });
    // menu version
    $(document).on("change", "form .menu-switcher", function () {
        x = $(this).val();
        switcher_menu(x);
    });
    // animate page transitions
    $(document).on("change", "form .page-transitions", function () {
        x = $(this).val();
        --x;
        PageTransitions.updateAnimcursor(x);
    });
        
});


function switcher_navi(color) {
    
        // Update background color navigation
        var colorName;
        if(color === 'bg-black') {
                colorName = 'black';
                $("nav").addClass('nav-black');
        } else if(color === 'bg-white') { 
                colorName = 'white';
                $("nav").removeClass('nav-black');
        }     
    
        // Update color iamges to logo type v2
        if ($("a.logo-img")) {
            $(".logo-img img").attr("src", "assets/img/logo-euforia-" + colorName + ".png");
        }
}


function switcher_menu(version) {
        
        // Update version menu 
        if(version === 'v2') {           
               $(".menu").addClass('menu-v2');
        }else if(version === 'v1') {           
               $(".menu").removeClass('menu-v2');
        }
        
}
function switcher_bg(color) {
        
        $(".page-wrapper").removeClass()
                .addClass('page-wrapper')
                .addClass('page-'+color);
        
}
 
function switcher_color(x) {

        type_style = document.querySelector('link[rel="stylesheet/less"]');
        
        if(type_style) {
            // EDIT TO LESS 
            less.modifyVars({'@color-default': '@color-'+x});   
        } else {
            // EDIT TO CSS
            $("link#style-color").attr("href", "assets/css/style-" + x + ".css");  
        }        
}
