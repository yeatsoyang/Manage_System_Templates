import {Table,Button} from 'antd';
var WrappedAdvancedSearchForm = require("./advanced-search-form.js");
var UModal = require("./modal.js");
var UModalForm = require("./modal-form.js");
var SUpload = require("./upload.js");
var Cover = require("./cover.js");


 const columns_data = [
    {'title':'合同编号', 'dataIndex':'c_id','key':'c_id','width':70},    
    {'title':'合同流水号', 'dataIndex':'c_num','key':'c_num','width':70},    
    {'title':'合同名称', 'dataIndex':'c_name','key':'c_name','width':150},    
    {'title':'含增值税合同金额', 'dataIndex':'c_fee','key':'c_fee','width':150},    
    {'title':'合同类型', 'dataIndex':'c_categorys','key':'c_categorys','width':150},    
    {'title':'对方全称', 'dataIndex':'cust_name','key':'cust_name','width':150},    
    {'title':'合同状态', 'dataIndex':'c_state','key':'c_state','width':100},    
    {'title':'承办部门', 'dataIndex':'c_duty_dep','key':'c_duty_dep','width':150},    
    {'title':'承办人', 'dataIndex':'c_duty_man','key':'c_duty_man','width':150},    
    {'title':'合同性质', 'dataIndex':'c_property','key':'c_property','width':150},    
    {'title':'履行起始日期', 'dataIndex':'c_starttime','key':'c_starttime','width':150},    
    {'title':'履行截止日期', 'dataIndex':'c_endtime','key':'c_endtime','width':150},    
    {'title':'履行部门', 'dataIndex':'c_execute_dep','key':'c_execute_dep','width':150},    
    {'title':'履行人', 'dataIndex':'c_execute_man','key':'c_execute_man','width':150},    
    {'title':'合同说明及签订依据', 'dataIndex':'c_detail','key':'c_detail','width':150},    
    {'title':'导入状态', 'dataIndex':'c_im_state','key':'c_im_state','width':100},    
    {'title':'导入状态备注', 'dataIndex':'c_im_decription','key':'c_im_decription','width':150},
    {'title':'合同完成状态', 'dataIndex':'c_finish_state','key':'c_finish_state','width':100}
]


const modal_fields = [
    {'title':'测试','value_store_type':'select','id':'1',
     'options':[
           {'id':'1','value':'选项1'},
           {'id':'2','value':'选项2'},
           {'id':'3','value':'选项3'},
           {'id':'4','value':'选项4'},
           {'id':'5','value':'选项5'}
     ]
    },
    {'title':'测试1','value_store_type':'input','id':'2'},
    {'title':'测试2','value_store_type':'select','id':'3',
     'options':[
           {'id':'1','value':'选项1'},
           {'id':'2','value':'选项2'},
           {'id':'3','value':'选项3'},
           {'id':'4','value':'选项4'},
           {'id':'5','value':'选项5'}
     ]
    },
    {'title':'测试3','value_store_type':'date','id':'4'},
    {'title':'测试3','value_store_type':'date','id':'5'},
    {'title':'测试3','value_store_type':'date','id':'6'}

]



const advanced_search_fields = [
    {'title':'测试','value_store_type':'select','id':'1',
     'options':[
           {'id':'1','value':'选项1'},
           {'id':'2','value':'选项2'},
           {'id':'3','value':'选项3'},
           {'id':'4','value':'选项4'},
           {'id':'5','value':'选项5'}
     ]
    },
    {'title':'测试1','value_store_type':'input','id':'2'},
    {'title':'测试2','value_store_type':'select','id':'3',
     'options':[
           {'id':'1','value':'选项1'},
           {'id':'2','value':'选项2'},
           {'id':'3','value':'选项3'},
           {'id':'4','value':'选项4'},
           {'id':'5','value':'选项5'}
     ]
    },
    {'title':'测试3','value_store_type':'date','id':'4'},
    {'title':'测试3','value_store_type':'date','id':'5'},
    {'title':'测试3','value_store_type':'date','id':'6'}
]




