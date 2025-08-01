import fs from 'fs'
import path from 'path'
import sqlite3 from 'sqlite3'
import { createTables } from './utils'

sqlite3.verbose()

class SQLiteDatabase {
    constructor(filePath) {
        this.dbPath = filePath
        this.db = null
    }

    async initialize() {
        // Ensure data directory exists
        const dataDir = path.dirname(this.dbPath)
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }

        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Error opening database:', err)
                    reject(err)
                } else {
                    console.log('Connected to SQLite database')
                    createTables(this.db).then(resolve).catch(reject)
                }
            })
        })
    }

    // Generic query methods
    async run(sql, params = {}) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) reject(err)
                else resolve({ id: this.lastID, changes: this.changes })
            })
        })
    }

    async get(sql, params = {}) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    async all(sql, params = {}) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, results) => {
                if (err) reject(err)
                else resolve(results)
            })
        })
    }

    async close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    }
}

export default SQLiteDatabase
