export type SwalIcon = 'success' | 'error' | 'warning' | 'info' | 'question'

export type SwalModalProps = {
  title: string
  text: string
  icon: SwalIcon
  showCancelButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm?: () => void
}
