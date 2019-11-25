import React, { Component } from 'react'
import { Button, Icon } from "antd"
import { play,lyric } from "../../common/API"
export default class Plays extends Component {
    constructor(props) {
        super(props)
        this.state = {
            songsrc:"",
            currentTime:0,
            currentId:-1,
            oLRC:{
                ti: "", //歌曲名
                ar: "", //演唱者
                al: "", //专辑名
                by: "", //歌词制作人
                ms: [],//歌词以及时间
                lineNo: 0, //当前行
                C_pos: 6, //C位
                offset: 0, //滚动距离（应等于行高） //歌词数组{t:时间,c:歌词}
            },
            isPaused:false,
            pValue:0,
        }
    }
    componentWillUnmount(){   
        this.setState = (state)=>{ 
          return;
        };  
    }
    componentDidMount() {
        //mid为歌曲id
        let mid = this.props.location.state.mid
        this.$http.get(play,{params:{mid}}).then(res=>{
            console.log(res)
            this.setState({
                songsrc:res.data
            },() => {
                // this.refs.musicAudio.play()
                // this.playtimer = setInterval(() => { this.timeUpdate()}, 1000  );
            })
        })
        //songid为歌词id
        let songid = this.props.location.state.songid
        this.$http.get(lyric,{params:{songid}}).then(res=>{
            let lyric = res.data.data.lyric  
            this.createLrcObj(lyric);
            console.log(lyric)
        })   
    }
  
    createLrcObj(lrc) {
        let oLRC = this.state.oLRC
        if(lrc.length==0) return;
        var lrcs = lrc.split('[换行]');//用"[换行]"拆分成数组
        console.log(lrcs)
        for(var i in lrcs) {//遍历歌词数组
            lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
            var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));//取[]间的内容
            var s = t.split(":");//分离:前后文字
            // console.log(s)
            if(isNaN(parseInt(s[0]))) { //不是数值
                for (var i in oLRC) {
                    if (i != "ms" && i == s[0].toLowerCase()) {
                        oLRC[i] = s[1];
                    }
                }
            }else { //是数值
                var arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
                var start = 0;
                for(var k in arr){
                    start += arr[k].length; //计算歌词位置
                }
                var content = lrcs[i].substring(start);//获取歌词内容
                // console.log(content)
                for (var k in arr){
                    var t = arr[k].substring(1, arr[k].length-1);//取[]间的内容
                    var s = t.split(":");//分离:前后文字
                    oLRC.ms.push({//对象{t:时间,c:歌词}加入ms数组
                        t: (parseFloat(s[0])*60+parseFloat(s[1])).toFixed(3),
                        c: content
                    });
                }
            }
        }
        oLRC.ms.sort(function (a, b) {//按时间顺序排序
            return a.t-b.t;
        });
        this.setState({
            oLRC
        })
    }
    componentWillUnmount() {
        clearInterval(this.playtimer)
        this.playtimer = null;
    }
    //音频进度改变触发事件
    timeUpdate(){
        var musicAudio = this.refs.musicAudio
        let pValue = musicAudio.currentTime / (musicAudio.duration/100);
        this.setState({pValue:pValue})
        console.log(pValue)
        this.lyrScroll()
    }
    //歌词面板事件
    lyrScroll() {
        var musicAudio = this.refs.musicAudio
        let lyrArry = []
        this.state.oLRC.ms.map(function (lyr,i) {
            lyrArry.push(lyr.t)
        })
        lyrArry.forEach((item,index)=>{
            if (musicAudio.currentTime > Number(item)) {
                this.setState({ currentId: index})
            }
        })
    }
    play() {    
        var musicAudio = this.refs.musicAudio              
        if(musicAudio!==null){             
          //检测播放是否已暂停audio.paused在播放器播放时返回false.
          console.log(musicAudio.paused)
          this.setState({
            isPaused:musicAudio.paused
          })
          if(musicAudio.paused) {                 
            musicAudio.play();//播放  
            this.playtimer = setInterval(() => { this.timeUpdate()}, 1000  );
          }else{
            musicAudio.pause();//暂停
            clearInterval(this.playtimer)
            this.playtimer = null;
          }
        } 
    }
    //下一首
    playNext() {
        // console.log(this.state.oLRC)
        // console.log(this.props.location.state.index++)
    }
    render() {
        let { oLRC, currentId, isPaused } = this.state;
        const lyrics = this.state.oLRC.ms.map((item,index)=>{
            return (
               <p key={index} ref="li" className={currentId == index?'act':''}>{item.c}</p>
           )
        })
        return (
            <div className="play">
                <div className="title">
                   <Icon className="down" type="down" />
                   <h3>{oLRC.ti}</h3>
                </div>
                <div className="lyrics-box">
                   <div className="lyrics-panels" ref="ul" style={{top:- currentId * 35 + 150 +  'px'}}>
                    {lyrics}
                   </div>
                </div>
                <div className="control">
                    <div className="control-btn">
                        <audio src={this.state.songsrc} controls="controls" ref="musicAudio" preload="true" hidden ></audio>
                        <div className="icont-box">
                            <div>MV</div>
                            <div><Icon type="step-backward" /></div>
                            <Icon className="icont" type={isPaused ? 'pause-circle' :'play-circle'} onClick={()=>this.play()}></Icon>
                            <div><Icon type="step-forward" onClick={()=>this.playNext()}/></div>
                            <div><Icon type="heart" /></div>
                        </div>
                        <Button type="primary" style={{width:220,height:40,background:'#00e09e',border:"none"}} shape="round" size="large">下载歌曲</Button>
                    </div>
                </div>
            </div>
        )
    }
}
