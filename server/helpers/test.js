import fs from 'fs';
import path from 'path';
import pool from './db.js';
import jwt from 'jsonwebtoken';
import {hash} from 'bcrypt';

const __dirname = import.meta.dirname;

// Initialize the test database with SQL file
const initializeTestDb = async () => {
    const sqlFilePath = path.join(__dirname, '../todo.sql');
    console.log('SQL file path: ',sqlFilePath);

    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    await pool.query(sql);
}

// Insert a test user with hashed password
const insertTestUser = async (email, password) => {
        return new Promise((resolve, reject) => {
            hash(password,10,(error, hashedPassword) => {
            if(error) return reject(error);
            pool.query('INSERT INTO account (email, password) VALUES ($1, $2)', [email, hashedPassword], (err) => {
                if(err) return reject(err);
                resolve();
            });
        });
    });
};

// Generate JWT token for a user
const getToken = (email) => {
    return jwt.sign({user: email}, process.env.JWT_SECRET_KEY)
}

export { initializeTestDb, insertTestUser, getToken }