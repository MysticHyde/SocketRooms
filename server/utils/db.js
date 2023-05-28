require('dotenv').config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  idleTimeout: 60000, // délai d'inactivité des connexions, en millisecondes, la valeur par défaut 60000 
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

pool.getConnection((err) => {
  if (err) {
      console.log(err);
  }
  else {
      console.log("Database connexion success");
  }
})

module.exports = pool;