import React, { Component } from 'react'
import { list } from "../../common/API"
import { Button, Icon } from 'antd';

export default class TopList extends Component {
    constructor() {
        super()
        this.state = {
            data:{
                updateTime:"",
                totalSongNum:0,
                songList:[],
                topInfo:{}
            }
        }
    }
    componentDidMount() {
        let id = this.props.location.state;
        this.$http.get(list,{params:{id}}).then(res=>{
            this.setState({
                data:{
                    updateTime:res.data.data.updateTime,
                    totalSongNum:res.data.data.totalSongNum,
                    songList:res.data.data.songList,
                    topInfo:res.data.data.topInfo
                }
            })
        })
    }
    //点击歌曲跳转播放页播放
    play(songid,mid) {
        this.props.history.push("/play",{songid,mid})
    }
    render() {
        console.log(this.state.data)
        const songList = this.state.data.songList.map((item, index) => {
            return (
            <li key={index}>
                <div className="left">
                    <div className="subscript">{index+1}</div>
                    <div className="songName" onClick={()=>{this.play(item.songId,item.songMid)}}>
                        <p>{item.songName}</p>
                        <p>
                        {
                        item.singer.map((s,i)=>{
                            return (
                                <span key={i}>{s.singerName}</span>
                            )
                        })
                        }
                        </p>
                    </div>
                </div>
                <div className="download">
                    <Icon type="download" />
                </div>
            </li>
            )
        })
        return (
            <div className="toplist">
                <div className="info">
                    <h3>{this.state.data.topInfo.listName}</h3>
                    <h3>{this.state.data.topInfo.listName} <span>第254天</span></h3>
                    <p>更新时间:<span>{this.state.data.updateTime}</span></p>
                    <Button type="primary" style={{width:200,height:30,background:'#00e09e',border:"none"}} shape="round" icon="caret-right" size="large"/>
                </div>
                <div className="list-item">
                    <p>
                        <span>排行榜</span>
                        &nbsp;
                        <span>共{this.state.data.totalSongNum}首</span>
                    </p>
                    <ul>
                        {songList}
                    </ul>
                </div>
            </div>
        )
    }
}
