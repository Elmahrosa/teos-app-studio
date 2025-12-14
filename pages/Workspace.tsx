import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, FileCode2, Terminal, Play, Save, Loader2, Sparkles, FolderTree } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateAppBlueprint, chatWithTeos } from '../services/geminiService';

export const Workspace: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello Architect. I am TEOS Gen. Describe the application you want to build, and I will generate the full stack scaffold compliant with TESL v2.0.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [blueprint, setBlueprint] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsProcessing(true);

    // If it looks like a generation request, try to generate a blueprint
    const isGenRequest = inputValue.toLowerCase().includes('create') || inputValue.toLowerCase().includes('build') || inputValue.toLowerCase().includes('app');

    if (isGenRequest && !blueprint) {
      const response = await generateAppBlueprint(inputValue);
      try {
        const json = JSON.parse(response);
        setBlueprint(json);
        const aiMsg: ChatMessage = {
          role: 'assistant',
          content: json.message || "I've generated a preliminary blueprint for your application. Review the structure on the right.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
      } catch (e) {
        // Fallback text response if JSON parsing fails
        const aiMsg: ChatMessage = { role: 'assistant', content: response, timestamp: new Date() };
        setMessages(prev => [...prev, aiMsg]);
      }
    } else {
      // Normal chat
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await chatWithTeos(inputValue, history);
      const aiMsg: ChatMessage = { role: 'assistant', content: response, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    }
    
    setIsProcessing(false);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-6">
      {/* Left Panel: Chat Interface */}
      <div className="w-1/2 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="h-12 bg-slate-950 border-b border-slate-800 flex items-center px-4 justify-between">
          <div className="flex items-center text-stone-200 text-sm font-medium">
            <Bot className="w-4 h-4 mr-2 text-amber-400" />
            TEOS Gen (v2.5)
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">Model: gemini-2.5-flash</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
                msg.role === 'user' 
                  ? 'bg-amber-500/10 text-amber-100 border border-amber-500/20' 
                  : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-slate-800 rounded-lg p-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                <span className="text-xs text-slate-400">Processing request...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Describe your app (e.g., 'Create a fintech app with KYC')..."
              className="w-full bg-slate-900 text-stone-200 border border-slate-800 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isProcessing}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-amber-400 hover:bg-amber-400/10 rounded-md transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Blueprint & Code Preview */}
      <div className="w-1/2 flex flex-col gap-4">
        {/* Blueprint Visualization */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
          <div className="h-12 bg-slate-950 border-b border-slate-800 flex items-center px-4 justify-between">
            <div className="flex items-center text-stone-200 text-sm font-medium">
              <FolderTree className="w-4 h-4 mr-2 text-blue-400" />
              Generated Scaffold
            </div>
            {blueprint && (
               <button className="text-xs flex items-center bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded transition-colors">
                 <Play className="w-3 h-3 mr-1" /> Deploy
               </button>
            )}
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            {!blueprint ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <Sparkles className="w-12 h-12 mb-4 text-slate-700" />
                <p>Waiting for blueprint generation...</p>
                <p className="text-xs mt-2 text-slate-600 text-center max-w-xs">
                  Try typing: "Create a digital banking app with auth and payments"
                </p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div>
                  <h3 className="text-xl font-bold text-stone-100 flex items-center">
                    {blueprint.appName}
                    <span className="ml-3 px-2 py-0.5 bg-green-900/30 text-green-400 text-xs rounded border border-green-900">TESL v2.0</span>
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                      <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Tech Stack</h4>
                      <ul className="space-y-1">
                        {blueprint.stack?.map((item: string, i: number) => (
                          <li key={i} className="text-sm text-slate-300 flex items-center">
                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                      <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Features</h4>
                      <ul className="space-y-1">
                        {blueprint.features?.map((item: string, i: number) => (
                          <li key={i} className="text-sm text-slate-300 flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                   <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center">
                     <Terminal className="w-4 h-4 text-slate-500 mr-2" />
                     <span className="text-xs text-slate-400 font-mono">deployment-preview.sh</span>
                   </div>
                   <div className="p-4 font-mono text-xs text-slate-400 space-y-1">
                     <p><span className="text-green-400">➜</span> <span className="text-blue-400">~</span> pnpm teos-gen create app --name {blueprint.appName.toLowerCase().replace(/\s/g, '-')}</p>
                     <p className="text-slate-500">Initializing monorepo...</p>
                     <p className="text-slate-500">Applying TESL v2.0 license...</p>
                     <p className="text-slate-500">Configuring FastAPI orchestrator...</p>
                     <p className="text-slate-500">Setting up Next.js 15 frontend...</p>
                     <p className="text-green-400">✔ Scaffold generated successfully.</p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mini Editor Preview */}
        <div className="h-1/3 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
           <div className="h-10 bg-slate-950 border-b border-slate-800 flex items-center px-4 justify-between">
              <div className="flex items-center text-slate-400 text-xs">
                <FileCode2 className="w-3 h-3 mr-2" />
                teos.config.json
              </div>
              <Save className="w-3 h-3 text-slate-600" />
           </div>
           <div className="flex-1 p-4 bg-slate-950 font-mono text-xs overflow-auto">
             <pre className="text-slate-400">
{`{
  "project": "${blueprint?.appName || 'untitled-project'}",
  "version": "1.0.0",
  "compliance": {
    "standard": "TESL-v2",
    "kycProvider": "default"
  },
  "modules": [
    "auth",
    "payments", 
    "analytics"
  ]
}`}
             </pre>
           </div>
        </div>
      </div>
    </div>
  );
};