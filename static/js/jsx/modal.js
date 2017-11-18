import { Modal,Button } from 'antd';
var UModalForm = require("./modal-form.js");

class UModal extends React.Component{
     constructor(props){
       super(props);
       this.state = {
           loading:false,
           visible:false,
       };
       this.handleOk = this.handleOk.bind(this)
       this.handleCancel = this.handleCancel.bind(this)
     }


     componentWillMount(){

     }


     componentWillReceiveProps(nextProps){
         this.setState({ visible:nextProps.visible });
     }


     handleOk(){
        this.setState({ loading:true });
        setTimeout(function(){
           this.setState({ loading:false,visible:false});
        }, 3000);
      }


      handleCancel(){
          this.setState({ visible: false });
      }


      render(){
            const { visible, loading } = this.state;
            return (
              <div>
                    <Modal
                      visible={visible}
                      title="Title"
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      onText = "确认"
                      cancelText = "取消"
                    >
                        modal
                    </Modal>
              </div>
           )
        }
    }


module.exports = UModal;

