
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Send, 
  CheckCircle2, 
  Clock, 
  Loader2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { QuarterlyReport } from '../types';

const MOCK_REPORTS: QuarterlyReport[] = [
  {
    id: 'rep-001',
    report_period_start: '2025-10-01',
    report_period_end: '2025-12-31',
    report_quarter: 'Q4-2025',
    status: 'sent',
    summary: {
      total_referrals: 180,
      total_accepted: 168,
      total_sessions: 840,
      improvement_rate: 71.5,
      avg_phq9_improvement: 5.8
    },
    generated_at: '2026-01-01T10:00:00Z'
  },
  {
    id: 'rep-002',
    report_period_start: '2025-07-01',
    report_period_end: '2025-09-30',
    report_quarter: 'Q3-2025',
    status: 'acknowledged',
    summary: {
      total_referrals: 154,
      total_accepted: 142,
      total_sessions: 690,
      improvement_rate: 68.2,
      avg_phq9_improvement: 5.4
    },
    generated_at: '2025-10-01T14:30:00Z'
  }
];

const ReportCenter: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Report Center</h1>
          <p className="text-slate-500">Generate and manage quarterly outcome reports for Tele-MANAS.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-8 py-3 bg-[#1b72e8] text-white rounded-full font-bold hover:shadow-xl hover:shadow-blue-200 disabled:opacity-50 transition-all uppercase tracking-wide"
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Calendar className="w-5 h-5" />
          )}
          Generate Q1 2026 Report
        </button>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-3xl flex items-start gap-4">
        <AlertCircle className="text-[#1b72e8] w-6 h-6 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-blue-900">Automation Note</h3>
          <p className="text-blue-700 text-sm mt-1">
            Reports are automatically generated on the 1st of every quarter. 
            The next scheduled automated report is <b>April 1st, 2026</b>.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 px-1">Report History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_REPORTS.map((report) => (
            <div key={report.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#f0f7ff] rounded-2xl text-[#1b72e8]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{report.report_quarter} Outcome Report</h3>
                    <p className="text-xs text-slate-500 mt-1">Generated: {new Date(report.generated_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                  report.status === 'sent' ? 'bg-emerald-50 text-emerald-600' : 'bg-[#f0f7ff] text-[#1b72e8]'
                }`}>
                  {report.status}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-3 bg-[#f0f7ff] rounded-2xl">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Referrals</p>
                  <p className="text-lg font-bold text-slate-800">{report.summary.total_referrals}</p>
                </div>
                <div className="p-3 bg-[#f0f7ff] rounded-2xl">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Improvement</p>
                  <p className="text-lg font-bold text-emerald-600">{report.summary.improvement_rate}%</p>
                </div>
                <div className="p-3 bg-[#f0f7ff] rounded-2xl">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Avg PHQ-9</p>
                  <p className="text-lg font-bold text-slate-800">{report.summary.avg_phq9_improvement}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors uppercase">
                  PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors uppercase">
                  Excel
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#f0f7ff] text-[#1b72e8] rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors uppercase">
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportCenter;
