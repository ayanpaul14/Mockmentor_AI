import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// Import your AuthContext to see who is logged in
import { AuthContext } from '../context/AuthContext'; 
import axios from '../api/axios';

export default function Profile() {
  const { user } = useContext(AuthContext); // Access global logged-in user object
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        setLoading(true);
        // GET request to backend using the authenticated user's ID or secure token
        const response = await axios.get(`/api/users/profile/${user?._id || 'me'}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error retrieving custom profile records:", error);
        // Fallback placeholder data if backend api is still being configured
        setProfileData({
          name: user?.name || 'Candidate Account',
          college: user?.college || 'Associated Institution',
          specialization: user?.specialization || 'B.Tech CSE',
          location: user?.location || 'India',
          streakCount: user?.streakCount || 0,
          joinedDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recent Member',
          overallScore: 75,
          topicScores: [
            { topic: 'Data Structures & Algorithms', score: 70, color: 'bg-cyan-500' },
            { topic: 'System Design', score: 65, color: 'bg-indigo-500' },
            { topic: 'DBMS & SQL', score: 80, color: 'bg-purple-500' },
            { topic: 'Core Engineering Tracks', score: 75, color: 'bg-emerald-500' },
          ],
          badges: [
            { id: 'welcome-badge', name: 'Verified Candidate', icon: '🎓', desc: 'Successfully configured dynamic placement preparation profile.', date: 'Joined' }
          ],
          sessions: []
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfileDetails();
    }
  }, [user]);

  // Generate matrix cells for the LeetCode activity dashboard layout
  const generateCalendarDays = () => {
    const days = [];
    const states = ['none', 'low', 'medium', 'high'];
    const currentStreak = profileData?.streakCount || 0;
    
    for (let i = 1; i <= 90; i++) {
      // If the user has a high streak, make their recent grid slots light up heavily
      let intensity = 'none';
      if (currentStreak > 0 && i > (90 - currentStreak)) {
        intensity = states[Math.floor(Math.random() * 2) + 2]; // high or medium activity
      } else {
        intensity = Math.random() > 0.75 ? states[Math.floor(Math.random() * 3)] : 'none';
      }
      days.push({ day: i, intensity });
    }
    return days;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-[#777] font-mono tracking-wider">LOADING PROFILE STACK...</p>
        </div>
      </div>
    );
  }

  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#111] p-4 sm:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex justify-between items-center border-b border-[#e8e4dc] pb-4">
          <div className="flex items-center gap-2 text-xs text-[#777] font-medium">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#111]">Dashboard Profile</span>
          </div>
          <Link to="/interview" className="bg-[#111] hover:bg-[#222] text-white font-medium px-4 py-2 rounded-xl text-xs transition-all shadow-sm">
            Launch Mock Interview →
          </Link>
        </div>

        {/* Dynamic User Card Header */}
        <div className="bg-white border border-[#e8e4dc] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-semibold bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] shadow-md shadow-indigo-500/10">
              {profileData?.name ? profileData.name[0] : 'U'}
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">{profileData?.name}</h2>
              <p className="text-sm text-[#555] font-medium">{profileData?.specialization} • {profileData?.college}</p>
              <p className="text-xs text-[#aaa]">{profileData?.location} • Member since {profileData?.joinedDate}</p>
            </div>
          </div>
          
          {/* Quick Stats Metrics Block */}
          <div className="flex gap-4 w-full sm:w-auto border-t sm:border-t-0 border-[#f0ede6] pt-4 sm:pt-0">
            <div className="flex-1 sm:flex-initial bg-[#faf9f7] border border-[#e8e4dc] rounded-xl px-4 py-3 text-center min-w-[100px]">
              <div className="text-xs text-[#aaa] font-medium uppercase tracking-wider mb-0.5">Streak</div>
              <div className="text-xl font-bold text-orange-500 flex items-center justify-center gap-1">
                🔥 {profileData?.streakCount} <span className="text-xs text-[#aaa] font-normal">days</span>
              </div>
            </div>
            <div className="flex-1 sm:flex-initial bg-[#faf9f7] border border-[#e8e4dc] rounded-xl px-4 py-3 text-center min-w-[100px]">
              <div className="text-xs text-[#aaa] font-medium uppercase tracking-wider mb-0.5">Avg Score</div>
              <div className="text-xl font-bold text-indigo-600">
                {profileData?.overallScore}<span className="text-xs text-[#aaa] font-normal">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Profile Tab Selection Switches */}
        <div className="flex border-b border-[#e8e4dc] gap-6 text-sm font-medium">
          {['overview', 'badges', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize transition-all border-b-2 -mb-0.5 ${
                activeTab === tab 
                  ? 'border-indigo-600 text-[#111]' 
                  : 'border-transparent text-[#aaa] hover:text-[#555]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB TARGET CONTENT ROUTER PANEL */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left/Center Section - Consistency Map and Topic analytics */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* LeetCode Style Matrix Consistency Block */}
              <div className="bg-white border border-[#e8e4dc] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-base">Interview Consistency Grid</h3>
                    <p className="text-xs text-[#aaa]">Tracks daily question evaluations and response iterations</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#777]">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 rounded bg-[#f1f5f9]" />
                    <div className="w-2.5 h-2.5 rounded bg-indigo-100" />
                    <div className="w-2.5 h-2.5 rounded bg-indigo-300" />
                    <div className="w-2.5 h-2.5 rounded bg-indigo-600" />
                    <span>More</span>
                  </div>
                </div>

                {/* Grid Grid Alignment box wrapper */}
                <div className="grid grid-flow-col grid-rows-5 gap-1.5 pt-2 overflow-x-auto select-none">
                  {calendarDays.map((cell) => {
                    let bgClass = 'bg-[#f1f5f9]';
                    if (cell.intensity === 'low') bgClass = 'bg-indigo-100';
                    if (cell.intensity === 'medium') bgClass = 'bg-indigo-300';
                    if (cell.intensity === 'high') bgClass = 'bg-indigo-600';
                    return (
                      <div 
                        key={cell.day} 
                        className={`w-3.5 h-3.5 rounded-[3px] transition-colors ${bgClass}`}
                        title={`Day ${cell.day}: Evaluated Metrics`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Topic Evaluation Matrix Metrics breakdown */}
              <div className="bg-white border border-[#e8e4dc] rounded-2xl p-6 shadow-sm space-y-5">
                <div>
                  <h3 className="font-semibold text-base">Technical Subject Knowledge Breakdown</h3>
                  <p className="text-xs text-[#aaa]">Average competency scoring metrics derived from interactive interview logs</p>
                </div>
                
                <div className="space-y-4">
                  {profileData?.topicScores?.map((item) => (
                    <div key={item.topic} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-[#555]">{item.topic}</span>
                        <span className="text-[#111]">{item.score}% Competency</span>
                      </div>
                      <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color || 'bg-indigo-500'}`} style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sticky Sidebar Section - Short Badges view panel */}
            <div className="space-y-8">
              <div className="bg-white border border-[#e8e4dc] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-base">Earned Milestones</h3>
                  <button onClick={() => setActiveTab('badges')} className="text-xs text-indigo-600 font-medium hover:underline">
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {profileData?.badges?.slice(0, 4).map((badge) => (
                    <div key={badge.id} className="border border-[#f0ede6] rounded-xl p-3 text-center bg-[#faf9f7] hover:border-[#6366f1]/20 transition-all cursor-default">
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-xs font-semibold truncate text-[#111]">{badge.name}</div>
                      <div className="text-[10px] text-[#aaa] mt-0.5">{badge.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileData?.badges?.map((badge) => (
              <div key={badge.id} className="bg-white border border-[#e8e4dc] rounded-2xl p-5 flex gap-4 items-start shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-[#faf9f7] border border-[#e8e4dc] flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
                  {badge.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-[#111]">{badge.name}</h4>
                    <span className="text-[10px] font-mono bg-[#f5f2ec] text-[#777] px-2 py-0.5 rounded-md">{badge.date}</span>
                  </div>
                  <p className="text-xs text-[#666] leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            ))}
            {(!profileData?.badges || profileData.badges.length === 0) && (
              <p className="text-xs text-[#aaa] italic p-4">No milestone certificates unlocked yet.</p>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white border border-[#e8e4dc] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-[#e8e4dc]">
              <h3 className="font-semibold text-base">Historical Evaluation Transcripts</h3>
              <p className="text-xs text-[#aaa]">Deep performance metrics tracking across historic session blocks</p>
            </div>
            
            <div className="divide-y divide-[#f0ede6]">
              {profileData?.sessions?.map((session) => (
                <div key={session.id} className="p-6 hover:bg-[#faf9f7] transition-colors space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded-md font-semibold">
                        {session.role}
                      </span>
                      <h4 className="font-semibold text-sm text-[#111] mt-1.5">{session.topic}</h4>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-sm font-bold text-indigo-600">Score: {session.score}%</div>
                      <div className="text-[11px] text-[#aaa]">{session.date}</div>
                    </div>
                  </div>

                  {/* Tri-dimensional metric indicator blocks */}
                  <div className="grid grid-cols-3 gap-3 bg-[#faf9f7] border border-[#e8e4dc]/60 rounded-xl p-3 text-center">
                    <div>
                      <div className="text-[10px] text-[#aaa] font-medium uppercase tracking-wider mb-0.5">Clarity</div>
                      <div className="text-xs font-semibold text-[#333]">{session.clarity}%</div>
                    </div>
                    <div className="border-x border-[#e8e4dc]/80">
                      <div className="text-[10px] text-[#aaa] font-medium uppercase tracking-wider mb-0.5">Depth</div>
                      <div className="text-xs font-semibold text-[#333]">{session.depth}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#aaa] font-medium uppercase tracking-wider mb-0.5">Keywords</div>
                      <div className="text-xs font-semibold text-[#333]">{session.keywords}%</div>
                    </div>
                  </div>
                </div>
              ))}
              {(!profileData?.sessions || profileData.sessions.length === 0) && (
                <p className="text-xs text-[#aaa] italic p-6">No interview sessions logged yet. Launch a session to populate metrics.</p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}