import jwt from 'jsonwebtoken';
import { prisma } from '../../_utils';

const { VITE_TOKEN_SECRET, VITE_SENDGRID_KEY, VITE_EMAIL_URL, VITE_SENDGRID_TEMPLATE_MAGIC_LINK } =
	import.meta.env;

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
			personalizations: [
				{ to: [{ email }], dynamic_template_data: { url: magicLinkUrl.toString() } }
			],
			from: { email: 'accounts@blathadex.com', name: 'Blathadex Account' },
			subject: 'Blathadex Magic Link',
			template_id: VITE_SENDGRID_TEMPLATE_MAGIC_LINK,
		})
	}).then((r) => r.text());

	return {
		status: 302,
		headers: {
			location: `${url.origin}/account/login?sent=true&email=${email}`
		}
	};
}
