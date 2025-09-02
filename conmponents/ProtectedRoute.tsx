// components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/store';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn } = useUserStore();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoggedIn && !user) {
      router.push('/login');
    }
  }, [user, isLoggedIn, router]);
  
  if (isLoggedIn) {
    return <div>Loading Login...</div>;
  }
  
  return user ? <>{children}</> : null;
}