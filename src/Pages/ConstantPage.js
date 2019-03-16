import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/firestore";

class ConstantPage extends Component {

    constructor(props) {
        super(props);
        this.state = { urlvalid: true, load: false, doc: null };
    }

    componentWillMount() {
        const firestore = firebase.firestore();
        firestore.collection('constants').where('id', '==', this.props.match.params.id).get().then(doc => {
            if (doc.empty) {
                this.setState({ urlvalid: false })
            }
            else {
                this.setState({ load: true, doc: doc.docs[0].data() })
            }
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.urlvalid ? null : <Redirect to="/404" />
                }
                {
                    this.state.load ?
                        <div>
                            <h3>{this.state.doc.name}</h3>
                            <p>{this.state.doc.about}</p>
                            <p>
                                {this.state.doc.value}
                                {
                                    this.state.doc.exponent === '' ? null : <span>&#215;10<sup>{this.state.doc.exponent}</sup></span>
                                }
                                {
                                    this.state.doc.prefix === '' ? null : (<span> {this.state.doc.prefix}</span>)
                                }
                            </p>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}

export default ConstantPage;
