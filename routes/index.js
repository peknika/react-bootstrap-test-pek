import express from 'express';
import path from 'path';

import pool from '../db/db';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

router.get('/api/tasks', (req, res, next) => {
  pool.query(`SELECT * FROM todos 
              ORDER BY date_created DESC`,
  (qErr, qRes) => {
    res.json(qRes.rows);
  });
});

router.post('/api/tasks/add/', (req, res, next) => {
  const values = [
    req.body.task.text,
    req.body.task.userId
  ];
  pool.query(`INSERT INTO todos(content, user_id, date_created)
              VALUES($1, $2, NOW()) RETURNING *`,
  values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    res.json(q_res.rows);
  });
});

router.post('/api/tasks/update/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const { state } = req.body;
  pool.query('UPDATE todos SET state = $2 WHERE id = $1 RETURNING *', [id, state],
    (q_err, q_res) => {
      res.json(q_res.rows);
      console.log(q_err);
    });
});


router.delete('/api/tasks/delete/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM todos WHERE id = $1', [id],
    (qErr, qRes) => {
      res.json(qRes);
    });
});

router.get('/api/notes', (req, res) => {
  pool.query(`SELECT * FROM notes 
              ORDER BY date_created DESC`,
  (qErr, qRes) => {
    res.json(qRes.rows);
    console.log(qErr);
  });
});

router.post('/api/notes/add/', (req, res, next) => {
  const values = [
    req.body.text,
    req.body.userId
  ];
  pool.query(`INSERT INTO notes(body, user_id, date_created)
              VALUES($1, $2, NOW()) RETURNING *`,
  values,
  (qErr, qRes) => {
    res.json(qRes.rows);
    console.log(qErr);
  });
});

router.delete('/api/notes/delete/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query(`DELETE FROM notes
              WHERE id = $1`, [id],
  (qErr, qRes) => {
    res.json(qRes);
    console.log(qErr);
  });
});

router.post('/api/notes/update/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const body = req.body.text;
  pool.query(`UPDATE notes SET body = $2 
              WHERE id = $1 RETURNING *`, [id, body],
  (qErr, qRes) => {
    res.json(qRes.rows);
    console.log(qErr);
  });
});

export default router;
