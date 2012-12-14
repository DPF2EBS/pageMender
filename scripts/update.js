var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36435133-1']);
_gaq.push(['_trackPageview','update.html']);

(function() {
  var ga = document.createElement('script'); 
  ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; 
  s.parentNode.insertBefore(ga, s);
})();

$(document).ready(function(){
	var buttons=$('#button>a'),
		updateTips=$('.features-tips').eq(0);

	buttons.eq(1).click(function(){
		window.close();
	});

	updateTips.find("input").eq(0).change(function(){
		var status=$(this).attr("checked");
		// console.log(status);

		if(status){
			localStorage.pageMenderUpdateNotice="no";
		}else{
			localStorage.removeItem("pageMenderUpdateNotice");
		}
	});
});