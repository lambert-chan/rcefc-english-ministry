import { useRouter } from 'next/router'
import Head from 'next/head'
import ReactHTMLParser from 'react-html-parser'
import { getAllMenuItems, getPage } from '../../lib/api'

import LayoutV1 from '../../templates/layout_v1/layout'
import { PageBanner, LargeBanner, SmallBanner } from '../../components/banners'
import { getRandomTheme } from '../index'
import generalStyles from '../../styles/general.module.css'

export default function Page({ pageData }) {
    const router = useRouter()
    var banner_index = -1

    if (!router.isFallback && !pageData?.slug) {
        return <p>hmm... there's an error</p>
    }

    let theme = getRandomTheme();
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
                            <PageBanner className={theme}>
                                <h1>{pageData ? pageData.title : ''}</h1>
                                <div
                                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                                />
                            </PageBanner>

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
                                    banner_index++
                                    let content = ReactHTMLParser(subpage.content)
                                    let p_elements = content.filter(element => element.type == 'p')
                                    let title = p_elements.shift()
                                    let groups = content.filter(element => element.type == 'div')
                                    return (
                                        <SmallBanner className={banner_index % 2 == 0 ? 'white' : theme} id={subpage.slug} key={subpage.slug}>
                                            <h4>{subpage.title.toUpperCase()}</h4>
                                            <h2>{title.props.children.map(child => child)}</h2>
                                            {groups.map(group => {
                                                let data = group.props.children[0]
                                                if (data) {
                                                    let data_c = data.props.children
                                                    return (
                                                        <div className={generalStyles.col_two}>
                                                            <div>
                                                                {data_c[0]}
                                                            </div>
                                                            <div>
                                                                {data_c.length < 2 ? data_c[1] : (data_c.filter((d, i) => i > 0))}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </SmallBanner>
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