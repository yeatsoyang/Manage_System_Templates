import { Form, Row, Col, Input, Button, Icon , Select ,DatePicker} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
import moment from 'moment';

class AdvancedSearchForm extends React.Component{
    constructor(props){
       super(props);
       this.state = {
           expand:false,
           fields:props.advanced_search_fields
       };
       this.handleReset = this.handleReset.bind(this)
       this.toggle = this.toggle.bind(this)
       this.getFields = this.getFields.bind(this)
       this.drawType = this.drawType.bind(this)
       this.drawType = this.drawType.bind(this)
       this.handleSearch = this.handleSearch.bind(this)
       this.deepCopy = this.deepCopy.bind(this)
     }



    handleReset(){
        this.props.form.resetFields();
    }




    toggle(){
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }




    handleSearch(){
        var v = {}
        var r_v = {}
        this.props.form.validateFields((err, values) => {
              v = values
        });
        r_v = this.deepCopy(v)
        for (var i in r_v){
            if( (r_v[i]) == undefined ){
                delete r_v.i
            }
        }
        this.props.handleSearch(r_v)
    }



    
    
    deepCopy(oldValue) { 
      var newValue
      var strValue = JSON.stringify(oldValue)
      return newValue = JSON.parse(strValue)
    }






   drawType(item,getFieldDecorator,formItemLayout){
        switch (item.type) {
          case "select":return  (<div>{this.drawSelect(item,getFieldDecorator,formItemLayout)}</div>);
          case "searchselect":return  (<div>{this.drawSearchSelect(item,getFieldDecorator,formItemLayout)}</div>);
          case "date": return (<div>{this.drawDate(item,getFieldDecorator,formItemLayout)}</div>);
		  case "rangedate": return (<div>{this.drawRangeDate(item,getFieldDecorator,formItemLayout)}</div>);
          case "file":return (<div>暂无</div>)
          case "input":return  (<div>{this.drawInput(item,getFieldDecorator,formItemLayout)}</div>)  
          default:return (<div>{this.drawInput(item,getFieldDecorator,formItemLayout)}</div>);
        }
    }





    // 带搜索条件的下拉控件
    drawSearchSelect(item,getFieldDecorator,formItemLayout){
		var os = item['options'];
        return (
            <FormItem
                id="select"
                label={item['title']}
                labelCol={{ span:8}}
                wrapperCol ={{span:8}}
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
        )
    }





    // 下拉控件
    drawSelect(item,getFieldDecorator,formItemLayout){
		var os = item['options'];
        return (
            <FormItem
                id="select"
                label={item['title']}
                labelCol={{ span:8}}
                wrapperCol ={{span:8}}
                >
                {getFieldDecorator(''+item['id']+'',{initialValue:item['value']})(
                    <Select id="select" size="large"  style={{ width: 200 }} 
                        >
                         { os && this.renderOptions(os)}
                    </Select>
                )}
            </FormItem>
        )
    }







    renderOptions(dt) {
        return dt.map(element=><Option key={element.id} value={element.id}>{element.value}</Option>);
    }







    
    // 输入控件
    drawInput(item,getFieldDecorator,formItemLayout){
       return (
            <FormItem
                id="control-input"
                label={item['title']}
                labelCol={{ span:8}}
                wrapperCol ={{span:8}}
                >
                 {getFieldDecorator(''+item['id']+'')(
                     <Input id="control-input" placeholder=""
                 />
                 )}
            </FormItem>
        ) 
    }


      // 日期控件
     drawDate(item,getFieldDecorator,formItemLayout){
        return(
            <FormItem
                label={item['title']}
                labelCol={{ span:8}}
                wrapperCol ={{span:8}}
                >
                 {getFieldDecorator(''+item['id']+'')(
                     <DatePicker />
                  )}
            </FormItem>
        ) 
     }

    // 日期跨度控件
    drawRangeDate(item,getFieldDecorator,formItemLayout){
        return (
            <FormItem
                id=""
                label={item['title']}
                labelCol={{ span:8}}
                wrapperCol ={{span:8}}
                >
                {getFieldDecorator(''+item['id']+'')(
                      <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
                )}
            </FormItem>
        )
     }




    // To generate mock Form.Item
    getFields(){
        var fields = this.state.fields;
        var self = this;
        const count = this.state.expand ? fields.length:6;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 5 },
          wrapperCol: { span: 19 },
        };
        const children = [];
      
        for (let i=0;i<fields.length;i++) {
          children.push(
            <Col span={8} key={fields[i]['id']} style={{ display: i < count ? 'block' : 'none' }}>
                {self.drawType(fields[i],getFieldDecorator,formItemLayout)}
            </Col>
          );
        }
        return children;
      }





    render(){
         return(
            <Form
            className="ant-advanced-search-form">
                <Row gutter={40}>{this.getFields()}</Row>
                <Row>
                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit"  onClick={this.handleSearch}>查询</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                      清除查询条件
                    </Button>
                    <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                    展开<Icon type={this.state.expand ? 'up' : 'down'} />
                    </a>
                  </Col>
                </Row>
            </Form>
         ) 
        }
    }

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
module.exports = WrappedAdvancedSearchForm;

