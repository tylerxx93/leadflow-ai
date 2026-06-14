import React, { useState, useEffect } from 'react';
import { Plus, Send, Play, BarChart2 } from 'lucide-react';
import api from '../api';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get('/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-gray-400 mt-2">Track and run your outreach sequences.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-colors">
          <Plus size={18} />
          New Campaign
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Campaign Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Engagement</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {loading ? (
              [1, 2].map(i => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 bg-gray-800 rounded w-48"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-800 rounded w-16"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-800 rounded w-32"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-800 rounded w-24 ml-auto"></div></td>
                </tr>
              ))
            ) : campaigns.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-gray-500 italic">
                  No campaigns yet. Launch your first one to start booking meetings.
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-white">{campaign.name}</p>
                      <p className="text-xs text-gray-500">Created {new Date(campaign.created_at).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20 capitalize">
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="text-xs">
                        <p className="text-gray-500 uppercase font-bold tracking-tighter">Sent</p>
                        <p className="text-white font-bold">124</p>
                      </div>
                      <div className="text-xs">
                        <p className="text-gray-500 uppercase font-bold tracking-tighter">Opened</p>
                        <p className="text-white font-bold">62%</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all">
                        <BarChart2 size={18} />
                      </button>
                      <button className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all">
                        <Play size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Campaigns;
