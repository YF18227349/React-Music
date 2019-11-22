import React, { Component } from 'react'
import { push } from "../../../common/API"
import { Carousel } from 'antd';
export default class Rerecommend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slider:[],
            radioList:[]
        }
    }
    componentDidMount() {
        this.$http.get(push).then(res=>{
          console.log(res.data.data)
          let slider = res.data.data.slider;
          let radioList = res.data.data.radioList;
          this.setState({
            slider,
            radioList
          })
        })
    }
    render() {
        return (
            <div className="Recommend">
                <Carousel autoplay>
                    {
                    this.state.slider.map((item,index)=>{
                        return(
                            <div className="slider" key={index}>
                               <img src={item} alt=""/>
                            </div>
                        )
                    })
                    }
                </Carousel>
                <div className="radio">
                    <h2>电台</h2>
                    <ul>
                        {
                            this.state.radioList.map((item,index)=>{
                                return (
                                   <li key={item.id}>
                                       <img src={item.picUrl} alt={item.title}/>
                                       <h3>{item.title}</h3>
                                   </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
