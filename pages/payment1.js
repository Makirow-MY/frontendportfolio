import React, { useState, useEffect } from 'react';


const ShopPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/project/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['all', ...new Set(projects.map(project => project.projectcategory[0]))];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.projectcategory === activeCategory);

  const addToCart = (project) => {
    setCartItems([...cartItems, project]);
  };

  const removeFromCart = (projectId) => {
    setCartItems(cartItems.filter(item => item._id !== projectId));
  };
console.log("category", categories)
  if (isLoading) {
    return (
      <div className="shop-loading">
        <div className="loading-spinner"></div>
        <p>Loading our premium projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-error">
        <p>Error loading projects: {error}</p>
      </div>
    );
  }

  return (
    <div className="shop-container">
      {/* Hero Section */}
      <section className="shop-hero">
        <div className="hero-content">
          <h1 className="hero-title">Premium Source Code Marketplace</h1>
          <p className="hero-subtitle">
            Acquire production-ready projects crafted by a senior developer
          </p>
          <div className="hero-scroll-indicator">
            <span>Explore Projects</span>
            <div className="scroll-arrow"></div>
          </div>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* Categories Navigation */}
      <section className="shop-categories">
        <div className="categories-container">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid">
        {filteredProjects.map(project => (
          <div className="project-card" key={project._id}>
            <div className="project-media">
              <div className="project-badge">{project.projectcategory}</div>
              <img 
                src={project.images[0]} 
                alt={project.title} 
                className="project-thumbnail"
              />
              <div className="project-overlay">
                <button 
                  className="preview-btn"
                  onClick={() => window.open(project.livepreview, '_blank')}
                >
                  Live Preview
                </button>
              </div>
            </div>
            <div className="project-details">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.shortDescription}</p>
              <div className="project-meta">
                <span className="tech-stack">
                  {/* {project.techStack.join(' • ')} */}
                </span>
                <span className="project-price">$90
                  {/* {project.price} */}
                  </span>
              </div>
              <div className="project-actions">
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart(project)}
                >
                  Add to Cart
                </button>
                <button 
                  className="view-details"
                  onClick={() => window.open(`/projects/${project.slug}`, '_blank')}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="shop-features">
        <h2 className="features-title">Why Buy From Our Shop?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Production-Ready</h3>
            <p>All projects are battle-tested and ready for deployment</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Full Ownership</h3>
            <p>Complete source code with unlimited usage rights</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Comprehensive Docs</h3>
            <p>Detailed documentation and setup instructions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛠️</div>
            <h3>Support Included</h3>
            <p>30 days of email support for setup questions</p>
          </div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      <div className={`cart-sidebar ${cartItems.length > 0 ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-cart" onClick={() => setCartItems([])}>
            &times;
          </button>
        </div>
        <div className="cart-items">
          {cartItems.map(item => (
            <div className="cart-item" key={item._id}>
              <img src={item.images[0]} alt={item.title} />
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <span>$80{
                //item.price
                }</span>
              </div>
              <button 
                className="remove-item"
                onClick={() => removeFromCart(item._id)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${cartItems.reduce((sum, item) => sum + 90, 0)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;