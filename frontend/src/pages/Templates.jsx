import React, { useState, useEffect } from 'react';
import { Plus, FileText, Edit2, Trash2 } from 'lucide-react';
import api from '../api';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await api.get('/templates');
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Email Templates</h1>
          <p className="text-gray-400 mt-2">Create and manage your outreach messages.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-colors">
          <Plus size={18} />
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl animate-pulse">
              <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6"></div>
            </div>
          ))
        ) : templates.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 italic">
            No templates yet. Create your first one to start reaching out.
          </div>
        ) : (
          templates.map((template) => (
            <div key={template.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex flex-col gap-4 group hover:border-primary-500/50 transition-all">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-gray-800 rounded-lg text-primary-400">
                  <FileText size={20} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">{template.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-1">{template.subject}</p>
              </div>
              <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                {template.body_template}
              </p>
              <div className="mt-auto pt-4 border-t border-gray-800 flex gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-2 py-0.5 bg-gray-800 rounded">
                  {{first_name}}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-2 py-0.5 bg-gray-800 rounded">
                  {{company}}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Templates;
