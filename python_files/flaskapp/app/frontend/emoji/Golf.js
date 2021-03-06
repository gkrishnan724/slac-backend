import React from 'react';

export default function Golf(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" width={64} height={64} {...props}>
      <ellipse cx={32} cy="49.7" rx={30} ry="12.3" fill="#97b113" />
      <path d="m28 47c0 0 3-6.6 5.6-9.6h-.9c0 0-4.7 5.7-6.7 9.3l2 .3" opacity=".3" fill="#1e1e1e" />
      <ellipse cx="26.6" cy="50.3" rx="8.7" ry="3.7" fill="#c7c7c7" />
      <path d="m26.6 48.2c4.2 0 7.7 1.2 8.5 2.9.1-.3.2-.5.2-.8 0-2-3.9-3.7-8.7-3.7s-8.7 1.6-8.7 3.7c0 .3.1.5.2.8.9-1.6 4.3-2.9 8.5-2.9" fill="#3d2905" />
      <path d="m45 9.3c-.9-.5-15.8-8.2-18-9.3v20.7c2.2-1.1 17.1-8.8 18-9.3.7-.3.7-1.7 0-2.1" fill="#ed4c5c" />
      <path d="m28 53.9c0 0-.9.1-2.4.1v-7.2h2.4v7.1" opacity=".5" fill="#1e1e1e" />
      <path fill="#d3976e" d="m25 0h2v54h-2z" />
      <path fill="#89664c" d="m25 52.2h2v1.8h-2z" />
    </svg>
  );
}
