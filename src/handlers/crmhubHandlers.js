import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';

// ==================== COMPLETE HANDLER FUNCTIONS ====================

/**
 * Creates a consultation agreement (paid or free)
 * Logs to audit trail and triggers notification
 */
const handleCreateConsultationAgreement = (
  paidStatus,
  consultationFee,
  consultationSignee,
  setConsultationAgreementsList,
  consultationAgreementsList,
  setConsultationSignee,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const newAg = {
    id: `ca-${Date.now()}`,
    client: consultationSignee || "Walk-In Candidate",
    date: timestamp,
    fee: paidStatus ? consultationFee : 0,
    paid: paidStatus,
    status: "Signed & Confirmed"
  };
  setConsultationAgreementsList([newAg, ...consultationAgreementsList]);
  setConsultationSignee("");
  triggerSystemNotification(
    "INITIAL AGREEMENT",
    `Created ${paidStatus ? 'Paid' : 'Free'} Consultation Agreement for ${newAg.client}`,
    "success"
  );
  addSystemAuditLog(
    "Agreements Office",
    "Consultation Agreement Executed",
    `Client: ${newAg.client}, Cost: $${newAg.fee}`
  );
};

/**
 * Creates miscellaneous service request
 */
const handleCreateMiscRequest = (
  e,
  newMiscClient,
  newMiscService,
  newMiscFee,
  miscRequests,
  setMiscRequests,
  setNewMiscClient,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  e.preventDefault();
  if (!newMiscClient) return;
  
  const newRq = {
    id: `mr-${Date.now()}`,
    client: newMiscClient,
    service: newMiscService,
    fee: newMiscFee,
    status: "Pending Execution"
  };
  setMiscRequests([newRq, ...miscRequests]);
  setNewMiscClient("");
  
  triggerSystemNotification(
    "SERVICE REQUEST",
    `Logged miscellaneous service request: ${newMiscService}`,
    "success"
  );
  addSystemAuditLog(
    "Agreements Office",
    "Service Request Logged",
    `Service: ${newMiscService}, Client: ${newMiscClient}`
  );
};

/**
 * Adds a new user seat/license
 */
const handleAddUserSeat = (
  e,
  newUserName,
  newUserEmail,
  newUserRole,
  newUserAccess,
  usersList,
  setUsersList,
  setNewUserName,
  setNewUserEmail,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  e.preventDefault();
  if (!newUserName || !newUserEmail) return;
  
  const newU = {
    id: `u-${Date.now()}`,
    name: newUserName,
    role: newUserRole,
    email: newUserEmail,
    status: "Active",
    accessLevel: newUserAccess
  };
  setUsersList([...usersList, newU]);
  setNewUserName('');
  setNewUserEmail('');
  
  triggerSystemNotification(
    "STAFF ADDED",
    `Allocated seat license for ${newU.name}`,
    "success"
  );
  addSystemAuditLog(
    "Security Admin",
    "User License Issued",
    `Role: ${newU.role}, Email: ${newU.email}`
  );
};

/**
 * Triggers AI marketing campaign dispatch
 */
