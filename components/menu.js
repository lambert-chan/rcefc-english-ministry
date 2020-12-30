import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu';
import Link from 'next/link';
import headerStyles from '../styles/header.module.css'


const RCEFCMenu = () => {
    return (
        <Menu className={headerStyles.main_menu} theme="light" mode="horizontal" triggerSubMenuAction='click'>

            <SubMenu title="Join us">
                <Menu.Item key='1'>
                    <Link href="/worship-sessions/">Sunday Service</Link>
                </Menu.Item>
                <Menu.Item key='1'>
                    <Link href="/worship-sessions/">Groups</Link>
                </Menu.Item>
                <Menu.Item key='1'>
                    <Link href="/worship-sessions/">Events</Link>
                </Menu.Item>
            </SubMenu>

            <SubMenu title="About">
                <Menu.Item key='1'>
                    <Link href="/about/">Values</Link>
                </Menu.Item>
                <Menu.Item key='2'>
                    <Link href="/about/">Statement of Faith</Link>
                </Menu.Item>
                <Menu.Item key='3'>
                    <Link href="/about/">Purpose Statement</Link>
                </Menu.Item>
                <Menu.Item key='4'>
                    <Link href="/about/">Pastoral Team</Link>
                </Menu.Item>
            </SubMenu>

            <SubMenu title="Contact Us">
                <Menu.Item key='1'>
                    <Link href="/contacts/">Address</Link>
                </Menu.Item>
                <Menu.Item key='2'>
                    <Link href="/contacts/">Contact Information</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
};

export default RCEFCMenu