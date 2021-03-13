import React from 'react'
import bannerStyles from '../styles/banner.module.css'

export class LargeBanner extends React.Component {
    render() {
        return (
            <div className={bannerStyles.large_banner + ` ${this.props.className}`} id={this.props.id}>
                <div className={bannerStyles.banner_content_container}>
                    <div className={bannerStyles.banner_content}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export class SmallBanner extends React.Component {
    render() {
        return (
            <div className={bannerStyles.small_banner + ` ${this.props.className}`} id={this.props.id}>
                <div className={bannerStyles.banner_content_container}>
                    <div className={bannerStyles.banner_content}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export class PageBanner extends React.Component {
    render() {
        return (
            <div className={bannerStyles.page_banner + ` ${this.props.className}`} id={this.props.id}>
                <div className={bannerStyles.banner_content_container}>
                    <div className={bannerStyles.banner_content}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export class TitleBanner extends React.Component {
    render() {
        return (
            <div className={bannerStyles.title_banner + ` ${this.props.className}`} id={this.props.id}>
                <div className={bannerStyles.banner_content_container}>
                    <div className={bannerStyles.banner_content}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}