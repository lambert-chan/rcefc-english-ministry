import React from 'react'
import Head from 'next/head'

import LayoutV1 from '../../../templates/layout_v1/layout'


const SuccessfulForm = () => (
    <div>
        <Head>
            <title>Form Submission</title>
            <link rel='icon' href='/favicon.ico' />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue" />
        </Head>
        <main>
            <LayoutV1>
                <div style={{display: 'flex', justifyContent: 'center', padding: '3em', height: '100vh'}}>
                    <h1>Success! Thanks for filling the form, we look forward to seeing you soon!</h1>
                </div>
            </LayoutV1>
        </main>
    </div>
)

export default SuccessfulForm