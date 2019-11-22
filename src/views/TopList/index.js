import React, { Component } from 'react'
import { list } from "../../common/API"

export default class TopList extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        let id = this.props.location.state;
        this.$http.get(list,{params:{id}}).then(res=>{
            console.log(res)
            this.setState({
                songList:res.data.data.songList
            })
        })
    }
    render() {
        
        return (
            <div>
                <ul>
                    {

                    }
                </ul>
            </div>
        )
    }
}
