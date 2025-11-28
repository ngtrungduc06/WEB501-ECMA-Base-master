import { useEffect, useState } from "react";
import axios from "axios";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/tours";

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    description: "",
    available: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy thông tin tour theo ID
  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => setFormData(res.data))
      .catch(() => setError("Không thể tải thông tin tour"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, formData);
      alert("Cập nhật tour thành công!");
      navigate("/List"); // điều hướng về list
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  if (loading) return <p className="text-center mt-6">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Sửa tour</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-medium">Tên Tour</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-medium">Điểm đến</label>
          <input
            type="text"
            name="destination"
            className="w-full border p-2 rounded"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-medium">Thời gian</label>
          <input
            type="text"
            name="duration"
            className="w-full border p-2 rounded"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-medium">Giá</label>
          <input
            type="number"
            name="price"
            className="w-full border p-2 rounded"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-medium">Số lượng còn</label>
          <input
            type="number"
            name="available"
            className="w-full border p-2 rounded"
            value={formData.available}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-medium">Ảnh</label>
          <input
            type="text"
            name="image"
            className="w-full border p-2 rounded"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-medium">Mô tả</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default Edit;
