import {Table,Button,Icon} from 'antd';
var WrappedAdvancedSearchForm = require("./advanced-search-form.js");
var UModal = require("./modal.js");
var UModalForm = require("./modal-form.js");
var UModalFormShow = require("./modal-form-show.js");
var SUpload = require("./upload.js");
var request = require("../utils/request.ajax.js");
var base64 = require("../utils/base64.js");


 const columns_data = [
    {'title':'客户名称', 'dataIndex':'cust_name','key':'cust_name','width':150},    
    {'title':'操作日期', 'dataIndex':'apply_data','key':'apply_data','width':150},    
    //{'title':'工号归属营业厅', 'dataIndex':'apply_dot','key':'apply_dot','width':150},    
    {'title':'工号归属营业厅(默认)', 'dataIndex':'belong_dot','key':'belong_dot','width':150},    
    {'title':'工号归属部门', 'dataIndex':'apply_dep','key':'apply_dep','width':150},    
    {'title':'退费操作人', 'dataIndex':'apply_person','key':'apply_person','width':150},    
    {'title':'受理号码', 'dataIndex':'phone_num','key':'phone_num','width':150},    
    {'title':'退费金额', 'dataIndex':'refund_money','key':'refund_money','width':150},    
	{'title':'退费原因描述', 'dataIndex':'refund_des','key':'refund_des','width':150},
	{'title':'退费附件', 'dataIndex':'ach','key':'ach','width':150},
	{'title':'二次稽核是否通过', 'dataIndex':'r_review','key':'r_review','width':150}
]


const add_modal_fields = [
    {'title':'客户名称', 'id':'cust_name','type':'input','disabled':false,'required':true},    
    {'title':'操作日期', 'id':'apply_data','type':'date','disabled':false,'required':true},  
    {'title':'退费操作人', 'id':'apply_person','type':'input','disabled':false,'required':true},    
    {'title':'受理号码', 'id':'phone_num','type':'input','disabled':false,'required':true},    
    {'title':'退费金额', 'id':'refund_money','type':'input','disabled':false,'required':true},    
    {'title':'退费原因描述(没有请填无)', 'id':'refund_des','type':'input','disabled':false,'required':true},
    {'title':'附件', 'id':'ach','type':'singlefile','disabled':true,'required':true}
]



const edit_modal_fields = [
    {'title':'客户名称', 'id':'cust_name','type':'input','disabled':false,'required':true},    
    {'title':'操作日期', 'id':'apply_data','type':'date','disabled':false,'required':true},  
    {'title':'退费操作人', 'id':'apply_person','type':'input','disabled':false,'required':true},    
    {'title':'受理号码', 'id':'phone_num','type':'input','disabled':false,'required':true},    
    {'title':'退费金额', 'id':'refund_money','type':'input','disabled':false,'required':true},    
    {'title':'退费原因描述(没有请填无)', 'id':'refund_des','type':'input','disabled':false,'required':true},
    {'title':'附件', 'id':'ach','type':'singlefile','disabled':true,'required':false}
]



const show_modal_fields = [
    {'title':'客户名称', 'id':'cust_name','type':'input','disabled':false,'required':true},    
    {'title':'操作日期', 'id':'apply_data','type':'date','disabled':false,'required':true},  
    {'title':'退费操作人', 'id':'apply_person','type':'input','disabled':false,'required':true},    
    {'title':'受理号码', 'id':'phone_num','type':'input','disabled':false,'required':true},    
    {'title':'退费金额', 'id':'refund_money','type':'input','disabled':false,'required':true},    
    {'title':'二次稽核是否通过', 'id':'r_review','type':'input','disabled':false,'required':true},    
    {'title':'工号归属部门', 'id':'apply_dep','type':'searchselect','disabled':false,'required':true},    
    {'title':'工号归属营业厅', 'id':'belong_dot','type':'input','disabled':false,'required':true},    
    {'title':'退费原因描述', 'id':'refund_des','type':'input','disabled':false,'required':false},
    {'title':'附件', 'id':'ach','type':'singlefile','disabled':true,'required':false}
]



