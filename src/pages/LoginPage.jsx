import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate() // bai so 10 routing

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:3001/login', {
                email, // es6
                password,
            })
            toast.success('Đăng nhập thành công')
            localStorage.setItem('token', data.accessToken)
            nav('/list')
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">Đăng nhập</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block font-medium mb-1">
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        id="email"
                        required
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập email của bạn"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block font-medium mb-1">
                        Mật khẩu
                    </label>
                    <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        id="password"
                        required
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập mật khẩu"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Đăng nhập
                </button>
            </form>

            <div className="mt-4 text-center">
                <p>
                    Chưa có tài khoản?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline font-medium">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
