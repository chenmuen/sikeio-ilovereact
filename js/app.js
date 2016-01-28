window.onload = function(){
	animateLogo();
	animateRobot();
	updateSliderControl();
	addSmoothScrolling();
}

window.onscroll = function() {
  // ...
  updateSliderControl();
}

function animateLogo(){
	TweenMax.fromTo("#react-logo",2,{
		css:{
			y:"0",
		}
	},{
		css:{
			y:"-50px",
		},
		repeat:-1,
		yoyo:true,
		ease: Power2.easeInOut,
	});

}

function animateRobot() {
	var t = new TimelineMax({yoyo:false,repeat:-1,ease:Power2.easeInOut,});
	t.to("#android-robot",0.5,{rotation:"-=10deg"})
	.to("#android-robot",0.75,{rotation:"+=20deg"})
	.to("#android-robot",0.25,{rotation:"-=10deg"});
}

function updateSliderControl() {
  // 获得所有的 slider 链接
  var links = document.querySelectorAll("#slider-control a");
  var sectionDemo = document.querySelector(".section");

  for(var i = 0; i < links.length; i++) {
    var link = links[i];

    // 获取被链接指向的部分
    var section = document.querySelector(link.link);
    var sectionTop = sectionDemo.offsetHeight * i;
    var sectionBottom = sectionDemo.offsetHeight * (i+1);

    // 检查 window.scrollY 是否在这部分中
    if(window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      link.className = "active";
    } else {
      link.className = "";
    }
  }
}

function scrollToElement(element,i) {
  var topOfElement = element.offsetHeight * i;

  TweenMax.to(window,1,{
    scrollTo: {
      y: topOfElement,
    },
    ease: Power2.easeInOut,
  });
}

function addSmoothScrolling() {
  var links = document.querySelectorAll("#slider-control a");


  for(var i = 0; i < links.length; i++) {
	  var link = links[i];

	  (function (_link,num) {
            _link.addEventListener(
                'click', stopDefAction, false
            );
            _link.addEventListener("click",function(event) {
              // `event` 是鼠标点击事件

              // BUG 警告！使用闭包或者 ES6 `let` 修复。
              var href = _link.href;

              href = href.substring(href.indexOf('#'),href.length);
              
              document.querySelector(".logo-text").innerHTML = href;
              var e = document.querySelector(href);

              scrollToElement(e,num);
            });
        })(link,i);
  }
}

function stopDefAction(evt) {
    evt.preventDefault();
}