const advanced_search_fields = [
    {'title':'客户名称', 'id':'cust_name','type':'input'},    
    {'title':'操作日期', 'id':'apply_data','type':'input'},  
    {'title':'退费操作人', 'id':'apply_person','type':'input'},    
    {'title':'受理号码', 'id':'phone_num','type':'input'},    
    {'title':'退费金额', 'id':'refund_money','type':'input'},    
    {'title':'退费原因描述', 'id':'refund_des','type':'input'}
]




const attr_map = {
    '1830':'cust_name',  //客户名称
    '1831':'apply_data', //申请日期
    '1832':'apply_dot',  //申请营业厅
    '1833':'apply_dep',  //申请退费部门
    '1834':'apply_person', //申请人
    '1835':'phone_num',  //产品号码
    '1836':'account_code', //账号编码
    '1837':'product_code', //产品编码
    '1838':'refund_money',  //退费金额
    '1839':'level',  //审批级别
    '1840':'refund_type', //退费类型
    '1841':'refund_method', //退费方式
    '1842':'rec_des', //票据回收情况
    '1843':'refund_r',//退费原因
    '1844':'refund_des',//退费原因描述

    '1858':'r_refund_method',//补充退费方式
    '1859':'r_refund_type', //补充退费类型
    '1860':'ach',  //附件
    '1861':'r_review',//二次稽核是否通过
    '1879':'belong_dot'
}




class RefundManager extends React.Component{
   constructor(props){
       super(props);
       this.state = {
           get_table_dtUrl:'/refund/get_refund_list',
           get_table_dtUrl_by_c:'/refund/get_refund_list_by_c',
           get_form_dtUrl:'/refund/get_refund_id',
           add_form_Url:'/refund/add_refund',
           update_form_Url:'/refund/update_refund',
           download_url:'/refund/downloadAch',
           download_excel:'/refund/downloadExcel',
           download_vilidate_url:'/refund/downloadVilidate',
		   uploadFile:'/refund/uploadFile',
		   del_url:'/refund/del_refund',
           table_dataSource:[],
           type:'',
           key_id:'',
           modal_visible:false,
           modal_form_visiblee:false,
           modal_form_show_visiblee:false,
		   modal_fields:[],
           table_loading_flag:true,
		   bind_list:[],
		   search_obj:{},
		   cover_visible:false,
           currentPage:1,
		   data_Counts:0,
           instance_ids:[],
           options_v:[],
           modal_fields_value:{},
           old_modal_fields_value:{}
       };
       this.loadTableData = this.loadTableData.bind(this);
       this.setTableColumns = this.setTableColumns.bind(this);
       this.editSource = this.editSource.bind(this);
       this.showData = this.showData.bind(this);
       this.setFormData = this.setFormData.bind(this);
       this.setFormDataShow = this.setFormDataShow.bind(this);
       this.showModal = this.showModal.bind(this);
       this.showModalForm = this.showModalForm.bind(this);
       // 关闭模态框
       this.handleCancel = this.handleCancel.bind(this);
       this.showHandleCancel = this.showHandleCancel.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       this.add_before = this.add_before.bind(this);
       this.update_before = this.update_before.bind(this);
       this.dealState = this.dealState.bind(this);
       this.handleSearch = this.handleSearch.bind(this);
       this.setTableLoadingFlag = this.setTableLoadingFlag.bind(this);
	   this.select_records = this.select_records.bind(this);

	   this.downloadModal = this.downloadModal.bind(this);
	   this.downloadExcel = this.downloadExcel.bind(this);      

	   this.downloadAch = this.downloadAch.bind(this);      
	   this.downloadFile = this.downloadFile.bind(this);      
       this.vilidate = this.vilidate.bind(this);
       this.type_vilidata = this.type_vilidata.bind(this);

	   this.reload = this.reload.bind(this);
       this.changePageNumber = this.changePageNumber.bind(this);
       this.add_options_select = this.add_options_select.bind(this);
       this.deleteDt = this.deleteDt.bind(this);
       this.del_confirm = this.del_confirm.bind(this);

       this.post_add_file = this.post_add_file.bind(this);
       this.post_update_file = this.post_update_file.bind(this);

       
    }



