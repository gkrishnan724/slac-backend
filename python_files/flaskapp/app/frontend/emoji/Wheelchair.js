import React from 'react';

export default function Wheelchair(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" width={64} height={64} {...props}>
      <circle cx={32} cy={32} r={30} fill="#4fd1d9" />
      <g fill="#fff">
        <path d="m48.7 43l-2.5 2.7-6-9.2h-7.2v-4.1h8v-4.2h-8v-8.2h-4v20.6h9.1l7.4 11.4 5.5-5.6z" />
        <circle cx={31} cy={13} r={4} />
        <path d="m29.4 48.9c-4.5 0-8.2-3.7-8.2-8.2 0-3 1.7-5.7 4.1-7.1v-4.6c-4.8 1.7-8.2 6.3-8.2 11.6-.1 6.9 5.5 12.4 12.3 12.4 3.9 0 7.4-1.8 9.6-4.6l-2.5-3.7c-1.4 2.5-4.1 4.2-7.1 4.2" />
      </g>
    </svg>
  );
}
