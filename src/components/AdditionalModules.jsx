// Followups, Pricing, and Additional Administrative Modules

export function FollowupsTrackerTabContent({
  activeTab,
  followups,
  setFollowups,
  theme,
  cardBgClass,
  inputClass,
  ClipboardCheck,
  Trash2,
  triggerSystemNotification
}) {
  if (activeTab !== 'followups-tracker') return null;

  const handleAddFollowup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newFollowup = {
      id: `follow-${Date.now()}`,
      clientName: formData.get('followName'),
      reason: formData.get('followReason'),
      channel: formData.get('followChannel'),
      date: formData.get('followDate'),
      status: 'Pending',
      notes: `Outreach scheduled for ${formData.get('followDate')}`,
      createdAt: new Date().toISOString()
    };
    setFollowups([newFollowup, ...followups]);
    e.target.reset();
    triggerSystemNotification(
      "FOLLOWUP SCHEDULED",
      `Outreach reminder created for ${newFollowup.clientName}`,
      "success"
    );
  };

  const handleCompleteFollowup = (id) => {
    setFollowups(followups.map(f => 
      f.id === id ? { ...f, status: 'Completed' } : f
    ));
    triggerSystemNotification(
      "FOLLOWUP COMPLETED",
      "Outreach attempt marked as completed",
      "success"
    );
  };

  const handleDeleteFollowup = (id) => {
    setFollowups(followups.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <ClipboardCheck className="text-indigo-400" />
          Followups & Reminders Matrix
        </h2>
        <p className="text-xs text-slate-400 font-sans">Construct outreach parameters to chase missing files, payments, or client details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Follow-up Entry */}
        <div className={`p-6 rounded-2xl border ${cardBgClass} space-y-4 h-fit`}>
          <h3 className="font-extrabold text-sm text-slate-200">Schedule Alert Followup</h3>
          
          <form onSubmit={handleAddFollowup} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Client / Prospect</label>
              <input 
                name="followName" 
                type="text" 
                placeholder="e.g. Vikram Singh" 
                required 
                className={`w-full p-2.5 rounded-xl text-xs border ${inputClass}`}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Outreach Objective</label>
              <input 
                name="followReason" 
                type="text" 
                placeholder="e.g. Chase IELTS language verification report" 
                required 
                className={`w-full p-2.5 rounded-xl text-xs border ${inputClass}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Preferred Channel</label>
                <select name="followChannel" className={`w-full p-2.5 rounded-xl text-xs border ${inputClass}`}>
                  <option value="Email">Email Outcall</option>
                  <option value="WhatsApp">WhatsApp Broadcast</option>
                  <option value="Call">Direct Audio Call</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Date</label>
                <input name="followDate" type="date" required className={`w-full p-2.5 rounded-xl text-xs border ${inputClass}`} />
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 rounded-xl transition-all shadow">
              Log Outreach Reminder
            </button>
          </form>
        </div>

        {/* Followups Listing Log */}
        <div className="lg:col-span-2">
          <div className={`p-6 rounded-2xl border ${cardBgClass} space-y-4`}>
            <h3 className="font-extrabold text-sm text-slate-200">Alert Followups Log</h3>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {followups.map(item => (
                <div key={item.id} className="p-3.5 rounded-xl border border-slate-700 bg-slate-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-slate-200">{item.clientName}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{item.reason}</p>
                    <p className="text-[10px] text-slate-500 font-mono">Date target: {item.date} | Route Channel: {item.channel}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status !== 'Completed' && (
                      <button 
                        onClick={() => handleCompleteFollowup(item.id)}
                        className="text-emerald-400 hover:text-emerald-300 font-bold text-[11px] px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded"
                      >
                        Mark Done
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteFollowup(item.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== PRICING & SUBSCRIPTION CONFIG ====================

export const PricingConfigTemplate = {
  pricingTiers: [
    {
      id: 'solo',
      name: 'Solo Practitioner',
      price: 19,
      seats: 1,
      features: [
        'Personal CRM access',
        '500 contact records',
        '200 case matters',
        '2 GB cloud storage',
        'Email support'
      ]
    },
    {
      id: 'small-firm',
      name: 'Small Firm',
      price: 49,
      seats: 5,
      features: [
        '5 team seats',
        '5,000 contact records',
        '2,000 case matters',
        '10 GB cloud storage',
        'Priority email support',
        'Basic API access'
      ]
    },
    {
      id: 'pro-firm',
      name: 'Professional Firm',
      price: 99,
      seats: 20,
      features: [
        '20 team seats',
        '25,000 contact records',
        '10,000 case matters',
        '50 GB cloud storage',
        '24/7 phone support',
        'Advanced API access',
        'Custom integrations'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      seats: 'Unlimited',
      features: [
        'Unlimited team seats',
        'Unlimited records',
        'Dedicated account manager',
        'Unlimited storage',
        'Priority support',
        'Custom features',
        'On-premise deployment'
      ]
    }
  ],
  billingCycles: [
    { id: 'monthly', label: 'Monthly Billing', discount: 0 },
    { id: 'annual', label: 'Annual Billing', discount: 15 }
  ]
};

export function PricingConfigTabContent({
  activeTab,
  activePricingPackage,
  setActivePricingPackage,
  billingCycle,
  setBillingCycle,
  billingCalculations,
  theme,
  cardBgClass,
  TRANSLATIONS,
  lang,
  DollarSign,
  CheckCircle2
}) {
  if (activeTab !== 'pricing-config') return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <DollarSign className="text-emerald-400" />
          Subscription & Pricing Configuration
        </h2>
        <p className="text-xs text-slate-400 font-sans">Configure billing tiers, seat allocations, and subscription management.</p>
      </div>

      {/* Billing Cycle Selector */}
      <div className="flex items-center justify-center gap-4">
        {PricingConfigTemplate.billingCycles.map(cycle => (
          <button
            key={cycle.id}
            onClick={() => setBillingCycle(cycle.id)}
            className={`px-6 py-2.5 rounded-lg font-bold text-xs transition-all ${
              billingCycle === cycle.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cycle.label}
            {cycle.discount > 0 && <span className="ml-2 text-emerald-400">(-{cycle.discount}%)</span>}
          </button>
        ))}
      </div>

      {/* Pricing Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PricingConfigTemplate.pricingTiers.map(tier => (
          <div
            key={tier.id}
            onClick={() => setActivePricingPackage(tier.id)}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
              activePricingPackage === tier.id
                ? `border-indigo-500 ${cardBgClass} shadow-[0_0_20px_rgba(99,102,241,0.3)]`
                : `border-slate-700 ${cardBgClass} hover:border-slate-600`
            }`}
          >
            <h3 className="font-extrabold text-sm text-slate-200">{tier.name}</h3>
            
            <div className="mt-3 space-y-1">
              {typeof tier.price === 'number' ? (
                <>
                  <p className="text-3xl font-black text-indigo-400">${tier.price}</p>
                  <p className="text-[10px] text-slate-400">per month</p>
                </>
              ) : (
                <p className="text-xl font-extrabold text-indigo-400">{tier.price}</p>
              )}
              <p className="text-xs text-slate-400 mt-2 font-mono">{typeof tier.seats === 'number' ? `${tier.seats} Seat${tier.seats !== 1 ? 's' : ''}` : tier.seats}</p>
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-700 pt-4">
              {tier.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[10px] text-slate-300">{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full mt-4 py-2 rounded-lg font-bold text-xs transition-all ${
              activePricingPackage === tier.id
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}>
              {activePricingPackage === tier.id ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Billing Summary */}
      <div className={`p-6 rounded-2xl border ${cardBgClass} space-y-4`}>
        <h3 className="font-extrabold text-sm text-slate-200">Billing Summary</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-900/30 border border-slate-700 space-y-1">
            <p className="text-slate-400 font-mono">Monthly Rate</p>
            <p className="text-2xl font-black text-indigo-400">${billingCalculations.rate}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/30 border border-slate-700 space-y-1">
            <p className="text-slate-400 font-mono">Annual Total</p>
            <p className="text-2xl font-black text-emerald-400">${billingCalculations.yearly}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/30 border border-slate-700 space-y-1">
            <p className="text-slate-400 font-mono">Max Users</p>
            <p className="text-2xl font-black text-cyan-400">{billingCalculations.maxUsers}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/30 border border-slate-700 space-y-1">
            <p className="text-slate-400 font-mono">Storage Limit</p>
            <p className="text-2xl font-black text-purple-400">{billingCalculations.storage}</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/25 space-y-2">
          <p className="text-sm font-bold text-slate-200">Estimate for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
          <p className="text-xs text-slate-400">
            {billingCycle === 'annual' 
              ? `Annual commitment of $${billingCalculations.yearly} (saves ${PricingConfigTemplate.billingCycles.find(c => c.id === 'annual').discount}%)`
              : `Monthly commitment of $${billingCalculations.monthlyEquivalent}`}
          </p>
        </div>
      </div>

      {/* Add Payment Method */}
      <div className={`p-6 rounded-2xl border ${cardBgClass} space-y-4`}>
        <h3 className="font-extrabold text-sm text-slate-200">Payment Method</h3>
        
        <div className="space-y-3">
          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-700 bg-slate-900/30 cursor-pointer hover:bg-slate-900/50">
            <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
            <span className="text-xs text-slate-300">💳 Credit/Debit Card (Stripe)</span>
          </label>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-700 bg-slate-900/30 cursor-pointer hover:bg-slate-900/50">
            <input type="radio" name="payment" className="w-4 h-4" />
            <span className="text-xs text-slate-300">🏦 Bank Transfer (ACH)</span>
          </label>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-700 bg-slate-900/30 cursor-pointer hover:bg-slate-900/50">
            <input type="radio" name="payment" className="w-4 h-4" />
            <span className="text-xs text-slate-300">📧 Invoice & Net-30 Terms</span>
          </label>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 rounded-lg transition-all">
          Update Payment Method
        </button>
      </div>
    </div>
  );
}

