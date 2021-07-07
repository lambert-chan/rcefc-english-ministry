import React from 'react'
import Head from 'next/head';
import { Form, Input, Button, Radio } from 'antd'
import moment from 'moment'

import styles from '../../../styles/Home.module.css';
import formStyles from '../../../styles/forms.module.css'
import LayoutV1 from '../../../templates/layout_v1/layout';

class inperson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date : '',
            name: '',
            phone: '',
            email: '',
            not_outside_of_canada: '',
            no_symptoms: '',
            consider_underlying_health: '',
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    handleSubmit = async (e) => {
        let formName = 'in-person-signup'
        let date = document.getElementById('inperson-form-date').value
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: this.encode({ 'form-name': formName, ...this.state, 'date' : date })
        }

        fetch(
            "/",
            options
        )
            .then(function (response) {
                window.location.assign('/forms/attend/success');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    getDeadline = () => {
        let currentDay = moment().weekday()
        let deadlineMoment = moment().add(currentDay < 7 ? 0 : 1, 'week').day(7).hour(12).minute(0)
        return moment() < deadlineMoment
    }

    render() {
        let date = moment().add(this.getDeadline() ? 0 : 1, 'week').day(7)

        // For specific dates
        // let date = moment("07/04/2021")
        return (
            <div>
                <Head>
                    <title>Service Registration</title>
                    <link rel='icon' href='/favicon.ico' />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
                </Head>

                <main>
                    <LayoutV1>
                        <div className={formStyles.form_container}>
                            <div className={formStyles.form}>
                                <h1 className={styles.title}>English Ministry Service Registration - {date.format('MMMM D, YYYY')}</h1>
                                <div className={formStyles.description}>
                                    <p><strong>Everyone who is attending must register, children included.</strong></p>
                                    <p>Please provide your first and last name and one form of contact information prior to coming to our worship session.</p>
                                    <p>Names and contact info will be kept for 30 days after the event for the sole purpose of contact tracing if the need arises.</p>
                                    <p>We recommend for you to arrive 10 - 15 minutes earlier as there will be extra safety checks</p>
                                </div>

                                <Form
                                    name='in-person-signup'
                                    method="POST"
                                    data-netlify="true"
                                    wrapperCol={{ span: 8 }}>
                                    <input type="hidden" name="form-name" value='in-person-signup' />
                                    <Form.Item
                                        label="Worship Date"
                                        name='inperson-form-date'
                                        htmlFor='inperson-form-date'
                                        hidden
                                    >
                                        <Input id="inperson-form-date" name="date" defaultValue={date.format('YYYY-MM-DD')} type="date" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        htmlFor="inperson-form-name"
                                        rules={[{ required: true, type: 'string', message: 'Please input your name' }]}
                                    >
                                        <Input id="inperson-form-name" name="name" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone Number"
                                        name="phone"
                                        htmlFor="inperson-form-phone"
                                        rules={[{ required: true, type: 'string', message: 'Please input your phone number' }]}
                                    >
                                        <Input id="inperson-form-phone" name="phone" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email Address"
                                        name="email"
                                        htmlFor="inperson-form-email"
                                        rules={[{ required: true, type: 'email', message: 'Please input your email' }]}
                                    >
                                        <Input id="inperson-form-email" name="email" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <div>
                                        <h2>Please confirm the following statements.</h2>
                                        <p>For more info please visit
                                            <a
                                                href="http://www.bccdc.ca/health-info/diseases-conditions/covid-19/prevention-risks"
                                                target="blank"
                                                style={{ marginLeft: '0.25em' }}
                                            >BCCDC - Covid 19 Prevention Risks</a>
                                        </p>
                                    </div>
                                    <Form.Item
                                        label="I have NOT arrived from outside of Canada recently, or been in contact of a confirmed COVID-19 case"
                                        name="not_outside_of_canada"
                                        htmlFor="inperson-form-not-outside-of-canada"
                                        colon={false}
                                        className="flex-column"
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group id="inperson-form-not-outside-of-canada" name="not_outside_of_canada" onChange={this.handleInputChange}>
                                            <Radio value='yes'>
                                                Yes
                                            </Radio>
                                            <Radio value='no'>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="I have NOT had symptoms of COVID-19 in the last 10 days 
                                        (fever, chills, new or worsening cough, shortness of breath, sore throat and new muscle aches or headache)"
                                        name="no_symptoms"
                                        htmlFor="inperson-form-no-symptoms"
                                        className="flex-column"
                                        colon={false}
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group id="inperson-form-no-symptoms" name="no_symptoms" onChange={this.handleInputChange}>
                                            <Radio value='yes'>
                                                Yes
                                            </Radio>
                                            <Radio value='no'>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="I have considered underlying health and medical conditions,
                                         and factors which increase our risk, or risk to a close contact and have individually made a judgment call on whether or not it is safe for us to attend.
                                         I understand that if I am in close contact with another person who has COVID-19 I will be required by Health officials to self-isolate for 14 days."
                                        name="consider_underlying_health"
                                        htmlFor="inperson-form-consider-underlying-health"
                                        colon={false}
                                        className="flex-column"
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group id="inperson-form-consider-underlying-health" name="consider_underlying_health" onChange={this.handleInputChange}>
                                            <Radio value='yes'>
                                                Yes
                                            </Radio>
                                            <Radio value='no'>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{ margin: '0.5em 0' }}>
                                        Submit
                                    </Button>
                                </Form>
                            </div>

                        </div>
                    </LayoutV1>

                </main>
            </div>
        );
    }
}

export default inperson