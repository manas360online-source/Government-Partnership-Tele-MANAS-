
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';
import { 
  ArrowUpRight, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Timer,
  Activity,
  AlertTriangle
} from 'lucide-react';

const data = [
  { name: 'Jan', referrals: 45, improved: 32 },
  { name: 'Feb', referrals: 52, improved: 38 },
  { name: 'Mar', referrals: 61, improved: 45 },
  { name: 'Apr', referrals: 58, improved: 41 },
];

const demographicData = [
  { name: '18-25', value: 20 },
  { name: '26-35', value: 30 },
  { name: '36-45', value: 25 },
  { name: '46+', value: 25 },
];

const COLORS = ['#1b72e8', '#10b981', '#f59e0b', '#ef4444'];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full text-xs font-semibold">
        <TrendingUp className="w-3 h-3" />
        {change}
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Program Dashboard</h1>
        <p className="text-slate-500">Monitoring Tele-MANAS partnership performance and outcomes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Referrals" 
          value="216" 
          change="+12.5%" 
          icon={Users} 
          color="bg-[#1b72e8]" 
        />
        <StatCard 
          title="Acceptance Rate" 
          value="94.2%" 
          change="+2.4%" 
          icon={CheckCircle2} 
          color="bg-emerald-600" 
        />
        <StatCard 
          title="Avg. PHQ-9 Imp." 
          value="6.2" 
          change="+0.8" 
          icon={Activity} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Processing Time" 
          value="18.5h" 
          change="-4.2h" 
          icon={Timer} 
          color="bg-indigo-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 text-lg">Referral Intake & Outcomes</h3>
            <select className="bg-[#f0f7ff] border border-slate-200 text-sm rounded-xl px-3 py-2 outline-none">
              <option>Quarterly (Q1 2026)</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="referrals" fill="#1b72e8" radius={[6, 6, 0, 0]} name="Referrals" />
                <Bar dataKey="improved" fill="#10b981" radius={[6, 6, 0, 0]} name="Clinically Improved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-8">Demographics (Age)</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {demographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {demographicData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-slate-500">{item.name} yrs</span>
                </div>
                <span className="font-semibold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 p-6 rounded-3xl flex items-start gap-4">
        <div className="p-3 bg-red-100 rounded-2xl">
          <AlertTriangle className="text-red-600 w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-red-900">Critical Alerts</h3>
          <p className="text-red-700 text-sm mt-1">2 high-priority referrals from Tele-MANAS haven't been processed in 24 hours. Immediate action required.</p>
          <button className="mt-3 px-6 py-2 bg-red-600 text-white rounded-full text-sm font-bold hover:bg-red-700 transition-colors uppercase tracking-wide">
            View Urgent Referrals
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
