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

const GetSubMenuItems = (data, parent) => {
    let id = parent?.id
    return data.map(item => {
        if (item?.parentId == id) {
            let slug = item?.path.split('/')
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

const NavMenu = ({ className }) => {
    // Query for nav menu from Apollo, this is where you pass in your GraphQL variables
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
                <SubMenu title={menuItem?.label} key={menuItem?.id}>
                    {GetSubMenuItems(data?.menuItems?.nodes, menuItem)}
                </SubMenu>)}
        </Menu>
    )
}

export default NavMenu