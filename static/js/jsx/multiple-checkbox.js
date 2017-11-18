import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['角色1', '角色2', '角色3'];
const defaultCheckedList = ['角色1'];


class UMulCheckbox extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
          checkedList:defaultCheckedList,
          indeterminate:true,
          checkAll:false
      };

      this.onChange = this.onChange.bind(this);
      this.onCheckAllChange = this.onCheckAllChange.bind(this);
    }


   componentWillMount(){

   }


   onChange(checkedList){
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });
   }


   onCheckAllChange(e){
        this.setState({
          checkedList: e.target.checked ? plainOptions : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
   }


   render(){
        return (
            <div>
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                  <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}
                  >
                  全选
                  </Checkbox>
                </div>
                <br />
                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
            </div>
        )
    }
} 

module.exports = UMulCheckbox;

