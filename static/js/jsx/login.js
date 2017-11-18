class NormalLoginForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      };

	  this.oa_vilidate = this.oa_vilidate.bind(this);
    }

   
    oa_vilidate(){
		var loc = window.document.location;
		var hostname = loc['hostname'];
		var port = loc['port'];
		var localhostPaht='http://'+hostname+':'+port;
		var url="http://gz.gd.unicom.local/open/oauth2/auth/?response_type=code&client_id=gz_refund&redirect_uri="+localhostPaht+"/leap_index";
		window.location.href=url
    }


    render(){
        return (
            <div>
			    <div className="Login-Form">
			    <a href="#" onClick = {this.oa_vilidate.bind(null)}>退费系统OA认证登陆</a>
			    </div>
			</div>
        )
    }

} 



ReactDOM.render(
    <NormalLoginForm/>, document.getElementById('body')
);