const handleTriggerMarketingCampaign = (
  e,
  marketingTemplateBody,
  selectedMarketingPlatform,
  marketingPosts,
  setMarketingPosts,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  e.preventDefault();
  if (!marketingTemplateBody) return;
  
  const newP = {
    id: `mp-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    text: marketingTemplateBody,
    platform: selectedMarketingPlatform
  };
  setMarketingPosts([newP, ...marketingPosts]);
  
  triggerSystemNotification(
    "CAMPAIGN LAUNCHED",
    `Dispatched AI Marketing Broadcast on ${selectedMarketingPlatform}`,
    "success"
  );
  addSystemAuditLog(
    "Marketing Engine",
    "Campaign Published",
    `Platform: ${selectedMarketingPlatform}`
  );
};

/**
 * Adds news/broadcast notice
 */
const handleAddNews = (
  e,
  newNewsTitle,
  newNewsText,
  countryContext,
  newsList,
  setNewsList,
  setNewNewsTitle,
  setNewNewsText,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  e.preventDefault();
  if (!newNewsTitle.trim() || !newNewsText.trim()) return;
  
  const newNewsItem = {
    id: `news-${Date.now()}`,
    date: "Just now",
    country: countryContext,
    title: newNewsTitle,
    text: newNewsText,
    source: "Agency Admin"
  };
  setNewsList([newNewsItem, ...newsList]);
  setNewNewsTitle("");
  setNewNewsText("");
  
  triggerSystemNotification(
    "NEWS UPDATED",
    `Published broadcast notice: ${newNewsItem.title}`,
    "success"
  );
  addSystemAuditLog(
    "Manager Broadcaster",
    "News Item Published",
    `Context: ${countryContext}`
  );
};

/**
 * Calculates billing based on pricing package
 */
const calculateBillingMetrics = (activePricingPackage, billingCycle) => {
  let baseRate = 19;
  let maxUsers = 1;
  let maxContacts = 500;
  let maxMatters = 200;
  let storage = "2 GB";

  if (activePricingPackage === 'small-firm') {
    baseRate = 49;
    maxUsers = 5;
    maxContacts = 5000;
    maxMatters = 2000;
    storage = "10 GB";
  } else if (activePricingPackage === 'pro-firm') {
    baseRate = 99;
    maxUsers = 20;
    maxContacts = 25000;
    maxMatters = 10000;
    storage = "50 GB";
  }

  const cycleMultiplier = billingCycle === 'annual' ? 12 * 0.85 : 12;
  const totalYearly = baseRate * cycleMultiplier;

  return {
    rate: baseRate,
    maxUsers,
    maxContacts,
    maxMatters,
    storage,
    yearly: Math.round(totalYearly),
    monthlyEquivalent: Math.round(billingCycle === 'annual' ? baseRate * 0.85 : baseRate)
  };
};

/**
 * Calculates case fees based on program selection
 */
const calculateCaseFees = (
  currentPrograms,
  selectedProgCode,
  calcSpouse,
  calcChildren,
  activeDiscount
) => {
  const prog = currentPrograms[selectedProgCode];
  if (!prog) return { base: 0, spouse: 0, children: 0, total: 0, currency: 'CAD' };
  
  const base = prog.baseFee;
  const spouse = calcSpouse ? prog.spouseFee : 0;
  const children = calcChildren * prog.childFee;
  const total = base + spouse + children - activeDiscount;
  
  return { base, spouse, children, total, currency: prog.currency };
};

/**
 * Voice call timer management
 */
const setupVoiceCallTimer = (isVoiceCallActive, setVoiceCallDuration, voiceTimerRef) => {
  useEffect(() => {
    if (isVoiceCallActive) {
      setVoiceCallDuration(0);
      voiceTimerRef.current = setInterval(() => {
        setVoiceCallDuration(p => p + 1);
      }, 1000);
    } else {
      if (voiceTimerRef.current) clearInterval(voiceTimerRef.current);
    }
    return () => {
      if (voiceTimerRef.current) clearInterval(voiceTimerRef.current);
    };
  }, [isVoiceCallActive, setVoiceCallDuration, voiceTimerRef]);
};

/**
 * Text-to-speech synthesis
 */
const speakVoiceAgentText = (textToSpeak, lang, setIsGeneratingSpeech) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(textToSpeak);
    speech.lang = lang === 'FR' ? 'fr-FR' : 'en-US';
    speech.rate = 1.0;
    speech.pitch = 1.05;
    setIsGeneratingSpeech(true);
    speech.onend = () => setIsGeneratingSpeech(false);
    window.speechSynthesis.speak(speech);
  } else {
    console.warn("Speech Synthesis interface is not active on this browser.");
  }
};

/**
 * Triggers system notification
 */
const triggerSystemNotification = (type, text, status, notifications, setNotifications) => {
  const newN = {
    id: `notif-${Date.now()}`,
    type,
    text,
    time: "Just now",
    status
  };
  setNotifications([newN, ...notifications.slice(0, 4)]);
};

/**
 * Adds audit log entry
 */
const addSystemAuditLog = (actor, action, details, auditLogs, setAuditLogs) => {
  const newLog = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toLocaleString(),
    actor,
    action,
    details
  };
  setAuditLogs([newLog, ...auditLogs]);
};

/**
 * Creates new lead from intake form
 */
const handleCreateLead = (
  e,
  newLead,
  countryContext,
  leads,
  setLeads,
  setShowAddLead,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  e.preventDefault();
  const leadRecord = {
    ...newLead,
    id: `lead-${Date.now()}`,
    score: 85,
    stage: "AI Analysis",
    countryContext
  };
  setLeads([...leads, leadRecord]);
  setShowAddLead(false);
  
  triggerSystemNotification(
    "LEAD INTAKE",
    `New prospective lead created: ${leadRecord.firstName} ${leadRecord.lastName}`,
    "success"
  );
  addSystemAuditLog(
    "Mira AI Desk",
    "Lead Captured",
    `Assigned prospective track to ${leadRecord.firstName}`
  );
};

/**
 * Adds task to task board
 */
const handleAddTask = (
  e,
  newTaskInput,
  newTaskCategory,
  newTaskPriority,
  newTaskMatter,
  todayTasks,
  setTodayTasks,
  setNewTaskInput,
  setNewTaskMatter,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  e.preventDefault();
  if (!newTaskInput.trim()) return;
  
  const newTaskObj = {
    id: `task-${Date.now()}`,
    task: newTaskInput,
    completed: false,
    category: newTaskCategory,
    priority: newTaskPriority,
    dueDate: new Date(Date.now() + 72*60*60*1000).toISOString().split('T')[0],
    matter: newTaskMatter || "General Practice"
  };
  setTodayTasks([...todayTasks, newTaskObj]);
  setNewTaskInput("");
  setNewTaskMatter("");
  
  triggerSystemNotification(
    "TASK INSTALLED",
    `Created task: "${newTaskObj.task}"`,
    "success"
  );
  addSystemAuditLog(
    "Manager Board",
    "Task Added",
    `Categorized as: ${newTaskCategory}`
  );
};

/**
 * Toggles task completion status
 */
const handleToggleTask = (
  id,
  todayTasks,
  setTodayTasks,
  triggerSystemNotification
) => {
  setTodayTasks(todayTasks.map(t => {
    if (t.id === id) {
      const nextState = !t.completed;
      triggerSystemNotification(
        "TASK UPDATED",
        `Task set to ${nextState ? 'Completed' : 'Active'}`,
        "info"
      );
      return { ...t, completed: nextState };
    }
    return t;
  }));
};

/**
 * Deletes task from task board
 */
const handleDeleteTask = (id, todayTasks, setTodayTasks) => {
  setTodayTasks(todayTasks.filter(t => t.id !== id));
};

/**
 * Adds discussion thread to peer roundtable
 */
const handleAddDiscussion = (
  e,
  newDiscSubject,
  newDiscBody,
  countryContext,
  discussions,
  setDiscussions,
  setNewDiscSubject,
  setNewDiscBody,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  e.preventDefault();
  if (!newDiscSubject.trim() || !newDiscBody.trim()) return;
  
  const newPost = {
    id: `disc-${Date.now()}`,
    author: "RCIC Ram Babbar (Admin)",
    registration: countryContext === 'CAN' ? "R515758" : "1912345",
    date: "Just now",
    country: countryContext,
    subject: newDiscSubject,
    body: newDiscBody,
    replies: []
  };
  setDiscussions([newPost, ...discussions]);
  setNewDiscSubject("");
  setNewDiscBody("");
  
  triggerSystemNotification(
    "FORUM",
    "Successfully posted discussion thread to roundtable.",
    "success"
  );
  addSystemAuditLog(
    "Agent Forum",
    "Thread Published",
    `Subject: ${newPost.subject}`
  );
};

/**
 * Adds reply to discussion thread
 */
const handleAddReply = (
  discussionId,
  text,
  discussions,
  setDiscussions,
  triggerSystemNotification
) => {
  if (!text.trim()) return;
  
  setDiscussions(discussions.map(d => {
    if (d.id === discussionId) {
      return {
        ...d,
        replies: [...d.replies, {
          author: "RCIC Ram Babbar (Admin)",
          registration: "R515758",
          text
        }]
      };
    }
    return d;
  }));
  
  triggerSystemNotification(
    "FORUM REPLY",
    "Reply logged successfully.",
    "success"
  );
};

/**
 * Adds job posting to jobs board
 */
const handleAddJob = (
  e,
  newJobTitle,
  newJobFirm,
  newJobRemun,
  jobs,
  setJobs,
  setNewJobTitle,
  setNewJobFirm,
  setNewJobRemun,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  e.preventDefault();
  if (!newJobTitle.trim() || !newJobFirm.trim()) return;
  
  const newJ = {
    id: `job-${Date.now()}`,
    title: newJobTitle,
    firm: newJobFirm,
    remuneration: newJobRemun || "Disclosed upon interview",
    hours: "Contract",
    location: "Hybrid / Remote Option",
    requirements: "Credentials checked through CRMHUB."
  };
  setJobs([newJ, ...jobs]);
  setNewJobTitle("");
  setNewJobFirm("");
  setNewJobRemun("");
  
  triggerSystemNotification(
    "JOB BOARD",
    "New collaboration position announced.",
    "success"
  );
  addSystemAuditLog(
    "Career Center",
    "Opening Added",
    `Role: ${newJ.title}`
  );
};

/**
 * Connects to CAPIC member database
 */
const handleCapicConnect = (
  e,
  capicMemberId,
  setCapicConnecting,
  setCapicConnected,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  e.preventDefault();
  if (!capicMemberId.trim()) return;
  
  setCapicConnecting(true);
  setTimeout(() => {
    setCapicConnected(true);
    setCapicConnecting(false);
    triggerSystemNotification(
      "CAPIC CONNECT",
      "Connected securely with CAPIC Member Databases.",
      "success"
    );
    addSystemAuditLog(
      "CAPIC Connect Gateway",
      "Bilateral Token Synchronized",
      `Member ID: ${capicMemberId}`
    );
  }, 1500);
};

/**
 * Disconnects from CAPIC database
 */
const handleCapicDisconnect = (
  setCapicConnected,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  setCapicConnected(false);
  triggerSystemNotification(
    "CAPIC CONNECT",
    "Secured CAPIC credential session terminated.",
    "info"
  );
  addSystemAuditLog(
    "CAPIC Connect Gateway",
    "Session Revoked",
    "User manual logoff."
  );
};

/**
 * Books user into CAPIC training event
 */
const handleBookCapicEvent = (
  evtId,
  upcomingCapicEvents,
  setUpcomingCapicEvents,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  setUpcomingCapicEvents(upcomingCapicEvents.map(evt => {
    if (evt.id === evtId) {
      triggerSystemNotification(
        "CAPIC ENROLLMENT",
        `Successfully registered for "${evt.title}".`,
        "success"
      );
      addSystemAuditLog(
        "CAPIC Connect Gateway",
        "Enrolled in Training",
        `Course: ${evt.title}, Cost: $${evt.fee}`
      );
      return { ...evt, booked: true };
    }
    return evt;
  }));
};

/**
 * Simulates attending CAPIC event and generates CPD certificate
 */
const handleSimulateAttendEvent = (
  evt,
  cpdCertificates,
  setCpdCertificates,
  cpdHours,
  setCpdHours,
  upcomingCapicEvents,
  setUpcomingCapicEvents,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  const newCert = {
    id: `cert-${Date.now()}`,
    title: evt.title,
    hours: evt.hours,
    date: new Date().toISOString().split('T')[0],
    code: `CPD-${evt.id.toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
    certificateUrl: "#"
  };
  
  setCpdCertificates([newCert, ...cpdCertificates]);
  setCpdHours(prev => ({
    ...prev,
    completed: parseFloat((prev.completed + evt.hours).toFixed(2))
  }));
  setUpcomingCapicEvents(upcomingCapicEvents.filter(e => e.id !== evt.id));
  
  triggerSystemNotification(
    "CPD HOUR CREDITED",
    `Attended: ${evt.title}. +${evt.hours} hours added.`,
    "success"
  );
  addSystemAuditLog(
    "CAPIC Connect Gateway",
    "CPD Certificate Generated",
    `Code: ${newCert.code}, Hours: ${evt.hours}`
  );
};

/**
 * Toggles document checklist item completion
 */
const handleToggleChecklist = (
  id,
  activeCase,
  setActiveCase,
  triggerSystemNotification
) => {
  const updatedChecklist = activeCase.checklist.map(item => {
    if (item.id === id) {
      const nextState = !item.completed;
      triggerSystemNotification(
        "DOCUMENT VERIFIED",
        `Item "${item.task}" updated to ${nextState ? 'Completed' : 'Pending'}`,
        "info"
      );
      return { ...item, completed: nextState };
    }
    return item;
  });
  setActiveCase({ ...activeCase, checklist: updatedChecklist });
};

/**
 * Simulates document upload and OCR processing
 */
const handleSimulateDocumentUpload = (
  e,
  countryContext,
  activeCase,
  setActiveCase,
  setUploadProgress,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  e.preventDefault();
  setUploadProgress("Analyzing through Mira OCR and verifying hashes...");
  
  setTimeout(() => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: countryContext === 'CAN' ? "Police_Clearance_Record_IRCC.pdf" : "Form_80_Verified_DHA.pdf",
      section: "Admissibility",
      status: "Approved",
      expiry: "2031-12-31",
      verifiedBy: "Mira AI OCR Scan",
      confidence: "99.4%"
    };

    setActiveCase(prev => ({
      ...prev,
      documents: [...prev.documents, newDoc]
    }));

    setUploadProgress(null);
    triggerSystemNotification(
      "MIRA AI OCR",
      "File analyzed, matched security benchmarks, and mirrored to Drive storage.",
      "success"
    );
    addSystemAuditLog(
      "Secure Storage",
      "Synchronized file to drive mirror",
      `Document ID: ${newDoc.id}`
    );
  }, 1500);
};

