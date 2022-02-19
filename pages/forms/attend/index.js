import React from 'react'
import Head from 'next/head';
import { Form, Input, Button, Radio, InputNumber } from 'antd'
import Link from 'next/link'
import moment from 'moment'

import styles from '../../../styles/Home.module.css';
import formStyles from '../../../styles/forms.module.css'
import LayoutV1 from '../../../templates/layout_v1/layout';

class inperson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            name: '',
            phone: '',
            email: '',
            household_members: 1,
            not_outside_of_canada: '',
            no_symptoms: '',
            been_in_contact_with_covid19_person: '',
            asked_to_self_monitor: ''
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

    handleHouseholdChange = (value) => {
        let name = "household_members"
        this.setState({
            [name]: value
        })
    }

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
            body: this.encode({ 'form-name': formName, ...this.state, 'date': date })
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

    getDate = () => {
        let currDatetime = moment()
        let deadline = 12

        // Test cases:
        // currDatetime = moment("2021-07-06 11:11:11") // test middle of week before = 11
        // currDatetime = moment("2021-07-11 09:30:00") // test sun morn, result = 11
        // currDatetime = moment("2021-07-11 12:01:00") // test sun afternoon, result = 18
        // currDatetime = moment("2021-07-14 12:00:00") // test middle of week, result = 18

        // if currentTime is sunday morning before 12 stay on the current Sunday, otherwise go to next Sunday
        return currDatetime.day((currDatetime.weekday() == 0 && currDatetime.hour() < deadline) ? 0 : 7)
    }

    render() {
        let date = this.getDate()

        // For specific dates
        // let date = moment("2021-07-04")
        return (
            <div>
                <Head>
                    <title>Worship Service Registration</title>
                    <link rel='icon' href='/favicon.ico' />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
                </Head>

                <main>
                    <LayoutV1>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em', height: '100vh' }}>
                            <h1>                        The Board hereby announce that the EM in-person Sunday service will be suspended for February 20, 2022 and held online as Christine had been confirmed positive of COVID-19 on Tuesday, February 15th and Pastor Will also showed symptoms.
The CM will continue Sunday service as usual both in-person and online this Sunday.
Please pray for Pastor Will and Christine for full recovery.</h1>
                        </div>
                        {/* <div className={formStyles.form_container}>
                            <div className={formStyles.form}>
                                <h1 className={styles.title}>English Ministry Service Registration</h1>
                                <h2>{date.format('MMMM D, YYYY')}</h2>
                                <div className={formStyles.description}>
                                    <p><strong>Everyone who is attending must register, children included. Families living in the same household may register together.</strong></p>
                                    <p>Please provide your first and last name(s) and one form of contact information prior to coming to our worship session.</p>
                                    <p>Names and contact info will be kept for 30 days after the event for the sole purpose of contact tracing if the need arises.</p>
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
                                        label="Name (First and Last)"
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
                                    <div className={formStyles.household_input}>
                                        <Form.Item
                                            label="Number of household members attending service"
                                            name="household_members"
                                            htmlFor="inperson-form-household-members"
                                            rules={[{ required: true, type: 'number', message: 'Please input household members (including yourself)' }]}
                                        >
                                            <InputNumber min="1" max="6" id="inperson-form-household-members" name="household_members" onChange={this.handleHouseholdChange} />
                                        </Form.Item>
                                    </div>
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
                                        label="In the past two weeks, has anyone in your group arrived/returned from outside of Canada?"
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
                                        label="Does anyone in your group have any of the following symptoms of COVID-19? 
                                        (Fever, chills, coughs, severe fatigue/tiredness, shortness of breath, nausea, vomitting, loss of taste or smell)"
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
                                        label="In the past 2 weeks, has anyone in your group been in contact with someone with COVID-19?"
                                        name="been_in_contact_with_covid19_person"
                                        htmlFor="inperson-form-been-in-contact-with-covid19-person"
                                        colon={false}
                                        className="flex-column"
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group id="inperson-form-been-in-contact-with-covid19-person" name="been_in_contact_with_covid19_person" onChange={this.handleInputChange}>
                                            <Radio value='yes'>
                                                Yes
                                            </Radio>
                                            <Radio value='no'>
                                                No
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="In the past 2 weeks, has anyone in your group been advised by Public Health to self-monitor or self-isolate?"
                                        name="asked_to_self_monitor"
                                        htmlFor="inperson-form-asked-to-self-monitor"
                                        colon={false}
                                        className="flex-column"
                                        rules={[{ required: true, message: 'Please check yes/no' }]}>
                                        <Radio.Group id="inperson-form-asked-to-self-monitor" name="asked_to_self_monitor" onChange={this.handleInputChange}>
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

                        </div> */}
                    </LayoutV1>

                </main>
            </div>
        );
    }
}

export default inperson