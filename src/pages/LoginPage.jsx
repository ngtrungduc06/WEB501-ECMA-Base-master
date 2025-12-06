import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) return toast.error('Vui lòng nhập Email.');
        if (!isValidEmail(email)) return toast.error('Email không đúng định dạng.');
        if (!password) return toast.error('Vui lòng nhập Mật khẩu.');
        if (password.length < 6) return toast.error('Mật khẩu phải có ít nhất 6 ký tự.');

        try {
            const { data } = await axios.post("http://localhost:3001/login", {
                email,
                password
            });

            if (data.accessToken) {
                toast.success("Đăng nhập thành công!");
                localStorage.setItem("token", data.accessToken);
                setToken(data.accessToken);
                nav("/list");
            } else {
                toast.error("Email hoặc mật khẩu sai.");
            }
        } catch (err) {
            toast.error("Đăng nhập thất bại.");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">Đăng nhập</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập email của bạn"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Mật khẩu</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập mật khẩu"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Đăng nhập
                </button>
            </form>

            <div className="mt-4 text-center">
                <p>
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;

