import React from 'react'
import Head from 'next/head';
import { Form, Input, Button, Radio } from 'antd'
import moment from 'moment'

import styles from '../../../styles/Home.module.css';
import formStyles from '../../../styles/forms.module.css'
import LayoutV1 from '../../../templates/layout_v1/layout';

class DriveIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date : '',
            fname: '',
            lname: '',
            phone: '',
            email: '',
            car_occupants: null,
            not_outside_of_canada: '',
            no_symptoms: '',
            consider_health: '',
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
        let formName = 'easter2021-drive-in-signup'
        let date = document.getElementById('easter2021-drivein-form-date').value
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
                window.location.assign('/forms/easter2021/success');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        let date = moment('2021-04-04')
        return (
            <div>
                <Head>
                    <title>Easter Drive In Worship Form</title>
                    <link rel='icon' href='/favicon.ico' />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
                </Head>

                <main>
                    <LayoutV1>
                        <div className={formStyles.form_container}>
                            <div className={formStyles.form}>
                                <h1 className={styles.title}>RCEFC Easter Drive-In Worship - {date.format('MMM DD, YYYY')}</h1>
                                <div className={formStyles.description}>
                                    <p>Only 1 Form is needed per car, so if a family of 4 is coming in 1 car, this only needs to be filled once not 4 times! Please don't take up the limited number of spots!</p>
                                    <p>Please provide your first and last name and one form of contact information prior to coming to our worship session.</p>
                                    <p>Names and contact info will be kept for 30 days after the event for the sole purpose of contact tracing if the need arises.</p>
                                </div>

                                <Form
                                    name='easter2021-drive-in-signup'
                                    method="POST"
                                    data-netlify="true"
                                    wrapperCol={{ span: 8 }}>
                                    <input type="hidden" name="form-name" value='easter2021-drive-in-signup' />
                                    <Form.Item
                                        label="Easter 2021 Drive-In Worship"
                                        name='easter2021-drivein-form-date'
                                        htmlFor='easter2021-drivein-form-date'
                                        hidden
                                    >
                                        <Input id="easter2021-drivein-form-date" name="date" defaultValue={date.format('YYYY-MM-DD')} type="date" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="First Name"
                                        name="fname"
                                        htmlFor="easter2021-drivein-form-fname"
                                        rules={[{ required: true, type: 'string', message: 'Please input your first name' }]}
                                    >
                                        <Input id="easter2021-drivein-form-fname" name="fname" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Last Name"
                                        name="lname"
                                        htmlFor="easter2021-drivein-form-lname"
                                        rules={[{ required: true, type: 'string', message: 'Please input your last name' }]}
                                    >
                                        <Input id="easter2021-drivein-form-lname" name="lname" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone Number"
                                        name="phone"
                                        htmlFor="easter2021-drivein-form-phone"
                                        rules={[{ required: true, type: 'string', message: 'Please input your phone number' }]}
                                    >
                                        <Input id="easter2021-drivein-form-phone" name="phone" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email Address"
                                        name="email"
                                        htmlFor="easter2021-drivein-form-email"
                                        rules={[{ required: true, type: 'email', message: 'Please input your email' }]}
                                    >
                                        <Input id="easter2021-drivein-form-email" name="email" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Number of Car Occupants (including self)"
                                        name="car_occupants"
                                        colon={false}
                                        htmlFor="easter2021-drivein-form-car-occupants"
                                        rules={[{ required: true, message: 'Please input the number of occupants in the car' }]}>
                                        <Input id="easter2021-drivein-form-car-occupants" type='number' name="car_occupants" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <div>
                                        <h2>Please confirm the following statements for you and your family members.</h2>
                                        <p>For more info please visit
                                            <a
                                                href="http://www.bccdc.ca/health-info/diseases-conditions/covid-19/prevention-risks"
                                                target="blank"
                                                style={{ marginLeft: '0.25em' }}
                                            >BCCDC - Covid 19 Prevention Risks</a>
                                        </p>
                                    </div>
                                    <Form.Item
                                        label="We/I have NOT arrived from outside of Canada recently, or been in contact of a confirmed COVID-19 case"
                                        name="not_outside_of_canada"
                                        colon={false}
                                        htmlFor="easter2021-drivein-form-not-outside-of-canada"
                                        className="flex-column"
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group id="easter2021-drivein-form-not-outside-of-canada" name="not_outside_of_canada" onChange={this.handleInputChange}>
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
                                        name="no_symptoms"
                                        colon={false}
                                        htmlFor="easter2021-drivein-form-no-symptoms"
                                        className="flex-column"
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group id="easter2021-drivein-form-no-symptoms" name="no_symptoms" onChange={this.handleInputChange}>
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
                                        colon={false}
                                        htmlFor="easter2021-drivein-form-consider-health"
                                        className="flex-column"
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group id="easter2021-drivein-form-consider-health" name="consider_health" onChange={this.handleInputChange}>
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
                                        name="consider_underlying_health"
                                        htmlFor="easter2021-drivein-form-consider-underlying-health"
                                        className="flex-column"
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group id="easter2021-drivein-form-consider-underlying-health" name="consider_underlying_health" onChange={this.handleInputChange}>
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

export default DriveIn