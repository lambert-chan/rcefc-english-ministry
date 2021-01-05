import React from 'react'
import styles from '../../styles/Home.module.css'
import { Layout, Image } from 'antd'
import Link from 'next/link';
import RCEFCMenu from '../../components/menu'
import headerStyles from '../../styles/header.module.css'

const { Header, Content, Footer } = Layout;

class LayoutV1 extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Layout style={{textAlign:'left'}}>
                    <Header className={headerStyles.header + " " + this.props.className}>
                        <div className={styles.logo}>
                            <Link href="/">
                                <div className={headerStyles.site_logo}>
                                    <div>
                                        <Image
                                            src='https://english.rcefc.org/wp-content/uploads/2020/12/rcefc_logo.png'
                                            width="24px"
                                            height="24px"
                                        />
                                    </div>
                                    <div>
                                        RCEFC
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <RCEFCMenu className={this.props.className}/>
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