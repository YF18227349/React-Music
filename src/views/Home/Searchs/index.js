import React, { Component } from 'react'
import { search } from "../../../common/API"
import { Input } from 'antd';
import Masks from '../../../components/Searchs/masks'
const { Search } = Input;

export default class Searchs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hotList: ["乐队的夏天", "我和我的祖国", "光", "爱的飞行日记", "感谢你曾经来过", "山楂树之恋", "我最亲爱的","芒种"],
            flag:false,
            itemlist:[]
        }
    }
    onSearch(value) {
        if(value == "" || value == " ") {
            return false
        }
        this.$http.get(search,{params:{
            keyword:value
        }}).then((res)=>{
            console.log(res)
            this.setState({
                flag: true,
                itemlist: res.data.data.song.itemlist
            })
        })
    }
    render() {
        return (
            <div className="search">
               <div className="input">
                    <Search
                    placeholder="搜索歌曲、歌单、专辑"
                    onSearch={value => {this.onSearch(value)}}
                    style={{ width: 300 ,height:40}}
                    />
                    <span className="cancel">取消</span>
                    {
                    this.state.flag ? <Masks list={this.state.itemlist}/> : ""
                    }
               </div>
               <div className="hot">
                   <p>热门搜索</p>
                   <div className="hot-container">
                   {
                        this.state.hotList.map((item, index) => {
                            return <span key={index}>{item}</span>
                        })
                    }
                   </div> 
                </div>
            </div>
        )
    }
}
