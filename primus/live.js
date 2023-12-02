module.exports.go = (server) => {
    const Primus = require("primus");
    const primus = new Primus(server, {
        transformer: "websockets",
    });

    // check if connection, then console.log
    primus.on('connection', (spark) => {
        console.log('connected ༼ つ ◕_◕ ༽つ');

        // check if data, then console.log
        spark.on('data', (data) => {
            console.log("data (❁´◡`❁)", data);

            // send data back to all clients
            primus.write(data); // all
            // spark.write(data); // one
        });
    });
}