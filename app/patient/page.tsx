'use client'
import { useEffect, useState } from 'react'

import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { database } from '../../firebaseConfig'
import { ref, set } from 'firebase/database'

import {
  Select,
  Input,
  DatePicker,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
  Textarea,
  Button
} from '@nextui-org/react'

import type { Language } from '../api/languages/types'
import type { Nationalities } from '../api/nationalities/types'
import type { Religions } from '../api/religions/types'
import type { Form } from './types'

export default function Patient() {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Form>()
  const formValues = watch()
  const genders = [
    {
      key: 'Male',
      label: 'Male'
    },
    {
      key: 'Female',
      label: 'Female'
    }
  ]
  const [languages, setLanguages] = useState<Language[]>([])
  const [nationalities, setNationalities] = useState<Nationalities[]>([])
  const [religions, setReligions] = useState<Religions[]>([])

  const fetchLanguages = async () => {
    try {
      const response = await axios.get('/api/languages')
      if (response) {
        setLanguages(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchNationalities = async () => {
    try {
      const response = await axios.get('/api/nationalities')
      if (response) {
        setNationalities(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchReligions = async () => {
    try {
      const response = await axios.get('/api/religions')
      if (response) {
        setReligions(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setDB = (formValues: Form) => {
    if (Object.values(formValues).some((value) => value)) {
      const birthDate = formValues.birthDate ?? ''
      const gender = formValues.gender ?? ''
      const language = formValues.language ?? ''
      const nationality = formValues.nationality ?? ''

      const dataRef = ref(database, 'data')
      set(dataRef, { ...formValues, birthDate, gender, language, nationality })
    }
  }

  useEffect(() => {
    fetchLanguages()
    fetchNationalities()
    fetchReligions()
  }, [])

  useEffect(() => {
    setDB(formValues)
  }, [formValues])
  console.log('FIREBASE_DATABASE_URL:', process.env.FIREBASE_DATABASE_URL);

  return (
    <form onSubmit={handleSubmit((data) => setDB(data))}>
      <div className='min-h-screen p-8 flex flex-col gap-4'>
        <article className='prose self-center'>
          <h1 className='text-white'>Patient Form</h1>
        </article>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-2/3 xl:w-1/2 self-center'>
          <Input
            variant='bordered'
            color='primary'
            radius='lg'
            label='First Name'
            isInvalid={!!errors.firstName}
            {...register('firstName', { required: true })}
          />
          <Input
            variant='bordered'
            color='primary'
            radius='lg'
            label='Middle Name'
            placeholder='optional'
            {...register('middleName')}
          />
          <Input
            variant='bordered'
            color='primary'
            radius='lg'
            label='Last Name'
            isInvalid={!!errors.lastName}
            {...register('lastName', { required: true })}
          />
          <Controller
            name='birthDate'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                {...field}
                variant='bordered'
                color='primary'
                radius='lg'
                label='Date of Birth'
                maxValue={today(getLocalTimeZone())}
                isInvalid={!!errors.birthDate}
                value={
                  field.value
                    ? new CalendarDate(
                        parseInt(field.value.split('/')[2]),
                        parseInt(field.value.split('/')[1]),
                        parseInt(field.value.split('/')[0])
                      )
                    : undefined
                }
                onChange={(date) => {
                  if (date) {
                    const formattedDate = `${date.day}/${date.month}/${date.year}`
                    setValue('birthDate', formattedDate)
                    field.onChange(formattedDate)
                  }
                }}
              />
            )}
          />
          <Controller
            name='gender'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                className='text-white'
                items={genders}
                variant='bordered'
                color='primary'
                radius='lg'
                label='Gender'
                disallowEmptySelection
                isInvalid={!!errors.gender}
                selectedKeys={[field.value]}
                onSelectionChange={(key) => field.onChange(key)}
                renderValue={() => <div className='!text-white'>{field.value}</div>}
              >
                {(gender) => (
                  <SelectItem key={gender.key} className='text-black'>
                    {gender.label}
                  </SelectItem>
                )}
              </Select>
            )}
          />
          <Input
            variant='bordered'
            color='primary'
            radius='lg'
            label='Phone Number'
            type='tel'
            placeholder='0XXXXXXXXX'
            isInvalid={!!errors.phoneNumber}
            {...register('phoneNumber', { required: true, pattern: /^0\d{8,9}$/ })}
          />
          <Input
            type='email'
            variant='bordered'
            color='primary'
            radius='lg'
            label='Email'
            isInvalid={!!errors.email}
            {...register('email', {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i
            })}
          />
          <Controller
            name='language'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                variant='bordered'
                color='primary'
                radius='lg'
                label='Preferred Language'
                isClearable={false}
                defaultItems={languages}
                isInvalid={!!errors.language}
                value={field.value}
                onSelectionChange={(date) => field.onChange(date)}
                selectedKey={field.value}
              >
                {(language) => (
                  <AutocompleteItem key={language.key} className='text-black'>
                    {language.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
          <Controller
            name='nationality'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                variant='bordered'
                color='primary'
                radius='lg'
                label='Nationality'
                isClearable={false}
                defaultItems={nationalities}
                isInvalid={!!errors.nationality}
                value={field.value}
                onSelectionChange={(date) => field.onChange(date)}
                selectedKey={field.value}
              >
                {(nationality) => (
                  <AutocompleteItem key={nationality.key} className='text-black'>
                    {nationality.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
          <Autocomplete
            variant='bordered'
            color='primary'
            radius='lg'
            label='Religion'
            defaultItems={religions}
            placeholder='optional'
            {...register('religion')}
          >
            {(religion) => (
              <AutocompleteItem key={religion.key} className='text-black'>
                {religion.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div className='grid grid-cols-1 gap-4 w-full sm:w-2/3 xl:w-1/2 self-center justify-items-center'>
          <Textarea
            variant='bordered'
            color='primary'
            radius='lg'
            label='Address'
            isInvalid={!!errors.address}
            {...register('address', { required: true })}
          />
          <Textarea
            variant='bordered'
            color='primary'
            radius='lg'
            label='Emergency Contact'
            placeholder='optional: name and relationship'
            {...register('emergencyContactName')}
          />
          <Button
            radius='full'
            color='primary'
            className='w-full sm:w-2/3 xl:w-1/2 justify-center'
            type='submit'
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  )
}
