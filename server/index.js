import SourceMapSupport from 'source-map-support';

SourceMapSupport.install();
import 'babel-polyfill';
import http from 'http';

import { MongoClient } from 'mongodb';

let appModule = require('./server.js');
let db;
let server;

MongoClient.connect('mongodb://localhost/SAMP').then(connection => {
    db = connection;
    console.log('db: ' + db);

    const newActivity = {
        requestTitle: 'Bedrock Boy Scouts Fundraising-' + Date.now(),
        organizationName: 'The Flintstones',
        requestDate: Date.now(),
        facilities: 'Bedrock Convention Center'
    };

    // db.collection('activities').insertOne(newActivity).then(result =>
    //
    //         console.log('result: ' + result)
    //     // db.collection('activities').find({_id: result.insertedId}).limit(1)
    //     //     .next()
    // )
    //     .then(savedIssue => {
    //         res.json(savedIssue);
    //     })
    //     .catch(error => {
    //         console.log('ERROR: ' + error);
    //         res.status(500).json({message: `Internal Server Error: ${error}`});
    //     });
    db.collection('activities').find().count().then((count) => {
        console.log('Activities retrieved: ' + count);
        // db.close();
    });
    db.collection('activities').find({status: 'pending'}).count().then((count) => {
        console.log('Total pending activities: ' + count);
        // db.close();
    });
    server = http.createServer();
    appModule.setDb(db);
    server.on('request', appModule.app);
    server.listen(3000, () => {
        console.log('App started on port 3000');
    });
}).catch(error => {
    console.log('ERROR', error);
});

if(module.hot) {
    module.hot.accept('./server.js', () => {
        server.removeListener('request', appModule.app);
        appModule = require('./server.js');
        appModule.setDb(db);
        server.on('request', appModule.app);
    });
}