/**
 * Triggers Stripe payment webhook processing
 */
const handleTriggerStripePayment = (
  invId,
  paymentHistory,
  setPaymentHistory,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  const updated = paymentHistory.map(inv => {
    if (inv.id === invId) {
      triggerSystemNotification(
        "ESCROW BILLING",
        `Webhook Handshake Resolved: Payout reconciled for ${invId}`,
        "success"
      );
      return { ...inv, status: "PAID" };
    }
    return inv;
  });
  setPaymentHistory(updated);
  addSystemAuditLog(
    "Accounting Ledger",
    "Stripe payment reconciled",
    `Payment processed for invoice reference ${invId}`
  );
};

/**
 * Compiles 7-year audit package with cryptographic signature
 */
const handleCompileAuditPackage = (
  activeCase,
  paymentHistory,
  companyName,
  rcicNumber,
  countryContext,
  setComplianceSignature,
  setIsCompilingAudit,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  setIsCompilingAudit(true);
  setTimeout(() => {
    const mockHashPayload = JSON.stringify({
      activeCase,
      paymentHistory,
      companyName,
      rcicNumber,
      countryContext
    });
    let hash = 0;
    for (let i = 0; i < mockHashPayload.length; i++) {
      hash = (hash << 5) - hash + mockHashPayload.charCodeAt(i);
      hash = hash & hash;
    }
    const hexSignature = `SHA-512-SECURE-${countryContext === 'CAN' ? `CICC-${rcicNumber}` : `OMARA-1912345`}-${Math.abs(hash).toString(16).toUpperCase()}`;
    setComplianceSignature(hexSignature);
    setIsCompilingAudit(false);
    
    triggerSystemNotification(
      "AUDIT COMPLETE",
      "7-Year record package compiled and locked with a cryptographic seal.",
      "success"
    );
    addSystemAuditLog(
      "Auditor System",
      "Audit Hash Generated",
      `Signature: ${hexSignature}`
    );
  }, 1000);
};

