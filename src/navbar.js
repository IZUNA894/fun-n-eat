import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <Link className="navbar-brand" to="/">Food N Eat</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="create">Create</Link>
                    </li>
                    
                    
                    </ul>
                    
                </div>
                </nav>
        )
    }
}
