$(document).ready(function(){
	var featureSet=$('#features'),
		featuresHTML=[],
		configData=config.getData();

	config.data.forEach(function(dataGroup, index){
		/*<fieldset>
            <legend>页面分析</legend>
            <ul>
                <li>
                    <label for="">DOM</label>
                    <input type="checkbox" name="" id="">
                </li>
            </ul>    
        </fieldset>*/
		featuresHTML.push('<fieldset><legend>'+dataGroup.name+'</legend><ul>');
		dataGroup.submenu.forEach(function(f,fIndex){
			featuresHTML.push('<li><label for="">'+f.name+'</label><input type="checkbox" name="" id=""></li>');
		});
		featuresHTML.push('</ul></fieldset>');
	});

	console.log(featuresHTML);
});