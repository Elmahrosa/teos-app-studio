import React, { useState } from 'react';
import { Plus, ArrowRight, GitBranch, Shield, Clock, Terminal, Rocket, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Project } from '../types';
import { useNavigate } from 'react-router-dom';

const initialProjects: Project[] = [
  { id: '1', name: 'pilot-bank-core', status: 'active', techStack: ['Next.js', 'FastAPI'], lastUpdated: '2h ago', complianceScore: 98 },
  { id: '2', name: 'teos-commerce-v1', status: 'building', techStack: ['React Native', 'Node'], lastUpdated: '5m ago', complianceScore: 85 },
  { id: '3', name: 'internal-audit-log', status: 'compliance_check', techStack: ['FastAPI', 'Postgres'], lastUpdated: '1d ago', complianceScore: 100 },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeployClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleConfirmDeploy = () => {
    if (!selectedProject) return;
    
    setIsDeploying(true);
    
    // 1. Start Deployment (Status: building)
    setTimeout(() => {
      setProjects(prev => prev.map(p => 
        p.id === selectedProject.id ? { ...p, status: 'building', lastUpdated: 'Just now' } : p
      ));
      
      setIsDeploying(false);
      setIsModalOpen(false);
      
      // 2. Simulate Build Completion (Status: active)
      setTimeout(() => {
         setProjects(prev => prev.map(p => 
            p.id === selectedProject.id ? { ...p, status: 'active', lastUpdated: 'Just now' } : p
          ));
      }, 5000); // 5 seconds build time simulation

      setSelectedProject(null);
    }, 1500);
  };

  return (
    <div className="space-y-8 relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 p-8 shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-stone-100 mb-2">Welcome back to TEOS Studio</h1>
          <p className="text-slate-400 max-w-xl mb-6">
            Your centralized command center for building compliant, high-performance applications. 
            TESL v2.0 enforcement is active across all workspaces.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/workspace')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-lg shadow-lg shadow-amber-900/20 transition-all flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Project
            </button>
            <button 
              onClick={() => navigate('/compliance')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-stone-200 border border-slate-600 rounded-lg transition-all flex items-center"
            >
              <Shield className="w-5 h-5 mr-2" />
              Audit Compliance
            </button>
          </div>
        </div>
        {/* Decorative Background Elements */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none"></div>
        <Terminal className="absolute -right-6 -bottom-6 w-64 h-64 text-slate-800/50 rotate-12" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Deployments', value: '12', change: '+2', icon: GitBranch },
          { label: 'Security Score', value: '98%', change: '+1.5%', icon: Shield },
          { label: 'Avg Build Time', value: '45s', change: '-12s', icon: Clock },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-800 rounded-lg text-amber-400">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-stone-100 mb-1">{stat.value}</div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-stone-100">Recent Projects</h2>
          <button className="text-sm text-amber-400 hover:text-amber-300 flex items-center">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">Project Name</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">Stack</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">Compliance</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {projects.map((project) => (
                <tr 
                  key={project.id} 
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center mr-3 font-bold text-xs text-slate-300">
                        {project.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-stone-200 font-medium">{project.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${project.status === 'active' ? 'bg-green-400/10 text-green-400' : 
                        project.status === 'building' ? 'bg-amber-400/10 text-amber-400' : 
                        'bg-blue-400/10 text-blue-400'}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-400 rounded-full" 
                          style={{ width: `${project.complianceScore}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-400">{project.complianceScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`flex items-center justify-end gap-3 transition-opacity duration-200 ${project.status === 'building' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      
                      {/* Real-time Status Indicator */}
                      {project.status === 'building' && (
                        <div className="flex items-center text-xs text-amber-400 font-medium animate-pulse">
                          <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                          Building...
                        </div>
                      )}
                      {project.status === 'active' && (
                        <div className="flex items-center text-xs text-green-500 font-medium">
                          <CheckCircle2 className="w-3 h-3 mr-1.5" />
                          Live
                        </div>
                      )}
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle open studio logic
                        }}
                        className="text-sm text-slate-500 hover:text-stone-100 transition-colors"
                      >
                        Open Studio
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeployClick(project);
                        }}
                        disabled={project.status === 'building'}
                        className={`flex items-center px-3 py-1.5 rounded-md text-xs font-bold shadow-lg transition-all active:scale-95
                          ${project.status === 'building' 
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                            : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-900/20'
                          }`}
                      >
                        <Rocket className="w-3 h-3 mr-1.5" />
                        {project.status === 'building' ? 'Deploying' : 'Quick Deploy'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deployment Confirmation Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-400/10 rounded-full shrink-0">
                  <Rocket className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-stone-100 mb-2">Deploy to Production?</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    You are about to trigger a new deployment for <span className="text-stone-200 font-semibold">{selectedProject.name}</span>. This will compile the latest build and push to the edge.
                  </p>
                  
                  <div className="bg-slate-950 rounded border border-slate-800 p-3 text-xs text-slate-500 mb-4 font-mono space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-green-500" />
                      <span>Compliance Check: Passed ({selectedProject.complianceScore}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-3 h-3 text-blue-500" />
                      <span>Branch: main (latest)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-2">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-stone-100 text-sm font-medium transition-colors"
                  disabled={isDeploying}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmDeploy}
                  disabled={isDeploying}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold rounded-lg transition-all flex items-center shadow-lg shadow-amber-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Initializing...
                    </>
                  ) : (
                    <>
                      Confirm Deploy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};