import {Menu,Icon} from 'antd';
const SubMenu = Menu.SubMenu;
var request = require("../utils/request.ajax.js");

class UMenu extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
          menus:[],
          url:''
      };
      this.displayMenus = this.displayMenus.bind(this)
      this.displaySubMenus = this.displaySubMenus.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.setMenus = this.setMenus.bind(this)
    }


   componentWillMount(){
       var url = window.document.location.origin+'/get_menus';
       request.requestAjaxNS.request(url,'GET',
                                {},
                                'json',
                                this.setMenus);
   }


    setMenus(rs){
       this.setState({
           menus:rs
       })   
    }


    // 显示菜单
    displayMenus(){
       var menus = this.state.menus;
       var self = this; 
       return menus.map(function(item,index){
           return(
            <SubMenu key={item.key} title={<span><Icon type={item.type} /><span>{item.name}</span></span>}>
                   {self.displaySubMenus(item.children)}
            </SubMenu>
           )
       })
    }


    // 显示子菜单
    displaySubMenus(sub_menus){
        var self = this;
        return sub_menus.map(function(item,index){
            return (
                <Menu.Item key={item.key}>{item.name}</Menu.Item>
            )
        })
    }

   
    handleClick(e){
       var key = e.key;
       this.props.onMenuClick(key);
    }


    render(){
        return (
           <Menu
            onClick={this.handleClick}
            style={{ width: 240 }}
            defaultOpenKeys={['sub1','sub2','sub3']}
            theme='dark'
            mode="inline"
          >
                {this.displayMenus()}
          </Menu>           
            )
        }
    } 

module.exports = UMenu;

