import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add() {
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
    active: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Tên tour không được để trống";

    if (!formData.destination.trim())
      newErrors.destination = "Điểm đến không được để trống";

    if (!formData.duration.trim())
      newErrors.duration = "Thời gian không được để trống";

    if (!formData.description.trim())
      newErrors.description = "Mô tả không được để trống";

    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Giá phải lớn hơn 0";

    if (!formData.available || Number(formData.available) < 0)
      newErrors.available = "Số lượng không hợp lệ";

    if (!formData.image.trim())
      newErrors.image = "Link ảnh không được để trống";
    else if (!formData.image.startsWith("http"))
      newErrors.image = "URL ảnh phải bắt đầu bằng http hoặc https";

    if (!formData.category.trim())
      newErrors.category = "Vui lòng chọn loại tour";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await axios.post(API_URL, {
        ...formData,
        price: Number(formData.price),
        available: Number(formData.available),
      });

      alert("Thêm tour thành công!");
      navigate("/List");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra, thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Thêm Tour Mới</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="font-medium">Tên tour</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Nhập tên tour..."
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="font-medium">Điểm đến</label>
          <input
            type="text"
            name="destination"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Nhập điểm đến..."
            value={formData.destination}
            onChange={handleChange}
          />
          {errors.destination && (
            <p className="text-red-500">{errors.destination}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Thời gian</label>
          <input
            type="text"
            name="duration"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="VD: 3 ngày 2 đêm"
            value={formData.duration}
            onChange={handleChange}
          />
          {errors.duration && <p className="text-red-500">{errors.duration}</p>}
        </div>

        <div>
          <label className="font-medium">Giá</label>
          <input
            type="number"
            name="price"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Nhập giá..."
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>

        <div>
          <label className="font-medium">Số lượng còn</label>
          <input
            type="number"
            name="available"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Nhập số lượng..."
            value={formData.available}
            onChange={handleChange}
          />
          {errors.available && (
            <p className="text-red-500">{errors.available}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Ảnh (URL)</label>
          <input
            type="text"
            name="image"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Nhập URL ảnh..."
            value={formData.image}
            onChange={handleChange}
          />
          {errors.image && <p className="text-red-500">{errors.image}</p>}
        </div>

        <div>
          <label className="font-medium">Mô tả</label>
          <textarea
            name="description"
            rows="3"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Nhập mô tả..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Loại tour</label>
          <select
            name="category"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">-- Chọn loại tour --</option>
            <option value="nội địa">Tour nội địa</option>
            <option value="quốc tế">Tour quốc tế</option>
          </select>
          {errors.category && <p className="text-red-500">{errors.category}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />
          <label>Hiện tour</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Đang thêm..." : "Thêm mới"}
        </button>
      </form>
    </div>
  );
}

export default Add;
