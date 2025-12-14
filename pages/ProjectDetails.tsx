import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  GitBranch, 
  ShieldCheck, 
  Clock, 
  Server, 
  Database, 
  Globe, 
  Code2, 
  Terminal,
  ExternalLink
} from 'lucide-react';
import { Project } from '../types';

// Mock data lookup (in a real app, this would fetch from an API)
const getProjectDetails = (id: string | undefined): Project & { description: string, repoUrl: string } | null => {
  const projects: (Project & { description: string, repoUrl: string })[] = [
    { 
      id: '1', 
      name: 'pilot-bank-core', 
      status: 'active', 
      techStack: ['Next.js', 'FastAPI'], 
      lastUpdated: '2h ago', 
      complianceScore: 98,
      description: "Core banking ledger and transaction processing system for Pilot Bank pilot program.",
      repoUrl: "github.com/teos-egypt/pilot-bank-core"
    },
    { 
      id: '2', 
      name: 'teos-commerce-v1', 
      status: 'building', 
      techStack: ['React Native', 'Node'], 
      lastUpdated: '5m ago', 
      complianceScore: 85,
      description: "Mobile e-commerce application with integrated payment gateway and inventory management.",
      repoUrl: "github.com/teos-egypt/teos-commerce-v1"
    },
    { 
      id: '3', 
      name: 'internal-audit-log', 
      status: 'compliance_check', 
      techStack: ['FastAPI', 'Postgres'], 
      lastUpdated: '1d ago', 
      complianceScore: 100,
      description: "Immutable audit logging service for internal compliance tracking.",
      repoUrl: "github.com/teos-egypt/internal-audit-log"
    },
  ];
  
  return projects.find(p => p.id === id) || null;
};

export const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectDetails(id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <h2 className="text-xl font-bold text-stone-100 mb-2">Project Not Found</h2>
        <button onClick={() => navigate('/')} className="text-amber-400 hover:underline">Return to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-stone-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-stone-100 flex items-center gap-3">
              {project.name}
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border
                ${project.status === 'active' ? 'bg-green-400/10 text-green-400 border-green-400/20' : 
                  project.status === 'building' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 
                  'bg-blue-400/10 text-blue-400 border-blue-400/20'}`}>
                {project.status.replace('_', ' ').toUpperCase()}
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">{project.description}</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/workspace')}
          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg shadow-lg shadow-amber-900/20 transition-all flex items-center"
        >
          <Code2 className="w-4 h-4 mr-2" />
          Open in Studio
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-2 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5" /> Compliance Score
              </div>
              <div className="text-3xl font-bold text-stone-100">{project.complianceScore}%</div>
              <div className="mt-2 text-xs text-green-400">TESL v2.0 Verified</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-2 flex items-center">
                <GitBranch className="w-4 h-4 mr-1.5" /> Active Branch
              </div>
              <div className="text-3xl font-bold text-stone-100">main</div>
              <div className="mt-2 text-xs text-slate-500">Last commit: 12m ago</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-1.5" /> Uptime
              </div>
              <div className="text-3xl font-bold text-stone-100">99.9%</div>
              <div className="mt-2 text-xs text-slate-500">Past 30 days</div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-semibold text-stone-100">Recent Activity</h3>
              <button className="text-xs text-amber-400 hover:text-amber-300">View Logs</button>
            </div>
            <div className="divide-y divide-slate-800">
              {[1, 2, 3].map((i) => (
                <div key={i} className="px-6 py-4 flex items-start gap-3 hover:bg-slate-800/30 transition-colors">
                  <div className="mt-1 p-1.5 bg-slate-800 rounded text-slate-400">
                    <Terminal className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="text-sm text-stone-200">Deployment triggered by @ayman-eng</div>
                    <div className="text-xs text-slate-500 mt-0.5">Commit 8a2f9c • Fix authentication middleware race condition</div>
                  </div>
                  <div className="ml-auto text-xs text-slate-500 font-mono">1{i}h ago</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <h3 className="font-semibold text-stone-100 mb-4 text-sm uppercase tracking-wide">Infrastructure</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center"><Globe className="w-4 h-4 mr-2" /> Frontend</span>
                <span className="text-stone-200 font-mono text-xs bg-slate-950 px-2 py-1 rounded border border-slate-800">Next.js 15</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center"><Server className="w-4 h-4 mr-2" /> Backend</span>
                <span className="text-stone-200 font-mono text-xs bg-slate-950 px-2 py-1 rounded border border-slate-800">FastAPI</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center"><Database className="w-4 h-4 mr-2" /> Database</span>
                <span className="text-stone-200 font-mono text-xs bg-slate-950 px-2 py-1 rounded border border-slate-800">PostgreSQL</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <h3 className="font-semibold text-stone-100 mb-4 text-sm uppercase tracking-wide">Repository</h3>
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4 bg-slate-950 p-3 rounded border border-slate-800 break-all">
              <GitBranch className="w-4 h-4 shrink-0" />
              {project.repoUrl}
            </div>
            <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-stone-200 text-sm rounded-lg transition-colors flex items-center justify-center">
              <ExternalLink className="w-4 h-4 mr-2" /> View on GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};