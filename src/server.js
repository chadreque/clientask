const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    username: 'root',
    password: 'root',
    database: 'clientask'
});

db.connect(err => {
    if (err) {
        console.error('Connection is not established with database  ', err);
    } else {
        console.log('Connected to database clientask')
    }
});

app.listen(port, () => {
    console.log('server port established on 3000')
});



//Client CRUD
//Insert client into db
app.post('/clients/add', (req, res) => {
    const { name, email, address, password } = req.body;
    const sql = 'insert into client values(null, ?, ?, ?, ?)';

    db.query(sql, [name, email, address, password], (err, result) => {
        if (err) {
            console.error('Error in adding the client', err);
            res.status(500).json(
                {
                    statusCode: res.statusCode,
                    message: 'An error occured'
                }
            );
        } else {
            res.status(200).json(
                {
                    statusCode: res.statusCode,
                    message: 'Client added successfully'
                }
            );
        }

    })
});

//Get all the clients
app.get('/clients', (req, res) => {
    const sql = 'select * from client';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error in fetching the clients', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            console.log('clients', result);
            res.status(200).json(result);
        }
    })
})

//Update client
app.put('/clients/update', (req, res) => {
    const { id, name, email, address, password } = req.body;
    const sql = 'update client set name = ?, email = ?, address = ?, password = ? where id = ?';
    db.query(sql, [name, email, address, password, id], (err, result) => {
        if (err) {
            console.error('Error in updating the client', err);
            res.status(500).json({ error: 'An error occured' });
        } else {
            res.status(200).json({ message: 'Client updated successfully' });
        }
    });
});

//deletec client by id
app.delete('/clients/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'delete from client where id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error in deleting the client', err);
            res.status(500).json({ error: 'An error occured' });
        } else {
            res.status(200).json({ message: 'Client deleted successfully' });
        }
    });
});



//Meeting CRUD
//Insert meeting into db
app.post('/meetings/add', (req, res) => {
    const {meeting_type, num_participant, start_date} = req.body;
    const sql = 'insert into meeting values(null, ?, ?, ?)';

    db.query(sql, [meeting_type, num_participant, start_date], (err, result) => {
        if (err) {
            console.error('Error in adding the meeting', err);
            res.status(500).json(
                {
                    statusCode: res.statusCode,
                    message: 'An error occured'
                }
            );
        } else {
            res.status(200).json(
                {
                    statusCode: res.statusCode,
                    message: 'Meeting added successfully'
                }
            );
        }

    })
});

//Get all the meetings
app.get('/meetings', (req, res) => {
    const sql = 'select * from meeting';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error in fetching the clients', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            console.log('clients', result);
            res.status(200).json(result);
        }
    })
})

//Update meeting
app.put('/meetings/update', (req, res) => {
    console.log('updating... req: ', req);
    const {id, meeting_type, num_participant, start_date} = req.body;
    const sql = 'update meeting set meeting_type = ?, num_participant = ?, start_date = ? where id = ?';
    db.query(sql, [meeting_type, num_participant, start_date, id], (err, result) => {
        if (err) {
            console.error('Error in updating the client', err);
            res.status(500).json({ error: 'An error occured' });
        } else {
            res.status(200).json({ message: 'Meeting updated successfully' });
        }
    });
});

//deletec meeting by id
app.delete('/meetings/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'delete from meeting where id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error in deleting the client', err);
            res.status(500).json({ error: 'An error occured' });
        } else {
            res.status(200).json({ message: `Meeting with id ${id} deleted successfully` });
        }
    });
});

