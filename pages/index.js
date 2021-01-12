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
      </Head>

      <main>
        <Alert message="We’re meeting online as we follow BC Health Authority restrictions to help control the spread of Covid-19."/>
        <LayoutV1>
          <Carousel autoplay speed={2000} autoplaySpeed={5000}>

            {/**BANNER ONE */}
            <LargeBanner className={theme}>
              <h1>We exist to glorify God by making his gospel known to the world</h1>
              <p>Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Felis bibendum ut tristique et. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non.</p>
              <div>
                <Link href="/worship-sessions">
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
            <h1>Something for everyone</h1>
            <p>Maecenas accumsan lacus vel facilisis. Vitae suscipit
            tellus mauris a diam maecenas sed. Massa vitae tortor condimentum lacinia quis vel.</p>
            <div className={homeStyles.cards_container}>
              <div className={homeStyles.cards_two}>
                <Card>
                  <h3 >Sunday Service</h3>
                  <p>EVERY WEEK AT 10:45AM</p>
                  <Button>Tune in Live</Button>
                </Card>
                <Card>
                  <h3>Kids</h3>
                  <p>AWANA AND SUNDAY SCHOOL</p>
                  <Button>Learn More</Button>
                </Card>
              </div>
              <div className={homeStyles.cards_two}>
                <Card>
                  <h3>Young Adults</h3>
                  <p>WEDNESDAY NIGHTS</p>
                  <Button ghost>Learn More</Button>
                </Card>
                <Card>
                  <h3>Adults</h3>
                  <p>SUNDAY AFTERNOON</p>
                  <Button>Learn More</Button>
                </Card>
              </div>
              <div className={homeStyles.cards_two}>
                <Card>
                  <h3>Golden Years</h3>
                  <p>SUNDAY AFTERNOON</p>
                  <Button>Learn More</Button>
                </Card>
                <Card>
                  <h3>Small Groups</h3>
                  <p>FIND YOUR COMMUNITY</p>
                  <Button>Learn More</Button>
                </Card>
              </div>
            </div>

          </SmallBanner>

          <SmallBanner className={theme}>
            <h1>We're here for you</h1>
            <p>Turpis egestas maecenas pharetra convallis posuere morbi leo. Semper auctor neque vitae tempus. Praesent tristique magna sit amet purus gravida.</p>
            <Button>Request Prayer</Button>
          </SmallBanner>

        </LayoutV1>

      </main>

    </div>
  )
}
