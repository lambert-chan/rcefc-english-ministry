import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import { Form, Input, Button, Radio } from 'antd'
import moment from 'moment'

import config from '../config'
import styles from '../../styles/Home.module.css';
import formStyles from '../../styles/forms.module.css'
import LayoutV1 from '../../templates/layout_v1/layout';

import { load, write } from '../../lib/google/spreadsheet'

class DriveIn extends React.Component {

    getDeadline = () => {
        let currentDay = moment().weekday()
        let deadlineMoment = moment().add(currentDay < 7 ? 0 : 1, 'week').day(7).hour(12).minute(0)
        return moment() < deadlineMoment
    }

    onLoad = (data, error) => {
        if (data) {
            const cars = data.cars;
            console.log('data loaded from sheets')
            console.log(cars)
        } else {
        }
    };

    initClient = () => {
        gapi.client.init({
            apiKey: config.apiKey,
            clientId: config.clientID,
            scope: config.scope,
            discoveryDocs: config.discoveryDocs
        })
            .then(() => {
                let x = gapi.auth2.getAuthInstance().isSignedIn.get()
                console.log(x)
            });
    };

    onFormSubmit = () => {
        // load((resp, err) => { if (resp) { console.log(resp.cars) } else { console.error(err) } });
        write(['1', '2', '3'], (resp, err) => { if (resp) { console.log(resp) } else { console.error(err) }  })
    }

    componentDidMount() {
        gapi.load("client:auth2", this.initClient);
    }

    render() {
        let date = moment().add(this.getDeadline() ? 0 : 1, 'week').day(7)
        return (
            <div>
                <Head>
                    <title>Drive In</title>
                    <link rel='icon' href='/favicon.ico' />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
                </Head>

                <main>
                    <button onClick={this.onFormSubmit}>Google API</button>
                    <LayoutV1>
                        <div className={formStyles.form_container}>
                            <div className={formStyles.form}>
                                <h1 className={styles.title}>RCEFC Drive-In Worship - {date.format('MMMM D, YYYY')}</h1>
                                <div className={formStyles.description}>
                                    <p>Only 1 Form is needed per car, so if a family of 4 is coming in 1 car, this only needs to be filled once not 4 times! Please don't take up the limited number of spots!</p>
                                    <p>Please provide your first and last name and one form of contact information prior to coming to our worship session.</p>
                                    <p>Names and contact info will be kept for 30 days after the event for the sole purpose of contact tracing if the need arises.</p>
                                </div>

                                {/* <Form
                                    name={`drive-in-signup-${date.format('MM-DD-YY')}`}
                                    wrapperCol={{ span: 8 }}>
                                    <Form.Item
                                        label="First Name"
                                        name="fname"
                                        rules={[{ required: true, type: 'string', message: 'Please input your first name' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Last Name"
                                        name="lname"
                                        rules={[{ required: true, type: 'string', message: 'Please input your last name' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone Number"
                                        name="number"
                                        rules={[{ required: true, type: 'string', message: 'Please input your phone number' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email Address"
                                        name="email"
                                        rules={[{ required: true, type: 'email', message: 'Please input your email' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Number of Car Occupants (including self)"
                                        name="car_occupants"
                                        rules={[{ required: true, message: 'Please input the number of occupants in the car' }]}>
                                        <Input type='number' />
                                    </Form.Item>
                                    <div>
                                        <h2>Please confirm the following statements for you and your family members.</h2>
                                        <p>For more info please visit
                                            <a
                                                href="http://www.bccdc.ca/health-info/diseases-conditions/covid-19/prevention-risks)"
                                                target="blank"
                                                style={{ marginLeft: '0.25em' }}
                                            >BCCDC - Covid 19 Prevention Risks</a>
                                        </p>
                                    </div>
                                    <Form.Item
                                        label="We/I have NOT arrived from outside of Canada recently, or been in contact of a confirmed COVID-19 case"
                                        name="outside_of_canada"
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group>
                                            <Radio value='yes'>
                                                Yes
                                            </Radio>
                                            <Radio value='no'>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="We/I have NOT had symptoms of COVID-19 in the last 10 days 
                                        (fever, chills, new or worsening cough, shortness of breath, sore throat and new muscle aches or headache)"
                                        name="symptoms"
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group>
                                            <Radio value='yes'>
                                                Yes
                                            </Radio>
                                            <Radio value='no'>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="We/I will reconsider our health before leaving for the event to confirm we are still healthy. "
                                        name="consider_health"
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group>
                                            <Radio value='yes'>
                                                Yes
                                            </Radio>
                                            <Radio value='no'>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="My family and I have considered underlying health and medical conditions,
                                         and factors which increase our risk, or risk to a close contact and have individually made a judgment call on whether or not it is safe for us to attend.
                                         We understand that if we are in close contact with another person who has COVID-19 we will be required by Health officials to self-isolate for 14 days."
                                        name="underlying_health"
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group>
                                            <Radio value='yes'>
                                                Yes
                                            </Radio>
                                            <Radio value='no'>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form> */}
                            </div>

                            <form name="contact" method="POST" data-netlify="true">
                                <label>Name: <input type="text" name="name"></input></label>
                                <button type='submit'>Send</button>
                            </form>
                        </div>
                    </LayoutV1>

                </main>
                <script src="https://apis.google.com/js/api.js"></script>
            </div>
        );
    }
}

export default DriveIn