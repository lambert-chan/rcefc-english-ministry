import React from 'react'
import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu';
import Link from 'next/link';
import headerStyles from '../styles/header.module.css'

/**
 * Hard Coded RCEFC Menu to bypass dynamic (but slower) loading of Apollo
 * @date 02/26/2021
 * @author Lambert Chan
 * @param {classname} classname pass the design on
 */
const RCEFCMenu = ({ className }) => {
    let menu_items = [
        {
            title: 'Join Us',
            slug: 'join-us',
            children: [
                {
                    title: 'Worship',
                    slug: 'worship'
                },
                {
                    title: 'Sermon Recording List',
                    slug: 'sermon-recording-list'
                },
                {
                    title: 'Children',
                    slug: 'children'
                },
                {
                    title: 'Awana',
                    slug: 'awana'
                },
                {
                    title: 'Crossroads Fellowship',
                    slug: 'crossroads-fellowship'
                },
                {
                    title: 'Young Adults',
                    slug: 'yads'
                },
                {
                    title: 'Adults Fellowship',
                    slug: 'adults'
                },
                {
                    title: 'Small Groups',
                    slug: 'small-groups'
                },
            ]
        },
        {
            title: 'About',
            slug: 'about',
            children: [
                {
                    title: 'History',
                    slug: 'history'
                },
                {
                    title: 'Our God Given Purpose',
                    slug: 'purpose-statement'
                },
                {
                    title: 'Vision Statement',
                    slug: 'vision'
                },
                {
                    title: 'Core Values',
                    slug: 'core-values'
                },
                {
                    title: 'Pastoral Team',
                    slug: 'pastoral-team'
                },
                {
                    title: 'Resources',
                    slug: 'resources'
                },
            ]
        },
        {
            title: 'Give',
            slug: 'give',
            children: [
                {
                    title: 'Online Offering',
                    slug: 'online'
                }
            ]
        },
        {
            title: 'Contact Us',
            slug: 'contacts',
            children: [
                {
                    title: 'Location',
                    slug: 'location'
                }
            ]
        }
    ]
    return (
        <Menu className={headerStyles.main_menu + " " + className} mode="horizontal" triggerSubMenuAction='click'>
            {
                menu_items.map(primary =>
                    <SubMenu key={primary.slug} title={primary.title}>
                        {primary.children.map(sub => 
                            <Menu.Item key={sub.slug}>
                                <Link href={`/${primary.slug}` + (primary.slug !== 'about' ? '/' : '#') + sub.slug}>
                                    {sub.title}
                                </Link>
                            </Menu.Item>
                        )}
                    </SubMenu>
                )
            }
        </Menu>
    )
}
export default RCEFCMenu