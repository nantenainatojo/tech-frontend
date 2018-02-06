import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Grid, Row} from 'react-bootstrap';
import './details-component.css';

import DetailComponent from './details-item/detail-component.js';

export default class DetailsComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:props.match.params.name,
            details: []
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/${this.props.match.params.id}.json`)
            .then(res => {
                const details = res.data;
                this.setState({ details });
            });
    }

    render() {
        return (
            <Grid id="delails">
                <h3 id="title">
                    <Link to={`/`}>
                        <span id="btnRetour">&larr;</span>
                    </Link>
                    <span id="titleLabel">{this.state.name}</span>
                </h3>
                <Row id="content">
                    {
                        this.state.details.map(
                                item => <DetailComponent key={item.type} value={item}/>
                        )
                    }
                </Row>

            </Grid>
        );
    }
}