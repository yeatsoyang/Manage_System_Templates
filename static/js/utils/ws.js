/**
 * jQuery ws
 * Versión 0.1
 * @author: yeatsoyang
 * @email: 
 * @license unicom
 */
$(document).ready(function(){   
	 var sockct;
     var host = "ws://" + '127.0.0.1'+ ":" + '9002' + "/";
	 console.log(host)
	 try{
		websocket = new WebSocket(host);
		websocket.onopen = function(msg){ 
		    console.log("connect open")
		}; 
		websocket.onclose = function(msg){ 
			console.log("connect close")
		}; 
		websocket.onmessage = function(msg){ 
			console.log(msg)
			console.log("connect close")
		}; 
		websocket.onerror = function(msg){ 
			
		}; 
	 }catch(ex){
	    console.log(ex)
	 }

});   

