import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import parse, { domToReact } from "html-react-parser";

import { getAllMenuItems, getPage } from "../../lib/api";

import LayoutV1 from "../../templates/layout_v1/layout";
import { TitleBanner, PageBanner } from "../../components/banners";
import { getRandomTheme } from "../index";
import { remove_linebreaks } from "../../lib/utils";
import generalStyles from "../../styles/general.module.css";
import { Button } from "antd";

export default function Page({ pageData }) {
  const router = useRouter();
  let banner_index = 0;
  let theme = getRandomTheme();

  if (!router.isFallback && !pageData?.slug) {
    return (
      <LayoutV1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "3em",
            height: "100vh",
          }}
        >
          <h1>This page does not exist.</h1>
        </div>
      </LayoutV1>
    );
  }

  const wp_classes = [
    "wp-block-group",
    "wp-block-column",
    "wp-block-group__inner-container",
    "wp-block-group is-layout-flow wp-block-group-is-layout-flow",
  ];
  const childOptions = {
    replace: ({ attribs, children }) => {
      if (!attribs) {
        return;
      }

      if (wp_classes.includes(attribs.class)) {
        return <div>{domToReact(children, childOptions)}</div>;
      } else if (attribs.class === "wp-block-columns") {
        return (
          <div
            className={generalStyles.col_two}
            style={{ borderBottom: "none" }}
          >
            {domToReact(children, childOptions)}
          </div>
        );
      } else if (
        attribs.class?.includes("wp-block-columns") &&
        children.length > 2
      ) {
        return (
          <div className={generalStyles.columns}>
            {domToReact(children, childOptions)}
          </div>
        );
      } else if (attribs.class?.includes("wp-block-column")) {
        return (
          <div className={generalStyles.column}>
            {domToReact(children, childOptions)}
          </div>
        );
      } else if (attribs.class === "wp-block-file") {
        return (
          <div className={generalStyles.block_file}>
            {domToReact(children, childOptions)}
          </div>
        );
      }
    },
  };

  const options = {
    replace: ({ attribs, children }) => {
      if (!attribs) {
        return;
      }

      if (wp_classes.includes(attribs.class)) {
        return (
          <PageBanner className={++banner_index % 2 == 0 ? theme : "white"}>
            {domToReact(children, childOptions)}
          </PageBanner>
        );
      }
    },
  };
  let parsed = parse(remove_linebreaks(pageData?.content), options);
  if (parsed[0]?.type == "p") {
    var description = parsed.shift();
  }

  return (
    <div>
      <Head>
        <title>{pageData ? pageData.title : "Default Page Title"}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Epilogue"
        />
      </Head>

      <main style={{ textAlign: "center" }}>
        {router.isFallback ? (
          <h2>Loading...</h2>
        ) : (
          <LayoutV1>
            <TitleBanner className={theme} id={pageData.slug}>
              <h1>{pageData.title}</h1>
              {description && description}
            </TitleBanner>
            {parsed[0] ? parsed.map((group) => group) : parsed}
            <PageBanner
              className={++banner_index % 2 == 0 ? theme : ""}
              key={banner_index}
            >
              <h2>Have Questions?</h2>
              <p>We would love to be able to connect you to the church!</p>
              <Link href="/forms/contact">
                <Button>Get in touch</Button>
              </Link>
            </PageBanner>
          </LayoutV1>
        )}
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const menuPaths = await getAllMenuItems();
  let subMenuItems = menuPaths?.filter((item) => item.parentId);
  return {
    paths: subMenuItems?.map((node) => `${node.path}`) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let slug = `/${params.page}/${params.subpage}`;
  const data = await getPage(slug);
  console.log(`Building page: ${slug}`);
  return {
    props: {
      pageData: data.page || null,
    },
  };
}
