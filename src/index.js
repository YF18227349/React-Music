import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import 'antd/dist/antd.css';
import MapRoute from './routes/MapRoute'
import routes from './routes/route.config'
import axios from "axios"
Component.prototype.$http = axios

ReactDOM.render((
    <Router>
        <MapRoute routes={routes}/>
    </Router>
), document.getElementById('root'));

