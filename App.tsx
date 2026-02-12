
import React, { useState, useRef, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ReferralManagement from './components/ReferralManagement';
import ReportCenter from './components/ReportCenter';
import ApiDocs from './components/ApiDocs';
import SettingsView from './components/Settings';
import ProfileView from './components/Profile';
import { 
  LayoutDashboard, 
  Users, 
  FileBarChart, 
  Code, 
  Settings as SettingsIcon, 
  Bell, 
  Search, 
  UserCircle,
  Menu,
  X,
  Stethoscope,
  LogOut,
  User,
  Settings,
  AlertCircle,
  CheckCircle2,
  Calendar
} from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Urgent Referral Received',
    desc: 'High crisis level referral from Tele-MANAS (TM-2026-004)',
    time: '5 mins ago',
    type: 'alert',
    unread: true
  },
  {
    id: 2,
    title: 'Report Ready',
    desc: 'Q4 2025 Outcome Report has been finalized.',
    time: '2 hours ago',
    type: 'info',
    unread: true
  },
  {
    id: 3,
    title: 'API Status: Normal',
    desc: 'Daily sync with Tele-MANAS endpoint successful.',
    time: '5 hours ago',
    type: 'success',
    unread: false
  }
];

const Sidebar = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {
  const location = useLocation();
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Referrals', icon: Users, path: '/referrals' },
    { name: 'Report Center', icon: FileBarChart, path: '/reports' },
    { name: 'API Docs', icon: Code, path: '/api-docs' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggle}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-50 w-64 bg-white border-r border-slate-200 flex flex-col`}>
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="p-2 bg-[#1b72e8] rounded-lg shadow-lg shadow-blue-100">
            <Stethoscope className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">MANAS360</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && toggle()}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-[#1b72e8] font-bold shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link 
            to="/settings"
            onClick={() => window.innerWidth < 1024 && toggle()}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all ${
              location.pathname === '/settings'
                ? 'bg-blue-50 text-[#1b72e8] font-bold shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <SettingsIcon className="w-5 h-5" />
            Settings
          </Link>
          <div className="mt-4 p-4 bg-slate-900 rounded-2xl text-white">
            <p className="text-sm font-medium">Government Portal</p>
            <p className="text-xs text-slate-400 mt-1">Tele-MANAS Connected</p>
            <div className="mt-3 h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              {/* Progress bar updated to match GET STARTED button blue */}
              <div className="h-full w-4/5 bg-[#1b72e8] shadow-[0_0_8px_rgba(27,114,232,0.6)]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search patient, referral ID..."
            className="pl-10 pr-4 py-2 bg-[#f0f7ff] border border-transparent rounded-full w-64 text-sm focus:ring-2 focus:ring-[#1b72e8] focus:bg-white outline-none transition-all focus:w-80"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className={`p-2 text-slate-500 hover:bg-slate-50 rounded-full relative transition-colors ${showNotifications ? 'bg-slate-100' : ''}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Notifications</h3>
                <span className="text-[10px] bg-blue-50 text-[#1b72e8] px-2 py-0.5 rounded-full font-bold">2 NEW</span>
              </div>
              <div className="max-h-[350px] overflow-y-auto">
                {MOCK_NOTIFICATIONS.map(notif => (
                  <div key={notif.id} className={`p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors ${notif.unread ? 'bg-blue-50/30' : ''}`}>
                    <div className="flex gap-3">
                      <div className={`mt-1 p-1.5 rounded-lg h-fit ${
                        notif.type === 'alert' ? 'bg-red-50 text-red-600' : 
                        notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-[#1b72e8]'
                      }`}>
                        {notif.type === 'alert' ? <AlertCircle className="w-4 h-4" /> : 
                         notif.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className={`text-sm ${notif.unread ? 'font-bold text-slate-800' : 'text-slate-700'}`}>{notif.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notif.desc}</p>
                        <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                          <X className="w-3 h-3" /> {notif.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-50 text-center">
                <button className="text-xs font-bold text-[#1b72e8] hover:underline">View All Notifications</button>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200"></div>

        <div className="relative">
          <div 
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className={`flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-slate-50 transition-colors ${showProfile ? 'bg-slate-100' : ''}`}
          >
            <div className="text-right hidden sm:block px-1">
              <p className="text-sm font-bold text-slate-800">Dr. Vivek M.</p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Clinical Director</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-[#1b72e8]" />
            </div>
          </div>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="p-5 bg-slate-50 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Connected Account</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1b72e8] flex items-center justify-center text-white font-bold">VM</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Dr. Vivek M.</p>
                    <p className="text-xs text-slate-500">v.moorthy@health.gov.in</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                {[
                  { label: 'My Profile', icon: User, path: '/profile' },
                  { label: 'Account Settings', icon: Settings, path: '/settings' },
                ].map((item) => (
                  <Link 
                    key={item.label}
                    to={item.path}
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-slate-600 hover:bg-slate-50 hover:text-[#1b72e8] transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
                <div className="h-px bg-slate-100 my-2 mx-2"></div>
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold text-left">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-[#f0f7ff] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/referrals" element={<ReferralManagement />} />
              <Route path="/reports" element={<ReportCenter />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/settings" element={<SettingsView />} />
              <Route path="/profile" element={<ProfileView />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
