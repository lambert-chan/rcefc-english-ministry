import React from "react";
import Head from "next/head";
import LayoutV1 from "../../templates/layout_v1/layout";
import { Button, Layout } from "antd";
import vbsStyles from "../../styles/vbs.module.css";

export const RegisterButton = () => {
  const googleFormUrl = "https://forms.gle/M8ydDyzLR7JyueEM9";
  return (
    <Button href={googleFormUrl} target="_blank">
      Register Here
    </Button>
  );
};

const VBSHeader = ({ isRegistrationOpen }) => {
  const { Header } = Layout;
  return (
    <Header className={vbsStyles.header}>
      <div className={vbsStyles.promoteBox}>
        <img
          src="https://english.rcefc.org/wp-content/uploads/2024/04/jungle-journey-logo.png"
          alt="The Great Jungle Journey"
          style={{ maxWidth: "100%" }}
        ></img>
        <p>
          <b className={vbsStyles.whiteText} style={{ fontSize: "1.5rem" }}>
            at
          </b>
        </p>
        <h1
          className={vbsStyles.whiteText}
          style={{
            fontWeight: "bolder",
          }}
        >
          Richmond Chinese Evangelical Free Church
        </h1>
        {isRegistrationOpen && (
          <div>
            <h4 className={vbsStyles.whiteText} style={{ fontSize: "1.5rem" }}>
              Sign your child up today!
            </h4>
            <RegisterButton />
          </div>
        )}
      </div>
    </Header>
  );
};

const VBSContent = () => {
  const { Content } = Layout;
  return (
    <Content className={vbsStyles.content}>
      <div style={{ marginTop: "2rem", textAlign: "start" }}>
        <h5>
          We cordially invite children who are entering kindergarten to grade 7 in
          September 2024 to join us!
        </h5>
        <h5>
          Date: August 19 (Monday) to 23 (Friday), 2024 Time: 9:00 a.m. to 12:30
          p.m.
        </h5>
        <h5>Fee: Early Bird $65.00 (Until May 31st); Regular $75.00</h5>
        <h5>Registration begins on May 3rd, 2024</h5>
        <hr />
        <h3>Description</h3>
        <p
          style={{ marginBottom: "3rem", padding: "0 5vw", fontSize: "1.1rem" }}
        >
          Every day, our kids are bombarded with questions: Did God really
          create everything? Why do bad things happen? Was Noah's ark real? Why
          do I need to be saved? Can I trust the Bible? At this VBS, your kids
          will explore the biblical answers to these questions as they set off
          on an epic adventure from Genesis to Revelation. Amid sloths,
          butterflies, river dolphins, and dart frogs, your children will sail
          along on a fun jungle cruise, stopping at seven ports of call. These
          ports are the 7 C's of History: Creation, Corruption, Catastrophe,
          Confusion, Christ, Cross, and Consummation. Kids will discover how
          these events shape our world, and they will learn to reconnect the
          Bible to their everyday life. Prepare to swing into fun as we head out
          on The Great Jungle Journey!
        </p>

        <section style={{ width: "90%", margin: "auto" }}>
          <div>
            <div>
              <video
                src="https://assets.answersingenesis.org/vid/vbs/2024/2306-jj-promo-v1.mp4"
                poster="https://assets.myanswers.com/img/theme/jungle-journey-poster.jpg"
                controls="controls"
                analytic="VBS The Great Jungle Journey Promotional Video"
                preload="auto"
                width="100%"
              >
                <a
                  href="https://assets.answersingenesis.org/vid/vbs/2024/2306-jj-promo-v1.mp4"
                  target="_blank"
                  title="VBS The Great Jungle Journey Promotional Video"
                >
                  <img
                    src="https://assets.answersingenesis.org/img/mediafile/preview_image/ocean-commotion.jpg"
                    alt="VBS The Great Jungle Journey Promotional Video"
                    border="0"
                  />
                  <i></i>
                </a>
              </video>
            </div>
          </div>
        </section>
      </div>
    </Content>
  );
};

const VBSMap = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2609.4120941430187!2d-123.09297592298662!3d49.15478577137398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485dff636e305ab%3A0x390f4ae37f19a94d!2sRichmond%20Chinese%20Evangelical%20Free%20Church!5e0!3m2!1sen!2sca!4v1713033398378!5m2!1sen!2sca"
        width="600"
        height="450"
        style={{ border: "none" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

const VBSFooter = () => {
  const { Footer } = Layout;
  return (
    <Footer className={vbsStyles.footer}>
      <section className={vbsStyles.promoteBox}>
        <h2 className={vbsStyles.whiteText} style={{ fontSize: "3rem" }}>
          Join Us
        </h2>
        <RegisterButton />
        <div style={{ textAlign: "start", padding: "1rem", maxWidth: "45rem" }}>
          <h1 style={{ fontSize: "2rem", color: "white !important" }}>
            After registration
          </h1>
          <p>
            After filling out the registration form, please see the following
            details:
          </p>
          <p>
            1. Your spot will be secured upon receipt of payment through
            E-transfer to rcefc@hotmail.com. Please indicate "VBS, name of your
            child" in the comment box when sending the payment. Registration
            Fee: Payment made on or before May 31: $65 ($70 with VBS Music
            digital file download) Payment made on June 1 and after: $75 ($80
            with VBS Music digital file download)
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
        </div>
      </section>
    </Footer>
  );
};

const VBS = () => {
  const layoutStyle = {
    overflow: "hidden",
  };
  const flexWrapper = {
    display: "flex",
    height: "100%",
    flexDirection: "column",
  };

  const startDate = new Date("2024-05-03");
  const currentDate = new Date();
  const isRegistrationOpen = currentDate > startDate;

  return (
    <div>
      <Head>
        <title>VBS</title>
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
              <VBSHeader isRegistrationOpen={isRegistrationOpen} />
              <VBSContent />
              <VBSMap />
              {isRegistrationOpen && <VBSFooter />}
            </Layout>
          </div>
        </LayoutV1>
      </main>
    </div>
  );
};

export default VBS;