   changePageNumber(pageNum){
	  var self = this;
	  this.setState({currentPage:pageNum},function(){
	       self.reload()
	   })
   }



   reload(){
	   this.setTableLoadingFlag(); //加载数据
       var is_exit = false;
       for(var i=0;i<advanced_search_fields.length;i++){
           if (advanced_search_fields[i]['id'] == 'belong_dot'){
               is_exit = true;
           }
       }
       if (!is_exit){
           advanced_search_fields.push({
               'title':'归属营业厅',
               'id':'belong_dot',
               'type':'searchselect'
           }) 
       }
       var ads = JSON.stringify(advanced_search_fields);
	   var o = this.state.search_obj;
       var o_str = JSON.stringify(o);
       var url = window.document.location.origin+ this.state.get_table_dtUrl;
	   var pagenum = this.state.currentPage;
       var instance_ids = this.state.instance_ids;
       var str_instance_ids = JSON.stringify(instance_ids)
       request.requestAjaxNS.request(url,'POST',
                                {'data':o_str,'current_page':pagenum,'page_counts':20,'instance_ids':str_instance_ids,'fields':ads},
                                'json',
                                this.loadTableData);
   }





   search_reload(){
	   this.setTableLoadingFlag(); //加载数据
	   var o = this.state.search_obj;
       var o_str = JSON.stringify(o);
       var ads = JSON.stringify(advanced_search_fields);
       var url = window.document.location.origin+ this.state.get_table_dtUrl_by_c;
	   var pagenum = this.state.currentPage;
       var instance_ids = this.state.instance_ids;
       request.requestAjaxNS.request(url,'POST',
                                {'data':o_str,'current_page':pagenum,'page_counts':20,'instance_ids':'','fields':ads},
                                'json',
                                this.loadTableData);
   }






   componentWillMount(){
       this.reload()
   }




   /*
   downloadModal(){
       var download_url = window.document.location.origin + this.state.download_url;
       request.requestAjaxNS.request(download_url,'POST',
                                {},
                                'json',
                                this.downloadExcel);
   }
   */



    downloadModal(){
        window.location.href = window.document.location.origin + this.state.download_excel;
    }



   downloadAch(o){
       if(o.ach == null){
           alert("该记录没有附件,无法下载！");
           return
       }
       var instance_id = o.key;
       var download_vilidate_url = window.document.location.origin + this.state.download_vilidate_url + '/'+instance_id;
       var download_url = window.document.location.origin + this.state.download_url + '/'+instance_id;

       $.ajax({
            url:download_vilidate_url, //需要链接到服务器地址
            secureuri:false,
            fileElementId:'ach',//文件选择框的id属性
            data:{},  
            success:function(data){
                var dt = JSON.parse(data)
                if(dt.flag){
                    window.location.href = download_url
                }else{
                    alert(dt.msg);
                }
                //self.dealState(data)
            },
            error:function(data){
                alert("下载失败!");
            }
        });
   }





   deleteDt(){
       var instance_list = [];
       var rs = this.state.bind_list;
       var flag = true;
	   for (var i=0;i<rs.length;i++){
			var o = rs[i]['key'];
            if(rs[i]['r_review']=='是'){
                alert("客户名称【"+rs[i]['cust_name']+"】已审核通过，不能删除！")
                flag=false;
                break;
            }else{
                instance_list.push(o)
            }
	   }
       if(!flag){
           return
       }

       if (instance_list.length==0){
           alert("请选择需要删除的记录！")
           return
       }
   
       var list_str = JSON.stringify(instance_list)
       var url = window.document.location.origin+ this.state.del_url;
       request.requestAjaxNS.request(url,'POST',
                                {'instance_ids':list_str},
                                'json',
                                this.del_confirm);
   }




   del_confirm(r){
       this.reload()
   }




