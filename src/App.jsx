import { Toaster } from "react-hot-toast";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLayout from './layout/AdminLayout';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

          <a className="text-xl font-semibold">
            <strong>WEB501 App</strong>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">Trang chủ</Link>
            <Link to="/list" className="hover:text-gray-200">Danh sách</Link>
            <Link to="/add" className="hover:text-gray-200">Thêm mới</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {!token ? (
              <>
                <Link to="/login" className="hover:text-gray-200">Đăng nhập</Link>
                <Link to="/register" className="hover:text-gray-200">Đăng ký</Link>
              </>
            ) : (
              <>
                <span className="text-gray-200">Xin chào!</span>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken(null);
                  }}
                  className="hover:text-gray-300"
                >
                  Đăng xuất
                </button>
              </>
            )}
          </div>

        </div>
      </nav>

      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB501</h1>
        <p className="text-lg text-gray-600">Ứng dụng quản lý dữ liệu</p>

        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/list" element={<List />} />
            <Route path="/add" element={<Add />} />
            <Route path="/pages/edit/:id" element={<Edit />} />
          </Route>
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
