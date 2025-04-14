// app/app/list/layout.tsx
import { FormListProvider } from '@/features/user/list-context';

export default function ListLayout({ children }: { children: React.ReactNode }) {
  return <FormListProvider>{children}</FormListProvider>;
}