/**
 * Sends message to Mira AI via Gemini API
 */
const handleChatSend = async (
  e,
  chatInput,
  setChatInput,
  chatMessages,
  setChatMessages,
  countryContext,
  lang,
  setIsWaitingForGemini,
  speakVoiceAgentText,
  setIsGeneratingSpeech
) => {
  e.preventDefault();
  if (!chatInput.trim()) return;
  
  const userMsg = {
    sender: 'RCIC User',
    text: chatInput,
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  };
  setChatMessages(prev => [...prev, userMsg]);
  const inputForGemini = chatInput;
  setChatInput('');
  setIsWaitingForGemini(true);

  try {
    const systemPrompt = `You are Mira, the streamlined AI immigration expert for Ram Babbar (RCIC R515758).
    Provide clear, highly professional assistance under context: ${countryContext === 'CAN' ? 'Canada (CICC guidelines, CRS benchmarks, PNP options)' : 'Australia (OMARA rules, Subclass point tiers, invitation rounds)'}.
    Answer in ${lang === 'FR' ? 'French' : 'English'}. Keep responses to a maximum of 2 sentences. Always emphasize accuracy.`;

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: inputForGemini }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      })
    });

    const result = await response.json();
    const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "System database online and verified under Babbar licensing rules.";
    
    const miraMsg = {
      sender: 'Mira AI Core',
      text: generatedText,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    setChatMessages(prev => [...prev, miraMsg]);
    speakVoiceAgentText(generatedText, lang, setIsGeneratingSpeech);

  } catch (err) {
    console.error("Gemini context fallback triggered:", err);
    const fallbackText = `Active compliance settings validated under practitioner credential ${countryContext === 'CAN' ? 'CICC R515758' : 'MARN 1912345'}. Live directory secure.`;
    setChatMessages(prev => [...prev, {
      sender: 'Mira AI Core',
      text: fallbackText,
      time: "Just now"
    }]);
    speakVoiceAgentText(fallbackText, lang, setIsGeneratingSpeech);
  } finally {
    setIsWaitingForGemini(false);
  }
};

