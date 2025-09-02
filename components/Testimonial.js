"use client";

import { useState } from "react";

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
    website: "",
    rating: "5",
    message: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("You must give permission to display your testimonial.");
      return;
    }
   // console.log("Submitted Testimonial:", formData);
    // TODO: Send to backend or storage
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 mt-10 rounded-lg shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Submit a Testimonial</h2>

      <div>
        <label className="block font-medium mb-1" htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="role">Your Role *</label>
        <select
          id="role"
          name="role"
          required
          value={formData.role}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select your role</option>
          <option value="Client / Customer">Client / Customer</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Team Lead / Supervisor">Team Lead / Supervisor</option>
          <option value="Colleague / Teammate">Colleague / Teammate</option>
          <option value="Freelance Collaborator">Freelance Collaborator</option>
          <option value="Startup Co-founder / Partner">Startup Co-founder / Partner</option>
          <option value="Internship Mentor / Coordinator">Internship Mentor / Coordinator</option>
          <option value="Professor / Academic Supervisor">Professor / Academic Supervisor</option>
          <option value="NGO / Nonprofit Representative">NGO / Nonprofit Representative</option>
          <option value="Client Representative / Stakeholder">Client Representative / Stakeholder</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="company">Company / Organization</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="website">Website / LinkedIn (optional)</label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="rating">Rating (1-5)</label>
        <select
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          {[5, 4, 3, 2, 1].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="message">Testimonial *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        ></textarea>
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mr-2 mt-1"
        />
        <label htmlFor="consent" className="text-sm">
          I give permission for my testimonial to be displayed on this website.
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Submit Testimonial
      </button>
    </form>
  );
}
