
import React, { useState } from 'react';
import { MOCK_REFERRALS } from '../mockData';
import { ReferralStatus, CrisisLevel } from '../types';
import { 
  MoreVertical, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileText,
  Filter,
  Users,
  UserPlus
} from 'lucide-react';

const StatusBadge = ({ status }: { status: ReferralStatus }) => {
  const styles = {
    [ReferralStatus.PENDING]: 'bg-amber-50 text-amber-600 border-amber-100',
    [ReferralStatus.ACCEPTED]: 'bg-blue-50 text-blue-600 border-blue-100',
    [ReferralStatus.PATIENT_ONBOARDED]: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    [ReferralStatus.THERAPY_STARTED]: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    [ReferralStatus.DECLINED]: 'bg-slate-50 text-slate-600 border-slate-100',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status.split('_').join(' ').toUpperCase()}
    </span>
  );
};

const CrisisBadge = ({ level }: { level: CrisisLevel }) => {
  const styles = {
    [CrisisLevel.LOW]: 'bg-slate-100 text-slate-600',
    [CrisisLevel.MEDIUM]: 'bg-amber-100 text-amber-700',
    [CrisisLevel.HIGH]: 'bg-orange-100 text-orange-700',
    [CrisisLevel.CRITICAL]: 'bg-red-100 text-red-700 animate-pulse',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${styles[level]}`}>
      {level}
    </span>
  );
};

const ReferralManagement: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Referral Intake</h1>
          <p className="text-slate-500">Managing government referrals from Tele-MANAS and DMHP.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold hover:bg-slate-50 text-slate-700 shadow-sm uppercase">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="px-8 py-3 bg-[#1b72e8] text-white rounded-full text-sm font-bold hover:shadow-lg hover:shadow-blue-200 transition-all uppercase tracking-wide">
            Manual Intake
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Pending', count: 12, icon: Clock, color: 'text-amber-500' },
          { label: 'Accepted', count: 45, icon: CheckCircle2, color: 'text-[#1b72e8]' },
          { label: 'Therapy Started', count: 156, icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Onboarded', count: 28, icon: UserPlus, color: 'text-indigo-500' },
          { label: 'Declined', count: 5, icon: XCircle, color: 'text-slate-400' },
        ].map((stat: any) => (
          <div key={stat.label} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-2xl font-bold text-slate-800">{stat.count}</span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f0f7ff] border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Referral Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Patient Information</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Clinical Focus</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_REFERRALS.map((referral) => (
                <tr key={referral.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{referral.referral_id}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                      <FileText className="w-3 h-3" />
                      {referral.referral_source.toUpperCase()} • {referral.referral_date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{referral.patient.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{referral.patient.gender}, {referral.patient.age}y • {referral.patient.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CrisisBadge level={referral.clinical_context.crisis_level} />
                      <span className="text-xs font-medium text-slate-600 truncate max-w-[150px]">
                        {referral.clinical_context.presenting_concern}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={referral.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-[#1b72e8] hover:bg-blue-50 rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferralManagement;
