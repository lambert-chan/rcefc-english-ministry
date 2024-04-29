import React from 'react'
import Head from 'next/head';
import { Form, Input, Button, Radio, DatePicker } from 'antd'

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
    };

    encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    handleSubmit = async (e) => {
        let formName = 'prayer-requests'
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
                window.location.assign('/forms/prayer/success');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <Head>
                    <title>Prayer Request</title>
                    <link rel='icon' href='/favicon.ico' />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
                </Head>

                <main>
                    <LayoutV1>
                        <div className={formStyles.form_container}>
                            <div className={formStyles.form}>
                                <h1 className={styles.title}>Prayer Request</h1>
                                <div className={formStyles.description}>
                                    <p>Please submit your request for prayer below</p>
                                </div>

                                <Form
                                    name='prayer-requests'
                                    method="POST"
                                    data-netlify="true">
                                    <input type="hidden" name="form-name" value='prayer-requests' />
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        htmlFor="prayer-request-form-name"
                                        rules={[{ required: true, type: 'string', message: 'Please input your name' }]}
                                    >
                                        <Input id="prayer-request-form-name" name="name" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email Address"
                                        name="email"
                                        htmlFor="prayer-request-form-email"
                                        rules={[{ required: true, type: 'email', message: 'Please input your email' }]}
                                    >
                                        <Input id="prayer-request-form-email" type="email" name="email" onChange={this.handleInputChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="What is the Prayer Need?"
                                        colon={false}
                                        name="prayer-request"
                                        htmlFor='prayer-request-form-request'
                                        className="flex-column"
                                        rules={[{ required: true, type: 'string', message: 'Please input your request' }]}
                                    >
                                        <Input.TextArea id='prayer-request-form-request' name='request' onChange={this.handleInputChange}/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Would you like to keep this private?"
                                        colon={false}
                                        name="is_private"
                                        htmlFor="prayer-request-form-private"
                                        className="flex-column"
                                        rules={[{ required: false, message: 'Please check yes/no' }]}>
                                        <Radio.Group id="prayer-request-form-private" name="is_private" onChange={this.handleInputChange}>
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