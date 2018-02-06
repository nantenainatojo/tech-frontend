import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './list-component.css';
import {Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';

export default class ListComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            initial: [],
            lists: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/list.json`)
            .then(res => {
                const lists = res.data;
                const initial = res.data;
                this.setState({ initial });
                this.setState({ lists });
            });
    }

    handleChange(event) {
        var updatedList = this.state.initial;
        var request=event.target.value;
        var response="";
        if(request !== ''){
            updatedList = updatedList.filter(function (item) {
                if(item.name.toLowerCase().search(request.toLowerCase())!== -1){
                    response= item.name.toLowerCase().search(request.toLowerCase()) !== -1;
                }else if(item.code.toLowerCase().search(request.toLowerCase()) !== -1) {
                    response=  item.code.toLowerCase().search(request.toLowerCase()) !== -1;
                }
                return response;
            });
        }else{
            updatedList = this.state.initial;
        }
        this.setState({ lists: updatedList });
    }

    render() {
        return (
            <Grid id="containerList">
                <Row >
                    <Col sm={12}>
                        <h4>
                            SURVEY LIST
                        </h4>
                        <div id="content">
                            <input type="text" placeholder="Search" onChange={this.handleChange} />
                            <ListGroup id="listContent">
                                {

                                    this.state.lists.map(
                                            item => <Link key={item.code.toString()} to={`/details/${item.code}/${item.name}`}>
                                            <ListGroupItem >{item.name} [<code>{item.code}</code>] </ListGroupItem>
                                        </Link>
                                    )
                                }
                            </ListGroup>
                        </div>

                    </Col>
                </Row>
            </Grid>
        );
    }
}