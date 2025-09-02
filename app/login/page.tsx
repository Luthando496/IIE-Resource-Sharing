"use client"
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, Book, Github } from 'lucide-react';
import { createClient } from '@/utiles/supabase/client';
import { useUserStore } from '@/store/store';



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
      setMessage({ type: 'error', content: error.message });
    } else {
      setMessage({ type: 'success', content: data.user.email ? 'Login successful! Redirecting...' : '' });
      console.log(data.user);
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
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="card-bg rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold primary-text mb-2">Welcome Back</h1>
              <p className="secondary-text">Sign in to access your resources</p>
            </div>

            {message.content && (
              <div
                className={`p-3 rounded-lg mb-6 text-sm ${
                  message.type === 'error'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {message.content}
              </div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium primary-text mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium primary-text mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-500" />
                    ) : (
                      <Eye size={18} className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm secondary-text">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-btn hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-lg duration-500 cursor-pointer flex items-center justify-center"
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{message.content}</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 duration-500 cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4"/>
                  </svg>
                  <span className="ml-2">Google</span>
                </button>

                <button
                  onClick={handleGitHubLogin}
                  disabled={loading}
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 duration-500 cursor-pointer"
                >
                  <Github size={20} />
                  <span className="ml-2">GitHub</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="secondary-text text-sm">
                Don't have an account?{' '}
                <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
     
    </div>
  );
}