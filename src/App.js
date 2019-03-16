import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import './AppStyles.css';
import ConstantPage from './Pages/ConstantPage';
import * as firebase from "firebase/app";
import "firebase/firestore";

class App extends Component {

    componentWillMount() {
        const config = {
            apiKey: process.env.REACT_APP_APIKEY,
            authDomain: process.env.REACT_APP_AUTHDOMAIN,
            databaseURL: process.env.REACT_APP_DATABASEURL,
            projectId: process.env.REACT_APP_PROJECTID,
            storageBucket: process.env.REACT_APP_STORAGEBUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
            <Router>
                <div className="content">
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/constants/:id" component={ConstantPage} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const NoMatch = () => {
    return <div>
        No Match
    </div>
}

export default App;
