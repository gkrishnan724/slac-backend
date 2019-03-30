import React from 'react';

export default function Projector(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" width={64} height={64} {...props}>
      <path fill="#94989b" d="m27.2 58.6h12.3v5.4h-12.3z" />
      <g fill="#3e4347">
        <path d="m49 55.8c0 1.4-1.2 2.7-2.7 2.7h-27.2c-1.5 0-2.7-1.3-2.7-2.7v-19c0-1.4 1.2-2.7 2.7-2.7h27.2c1.5 0 2.7 1.3 2.7 2.7 0 0 0 19 0 19" />
        <circle cx="17.7" cy="17.7" r="17.7" />
      </g>
      <g fill="#d0d0d0">
        <circle cx="11.4" cy="8.7" r="4.1" />
        <circle cx={24} cy="8.7" r="4.1" />
        <circle cx={28} cy="20.3" r="4.1" />
        <circle cx="17.7" cy="28.4" r="4.1" />
        <circle cx="7.4" cy="20.3" r="4.1" />
        <circle cx="16.2" cy="15.4" r={1} />
        <circle cx="19.3" cy="15.4" r={1} />
        <circle cx="20.3" cy="18.3" r={1} />
        <circle cx="17.7" cy="20.3" r={1} />
        <circle cx="15.1" cy="18.3" r={1} />
      </g>
      <circle cx={49} cy="20.4" r={15} fill="#3e4347" />
      <g fill="#d0d0d0">
        <circle cx="43.7" cy="12.9" r="3.4" />
        <circle cx="54.3" cy="12.8" r="3.4" />
        <circle cx="57.8" cy="22.6" r="3.4" />
        <circle cx={49} cy="29.5" r="3.4" />
        <circle cx="40.3" cy="22.6" r="3.4" />
        <circle cx="47.7" cy="18.5" r=".9" />
        <circle cx="50.4" cy="18.5" r=".9" />
        <circle cx="51.2" cy="20.9" r=".9" />
        <circle cx={49} cy="22.7" r=".9" />
        <circle cx="46.9" cy="20.9" r=".9" />
      </g>
      <g fill="#3e4347">
        <path d="m6.8 40.9v20.4l10.9-5.5v-9.5z" />
        <path d="m55.8 35.4v9.5l-6.8-1.3v-6.8z" />
      </g>
    </svg>
  );
}
