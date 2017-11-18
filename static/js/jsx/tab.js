import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;
var ContractDepStatics = require("./contract-dep-statics.js");
var ContractPersonStatics = require("./contract-person-statics.js");

class UTab extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          defaultActiveKey:'1',
		  tabs:[
		      {'tab_name':'部门合同统计','icon':'appstore','key':'1'},
			  {'tab_name':'人员合同统计','icon':'user','key':'2'}
		  ]
      };
      this.drawTabPanes = this.drawTabPanes.bind(this);
	  this.drawPane = this.drawPane.bind(this);
    }


    componentWillMount(){
       
    }



    componentWillReceiveProps(nextProps){   
   
    }


    drawTabPanes(){
		var self = this;
		var tabs = this.state.tabs;
	    return tabs.map(function(item,index){
            return (
               <TabPane tab={<span><Icon type={item.icon} />{item.tab_name}</span>} key={item.key}>
			       {self.drawPane(item.key)}
			   </TabPane>
            ) 
        })
	}

	
	drawPane(key){
		var content = (
         <div>
            WelCome
         </div>
        );
	     switch (key){
			 case '1':
				 content = (<ContractDepStatics/>) ;
				 break;
			 case '2':
				 content = (<ContractPersonStatics/>);
				 break;
			 default:
				 content = (<div></div>);
        }
        return (
          <div>
              {content}
          </div>
        )
	}





    render(){
		var defaultActiveKey = this.state.defaultActiveKey;
        return (
           <div className="Statics-Tab">
				<Tabs defaultActiveKey={defaultActiveKey}>
			        {this.drawTabPanes()}
				</Tabs>
		   </div>
        )
    }
} 

module.exports = UTab;

