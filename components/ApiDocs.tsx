
import React, { useState } from 'react';
import { 
  Code, 
  Terminal, 
  Lock, 
  ShieldCheck, 
  Webhook, 
  Copy,
  ChevronDown,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

const API_ENDPOINTS = [
  { 
    method: 'POST', 
    path: '/referrals/create', 
    desc: 'Accept patient referral from Tele-MANAS',
    request: {
      referral_id: "TM-KA-2026-001234",
      patient: { name: "string", age: "number" },
      clinical_context: { phq9: "number" }
    },
    response: {
      success: true,
      referral_id: "intake_9921",
      status: "pending"
    }
  },
  { 
    method: 'GET', 
    path: '/referrals/{id}', 
    desc: 'Check therapy status and PHQ-9 progress',
    request: "No body required",
    response: {
      status: "therapy_started",
      sessions_completed: 4,
      current_outcome: "improved"
    }
  },
  { 
    method: 'GET', 
    path: '/reports/{id}', 
    desc: 'Retrieve generated quarterly reports (PDF/Excel)',
    request: "No body required",
    response: {
      report_url: "https://storage.manas360.com/r/q1-2026.pdf"
    }
  },
  { 
    method: 'POST', 
    path: '/reports/generate', 
    desc: 'Trigger ad-hoc report generation (Admin Only)',
    request: { quarter: "Q1-2026" },
    response: { job_id: "job_8821", status: "processing" }
  }
];

const ApiDocs: React.FC = () => {
  const [expandedApi, setExpandedApi] = useState<string | null>(null);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const copyPath = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const referralPayload = `{
  "referral_source": "tele_manas",
  "referral_id": "TM-KA-2026-001234",
  "referral_date": "2026-01-05",
  "patient": {
    "name": "Rahul Kumar",
    "age": 28,
    "gender": "male",
    "phone": "+91-9876543210",
    "location": "Dharwad, Karnataka"
  },
  "clinical_context": {
    "presenting_concern": "Moderate depression...",
    "phq9_score": 14,
    "crisis_level": "medium"
  }
}`;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Integration Documentation</h1>
        <p className="text-slate-500">Resources for Tele-MANAS developers to connect to the MANAS360 Platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Secure Authentication</h3>
            <p className="text-sm text-slate-500 mt-1">All requests require an `X-API-KEY` header generated for your specific government nodal center.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">DPDPA Compliant</h3>
            <p className="text-sm text-slate-500 mt-1">End-to-end encryption for all PHI. Data minimization is enforced on reporting endpoints.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 rounded-3xl p-8 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="text-slate-400 w-5 h-5" />
              <span className="text-slate-200 font-mono text-sm font-semibold">Base Intake Endpoint</span>
            </div>
          </div>
          <pre className="text-blue-300 font-mono text-sm overflow-x-auto">
            {referralPayload}
          </pre>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Webhook className="w-5 h-5 text-blue-600" />
              API Endpoints (v1)
            </h3>
            <p className="text-xs text-slate-400 mt-1">Click an endpoint to view request/response schemas.</p>
          </div>
          
          <div className="divide-y divide-slate-100">
            {API_ENDPOINTS.map((api) => (
              <div key={api.path} className="group">
                <div 
                  onClick={() => setExpandedApi(expandedApi === api.path ? null : api.path)}
                  className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded w-14 text-center ${
                      api.method === 'POST' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>{api.method}</span>
                    <div>
                      <p className="text-sm font-mono font-semibold text-slate-700">{api.path}</p>
                      <p className="text-xs text-slate-400">{api.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => copyPath(api.path, e)}
                      className="p-1.5 text-slate-300 hover:text-blue-600 transition-colors"
                    >
                      {copiedPath === api.path ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    {expandedApi === api.path ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-300" />}
                  </div>
                </div>
                
                {expandedApi === api.path && (
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 space-y-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Request Schema</p>
                        <pre className="p-3 bg-white border border-slate-200 rounded-xl text-[11px] font-mono text-slate-600 overflow-x-auto">
                          {JSON.stringify(api.request, null, 2)}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mock Response</p>
                        <pre className="p-3 bg-white border border-slate-200 rounded-xl text-[11px] font-mono text-slate-600 overflow-x-auto">
                          {JSON.stringify(api.response, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
