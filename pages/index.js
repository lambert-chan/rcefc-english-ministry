import Head from 'next/head'
import Link from 'next/link'
import { Button, Carousel } from 'antd'
import LayoutV1 from '../templates/layout_v1/layout'
import { LargeBanner, SmallBanner } from '../components/banners'
import { Card } from '../components/cards'
import homeStyles from '../styles/Home.module.css'
import Alert from '../components/alert'

export function getRandomTheme() {
  const theme_count = 4;
  let random_int = Math.floor(Math.random() * Math.floor(theme_count));
  return `theme_${random_int}`
}

export default function Home() {
  let theme = getRandomTheme()
  return (
    <div>
      <Head>
        <title>RCEFC English Ministries</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
        <meta name="description" content="The English Ministries at Richmond Chinese Evangelical Free Church (RCEFC) exists to glorify God by making His gospel known to the world." />
        <meta name="keywords" content="rcefc, english, ministry, em" />
        <meta name="language" content="English" />
      </Head>

      <main>
        <Alert message="We’re meeting online as we follow BC Health Authority restrictions to help control the spread of Covid-19." />
        <LayoutV1>
          <Carousel autoplay speed={3000} autoplaySpeed={10000}>

            {/**Feature Banner */}
            {/* <LargeBanner className={theme}>
              <h1>Drive-in Worship Sunday</h1>
              <p>
                Come join us for another opportunity to worship together (in cars) on June 6, 2021
              </p>
              <div>
                <Link href="/forms/drivein">
                  <Button>
                    Sign up now
                  </Button>
                </Link>
                <Link href="/join-us/worship">
                  <Button>
                    Join online
                  </Button>
                </Link>
              </div>
            </LargeBanner> */}

            {/** Banner One */}
            <LargeBanner className={theme}>
              <h1>we exist to glorify God by making His gospel known to the world</h1>
              <p>
                Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit - Matthew 28:19
              </p>
              <div>
                <Link href="/join-us/worship">
                  <Button>
                    Join an online service
                  </Button>
                </Link>
                <Link href="/contacts">
                  <Button>
                    Get in touch
                  </Button>
                </Link>
              </div>
            </LargeBanner>

          </Carousel>


          <SmallBanner className="white">
            <h2>Something for everyone</h2>
            <p>Community helps us grow, it supports us in times of need and we all need some connection
              in order for us accomplish more as fellow children of God.</p>
            <div className={homeStyles.cards_container}>
              <div className={homeStyles.cards_two}>
                <Card>
                  <h3 >Sunday Service</h3>
                  <p>EVERY WEEK AT 10:45AM</p>
                  <Link href="/join-us/worship">
                    <Button>Tune in Live</Button>
                  </Link>
                </Card>
                <Card>
                  <h3>Children</h3>
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

          <SmallBanner className={theme}>
            <h2>We're here for you</h2>
            <p>Our prayer team is ready to work with you for that breakthrough that you need in your life. All prayer requests will remain confidential.</p>
            <Link href="/forms/prayer">
              <Button>Request Prayer</Button>
            </Link>
          </SmallBanner>

        </LayoutV1>

      </main>

    </div>
  )
}
