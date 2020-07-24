import React, {Component} from 'react'

class Home extends Component{
    constructor(props){
        super(props);
        this.state ={
            msg: "It's Good To Be home"
        }
    }

    render(){
        const imageStyle = {
            width: 400
        }
        return(
            <div>
                <p>{this.state.msg}</p>
                <img style={imageStyle} src="https://i.ytimg.com/vi/N1icEHtgb3g/maxresdefault.jpg" alt="home" />
            </div>
        )
    }
}

export default Home