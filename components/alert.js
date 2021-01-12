import React from 'react'
import { ExclamationCircleFilled, CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd';

class Alert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: true
        }
    }

    render() {
        let { message } = this.props;
        return (this.state.active &&
            <div className="alert black">
                <ExclamationCircleFilled />
                <div>
                    {message}
                </div>
                <Button type='text' onClick={() => { this.setState({ active: false }) }}>
                    <CloseOutlined />
                </Button>
            </div>
        )
    }
}

export default Alert;