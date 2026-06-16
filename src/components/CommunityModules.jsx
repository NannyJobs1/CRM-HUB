// Discussion Board & Jobs Board Components

export function DiscussionBoardTabContent({
  activeTab,
  discussions,
  newDiscSubject,
  setNewDiscSubject,
  newDiscBody,
  setNewDiscBody,
  handleAddDiscussion,
  handleAddReply,
  countryContext,
  theme,
  cardBgClass,
  inputClass,
  MessageCircle,
  ArrowRight
}) {
  if (activeTab !== 'discussion-board') return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <MessageCircle className="text-purple-400" />
          Agent Discussion Forum & Peer Roundtable
        </h2>
        <p className="text-xs text-slate-400 font-sans">Connect with verified RCIC/MARA agents for case reviews and best practices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* New Discussion Form */}
        <div className={`lg:col-span-1 p-6 rounded-2xl border ${cardBgClass} h-fit space-y-4`}>
          <h3 className="font-extrabold text-sm text-slate-200">Start New Thread</h3>

          <form onSubmit={handleAddDiscussion} className="space-y-3">
            <input 
              type="text"
              placeholder="Discussion Subject"
              value={newDiscSubject}
              onChange={(e) => setNewDiscSubject(e.target.value)}
              required
              className={`w-full p-2.5 rounded-lg text-xs border ${inputClass}`}
            />
            
            <textarea 
              placeholder="Describe your query or discussion topic..."
              value={newDiscBody}
              onChange={(e) => setNewDiscBody(e.target.value)}
              required
              className={`w-full p-2.5 rounded-lg text-xs border ${inputClass} min-h-[100px]`}
            />

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 rounded-lg">
              Post to Roundtable
            </button>
          </form>
        </div>

        {/* Discussion Threads */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${cardBgClass} space-y-4`}>
          <h3 className="font-extrabold text-sm text-slate-200">Active Discussions</h3>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {discussions.filter(d => d.country === countryContext).map(disc => (
              <div key={disc.id} className="p-4 rounded-lg border border-slate-700 bg-slate-900/30 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-extrabold text-sm text-slate-200 break-words">{disc.subject}</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">{disc.author} • {disc.registration}</p>
                  </div>
                  <span className="text-[9px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded font-mono whitespace-nowrap flex-shrink-0">
                    {disc.date}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3">{disc.body}</p>

                {disc.replies.length > 0 && (
                  <div className="pl-3 border-l-2 border-slate-600 space-y-2 mt-2">
                    {disc.replies.map((reply, idx) => (
                      <div key={idx} className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-300">{reply.author}</p>
                        <p className="text-[10px] text-slate-400">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                <button 
                  onClick={() => {
                    const replyText = prompt("Your reply:");
                    if (replyText) {
                      handleAddReply(disc.id, replyText);
                    }
                  }}
                  className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center gap-1"
                >
                  Reply <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function JobBoardTabContent({
  activeTab,
  jobs,
  newJobTitle,
  setNewJobTitle,
  newJobFirm,
  setNewJobFirm,
  newJobRemun,
  setNewJobRemun,
  handleAddJob,
  theme,
  cardBgClass,
  inputClass,
  Briefcase,
  MapPin,
  DollarSign,
  ArrowRight
}) {
  if (activeTab !== 'job-board') return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <Briefcase className="text-cyan-400" />
          Immigration Jobs & Hiring Board
        </h2>
        <p className="text-xs text-slate-400 font-sans">Post positions, find collaborators, and manage staffing partnerships.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Post Job Form */}
        <div className={`lg:col-span-1 p-6 rounded-2xl border ${cardBgClass} h-fit space-y-4`}>
          <h3 className="font-extrabold text-sm text-slate-200">Post New Opening</h3>

          <form onSubmit={handleAddJob} className="space-y-3">
            <input 
              type="text"
              placeholder="Job Title"
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              required
              className={`w-full p-2.5 rounded-lg text-xs border ${inputClass}`}
            />
            
            <input 
              type="text"
              placeholder="Firm / Organization"
              value={newJobFirm}
              onChange={(e) => setNewJobFirm(e.target.value)}
              required
              className={`w-full p-2.5 rounded-lg text-xs border ${inputClass}`}
            />

            <input 
              type="text"
              placeholder="Remuneration (e.g., $45-60/hr)"
              value={newJobRemun}
              onChange={(e) => setNewJobRemun(e.target.value)}
              className={`w-full p-2.5 rounded-lg text-xs border ${inputClass}`}
            />

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 rounded-lg">
              Publish Position
            </button>
          </form>
        </div>

        {/* Job Listings */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${cardBgClass} space-y-4`}>
          <h3 className="font-extrabold text-sm text-slate-200">Active Opportunities</h3>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {jobs.map(job => (
              <div key={job.id} className="p-4 rounded-lg border border-slate-700 bg-slate-900/30 space-y-3 hover:border-indigo-500/50 transition-all">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-200">{job.title}</h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">{job.firm}</p>
                </div>

                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <DollarSign size={13} className="text-emerald-400" />
                    <span className="font-semibold text-emerald-400">{job.remuneration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin size={13} className="text-cyan-400" />
                    <span>{job.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300">{job.requirements}</p>

                <button className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center gap-1">
                  View Details <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CPDTrackerTabContent({
  activeTab,
  capicConnected,
  capicMemberId,
  capicPassword,
  setCapicMemberId,
  cpdHours,
  cpdCertificates,
  upcomingCapicEvents,
  capicConnecting,
  handleCapicConnect,
  handleCapicDisconnect,
  handleBookCapicEvent,
  handleSimulateAttendEvent,
  theme,
  cardBgClass,
  inputClass,
  Award,
  BookOpen,
  CheckCircle,
  Calendar,
  Loader
}) {
  if (activeTab !== 'cpd-tracker') return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <Award className="text-yellow-400" />
          CAPIC CPD & Professional Development Tracker
        </h2>
        <p className="text-xs text-slate-400 font-sans">Track continuing education hours and maintain CICC/OMARA credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CAPIC Connection */}
        <div className={`p-6 rounded-2xl border ${cardBgClass} space-y-4 h-fit`}>
          <h3 className="font-extrabold text-sm text-slate-200">CAPIC Connect Gateway</h3>

          {!capicConnected ? (
            <form onSubmit={handleCapicConnect} className="space-y-3">
              <input 
                type="text"
                placeholder="CAPIC Member ID"
                value={capicMemberId}
                onChange={(e) => setCapicMemberId(e.target.value)}
                required
                className={`w-full p-2.5 rounded-lg text-xs border ${inputClass}`}
              />
              
              <button type="submit" disabled={capicConnecting} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2">
                {capicConnecting ? (
                  <>
                    <Loader size={13} className="animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect to CAPIC'
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 space-y-1">
                <p className="text-[10px] font-bold text-emerald-400">CONNECTED</p>
                <p className="text-[10px] text-slate-300">{capicMemberId}</p>
              </div>
              
              <button 
                onClick={handleCapicDisconnect}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2 rounded-lg"
              >
                Disconnect Session
              </button>
            </div>
          )}

          <div className="pt-4 border-t border-slate-700 space-y-3">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase">CPD Progress</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Hours Completed</span>
                <span className="text-emerald-400 font-bold">{cpdHours.completed}/{cpdHours.target}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(cpdHours.completed / cpdHours.target) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificates & Events */}
        <div className={`lg:col-span-2 space-y-4`}>
          {/* Completed Certificates */}
          <div className={`p-6 rounded-2xl border ${cardBgClass} space-y-3`}>
            <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" />
              Completed Training Certificates
            </h3>

            <div className="space-y-2 max-h-[180px] overflow-y-auto">
              {cpdCertificates.map(cert => (
                <div key={cert.id} className="p-3 rounded-lg bg-slate-900/30 border border-slate-700 space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-xs text-slate-200">{cert.title}</p>
                      <p className="text-[10px] text-slate-400">{cert.hours} CPD Hours</p>
                    </div>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono">{cert.code}</span>
                  </div>
                  <p className="text-[9px] text-slate-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className={`p-6 rounded-2xl border ${cardBgClass} space-y-3`}>
            <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
              <Calendar size={16} className="text-cyan-400" />
              Upcoming CAPIC Events
            </h3>

            <div className="space-y-2 max-h-[280px] overflow-y-auto">
              {upcomingCapicEvents.map(evt => (
                <div key={evt.id} className="p-3 rounded-lg bg-slate-900/30 border border-slate-700 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-xs text-slate-200">{evt.title}</p>
                      <p className="text-[10px] text-slate-400">{evt.date} at {evt.time}</p>
                    </div>
                    <span className="text-[9px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded font-mono">${evt.fee}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">{evt.hours} hrs • {evt.lecturer}</p>
                  
                  <div className="flex gap-2">
                    {!evt.booked ? (
                      <button 
                        onClick={() => handleBookCapicEvent(evt.id)}
                        className="text-indigo-400 hover:text-indigo-300 text-[10px] font-semibold"
                      >
                        Register
                      </button>
                    ) : (
                      <>
                        <span className="text-emerald-400 text-[10px] font-semibold">✓ Registered</span>
                        <button 
                          onClick={() => handleSimulateAttendEvent(evt)}
                          className="text-cyan-400 hover:text-cyan-300 text-[10px] font-semibold ml-auto"
                        >
                          Mark Attended
                        </button>
                      </>
                    )}
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

export {
  DiscussionBoardTabContent,
  JobBoardTabContent,
  CPDTrackerTabContent
};
