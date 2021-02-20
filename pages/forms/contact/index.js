import React from 'react'
import Head from 'next/head';
import { Form, Input, Button, Radio } from 'antd'

import styles from '../../../styles/Home.module.css';
import formStyles from '../../../styles/forms.module.css'
import LayoutV1 from '../../../templates/layout_v1/layout';

class DriveIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            request: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        console.log(this.state)
    };

    encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    handleSubmit = async (e) => {
        let formName = 'contact-requests'
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: this.encode({ 'form-name': formName, ...this.state })
        }

        fetch(
            "/",
            options
        )
            .then(function (response) {
                window.location.assign('/forms/contact/success');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <Head>
                    <title>Get in Touch</title>
                    <link rel='icon' href='/favicon.ico' />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
                </Head>

                <main>
                    <LayoutV1>
                        <div className={formStyles.form_container}>
                            <div className={formStyles.form}>
                                <h1 className={styles.title}>Get In Touch</h1>
                                <div className={formStyles.description}>
                                    <p>Please submit your contact information below.</p>
                                </div>

                                <Form
                                    name='contact-form'
                                    method="POST"
                                    data-netlify="true">
                                    <input type="hidden" name="form-name" value='contact-requests' />
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        htmlFor="contact-form-name"
                                        rules={[{ required: true, type: 'string', message: 'Please input your name' }]}
                                    >
                                        <Input id="contact-form-name" name="name" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email Address"
                                        name="email"
                                        htmlFor="contact-form-email"
                                        rules={[{ required: true, type: 'email', message: 'Please input your email' }]}
                                    >
                                        <Input id="contact-form-email" name="email" type="email" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone Number"
                                        name="phone"
                                        htmlFor="contact-form-phone"
                                        rules={[{ required: true, type: 'phone', message: 'Please input your phone number' }]}
                                    >
                                        <Input id="contact-form-phone" name="phone" type="tel" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{ margin: '0.5em 0' }}>
                                        Submit Request
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