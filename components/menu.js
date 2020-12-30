import { Menu } from 'antd'
import Link from 'next/link';

const RCEFCMenu = () => {
    return (
        <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
                <Link href="/about/">About</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link href="/worship-sessions/">Worship Sessions</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link href="/contacts/">Contacts</Link>
            </Menu.Item>
        </Menu>
    )
};

export default RCEFCMenu