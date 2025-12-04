import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/register', {

        email,
        password,
      });

      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (error) {

      const errorMessage = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">Đăng ký tài khoản mới</h1>

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
            placeholder="Nhập email"
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
          className="w-full px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Đăng ký
        </button>
      </form>

      <div className="mt-4 text-center">
        <p>
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
