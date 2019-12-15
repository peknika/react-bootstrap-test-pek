import express from 'express';
import path from 'path';

import pool from '../db/db';

const router = express.Router();

/* GET home page. */
router.get('/',  (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

router.get('/api/tasks', (req, res, next) => {
  pool.query(`SELECT * FROM todos 
              ORDER BY date_created DESC`,
  (qErr, qRes) => {
    res.json(qRes.rows);
  });
});

router.post('/api/tasks', (req, res, next) => {
  const values = [
    req.body.task.text,
    req.body.task.userId,
  ];
  pool.query(`INSERT INTO todos(content, user_id, date_created)
              VALUES($1, $2, NOW()) RETURNING *`,
    values, (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows)
    })
});

router.delete('/api/tasks/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query(`DELETE FROM todos WHERE id = $1`, [ id ],
    (q_err, q_res) => {
      res.json(q_res);
      console.log(q_err)
    })
});

router.get('/api/get/notes', (req, res) => {
  pool.query(`SELECT * FROM notes 
              ORDER BY date_created DESC`,
    (qErr, qRes) => {
      res.json(qRes.rows);
    });
});

router.post('/api/post/userprofiletodb', (req, res, next) => {
  const values = [req.body.profile.nickname,
    req.body.profile.email,
    req.body.profile.email_verified];
  pool.query(`INSERT INTO users(username, email, email_verified, date_created)
              VALUES($1, $2, $3, NOW())
              ON CONFLICT DO NOTHING`, values,
  (qErr, qRes) => {
    res.json(qRes.rows);
  });
} );

router.get('/api/get/userprofilefromdb', (req, res, next) => {
  const email = req.query.email;
  pool.query(`SELECT * FROM users
              WHERE email=$1`, [ email ],
  (qErr, qRes) => {
    res.json(qRes.rows);
  });
} );

export default router;
