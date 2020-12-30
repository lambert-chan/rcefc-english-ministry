import React from 'react'
import styles from '../../styles/Home.module.css'
import { Layout } from 'antd'
import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons'
import RCEFCMenu from '../../components/menu'

const { Header, Content, Footer } = Layout;

class LayoutV1 extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Layout>
                    <Header>
                        <div className={styles.logo}>
                            <Link href="/">
                                <span>
                                    <HomeOutlined style={{ color: 'white' }} />
                                    <span style={{margin:'0 0.5em'}}/>
                                    RCEFC
                                </span>
                            </Link>
                        </div>
                        <RCEFCMenu />
                    </Header>
                    <Content>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        ©2020 RCEFC English Ministries
                    </Footer>
                </Layout>
            </React.Fragment>
        )
    }
}

export default LayoutV1