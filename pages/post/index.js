import Head from 'next/head';
import Link from 'next/link';

import { getAllPosts } from '../../lib/api';

import { Button } from 'antd'

import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/post.module.css';
import LayoutV1 from '../../templates/layout_v1/layout';

const Post = ({ allPosts }) => (
    <div>
        <Head>
            <title>Latest Post articles</title>
            <link rel='icon' href='/favicon.ico' />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
        </Head>

        <main>
            <LayoutV1>
                <h1 className={styles.title}>Latest Post articles</h1>
                <br />
                <section>
                    {allPosts.edges.map(({ node }) => (
                        <div className={blogStyles.listitem} key={node.id}>
                            <div className={blogStyles.listitem__content}>
                                <h2>{node.title}</h2>
                                <p>{node.extraPostInfo.authorExcerpt}</p>
                                <Link href={`/post/${node.slug}`}>
                                    <Button>Read more</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>
            </LayoutV1>

        </main>
    </div>
);

export default Post

export async function getStaticProps() {
    const data = await getAllPosts();
    return {
        props: {
            allPosts: data
        }
    };
}