

const getAppURL = () => {
//console.log('current URL 👉️', window.location.href);
//console.log('current Pathname 👉️', window.location.pathname);
//console.log(window.location.href.split(window.location.pathname)[0]);
	return window.location.href.split(window.location.pathname)[0];
}

export const VARIABLES = {
	APP_URL: getAppURL(),
	API_HOST: 'https://philightapps.dev',
	API_PORT: 3333,
	BASENAME: '/portfolio',
}