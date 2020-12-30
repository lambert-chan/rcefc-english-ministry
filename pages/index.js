import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'antd'
import LayoutV1 from '../templates/layout_v1/layout'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>RCEFC English Ministries</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue"/>
      </Head>

      <main>
        <LayoutV1>
          <div className={styles.home}>
            <p>
              All of the articles can be found here <br />
              <Link href="/post/">
                <Button type="primary">Website Posts Page</Button>
              </Link>
            </p>
          </div>
        </LayoutV1>

      </main>

    </div>
  )
}
