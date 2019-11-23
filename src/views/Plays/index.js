import React, { Component } from 'react'
import { Button, Icon } from "antd"
import { play,lyric } from "../../common/API"
export default class Plays extends Component {
    constructor(props) {
        super(props)
        this.state = {
            songsrc:"",
            lyric:[]
        }
    }
    componentDidMount() {
        // console.log(this.lyrics())
        // this.lyrics()
        // console.log(this.lyricstxt)
        console.log(this.props.location.state)
        //mid为歌曲id
        let mid = this.props.location.state.mid
        this.$http.get(play,{params:{mid}}).then(res=>{
            console.log(res.data)
            this.setState({
                songsrc:res.data
            })
        })
        //songid为歌词id
        let songid = this.props.location.state.songid
        this.$http.get(lyric,{params:{songid}}).then(res=>{
            console.log(res)
            let lyric = this.state.lyric
            lyric = res.data.data.lyric
            this.setState({
                lyric
            })







            
            







           
        })  
    }
    
    play() {    
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
    // lyrics(){
    //     console.log(this.state.lyric,123)
    //     var lrc = String(this.state.lyric);
    //     if(lrc.length==0) return;
    //     var lyricstxt = []; //存放歌词
    //     console.log(lyricstxt)
    //     var lrcs = lrc.split('\n');//用回车拆分成数组
    //     for(var i in lrcs) {//遍历歌词数组
    //         lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
    //         var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));//取[]间的内容
    //         var s = t.split(":");//分离:前后文字
    //         if(!isNaN(parseInt(s[0]))) { //是数值
    //             var arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
    //             var start = 0;
    //             for(var k in arr){
    //                 start += arr[k].length; //计算歌词位置
    //             }
    //             var content = lrcs[i].substring(start);//获取歌词内容
    //             console.log(content)
    //             lyricstxt.push(content);
    //         }
    //     }
    //     console.log(lyricstxt)
    //     // return lyricstxt;
    // }
    
    render() {
        // console.log(this.state.lyric)
        // const lyric = this.state.lyric.map((item,index)=>{
        //     return (
        //         <li>{item}</li>
                
        //     )
        // })
        return (
            <div className="play">
                <div className="lyric">
                   <ul id="song-lyric">
                       {/* {lyric} */}
                       {this.state.lyric}
                   </ul>
                </div>
                <div className="control">
                    <div className="control-btn">
                        <audio src={this.state.songsrc} controls="controls" ref="audio" preload='true' autoPlay hidden></audio>
                        <Icon className="icont" type="play-circle" onClick={()=>this.play()}></Icon>
                    </div>
                <Button type="primary" style={{width:180,height:40,background:'#00e09e',border:"none"}} shape="round" size="large">下载歌曲</Button>
                </div>
            </div>
        )
    }
}
