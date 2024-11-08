import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const PORT = 3001;
const { Pool } = pkg;

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON data parsing
app.use(express.urlencoded({ extended: false })); // Enable URL-encoded data parsing

const openDb = () => {
    const pool = new Pool ({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: '7ygv7ujm',
        port: 5432
    })
    return pool
}

app.listen(PORT)

app.get('/',(req,res) => {
    const pool = openDb()

    pool.query('select * from task',(error, result) => {
        if(error){
            return res.status(500).json({error: error.message})
        }
        return res.status(200).json(result.rows)
    })
    //res.status(200).json({result: "Success"})
})

app.post('/create',(req,res) => {
    const pool = openDb()

    pool.query('insert into task (description) values ($1) returning *',
        [req.body.description],
        (error, result) => {
            if(error){
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({id: result.rows[0].id})
        }
    )
})

app.delete('/delete/:id',(req,res) => {
    const pool = openDb()
    const id = parseInt(req.params.id)
    pool.query('delete from task where id = $1',
        [id],
        (error,result) => {
            if(error){
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({id: id})
        }
    )
})


/*
// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Todo backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
*/
