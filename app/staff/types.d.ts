export type Status = 'Active' | 'Inactive' | 'Submit'

export type Color = default | primary | secondary | success | warning | danger

export type FormDB = {
  firstName: string
  middleName: string
  lastName: string
  birthDate: string
  gender: string
  phoneNumber: string
  email: string
  language: string
  nationality: string
  religion: string
  address: string
  emergencyContactName: string
  status: Status
}

export type Field = {
  title: string
  value: string
  color? : Color
  fullWidth?: boolean
}
