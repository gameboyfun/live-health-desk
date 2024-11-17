'use client'
import { Card, CardBody } from '@nextui-org/react'
import React, { useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { Form } from '../patient/types'

export default function Staff() {
  const socket = useMemo(
    () =>
      io('http://localhost:4000', {
        transports: ['websocket', 'polling']
      }),
    []
  )
  socket.on('connect', () => {
    console.log('i am connected')
  })
  socket.on('message', (message) => {
    setData(JSON.parse(message))
  })
  const [data, setData] = useState<Form>()

  const {
    firstName,
    middleName,
    lastName,
    birthDate,
    gender,
    phoneNumber,
    email,
    language,
    nationality,
    religion,
    address,
    emergencyContactName
  } = useMemo(() => {
    return (
      data ?? {
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        phoneNumber: '',
        email: '',
        language: '',
        nationality: '',
        religion: '',
        address: '',
        emergencyContactName: ''
      }
    )
  }, [data])

  return (
    <div className='min-h-screen p-8 flex flex-col gap-4'>
      <article className='prose self-center'>
        <h1 className='text-white'>Staff View</h1>
      </article>
      <div className='grid grid-cols-1  gap-4 w-full sm:w-2/3 xl:w-1/2 self-center'>
        <Card className='bg-primary-500'>
          <CardBody className='grid grid-cols-1 gap-4 w-full self-center p-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full self-center'>
              <article className='prose text-white'>
                <h2 className='m-0'>First Name:</h2>
                <div>{firstName || '-'}</div>
              </article>
              <article className='prose text-white'>
                <h2 className='m-0'>Middle Name:</h2>
                <div>{middleName || '-'}</div>
              </article>
              <article className='prose text-white'>
                <h2 className='m-0'>Last Name:</h2>
                <div>{lastName || '-'}</div>
              </article>
              <article className='prose text-white'>
                <h2 className='m-0'>Date of Birth:</h2>
                <div>{birthDate || '-'}</div>
              </article>
              <article className='prose text-white'>
                <h2 className='m-0'>Gender:</h2>
                <div>{gender || '-'}</div>
              </article>
              <article className='prose text-white'>
                <h2 className='m-0'>Phone Number:</h2>
                <div>{phoneNumber || '-'}</div>
              </article>
              <article className='prose text-white'>
                <h2 className='m-0'>Email:</h2>
                <div>{email || '-'}</div>
              </article>
              <article className='prose text-white'>
                <h2 className='m-0'>Preferred Language:</h2>
                <div>{language || '-'}</div>
              </article>
              <article className='prose text-white'>
                <h2 className='m-0'>Nationality:</h2>
                <div>{nationality || '-'}</div>
              </article>
              <article className='prose text-white'>
                <h2 className='m-0'>Religion:</h2>
                <div>{religion || '-'}</div>
              </article>
            </div>
            <article className='prose text-white'>
              <h2 className='m-0'>Address:</h2>
              <div>{address || '-'}</div>
            </article>
            <article className='prose text-white'>
              <h2 className='m-0'>Emergency Contact:</h2>
              <div>{emergencyContactName || '-'}</div>
            </article>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