   downloadExcel(r){
        var curWwwPath=window.document.location.origin;
        window.location.href = curWwwPath + "/" + r['root'];
   }




   downloadFile(r){
        var curWwwPath=window.document.location.origin;
        window.location.href = curWwwPath + "/" + r['root'];
   }





   select_records(r_list){
        var self = this;
        this.setState({
            bind_list:r_list
        })
    }





   handleSearch(o){
	   var self = this; 
       this.setState({search_obj:o},function(){
	       self.search_reload()
	   })
    }



   add_before(o){
       var c_options_attr = [];
       var ops = this.state.options_v;
       for(var i=0;i<ops.length;i++){
            c_options_attr.push(ops[i]['attr_name']) 
       }
       // 附件类型属性
       var file_attrs = [];
       for (var i=0;i<this.state.modal_fields.length;i++){
            if (this.state.modal_fields[i]['type']=='singlefile'){
                file_attrs.push(this.state.modal_fields[i]['id']) 
            }
       }
       for (var i in o){
            //下拉选线属性
            if (c_options_attr.indexOf(i)!= -1){
               var v = ''
               for (var j=0;j<ops.length;j++){
                   if (i==ops[j]['attr_name']) {
                        var vs = ops[j]['c']['options'];
                        for (var k=0;k<vs.length;k++){
                            if (o[i]==vs[k]['id']){
                                v = {'value':vs[k]['text'],'value_source_code_id':vs[k]['id']}
                            }
                        }
                   }
               }
               o[i] = v
            }
            //文件类型属性
            if (file_attrs.indexOf(i)!=-1){
                var v = '';
                if (o[i]!=''){
                    v = {'value':'','value_file_name':''}
                }else{
                    v = {'value':'','value_file_name':''}
                }
                o[i] = v
            }
        }
       return o
    }



    update_before(o){
        var o1 = this.add_before(o);
        var vl = [];
        var objs = this.state.old_modal_fields_value;
        console.log(o1)
        console.log(objs)
        for (var i=0;i<objs.length;i++){
           var tmp_obj =objs[i];
           if(tmp_obj["attr_id"] == '1832' || tmp_obj['attr_id'] == '1833' 
              || tmp_obj['attr_id'] == '1861'|| tmp_obj['attr_id'] == '1879'){
              console.log("ticket")
           }else{
              vl.push(tmp_obj)
           }
        }
        console.log("::::::")
        for (var i=0;i<vl.length;i++){
            var attr_name = attr_map[vl[i]["attr_id"]]
            vl[i]["attr_name_e"] = attr_name;
        }
        console.log(vl)
        for (var i=0;i<vl.length;i++){
            for (var j in o1){
                if (vl[i]["attr_name_e"] == j){
                    vl[i]["v"] = o1[j]
                }
            }
        }
        var vs = [];
        for(var i=0;i<vl.length;i++){
            if (vl[i]["attr_name_e"] != undefined){
                vs.push(vl[i])
            }
        }
        return vs
    }




    handleSubmit(o,type,key_id){
        var r = this.vilidate(o)
		if (r['flag'] == false){
			alert("请输入"+r['message']);
			return
		}
        var o = this.type_vilidata(o)
        if (type=='add'){
            o = this.add_before(o);
            var o_str = JSON.stringify(o);
            var url = window.document.location.origin+this.state.add_form_Url;
            this.post_add_file(url,o_str)
        }else if (type=='update'){
            var o2 = this.update_before(o);
            var o_str = JSON.stringify(o2);
            var url = window.document.location.origin+ this.state.update_form_Url;
            this.post_update_file(url,key_id,o_str)
        }
    }



    post_add_file(url,o_str){
        var self = this;
        $.ajaxFileUpload({
            url:url, //需要链接到服务器地址
            secureuri:false,
            fileElementId:'ach',//文件选择框的id属性
            data:{'o':o_str},  
            dataType:'json',//服务器返回的格式，可以是json
            success:function(data){
                self.dealState(data)
            },
            error:function(){
                alert("保存失败!");
            }
        });
    }




