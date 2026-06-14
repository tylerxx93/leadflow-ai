import React from 'react';
import { Check, Zap } from 'lucide-react';

const PricingCard = ({ title, price, features, recommended, link }) => (
  <div className={`flex flex-col p-8 rounded-3xl border ${recommended ? 'bg-gray-900 border-primary-500 ring-4 ring-primary-500/10' : 'bg-gray-900 border-gray-800'} relative`}>
    {recommended && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
        RECOMMENDED
      </span>
    )}
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-4xl font-bold">${price}</span>
      <span className="text-gray-500">/month</span>
    </div>
    <ul className="flex flex-col gap-4 mb-8 flex-1">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
          <Check size={18} className="text-primary-400 shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full py-3 px-6 rounded-xl font-bold text-center transition-all ${
        recommended 
          ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
          : 'bg-gray-800 hover:bg-gray-700 text-white'
      }`}
    >
      Get Started
    </a>
  </div>
);

const Billing = () => {
  return (
    <div className="flex flex-col gap-12 max-w-5xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">Simple, Transparent Pricing</h1>
        <p className="text-gray-400 text-lg">Choose the plan that fits your growth stage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PricingCard 
          title="Starter"
          price="49"
          features={[
            "Up to 500 enriched leads/mo",
            "AI-powered personalized drafts",
            "Unlimited email templates",
            "Basic campaign analytics",
            "Email support"
          ]}
          link="https://buy.stripe.com/test_starter_link"
        />
        <PricingCard 
          title="Growth"
          price="99"
          recommended
          features={[
            "Up to 1,500 enriched leads/mo",
            "Direct email sending & automation",
            "Hyper-personalized AI sequences",
            "Advanced multi-channel analytics",
            "Priority human support",
            "Custom webhooks"
          ]}
          link="https://buy.stripe.com/test_growth_link"
        />
      </div>

      <div className="bg-primary-900/10 border border-primary-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="p-3 bg-primary-500/20 rounded-full text-primary-400">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="font-bold text-lg">Need a custom agency plan?</h4>
            <p className="text-sm text-gray-400">We offer fully managed outreach for high-growth teams.</p>
          </div>
        </div>
        <button className="whitespace-nowrap px-6 py-2 border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-bold rounded-lg transition-all">
          Contact Sales
        </button>
      </div>
    </div>
  );
};

export default Billing;
