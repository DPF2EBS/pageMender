var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36435133-1']);
_gaq.push(['_trackPageview','options.html']);

(function() {
  var ga = document.createElement('script'); 
  ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; 
  s.parentNode.insertBefore(ga, s);
})();

$(document).ready(function(){
	var featureSet=$('#features'),
		buttons=$('#button>a'),
		featuresHTML=[],
		configData=config.getData();

	configData.forEach(function(dataGroup, index){
		// if(dataGroup.dataType){return false;}
		//featuresHTML.push('');
		featuresHTML.push('<fieldset><legend><input type="checkbox" name="" id="" '+(!dataGroup.disabled?"checked":"")+'/>' + dataGroup.name + '</legend><ul>');
		dataGroup.submenu.forEach(function(f,fIndex){
			featuresHTML.push('<li class="button"><input type="checkbox" name="'+(dataGroup.dataType?"other":"")+'" id="" '+((!dataGroup.disabled&&!f.disabled)?"checked":"")+'/><label for="">'+f.name+'</label></li>');
		});
		featuresHTML.push('</ul></fieldset>');
	});

	featureSet.html(featuresHTML.join(''));

	var checkParent=featureSet.find("legend>input"),
		checkLi=featureSet.find("ul"),
		checkChild=featureSet.find("li>input");

	checkParent.each(function(i){		
		$(this).change(function(){
			checkLi.eq(i).find("input").attr("checked",this.checked);
		});
	});

	checkChild.change(function(){
		var p=$(this).parent().parent().parent(),
			c=p.find("li>input"),
			pt=p.find("legend>input"),
			ck=false;

		c.each(function(){			
			if($(this).attr("checked")){ck=true;}
		});

		pt.attr("checked",ck);
	});

	//buttons
	buttons.eq(0).click(function(){
		var child;
		checkParent.each(function(i){
			if(!$(this).attr("checked")){
				config.data[i].disabled=true;
			}else{
				child=checkLi.eq(i).find("input");

				child.each(function(ci){
					if(!$(this).attr("checked")){
						config.data[i].submenu[ci].disabled=true;
					}else if($(this).attr("name")==='other'){
						config.data[i].submenu[ci].disabled=false;
					}
				});
			}
		});
		config.setData({data:config.data});
	});

	buttons.eq(1).click(function(){
		localStorage.clear();

		// localStorage.removeItem("pageMenderConfig");

		window.location.reload();
	});

	buttons.eq(2).click(function(){
		window.close();
	});


	setTimeout(function(){
		if(localStorage.getItem("installed")==="success"){
			localStorage.removeItem("installed");

			$('#success-info').removeClass('Hide');
		}
	},100);
});