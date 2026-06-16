// UI COMPONENTS - Marketing & Administrative Interfaces

export const MarketingHubTemplate = {
  marketingTemplateOptions: [
    { id: "mt-1", name: "Express Entry Tech Draw Campaign", category: "Email" },
    { id: "mt-2", name: "Subclass 189 Invitation Round Notice", category: "LinkedIn" },
    { id: "mt-3", name: "SUV Entrepreneurial Venture Lead-Gen", category: "Meta Ads" },
    { id: "mt-4", name: "LMIA Employer Support Program", category: "Email" },
    { id: "mt-5", name: "PNP Provincial Nomination Alert", category: "LinkedIn" }
  ],
  platformOptions: [
    { id: "email", label: "📧 Email Client", icon: "Mail" },
    { id: "linkedin", label: "🔗 LinkedIn", icon: "Linkedin" },
    { id: "facebook", label: "📱 Meta Ads", icon: "Facebook" },
    { id: "twitter", label: "𝕏 Twitter/X", icon: "Twitter" },
    { id: "instagram", label: "📸 Instagram", icon: "Instagram" }
  ]
};

export const UserManagementTemplate = {
  roleOptions: [
    "Administrator",
    "Senior Case Officer",
    "Case Officer",
    "RCIC/MARA Agent",
    "Administrative Assistant",
    "Compliance Officer",
    "Billing Manager"
  ],
  accessLevelOptions: [
    "Full System Access",
    "Assigned Files Only",
    "Read & Draft",
    "Read Only",
    "Finance Module Only",
    "Compliance Module Only"
  ],
  seatTiers: [
    { tier: "solo-practitioner", name: "Solo Practitioner", seats: 1, price: 19 },
    { tier: "small-firm", name: "Small Firm (5 Seats)", seats: 5, price: 49 },
    { tier: "pro-firm", name: "Professional Firm (20 Seats)", seats: 20, price: 99 },
    { tier: "enterprise", name: "Enterprise (Unlimited)", seats: "Unlimited", price: "Custom" }
  ]
};

export const ComplianceModuleTemplate = {
  auditCategories: [
    "Case Management",
    "Document Upload",
    "Payment Processing",
    "User Access",
    "E-Signature",
    "Marketing Campaign",
    "System Configuration"
  ],
  retentionPolicy: {
    cicc: 2555, // 7 years
    omara: 2555  // 7 years
  }
};

// ==================== MARKETING HUB JSX ====================

