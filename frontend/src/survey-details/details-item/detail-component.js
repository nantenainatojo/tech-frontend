import React, { Component } from 'react';
import './detail-component.css';
import { Row, Col} from 'react-bootstrap';


export default class DetailComponent extends Component {

    render() {
        let item= this.props.value;
        let template=null;
        let object=null;
        switch(item.type) {
            case 'qcm':
                object= item.result;
                template =
                    <Col xs={12} md={8} id="qcm">
                        <Row >
                            <Col sm={12}>
                                <h5>
                                    {item.label}
                                </h5>
                            </Col>
                            <Col sm={12} >
                                {
                                    Object.keys(object).map(
                                        (objectKey, index) => <div class="custom-card">
                                            <h5>{objectKey}</h5>
                                            <p>{object[objectKey]}</p>
                                        </div>
                                    )
                                }
                            </Col>
                        </Row>
                    </Col>
                break;
            case 'numeric':
                let number= Math.round(parseFloat(item.result)*100)/100;
                template =
                    <Col xs={6} md={4} id="numContenaire">
                        <Row id="num">
                            <Col sm={12}>
                                <h5>
                                    {item.label}
                                </h5>
                            </Col>
                            <Col sm={12} >
                                <p>{number}</p>
                            </Col>
                        </Row>;
                    </Col>
                break;
            case 'date':
                object= item.result;
                let format=[];
                let options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                };

                Object.keys(object).map(
                    (objectKey, index) => {
                        let date = new Date(object[objectKey]);
                        return format.push(date.toLocaleString('en-us', options));
                    }
                )

                template = <Col sm={12} id="date">
                    <Row >
                        <Col sm={12} >
                            <h5>
                                {item.label}
                            </h5>
                        </Col>
                        <Col sm={12} >
                            {
                                Object.keys(format).map(
                                    (objectKey, index) => <div>
                                        <p>{format[objectKey]}</p>
                                    </div>
                                )
                            }
                        </Col>
                    </Row>
                </Col>
                break;
            default:
        }
        return template
    }
}