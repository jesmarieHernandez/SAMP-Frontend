import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import renderedPageRouter from './renderedPageRouter.jsx';
import {ObjectId} from "bson";


const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());
console.log('express');
let db;

app.use(session({secret: 'h7e3f5s6', resave: false, saveUninitialized: true}));

app.all('/api/*', (req, res, next) => {
    if (req.method === 'DELETE' || req.method === 'POST' || req.method === 'PUT') {
        if (!req.session || !req.session.user) {
            console.log('/api/*');
            //res.status(403).send({
            //    message: 'You are not authorized to perform the operation'
            //});
            next();
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});

app.get('/api/users/me', (req, res) => {
    console.log('/api/users/me');
    if (req.session && req.session.user) {
        res.json(req.session.user);
    } else {
        res.json({signedIn: false, name: ''});
    }
});

app.post('/api/request', (req, res) => {
    console.log('/api/activities');
    console.log('request body:' + req.body);
    const newActivity = req.body;
    //newActivity.requestDate = new Date();

    console.log('db: ' + db);
    db.collection('activities').insertOne(newActivity)
        .then(result => {
            console.log(result);
            db.collection('activities').find({_id: result.insertedId}).limit(1)
                .next().then(activity => {
                console.log(activity);
                res.status(200).json(activity);
            })
        }).catch(error => {
            console.log('ERROR: ' + error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});

app.get('/api/activities/', (req, res) => {
    db.collection('activities').find().toArray()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});

app.get('/api/activities/:id', (req, res) => {
    let requestID;
    try {
        requestID = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({message: `Invalid request ID format: ${error}`});
        return;
    }

    db.collection('activities').find({_id: requestID}).limit(1)
    .next()
    .then(result => {
        console.log(result);
        if (!result) res.status(404).json({message: `No such request: ${requestID}`});
        else {
            res.json(result)
        }
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});


app.use('/', renderedPageRouter);

function setDb(newDb) {
    console.log('DB has been set');
    db = newDb;
}

export {app, setDb};

