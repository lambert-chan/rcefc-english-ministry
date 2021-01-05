import { useRouter } from 'next/router'
import Head from 'next/head'

import { getAllMenuItems, getPage } from '../../lib/api'
import { Button } from 'antd'

import LayoutV1 from '../../templates/layout_v1/layout'
import { LargeBanner } from '../../components/banners'
import { Fragment } from 'react'
import { Link } from 'react-scroll'

export default function Page({ pageData }) {
    const router = useRouter()

    if (!router.isFallback && !pageData?.slug) {
        return <p>hmm... there's an error</p>
    }

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
                        <LayoutV1 className="black">
                            <LargeBanner className="white">
                                <h1>{pageData ? pageData.title : ''}</h1>
                                <div
                                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                                />
                                {pageData.slug == 'about' && (
                                    <div>
                                        <Button><Link to="our_purpose" smooth>Our purpose</Link></Button>
                                        <Button><Link to="our_values" smooth>Our core values</Link></Button>
                                    </div>
                                )}
                            </LargeBanner>

                            {pageData.slug == 'about' && (
                                <Fragment>
                                    <LargeBanner className="black" name="our_purpose" scroll>
                                        <h3 style={{ color: 'white' }}>OUR PURPOSE</h3>
                                        <div style={{ marginBottom: '4em' }}></div>
                                        <h2 style={{ color: 'white' }}>Making His gospel known</h2>
                                        <div>
                                            Est velit egestas dui id ornare arcu. Nec ullamcorper sit amet risus nullam eget. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros. Leo duis ut diam quam nulla porttitor. Ultricies leo integer malesuada nunc vel risus.
                                            Vel orci porta non pulvinar neque laoreet.</div>
                                        <div style={{ border: '1px solid white', margin: '3em 0' }}></div>
                                        <h2 style={{ color: 'white' }}>Nurturing followers of Jesus Christ</h2>
                                        <div>
                                            Turpis egestas maecenas pharetra convallis posuere morbi leo. Semper auctor neque vitae tempus. Praesent tristique magna sit amet purus gravida.</div>
                                    </LargeBanner>
                                    <LargeBanner className="white" name="our_values">
                                        <h3>OUR CORE VALUES</h3>
                                        <div style={{ marginBottom: '4em' }}></div>
                                        <h2>Our God-given purpose</h2>
                                        <div>
                                            Maecenas accumsan lacus vel facilisis. Vitae suscipit
                                            tellus mauris a diam maecenas sed. Massa vitae tortor condimentum lacinia quis vel.</div>
                                    </LargeBanner>
                                </Fragment>
                            )}
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
        paths: primaryMenuItems.map(node => `${node.path}`) || [],
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