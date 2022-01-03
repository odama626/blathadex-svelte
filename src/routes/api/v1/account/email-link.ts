import jwt from 'jsonwebtoken';
import { prisma } from '../../_utils';

const { VITE_TOKEN_SECRET, VITE_SENDGRID_KEY, VITE_EMAIL_URL } = import.meta.env;

export async function get({ url }) {
	const email = url.searchParams.get('email');

	const magicLink = await jwt.sign({ email }, VITE_TOKEN_SECRET, { expiresIn: '15min' });

	await prisma.account.upsert({
		where: { email },
		create: { magicLink, email },
		update: { magicLink }
	});

	const magicLinkUrl = new URL(`/account/login`, url.origin);
	magicLinkUrl.searchParams.set('magic', magicLink);

	const result = await fetch(VITE_EMAIL_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${VITE_SENDGRID_KEY}` },
		body: JSON.stringify({
			personalizations: [{ to: [{ email }] }],
			from: { email: 'accounts@blathadex.com', name: 'Blathadex Account' },
			subject: 'Blathadex Magic Link',
			content: [
				{
					type: 'text/plain',
					value: `To log in to your blathadex account follow this link ${magicLinkUrl.toString()}`
				}
			]
		})
	}).then((r) => r.text());

	return {
		status: 302,
		headers: {
			location: url.origin + '/account/login?sent=true'
		}
	};
}
