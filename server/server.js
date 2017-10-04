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

app.post('/api/requests', (req, res) => {
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

app.post('/api/users', (req, res) => {
    console.log('/api/users');
    console.log('request body:' + req.body);
    const newUser = req.body;
    //newActivity.requestDate = new Date();

    console.log('db: ' + db);
    db.collection('users').insertOne(newUser)
        .then(result => {
            console.log(result);
            db.collection('users').find({_id: result.insertedId}).limit(1)
                .next().then(user => {
                console.log(user);
                res.status(200).json(user);
            })
        }).catch(error => {
        console.log('ERROR: ' + error);
        res.status(500).jsoapp.get('/api/facilities/', (req, res) => {
    db.collection('facilities').find().toArray()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});n({message: `Internal Server Error: ${error}`});
    });
});

app.post('/api/facilities', (req, res) => {
    console.log('/api/facilities');
    console.log('request body:' + req.body);
    const newFacilities = req.body;
    //newActivity.requestDate = new Date();

    console.log('db: ' + db);
    db.collection('facilities').insertOne(newFacilities)
        .then(result => {
            console.log(result);
            db.collection('facilities').find({_id: result.insertedId}).limit(1)
                .next().then(facilities => {
                console.log(facilities);
                res.status(200).json(facilities);
            })
        }).catch(error => {
        console.log('ERROR: ' + error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});

app.post('/api/organizations', (req, res) => {
    console.log('/api/organizations');
    console.log('request body:' + req.body);
    const newOrganization = req.body;
    //newActivity.requestDate = new Date();

    console.log('db: ' + db);
    db.collection('organizations').insertOne(newOrganization)
        .then(result => {
            console.log(result);
            db.collection('organizations').find({_id: result.insertedId}).limit(1)
                .next().then(organization => {
                console.log(organization);
                res.status(200).json(organization);
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

app.get('/api/organizations/', (req, res) => {
    db.collection('organizations').find().toArray()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});

app.get('/api/facilities/', (req, res) => {
    db.collection('facilities').find().toArray()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});

app.get('/api/users/', (req, res) => {
    db.collection('users').find().toArray()
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

app.get('/api/facilities/:id', (req, res) => {
    let facilitiesID;
    try {
        facilitiesID = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({message: `Invalid facilities ID format: ${error}`});
        return;
    }

    db.collection('facilities').find({_id: facilitiesID}).limit(1)
        .next()
        .then(result => {
            console.log(result);
            if (!result) res.status(404).json({message: `No such request: ${facilitiesID}`});
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