    post_update_file(url,instance_id,o_str,rstatus){
        var self = this;
        $.ajaxFileUpload({
            url:url, //需要链接到服务器地址
            secureuri:false,
            fileElementId:'ach',//文件选择框的id属性
            data:{'instance_id':instance_id,'o':o_str,'rstatus':rstatus},  
            dataType:'json',//服务器返回的格式，可以是json
            success:function(data){
                self.dealState(data)
            },
            error:function(){
                alert("保存失败!");
            }
        });
    }




    type_vilidata(o){
        for(var i in o ){
			if (o[i]==undefined || o[i] == '' || o[i] == null){
				o[i]='';
				continue
			}
            if (i == 'start_time'){
                var c = o[i].split('-');
                o[i] = c.join('/');
            }
            if (i == 'end_time'){
                var c = o[i].split('-');
                o[i] = c.join('/');
            }
			if (i == 'next_info_time'){
                var c = o[i].split('-');
                o[i] = c.join('/');
            }
        }
        return o
    }



    vilidate(o){
       var required_fields = [];
       var modal_fields = this.state.modal_fields;
	   for(var i=0;i<modal_fields.length;i++){
	      if(modal_fields[i]['required'] == true){
		      required_fields.push({
			    'title':modal_fields[i]['title'],
				'id':modal_fields[i]['id']
			  })
		  }
	   }
	   var all_flag = true; 
	   var flag = false;
	   var message = ''
	   for (var i in o ){
		   all_flag = true; 
           message = ''
		   flag = false;
		   for(var j=0;j<required_fields.length;j++){
		       if(i == required_fields[j]['id']){
			       flag = true;
				   message = required_fields[j]['title'];
				   break
			   }
		   }
		  if(flag == true){
			  if(o[i] == '' || o[i] == undefined){
				  all_flag = false
			  }
		   }
		   if(all_flag == false){
		      break
		   }
	   }
	   return {'flag':all_flag,'message':message}
	}



    dealState(state){
       // 如果成功
	   if (state.flag){
		   this.handleCancel();  //关闭modal
		   this.reload()
	   }else{   // 如果失败
           var msg = '';
           msg = state.msg;
           alert(msg)
	       this.handleCancel();  //关闭modal
	   }
    }




    setTableLoadingFlag(){
       this.setState({
           table_loading_flag:true
       })
    }



    editSource(o){
       var url = window.document.location.origin+ this.state.get_form_dtUrl;
       this.setState({
           modal_form_visible:true,
           type:'update',
           key_id:o.key,
       })
       request.requestAjaxNS.request(url,'POST',
                                {'instance_id':o.key},
                                'json',
                                this.setFormData);
    }


    showData(o){
           var url = window.document.location.origin+ this.state.get_form_dtUrl;
           this.setState({
               modal_form_show_visible:true,
               type:'update',
               key_id:o.key,
           })
           request.requestAjaxNS.request(url,'POST',
                                    {'instance_id':o.key},
                                    'json',
                                    this.setFormDataShow);
    }




    add_options_select(mf){
       var olist = []
       for (var i=0;i<this.state.options_v.length;i++){
            var tmp = this.state.options_v[i];
            var attr_name = attr_map[tmp['attr_id']]
            tmp['attr_name'] = attr_name;
            olist.push(tmp);
       }
       for (var i=0;i<mf.length;i++){
            var t = mf[i];
            if (t['type'] == 'select' || t['type'] == 'searchselect'){
               var vs = []
               for (var j=0;j<olist.length;j++){
                   if (t['id'] == olist[j]['attr_name']){
                       for (var k=0;k<olist[j]['c']['options'].length;k++){
                           vs.push({
                           'id':''+olist[j]['c']['options'][k]['id']+'',
                           'value':olist[j]['c']['options'][k]['text']
                           })
                       }
                   }
               }
               t['options'] = vs
            }
        }
       return mf
    }
   


