import React, { useState } from 'react';
import { Check, X, Globe, CreditCard } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [currency, setCurrency] = useState<'USD' | 'EGP'>('USD');

  // Exchange rate approximation for display purposes
  const rate = currency === 'USD' ? 1 : 48; 
  const symbol = currency === 'USD' ? '$' : 'EGP ';

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for hobbyists and prototypes.',
      price: 0,
      features: ['1 Project', 'Basic Templates', 'Community Support', 'Next.js Export'],
      limitations: ['No Private Repos', 'Standard Build Speeds']
    },
    {
      name: 'Pro',
      description: 'For solo developers and freelancers building real apps.',
      monthlyPrice: 29,
      annualPrice: 24, // per month when billed annually
      features: ['Unlimited Projects', 'All Templates', 'Priority Support', 'Full Code Export (React Native + FastAPI)', '1-Click Deploy', 'Analytics Basic'],
      highlight: true
    },
    {
      name: 'Team',
      description: 'Collaborate with your team on complex systems.',
      monthlyPrice: 99,
      annualPrice: 79, // per month when billed annually
      features: ['Everything in Pro', 'Role-Based Access', 'Audit Logs', 'Dedicated Infrastructure', 'SLA 99.9%', 'Custom Compliance Rules'],
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-stone-100">Simple, Transparent Pricing</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Build faster and cheaper than traditional dev shops. Cancel anytime.
        </p>
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
           <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
             <button 
               onClick={() => setIsAnnual(false)}
               className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${!isAnnual ? 'bg-slate-800 text-stone-100 shadow' : 'text-slate-400 hover:text-stone-200'}`}
             >
               Monthly
             </button>
             <button 
               onClick={() => setIsAnnual(true)}
               className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${isAnnual ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-stone-200'}`}
             >
               Yearly <span className="text-[10px] ml-1 bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">-20%</span>
             </button>
           </div>

           <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
             <button onClick={() => setCurrency('USD')} className={`text-xs font-bold transition-colors ${currency === 'USD' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}>USD</button>
             <span className="text-slate-700">|</span>
             <button onClick={() => setCurrency('EGP')} className={`text-xs font-bold transition-colors ${currency === 'EGP' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}>EGP</button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const price = plan.price === 0 ? 0 : (isAnnual ? plan.annualPrice : plan.monthlyPrice);
          const displayPrice = Math.round(price * rate).toLocaleString();

          return (
            <div key={plan.name} className={`relative bg-slate-900 border rounded-2xl p-8 flex flex-col transition-all hover:border-slate-600 ${plan.highlight ? 'border-amber-400 shadow-xl shadow-amber-900/20 scale-105 z-10' : 'border-slate-800'}`}>
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-stone-100">{plan.name}</h3>
                <p className="text-slate-400 text-sm mt-2 h-10">{plan.description}</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-bold text-stone-100">
                    {price === 0 ? 'Free' : `${symbol}${displayPrice}`}
                  </span>
                  {price !== 0 && <span className="text-slate-500 ml-2">/mo</span>}
                </div>
                {isAnnual && price !== 0 && (
                   <div className="text-xs text-green-400 mt-2 font-mono">Billed {symbol}{(price * 12 * rate).toLocaleString()} yearly</div>
                )}
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                   <div key={feature} className="flex items-start">
                     <Check className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
                     <span className="text-sm text-slate-300">{feature}</span>
                   </div>
                ))}
                {plan.limitations?.map((limit) => (
                   <div key={limit} className="flex items-start opacity-50">
                     <X className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
                     <span className="text-sm text-slate-500">{limit}</span>
                   </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-lg font-bold transition-all ${plan.highlight ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-900/20' : 'bg-slate-800 hover:bg-slate-700 text-stone-200 border border-slate-700'}`}>
                {price === 0 ? 'Get Started' : 'Subscribe Now'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mt-12">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
               <h3 className="text-xl font-bold text-stone-100 mb-2 flex items-center">
                 <Globe className="w-5 h-5 mr-2 text-blue-400" />
                 Regional & Enterprise Support
               </h3>
               <p className="text-slate-400 text-sm max-w-xl">
                 Fully localized for MENA region. Support for Arabic interfaces (Right-to-Left), local payment gateways (Fawry, Paymob), and compliant data residency.
               </p>
            </div>
            <button className="px-6 py-3 border border-slate-600 hover:bg-slate-800 rounded-lg text-stone-200 font-medium transition-colors whitespace-nowrap">
              Contact Sales
            </button>
         </div>
      </div>
    </div>
  );
};