import { getResponseHeaders } from '../utils';

module.exports.get_depto = async (event) => {
    try {
        const { Client } = require('pg')
        const client = new Client({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        })
        await client.connect()

        const res = await client.query('SELECT * from departamento where id_depto = $1', [event.pathParameters.id_depto])
        //console.log(res.rows[0].message) // Hello world!
        await client.end()
        return {
            statusCode: 200,
            headers: getResponseHeaders(),
            body: JSON.stringify(
                {
                    message: res.rows[0],
                    input: event,
                },
                null,
                2
            ),
        };
    } catch (error) {
        console.log("Error", error);
        return {
            statusCode: error.statusCode ? error.statusCode : 500,
            headers: getResponseHeaders(),
            body: JSON.stringify(
                {
                    error: error.name ? error.name : "Exception",
                    message: error.message ? error.message : "Unkown error"
                },
                null,
                2
            ),
        };
    }
};
