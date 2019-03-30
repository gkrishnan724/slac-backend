import React from 'react';

export default function Speaker(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlnsXlink="http://www.w3.org/1999/xlink" width={64} height={64} {...props}>
      <path d="M11.1,45H3.8C1.7,45,0,43.4,0,41.5V22.5c0-2,1.7-3.5,3.8-3.5h7.3V45z" fill="#8b979e" id={0} />
      <use xlinkHref="#0" />
      <path d="M29.8,2.2C31.1,0.9,11.1,19,11.1,19v26c0,0,10.3,7.9,18.7,16.8V2.2z" fill="#b0bdc6" />
      <g fill="#333">
        <path d="m33 25.5v13.1c3.9 0 7-2.9 7-6.5 0-3.7-3.1-6.6-7-6.6" />
        <path d="m33 62.5c0 .8-.7 1.5-1.6 1.5-.9 0-1.6-.7-1.6-1.5v-61c0-.8.7-1.5 1.6-1.5.9 0 1.6.7 1.6 1.5v61" />
      </g>
      <path d="M11.1,40.2H3.8c-2.1,0-3.8-1-3.8-2.2V26c0-1.2,1.7-2.2,3.8-2.2h7.3V40.2z" fill="#8b979e" />
      <path d="M11.1,40.2H3.8c-2.1,0-3.8-1-3.8-2.2V26c0-1.2,1.7-2.2,3.8-2.2h7.3V40.2z" fill="#b0bdc6" />
      <path fill="#dfe9ef" d="m29.8 13.3l-18.7 10.5v16.4l18.7 10.5z" />
      <path fill="#8b979e" d="m29.8 13.3h3.2v37.5h-3.2z" />
      <path fill="#333" d="m3.8 19h7.3v26h-7.3z" />
    </svg>
  );
}
