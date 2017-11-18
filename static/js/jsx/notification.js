import { Badge ,Avatar } from 'antd';

class Notification extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
           notification:{}
      };
    }


   componentWillMount(){
       var notification = {
           'name':'未读消息',
           'counts':5
       }
       this.setState({
           notification:notification
       })
   }


    render(){
        var notification = this.state.notification;
        return (
            <a href="#">
                <Badge count={notification.counts}>
                    <Avatar shape="square" icon="message" />
                </Badge>
            </a>
        )
    }
} 

module.exports = Notification;

