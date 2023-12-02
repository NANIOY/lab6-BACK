module.exports.go = (server) => {
    const Primus = require("primus");
    const primus = new Primus(server, {
        /* options */
    });

    const scores = {
        'Astralis': 0,
        'NiP': 0,
        'NAVI': 0,
    };

    primus.on('connection', (spark) => {
        console.log('Client connected');

        // emit the current scores to the new client
        spark.write({ type: 'scores', data: scores });

        spark.on('data', (message) => {
            // handle different types of messages from the client
            switch (message.type) {
                case 'updateScore':
                    // update the score in the backend
                    scores[message.data.team] += message.data.score;

                    // Emit the updated scores to all connected clients
                    primus.write({ type: 'scores', data: scores });
                    break;
            }
        });

        spark.on('end', () => {
            console.log('Client disconnected');
        });
    });
};
