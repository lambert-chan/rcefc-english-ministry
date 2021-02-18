import React from 'react'
import LayoutV1 from './layout_v1/layout'

class Blank extends React.Component {
    render() {
        return (
            <React.Fragment>
                <LayoutV1>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '3em', height: '100vh' }}>
                        <h1>Sorry, but there's nothing here to share with you.</h1>
                    </div>
                </LayoutV1>
            </React.Fragment>
        )
    }
}

export default Blank