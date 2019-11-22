import React, { Component } from 'react'
import { search } from "../../../common/API"
import { Input } from 'antd';
const { Search } = Input;
// keyword
export default class Searchs extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    //敲回车触发搜索事件
    onSearch(value) {
        if(value == "" || value == " ") {
            return false
        }
        this.$http.get(search,{params:{
            keyword:value
        }}).then((res)=>{
            console.log(res)
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
               </div>
            </div>
        )
    }
}
