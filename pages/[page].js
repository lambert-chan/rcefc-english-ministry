import { useRouter } from 'next/router'
import Head from 'next/head'

import { getAllMenuItems, getPage } from '../lib/api'

import LayoutV1 from '../templates/layout_v1/layout'

export default function Page({ pageData }) {
    const router = useRouter()

    if (!router.isFallback && !pageData?.slug) {
        return <p>hmm... there's an error</p>
    }

    return (
        <div>
            <Head>
                <title>{pageData ? pageData.title : 'Default Page Title'}</title>
                <link rel='icon' href="/favicon/ico" />
            </Head>

            <main style={{textAlign: 'center'}}>
                {router.isFallback ? (
                    <h2>Loading...</h2>
                ) : (
                        <LayoutV1>
                            <h2>{pageData ? pageData.title : 'Default Page Title'}</h2>
                            <div
                                dangerouslySetInnerHTML={{ __html: pageData.content }}
                            />
                        </LayoutV1>
                    )}
            </main>
        </div>
    )
}

export async function getStaticPaths() {
    const menuPaths = await getAllMenuItems();
    let primaryMenuItems = menuPaths.filter(item => !item.parentId)
    return {
        paths: primaryMenuItems.map( node => `${node.path}`) || [],
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    const data = await getPage(params.page)
    console.log(`Building page: ${params.page}`)
    return {
        props: {
            pageData: data.page
        }
    }
}