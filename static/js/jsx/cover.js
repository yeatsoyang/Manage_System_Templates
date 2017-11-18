// 下载时遮罩层
class Cover extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cover_visible:props.cover_visible
        }
    }

    componentWillReceiveProps(props){
		this.setState({
			cover_visible:props.cover_visible
		})
    }

    render() {
        let info
        if(this.state.cover_visible){
           info = (
                <div className="Cover">
                    <img src="/static/images/giphy.gif" className="img"></img>
                    <span className="loading"> 
                        正在下载，请等待...
                    </span>
                </div>
           )
        }else{
            info = (
               <div></div>            
            )
        }
        return  (
            <div>
                {info}
            </div>
        )
    }
}

module.exports = Cover;

