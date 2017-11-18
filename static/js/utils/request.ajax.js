/**
 * jQuery ajax
 * Versión 0.1
 * @author: yeatsoyang
 * @email: 
 * @license unicom
 */
(function(exports){
    var requestAjaxNS={};
    window.requestAjaxNS=requestAjaxNS||{};
	exports.requestAjaxNS=requestAjaxNS||{};


    var errorHandle={
        flag:false,
        msg:'处理出错',
        _errorHandle:function(){
            alert(errorHandle.msg);
        }
    };


    var successHandle={
        msg:'',
        _successHandle:function(result,return_type,func){
            if(typeof func=="function"){
                switch(return_type){
                    case('json'):
                        jsonObj_Handle(func,result);
                        break;
                    case('string'):
                        string_Handle(func,result);
                        break;
                    default:
                        string_Handle(func,result);
                        break;
                 } 
            }
        }
    };


    //request 
    requestAjaxNS.request=function(url,type,parameter,return_type,func){
        var _p ='';
        if("POST"==type){
             _p=parameter;
        }
        else{
            _p={data:JSON.stringify(parameter)};
        }
        $.ajax({
            url:url,
            type:type,
            data:_p,
            success:function(result){
                successHandle._successHandle(result,return_type,func);    
            },
            error:function(){
                errorHandle._errorHandle();
            }
        })
    }




    // JSON Obj Handle
    var jsonObj_Handle=function(func,result){
        var r =JSON.parse(result);
        func(r);
    }



    // String Handle
    var string_Handle=function(func,result){
        var r = result;
        func(r);
    }

})( this ? this : (module ? module.exports : {}) )

