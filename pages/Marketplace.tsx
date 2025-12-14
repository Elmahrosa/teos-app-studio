import React from 'react';
import { ShoppingBag, Star, Download, ShieldCheck, Box } from 'lucide-react';

const items = [
  { id: 1, title: 'KYC & AML Suite', category: 'Compliance', rating: 4.9, downloads: '2.3k', price: 'Free', description: 'Standard banking grade Know Your Customer flows with integrated document verification.' },
  { id: 2, title: 'Stripe Payments V2', category: 'Integration', rating: 4.8, downloads: '5k+', price: 'Free', description: 'Pre-built payment intents, webhook handlers, and checkout UI components.' },
  { id: 3, title: 'TEOS Analytics Pro', category: 'Analytics', rating: 5.0, downloads: '800', price: '$49/mo', description: 'Advanced user telemetry, heatmap tracking, and SDG impact reporting.' },
  { id: 4, title: 'Chatbot UI Kit', category: 'Frontend', rating: 4.5, downloads: '1.2k', price: 'Free', description: 'Shadcn/ui based chat interfaces compatible with Gemini and OpenAI streaming.' },
  { id: 5, title: 'PostgreSQL Vector', category: 'Database', rating: 4.7, downloads: '3.1k', price: 'Free', description: 'pgvector configuration for RAG applications with automatic migration scripts.' },
  { id: 6, title: 'Auth0 Adapter', category: 'Security', rating: 4.6, downloads: '4.5k', price: 'Free', description: 'Drop-in replacement for native JWT auth using Auth0 Universal Login.' },
];

export const Marketplace: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-stone-100 mb-2">Module Marketplace</h1>
          <p className="text-slate-400">Extend your application with pre-audited, compliant modules.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-slate-800 text-stone-200 text-sm rounded-lg hover:bg-slate-700 transition-colors">Installed</button>
           <button className="px-4 py-2 bg-amber-400 text-slate-950 font-medium text-sm rounded-lg hover:bg-amber-300 transition-colors">Browse All</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-400/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-amber-400 group-hover:scale-110 transition-transform">
                <Box className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium bg-slate-800 text-slate-300 px-2 py-1 rounded">
                {item.category}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-stone-100 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-400 mb-6 h-12 overflow-hidden line-clamp-2">
              {item.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                 <span className="flex items-center">
                   <Star className="w-3 h-3 text-amber-400 mr-1 fill-amber-400" /> {item.rating}
                 </span>
                 <span className="flex items-center">
                   <Download className="w-3 h-3 mr-1" /> {item.downloads}
                 </span>
              </div>
              <div className="flex items-center gap-2">
                {item.id === 1 && (
                  <span title="Audited">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                  </span>
                )}
                <button className="text-xs font-medium bg-slate-800 hover:bg-slate-700 text-stone-200 px-3 py-1.5 rounded transition-colors">
                  {item.price === 'Free' ? 'Install' : 'Buy'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};