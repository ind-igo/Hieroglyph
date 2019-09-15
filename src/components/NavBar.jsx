import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

export default function NavBar() {
	return (
		<Menu mode='horizontal' theme='dark'>
			<img src='' alt='hierogly.ph' />
			<Menu.Item key='search'>
				<Link to='/search'>Search</Link>
			</Menu.Item>
		</Menu>
	);
}
