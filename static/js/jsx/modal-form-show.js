import {Button,Modal,Form,Input,Radio,Select,message,DatePicker,Col,Icon,Upload} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;


class UModalForm extends React.Component {
     constructor(props){
       super(props);
       this.state = {
           visible:false,
           fields:props.modal_fields,
           fields_value:[],
           fields_change_value:[],
           type:'',
           key_id:''
       };
       this.handleCancel = this.handleCancel.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
     }


     componentWillMount(){

     }


     componentWillReceiveProps(nextProps){
         this.setState({ 
             visible:nextProps.visible,
             fields_value:nextProps.modal_fields_value,
             type:nextProps.type,
             key_id:nextProps.key_id,
             fields:nextProps.modal_fields
         });
     }


      handleCancel(){
         this.props.handleCancel();
      }



      handleSubmit(o,type,key_id){
         this.props.handleSubmit(o,type,key_id);
      }




      render() {
        return (
           <Modal
              visible={this.state.visible}
              title=""
              width="800px"
              wrapClassName="vertical-center-modal"
              style={{top:20}}
              closable = {false}
              footer = {false} >
                  <InnerForm 
                     fields = {this.state.fields}
                     type = {this.state.type}
                     key_id = {this.state.key_id}
                     fields_value = {this.state.fields_value}
                     fields_change_value = {this.state.fields_change_value}
                     handleSubmit = {this.handleSubmit}
                     handleCancel={this.handleCancel}
                  />
           </Modal>
        );
      }
}



class InnerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fields:props.fields,
            type:props.type,
            key_id:props.key_id,
            fields_value:props.fields_value,
            fields_change_value:props.fields_change_value
        }
        //this.loadDatas = this.loadDatas.bind(this)
        //this.drawForm = this.drawForm.bind(this)
        //this.drawType = this.drawType.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.deepCopy = this.deepCopy.bind(this)
    }



    onDateChange(date,dateString,e){
       console.log(dateString)
    }




    componentWillReceiveProps(nextProps){
        this.setState({ 
            fields:nextProps.fields,
            type:nextProps.type,
            key_id:nextProps.key_id,
            fields_value:nextProps.fields_value,
            fields_change_value:nextProps.fields_change_value
        });
    }





    componentDidMount(){
	    this.props.form.resetFields();
	}


 


    drawForm(getFieldDecorator,formItemLayout,uploadprops){
        var self = this;
        var fields = this.deepCopy(this.state.fields);
        
        for(var i=0;i<fields.length;i++){
            fields[i]['value'] = ''
        }

        var fields_value =this.state.fields_value;
        var type = this.state.type;
        if (type=="update"){
            for(var i=0;i<fields.length;i++){
               for (var j in fields_value){
                    if (fields[i]['id'] == j){
                        fields[i]['value'] = String(fields_value[j]);
                    }
               }
             }
         }

		 if(type=="add"){
		     for(var i=0;i<fields.length;i++){
                 fields[i]['disabled'] = false;
             }
		 }

         return fields.map(function(item,index){
            return (
                <div key={index} className="Form-Content">
                    {self.drawType(item,getFieldDecorator,formItemLayout,uploadprops)}
                </div>
            ) 
        })
    }





   drawType(item,getFieldDecorator,formItemLayout,uploadprops){
        item['disabled'] = true;
        switch (item.type) {
          case "select":return  (<div>{this.drawSelect(item,getFieldDecorator,formItemLayout)}</div>);
          case "searchselect":return  (<div>{this.drawSearchSelect(item,getFieldDecorator,formItemLayout)}</div>);
          case "date": return (<div>{this.drawDate(item,getFieldDecorator,formItemLayout)}</div>);
          case "singlefile":return (<div>{this.drawFile(item,getFieldDecorator,formItemLayout,uploadprops)}</div>)
          case "input":return  (<div>{this.drawInput(item,getFieldDecorator,formItemLayout)}</div>)  
          default:return (<div>{this.drawInput(item,getFieldDecorator,formItemLayout)}</div>);
        }
   }



   
   

   drawFile(item,getFieldDecorator,formItemLayout,uploadprops){
       return (
            <div className="Form-Item">
                <FormItem
                    id="control-input"
                    label={item['title']}
                    labelCol={{ span:8}}
                    wrapperCol ={{span:8}}
					required= {item['required']}
                    >
                     {getFieldDecorator(''+item['id']+'',{initialValue:item['value']})(
                          <input type="file" name={item['id']} style={{backgroundColor:'rgb(232, 237, 241)'}}  ></input>
                     )}
                </FormItem>
            </div>
       )
   }





    // 带搜索框的下拉列表
    drawSearchSelect(item,getFieldDecorator,formItemLayout){
        var os = item['options'];
        return (
            <div className="Form-Item">
                <FormItem
                    id="select"
                    label={item['title']}
                    labelCol={{ span:8}}
                    wrapperCol ={{span:8}}
					required= {item['required']}
                    >
                    {getFieldDecorator(''+item['id']+'',{initialValue:item['value']})(
                        <Select id="select" size="large"  style={{ width: 200 }} 
                            showSearch
						    optionFilterProp="children"
							disabled={item['disabled']}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                            { os && this.renderOptions(os)}
                        </Select>
                    )}
                </FormItem>
            </div>
        )
    }







    // 下拉控件
    drawSelect(item,getFieldDecorator,formItemLayout){
        var os = item['options'];
        return (
            <div className="Form-Item">
                <FormItem
                    id="select"
                    label={item['title']}
                    labelCol={{ span:8}}
                    wrapperCol ={{span:8}}
					required= {item['required']}
                    >
                    {getFieldDecorator(''+item['id']+'',{initialValue:item['value']})(
                        <Select id="select" size="large"  style={{ width: 200 }} 
                            disabled={item['disabled']}
                            >
                            { os && this.renderOptions(os)}
                        </Select>
                    )}
                </FormItem>
            </div>
        )
    }



    renderOptions(dt) {
        return dt.map(element => <Option key={element.id} value={element.id}> {element.value}</Option>);
    }
    
 

    // 输入控件
    drawInput(item,getFieldDecorator,formItemLayout){
       return (
            <div className="Form-Item">
                <FormItem
                    id="control-input"
                    label={item['title']}
                    labelCol={{ span:8}}
                    wrapperCol ={{span:8}}
					required= {item['required']}
                    >
                     {getFieldDecorator(''+item['id']+'',{initialValue:item['value']})(
                         <Input id="control-input" placeholder="" disabled={item['disabled']}  
                     />
                     )}
                </FormItem>
            </div>
        ) 
    }



    // 文本控件
    drawTextArea(){
    

    }


    // 日期控件
    drawDate(item,getFieldDecorator,formItemLayout){
        var v = ''
        var flag = false;
        if (item['value'] != undefined && item['value'] != ''){
            v = item['value'];
            flag = true
        }
        const dateFormat = 'YYYY-MM-DD';
        if(flag){
            return(
                <div className="Form-Item">
                    <FormItem
                        label={item['title']}
                        labelCol={{ span:8}}
                        wrapperCol ={{span:8}}
						required= {item['required']}
                        >
                         {getFieldDecorator(''+item['id']+'',{initialValue:moment(""+v+"",dateFormat)})(
                             <DatePicker  onChange={this.onDateChange.bind(this)} disabled={item['disabled']}/>
                          )}
                    </FormItem>
                </div>
            ) 
        }else{
           return(
                <div className="Form-Item">
                    <FormItem
                        label={item['title']}
                        labelCol={{ span:8}}
                        wrapperCol ={{span:8}}
						required= {item['required']}
                        >
                         {getFieldDecorator(''+item['id']+'')(
                             <DatePicker  onChange={this.onDateChange.bind(this)} disabled={item['disabled']}/>
                          )}
                    </FormItem>
                </div>
            ) 
        }
    }
   

     // 提交表单
    handleSubmit(e) {
        var v = {}
        this.props.form.validateFields((err, values)=>{
            v = values
        });

        for (var i in v){
            if ( typeof(v[i])== 'object'&& v[i] != null){
                v[i] = v[i].format('YYYY-MM-DD')
            }
        }
        var type = this.state.type;
        var key_id = this.state.key_id;
        this.props.handleSubmit(v,type,key_id)
    }


    handleCancel(){
      this.props.form.resetFields();
      this.props.handleCancel()
    }


   deepCopy(oldValue) { 
      var newValue
      var strValue = JSON.stringify(oldValue)
      return newValue = JSON.parse(strValue)
    }




   render(){
       const { getFieldDecorator } = this.props.form;
       const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 8 }
       }
       const success = function () {
            message.success('操作成功!');
       }

       const uploadprops = {
           beforeUpload:(file)=>{
              return false;
           },
           multiple:false
       }



       return (
            <Form layout="inline">
                 <a href="#" className="Form-Close">
                     <Icon type="close" onClick={this.handleCancel.bind(null,this)}/>
                 </a>
                 <div className="Form-Div">
                     {this.drawForm(getFieldDecorator,formItemLayout,uploadprops)}
                 </div>
            </Form>
       )
   
   }

}

InnerForm = Form.create()(InnerForm)

module.exports = UModalForm;

