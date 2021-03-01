import React from 'react'
import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu';
import Link from 'next/link';
import headerStyles from '../styles/header.module.css'
import { useQuery, gql } from '@apollo/client'

const NAV_MENU_DATA = gql`
query menuItems {
    menuItems(where: {location: PRIMARY}, first: 25) {
      nodes {
        url
        label
        parentId
        id
        path
      }
    }
  }
`
/** Apollo version of menu helper */
const GetSubMenuItems = (data, parent) => {
    let id = parent?.id
    return data.map(item => {
        if (item?.parentId == id) {
            let slug = item?.path.split('/')
            //Hash for join us slides
            let hash = slug > 2 ? item?.path : `/${slug[1]}#${slug[2]}`
            if (parent?.label == 'Join Us') {
                hash = item?.path
            }
            return (
                <Menu.Item key={item?.id}>
                    <Link href={hash}>{item?.label}</Link>
                </Menu.Item>)
        }
    })
}

/** Apollo version of menu */
const NavMenu = ({ className }) => {
    // Query for nav menu from Apollo
    const { loading, error, data } = useQuery(NAV_MENU_DATA)

    if (loading) return '';
    if (error) return `Error! ${error}`;

    let primaryMenuItems

    if (data) {
        primaryMenuItems = data?.menuItems?.nodes.filter(node => !node?.parentId)
    }

    return (
        <Menu className={headerStyles.main_menu + " " + className} mode="horizontal" triggerSubMenuAction='click'>
            {primaryMenuItems.map(menuItem =>
                <SubMenu title={menuItem?.label} key={menuItem?.id} name={menuItem?.label}>
                    {GetSubMenuItems(data?.menuItems?.nodes, menuItem)}
                </SubMenu>)}
        </Menu>
    )
}

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