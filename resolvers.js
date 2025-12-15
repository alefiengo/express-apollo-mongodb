const Task = require('./models/Task');

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        getAllTasks: async () => {
            try {
                const tasks = await Task.find();
                return tasks;
            } catch (error) {
                throw new Error(`Error fetching tasks: ${error.message}`);
            }
        },
        async getTask(_, { id }) {
            try {
                if (!id) {
                    throw new Error('Task ID is required');
                }
                const task = await Task.findById(id);
                if (!task) {
                    throw new Error('Task not found');
                }
                return task;
            } catch (error) {
                throw new Error(`Error fetching task: ${error.message}`);
            }
        },
    },
    Mutation: {
        createTask: async (_, args) => {
            try {
                const { title, description } = args.task;

                if (!title || title.trim() === '') {
                    throw new Error('Title is required and cannot be empty');
                }

                const newTask = new Task({ title: title.trim(), description });
                await newTask.save();
                return newTask;
            } catch (error) {
                throw new Error(`Error creating task: ${error.message}`);
            }
        },
        async deleteTask(_, { id }) {
            try {
                if (!id) {
                    throw new Error('Task ID is required');
                }
                const task = await Task.findByIdAndDelete(id);
                if (!task) {
                    throw new Error('Task not found');
                }
                return 'Task deleted';
            } catch (error) {
                throw new Error(`Error deleting task: ${error.message}`);
            }
        },
        async updateTask(_, { id, task }) {
            try {
                if (!id) {
                    throw new Error('Task ID is required');
                }

                if (task.title !== undefined && task.title.trim() === '') {
                    throw new Error('Title cannot be empty');
                }

                const updateData = { ...task };
                if (task.title) {
                    updateData.title = task.title.trim();
                }

                const taskUpdate = await Task.findByIdAndUpdate(
                    id,
                    { $set: updateData },
                    { new: true }
                );

                if (!taskUpdate) {
                    throw new Error('Task not found');
                }

                return taskUpdate;
            } catch (error) {
                throw new Error(`Error updating task: ${error.message}`);
            }
        },
    },
};

module.exports = { resolvers };
