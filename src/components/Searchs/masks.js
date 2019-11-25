import React, { Component } from 'react'
import {Icon} from 'antd'
import {withRouter} from 'react-router-dom'
class Masks extends Component {
    play(mid, songid) {
        this.props.history.push({
            pathname: "/play",
            state: {
                mid,
                songid
            }
        })
    }
    render() {
        const {list} = this.props
        return (
            <div className="masks">
                <ul>
                    {
                        list.map((item, index) => {
                            return <li key={index} onClick={this.play.bind(this, item.mid, item.id)}><Icon type="search"/>{item.name}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default withRouter(Masks)
