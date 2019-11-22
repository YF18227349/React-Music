import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import 'antd/dist/antd.css';
import App from './views/Home/index';
import axios from "axios"
Component.prototype.$http = axios
ReactDOM.render((
    <Router>
        <App />
    </Router>
), document.getElementById('root'));

