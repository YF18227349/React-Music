import React, { Component } from 'react'
import { Switch, NavLink, Link, Redirect, Route, withRouter} from "react-router-dom"
import { Row, Col } from 'antd';
import Recommend from "./Recommend"
import Rankings from "./Rankings"
import Search from "./Search"

export default class App extends Component {
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
        <NavLink to="/home/search">搜索</NavLink>
      </Col>
    </Row>
      </div>
      <div className="main">
          <Switch>
              <Route path="/home/recommend" component={Recommend}/>
              <Route path="/home/rankings" component={Rankings}/>
              <Route path="/home/search" component={Search}/>
          </Switch>
      </div>
  </div>
    )
  }
}