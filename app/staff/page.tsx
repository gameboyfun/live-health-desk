'use client'
import { Card, CardBody } from '@nextui-org/react'
import { StaffField } from '../components/staff-field'
import useLogic from './logic'

export default function Staff() {
  const { field } = useLogic()

  return (
    <div className='min-h-screen p-8 flex flex-col gap-4'>
      <article className='prose self-center'>
        <h1 className='text-white'>Staff View</h1>
      </article>
      <div className='grid grid-cols-1  gap-4 w-full sm:w-2/3 xl:w-1/2 self-center'>
        <Card className='bg-primary-500'>
          <CardBody className='grid grid-cols-1 gap-4 w-full self-center p-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full self-center'>
              {field.map(({ title, value, color, fullWidth }, idx) => (
                <StaffField
                  key={idx}
                  title={title}
                  value={value}
                  color={color}
                  fullWidth={fullWidth}
                />
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
