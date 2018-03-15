# AngularModules
Learning different html components and converting it into modules so that they can be used elsewhere

# Things that are going to be added are
Carousel<br>
lightbox<br>
Image grid<br>
Overlay<br>
Card<br>
Image Comparision slider


use this for full screen
function test(){
        
       var element = document.getElementById('div3');
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    }