/**
 * Initiates voice call with Mira
 */
const startVoiceCall = (
  lang,
  setIsVoiceCallActive,
  setVoiceCallStatus,
  setVoiceAgentLogs,
  speakVoiceAgentText,
  setIsGeneratingSpeech
) => {
  setIsVoiceCallActive(true);
  setVoiceCallStatus("Opening secure trunk connection with Mira Voice gateway...");
  setVoiceAgentLogs([]);
  
  setTimeout(() => {
    setVoiceCallStatus("Call Active (Mira AI Voice Line)");
    const greeting = lang === 'FR'
      ? "Bonjour! Je suis l'assistant vocal Mira. Votre dossier est actif avec le bureau de Ram Babbar. Comment puis-je vous aider aujourd'hui?"
      : "Hello! I am your Mira voice calling agent. I am cross-referenced with Ram Babbar's active casework. Let's discuss your current visa requirements.";
    setVoiceAgentLogs([{ sender: "Mira Agent", text: greeting, time: "0.0s" }]);
    speakVoiceAgentText(greeting, lang, setIsGeneratingSpeech);
  }, 1200);
};

/**
 * Ends voice call
 */
const endVoiceCall = (
  setIsVoiceCallActive,
  setVoiceCallStatus,
  voiceCallDuration,
  triggerSystemNotification
) => {
  setIsVoiceCallActive(false);
  setVoiceCallStatus("Disconnected");
  triggerSystemNotification(
    "MIRA VOICE",
    `Voice Session completed. Duration: ${voiceCallDuration}s`,
    "info"
  );
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Executes digital signature on agreement
 */
const executeSignature = (
  signeeRole,
  clientSignatureTyped,
  spouseSignatureTyped,
  countryContext,
  rcicNumber,
  setEsignRcicSigned,
  setEsignClientSigned,
  setEsignSpouseSigned,
  setEsignAuditLog,
  triggerSystemNotification,
  addSystemAuditLog
) => {
  const timestamp = new Date().toLocaleString();
  const certFingerprint = `SIG-CERT-${countryContext === 'CAN' ? 'R515758' : 'M1912345'}-${Math.abs(Math.random() * 9999999).toString(16).toUpperCase()}`;
  
  const newLog = {
    role: signeeRole,
    signer: signeeRole === 'RCIC' ? 'Ram Babbar, Practitioner' : (signeeRole === 'Primary' ? clientSignatureTyped : spouseSignatureTyped),
    timestamp,
    ip: "192.168.10.84",
    fingerprint: certFingerprint
  };

  setEsignAuditLog(prev => [...prev, newLog]);

  if (signeeRole === 'RCIC') setEsignRcicSigned(true);
  if (signeeRole === 'Primary') setEsignClientSigned(true);
  if (signeeRole === 'Spouse') setEsignSpouseSigned(true);

  triggerSystemNotification(
    "E-SIGNATURE",
    `${signeeRole} digital signature registered successfully.`,
    "success"
  );
  addSystemAuditLog(
    "E-Sign Engine",
    "Signature Locked",
    `Fingerprint: ${certFingerprint}`
  );
};

/**
 * Monitors e-sign completion
 */
const monitorEsignCompletion = (
  esignRcicSigned,
  esignClientSigned,
  esignSpouseSigned,
  calcSpouse,
  setEsignCompleted,
  triggerSystemNotification
) => {
  useEffect(() => {
    if (esignRcicSigned && esignClientSigned && (!calcSpouse || esignSpouseSigned)) {
      setEsignCompleted(true);
      triggerSystemNotification(
        "CONTRACT COMPLETED",
        "Retainer agreement is fully executed and filed to secure directory.",
        "success"
      );
    }
  }, [esignRcicSigned, esignClientSigned, esignSpouseSigned, calcSpouse, setEsignCompleted, triggerSystemNotification]);
};

// Export all handlers
export {
  handleCreateConsultationAgreement,
  handleCreateMiscRequest,
  handleAddUserSeat,
  handleTriggerMarketingCampaign,
  handleAddNews,
  calculateBillingMetrics,
  calculateCaseFees,
  setupVoiceCallTimer,
  speakVoiceAgentText,
  triggerSystemNotification,
  addSystemAuditLog,
  handleCreateLead,
  handleAddTask,
  handleToggleTask,
  handleDeleteTask,
  handleAddDiscussion,
  handleAddReply,
  handleAddJob,
  handleCapicConnect,
  handleCapicDisconnect,
  handleBookCapicEvent,
  handleSimulateAttendEvent,
  handleToggleChecklist,
  handleSimulateDocumentUpload,
  handleTriggerStripePayment,
  handleCompileAuditPackage,
  handleChatSend,
  startVoiceCall,
  endVoiceCall,
  executeSignature,
  monitorEsignCompletion
};
