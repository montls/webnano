window.onload = function(){
    time_transplate();
    //pagination();
    get_local_info();
    listen_scroll_change();
}
function time_transplate(){
    function $ms(i){
        return "string" == typeof(i) ? document.getElementsByClassName(i): i;
    };
    var t_l = $ms("js_time");
    var n_t = new Date();
    var m_y = n_t.getFullYear(),
        m_m = n_t.getMonth(),
        m_d = n_t.getDay(),
        m_h = n_t.getHours(),
        m_mi = n_t.getMinutes();
    console.log(1);
    for(var e=0;e<t_l.length;e++){
        var t = new Date(t_l[e].innerText);
        var tm_y = t.getFullYear(),
            tm_m = t.getMonth(),
            tm_d = t.getDay(),
            tm_h = t.getHours(),
            tm_mi = t.getMinutes();
        
        if(m_d == tm_d){
            if(m_h == tm_h){
                if(m_mi - tm_mi < 5){
                    t_l[e].innerText = '刚刚';
                }
                else{
                    t_l[e].innerText = ''+m_mi-tm_mi+'分钟前';
                }
            }
            else{
                t_l[e].innerText = ''+m_h-tm_h+'小时前';
            }
        }
        else{
            if(m_m == tm_m){
                if(m_y == tm_y){
                    t_l[e].innerText = ''+m_d-tm_d+'天前';
                }
                else{
                    t_l[e].innerText = ''+m_y-tm-y+'年前';
                }
            }
            else{
                t_l[e].innerText = ''+m_m-tm_m+'月前';
            }
        }
    }                
}

function get_local_info(){
    var lsc = $('#left-side-container');
    //console.log(''+document.body.clientHeight-80+'px');
    var lsc_css = {
			'height':''+$(document).height()-80+'px',
            'background-color':'white',
            'float':'left',
            'overflow':'auto',
            'width':'22%',
    };
    lsc.css(lsc_css);
    
    var ct = $('#container');
    var ct_css = {
        'width':'96%',
        'margin':'0 auto 0 0',
    }
    ct.css(ct_css);
}
function listen_scroll_event(){
    //while循环对进度条进行监控
    //如果true向服务器请求下一页
    
//    var oldSite=new Object();
//            oldSite.left=$("#floatRight").offset().left;
//            oldSite.top=$("#floatRight").offset().top;
//            $(window.document).scroll(function () {
//                var scrolltop = $(document).scrollTop();
//                var top=oldSite.top+scrolltop;
//                $("#floatRight").offset({ top: top });
//            });
}
/* 分页
function pagination(){
    var e = document.getElementById("index_articles");
    var q = e.innerText.split('.');
    q[0] = parseInt(q[0]);
    q[1] = parseInt(q[1]);
    var inner = '';
    if(q[1]<1 || q[1]-q[0]<0){
        e.innerHTML = inner;
    }
    else if(q[1]<7){
        e.innerHTML = f1(0,q[1],q[0]);
    }
    else if(q[1]-q[0]>2){
        e.innerHTML = f1(q[0]-3,7,q[0]);
    }
    else{
        e.innerHTML = f1(q[1]-6,7,q[0]);
    }
}
function f1(front,sum,current){
    var inner,c;
    c = current-1 ? current-1:current;
    inner = '<li><a href="/articles/'+ c +'">&laquo;</a></li>';
    for(var i = 0;i<sum;i++){
        inner += '<li><a href="/articles/' +(front+i+1)+'">'+(i+1)+'</a></li>';
    }
    current = sum-current?current+1:current;
    inner += '<li><a href="/articles/' +(current)+'">&raquo;</a></li>';
    return inner;
}
*/