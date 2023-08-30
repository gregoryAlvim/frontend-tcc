import { toast } from 'react-toastify'

export class ToastMessages {
  public static showToastError(message: string) {
    toast.error(message)
  }

  public static showToastSuccess(message: string) {
    toast.success(message)
  }
}
