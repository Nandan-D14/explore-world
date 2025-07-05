import React,{useState} from "react";
import '../styles/contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., send data to a server)
    console.log('Form Submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' }); // Clear the form
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-content">
        <h2 className="contact-us-heading">Contact Us</h2>
        <p className="contact-us-description">
          Have any questions or feedback? We're here to help. Fill out the form below and we will get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="contact-us-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="contact-us-input"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="contact-us-input"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="contact-us-textarea"
            required
          />
          <button type="submit" className="contact-us-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

