const db =  require('../database/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const registration = (request, response) => {
    const { name,email, password } = request.body;
    bcrypt.hash(request.body.password,10, function(error, hash){
        if(error){
            response.status(400).send(error);
        }
        else{
            db.pool.query('INSERT INTO public.users ("name", email, "password") VALUES($1,$2,$3)', [ name,email,hash], (error, results) => {
                if (error) {
                  response.status(400).send(error);
                }
                else{
                  response.status(201).send(results)
                }
            });
        }
    });    
}

const login = (request, response) => {
    const{email, password} = request.body;
    db.pool.query('SELECT * FROM public.users WHERE email=$1',[email],(error, results) => {
        if (error){
            response.status(400).send(error);

        }
        else{
            //response.status(201).send(results.rows);
            const user = results.rows[0];
            bcrypt.compare(password, user['password'], function(err, res) {
                if(err){
                    response.status(400).send(error);
                }
                else{
                    var token = jwt.sign({userID:user['user_id'], email:user['email']}, 'minacleo', {
                        expiresIn:'2h'});
                        response.status(201).send(token);
                }
            });
        }
    })
}


module.exports = {
    registration,
    login
}

