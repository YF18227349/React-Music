import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import {play, lyric} from '../../common/API'
export default class Plays extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "",
            lyric: "",
            el: "",
            lyricArr: [],
            i: "",
            time: 0,
            isPaused:false,
            duration: "",
            currentTime: "",
            left: ""
        }
        this.getLyric = this.getLyric.bind(this)
        this.getUrl = this.getUrl.bind(this)
        this.renderLyric = this.renderLyric.bind(this)
        this.interval = this.interval.bind(this)
    }
    componentDidMount() {
        this.getUrl();
        this.getLyric();
    }
    format(second) {
        second = parseInt(second)
        var mintule = Math.floor(second / 60) >= 10 ? Math.floor(second / 60) : "0" + Math.floor(second / 60)
        var sec = second % 60 >= 10 ? second % 60 : "0" + second % 60
        return mintule + ":"+ sec
    }
    getUrl() {
        const mid = this.props.location.state.mid;
        console.log(mid)
        this.$http.get(play, {params: {
            mid
        }}).then(res => {
            console.log(res)
            this.setState({
                url: res.data,
            })
            const audio = this.refs.audio;
            const progressBox = this.refs.progressBox;
            const truth = this.refs.truth;
            const circle = this.refs.circle
            audio.oncanplaythrough = () => {
                var duration = audio.duration;
                this.setState({
                    duration: this.format(duration)
                })
            }
            audio.ontimeupdate = () => {
                const currentTime = audio.currentTime;
                this.setState({
                    currentTime:this.format(currentTime)
                })
                const boxWidth = progressBox.clientWidth;
                const scale = currentTime / audio.duration;
                const width = boxWidth * scale;
                truth.style.width = width + "px"
                circle.style.left = width - 2 + 'px'
            }
        })
    }
    getLyric() {
        const songid = this.props.location.state.songid
        this.$http.get(lyric, {
            params: {
                songid
            }
        }).then(res => {
            console.log(res)
            this.setState({
                lyric: res.data.data.lyric
            })
            let lyric = res.data.data.lyric;
            let lyricArr = lyric.split("[换行]").slice(5);
            console.log(lyricArr)
            let arr = []
            lyricArr.forEach((item, index) => {
                let lstr = item.split(']')[1];
                let ltime = item.split(']')[0].slice(1, 6)
                function ltimeFormat(ltime) {
                    let arr = ltime.split(":")
                    return arr[0]*60 + parseInt(arr[1])
                }
                let obj = {
                    lstr,
                    ltime: ltimeFormat(ltime)
                }
                arr.push(obj)
            })
            console.log(arr)
            this.setState({
                lyricArr: arr
            }, () => {
                this.renderLyric()
            })
        })
    }
    renderLyric() {
        const el = this.state.lyricArr.map((item, index) => {
            return <p key={index} className={["lyric-item", this.state.i == index ? "act" : ""].join(" ")}>{item.lstr}</p>
        })
        this.setState({
            el
        })
    }
    interval() {
        console.log(111)
        var t = this.state.time
        this.timer = setInterval(() => {
            this.state.lyricArr.forEach((item, index) => {
                if (t == item.ltime) {
                    console.log(index)
                    this.setState({
                        i: index
                    },() => {
                        this.renderLyric()
                        const box = this.refs.box;
                        box.style.top = - index * 35 + 220 +  'px'
                    })
                }
            })
            t++;
            this.setState({
                time: t
            })
        }, 1000)
    }
    move(e) {
        this.refs.audio.pause()
        let left = e.touches[0].pageX - 50;
        if(left < 0) {
            left = 0;
        } else if(left > this.refs.progressBox.clientWidth) {
            left = this.refs.progressBox.clientWidth
        }
        this.refs.circle.style.left = left - 2 + "px"
        this.refs.truth.style.width = left + "px"
        this.setState({
            left
        })
    }
    touchend(){
        this.refs.audio.play()
        let scale = this.state.left / this.refs.progressBox.clientWidth;
        let currentTime = this.refs.audio.duration * scale;
        this.refs.audio.currentTime = currentTime;
        this.setState({
            currentTime:this.format(currentTime)
        })

        let i = this.state.lyricArr.findIndex(item => {
            return item.ltime > currentTime
        })
        this.setState({
            i,
            time:this.state.lyricArr[i].ltime
        },() => {
            this.renderLyric()
            let box = this.refs.box;
            box.style.top = - i * 35 + 220 +  'px';
            clearInterval(this.timer)
            this.timer = null;
            this.interval()
        })
    }
    play() {
        const audio = this.refs.audio;
        if (audio.paused) {
            audio.play()
            this.interval()
            this.setState({
                isPaused:true
            })
        } else {
            audio.pause()
            this.setState({
                isPaused:false
            })
            clearInterval(this.timer)
            this.timer = null;
        }
    }
    playPrev() {

    }
    playNext() {
        let index = this.props.location.state
        console.log(index)
        

    }
    componentWillUnmount() {
        this.refs.audio.pause()
        clearInterval(this.timer)
        this.timer = null;
        this.setState = () => {
            return
        }
    }
    render() {
        return (
            <div className="container play">
                <div className="lyric-box">
                    <div className="lyrics-panels" ref="box">
                        {this.state.el}
                    </div>
                </div>
                <div className="progress-bar">
                    <span>{this.state.currentTime}</span>
                    <div className="progress-box" ref="progressBox">
                        <div className="progress-truth" ref="truth"></div>
                        <div className="circle" ref="circle" onTouchMove={this.move.bind(this)} onTouchEnd={this.touchend.bind(this)}></div>
                    </div>
                    <span>{this.state.duration}</span>
                </div>
                <div className="btns">
                    <audio src={this.state.url} ref="audio"></audio>
                    <div className="icont-box">
                        <div>MV</div>
                        <div><Icon type="step-backward" /></div>
                        <Icon className="icont" type={this.state.isPaused ? 'pause-circle' :'play-circle'} onClick={()=>this.play()}></Icon>
                        <div><Icon type="step-forward" onClick={()=>this.playNext()}/></div>
                        <div><Icon type="heart" /></div> 
                    </div>
                    <Button type="primary" style={{width:220,height:40,background:'#00e09e',border:"none"}} shape="round" size="large">下载歌曲</Button>
                </div>
            </div>
        )
    }
}
