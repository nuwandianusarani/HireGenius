import React, { useState } from 'react';
import axios from 'axios';

function CVUploadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    cv: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cv: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('address', formData.address);
    data.append('phone', formData.phone);
    data.append('cv', formData.cv);

    try {
      const response = await axios.post('http://localhost:5000/upload', data);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading CV:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} />
      <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} />
      <input type="file" name="cv" onChange={handleFileChange} />
      <button type="submit">Upload CV</button>
    </form>
  );
}

export default CVUploadForm;
