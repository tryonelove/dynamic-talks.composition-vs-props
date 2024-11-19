import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <div className='p-4 shadow bg-white flex gap-4 items-center rounded'>
      {children}
    </div>
  );
}
