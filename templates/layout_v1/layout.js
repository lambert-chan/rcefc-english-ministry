import React from "react";
import styles from "../../styles/Home.module.css";
import { Layout } from "antd";
import Link from "next/link";
import RCEFCMenu from "../../components/menu";
import headerStyles from "../../styles/header.module.css";
import generalStyles from "../../styles/general.module.css";

const { Header, Content, Footer } = Layout;

const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

class LayoutV1 extends React.Component {
  render() {
    return (
      <Layout style={{ textAlign: "left" }}>
        <Header className={headerStyles.header + " " + this.props.className}>
          <div className={generalStyles.row}>
            <div className={styles.logo}>
              <Link href="/">
                <div className={headerStyles.site_logo}>
                  <img
                    src="https://english.rcefc.org/wp-content/uploads/2020/12/rcefc_logo.png"
                    alt="RCEFC_logo"
                  />
                  <div>
                    <span>RCEFC</span>
                  </div>
                </div>
              </Link>
            </div>
            <RCEFCMenu className={this.props.className} />
          </div>
        </Header>
        <Content>{this.props.children}</Content>
        <Footer style={{ textAlign: "center" }}>
          © {getCurrentYear()} RCEFC English Ministries
        </Footer>
      </Layout>
    );
  }
}

export default LayoutV1;
