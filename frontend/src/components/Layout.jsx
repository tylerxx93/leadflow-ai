import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Send, 
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SidebarLink = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        isActive 
          ? "bg-primary-600 text-white" 
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      )}
    >
      <Icon size={20} />
      <span className="font-medium">{children}</span>
      {isActive && <ChevronRight size={16} className="ml-auto" />}
    </Link>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white w-full">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <Send size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">LeadFlow AI</span>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarLink to="/" icon={LayoutDashboard}>Dashboard</SidebarLink>
          <SidebarLink to="/leads" icon={Users}>Leads</SidebarLink>
          <SidebarLink to="/templates" icon={FileText}>Templates</SidebarLink>
          <SidebarLink to="/campaigns" icon={Send}>Campaigns</SidebarLink>
          <SidebarLink to="/billing" icon={CreditCard}>Billing</SidebarLink>
        </nav>

        <div className="mt-auto p-4 bg-gray-900 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400 mb-2">Free Plan</p>
          <div className="w-full bg-gray-800 rounded-full h-1.5 mb-3">
            <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <Link to="/billing" className="text-xs font-semibold text-primary-400 hover:text-primary-300">
            Upgrade to Pro
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
