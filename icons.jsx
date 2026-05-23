/* eslint-disable */
// Inline SVG icons (lucide-style) — keep stroke-width consistent
const I = (paths, viewBox = "0 0 24 24") => ({ size = 16, color = "currentColor", ...rest } = {}) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none"
       stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
       {...rest}>
    {paths}
  </svg>
);

const Icon = {
  Home: I(<><path d="M3 12 12 3l9 9"/><path d="M5 10v10h14V10"/></>),
  Terminal: I(<><polyline points="4 7 9 12 4 17"/><line x1="11" y1="19" x2="20" y2="19"/></>),
  Briefcase: I(<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>),
  Book: I(<><path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M4 4v12a4 4 0 0 1 4-4h12"/></>),
  Users: I(<><circle cx="9" cy="8" r="3.5"/><path d="M3 21c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="6" r="2.5"/><path d="M15 14c2.8 0 6 1.6 6 5"/></>),
  Github: I(<path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1.1 1.5 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1.1-2.7-.1-.3-.5-1.3.1-2.8 0 0 .9-.3 2.8 1.1.8-.2 1.7-.4 2.5-.4s1.7.1 2.5.4c1.9-1.3 2.8-1.1 2.8-1.1.5 1.5.2 2.5.1 2.8.7.7 1.1 1.7 1.1 2.7 0 3.9-2.4 4.7-4.6 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5C19.1 20.5 22 16.7 22 12.2 22 6.6 17.5 2 12 2z"/>),
  Mail: I(<><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></>),
  Chat: I(<path d="M7 4h10a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-4l-5 4v-4H7a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"/>),
  ChevronRight: I(<polyline points="9 6 15 12 9 18"/>),
  ChevronDown: I(<polyline points="6 9 12 15 18 9"/>),
  ArrowRight: I(<><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/></>),
  ArrowUpRight: I(<><line x1="6" y1="18" x2="18" y2="6"/><polyline points="9 6 18 6 18 15"/></>),
  Play: I(<polygon points="6 4 20 12 6 20"/>),
  GitBranch: I(<><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></>),
  Package: I(<><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>),
  Shield: I(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>),
  Beaker: I(<><path d="M9 2v6L4 19a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 19l-5-11V2"/><line x1="7" y1="2" x2="17" y2="2"/></>),
  Layers: I(<><polygon points="12 2 22 8 12 14 2 8 12 2"/><polyline points="2 16 12 22 22 16"/><polyline points="2 12 12 18 22 12"/></>),
  Hexagon: I(<polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2"/>),
  Code: I(<><polyline points="9 8 4 12 9 16"/><polyline points="15 8 20 12 15 16"/></>),
  Cpu: I(<><rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9" y="9" width="6" height="6"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></>),
  ShieldAlert: I(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="16" x2="12" y2="16"/></>),
  CheckCircle: I(<><circle cx="12" cy="12" r="9"/><polyline points="8 12 11 15 16 9"/></>),
  Circle: I(<circle cx="12" cy="12" r="4"/>),
  HelpCircle: I(<><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 .2c0 1.7-2.5 1.8-2.5 3.8"/><line x1="12" y1="17" x2="12" y2="17"/></>),
  Calendar: I(<><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="16" y1="3" x2="16" y2="7"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="3" y1="11" x2="21" y2="11"/></>),
  FileText: I(<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></>),
  Dot: I(<circle cx="12" cy="12" r="3"/>),
  Download: I(<><path d="M12 3v13"/><polyline points="7 12 12 17 17 12"/><line x1="4" y1="21" x2="20" y2="21"/></>),
  ExternalLink: I(<><path d="M14 4h6v6"/><line x1="20" y1="4" x2="11" y2="13"/><path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></>),
  Lock: I(<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>),
  Bug: I(<><path d="M8 2l1.5 2"/><path d="M16 2l-1.5 2"/><rect x="6" y="6" width="12" height="14" rx="6"/><line x1="12" y1="12" x2="12" y2="20"/><path d="M6 12H3"/><path d="M21 12h-3"/><path d="M6 8 3 6"/><path d="M18 8l3-2"/><path d="M6 16l-3 2"/><path d="M18 16l3 2"/></>),
};
window.Icon = Icon;
