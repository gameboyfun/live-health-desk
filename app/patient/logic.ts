import { useEffect, useRef, useState } from 'react'

import SwalModal from '../components/sweet-alert'

import axios from 'axios'
import { useForm } from 'react-hook-form'
import { ref, set } from 'firebase/database'
import { database } from '@/firebaseConfig'

import type { Form } from './types'
import type { Status } from '../staff/types'
import type { Language } from '../api/languages/types'
import type { Religions } from '../api/religions/types'
import type { Nationalities } from '../api/nationalities/types'

export default function useLogic() {
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
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isSubmittingRef = useRef(false)

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

  const setDB = (formValues: Form, status: Status) => {
    if (Object.values(formValues).some((value) => value)) {
      const form = {
        firstName: formValues.firstName ?? '',
        middleName: formValues.middleName ?? '',
        lastName: formValues.lastName ?? '',
        phoneNumber: formValues.phoneNumber ?? '',
        birthDate: formValues.birthDate ?? '',
        gender: formValues.gender ?? '',
        language: formValues.language ?? '',
        nationality: formValues.nationality ?? '',
        email: formValues.email ?? '',
        religion: formValues.religion ?? '',
        address: formValues.address ?? '',
        emergencyContactName: formValues.emergencyContactName ?? '',
        status: status
      }

      const dataRef = ref(database, 'data')
      set(dataRef, form)
    }
  }

  const clearForm = () => {
    const form = {
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
      emergencyContactName: '',
      status: 'Active'
    }
    const dataRef = ref(database, 'data')
    set(dataRef, form)
  }

  const handleSubmitToDB = (data: Form) => {
    isSubmittingRef.current = true
    setDB(data, 'Submit')
    // disabled form
    setTimeout(() => {
      isSubmittingRef.current = false
    }, 0)
    SwalModal({
      title: 'Success',
      text: 'Data has been submitted',
      icon: 'success',
    })()
  }

  useEffect(() => {
    fetchLanguages()
    fetchNationalities()
    fetchReligions()
    clearForm()
  }, [])

  useEffect(() => {
    if (isSubmittingRef.current) {
      return
    }

    setDB(formValues, 'Active')
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDB(formValues, 'Inactive')
    }, 5000)
  }, [formValues])

  return {
    control,
    register,
    setValue,
    handleSubmit,
    errors,
    genders,
    languages,
    nationalities,
    religions,
    handleSubmitToDB
  }
}
