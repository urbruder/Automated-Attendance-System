import React, { useState } from 'react';
import { FaPlus, FaTrashAlt, FaBookOpen, FaCheckCircle, FaDna, FaCode } from 'react-icons/fa';

const TodoList = () => {
    const [tasks, setTasks] = useState([
        { text: "Finish React project", completed: false },
        { text: "Submit Calculus assignment", completed: true },
    ]);
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim() === '') return;
        setTasks([...tasks, { text: newTask, completed: false }]);
        setNewTask('');
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleAddTask();
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-lg h-full">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">My To-Do List</h3>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a new task..."
                    className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={handleAddTask} className="bg-slate-900 text-white px-4 rounded-lg hover:bg-slate-800 transition-colors">
                    <FaPlus />
                </button>
            </div>
            <ul className="space-y-2">
                {tasks.map((task, index) => (
                    <li key={index} className="flex justify-between items-center py-2 border-b last:border-none">
                        <div className="flex items-center">
                            <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(index)} className="h-4 w-4 rounded mr-3 cursor-pointer" />
                            <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.text}</span>
                        </div>
                        <button onClick={() => handleDeleteTask(index)} className="text-red-400 hover:text-red-600 transition-colors">
                            <FaTrashAlt />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const TaskCard = ({ icon, title, subtitle, pillText, pillColor, iconColor }) => (
    <div className="flex items-start p-4 bg-gray-50 rounded-lg mb-4">
        <div className={`text-2xl mr-4 ${iconColor}`}>{icon}</div>
        <div className="flex-1">
            <h4 className="font-bold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-500">{subtitle}</p>
            {pillText && <span className={`text-xs font-semibold px-3 py-1 rounded-full mt-2 inline-block ${pillColor}`}>{pillText}</span>}
        </div>
    </div>
);

const TaskContent = () => {
    return (
        <>
            <h1 className="text-4xl font-bold text-slate-900 mb-8">Tasks</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white p-5 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Assignments</h3>
                    <TaskCard icon={<FaBookOpen />} title="Database Management" subtitle="Due Fri, Oct 20" pillText="Pending" pillColor="bg-blue-100 text-blue-800" iconColor="text-blue-500" />
                    <TaskCard icon={<FaCheckCircle />} title="Ethics in IT" subtitle="Due Oct 10" pillText="Completed" pillColor="bg-green-100 text-green-800" iconColor="text-green-500" />
                </div>
                 <div className="lg:col-span-1 bg-white p-5 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Suggested Tasks</h3>
                    <TaskCard icon={<FaDna />} title="Read: 'Future of AI in Healthcare'" subtitle="Biology" iconColor="text-orange-500" />
                    <TaskCard icon={<FaCode />} title="Practice: SQL Queries" subtitle="Coding" iconColor="text-orange-500" />
                </div>
                <div className="lg:col-span-1">
                    <TodoList />
                </div>
            </div>
        </>
    );
};

export default TaskContent;