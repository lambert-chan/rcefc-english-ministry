import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { getAllMenuItems, getPage } from '../../lib/api'
import parse, { domToReact } from 'html-react-parser';
import { Button } from 'antd'

import LayoutV1 from '../../templates/layout_v1/layout'
import { TitleBanner, PageBanner, SmallBanner } from '../../components/banners'
import { Card } from '../../components/cards'
import { getRandomTheme } from '../index'
import { remove_linebreaks } from '../../lib/utils'
import generalStyles from '../../styles/general.module.css'
import homeStyles from '../../styles/Home.module.css'

export default function Page({ pageData }) {
    const router = useRouter()
    var banner_index = 0
    let theme = getRandomTheme();

    if (!router.isFallback && !pageData?.slug) {
        return (
            <LayoutV1>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '3em', height: '100vh' }}>
                    <h1>This page does not exist.</h1>
                </div>
            </LayoutV1>
        )
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
                <meta name="description" content="" />
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
                            <SmallBanner className="white">
                                <h1>Something for everyone</h1>
                                <p>Community helps us grow, it supports us in times of need and we all need some connection in order for us accomplish more as fellow children of God.</p>
                                <div className={homeStyles.cards_container}>
                                    <div className={homeStyles.cards_two}>
                                        <Card>
                                            <h3>Sunday Service</h3>
                                            <p>EVERY WEEK AT 10:45AM</p>
                                            <Link href="/join-us/worship">
                                                <Button>Tune in Live</Button>
                                            </Link>
                                        </Card>
                                        <Card>
                                            <h3>Childrens</h3>
                                            <p>AWANA AND SUNDAY SCHOOL</p>
                                            <Link href="/join-us/children">
                                                <Button>Learn More</Button>
                                            </Link>
                                        </Card>
                                    </div>
                                    <div className={homeStyles.cards_two}>
                                        <Card>
                                            <h3>Young Adults</h3>
                                            <p>WEDNESDAY NIGHTS</p>
                                            <Link href="/join-us/yads">
                                                <Button>Learn More</Button>
                                            </Link>
                                        </Card>
                                        <Card>
                                            <h3>Adults</h3>
                                            <p>SUNDAY AFTERNOON</p>
                                            <Link href="/join-us/adults">
                                                <Button>Learn More</Button>
                                            </Link>
                                        </Card>
                                    </div>
                                    <div className={homeStyles.cards_two}>
                                        <Card>
                                            <h3>Sermons</h3>
                                            <p>New recordings weekly</p>
                                            <Link href="/join-us/sermon-recording-list">
                                                <Button>Listen Here</Button>
                                            </Link>
                                        </Card>
                                        <Card>
                                            <h3>Small Groups</h3>
                                            <p>FIND YOUR COMMUNITY</p>
                                            <Link href="/join-us/small-groups">
                                                <Button>Learn More</Button>
                                            </Link>
                                        </Card>
                                    </div>
                                </div>
                            </SmallBanner>
                        )}

                        {/* About pages layout */}
                        {pageData.slug !== 'join-us' && (
                            pageData.children.edges.map(edge => {
                                let subpage = edge.node
                                let parsed = parse(remove_linebreaks(subpage.content), options)
                                return (
                                    <PageBanner className={++banner_index % 2 == 0 ? theme : 'white'} id={subpage.slug} key={subpage.slug}>
                                        <h5>{subpage.title.toUpperCase()}</h5>
                                        {parsed[0] ? parsed.map(group => group) : parsed}
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
            pageData: data.page || null
        }
    }
}