    setFormData(r){
       var instance_id = r['attr_list']['instance_id'];
       var template_id = r['attr_list']['template_id'];
       var v = r['attr_list']['values'];
       var kv = {};
       for (var i=0;i<v.length;i++){
           var attr_name = attr_map[''+v[i]['attr_id']+'']
           var attr_type = ''
           for (var j=0;j<edit_modal_fields.length;j++){
               if (attr_name == edit_modal_fields[j]['id']){
                   attr_type =  edit_modal_fields[j]['type']
               } 
           }
           var _kv = '';
           if (attr_type == 'select' || attr_type == 'searchselect'){
               v[i]['value'] == null ? _kv = '' : _kv = v[i]['value_source_code_id']
           }else if (attr_type == 'singlefile' ){
               v[i]['value'] = ''
           }else{
               v[i]['value'] == null ? _kv = '' : _kv = v[i]['value']
           }
           kv[attr_name] = _kv
           
       }
       var mf = this.add_options_select(edit_modal_fields)
       this.setState({
           modal_fields_value:kv,
		   modal_fields:mf,
           old_modal_fields_value:v
       })
    }




    setFormDataShow(r){
       var instance_id = r['attr_list']['instance_id'];
       var template_id = r['attr_list']['template_id'];
       var v = r['attr_list']['values'];
       var kv = {};
       for (var i=0;i<v.length;i++){
           var attr_name = attr_map[''+v[i]['attr_id']+'']
           var attr_type = ''
           for (var j=0;j<show_modal_fields.length;j++){
               if (attr_name == show_modal_fields[j]['id']){
                   attr_type =  show_modal_fields[j]['type']
               } 
           }
           
           var _kv = '';
           if (attr_type == 'select' || attr_type == 'searchselect'){
               v[i]['value'] == null ? _kv = '' : _kv = v[i]['value_source_code_id']
           }else if (attr_type == 'singlefile' ){
               v[i]['value'] = ''
           }else{
               v[i]['value'] == null ? _kv = '' : _kv = v[i]['value']
           }
           kv[attr_name] = _kv
           
       }
       var mf = this.add_options_select(show_modal_fields)
       this.setState({
           modal_fields_value:kv,
		   modal_fields:mf,
           old_modal_fields_value:v
       })
    }







    showModal(){
        this.setState({
          modal_visible:true,
        });
    }






    showModalForm(){
        var olist = []
        for (var i=0;i<this.state.options_v.length;i++){
            var tmp = this.state.options_v[i];
            var attr_name = attr_map[tmp['attr_id']]
            tmp['attr_name'] = attr_name;
            olist.push(tmp);
        }

        var mf = this.add_options_select(add_modal_fields)
        this.setState({
          modal_form_visible: true,
          type:'add',
          modal_fields_value:{},
		  modal_fields:mf
        });
    }



    handleCancel(){
       this.setState({
          modal_form_visible:false,
          modal_fields_value:{}
        });
    }


    showHandleCancel(){
       this.setState({
          modal_form_show_visible:false,
          modal_fields_value:{}
        });
    }




