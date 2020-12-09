const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.use(
    express.urlencoded({
      extended: true
    })
  )

app.use(express.json())

const USERS = {}

app.post('/api/signup', (req, res) => {
    console.log('Handling signup', req.body)
    if(req.body.password !== req.body.confirmPassword) {
        res.json({
            message: "Passwords do not match"
        })
    }else {
        const user = {
            id: 1,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        USERS[user.username] = user

        res.sendStatus(200);
    }
   
    
    
})

app.post('/api/login', (req, res) => {
    console.log('Handling new signin')
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    db_user = USERS[req.body.username];
    if(db_user) {
        if(db_user.password === user.password){
            jwt.sign({user:user}, 'secretkey', (err, token) => {
                res.json({
                    token,
                })
            })
        }else {
            res.json({
                message: "Incorrect password"
            })
        }        
    }else{
        res.json({
            message: "User does not exist"
        })
    }
    
    
})

app.listen(8080, (req, res) => {
    console.log('server started on port 8080')
})