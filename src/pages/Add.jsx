import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Add() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [destination, setDestination] = useState('')
  const [duration, setDuration] = useState('')
  const [category, setCategory] = useState('Tour nội địa')
  const [image, setImage] = useState('')



  const navigate = useNavigate();
  // handleChange
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !price || !destination || !duration || !image) {
      return toast.error("Vui lòng nhập đầy đủ thông tin!")
    }

    if (Number(price) <= 0) {
      return toast.error("Giá phải lớn hơn 0")
    }
    
    try {
      await axios.post('http://localhost:3001/tours', {
        name, // es6
        price: Number(price),
        destination: destination,
        duration: duration,
        category: category,
        image: image,
      })
      toast.success('thêm thành công')
      navigate("/List");
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Text input */}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Tên Tour
          </label>
          <input
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Điểm đến
          </label>
          <input
            value={destination}
            onChange={event => setDestination(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Thời gian
          </label>
          <input
            value={duration}
            onChange={event => setDuration(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Ảnh (URL)</label>
          <input
            value={image}
            onChange={event => setImage(event.target.value)}
            type="text"
            placeholder="Nhập link ảnh..."
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Price
          </label>
          <input
            value={price}
            onChange={event => setPrice(event.target.value)}
            type="number"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Select */}
        <div>
          <label htmlFor="selectOption" className="block font-medium mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            id="selectOption"
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Tour nội địa">Tour nội địa</option>
            <option value="Tour quốc tế">Tour quốc tế</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Add