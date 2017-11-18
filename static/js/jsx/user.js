import { Avatar,Menu,Dropdown} from 'antd'
var request = require("../utils/request.ajax.js");

class User extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
		  logout_url:'/logout'
      };
      this.handleMenuClick = this.handleMenuClick.bind(this);
	  this.logout = this.logout.bind(this);
    }


   componentWillMount(){
   }


   handleMenuClick(e){
	  if (e.key=='2'){
		  this.logout();
	  }
    }


   logout(){
	    var url = this.state.logout_url;
		var curWwwPath=window.document.location.origin;
        window.location.href = curWwwPath + url;
   }


   render(){
        const menu = (
          <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="1">用户信息</Menu.Item>
            <Menu.Item key="2">退出</Menu.Item>
          </Menu>
        );

        return (
             <Dropdown overlay={menu}>
                 <a>
                     <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                 </a>
             </Dropdown>
        )
    }
} 

module.exports = User;

