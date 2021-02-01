import { Button } from 'antd'
import React from 'react'

import forkStyles from '../styles/fork.module.css'
class Fork extends React.Component {
    render() {
        return (
            <div className={forkStyles.fork_container}>
                <Head>
                    <title>RCEFC</title>
                    <link rel='icon' href='/favicon.ico' />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
                </Head>
                <div>
                    <Button size='large' href="https://english.rcefc.org">English</Button>
                    <Button size='large' href="https://rcefc.org/chinese">Chinese</Button>
                </div>
            </div>
        )
    }
}

export default Fork