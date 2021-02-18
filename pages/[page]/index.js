import { useRouter } from 'next/router'
import Head from 'next/head'
import ReactHTMLParser from 'react-html-parser'
import { getAllMenuItems, getPage } from '../../lib/api'
import parse, { domToReact } from 'html-react-parser';

import LayoutV1 from '../../templates/layout_v1/layout'
import { TitleBanner, PageBanner, LargeBanner, SmallBanner } from '../../components/banners'
import { getRandomTheme } from '../index'
import { remove_linebreaks } from '../../lib/utils'
import generalStyles from '../../styles/general.module.css'

export default function Page({ pageData }) {
    const router = useRouter()
    var banner_index = 0
    let theme = getRandomTheme();

    if (!router.isFallback && !pageData?.slug) {
        return <p>hmm... there's an error</p>
    }

    const wp_classes = ['wp-block-group', 'wp-block-column', 'wp-block-group__inner-container']
    const options = {
        replace: ({ attribs, children }) => {
            if (!attribs) {
                return
            }

            if (wp_classes.includes(attribs.class)) {
                return (
                    <div>
                        {domToReact(children, options)}
                    </div>
                );
            } else if (attribs.class === 'wp-block-columns') {
                return (
                    <div className={generalStyles.col_two}>
                        {domToReact(children, options)}
                    </div>
                )
            }
        }
    }

    return (
        <div>
            <Head>
                <title>{pageData ? pageData.title : 'RCEFC'}</title>
                <link rel='icon' href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
            </Head>

            <main style={{ textAlign: 'center' }}>
                {router.isFallback ? (
                    <h2>Loading...</h2>
                ) : (
                        <LayoutV1>
                            <TitleBanner className={theme} id={pageData.slug} key={pageData.slug}>
                                <h1>{pageData.title}</h1>
                                <div
                                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                                />
                            </TitleBanner>

                            {/**Hard coded - Join Us Banners */}
                            {pageData.slug == 'join-us' && (
                                <>
                                    <LargeBanner className="black" id="worship-sessions">
                                        <h3 style={{ color: 'white' }}>WORSHIP SESSIONS</h3>
                                        <div style={{ marginBottom: '4em' }}></div>
                                        <h2 style={{ color: 'white' }}>Check out our previous recorded worship sessions</h2>
                                        <div>
                                            Audio versions are available via the sermon recording list.<br />
                                            January 3, 2021 – Worship<br />
                                            December 27, 2020 – Worship<br />
                                            December 25, 2020 – Christmas Worship<br />
                                            December 20, 2020 – Zoom Worship<br />
                                            December 13, 2020 – Worship</div>
                                    </LargeBanner>
                                    <LargeBanner className="white" id="sermon-recording-list">
                                        <h3>SERMON RECORDING LIST</h3>
                                        <div style={{ marginBottom: '4em' }}></div>
                                        <h2>Listen to the sermons throughout the week</h2>
                                        <div>
                                            December 2020<br />
                                            December 27, 2020 – The Return of the King<br />
                                            December 25, 2020 – Advent 2020 –  Nativity Sermon – with worship<br />
                                            December 20, 2020 – Advent 2020 – Love<br />
                                            December 13, 2020 – Advent 2020 – Joy<br />
                                            December 06, 2020 – It is Good for Us to be Here?</div>
                                    </LargeBanner>
                                    <LargeBanner className="black" id="crossroads-fellowship">
                                        <h3 style={{ color: 'white' }}>CROSSROADS FELLOWSHIP</h3>
                                        <div style={{ marginBottom: '4em' }}></div>
                                        <h2 style={{ color: 'white' }}>For all highschool students in grades 8-12</h2>
                                        <div>
                                            We meet every Saturday, from 7:30 pm – 9:30 pm in Rm 202 (in the main building)<br />
                                            Crossroads Fellowship exists to:<br />
                                            – Welcome all youth – believers or non-believers, new-comers or regulars<br />
                                            – Allow youth to learn about the Christian faith and what it means to follow Jesus<br />
                                            – Help youth follow Christ and impact the world together</div>
                                    </LargeBanner>
                                    <LargeBanner className="white" id="children">
                                        <h3>CHILDREN</h3>
                                        <div style={{ marginBottom: '4em' }}></div>
                                        <h2>Check out all our children programs</h2>
                                        <div>
                                            AWANA Club<br />
                                            Sunday School<br />
                                            Children Worship<br />
                                            Nursery</div>
                                    </LargeBanner>
                                </>
                            )}

                            {/* About pages layout */}
                            {pageData.slug == 'about' && (
                                pageData.children.edges.map(edge => {
                                    let subpage = edge.node
                                    let parsed = parse(remove_linebreaks(subpage.content), options)
                                    return (
                                        <PageBanner className={++banner_index % 2 == 0 ? theme : 'white'} id={subpage.slug} key={subpage.slug}>
                                            <h5>{subpage.title.toUpperCase()}</h5>
                                            {parsed[0] ? parsed.map(group => group)  : parsed}
                                        </PageBanner>
                                    )
                                })
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