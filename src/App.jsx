import React from 'react';
import { viewRoutes } from './routes';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

export default function App() {
	return <>{viewRoutes}</>;
}
