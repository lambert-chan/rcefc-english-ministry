import React from 'react'
import bannerStyles from '../styles/banner.module.css'

export class LargeBanner extends React.Component {
    render() {
        return (
            <div className={bannerStyles.large_banner + ` ${this.props.className}`} name={this.props.name} id={this.props.id}>
                <div className={bannerStyles.banner_content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export class SmallBanner extends React.Component {
    render() {
        return (
            <div className={bannerStyles.small_banner}>
                <div className={bannerStyles.banner_content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}