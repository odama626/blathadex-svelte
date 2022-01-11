import crypto from 'crypto';
import base64url from 'base64url';
import request2 from 'request-promise-native';
import { v4 as uuidv4 } from 'uuid';

export const NINTENDO_CLIENT_ID = '71b963c1b7b6d119';
const userAgentVersion = import.meta.env.VITE_NINTENDO_USER_AGENT;

const jar = request2.jar();
const request = request2.defaults({ jar: jar });

export function generateRandom(length) {
	return base64url(crypto.randomBytes(length));
}

export function calculateChallenge(codeVerifier) {
	const hash = crypto.createHash('sha256');
	hash.update(codeVerifier);
	const codeChallenge = base64url(hash.digest());
	return codeChallenge;
}

export function generateAuthenticationParams() {
	const state = generateRandom(36);
	const verifier = generateRandom(32);
	const challenge = calculateChallenge(verifier);
	return {
		state,
		verifier,
		challenge
	};
}

export function toFormData(o) {
	return Object.entries(o)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');
}

export async function getSessionToken(body) {
	const formData = toFormData(body);

	const result = await fetch('https://accounts.nintendo.com/connect/1.0.0/api/session_token', {
		method: 'post',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-Platform': 'Android',
			'X-ProductVersion': userAgentVersion,
			'User-Agent': `OnlineLounge/${userAgentVersion} NASDKAPI Android`
		},
		body: formData
	}).then((r) => r.json());
	console.log({ result });
	return result.session_token;
}

export async function getWebServiceTokenWithSessionToken(sessionToken, game) {
	const apiTokens = await getApiToken(sessionToken); // I. Get API Token
	console.log({ apiTokens });
	const userInfo = await getUserInfo(apiTokens.access); // II. Get userInfo
	console.log({ userInfo });

	const guid = uuidv4();
	const timestamp = String(Math.floor(Date.now() / 1000));

  console.log({ guid, timestamp })

	const flapg_nso = await callFlapg(apiTokens.id, guid, timestamp, 'nso'); // III. Get F flag [NSO]
	console.log({ flapg_nso });
	const apiAccessToken = await getApiLogin(userInfo, flapg_nso); // IV. Get API Access Token
	console.log({ apiAccessToken });
	const flapg_app = await callFlapg(apiAccessToken, guid, timestamp, 'app'); // V. Get F flag [App]
	console.log({ flapg_app });
	const web_service_token = await getWebServiceToken(apiAccessToken, flapg_app, game); // VI. Get Web Service Token
	console.log({ web_service_token });
	return web_service_token;
}

const userAgentString = `com.nintendo.znca/${userAgentVersion} (Android/7.1.2)`;

async function getApiToken(session_token) {
	const resp = await request({
		method: 'POST',
		uri: 'https://accounts.nintendo.com/connect/1.0.0/api/token',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'X-Platform': 'Android',
			'X-ProductVersion': userAgentVersion,
			'User-Agent': userAgentString
		},
		json: {
			client_id: '71b963c1b7b6d119',
			grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer-session-token',
			session_token: session_token
		}
	});

	return {
		id: resp.id_token,
		access: resp.access_token
	};
}

async function getHash(idToken, timestamp) {
	const response = await request({
		method: 'POST',
		uri: 'https://elifessler.com/s2s/api/gen2',
		headers: {
			'User-Agent': import.meta.env.VITE_S2S_USER_AGENT // your unique id here
		},
		form: {
			naIdToken: idToken,
			timestamp: timestamp
		}
	});

	const responseObject = JSON.parse(response);
	return responseObject.hash;
}

async function callFlapg(idToken, guid, timestamp, login) {
	const hash = await getHash(idToken, timestamp);
	const response = await request({
		method: 'GET',
		uri: 'https://flapg.com/ika2/api/login?public',
		headers: {
      'User-Agent': "",
			'x-token': idToken,
			'x-time': timestamp,
			'x-guid': guid,
			'x-hash': hash,
			'x-ver': '3',
			'x-iid': login,
		}
	});
	const responseObject = JSON.parse(response);

	return responseObject.result;
}

async function getUserInfo(token) {
	const response = await request({
		method: 'GET',
		uri: 'https://api.accounts.nintendo.com/2.0.0/users/me',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'X-Platform': 'Android',
			'X-ProductVersion': userAgentVersion,
			'User-Agent': userAgentString,
			Authorization: `Bearer ${token}`
		},
		json: true
	});

	return {
		nickname: response.nickname,
		language: response.language,
		birthday: response.birthday,
		country: response.country
	};
}

async function getApiLogin(userinfo, flapg_nso) {
	const resp = await request({
		method: 'POST',
		uri: 'https://api-lp1.znc.srv.nintendo.net/v1/Account/Login',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'X-Platform': 'Android',
			'X-ProductVersion': userAgentVersion,
			'User-Agent': userAgentString,
			Authorization: 'Bearer'
		},
		body: {
			parameter: {
				language: userinfo.language,
				naCountry: userinfo.country,
				naBirthday: userinfo.birthday,
				f: flapg_nso.f,
				naIdToken: flapg_nso.p1,
				timestamp: flapg_nso.p2,
				requestId: flapg_nso.p3
			}
		},
		json: true,
		gzip: true
	});
  console.log({ resp })
	return resp.result.webApiServerCredential.accessToken;
}

async function getWebServiceToken(token, flapg_app, game) {
	let parameterId;
	if (game == 'S2') {
		parameterId = 5741031244955648; // SplatNet 2 ID
	} else if (game == 'AC') {
		parameterId = 4953919198265344; // Animal Crossing ID
	}
	const resp = await request({
		method: 'POST',
		uri: 'https://api-lp1.znc.srv.nintendo.net/v2/Game/GetWebServiceToken',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'X-Platform': 'Android',
			'X-ProductVersion': userAgentVersion,
			'User-Agent': userAgentString,
			Authorization: `Bearer ${token}`
		},
		json: {
			parameter: {
				id: parameterId,
				f: flapg_app.f,
				registrationToken: flapg_app.p1,
				timestamp: flapg_app.p2,
				requestId: flapg_app.p3
			}
		}
	});

	return {
		accessToken: resp.result.accessToken,
		expiresAt: Math.round(new Date().getTime()) + resp.result.expiresIn
	};
}
