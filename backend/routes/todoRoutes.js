const express = require('express');
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const { ensureAuth } = require('../middleware/ensureAuth');

router.get('/', ensureAuth, getTodos);
router.post('/', ensureAuth, createTodo);
router.put('/:id', ensureAuth, updateTodo);
router.delete('/:id', ensureAuth, deleteTodo);

module.exports = router;