import Head from 'next/head'
import Link from 'next/link'
import { Button, Carousel } from 'antd'
import LayoutV1 from '../templates/layout_v1/layout'
import { LargeBanner, SmallBanner } from '../components/banners'
import { Card } from '../components/cards'

export default function Home() {
  return (
    <div>
      <Head>
        <title>RCEFC English Ministries</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
      </Head>

      <main>
        <LayoutV1>
          <Carousel autoplay speed={2000} autoplaySpeed={5000}>

            {/**BANNER ONE */}
            <LargeBanner className='black'>
              <h1 style={{ color: 'white' }}>Following Jesus</h1>
              <p>We exist to glorify God by making His gospel known to the world and nurturing followers of Jesus Christ within a transformitive community.</p>
              <div>
                <Link href="/worship-sessions">
                  <Button>
                    Join an online service
                  </Button>
                </Link>
                <Link href="/contacts">
                  <Button ghost>
                    Get in touch
                  </Button>
                </Link>
              </div>
            </LargeBanner>

            {/**BANNER TWO */}
            <LargeBanner className='black'>
              <h1 style={{ color: 'white' }}>Following Jesus2</h1>
              <p>We exist to glorify God by making His gospel known to the world and nurturing followers of Jesus Christ within a transformitive community.</p>
              <div>
                <Link href="/worship-sessions">
                  <Button>
                    Join an online service
                </Button>
                </Link>
                <Link href="/contacts">
                  <Button ghost>
                    Get in touch
                </Button>
                </Link>
              </div>
            </LargeBanner>

            {/**BANNER THREE */}
            <LargeBanner className='black'>
              <h1 style={{ color: 'white' }}>Following Jesus3</h1>
              <p>We exist to glorify God by making His gospel known to the world and nurturing followers of Jesus Christ within a transformitive community.</p>
              <div>
                <Link href="/worship-sessions">
                  <Button>
                    Join an online service
                </Button>
                </Link>
                <Link href="/contacts">
                  <Button ghost>
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
          </SmallBanner>

          <div className="cards_three">
            <Card style={{ background: 'black', color: 'white' }}>
              <h3 style={{ color: 'white' }}>Sunday Service</h3>
              <p>EVERY WEEK AT 10:45AM</p>
              <Button>Tune in Live</Button>
            </Card>
            <Card style={{ background: '#333', color: 'white' }}>
              <h3 style={{ color: 'white' }}>Kids</h3>
              <p>AWANA AND SUNDAY SCHOOL</p>
              <Button ghost>Learn More</Button>
            </Card>
            <Card style={{ background: '#828282', color: 'white' }}>
              <h3 style={{ color: 'white' }}>Young Adults</h3>
              <p>WEDNESDAY NIGHTS</p>
              <Button ghost>Learn More</Button>
            </Card>
          </div>

          <div className="cards_three">
            <Card style={{ background: '#F2F2F2' }}>
              <h3>Adults</h3>
              <p>SUNDAY AFTERNOON</p>
              <Button>Learn More</Button>
            </Card>
            <Card style={{ background: '#E0E0E0' }}>
              <h3>Golden Years</h3>
              <p>SUNDAY AFTERNOON</p>
              <Button>Learn More</Button>
            </Card>
            <Card style={{ background: '#BDBDBD' }}>
              <h3>Small Groups</h3>
              <p>FIND YOUR COMMUNITY</p>
              <Button>Learn More</Button>
            </Card>
          </div>

          <SmallBanner>
            <h1>We're here for you</h1>
            <p>Turpis egestas maecenas pharetra convallis posuere morbi leo. Semper auctor neque vitae tempus. Praesent tristique magna sit amet purus gravida.</p>
            <Button>Request Prayer</Button>
          </SmallBanner>

        </LayoutV1>

      </main>

    </div>
  )
}
