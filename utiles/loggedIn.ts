import { useUserStore } from '@/store/store';
 const {isLoggedIn} = useUserStore(state => state)
  export const userLoggedIn = isLoggedIn;
