// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false
};


export const database = {

	firebaseAppConfig: {
		apiKey: "AIzaSyDbmFGvZ6mImguM855TORlsk-J9aHmWYi0",
		authDomain: "jam-station.firebaseapp.com",
		databaseURL: "https://jam-station.firebaseio.com",
		projectId: "jam-station",
		storageBucket: "jam-station.appspot.com",
		messagingSenderId: "921915420874"
	},

	config: {
		metadataPath: '/App/jam-salon/Metadata/database'
	}

}

export const storeDevtoolsConfig = {
	name: 'Jam Salon',
	maxAge: 25,
	logOnly: true,
	// serialize: true
};

export const app = {
	name: 'jam-salon',
	title: 'Jam Salon'
}

export const notificationConfig = {
	defaultMessage: {
		content: 'Done',
		action: 'Ok',
		duration: 3000,
	},
	horizontalPosition: "center",
	verticalPosition: "bottom"
}

export const googleMapsConfig = {
	// apiKey: 'AIzaSyAQkT72FQk_t7cdu4i49eGb-oEpcKFs9Tg'
	apiKey: 'AIzaSyC02DORKKsWDAE5C1X7f7zxYsduLDhBklg'
}
