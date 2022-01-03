import Prisma from '@prisma/client';
import { parse, serialize } from 'cookie';
import jwt from 'jsonwebtoken';

const prisma = new Prisma.PrismaClient();
const TOKEN_SECRET = import.meta.env.VITE_TOKEN_SECRET;


export async function getSession(request) {
	if (request.locals.account) {
		return { account: request.locals.account, freshLogin: request?.locals?.freshLogin };
	}
	return {};
}

async function authenticate(magic) {
	jwt.verify(magic, TOKEN_SECRET);

	const account = await prisma.account.findUnique({ where: { magicLink: magic } });

	return await jwt.sign({ email: account.email }, TOKEN_SECRET);
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
	const cookies = parse(request.headers.cookie || '');
	const magic = request.url.searchParams.get('magic');
	let setCookie;

	if (magic) {
		try {
			const token = await authenticate(magic);
			cookies['session_id'] = token;
			request.locals.freshLogin = true;
			setCookie = serialize('session_id', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 14 // one week
			});
			console.log('set cookie', {
				secure: process.env.NODE_ENV === 'production'
			});
		} catch (e) {
			console.error(e);
		}
	}

	try {
		const cookie = cookies['session_id'];
		jwt.verify(cookie, TOKEN_SECRET);
		request.locals.account = jwt.decode(cookie);
	} catch (e) {}

	const response = await resolve(request);

	if (setCookie) {
		console.log('Set cookie');
		response.headers = response.headers || {};
		response.headers['Set-Cookie'] = setCookie;
	}

	return response;
}
