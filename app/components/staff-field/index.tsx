import { Chip } from '@nextui-org/react'
import type { StaffFieldProps } from './types'

export const StaffField = ({ title, value, color, fullWidth }: StaffFieldProps) => {
  return (
    <article className={`prose text-white ${fullWidth && 'sm:col-span-2'}`}>
      <h2 className='m-0'>{title}:</h2>
      {color ? <Chip color={color}>{value}</Chip> : <div>{value || '-'}</div>}
    </article>
  )
}
