import React from 'react';

export default function Helmet_with_cross(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" width={64} height={64} {...props}>
      <path d="m32 64c-15.4 0-28-12.6-28-28v-4h4v4c0 13.2 10.8 24 24 24 13.2 0 24-10.8 24-24v-4h4v4c0 15.4-12.6 28-28 28" fill="#94989b" />
      <path d="M32,4C16.5,4,4,16.5,4,32h56C60,16.5,47.5,4,32,4z" fill="#ed4c5c" />
      <g fill="#c94747">
        <path d="m50 28h7c-1.2-9.6-8.5-17.5-18-20 5.8 3.3 10.1 10.9 11 20" />
        <path d="m25 8c-9.5 2.5-16.8 10.4-18 20h7c.9-9.1 5.2-16.7 11-20" />
      </g>
      <g fill="#594640">
        <path d="m14.7 28c.9-9 4.9-16.5 10.3-20-7.3 3.6-12.7 11.1-14 20h3.7" />
        <path d="m49.3 28c-1-9-4.9-16.5-10.3-20 7.3 3.6 12.7 11.1 14 20h-3.7" />
      </g>
      <g fill="#ed4c5c">
        <path d="m58 26h-52l-6 6h64z" />
        <circle cx={32} cy={5} r={5} />
      </g>
      <g fill="#fff">
        <path d="m30 9h4v16h-4z" />
        <path d="m24 15h16v4h-16z" />
      </g>
      <g fill="#3e4347">
        <path d="m4 32h4v4h-4z" />
        <path d="m56 32h4v4h-4z" />
      </g>
    </svg>
  );
}
