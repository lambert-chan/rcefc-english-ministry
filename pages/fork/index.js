import { Button } from 'antd'
import React from 'react'

import forkStyles from '../../styles/fork.module.css'
class Fork extends React.Component {
    render() {
        return (
            <div>
                <main>
                    <div className={forkStyles.fork_container}>
                        <div>
                            <Button size='large' href="https://englishministry.rcefc.org">English</Button>
                            <Button size='large' href="https://rcefc.org/chinese">Chinese</Button>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Fork