import { useRouter } from 'next/router'
import Head from 'next/head'

import { getAllPostsWithSlug, getPost } from '../../lib/api'

import LayoutV1 from '../../templates/layout_v1/layout'

export default function Post({ postData }) {
    const router = useRouter()

    if (!router.isFallback && !postData?.slug) {
        return (
            <LayoutV1>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '3em', height: '100vh' }}>
                    <h1>This page does not exist.</h1>
                </div>
            </LayoutV1>
        )
    }

    return (
        <div>
            <Head>
                <title>{postData ? postData.title : 'Default Post Title'}</title>
                <link rel='icon' href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
            </Head>

            <main style={{ textAlign: 'center' }}>
                {router.isFallback ? (
                    <h2>Loading...</h2>
                ) : (
                        <LayoutV1>
                            <h2>{postData ? postData.title : 'Default Post Title'}</h2>
                            <div
                                dangerouslySetInnerHTML={{ __html: postData.content }}
                            />
                        </LayoutV1>
                    )}
            </main>
        </div>
    )
}

export async function getStaticPaths() {
    const postPath = await getAllPostsWithSlug();

    return {
        paths: postPath.edges.map(({ node }) => `/post/${node?.slug}`) || [],
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    const data = await getPost(params?.slug)
    console.log(`Building post: ${params?.slug}`)
    return {
        props: {
            postData: data.post || null
        }
    }
}