import React, { useState, useEffect } from 'react';


const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
   const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY
    });
  }
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return (
      <div className="testimonials-loading">
        <div className="spinner"></div>
        <p>Loading testimonials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="testimonials-error">
        <p>Error loading testimonials: {error}</p>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="testimonials-empty">
        <p>No testimonials available yet.</p>
      </div>
    );
  }

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        <h2 className="section-title">Client Testimonials</h2>
        <p className="section-subtitle">Hear what others say about my work</p>
        
        <div className="testimonials-carousel">
          <button className="nav-button prev" onClick={prevTestimonial}>
            &lt;
          </button>
          
          <div className="testimonials-track">
            {testimonials.map((testimonial, index) => (
              <div 
                className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
                key={testimonial._id}
              >
                <div className="testimonial-content">
                  <div className="quote-icon start">“</div>
                  <p className="testimonial-text">{testimonial.message}</p>
                  <div className="quote-icon end">”</div>
                </div>
                <div className="testimonial-author">
                  <div className="author-image">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.image} />
                    ) : (
                      <div className="avatar-placeholder">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-title">{testimonial.role}</p>
                    <p className="author-company">{testimonial.company}</p>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`star ${i < testimonial.rating.length ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="nav-button next" onClick={nextTestimonial}>
            &gt;
          </button>
        </div>
        
        <div className="testimonials-pagination">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;