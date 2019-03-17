import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/firestore";
import './HomePageStyles.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    componentDidMount() {
        this.retrieveItems();
    }

    retrieveItems() {
        const firestore = firebase.firestore();
        firestore.collection('constants').limit(3).get().then(constants => {
            this.setState({ items: constants.docs.map(doc => doc.data()) });
        });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1> CONSTANTS </h1>
                    <p> Search the library of constants </p>
                </div>
                <div id="search">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="search" ></input>
                    <button><i className="fas fa-caret-right"></i></button>
                </div>
                <p>Results:</p>
                <table id="constants-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Categories</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.items.map((item, index) => {
                                return <Item name={item.name} categories={item.categories} value={item.value} prefix={item.prefix} exponent={item.exponent} id={item.id} key={index} />
                            })
                        }
                    </tbody>

                </table>
                <button id="show-more">Show More</button>
            </div>
        );
    }
}

const Item = (props) => (
    <tr className="item">
        <td><Link className="item-link" to={`/constants/${props.id}`}>{props.name}</Link></td>
        <td>
            {
                props.categories.split(', ').map(category => <Link className="item-category" to="/" key={category}>{category}</Link>)
            }
        </td>
        <td>
            <p onClick={(e) => { navigator.clipboard.writeText(props.value) }}>
                <Value {...props}/>
            </p>
        </td>
    </tr>
)

const Value = (props) => (
    <span>
        { <span>{props.value} </span> }
        {
            props.exponent === '' ? <span className="empty-space"/> : <span>&#215;10<sup>{props.exponent} </sup></span>
        }
        {
            props.prefix === '' ? null : (<Prefix prefix={props.prefix}/>)
        }
    </span>
)

const Prefix = (props) => (
    <span dangerouslySetInnerHTML={{ __html: props.prefix.replace(/[0-9,-]+/g, "<sup>$&</sup>") }}/>
)

export default HomePage;
