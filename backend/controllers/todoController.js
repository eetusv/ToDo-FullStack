const Todo = require('../models/Todo');
const { StatusCodes } = require('http-status-codes');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(StatusCodes.OK).json(todos);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching todos' });
  }
};

const createTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Title and description are required' });
  }

  try {
    const newTodo = new Todo({
      user: req.user._id,
      title,
      description,
    });
    await newTodo.save();
    res.status(StatusCodes.CREATED).json(newTodo);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error creating todo' });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (completed !== undefined) updateFields.completed = completed;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Todo not found' });
    }

    res.status(StatusCodes.OK).json(updatedTodo);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error updating todo' });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deletedTodo) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Todo not found' });
    }

    res.status(StatusCodes.OK).json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error deleting todo' });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
