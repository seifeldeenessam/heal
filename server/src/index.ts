import App from './models/app';

async function main() {
	await App.databaseConnect();
	App.serverConnect();
}

main();