// ==================== FORM LIBRARY & AUTO-FILLER ====================

export const FormLibraryTemplate = {
  canadaForms: [
    { id: 'ircc-app', name: 'IRCC Application for Permanent Residence', category: 'Express Entry', document: 'IMM0008' },
    { id: 'generic-app', name: 'Generic Application Form (EE-specific)', category: 'Express Entry', document: 'IMM0008E' },
    { id: 'oinp-nominee', name: 'Ontario Immigrant Nominee Program', category: 'Provincial Nominee', document: 'OINP-001' },
    { id: 'lmia-form', name: 'Labour Market Impact Assessment', category: 'Work Permit', document: 'IMM1186' },
    { id: 'suv-app', name: 'Start-Up Visa Application', category: 'Entrepreneur', document: 'IMM0008SUV' }
  ],
  australiaForms: [
    { id: '189-skilled', name: 'Skilled Independent Visa Application', category: 'Subclass 189', document: 'DHA-1200' },
    { id: '190-nominated', name: 'Skilled Nominated Visa Application', category: 'Subclass 190', document: 'DHA-1200N' },
    { id: '188-business', name: 'Business Innovation & Investment Visa', category: 'Subclass 188', document: 'DHA-1200BIZ' },
    { id: 'form80', name: 'Personal Particulars for Migration Purposes', category: 'General', document: 'Form 80' },
    { id: 'form1221', name: 'Additional Personal Particulars Information', category: 'General', document: 'Form 1221' }
  ]
};

