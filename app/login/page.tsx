"use client"
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, Book, Github } from 'lucide-react';
import { createClient } from '@/utiles/supabase/client';
import { useUserStore } from '@/store/store';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import student_img from "@/public/images/3d_student.jpg";



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const login = useUserStore(state => state.login);

  const supabase = createClient();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Redirect to dashboard if already logged in
        window.location.href = '/resources';
      }
    };
    checkSession();
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
    setLoading(true);
    login(data.user as any);
    // setMessage({ type: '', content: data.user ? 'Login successful! Redirecting...' : '' });

    

    if (error) {
      console.log(error.message,"____ERROR MESSAGE");
      toast.error(error.message);
      setMessage({ type: 'error', content: error.message });
    } else {
      setMessage({ type: 'success', content: data.user.email ? 'Login successful! Redirecting...' : '' });
      console.log(data.user);
      toast.success('Login successful! Redirecting...');
      window.location.href = '/resources';
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage({ type: '', content: '' });

    // const { error } = await supabase.auth.signInWithOAuth({
    //   provider: 'google',
    //   options: {
    //     redirectTo: `${window.location.origin}/dashboard`,
    //   },
    // });

    // if (error) {
    //   setMessage({ type: 'error', content: error.message });
    //   setLoading(false);
    // }
  };

  const handleGitHubLogin = async () => {
    // setLoading(true);
    // setMessage({ type: '', content: '' });

    // const { error } = await supabase.auth.signInWithOAuth({
    //   provider: 'github',
    //   options: {
    //     redirectTo: `${window.location.origin}/dashboard`,
    //   },
    // });

    // if (error) {
    //   setMessage({ type: 'error', content: error.message });
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-300">
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
    // Define default options
    className: '',
    duration: 3000,
    removeDelay: 1000}} />
      <div className="flex w-[900px] h-[500px] overflow-hidden rounded-2xl shadow-lg">
        
        {/* Left Section */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8 relative">
          <h2 className="text-2xl font-semibold mb-8">Login</h2>

          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Username"
            className="w-full mb-4 px-4 py-2 rounded-full shadow focus:outline-none"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="w-full mb-2 px-4 py-2 rounded-full shadow focus:outline-none"
          />

          <div className="w-full flex justify-end mb-4">
            <Link href="/" className="text-sm text-gray-500 hover:text-purple-600">
              Forgot Password?
            </Link>
          </div>

          <button type='submit' onClick={handleEmailLogin} className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition">
            Login
          </button>

          <p className="mt-4 text-sm">
            Don’t have an account?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-purple-500 flex justify-center items-center relative">
          <Image
            src={student_img}
            alt="Student_illustration"
            width={400}
            height={400}
            priority
            className="max-h-[350px]"
          />
        </div>
      </div>
    </div>
  );
}