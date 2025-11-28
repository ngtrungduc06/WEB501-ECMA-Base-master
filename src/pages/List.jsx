import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function List() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3001/tours";
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setTours(res.data))
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("Không thể tải danh sách tour");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tour này?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setTours((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        console.error(err);
        alert("Xóa không thành công!");
      }
    }
  };

  if (loading) return <p className="mt-6 text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="mt-6 text-center text-red-500">{error}</p>;
  if (!tours.length)
    return <p className="mt-6 text-center text-gray-500">Chưa có tour nào</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tour</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">STT</th>
              <th className="px-4 py-2 border">Ảnh</th>
              <th className="px-4 py-2 border">Tên Tour</th>
              <th className="px-4 py-2 border">Điểm đến</th>
              <th className="px-4 py-2 border">Thời gian</th>
              <th className="px-4 py-2 border">Giá</th>
              <th className="px-4 py-2 border">Tour</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour, index) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td>

                <td className="px-4 py-2 border">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-2 border">{tour.name}</td>
                <td className="px-4 py-2 border">{tour.destination}</td>
                <td className="px-4 py-2 border">{tour.duration}</td>

                <td className="px-4 py-2 border">
                  {Number(tour.price).toLocaleString()} VNĐ
                </td>

                <td className="px-4 py-2 border">{tour.category}</td>

                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>

                  <button
                    onClick={() => navigate(`/pages/Edit/${tour.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;