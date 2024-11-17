'use client'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const goTo = (path: string) => {
    router.push(path)
  }
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center'>
        <article className='prose lg:prose-xl flex flex-col'>
          <h1 className='m-0 lg:m-0 self-center text-primary'>Live Health Desk</h1>
          <p className='text-primary-50'>select your role</p>
        </article>

        <div className='flex gap-4 items-center flex-col sm:flex-row w-full'>
          <Button radius='full' color='primary' className='w-full' onClick={() => goTo('/patient')}>
            Patient
          </Button>
          <Button
            radius='full'
            variant='bordered'
            color='primary'
            className='w-full'
            onClick={() => goTo('/staff')}
          >
            Staff
          </Button>
        </div>
      </main>
    </div>
  )
}
