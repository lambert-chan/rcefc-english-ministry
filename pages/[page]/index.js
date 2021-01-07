import { useRouter } from 'next/router'
import Head from 'next/head'

import { getAllMenuItems, getPage } from '../../lib/api'
import { Button } from 'antd'

import LayoutV1 from '../../templates/layout_v1/layout'
import { LargeBanner } from '../../components/banners'
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
                                        <Button><Link to="purpose-statement" smooth>Our purpose</Link></Button>
                                        <Button><Link to="core-values" smooth>Our core values</Link></Button>
                                    </div>
                                )}
                            </LargeBanner>
                            
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
                                            AWANA Club<br/>	
                                            Sunday School<br/>	
                                            Children Worship<br/>	
                                            Nursery</div>
                                    </LargeBanner>
                                </>
                            )}

                            {/**Hard coded - About Banners */}
                            {pageData.slug == 'about' && (
                                <>
                                    <LargeBanner className="black" id="purpose-statement">
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
                                    <LargeBanner className="white" id="core-values">
                                        <h3>OUR CORE VALUES</h3>
                                        <div style={{ marginBottom: '4em' }}></div>
                                        <h2>Our God-given purpose</h2>
                                        <div>
                                            Maecenas accumsan lacus vel facilisis. Vitae suscipit
                                            tellus mauris a diam maecenas sed. Massa vitae tortor condimentum lacinia quis vel.</div>
                                    </LargeBanner>
                                    <LargeBanner className="black" id="vision">
                                        <h3 style={{ color: 'white' }}>OUR VISION</h3>
                                        <div style={{ marginBottom: '4em' }}></div>
                                        <h2 style={{ color: 'white' }}>RCEFC English Ministries Vision Statement</h2>
                                        <div>
                                            In seeking to fulfill our God-given purpose, the English Ministries of RCEFC will strive to be a church that:<br />
                                            Welcomes people from all walks of life<br />
                                            Equips people for their God-given calling<br />
                                            Sends people out to impact our community</div>
                                    </LargeBanner>
                                    <LargeBanner className="white" id="statement-of-faith">
                                        <h3>OUR STATEMENT OF FAITH</h3>
                                        <div style={{ marginBottom: '4em' }}></div>
                                        <h2>We believe:</h2>
                                        <div>
                                            RCEFC is part of the association of churches that make up the Evangelical Free Church of Canada (EFCC)<br />
                                            Maecenas accumsan lacus vel facilisis. Vitae suscipit
                                            tellus mauris a diam maecenas sed. Massa vitae tortor condimentum lacinia quis vel.</div>
                                    </LargeBanner>
                                    <LargeBanner className="black" id="vision">
                                        <h3 style={{ color: 'white' }}>OUR PASTORAL TEAM</h3>
                                        <div style={{ marginBottom: '4em' }}></div>
                                        <h2 style={{ color: 'white' }}>Meet our team</h2>
                                        <div>
                                            Pastor William Burgess, Pastor of English Ministries<br />
                                            Rev. Edmond Fong, Pastor of Chinese Ministries<br />
                                            Pastor Kwok-Yin Ho, Pastor of Chinese Ministries<br />
                                            Rev. Philip Leung, Interim Pastor</div>
                                    </LargeBanner>
                                    <LargeBanner className="white" id="statement-of-faith">
                                        <h3>OUR STATUS</h3>
                                        <div style={{ marginBottom: '4em' }}></div>
                                        <h2>November 19, 2020 Update</h2>
                                        <div>
                                            Phase 2 of the plan which permits up to 50 people to gather at church was originally set to begin on Oct. 1.
                                            However due to the rising covid cases and additional restrictions, we will delay the Phase 2 reopening to a later date.
                                            Currently, the church is closed for gatherings.
                                            Furthermore, English Ministry will begin to conduct Sunday worship services online through Zoom.
                                            Please go to the media page for further details.</div>
                                    </LargeBanner>
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