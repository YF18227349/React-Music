import React, { Component } from 'react'
import { top } from "../../../common/API"
export default class Rankings extends Component {
    constructor(props) {
        super(props)
        this.state = {
           data:[]
        }
    }
    componentDidMount() {
        this.$http.get(top).then(res=>{
            console.log(res.data.data)
            let data = res.data.data;
            this.setState({
                data
            })
        })
    }
    render() {
        return (
            <div className="rankings">
                <ul>
                    {
                        this.state.data.map((item,index)=>{
                            return (
                                <li key={item.id}>
                                    <div className="imgs">
                                        <img src={item.picUrl} alt=""/>
                                    </div>
                                    <div className="text">
                                        <h3>{item.title}</h3>
                                        {
                                            item.songList.map((item,index)=>{
                                                return (
                                                <p key={index}>
                                                        <span>{item.number}</span>
                                                        <span className="songName">{item.songName}</span>
                                                        <span>- {item.singerName}</span>
                                                </p>
                                                )
                                            })
                                        }
                                        {/* <span>></span> */}
                                    </div>
                                  
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
