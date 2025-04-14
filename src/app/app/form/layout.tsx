import { FormProvider } from '@/features/user/form-context';

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return <FormProvider>{children}</FormProvider>;
}
