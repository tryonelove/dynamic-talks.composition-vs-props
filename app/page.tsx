import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex justify-center items-center gap-8 flex-1'>
      <Link
        className='text-white hover:underline underline-offset-2'
        href='not-composable'
      >
        Not really composable
      </Link>
      <Link
        className='text-white hover:underline underline-offset-2'
        href='composable'
      >
        Composable preview
      </Link>
    </div>
  );
}
