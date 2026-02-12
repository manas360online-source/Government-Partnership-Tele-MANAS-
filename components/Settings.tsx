
import React, { useState } from 'react';
import { 
  Key, 
  Shield, 
  Webhook, 
  Bell, 
  Eye, 
  EyeOff, 
  Copy, 
  RefreshCw,
  CheckCircle2,
  Lock
} from 'lucide-react';

const Settings: React.FC = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey] = useState('tm_live_9a2f1b8c3d4e5f6g7h8i9j0k');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Platform Settings</h1>
        <p className="text-slate-500">Configure your government partnership integration and security parameters.</p>
      </div>

      {/* API Key Management */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#f0f7ff] rounded-xl text-[#1b72e8]">
              <Key className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-800">Integration API Keys</h2>
          </div>
          <button className="text-sm font-bold text-[#1b72e8] hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider">
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-500 mb-4">Use this key to authenticate requests from Tele-MANAS systems.</p>
          <div className="flex items-center gap-2 p-3 bg-[#f0f7ff] rounded-2xl border border-transparent">
            <code className="flex-1 font-mono text-sm text-slate-700 overflow-hidden whitespace-nowrap">
              {showApiKey ? apiKey : '••••••••••••••••••••••••••••••••'}
            </code>
            <button 
              onClick={() => setShowApiKey(!showApiKey)}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => copyToClipboard(apiKey)}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </section>

      {/* Webhook Configuration */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#f0f7ff] rounded-xl text-indigo-600">
              <Webhook className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-800">Webhook Endpoints</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Callback URL</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                defaultValue="https://telemanas.gov.in/api/v1/callbacks/manas360"
                className="flex-1 px-4 py-3 bg-[#f0f7ff] border border-transparent rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1b72e8] transition-all"
              />
              <button className="px-8 py-3 bg-[#1b72e8] text-white rounded-full text-sm font-bold uppercase tracking-wide shadow-lg shadow-blue-100 transition-all">Save</button>
            </div>
            <p className="text-xs text-slate-400">POST requests will be sent to this URL for all referral status changes.</p>
          </div>
        </div>
      </section>

      {/* Compliance & Security */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-800">Compliance & Security</h2>
          </div>
        </div>
        <div className="p-6 divide-y divide-slate-100">
          {[
            { 
              title: 'Automated Compliance Reporting', 
              desc: 'Generate and send reports to Nodal Centers every quarter.',
              enabled: true 
            },
            { 
              title: 'Audit Logging', 
              desc: 'Record every API access and patient record view for 3 years.',
              enabled: true 
            },
            { 
              title: 'Strict PII Masking', 
              desc: 'Automatically anonymize patient data in dashboards.',
              enabled: false 
            }
          ].map((item, idx) => (
            <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <button className={`w-12 h-6 rounded-full transition-all relative ${item.enabled ? 'bg-[#1b72e8]' : 'bg-slate-200'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.enabled ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Settings;
