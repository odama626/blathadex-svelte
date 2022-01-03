import { prisma } from '../../_utils';

export async function post({ locals, url, body }) {
	if (!locals.account) return { status: 401 };
	const { email } = locals.account;
	const { key, type } = Object.fromEntries(url.searchParams.entries());

	const account = await prisma.account.findUnique({ where: { email } });
	let curData;
	let newData;
	try {
		curData = JSON.parse(account[key]);
	} catch (e) {}

	if (type === 'set') {
		newData = Object.entries({
			...Object.fromEntries((curData || []).map((i) => [i, true])),
			...body
		})
			.filter(([_, keep]) => keep)
			.map(([item]) => item);
	} else if (type === 'object') {
		newData = { ...(curData || {}), ...body };
	}

	if (newData) {
		await prisma.account
			.update({
				where: { email },
				data: { [key]: newData }
			})
			.catch();
	}
	return { status: 200 };
}

export async function get({ locals, url, body }) {
	if (!locals.account) return { status: 401 };
	const { email } = locals.account;
	const { key, type } = Object.fromEntries(url.searchParams.entries());
	const account = await prisma.account.findUnique({ where: { email } });

	try {
		const data = account[key];
		let body = data;
		if (type === 'set') body = Object.fromEntries(data.map((key) => [key, true]));
		return {
			status: 200,
			body
		};
	} catch (e) {
		console.error(e);
	}
	return { status: 400 };
}
