
import React from 'react';
import { 
  User, 
  Mail, 
  Briefcase, 
  Building, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Calendar,
  CheckCircle,
  FileText,
  Activity
} from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-blue-50 mx-auto flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-blue-600">VM</span>
            </div>
            <h1 className="text-xl font-bold text-slate-800">Dr. Vivek M.</h1>
            <p className="text-sm text-slate-500 font-medium">Clinical Director, MANAS360</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100 uppercase tracking-wider">Verified Admin</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-wider">Tele-MANAS Lead</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>v.moorthy@health.gov.in</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Building className="w-4 h-4 text-slate-400" />
                <span>NIMHANS Campus, Bangalore</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Joined Feb 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Professional Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Specialization</p>
                <p className="text-sm text-slate-800 font-medium">Neuropsychiatry & Public Health</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Department</p>
                <p className="text-sm text-slate-800 font-medium">Digital Mental Health Initiatives</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Employee ID</p>
                <p className="text-sm text-slate-800 font-medium">MS-2024-AD-001</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reporting To</p>
                <p className="text-sm text-slate-800 font-medium">State Health Secretary (Govt. of KA)</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Bio</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Expert in scaling mental health infrastructure through technology. Leading the MANAS360 government partnership, 
                overseeing clinical standards, and ensuring HIPAA/DPDPA compliance for referral intake systems across multiple states.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-slate-800">48</p>
              </div>
              <p className="text-xs text-slate-500 font-medium">Active Cases</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-slate-800">1.2k</p>
              </div>
              <p className="text-xs text-slate-500 font-medium">Total Referrals Approved</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-50 rounded-xl">
                  <FileText className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-slate-800">12</p>
              </div>
              <p className="text-xs text-slate-500 font-medium">Reports Certified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