    setTableColumns(){
        var columns = [] ;
        for(var i=0;i<columns_data.length;i++){
            if(i<2){
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
                   width:columns_data[i]['width'],
                })
            }
        }


        columns.push({
            title: '操作',
            key: 'operation',
            width: 230,
            fixed:'right',
            render:(text,record)=>( //塞入内容
                <span>
                　　<a href="#" className="edit-data" onClick={this.downloadAch.bind(null,text)}>附件下载</a>
                　　<a href="#" className="edit-data" onClick={this.editSource.bind(null,text)}>编辑</a>
                　　<a href="#" className="edit-data" onClick={this.showData.bind(null,text)}>详情查看</a>
                </span>
            ),
        })
        return columns
    }






    loadTableData(r){
	   var rs = [];
	   rs = r['rs'];
       var dataSource = [];
       var options_v = [];
       r['options_v'] == undefined ? options_v = this.state.options_v : options_v = r['options_v'] 
       for(var i=0;i<rs.length;i++){
           dataSource.push({
              key:rs[i]['instance_id'],
		      cust_name:rs[i]['cust_name'],
			  apply_data:rs[i]['apply_data'],
			  apply_dot:rs[i]['apply_dot'],
			  apply_dep:rs[i]['apply_dep'],
			  apply_person:rs[i]['apply_person'],
			  phone_num:rs[i]['phone_num'],
			  account_code:rs[i]['account_code'],
		      product_code:rs[i]['product_code'],
			  refund_money:rs[i]['refund_money'],
			  level:rs[i]['level'],
			  refund_type:rs[i]['refund_type'],
			  refund_method:rs[i]['refund_method'],
			  rec_des:rs[i]['rec_des'],
			  refund_r:rs[i]['refund_r'],
			  refund_des:rs[i]['refund_des'],
              r_review:rs[i]['r_review'],
              ach:rs[i]['ach'],
              belong_dot:rs[i]['belong_dot']
           })
       }

       this.setState({
            table_dataSource:dataSource,
            table_loading_flag:false,
			bind_list:[],
			data_Counts:r['totalnum'],
            instance_ids:r['instance_ids'],
            options_v:options_v
       }) 
    }


    render(){
		var self = this;
		var s_list = [];
		for(var i =0;i<this.state.bind_list.length;i++){
		    s_list.push(this.state.bind_list[i]['key'])
		}

        const rowSelection = {
			  selectedRowKeys:s_list,
              onChange(selectedRowKeys, selectedRows) {
                  //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              },
              onSelect(record, selected, selectedRows) {
                  console.log(selectedRows);
				  self.select_records(selectedRows)
              },
              onSelectAll(selected, selectedRows, changeRows) {
                  //console.log(selected, selectedRows, changeRows);
				  self.select_records(selectedRows)
              },
         };
		
         var dataSource = this.state.table_dataSource;
         var dataSource_length = this.state.data_Counts;
         var columns =this.setTableColumns();
		 var currentPage = this.state.currentPage;
         var _advanced_search_fields = this.add_options_select(advanced_search_fields)
         return(
             <div>
                 <div className="Advance-Search">
                     <WrappedAdvancedSearchForm 
                         advanced_search_fields = {advanced_search_fields}
                         handleSearch = {this.handleSearch}
                     />
                 </div>

                 <div className="Button-Group">
                    <Button type="primary" onClick={this.showModalForm}>
                        新增
                    </Button>
                    <Button type="primary" icon="delete" size='default' onClick={this.deleteDt}>
                        删除
                    </Button>
                    <Button type="primary"  size='default'>
                        批量导出(开发中...)
                    </Button>
                 </div>
                 
                <div>
                    <UModalForm visible ={this.state.modal_form_visible}  
                                handleCancel={this.handleCancel} 
                                modal_fields = {this.state.modal_fields}
                                modal_fields_value = {this.state.modal_fields_value}
                                type = {this.state.type}
                                key_id = {this.state.key_id}
                                handleSubmit={this.handleSubmit} 
                    /> 
                </div>




                <div>
                    <UModalFormShow visible ={this.state.modal_form_show_visible}  
                                handleCancel={this.showHandleCancel} 
                                modal_fields = {this.state.modal_fields}
                                modal_fields_value = {this.state.modal_fields_value}
                                type = {this.state.type}
                                key_id = {this.state.key_id}
                                handleSubmit={this.handleSubmit} 
                    /> 
                </div>





                <div className="Table">
                     <Table dataSource={dataSource} columns={columns} scroll={{x:2000,y:550}}
                         loading ={this.state.table_loading_flag}
						 rowSelection={rowSelection}
                         pagination={{
                             total:dataSource_length, //数据总数量
							 current:currentPage,
                             defaultPageSize:20, //默认显示几条一页
                             showTotal:function(){  //设置显示一共几条数据
                                    return '共 '+dataSource_length+' 条数据'; 
                             },
							 onChange:function(pageNumber){
                                 self.changePageNumber(pageNumber)
							 }
                         }}
                     />
                </div>

            </div>
         ) 
        }

    }


module.exports = RefundManager;



