$(document).ready(function(){
    $('#label-add').mousedown(function(){
		var i = 0;
        var label_css = {
			'width':'750px',
           	'margin-top':'1em'
		}
        if($('#label-container').length == 0){
           	$('#label-add').after($('<div id="label-container"></div>'));
        	$('#label-container').css(label_css);
        }
        if($('#label-add-input').val()){
            var label_str = "<button type='button' class='btn br-btn-org br-btn-margin br-label-upload'>"+$('#label-add-input').val()+"</button>"
            $('#label-container').append($(label_str));
            $('.br-label-upload').click(function(){this.remove();i--;});
            $('#label-add-input').val('');
        }
        else{
            $('#label-add-input').attr('placeholder','请输入标签名');
        }
    });
    $('#upload-submit').mousedown(function(){
        var labels = $('.label-upload');
        var label_str = "";
        var l_length = labels.length;
        for(var i=0;i<l_length;i++){
            label_str += $(labels[i]).text()+";";
        }
        $('#upload-label').val(label_str);
        $('form').trigger('submit');
    });
});