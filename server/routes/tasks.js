var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


// const url = 'mongodb://amazing_mongo';
const url = process.env.DBURL ? process.env.DBURL : 'mongodb://localhost:32771';
// Database Name
const dbName = 'amazing';
// Create a new MongoClient
const client = new MongoClient(url);
let db;

const connectToMongo = () => {
    client.connect(function (err) {
        if (err) {
            console.error(err);
            setTimeout(connectToMongo, 5000);
        } else {
            console.log('Connected successfully to data server');
            db = client.db(dbName);
        }
    });
}

connectToMongo();


/* GET listing. */
router.get('/', async function (req, res, next) {
    const dateToFind = new Date().toISOString().split('T')[0];

    const docs = await findDocuments(dateToFind);
    res.json(docs);
});

router.get('/:date', async function (req, res, next) {
    const docs = await findDocuments(req.params.date);
    res.json(docs);
});

//UPDATE
router.post('/:id', async function (req, res, next) {
    const record = req.body;
    console.log(req.params.id, req.body);

    const docs = await updateDocument(req.params.id, record);
    res.json(docs);
});

router.delete('/:id', async function (req, res, next) {
    const docs = await deleteRecord(req.params.id);
    res.json(docs);
});



//CREATE
router.post('/', async function (req, res, next) {
    // try {
    const record = req.body;

    const newRecord = {
        name: record.name ? record.name : '',
        running: record.running ? record.running : false,
        timespent: record.timespent ? record.timespent : 0,
        date: record.date ? record.date : new Date().toISOString().split('T')[0],
        time: record.time ? record.time : '0:00:00',
        lastStartCount: record.lastStartCount ? record.lastStartCount : 0,
        startTime: record.startTime ? record.startTime : 0,
    }

    const docs = await insertRecords(newRecord);
    console.log('NEW:', docs.ops[0]);
    res.json(docs.ops[0]);
    // } catch (error) {
    //     res.sendStatus(500);
    //     res.send(JSON.stringify(error));
    //     res.end();
    // }
});


async function insertRecords(record) {
    const collection = db.collection('documents');
    return await collection.insertOne(record);
}

async function deleteRecord(recordId) {
    const collection = db.collection('documents');
    return await collection.deleteOne({ _id: new ObjectID(recordId) });
}


const findDocuments = async function (dateToFind) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    return await collection.find({ "date": dateToFind }).toArray();
}

const updateDocument = async function (id, record) {
    const collection = db.collection('documents');

    return await collection.updateOne({ _id: ObjectID(id) }, { $set: record })
}
module.exports = router;
