// import jquery

import { Upload, message, Button, Icon } from 'antd';
var Cover = require("./cover.js");

class SUpload extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
          url:props.upload_url,
          file_id:props.file_id,
		  cover_visible:false,
		//upload_accept:'.xls,.doc,.txt,.pdf'
		  upload_accept:'.xls'
      };
      this.uploadFile = this.uploadFile.bind(this);
	  this.dealFunc = this.dealFunc.bind(this)
    }


   componentWillMount(){

   }



   componentWillReceiveProps(nextProps){
	   var cover_visible = nextProps.cover_visible
	   this.setState({
	       cover_visible:cover_visible
	   })
   
   }


   dealFunc(r){
       this.props.dealFunc(r)
   }


   uploadFile(){
	   var self  = this;
       var file_id = this.state.file_id;
       var file = $("#"+file_id).val();
       if(file == ''){
          alert("请选择文件！");
          return
       }
       var upload_url = this.state.url;
	   this.setState({
	       cover_visible:true
	   })
       $.ajaxFileUpload({
            url:upload_url, //需要链接到服务器地址
            secureuri:false,
            fileElementId:this.state.file_id,//文件选择框的id属性
            data:{},  
            dataType:'json',//服务器返回的格式，可以是json
            success:function(data){
                self.dealFunc(data)
            },
            error:function(data,status,e){
                alert("导入失败");
				self.setState({
	                cover_visible:true
	            })
            }
       });
        
   }



   render(){
       
        return (
            <div className="File-Upload">
                <input type="file" style={{backgroundColor:'rgb(206, 211, 214)'}} 
		               id={this.state.file_id} name={this.state.file_id}  accept={this.state.upload_accept} ></input>
                <div className="File-Commit">
                    <Button type="primary" icon="upload" size="small" onClick={this.uploadFile}>提交</Button>
                </div>

			    <div>
                    <Cover cover_visible={this.state.cover_visible}/>
                </div>
            </div>
        )
    }
} 

module.exports = SUpload;

