import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Users, Briefcase, CheckSquare, ShieldCheck, FileText, DollarSign, Calendar, 
  MessageSquare, UserCheck, ShieldAlert, Award, ChevronRight, Settings, Plus, 
  Check, Search, ArrowRight, Upload, Lock, Clock, FileCheck, Eye, Sparkles, 
  Send, Volume2, User, RefreshCw, PhoneCall, PhoneOff, CheckCircle2, AlertTriangle, 
  Layers, HardDrive, Cpu, HelpCircle, FileSignature, Database, FileDown, Sun, Moon, 
  Globe, MessageCircle, Landmark, Bell, BadgeAlert, Sparkle, Trash2, Filter, Activity,
  Sliders, ArrowUpRight, Copy, Mail, CalendarDays, ClipboardCheck, CheckCircle, RefreshCcw,
  Link, Video, CheckSquare2, Share2, Facebook, Twitter, Instagram, Linkedin, PlusCircle,
  TrendingUp, Zap, MapPin, Users2, BookOpen, Target, BarChart3, PieChart, LineChart,
  AlertCircle, HelpCircleIcon, Loader, X, Save, Cancel
} from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// ==================== DATA CONSTANTS ====================

const CANADA_PROGRAMS = {
  "CAN-EE-FSW": {
    code: "CAN-EE-FSW",
    name: "Federal Skilled Worker (Express Entry)",
    baseFee: 4500,
    spouseFee: 1500,
    childFee: 500,
    minFee: 3500,
    maxFee: 7500,
    currency: "CAD",
    installments: 3,
    milestones: ["Retainer Execution Deposit", "ECA Verification Review", "Final Application Submission"]
  },
  "CAN-PNP-OINP": {
    code: "CAN-PNP-OINP",
    name: "Ontario Nominee Program (OINP)",
    baseFee: 5000,
    spouseFee: 2000,
    childFee: 750,
    minFee: 4500,
    maxFee: 9000,
    currency: "CAD",
    installments: 4,
    milestones: ["Retainer Deposit Check", "OINP Filing & Nomination", "Credentials Verification", "PR Portal Submission"]
  },
  "CAN-LMIA-SYS": {
    code: "CAN-LMIA-SYS",
    name: "Labour Market Impact Assessment (LMIA)",
    baseFee: 6500,
    spouseFee: 0,
    childFee: 0,
    minFee: 5000,
    maxFee: 10000,
    currency: "CAD",
    installments: 2,
    milestones: ["Employer Intake Assessment", "ESD Filing Submission"]
  },
  "CAN-ENT-SUV": {
    code: "CAN-ENT-SUV",
    name: "Start-Up Visa (SUV Entrepreneur)",
    baseFee: 25000,
    spouseFee: 5000,
    childFee: 1500,
    minFee: 20000,
    maxFee: 45000,
    currency: "CAD",
    installments: 5,
    milestones: ["Agreement Signing", "Business Concept Validation", "Letter of Support Issuance", "PR Portal Filing"]
  }
};

const AUSTRALIA_PROGRAMS = {
  "AUS-189-SKILLED": {
    code: "AUS-189-SKILLED",
    name: "Skilled Independent Visa (Subclass 189)",
    baseFee: 5200,
    spouseFee: 1900,
    childFee: 600,
    minFee: 4200,
    maxFee: 8500,
    currency: "AUD",
    installments: 3,
    milestones: ["Retainer Execution Payment", "Skills Assessment Authority Lodgement", "DHA SkillSelect EOI Filing"]
  },
  "AUS-190-NOMINATED": {
    code: "AUS-190-NOMINATED",
    name: "Skilled Nominated Visa (Subclass 190)",
    baseFee: 5800,
    spouseFee: 2200,
    childFee: 750,
    minFee: 4800,
    maxFee: 9500,
    currency: "AUD",
    installments: 4,
    milestones: ["Retainer Signing", "State Nomination Filing", "Skills Verification", "DHA Application"]
  },
  "AUS-188-BIZ": {
    code: "AUS-188-BIZ",
    name: "Business Innovation & Investment (Subclass 188)",
    baseFee: 18000,
    spouseFee: 4000,
    childFee: 1000,
    minFee: 15000,
    maxFee: 30000,
    currency: "AUD",
    installments: 4,
    milestones: ["Initial Retainer Contract", "Business Asset Valuation", "State Sponsor Nomination", "DHA Application Lodge"]
  }
};