class UTable extends React.Component{
    constructor(props){
       super(props);
       this.state = {
           modal_visible:false,
           modal_form_visiblee:false,
           cover_visible:false
       };
       // 加载table数据
       this.setTableData = this.setTableData.bind(this);
       this.editSource = this.editSource.bind(this);
       this.showModal = this.showModal.bind(this);
       this.showModalForm = this.showModalForm.bind(this);
       // 关闭模态框
       this.handleCancel = this.handleCancel.bind(this);
       // 打开遮罩层
       this.downloadData = this.downloadData.bind(this);
    }


    editSource(text){
       this.setState({
           modal_form_visible:true,
           type:'update',
           modal_fields_value:[{'id':'1','value':'1'},
                               {'id':'2','value':'xxxx'}
                              ]
       })
    }
   
    showModal(){
        this.setState({
          modal_visible:true,
        });
    }


    showModalForm(){
        this.setState({
          modal_form_visible: true,
          type:'add',
          modal_fields_value:[]
        });
    }

    handleCancel(){
       this.setState({
          modal_form_visible:false,
          modal_fields_value:[]
        });
    }



   downloadData(){
      var v = {}
      var url = window.document.location.origin+'/downloadData';
      var nv = {}
      for (var i in v){
        if (v[i] != undefined && v[i] != ''){
            nv[i] = v[i]
        }
      }

      this.setState({
          cover_visible:true,
      });

      /*
      request.requestAjaxNS.request(url,'GET',
                               {'data':vs},
                                'json',
                                this.downloadExcel);
     */
    }



    setTableData(){
        var dataSource = [];
        var columns = [] ;
        for(var i=0;i<columns_data.length;i++){
            if (i<3){
                columns.push({
                   title:columns_data[i]['title'],
                   dataIndex:columns_data[i]['dataIndex'],
                   key:columns_data[i]['key'],
                   width:columns_data[i]['width'],
                   fixed:'left'
                })
            }else{
                columns.push({
                   title:columns_data[i]['title'],
                   dataIndex:columns_data[i]['dataIndex'],
                   key:columns_data[i]['key'],
                   width:columns_data[i]['width']
                })
            }
        }
        columns.push({
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render:(text,record)=>( //塞入内容
            <span>
            　　<a href="#" className="edit-data" onClick={this.editSource.bind(null,text)}>编辑</a>
            </span>
            ),
        })
        
       for(var i=0;i<100;i++){
           dataSource.push({
              key: i,
              c_id: '胡彦斌'+i,
              c_num: 32,
              c_name: '西湖区湖底公园1号' 
           })
       }
       return {'data':dataSource,'columns':columns}
    }


    render(){
        const rowSelection = {
              onChange(selectedRowKeys, selectedRows) {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              },
              onSelect(record, selected, selectedRows) {
                console.log(record, selected, selectedRows);
              },
              onSelectAll(selected, selectedRows, changeRows) {
                console.log(selected, selectedRows, changeRows);
              },
         };
         var rs = this.setTableData();
         var dataSource = rs['data'];
         var columns = rs['columns'];
         return(
             <div>
                 <div className="Advance-Search">
                     <WrappedAdvancedSearchForm 
                         advanced_search_fields = {advanced_search_fields}
                     />
                 </div>

                 <div className="Button-Group">
                    <Button type="primary" onClick={this.showModalForm}>
                        新增
                    </Button>
                    <Button type="primary">
                        批量修改
                    </Button>
                    <Button type="primary" icon="download" size='default' onClick={this.downloadData}>查询结果下载</Button>
                    <SUpload />
                 </div>
                 

                 <div>
                    <UModal visible ={this.state.modal_visible} /> 
                 </div>


                <div>
                    <UModalForm visible ={this.state.modal_form_visible}  
                                handleCancel={this.handleCancel} 
                                modal_fields = {modal_fields}
                                modal_fields_value = {this.state.modal_fields_value}
                                type = {this.state.type}
                    /> 
                </div>


                <div className="Table">
                     <Table dataSource={dataSource} columns={columns} 
                         scroll={{y:450}}
                         rowSelection={rowSelection}
                         pagination={{
                             total:100, //数据总数量
                             defaultPageSize:20 //默认显示几条一页
                         }}
                     />
                </div>

                <div>
                    <Cover cover_visible={this.state.cover_visible}/>
                </div>

            </div>
         ) 
        }

    }


module.exports = UTable;
