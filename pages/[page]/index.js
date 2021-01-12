import { useRouter } from 'next/router'
import Head from 'next/head'

import { getAllMenuItems, getPage } from '../../lib/api'

import LayoutV1 from '../../templates/layout_v1/layout'
import { PageBanner, LargeBanner, SmallBanner } from '../../components/banners'
import { getRandomTheme } from '../index'
import generalStyles from '../../styles/general.module.css'

export default function Page({ pageData }) {
    const router = useRouter()

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

                            {/**Hard coded - About Banners */}
                            {pageData.slug == 'about' && (
                                <>
                                    <SmallBanner className="white" id="purpose-statement">
                                        <h4>OUR GOD-GIVEN PURPOSE</h4>
                                        <h2>We exist to glorify God by making his gospel known to the world, and nurturing followers of Jesus Christ within a transformative community.</h2>
                                        <span style={{ margin: '2em 0' }} />
                                        <h4>DEFNITIONS</h4>
                                        <div className={generalStyles.col_two}>
                                            <div>
                                                <h3>Glorify God</h3>
                                            </div>
                                            <div>
                                                <p>God is infinitely holy, perfect, and loving. To glorify God represents our desire to make His beauty and majesty known to the world because He is infinitely worthy of our attention and praise. Since God created humanity to be in relationship with Him, our greatest blessing is to intimately know and be known by such a God.</p>
                                            </div>
                                        </div>
                                        <div className={generalStyles.col_two}>
                                            <div>
                                                <h3>His Gospel</h3>
                                            </div>
                                            <div>
                                                <p>The Gospel describes God’s plan for restoring humanity from sin and self-destruction. This plan has been progressively revealed and carried out by God through human history and is explicitly revealed to us through the Scriptures. Since God’s saving plan is for all of humanity, our desire is to make it known to the world through every aspect of our lives.</p>
                                            </div>
                                        </div>
                                        <div className={generalStyles.col_two}>
                                            <div>
                                                <h3>Followers of Jesus Christ</h3>
                                            </div>
                                            <div>
                                                <p>To follow Jesus Christ is to completely trust one’s life to the truth that Jesus sacrificed his own life to save humanity and to commit oneself to a lifelong journey of becoming like Jesus Christ in character and in action.</p>
                                            </div>
                                        </div>
                                        <div className={generalStyles.col_two}>
                                            <div>
                                                <h3>Transformative community</h3>
                                            </div>
                                            <div>
                                                <p>Transformative community reflects our desire to enter into life-changing relationships with one another. Life-changing community challenges one another to work out the implications of following Jesus Christ in this world. At the same time, since this is a difficult journey, our desire is to foster transparent and supportive community that reflects the love and grace of God.</p>
                                            </div>
                                        </div>
                                    </SmallBanner>
                                    <SmallBanner className={theme} id="vision">
                                        <h4>VISION STATEMENT</h4>
                                        <h2>In seeking to fulfull our God-given purpose, we strive to
be a church that welcomes people from all walks of life, equips people for their God-given calling, and sends people out to impact or community.</h2>
                                    </SmallBanner>
                                    <SmallBanner className="white" id="core-values">
                                        <h4>CORE VALUES</h4>
                                        <div className={generalStyles.col_two}>
                                            <div>
                                                <h3>Biblical authority</h3>
                                            </div>
                                            <div>
                                                <p>
                                                    We believe that the Bible is the complete revelation of God’s will for humanity. It is the sole and final authority for faith and for life. Thus, we value the teaching and preaching of God’s word accurately and in a culturally relevant manner.<br />
                                                    Furthermore, since it is the foundation of a God-honouring life, we value life transformation as people respond with their lives to the Word of God (2 Tim. 3:14-17; 2 Tim. 4:1-5; Jas 1:22-25).
                                                </p>
                                            </div>
                                        </div>

                                        <div className={generalStyles.col_two}>
                                            <div>
                                                <h3>Authentic relationships</h3>
                                            </div>
                                            <div>
                                                <p>
                                                    We believe that life transformation and discipleship were intended by God to occur most effectively in the context of community. Thus, the experience of love, grace, forgiveness, belonging, discipline, and accountability (to name a few) occur as we choose to do life together.<br />
                                                    Therefore, our desire is to see all people relationally and intimately connected to a component of community life within the church (Heb. 10:24-25; Jas 5:13-16).
                                                </p>
                                            </div>
                                        </div>

                                        <div className={generalStyles.col_two}>
                                            <div>
                                                <h3>Proactive missions</h3>
                                            </div>
                                            <div>
                                                <p>
                                                    We believe that the church is God’s vehicle of communicating His Gospel to the world. As such, we believe that every follower of Jesus Christ must be an active and intentional testimony of His Gospel in order to impact the world in word and deed both locally and globally (Matt. 5:13-16; Matt. 28:18-20; Acts 1:8; James 1:27).
                                                </p>
                                            </div>
                                        </div>

                                        <div className={generalStyles.col_two}>
                                            <div>
                                                <h3>Prayer-dependent, everyday living</h3>
                                            </div>
                                            <div>
                                                <p>
                                                    We believe God invites us into new life with Him that is to be empowered by the Holy Spirit and enabled through consistent and faithful prayer. Our desire is to see prayer weaved into the very fabric of our lives and church community so that we might become a church that truly impacts homes, communities, and the world (Prov 15:29; Matt. 6:9-13; 1 John 5:14-15; Eph. 6:18-20).
                                                </p>
                                            </div>
                                        </div>

                                        <div className={generalStyles.col_two}>
                                            <div>
                                                <h3>Christ-centered worship</h3>
                                            </div>
                                            <div>
                                                <p>We believe that the ultimate goal for every person is to give glory to God. As Christ is the perfect revelation of God, we desire to make Christ the focal point of our worhip in all that we do – singing, preaching, teaching, family life, work, community, and culture.<br />
                                                Our desire is to see every person offer a daily, sacrificial response with their lives first to Christ and subsequently, towards the world (Ps. 96:7-8; Matt. 22:37-39; Rom. 12:1-2; Acts 2:42-47).
                                                    </p></div>
                                        </div>

                                    </SmallBanner>
                                    <SmallBanner className={theme} id="pastoral-team">
                                        <h4>PASTORAL TEAM</h4>
                                        <div className={generalStyles.col_two}>
                                            <div>
                                                <div style={{ backgroundColor: 'white', height: '400px', width: '300px' }} />
                                            </div>
                                            <div>
                                                <h3>Pastor William Burgess</h3>
                                                <h5>ENGLISH MINISTRIES</h5>
                                                <p>Aliquet porttitor lacus luctus accumsan. Interdum consectetur libero id faucibus nisl. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis. Feugiat in fermentum posuere urna nec tincidunt praesent semper.<br />
At varius vel pharetra vel turpis nunc eget. Id venenatis a condimentum vitae sapien pellentesque habitant.</p>
                                            </div>
                                        </div>
                                        <div className={generalStyles.col_two}>
                                            <div>
                                                <div style={{ backgroundColor: 'white', height: '400px', width: '300px' }} />
                                            </div>
                                            <div>
                                                <h3>Rev. Edmond Fong</h3>
                                                <h5>CHINESE MINISTRIES</h5>
                                                <p>Aliquet porttitor lacus luctus accumsan. Interdum consectetur libero id faucibus nisl. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis. Feugiat in fermentum posuere urna nec tincidunt praesent semper.<br />
At varius vel pharetra vel turpis nunc eget. Id venenatis a condimentum vitae sapien pellentesque habitant.</p>
                                            </div>
                                        </div>
                                        <div className={generalStyles.col_two}>
                                            <div>
                                                <div style={{ backgroundColor: 'white', height: '400px', width: '300px' }} />
                                            </div>
                                            <div>
                                                <h3>Pastor Kwok-Yin Ho</h3>
                                                <h5>CHINESE MINISTRIES</h5>
                                                <p>Aliquet porttitor lacus luctus accumsan. Interdum consectetur libero id faucibus nisl. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis. Feugiat in fermentum posuere urna nec tincidunt praesent semper.<br />
At varius vel pharetra vel turpis nunc eget. Id venenatis a condimentum vitae sapien pellentesque habitant.</p>
                                            </div>
                                        </div>
                                    </SmallBanner>"
                                </>
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