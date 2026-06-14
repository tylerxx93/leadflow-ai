import React from 'react';
import { 
  Users, 
  Send, 
  MailOpen, 
  MessageSquare,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-gray-800 rounded-lg text-primary-400">
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {trendValue}
        </div>
      )}
    </div>
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome back! Here's what's happening with your outreach.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Leads" 
          value="1,284" 
          icon={Users} 
          trend="up" 
          trendValue="+12%" 
        />
        <StatCard 
          title="Emails Sent" 
          value="856" 
          icon={Send} 
          trend="up" 
          trendValue="+5%" 
        />
        <StatCard 
          title="Open Rate" 
          value="64.2%" 
          icon={MailOpen} 
          trend="down" 
          trendValue="-2%" 
        />
        <StatCard 
          title="Reply Rate" 
          value="18.5%" 
          icon={MessageSquare} 
          trend="up" 
          trendValue="+3%" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Recent Campaigns</h2>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                <div>
                  <h4 className="font-semibold">Software Agencies London</h4>
                  <p className="text-sm text-gray-400">Sent to 45 leads • 2 days ago</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center text-primary-400">
            <TrendingUp size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Ready to grow?</h2>
            <p className="text-gray-400 max-w-xs mt-2">Unlock more leads and advanced automation features with a Pro plan.</p>
          </div>
          <button className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors">
            View Pricing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
