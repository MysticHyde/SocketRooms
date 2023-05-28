require('dotenv').config();
const pool = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    pool.promise().query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
        .then(([rows, fields]) => {
            if (rows[0] && rows[0] != undefined) {
                res.status(400).json({ message: "Utilisateur existe déjà" })
            } else {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        pool.promise().query('INSERT INTO `users` (`username`, `password`) VALUES (?,?)',
                            [
                                req.body.username,
                                hash
                            ])
                    })
                    .then(() => {
                        res.status(201).json({ message: "Utilisateur créé" })
                    })
                    .catch(error => { res.status(500).json({ error }) })
            }
        })
        .catch(error => {
            res.status(500).json({ error })
        })
}

exports.login = (req, res, next) => {
    pool.promise().query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
        .then(([rows, fields]) => {
            if (rows[0] == undefined) {
                res.status(401).json({ message: "Nom d'utilisateur et/ou mot de passe incorrect" })
                return;
            }
            bcrypt.compare(req.body.password, rows[0].password)
            .then(valid => {
                if (!valid) {
                        res.status(401).json({ message: "Nom d'utilisateur et/ou mot de passe incorrect" })
                        return;
                    }
                    res.status(200).json({
                        userId: rows[0].id,
                        username: rows[0].username,
                        token: jwt.sign(
                            {userId: rows[0].id},
                            process.env.JWTTOKEN,
                            { expiresIn: '24h'}

                        ),
                        message: "Connexion réussie"
                     }) 
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => {
            res.status(500).json({ error })
        })
}