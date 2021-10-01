import React from 'react'
import Head from 'next/head'

import LayoutV1 from '../../../../templates/layout_v1/layout'


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
                    <h1>
                        <p>Success! Thank you for registering.</p>
                        <p>Please arrive a few minutes early to sanitize your hands and find a seat, and remember to bring your mask.</p>
                        <p>We look forward to seeing you face to face at 9:30 am on Sunday! </p>
                    </h1>
                </div>
            </LayoutV1>
        </main>
    </div>
)

export default SuccessfulForm