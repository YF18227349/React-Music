import React, { Component } from 'react'
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

export default class MapRoute extends Component {
    render() {
        return (
            <Switch>
                {
                    this.props.routes.map((Item) => {
                        return Item.path ? (
                            <Route 
                                key={Item.path}
                                path={Item.path}
                                render={(props) => {
                                    return <Item.component {...props} routes={Item.children}/>
                                }}
                            />
                        ) : (
                            <Redirect key={Item.from} to={Item.to}/>
                        )
                    })
                }
            </Switch>
        )
    }
}
