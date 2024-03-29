import React from 'react'

import bannerStyles from '../styles/banner.module.css'

export class Card extends React.Component {
    render() {
        return (
            <div className={bannerStyles.card}>
                <div className={bannerStyles.card_content}>
                    {this.props.children}
                </div>
            </div>

        )
    }
}