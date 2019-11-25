import React, { Component } from 'react'
import { list } from "../../common/API"
import { Button, Icon } from 'antd';
import BScroll from 'better-scroll'
export default class TopList extends Component {
    constructor() {
        super()
        this.state = {
            data:{
                updateTime:"",
                totalSongNum:0,
                songList:[],
                topInfo:{}
            },
            el: "",
            pullup:"上拉加载",
            end: 20
        }
    }
    componentDidMount() {
        let id = this.props.location.state.id;
        this.$http.get(list,{params:{id}}).then(res=>{
            this.setState({
                data:{
                    updateTime:res.data.data.updateTime,
                    totalSongNum:res.data.data.totalSongNum,
                    songList:res.data.data.songList,
                    topInfo:res.data.data.topInfo
                }
            },() => {
                this.renderList(0, this.state.end);
                // better-scroll的前提条件
                // 1. 实例化的时候，第一个参数传的是需要做回弹滚动的元素(el)
                // 2. el有且仅有一个子元素(son)
                // 3. el高度固定，overflow:hidden
                // 4. son的高度必须大于el的高度
                let bs = new BScroll('.toplist', {
                    probeType: 2,
                    click:true
                })
                bs.on('scroll', () => {
                    console.log(bs.maxScrollY) 
                    if (bs.y < bs.maxScrollY) {
                        this.setState({
                            pullup: "释放加载"
                        })
                    }
                })
                bs.on('scrollEnd', () => {
                    console.log('end')
                    if (this.state.pullup == "释放加载") {
                        let end = this.state.end;
                        this.renderList(0, end+20)
                    }
                })
            })
        })
    }
    //点击歌曲跳转播放页播放
    play(songid,mid,index) {
        this.props.history.push({pathname:"/play",state:{songid,mid,index}})
    }
    renderList(start, end) {
        const el = this.state.data.songList.slice(start,end).map((item, index) => {
            return (
                <li key={index}>
                <div className="left">
                    <div className="subscript">{index+1}</div>
                    <div className="songName" onClick={()=>{this.play(item.songId,item.songMid,index)}}>
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
        this.setState({
            el,
            end,
            pullup: "上拉加载"
        })
        if (end > this.state.data.totalSongNum) {
            this.setState({
                pullup: "加载完成" 
            })
        }
    }
    render() {
        return (
            <div className="container toplist">
                <div className="box">
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
                        {this.state.el}
                        </ul>
                        <p className="pullup">{this.state.pullup}</p>
                    </div>
                </div> 
            </div>
        )
    }
}
