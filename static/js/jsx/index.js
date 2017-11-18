// 菜单
var UMenu = require("./menu.js");
// 提醒
var Notification = require("./notification.js");
// 用户
var UserInfo = require("./user.js");


var UserManager = require("./user-manager.js");





class UIndex extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        module_id:'',
		user_name:''
      };
      this.onMenuClick = this.onMenuClick.bind(this);
      this.showMainContent = this.showMainContent.bind(this);
	  this.setData = this.setData.bind(this);
    }

    componentDidMount(){
	    var url = window.document.location.origin +'/getLoginMsg';
        $.ajax({
              type:'POST',
              dataType:'json',
              url:url,//'/setDetail/setvalues',
              data:{},
              cache: false,
              contentType: false,
              processData: false,
              success:this.setData
          })
	
	}


	setData(r){
	   this.setState({
            user_name : r['oaid'] || ''
        });
	}


    showMainContent(){
        var module_id = this.state.module_id;
        var content = (
         <div>
            WelCome
         </div>
        );
        switch (module_id){
         case '1':
             content = (<UserManager/>) ;
             break;
         default:
             content = (
                <div>
                   WelCome
                </div>
            );
          }
        return (
          <div>
              {content}
          </div>
        )
    }
    

    onMenuClick(key){
       var module_id = key ; 
       this.setState({
           module_id:module_id
       })    
    }


    render(){
        return (
            <div>
                <div className="Layout-Header">
                    <div className="Sys-Image">
                        <div className="sys-name-bg">
                            <span className="sys-name">xx系统demo</span>
                        </div>
                    </div>
			        <div className="User-Info">
		                欢迎您：{this.state.user_name}
			        </div>
                    <div className="Notification">
                      <Notification/>
                    </div>
                    <div className="User-Setting">
                      <UserInfo/>
                    </div>
                </div>
                <div className="Layout-Main">
                   <div className="left">
                       <UMenu onMenuClick ={this.onMenuClick }/>
                   </div>
                   <div className="right">
			            {this.showMainContent()}         
                   </div>
                </div>
            </div>
            )
    }

} 


ReactDOM.render(
    <UIndex/>, document.getElementById('body')
);