export function FormLibraryTabContent({
  activeTab,
  countryContext,
  theme,
  cardBgClass,
  FileText,
  Download,
  Sparkles
}) {
  if (activeTab !== 'form-library') return null;

  const forms = countryContext === 'CAN' ? FormLibraryTemplate.canadaForms : FormLibraryTemplate.australiaForms;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <FileText className="text-purple-400" />
          Immigration Forms Library
        </h2>
        <p className="text-xs text-slate-400 font-sans">Access official forms, templates, and auto-fill enabled documents.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {forms.map(form => (
          <div key={form.id} className={`p-4 rounded-xl border ${cardBgClass} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-indigo-500/50 transition-all`}>
            <div className="space-y-1 flex-1">
              <h3 className="font-extrabold text-sm text-slate-200">{form.name}</h3>
              <p className="text-[10px] text-slate-400 font-mono">Document ID: {form.document}</p>
              <span className="inline-block text-[9px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full mt-1">{form.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-3 py-2 rounded-lg">
                <Download size={13} />
                Download
              </button>
              <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3 py-2 rounded-lg">
                <Sparkles size={13} />
                Auto-Fill
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export all components
export {
  FollowupsTrackerTabContent,
  PricingConfigTabContent,
  FormLibraryTabContent,
  PricingConfigTemplate,
  FormLibraryTemplate
};
