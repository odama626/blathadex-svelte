import {
	generateAuthenticationParams,
	getSessionToken,
	getWebServiceTokenWithSessionToken,
	NINTENDO_CLIENT_ID
} from './_utils';

// TODO: continue implementing AC api https://dev.to/mathewthe2/intro-to-nintendo-switch-rest-api-2cm7

export async function post(args) {
	const accountLink = args.body.get('account_link');
	const verifier = args.body.get('verifier');
	const params = new URLSearchParams(accountLink.split(`://auth#`)[1]);

	const sessionToken = await getSessionToken({
		client_id: NINTENDO_CLIENT_ID,
		session_token_code: params.get('session_token_code'),
		session_token_code_verifier: verifier
	});
	const webServiceToken = await getWebServiceTokenWithSessionToken(sessionToken, 'S2');

	console.log({ sessionToken, webServiceToken });

	return {
		// TODO: set cookie here for session token and webservice token
		// TODO: if webservice token is expired but session token is not, then revalidate
	};
}

export async function get(args) {
	const { verifier, challenge, state } = generateAuthenticationParams();

	const url = new URL('https://accounts.nintendo.com/connect/1.0.0/authorize');
	const p = url.searchParams;
	p.set('state', state);
	p.set('redirect_uri', 'npf71b963c1b7b6d119://auth');
	p.set('client_id', '71b963c1b7b6d119');
	p.set('scope', 'openid user user.birthday user.mii user.screenName');
	p.set('response_type', 'session_token_code');
	p.set('session_token_code_challenge', challenge);
	p.set('session_token_code_challenge_method', 'S256');
	p.set('theme', 'login_form');

	return {
		headers: {},
		body: {
			url: url.toString(),
			verifier
		}
	};
}
