import sirv from 'sirv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = (module.exports = express())
	.use(cors())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});