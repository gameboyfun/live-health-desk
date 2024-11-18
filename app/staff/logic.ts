import { useEffect, useMemo, useState } from 'react'

import { onValue, ref } from 'firebase/database'
import { database } from '@/firebaseConfig'

import type { Color, Field, FormDB, Status } from './types'

export default function useLogic() {
  const [data, setData] = useState<FormDB>()

  const mapStateToStatus = (status: Status): Color => {
    switch (status) {
      case 'Active':
        return 'default'
      case 'Inactive':
        return 'warning'
      default:
        return 'success'
    }
  }

  useEffect(() => {
    const dbRef = ref(database, 'data')
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const fetchedData = snapshot.val()
      setData(fetchedData)
    })

    // Cleanup listener when the component unmounts
    return () => unsubscribe()
  }, [])

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
    emergencyContactName,
    status
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
        emergencyContactName: '',
        status: 'Active'
      }
    )
  }, [data])

  const field: Field[] = [
    {
      title: 'First Name',
      value: firstName,
      fullWidth: false
    },
    {
      title: 'Middle Name',
      value: middleName,
      fullWidth: false
    },
    {
      title: 'Last Name',
      value: lastName,
      fullWidth: false
    },
    {
      title: 'Birth Date',
      value: birthDate,
      fullWidth: false
    },
    {
      title: 'Gender',
      value: gender,
      fullWidth: false
    },
    {
      title: 'Phone Number',
      value: phoneNumber,
      fullWidth: false
    },
    {
      title: 'Email',
      value: email,
      fullWidth: false
    },
    {
      title: 'Preferred Language',
      value: language,
      fullWidth: false
    },
    {
      title: 'Nationality',
      value: nationality,
      fullWidth: false
    },
    {
      title: 'Religion',
      value: religion,
      fullWidth: false
    },
    {
      title: 'Address',
      value: address,
      fullWidth: true
    },
    {
      title: 'Emergency Contact Name',
      value: emergencyContactName,
      fullWidth: true
    },
    {
      title: 'Status',
      value: status,
      color: mapStateToStatus(status as Status),
      fullWidth: true
    }
  ]

  return {
    field
  }
}
