window.onload = function(){
    var $ = function(id){
        return "string" == typeof(id) ? document.getElementById(id) : id;
    }
    $('file-source').onchange = function(){
        $('file-target').value = this.value;
    }
};