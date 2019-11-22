import React, { Component } from 'react'
import { Switch, NavLink, Link, Redirect, Route, withRouter} from "react-router-dom"
import { Row, Col } from 'antd';
import MapRoute from "../../routes/MapRoute"
// import Recommend from "./Recommend"
// import Rankings from "./Rankings"
// import Searchs from "./Searchs"

export default class Home extends Component {
  render() {
    return (
    <div className="container">
      <div className="header">
      <Row>
      <Col span={8}>
        <NavLink to="/home/recommend">推荐</NavLink>
      </Col>
      <Col span={8}>
        <NavLink to="/home/rankings">排行</NavLink>
      </Col>
      <Col span={8}>
        <NavLink to="/home/searchs">搜索</NavLink>
      </Col>
    </Row>
      </div>
      <div className="main">
          <Switch>
              <MapRoute routes={this.props.routes}/>
          </Switch>
      </div>
  </div>
    )
  }
}