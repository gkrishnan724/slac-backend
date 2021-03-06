import React from 'react';

export default function Clock(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" width={64} height={64} {...props}>
      <path d="M60,40c-5,0-9-8-9-13c0-10-9-18-19-18s-19,8-19,18c0,5-4,13-9,13H0v13h64V40H60z" fill="#594640" />
      <circle cx={32} cy={28} r={15} fill="#fed0ac" />
      <g fill="#333">
        <circle cx={32} cy={28} r={2} />
        <path d="m40.1 30c.7 0 2.9-2 2.9-2s-2.2-2-2.9-2c-.6 0-1.1.6-1.3 1.4h-7.8v1.2h7.8c.2.8.7 1.4 1.3 1.4" />
        <path d="m32 13.7l-1 14h2z" />
      </g>
      <g fill="#d3976e">
        <path d="m3 53h8v2h-8z" />
        <path d="m53 53h8v2h-8z" />
      </g>
    </svg>
  );
}
