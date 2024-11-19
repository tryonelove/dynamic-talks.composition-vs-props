import React from 'react';

export function Avatar({ src }: { src: string }) {
  return <img src={src} className='w-12 h-12 rounded-full' alt='avatar' />;
}
