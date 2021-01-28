import { useRouter } from 'next/router'
import Head from 'next/head'

import { getAllMenuItems, getPage } from '../../lib/api'

import LayoutV1 from '../../templates/layout_v1/layout'
import { LargeBanner } from '../../components/banners'
import { getRandomTheme } from '../index'

export default function Page({ pageData }) {
    const router = useRouter()

    if (!router.isFallback && !pageData?.slug) {
        return <p>hmm... there's an error</p>
    }

    let theme = getRandomTheme();
    return (
        <div>
            <Head>
                <title>{pageData ? pageData.title : 'Default Page Title'}</title>
                <link rel='icon' href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
            </Head>

            <main style={{ textAlign: 'center' }}>
                {router.isFallback ? (
                    <h2>Loading...</h2>
                ) : (
                        <LayoutV1 className="white">
                            <LargeBanner className={theme}>
                                <h1>{pageData ? pageData.title : ''}</h1>
                                <div
                                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                                />
                            </LargeBanner>
                        </LayoutV1>
                    )}
            </main>
        </div>
    )
}

export async function getStaticPaths() {
    const menuPaths = await getAllMenuItems();
    let subMenuItems = menuPaths.filter(item => item.parentId)
    return {
        paths: subMenuItems.map(node => `${node.path}`) || [],
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    let slug = `/${params.page}/${params.subpage}`
    const data = await getPage(slug)
    console.log(`Building page: ${slug}`)
    return {
        props: {
            pageData: data.page
        }
    }
}