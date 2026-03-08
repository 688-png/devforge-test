import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Clock, 
  LayoutBoards, 
  ListTodo, 
  Settings,
  MoreVertical,
  ChevronRight,
  Filter
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

const PriorityBadge = ({ priority }: { priority: Task['priority'] }) => {
  const colors = {
    low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    high: 'bg-rose-100 text-rose-700 border-rose-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors[priority]}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' as Task['priority'] });

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      completed: false,
      createdAt: Date.now(),
    };
    
    setTasks([task, ...tasks]);
    setNewTask({ title: '', description: '', priority: 'medium' });
    setIsModalOpen(false);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
          <span className="font-bold text-xl tracking-tight">DevForge</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-indigo-600 bg-indigo-50 rounded-lg font-medium">
            <LayoutBoards size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <ListTodo size={20} /> My Tasks
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Calendar size={20} /> Calendar
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Settings size={20} /> Settings
          </button>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold uppercase">JD</div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">Jane Doe</p>
              <p className="text-xs text-slate-500 truncate">Pro Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold`}>U{i}</div>
              ))}
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              <Plus size={18} /> New Task
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Task Overview</h1>
                <p className="text-slate-500 mt-1">You have {tasks.filter(t => !t.completed).length} pending tasks for today.</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg bg-white shadow-sm">
                  <Filter size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg bg-white shadow-sm">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Task List */}
            <div className="grid gap-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                  <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ListTodo className="text-indigo-600" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">No tasks found</h3>
                  <p className="text-slate-500">Get started by creating your first task above.</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`group bg-white p-4 rounded-xl border border-slate-200 flex items-center shadow-sm hover:shadow-md transition-all duration-200 ${task.completed ? 'bg-slate-50' : ''}`}
                  >
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`mr-4 transition-colors ${task.completed ? 'text-indigo-500' : 'text-slate-300 group-hover:text-slate-400'}`}
                    >
                      {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className={`font-semibold transition-all ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                          {task.title}
                        </h3>
                        <PriorityBadge priority={task.priority} />
                      </div>
                      {task.description && (
                        <p className={`text-sm mt-0.5 ${task.completed ? 'text-slate-400' : 'text-slate-500'}`}>
                          {task.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-slate-400">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <Clock size={14} />
                        {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="p-1.5 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                      <ChevronRight size={20} className="text-slate-300" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal Backdrop */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold">Create New Task</h2>
              <p className="text-slate-500 text-sm">Add details to organize your workflow.</p>
            </div>
            <form onSubmit={addTask} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Title</label>
                <input 
                  autoFocus
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="Task name"
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Description (optional)</label>
                <textarea 
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shrink-0"
                  placeholder="Notes..."
                  rows={3}
                  value={newTask.description}
                  onChange={e => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Priority</label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setNewTask({...newTask, priority: p})}
                      className={`flex-1 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                        newTask.priority === p 
                          ? 'bg-indigo-600 border-indigo-600 text-white' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}