import React from 'react'
import { ExclamationCircleFilled, CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd';

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: true
        }
    }

    setDismissed = () => {
        sessionStorage.setItem('alert_dismissed', true)
        this.setState({ isActive: false })
    }

    componentDidMount() {
        let { isActive } = this.state;
        if (isActive) {
            let isDismissed = sessionStorage.getItem('alert_dismissed');
            if (isDismissed) {
                this.setState({ isActive: false })
            }
        }
    }

    render() {
        let { children } = this.props;
        let { isActive } = this.state;
        return (isActive &&
            <div className="alert black">
                <ExclamationCircleFilled />
                <div>
                    {children && children}
                </div>
                <Button type='text' onClick={this.setDismissed}>
                    <CloseOutlined />
                </Button>
            </div>
        )
    }
}

export default Alert;