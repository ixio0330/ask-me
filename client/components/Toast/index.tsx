import toast, { Toaster as Toast } from 'react-hot-toast';
import color from '@/client/color';

export const errorNotify = (message?: string) => toast.error(message ?? '오류가 발생했어요', {
  iconTheme: {
    primary: color.primary,
    secondary: color.background,
  },
});

export const successNotify = (message: string) => toast.success(message, {
  iconTheme: {
    primary: color.primary,
    secondary: color.background,
  },
});

export const notify = (message: string) => toast(message, {
  iconTheme: {
    primary: color.primary,
    secondary: color.background,
  },
});

export default Toast;
