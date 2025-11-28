import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Edit() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("Tour nội địa");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/tours/${id}`)
      .then((res) => {
        const t = res.data;
        setName(t.name);
        setPrice(t.price);
        setDestination(t.destination);
        setDuration(t.duration);
        setCategory(t.category);
        setImage(t.image);
      })
      .catch(() => toast.error("Không tìm thấy tour"));
  }, [id]);

  // Submit update
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:3001/tours/${id}`, {
        name,
        price: Number(price),
        destination,
        duration,
        category,
        image,
      });

      toast.success("Sửa thành công!");
      navigate("/List");
    } catch (error) {
      toast.error("Sửa thất bại!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Chỉnh sửa Tour</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>

        <div>
          <label className="block font-medium mb-1">Tên Tour</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Điểm đến</label>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Thời gian</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Ảnh (URL)</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Giá</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 bg-white"
          >
            <option value="Tour nội địa">Tour nội địa</option>
            <option value="Tour quốc tế">Tour quốc tế</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

export default Edit;