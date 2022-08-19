const Task = require('./models/Task');

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        getAllTasks: async () => {
            const tasks = await Task.find();
            return tasks;
        },
        async getTask(_, { id }) {
            const task = await Task.findById(id);
            return task;
        },
    },
    Mutation: {
        createTask: async (_, args) => {
            const { title, description } = args.task;
            const newTask = new Task({ title, description });
            await newTask.save();
            return newTask;
        },
        async deleteTask(_, { id }) {
            await Task.findByIdAndDelete(id);
            return 'Task deleted';
        },
        async updateTask(_, { id, task }) {
            const taskUpdate = await Task.findByIdAndUpdate(
                id,
                { $set: task },
                { new: true }
            );
            return taskUpdate;
        },
    },
};

module.exports = { resolvers };