export function MarketingHubTabContent({
  activeTab,
  marketingTemplateId,
  setMarketingTemplateId,
  marketingTemplateBody,
  setMarketingTemplateBody,
  selectedMarketingPlatform,
  setSelectedMarketingPlatform,
  marketingPosts,
  handleTriggerMarketingCampaign,
  socialLinked,
  setSocialLinked,
  theme,
  cardBgClass,
  inputClass,
  TRANSLATIONS,
  lang
}) {
  if (activeTab !== 'ai-marketing-hub') return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <Share2 className="text-cyan-400" />
          AI Marketing Suite & Social Center
        </h2>
        <p className="text-xs text-slate-400 font-sans">Draft advertisements, coordinate social profiles, and generate AI posts instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI Generator Setup */}
        <div className={`p-6 rounded-2xl border ${cardBgClass} space-y-4 h-fit`}>
          <h3 className="font-extrabold text-sm text-slate-200">Mira AI Post Generator</h3>
          
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Campaign Template</label>
              <select 
                value={marketingTemplateId} 
                onChange={(e) => setMarketingTemplateId(e.target.value)}
                className={`w-full p-2.5 rounded-xl text-xs border ${inputClass}`}
              >
                {MarketingHubTemplate.marketingTemplateOptions.map(tpl => (
                  <option key={tpl.id} value={tpl.id}>{tpl.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Dispatch Platform</label>
              <select 
                value={selectedMarketingPlatform} 
                onChange={(e) => setSelectedMarketingPlatform(e.target.value)}
                className={`w-full p-2.5 rounded-xl text-xs border ${inputClass}`}
              >
                {MarketingHubTemplate.platformOptions.map(plat => (
                  <option key={plat.id} value={plat.id}>{plat.label}</option>
                ))}
              </select>
            </div>

            <div className="pt-2 border-t border-slate-700 space-y-2">
              <h4 className="text-[10px] font-bold text-slate-300 uppercase">Social Integrations</h4>
              <div className="space-y-2">
                {[
                  { key: 'facebook', label: '📱 Facebook', icon: Facebook },
                  { key: 'linkedin', label: '🔗 LinkedIn', icon: Linkedin },
                  { key: 'twitter', label: '𝕏 Twitter', icon: Twitter },
                  { key: 'instagram', label: '📸 Instagram', icon: Instagram }
                ].map(social => (
                  <label key={social.key} className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-800">
                    <input 
                      type="checkbox" 
                      checked={socialLinked[social.key] || false}
                      onChange={(e) => setSocialLinked({...socialLinked, [social.key]: e.target.checked})}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-xs text-slate-300">{social.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Preview & Editor */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${cardBgClass} space-y-4`}>
          <div className="border-b border-slate-700 pb-3">
            <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-400" />
              Campaign Message Preview
            </h3>
          </div>

          <form onSubmit={handleTriggerMarketingCampaign} className="space-y-3">
            <textarea 
              value={marketingTemplateBody}
              onChange={(e) => setMarketingTemplateBody(e.target.value)}
              placeholder="AI-generated message preview... (Edit as needed)"
              className={`w-full p-3 rounded-xl text-xs border ${inputClass} min-h-[120px] font-mono`}
            />
            
            <div className="flex gap-2">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 shadow">
                <Send size={13} />
                Launch Campaign
              </button>
              <button type="button" className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2.5 rounded-lg">
                Preview on Platform
              </button>
            </div>
          </form>

          {/* Recent Campaigns */}
          <div className="pt-4 border-t border-slate-700 space-y-3 max-h-[200px] overflow-y-auto">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase">Recent Dispatches</h4>
            {marketingPosts.map(post => (
              <div key={post.id} className="p-3 rounded-lg bg-slate-900/30 border border-slate-700 space-y-1">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-slate-400">{post.date}</span>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded">{post.platform}</span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">{post.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== USER MANAGEMENT JSX ====================

export function UserManagementTabContent({
  activeTab,
  usersList,
  setUsersList,
  newUserName,
  setNewUserName,
  newUserEmail,
  setNewUserEmail,
  newUserRole,
  setNewUserRole,
  newUserAccess,
  setNewUserAccess,
  handleAddUserSeat,
  theme,
  cardBgClass,
  inputClass,
  Trash2,
  Plus
}) {
  if (activeTab !== 'user-management') return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <Users className="text-indigo-400" />
          User & Admin Desk
        </h2>
        <p className="text-xs text-slate-400 font-sans">Manage team seats, roles, and access permissions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Add User Form */}
        <div className={`p-6 rounded-2xl border ${cardBgClass} space-y-4`}>
          <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
            <Plus size={16} className="text-indigo-400" />
            Allocate New Seat License
          </h3>

          <form onSubmit={handleAddUserSeat} className="space-y-3">
            <input 
              type="text"
              placeholder="Full Name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              required
              className={`w-full p-2.5 rounded-lg text-xs border ${inputClass}`}
            />
            
            <input 
              type="email"
              placeholder="Email Address"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              required
              className={`w-full p-2.5 rounded-lg text-xs border ${inputClass}`}
            />

            <select 
              value={newUserRole} 
              onChange={(e) => setNewUserRole(e.target.value)}
              className={`w-full p-2.5 rounded-lg text-xs border ${inputClass}`}
            >
              {UserManagementTemplate.roleOptions.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <select 
              value={newUserAccess} 
              onChange={(e) => setNewUserAccess(e.target.value)}
              className={`w-full p-2.5 rounded-lg text-xs border ${inputClass}`}
            >
              {UserManagementTemplate.accessLevelOptions.map(access => (
                <option key={access} value={access}>{access}</option>
              ))}
            </select>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 rounded-lg">
              Create User & Send Invite
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className={`p-6 rounded-2xl border ${cardBgClass} space-y-4`}>
          <h3 className="font-extrabold text-sm text-slate-200">Active Team Members</h3>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {usersList.map(user => (
              <div key={user.id} className="p-3 rounded-lg bg-slate-900/30 border border-slate-700 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-xs text-slate-200">{user.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{user.email}</p>
                  <div className="flex gap-1 mt-1.5">
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-mono">{user.role}</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono">{user.status}</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-1">{user.accessLevel}</p>
                </div>
                <button className="text-slate-500 hover:text-red-400 transition-colors p-1 flex-shrink-0">
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Seat Configuration */}
      <div className={`p-6 rounded-2xl border ${cardBgClass} space-y-4`}>
        <h3 className="font-extrabold text-sm text-slate-200">Subscription & Seat Management</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {UserManagementTemplate.seatTiers.map(tier => (
            <div key={tier.tier} className="p-4 rounded-lg border border-slate-700 bg-slate-900/30 space-y-2 text-xs text-center">
              <p className="font-bold text-slate-200">{tier.name}</p>
              <p className="text-2xl font-extrabold text-indigo-400">${typeof tier.price === 'number' ? tier.price : tier.price}/mo</p>
              <p className="text-slate-400">{typeof tier.seats === 'number' ? `${tier.seats} Seats` : tier.seats}</p>
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-1.5 rounded font-bold text-[10px] mt-2">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== COMPLIANCE & AUDIT JSX ====================

export function ComplianceTabContent({
  activeTab,
  isCompilingAudit,
  complianceSignature,
  handleCompileAuditPackage,
  auditLogs,
  theme,
  cardBgClass,
  rcicNumber,
  countryContext,
  activeCase,
  paymentHistory,
  companyName
}) {
  if (activeTab !== 'compliance') return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <ShieldCheck className="text-emerald-400" />
          Audit & Security Vault
        </h2>
        <p className="text-xs text-slate-400 font-sans">7-Year immutable record compilation with cryptographic signatures.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Audit Compilation */}
        <div className={`lg:col-span-1 p-6 rounded-2xl border ${cardBgClass} space-y-4`}>
          <h3 className="font-extrabold text-sm text-slate-200">Compliance Audit Generator</h3>

          <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-4 rounded-xl border border-emerald-500/25 space-y-3">
            <p className="text-[10px] font-mono text-slate-400">
              {countryContext === 'CAN' 
                ? `CICC Certification: ${rcicNumber}` 
                : `OMARA Registration: 1912345`}
            </p>
            
            <div>
              <label className="text-[10px] font-bold text-slate-300 uppercase">7-Year Package Status</label>
              <div className="mt-2 p-2 rounded bg-slate-900/50 border border-slate-700">
                {complianceSignature ? (
                  <p className="text-[9px] font-mono text-emerald-400 break-all">{complianceSignature}</p>
                ) : (
                  <p className="text-[10px] text-slate-400 italic">Awaiting compilation...</p>
                )}
              </div>
            </div>

            <button 
              onClick={() => handleCompileAuditPackage(activeCase, paymentHistory, companyName, rcicNumber, countryContext)}
              disabled={isCompilingAudit}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-2"
            >
              {isCompilingAudit ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  Compiling...
                </>
              ) : (
                <>
                  <Database size={13} />
                  Generate Audit Package
                </>
              )}
            </button>
          </div>

          <div className="pt-4 border-t border-slate-700 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Audit Categories</p>
            <div className="space-y-1">
              {ComplianceModuleTemplate.auditCategories.map(cat => (
                <div key={cat} className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-[10px] text-slate-400">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Logs Timeline */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${cardBgClass} space-y-4`}>
          <h3 className="font-extrabold text-sm text-slate-200">Immutable Activity Log</h3>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {auditLogs.map((log, idx) => (
              <div key={log.id} className="p-3 rounded-lg border border-slate-700 bg-slate-900/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xs text-slate-200">{log.action}</p>
                  <span className="text-[9px] font-mono text-slate-500">{log.timestamp}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-mono">{log.actor}</span>
                </div>
                <p className="text-[10px] text-slate-400 italic">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retention Policy Info */}
      <div className={`p-6 rounded-2xl border ${cardBgClass} bg-gradient-to-r from-slate-900/50 to-slate-800/50`}>
        <h3 className="font-extrabold text-sm text-slate-200 mb-3">Data Retention Policy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <p className="font-bold text-indigo-400">🇨🇦 CICC Compliance</p>
            <p className="text-slate-400">{ComplianceModuleTemplate.retentionPolicy.cicc / 365} years minimum record retention required by College of Immigration and Citizenship Consultants.</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-cyan-400">🇦🇺 OMARA Compliance</p>
            <p className="text-slate-400">{ComplianceModuleTemplate.retentionPolicy.omara / 365} years minimum record retention required under Office of Migration Agents Registration Authority.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export all components
export {
  MarketingHubTemplate,
  UserManagementTemplate,
  ComplianceModuleTemplate
};
