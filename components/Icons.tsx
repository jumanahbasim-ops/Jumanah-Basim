import React from 'react';

export const HazardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
  </svg>
);

export const NoHazardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

export const LoadingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.695v4.992h-4.992" />
    </svg>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.25 21.75l-.648-1.178a3.375 3.375 0 00-2.312-2.312L12 17.25l1.178-.648a3.375 3.375 0 002.312-2.312L16.25 13.5l.648 1.178a3.375 3.375 0 002.312 2.312L20.25 18l-1.178.648a3.375 3.375 0 00-2.312 2.312z" />
  </svg>
);

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <defs>
      <radialGradient id="earthGradientLogo" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#2563eb" />
      </radialGradient>
      {/* Invisible path for the orbit */}
      <ellipse id="orbit-path" cx="50" cy="50" rx="42" ry="28" transform="rotate(-20 50 50)" />
    </defs>

    {/* Visible orbit line */}
    <use href="#orbit-path" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />

    {/* Earth */}
    <circle cx="50" cy="50" r="18" fill="url(#earthGradientLogo)" />

    {/* The asteroid. The 'g' element is animated along the path. */}
    <g>
      {/* The asteroid path is scaled and centered */}
      <path 
        fill="currentColor" 
        transform="scale(0.3) translate(-12, -12)" // Center the original 24x24 path
        d="M19.5,9.2c-0.8-2.3-2.5-4.2-4.7-5.5c-2-1.2-4.3-1.7-6.6-1.3C5.5,3,3.1,5.1,1.8,7.7c-1.2,2.4-1.5,5.1-0.8,7.7 c0.5,2,1.7,3.8,3.3,5.2c1.7,1.4,3.7,2.2,5.8,2.3c2.9,0.2,5.7-0.9,7.8-3c3.4-3.3,5-7.7,3.1-11.3z M6,8C5.4,8,5,7.5,5,7 c0-0.6,0.4-1,1-1s1,0.4,1,1C7,7.5,6.6,8,6,8z M15,17c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S15.8,17,15,17z M17,10 c-0.8,0-1.5-0.7-1.5-1.5S16.2,7,17,7s1.5,0.7,1.5,1.5S17.8,10,17,10z"
      />
      <animateMotion dur="10s" repeatCount="indefinite">
        <mpath href="#orbit-path" />
      </animateMotion>
    </g>
  </svg>
);