const PIPELINE_STAGES = [
  "New Leads",
  "AI Analysis",
  "Agent Review",
  "Agreement Issued"
];

const INITIAL_LEADS = [
  {
    id: "lead-1",
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "sarah.jenkins@techcorp.io",
    phone: "+1 (416) 555-0182",
    age: 27,
    citizenship: "United Kingdom",
    currentStatus: "Worker",
    educationLevel: "Masters",
    clbScore: 10,
    proofOfFunds: 18500,
    proofOfFundsRequired: 14000,
    maritalStatus: "Single",
    accompanyingSpouse: false,
    childrenCount: 0,
    creationSource: "Webform Core",
    score: 94,
    stage: "AI Analysis",
    countryContext: "CAN",
    netWorth: 150000,
    hasJobOffer: true
  },
  {
    id: "lead-2",
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.s@cloudventures.com",
    phone: "+91 98110 54321",
    age: 33,
    citizenship: "India",
    currentStatus: "Worker",
    educationLevel: "Bachelors_Double",
    clbScore: 9,
    proofOfFunds: 21000,
    proofOfFundsRequired: 14000,
    maritalStatus: "Married",
    accompanyingSpouse: true,
    childrenCount: 2,
    creationSource: "Mira Voice Desk",
    score: 82,
    stage: "Agent Review",
    countryContext: "CAN",
    netWorth: 350000,
    hasJobOffer: false
  },
  {
    id: "lead-3",
    firstName: "Chloe",
    lastName: "Dupont",
    email: "chloe.dupont@parismail.fr",
    phone: "+33 6 1234 5678",
    age: 29,
    citizenship: "France",
    currentStatus: "Student",
    educationLevel: "Masters",
    clbScore: 10,
    proofOfFunds: 28000,
    proofOfFundsRequired: 18000,
    maritalStatus: "Married",
    accompanyingSpouse: true,
    childrenCount: 1,
    creationSource: "WhatsApp Bot",
    score: 88,
    stage: "New Leads",
    countryContext: "AUS",
    netWorth: 500000,
    hasJobOffer: false
  }
];

const INITIAL_NEWS = [
  { id: "news-1", date: "Today", country: "CAN", title: "IRCC General Express Entry Draw Target Drops to 512", text: "Latest general cutoff score has reduced. Healthcare and STEM specific rounds are scheduled for tomorrow.", source: "IRCC Gazette" },
  { id: "news-2", date: "Yesterday", country: "AUS", title: "Subclass 189 State Priority Allocation Updated", text: "Department of Home Affairs issues state nomination allocation quotas prioritizing advanced engineering and software.", source: "OMARA Board Notice" },
  { id: "news-3", date: "June 10, 2026", country: "CAN", title: "French-Speaking Skilled Worker PNP Stream Active", text: "Ontario Immigrant Nominee Program targeted draw issued for active profiles with French proficiency indexes.", source: "OINP Registry" }
];

const INITIAL_DISCUSSIONS = [
  {
    id: "disc-1",
    author: "RCIC Ram Babbar (Admin)",
    registration: "R515758",
    date: "Today, 09:12 AM",
    country: "CAN",
    subject: "Proof of Funds via Digital Currency Accounts",
    body: "Does anyone have success with IRCC accepting converted digital asset statements? I've seen standard queries asking for rigorous 6-month transaction trails demonstrating source tracking.",
    replies: [
      { author: "RCIC Jean-Marc", registration: "R612934", text: "I suggest converting to fiat and holding in a classic banking account for 6 months minimum. It avoids compliance audit issues entirely." }
    ]
  },
  {
    id: "disc-2",
    author: "MARA Agent O'Connor",
    registration: "M1912345",
    date: "Yesterday",
    country: "AUS",
    subject: "Subclass 186 Sponsor Financial Sufficiency",
    body: "Seeing heavy administrative queries regarding startup cash flows when sponsoring candidates under temporary to permanent paths. Anyone else?",
    replies: []
  }
];

