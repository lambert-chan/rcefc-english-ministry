import config from '../../pages/config'

export function load(callback) {
    gapi.client.load("sheets", "v4", () => {
        gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: config.spreadsheetId,
                range: "Sheet1!A2:T"
            })
            .then(
                response => {
                    const data = response.result.values;
                    const cars = data.map(car => ({
                        submission: car[0],
                        fname: car[1],
                        lname: car[2],
                        number: car[3],
                        email: car[4],
                        car_occupants: car[5],
                        outside_of_canada: car[6],
                        symptoms: car[7],
                        consider_health: car[8],
                        underlying_health: car[9]
                    })) || [];
                    callback({
                        cars
                    });
                },
                response => {
                    callback(false, response.result.error);
                }
            );
    });
}


export function write(data, callback) {
    gapi.client.sheets.spreadsheets.values
        .append({
            spreadsheetId: config.spreadsheetId,
            range: "Sheet1!A2:T",
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                majorDimension: 'ROWS',
                values: [
                    data
                ],
            },
        })
        .then(
            response => {
                callback(response)
            }
        );
}