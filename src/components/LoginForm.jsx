import axios from 'axios';
import {useState} from 'react';
const LoginForm = ({setIsLoggedIn}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const validateLogin = (e) => {
        axios.post('http://api.jaydnserrano.com/login', {
            username: username,
            password: password
        }).then(res => {
            console.log(res.data);
            if(res.data.success) setIsLoggedIn(true);
            else {
                alert('Login Failed');
            }
            return res.data;
        }).catch(err => {
            console.log(err);
            return false
        })
    }
    return (
        <div id='LoginForm' class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
                <div>
                    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-white">JS Admin Login</h2>
                </div>
                <input type="hidden" name="remember" value="true"/>
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label class="sr-only">Username:</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username"/>
                        </div>
                        <div>
                            <label class="sr-only">Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit" onClick={validateLogin}class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        Sign in
                        </button>
                    </div>
            </div>
        </div>
    );
}
export default LoginForm;