const INITIAL_JOBS = [
  { id: "job-1", title: "Senior Case Writer (Remote Contract)", firm: "Global Path Group Inc.", remuneration: "$45 - $60 / hour", hours: "Contract", location: "Toronto / Hybrid", requirements: "Drafting OINP employer statements and Express Entry profile audits." },
  { id: "job-2", title: "Registered Advisor (Legal Specialist)", firm: "Aussie Bound Experts", remuneration: "$95,000 - $110,000 / yr", hours: "Full Time", location: "Melbourne / Hybrid", requirements: "OMARA certified adviser with active professional indemnity coverage." }
];

// ==================== ERROR BOUNDARY ====================

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-950 text-red-200 border border-red-500 rounded-2xl m-4 space-y-4">
          <h2 className="text-xl font-black">Something went wrong inside the CRM interface.</h2>
          <pre className="text-xs font-mono bg-red-900/50 p-4 rounded-xl overflow-auto">{this.state.error?.toString()}</pre>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
          >
            Refresh Core System
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==================== MAIN COMPONENT ====================

export default function CRMHUBPortal() {
  const { getToken, userId } = useAuth();
  const [theme, setTheme] = useState('dark');
  const [countryContext, setCountryContext] = useState('CAN');
  const [activeTab, setActiveTab] = useState('control-tower');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [discussions, setDiscussions] = useState(INITIAL_DISCUSSIONS);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [news, setNews] = useState(INITIAL_NEWS);

  const [notifications, setNotifications] = useState([
    { id: "notif-1", type: "STRIPE", text: "Stripe Webhook Resolved: Deposit $2,500 received from Sarah Jenkins", time: "Just now", status: "success" },
    { id: "notif-2", type: "MIRA OCR", text: "OCR scanned Passport bio page (99.8% precision rate)", time: "5m ago", status: "success" }
  ]);

  const currentPrograms = useMemo(() => {
    return countryContext === 'CAN' ? CANADA_PROGRAMS : AUSTRALIA_PROGRAMS;
  }, [countryContext]);

  const [selectedProgCode, setSelectedProgCode] = useState('CAN-EE-FSW');

  useEffect(() => {
    setSelectedProgCode(countryContext === 'CAN' ? 'CAN-EE-FSW' : 'AUS-189-SKILLED');
  }, [countryContext]);

  // CRS Calculator (Canada)
  const [crsAge, setCrsAge] = useState(28);
  const [crsEdu, setCrsEdu] = useState("Masters");
  const [crsLangL, setCrsLangL] = useState(9);
  const [crsLangR, setCrsLangR] = useState(9);
  const [crsLangW, setCrsLangW] = useState(9);
  const [crsLangS, setCrsLangS] = useState(9);
  const [crsExpCan, setCrsExpCan] = useState(2);
  const [crsExpFor, setCrsExpFor] = useState(3);
  const [crsSpouseMod, setCrsSpouseMod] = useState(false);
  const [crsPnpMod, setCrsPnpMod] = useState(false);
  const [netWorth, setNetWorth] = useState(150000);

  // GSM Calculator (Australia)
  const [gsmAge, setGsmAge] = useState(28);
  const [gsmLang, setGsmLang] = useState("Superior");
  const [gsmExpAus, setGsmExpAus] = useState(1);
  const [gsmExpFor, setGsmExpFor] = useState(3);
  const [gsmEdu, setGsmEdu] = useState("Doctorate");
  const [gsmSponsor, setGsmSponsor] = useState("StateNominated");

  const calculatedCrsScore = useMemo(() => {
    let pts = 0;
    if (crsAge >= 20 && crsAge <= 29) pts += 110;
    else if (crsAge === 30) pts += 105;
    else pts += 70;

    if (crsEdu === "Masters") pts += 135;
    else if (crsEdu === "PhD") pts += 150;
    else pts += 120;

    const langSum = (parseInt(crsLangL) + parseInt(crsLangR) + parseInt(crsLangW) + parseInt(crsLangS)) * 8;
    pts += Math.min(langSum, 136);

    if (crsExpCan >= 2) pts += 46;
    else if (crsExpCan === 1) pts += 40;
    if (crsExpFor >= 3) pts += 25;

    if (crsPnpMod) pts += 600;
    if (crsSpouseMod) pts += 10;

    return Math.min(pts, 1200);
  }, [crsAge, crsEdu, crsLangL, crsLangR, crsLangW, crsLangS, crsExpCan, crsExpFor, crsSpouseMod, crsPnpMod]);

  const calculatedGsmScore = useMemo(() => {
    let pts = 0;
    if (gsmAge >= 18 && gsmAge <= 24) pts += 25;
    else if (gsmAge >= 25 && gsmAge <= 32) pts += 30;
    else pts += 20;

    if (gsmLang === "Superior") pts += 20;
    else if (gsmLang === "Proficient") pts += 10;

    if (gsmExpAus >= 1) pts += 5;
    if (gsmExpFor >= 3) pts += 5;

    if (gsmEdu === "Doctorate") pts += 20;
    else if (gsmEdu === "Masters") pts += 15;

    if (gsmSponsor !== "None") pts += 15;

    return pts;
  }, [gsmAge, gsmLang, gsmExpAus, gsmExpFor, gsmEdu, gsmSponsor]);

  const bgClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  const cardClass = theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${bgClass}`}>
        {/* Header */}
        <header className={`border-b ${cardClass} sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CRMHUB // EasyCase
              </h1>
              <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                Immigration Practice Suite
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCountryContext(countryContext === 'CAN' 🇨🇦 🇦🇺')}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
              >
                {countryContext === 'CAN' ? '🇨🇦 Canada' : '🇦🇺 Australia'}
              </button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-lg ${cardClass}`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* Compliance Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <ShieldCheck size={20} />
            <div>
              <strong>HIGH-COMPLIANCE PROTOCOLS ENABLED</strong>
              <p className="text-sm text-blue-100">
                {countryContext === 'CAN' 
                  ? 'CICC Regulated. RCIC R515758. 7-Year Audit Log Active.'
                  : 'OMARA Regulated. MARN 1912345. Trust Ledger Active.'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`border-b ${cardClass}`}>
          <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto">
            {[
              { id: 'control-tower', label: '📊 Control Tower', icon: BarChart3 },
              { id: 'pipeline', label: '📈 Pipeline', icon: TrendingUp },
              { id: 'calculator', label: '🧮 Assessment', icon: Cpu },
              { id: 'discussions', label: '💬 Discussions', icon: MessageSquare },
              { id: 'jobs', label: '💼 Jobs Board', icon: Briefcase }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 border-b-2 font-semibold text-sm transition-all ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : `border-transparent ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className={`relative ${cardClass} border rounded-lg shadow-lg`}>
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search cases, leads, documents, or ask Mira AI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${cardClass} border`}
              />
            </div>
          </div>

          {/* Control Tower Tab */}
          {activeTab === 'control-tower' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Active Cases', value: '12', icon: Briefcase, color: 'blue' },
                  { label: 'Pipeline Leads', value: '24', icon: Users, color: 'green' },
                  { label: 'Total Revenue', value: '$142,500', icon: DollarSign, color: 'purple' },
                  { label: 'Approval Rate', value: '94%', icon: CheckCircle2, color: 'orange' }
                ].map((metric, idx) => (
                  <div key={idx} className={`${cardClass} border rounded-lg p-6 shadow-lg`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-semibold text-gray-500">{metric.label}</h3>
                      <metric.icon size={24} className={`text-${metric.color}-600`} />
                    </div>
                    <p className="text-3xl font-bold">{metric.value}</p>
                    <p className="text-xs text-gray-500 mt-2">↑ 12% from last month</p>
                  </div>
                ))}
              </div>

              {/* Leads Pipeline */}
              <div className={`${cardClass} border rounded-lg p-6 shadow-lg`}>
                <h2 className="text-2xl font-bold mb-6">Recent Leads Pipeline</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">AI Score</th>
                        <th className="text-left py-3 px-4">Stage</th>
                        <th className="text-left py-3 px-4">Country</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-700/50 cursor-pointer`}>
                          <td className="py-3 px-4 font-semibold">{lead.firstName} {lead.lastName}</td>
                          <td className="py-3 px-4 text-gray-400">{lead.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              lead.score >= 85 ? 'bg-green-900 text-green-200' :
                              lead.score >= 75 ? 'bg-yellow-900 text-yellow-200' :
                              'bg-red-900 text-red-200'
                            }`}>
                              {lead.score}/100
                            </span>
                          </td>
                          <td className="py-3 px-4">{lead.stage}</td>
                          <td className="py-3 px-4">
                            <span className="text-xs font-semibold bg-blue-900 text-blue-200 px-2 py-1 rounded">
                              {lead.countryContext === 'CAN' ? '🇨🇦' : '🇦🇺'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notifications */}
              <div className={`${cardClass} border rounded-lg p-6 shadow-lg`}>
                <h2 className="text-2xl font-bold mb-4">System Notifications</h2>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`p-4 rounded-lg border-l-4 ${
                      notif.status === 'success' ? 'bg-green-900/20 border-green-600' : 'bg-blue-900/20 border-blue-600'
                    }`}>
                      <p className="text-sm font-semibold">{notif.type}</p>
                      <p className="text-xs text-gray-300 mt-1">{notif.text}</p>
                      <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Pipeline Tab */}
          {activeTab === 'pipeline' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Lead Pipeline Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {PIPELINE_STAGES.map((stage) => {
                  const stageLeads = leads.filter(l => l.stage === stage);
                  return (
                    <div key={stage} className={`${cardClass} border rounded-lg p-6 shadow-lg`}>
                      <h3 className="font-bold mb-4 text-lg">{stage}</h3>
                      <p className="text-3xl font-bold text-blue-600">{stageLeads.length}</p>
                      <p className="text-xs text-gray-500 mt-2">Leads in stage</p>
                      <div className="mt-4 space-y-2">
                        {stageLeads.slice(0, 3).map((lead) => (
                          <div key={lead.id} className="text-xs p-2 bg-gray-700/50 rounded cursor-pointer hover:bg-gray-700">
                            {lead.firstName} {lead.lastName}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Assessment Calculator Tab */}
          {activeTab === 'calculator' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Immigration Assessment Calculator</h2>
              
              {countryContext === 'CAN' ? (
                // CRS Calculator
                <div className={`${cardClass} border rounded-lg p-8 shadow-lg space-y-6`}>
                  <h3 className="text-2xl font-bold">Canada CRS Score Calculator</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Age</label>
                      <input
                        type="range"
                        min="20"
                        max="55"
                        value={crsAge}
                        onChange={(e) => setCrsAge(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-400 mt-1">{crsAge} years</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Education</label>
                      <select
                        value={crsEdu}
                        onChange={(e) => setCrsEdu(e.target.value)}
                        className={`w-full p-2 rounded-lg border ${cardClass}`}
                      >
                        <option value="Bachelors">Bachelor's Degree</option>
                        <option value="Masters">Master's Degree</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">CLB Speaking</label>
                      <input
                        type="range"
                        min="0"
                        max="12"
                        value={crsLangS}
                        onChange={(e) => setCrsLangS(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-400 mt-1">Level {crsLangS}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">CLB Reading</label>
                      <input
                        type="range"
                        min="0"
                        max="12"
                        value={crsLangR}
                        onChange={(e) => setCrsLangR(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-400 mt-1">Level {crsLangR}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">CLB Writing</label>
                      <input
                        type="range"
                        min="0"
                        max="12"
                        value={crsLangW}
                        onChange={(e) => setCrsLangW(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-400 mt-1">Level {crsLangW}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">CLB Listening</label>
                      <input
                        type="range"
                        min="0"
                        max="12"
                        value={crsLangL}
                        onChange={(e) => setCrsLangL(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-400 mt-1">Level {crsLangL}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Canadian Work Experience (Years)</label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={crsExpCan}
                        onChange={(e) => setCrsExpCan(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-400 mt-1">{crsExpCan} years</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Foreign Work Experience (Years)</label>
                      <input
                        type="range"
                        min="0"
                        max="15"
                        value={crsExpFor}
                        onChange={(e) => setCrsExpFor(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-400 mt-1">{crsExpFor} years</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Net Worth ($)</label>
                      <input
                        type="number"
                        value={netWorth}
                        onChange={(e) => setNetWorth(parseInt(e.target.value))}
                        className={`w-full p-2 rounded-lg border ${cardClass}`}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 flex-wrap pt-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={crsPnpMod}
                        onChange={(e) => setCrsPnpMod(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">PNP Nomination (+600 pts)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={crsSpouseMod}
                        onChange={(e) => setCrsSpouseMod(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Spouse Language Skills</span>
                    </label>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    <p className="text-sm text-blue-100 mb-2">YOUR TOTAL CRS SCORE</p>
                    <p className="text-5xl font-black text-white">{calculatedCrsScore}</p>
                    <p className="text-xs text-blue-100 mt-2">Out of 1,200 possible points</p>
                    <p className="text-xs text-blue-100 mt-4">
                      {calculatedCrsScore >= 450 ? '✅ Eligible for Express Entry' : '⚠️ Below current cutoff - consider PNP route'}
                    </p>
                  </div>
                </div>
              ) : (
                // GSM Calculator
                <div className={`${cardClass} border rounded-lg p-8 shadow-lg space-y-6`}>
                  <h3 className="text-2xl font-bold">Australia GSM Score Calculator</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Age</label>
                      <input
                        type="range"
                        min="18"
                        max="60"
                        value={gsmAge}
                        onChange={(e) => setGsmAge(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-400 mt-1">{gsmAge} years</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">English Proficiency</label>
                      <select
                        value={gsmLang}
                        onChange={(e) => setGsmLang(e.target.value)}
                        className={`w-full p-2 rounded-lg border ${cardClass}`}
                      >
                        <option value="Competent">Competent (IELTS 6.0)</option>
                        <option value="Proficient">Proficient (IELTS 7.0)</option>
                        <option value="Superior">Superior (IELTS 8.0+)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Qualification</label>
                      <select
                        value={gsmEdu}
                        onChange={(e) => setGsmEdu(e.target.value)}
                        className={`w-full p-2 rounded-lg border ${cardClass}`}
                      >
                        <option value="Bachelors">Bachelor's Degree</option>
                        <option value="Masters">Master's Degree</option>
                        <option value="Doctorate">Doctorate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Australian Work Experience (Years)</label>
                      <input
                        type="range"
                        min="0"
                        max="15"
                        value={gsmExpAus}
                        onChange={(e) => setGsmExpAus(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-400 mt-1">{gsmExpAus} years</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Overseas Work Experience (Years)</label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={gsmExpFor}
                        onChange={(e) => setGsmExpFor(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-400 mt-1">{gsmExpFor} years</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Sponsorship Type</label>
                      <select
                        value={gsmSponsor}
                        onChange={(e) => setGsmSponsor(e.target.value)}
                        className={`w-full p-2 rounded-lg border ${cardClass}`}
                      >
                        <option value="None">None (189 Independent)</option>
                        <option value="StateNominated">State Nominated (190)</option>
                        <option value="Regional">Regional Sponsored (491)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    <p className="text-sm text-blue-100 mb-2">YOUR TOTAL GSM SCORE</p>
                    <p className="text-5xl font-black text-white">{calculatedGsmScore}</p>
                    <p className="text-xs text-blue-100 mt-2">Out of 100 possible points</p>
                    <p className="text-xs text-blue-100 mt-4">
                      {calculatedGsmScore >= 65 ? '✅ Likely to receive invitation' : '⚠️ Below typical invitation threshold'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Discussions Tab */}
          {activeTab === 'discussions' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Agent Discussion Forum</h2>
              {discussions.map((disc) => (
                <div key={disc.id} className={`${cardClass} border rounded-lg p-6 shadow-lg`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{disc.subject}</h3>
                      <p className="text-xs text-gray-400">{disc.author} • {disc.registration}</p>
                      <p className="text-xs text-gray-500">{disc.date} • {disc.country === 'CAN' ? '🇨🇦 Canada' : '🇦🇺 Australia'}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-4">{disc.body}</p>
                  {disc.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-600 space-y-3">
                      {disc.replies.map((reply, idx) => (
                        <div key={idx} className="text-xs">
                          <p className="font-semibold">{reply.author} ({reply.registration})</p>
                          <p className="text-gray-300 mt-1">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="mt-4 text-blue-600 text-sm font-semibold hover:text-blue-500">
                    Reply to Discussion →
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Immigration Jobs Board</h2>
              <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => (
                  <div key={job.id} className={`${cardClass} border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{job.title}</h3>
                        <p className="text-sm text-gray-400">{job.firm}</p>
                      </div>
                      <span className="text-lg font-bold text-green-600">{job.remuneration}</span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={16} /> {job.hours}</span>
                    </div>
                    <p className="text-sm">{job.requirements}</p>
                    <button className="mt-4 text-blue-600 font-semibold hover:text-blue-500 text-sm">
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}
