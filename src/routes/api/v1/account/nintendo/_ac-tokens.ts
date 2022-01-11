import request2 from 'request-promise-native';
const userAgentVersion = import.meta.env.VITE_NINTENDO_USER_AGENT;


const ACUrl = 'https://web.sd.lp1.acbaa.srv.nintendo.net';
let ACBearerToken;
const ACHeaders = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Encoding': 'gzip,deflate',
    'Content-Type': 'application/json; charset=utf-8',
    'User-Agent': userAgentString,
    'x-isappanalyticsoptedin': false,
    'X-Requested-With': 'com.nintendo.znca',
    'DNT': '0',
    Connection: 'keep-alive'
}

async function getCookiesForAnimalCrossing(accessToken) {
    const resp = await request({
        method: 'GET',
        uri: ACUrl,
        headers: Object.assign(ACHeaders, {'X-GameWebToken': accessToken}),
    });
    const animalCrossingTokens = await getAnimalCrossingTokens();
    return animalCrossingTokens;
}

async function getAnimalCrossingTokens() {
    const gToken = getCookie('_gtoken', ACUrl)
    if (gToken == null) {
        throw new Error('Could not get _gtoken for Animal Crossing');
    }
    jar.setCookie(request2.cookie(`_gtoken=${gToken}`), ACUrl);
    const userResp = await request({
        method: 'GET',
        uri: `${ACUrl}/api/sd/v1/users`,
        headers: ACHeaders,
        json: true
      });
      if (userResp !== null) {
        const userResp2 = await request({
            method: 'POST',
            uri: `${ACUrl}/api/sd/v1/auth_token`,
            headers: ACHeaders,
            form: {
                userId: userResp['users'][0]['id']
            },
            json: true
          });
          const bearer = userResp2;
          const parkSession = getCookie('_park_session', ACUrl);
          if (parkSession == null) {
              throw new Error('Could not get _park_session for Animal Crossing');
          }
          if (bearer == null || !bearer['token']) {
            throw new Error('Could not get bearer for Animal Crossing');
          }
         ACBearerToken = bearer['token']; // Used for Authorization Bearer in Header
         return {
             ac_g: gToken,
             ac_p: parkSession
         }
      }
}