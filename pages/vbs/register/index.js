import React from "react";
import Head from "next/head";
import LayoutV1 from "../../../templates/layout_v1/layout";
import { VBSHeader } from "../../vbs/index";
import { Button, Layout } from "antd";
import vbsStyles from "../../../styles/vbs.module.css";
import { Card } from "../../../components/cards";

const RegistrationCards = () => {
  return (
    <Layout className={vbsStyles.registration_cards}>
      <Card>
        <h3>Pre-Primary</h3>
        <p>Kindergarten and Grade 1 in September 2024.</p>
        <Button href="https://forms.gle/37fuJ3xFLxpcUcGRA" target="_blank">
          Register
        </Button>
      </Card>
      <Card>
        <h3>Primary</h3>
        <p>Grade 2 - Grade 4 in September 2024.</p>
        <Button href="https://forms.gle/M8WgiPwtkAucUJfY7" target="_blank">
          Register
        </Button>
      </Card>
      <Card>
        <h3>Junior</h3>
        <p>Grade 5 - Grade 7 in September 2024.</p>
        <Button href="https://forms.gle/CM58b8RADmLdzbzH6" target="blank">
          Register
        </Button>
      </Card>
    </Layout>
  );
};

const VBSFooter = () => {
  const { Footer } = Layout;
  return (
    <Footer className={vbsStyles.footer}>
      <section className={vbsStyles.promoteBox}>
        <h2 className={vbsStyles.whiteText} style={{ fontSize: "3rem" }}>
          After registration
        </h2>
        <div
          style={{
            textAlign: "start",
            padding: "1rem",
            maxWidth: "45rem",
            fontSize: "1.25em",
          }}
        >
          <p>
            After filling out the registration form, please see the following
            details:
          </p>
          <p>
            1. Your spot will be secured upon receipt of payment through
            E-transfer to offering@rcefc.org. Please indicate "VBS, name of your
            child" in the comment box when sending the payment.
          </p>
          <p>
            Registration Fee: Payment made on or before May 31: $65 ($70 with
            VBS Music digital file download) Payment made on June 1 and after:
            $75 ($80 with VBS Music digital file download)
          </p>
          <p>
            2. Please email the E-transfer confirmation to{" "}
            <a href="mailto:rcefc1983@gmail.com" className={vbsStyles.link}>
              rcefc1983@gmail.com
            </a>{" "}
            for verification. A confirmation email will be sent to you within
            the next 3 days.
          </p>
          <p>
            If you have any questions, please email{" "}
            <a href="mailto:rcefc1983@gmail.com" className={vbsStyles.link}>
              rcefc1983@gmail.com
            </a>
            . Thank you.
          </p>
          <strong>Cancellation and Refund Policy:</strong>
          <p>
            Full refund during registration period (until July 14) - ⁠50% refund
            on or before July 31 - ⁠No refund after July 31
          </p>
          <strong>Note:</strong>
          <p>
            Registration fees are not transferable between individuals. - ⁠We
            will not issue refunds for anyone who cannot attend our VBS due to
            health reasons after August 18. We hold the final decision regarding
            the issuing of refunds.
          </p>
        </div>
      </section>
    </Footer>
  );
};

const Register = () => {
  const layoutStyle = {
    overflow: "hidden",
  };
  const flexWrapper = {
    display: "flex",
    height: "100%",
    flexDirection: "column",
  };
  return (
    <div>
      <Head>
        <title>VBS - Register</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Epilogue"
        />
      </Head>
      <main>
        <LayoutV1>
          <div style={flexWrapper}>
            <Layout style={layoutStyle}>
              <VBSHeader isRegistrationOpen={false} />
              <RegistrationCards />
              <VBSFooter />
            </Layout>
          </div>
        </LayoutV1>
      </main>
    </div>
  );
};

export default Register;
