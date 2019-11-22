import React, { Component } from 'react'
import { Button, Icon } from "antd"
import { play,lyric } from "../../common/API"
export default class Plays extends Component {
    constructor(props) {
        super(props)
        this.state = {
            songsrc:""
        }
    }
    componentDidMount() {
        console.log(this.props.location.state)
        //mid为歌曲id
        let mid = this.props.location.state.mid
        this.$http.get(play,{params:{mid}}).then(res=>{
            console.log(res.data)
            let songsrc = this.state.songsrc
            songsrc = res.data
            this.setState({
                songsrc
            })
        })
        //songid为歌词id
        let songid = this.props.location.state.songid
        this.$http.get(lyric,{params:{songid}}).then(res=>{
            console.log(res)
        })  
    }
    bf() {    
        let audio = this.refs.audio              
        if(audio!==null){             
          //检测播放是否已暂停audio.paused在播放器播放时返回false.
          console.log(audio.paused)
          if(audio.paused) {                 
            audio.play();//播放  
          }else{
           audio.pause();//暂停
          }
        } 
    }
    render() {
        return (
            <div className="play">
                <div className="lyric">

                </div>
                <div className="control">
                    <div className="control-btn">
                        <audio src={this.state.songsrc} controls="controls" ref="audio" hidden></audio>
                        <Icon className="icont" type="play-circle" onClick={()=>this.bf()}></Icon>
                    </div>
                <Button type="primary" style={{width:180,height:40,background:'#00e09e',border:"none"}} shape="round" size="large">下载歌曲</Button>
                </div>
            </div>
        )
    }
}
