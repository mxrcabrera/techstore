import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styles
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  background: #333;
  color: white;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
`;

const Button = styled.button`
  background: ${props => props.variant === 'blue' ? '#007bff' : '#28a745'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

// Simulate a feature flag decision
const isFeatureEnabled = () => {
  return Math.random() > 0.5; // 50% chance to enable the feature
};

// Simulate an experiment variation
const getExperimentVariation = () => {
  const variations = ['variation_1', 'variation_2', 'variation_3'];
  return variations[Math.floor(Math.random() * variations.length)];
};

// Component demonstrating Feature Flags
const FeatureFlag = () => {
  if (isFeatureEnabled()) {
    return <div>New feature enabled!</div>;
  }
  return null;
};

// Component demonstrating A/B Testing
const BannerExperiment = () => {
  const variation = getExperimentVariation();
  
  const banners = {
    variation_1: {
      title: '30% Off!',
      subtitle: 'On all smartphones'
    },
    variation_2: {
      title: 'Free Shipping',
      subtitle: 'On orders over $500'
    },
    variation_3: {
      title: 'Special Offer',
      subtitle: 'Limited time only'
    }
  };

  const content = banners[variation];

  return (
    <div style={{ background: '#f8f9fa', padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
      <h2>{content.title}</h2>
      <p>{content.subtitle}</p>
    </div>
  );
};

// Component demonstrating personalization
const PersonalizedContent = ({ userDevice }) => {
  const content = userDevice === 'mobile' 
    ? 'Discover our mobile offers'
    : 'Great discounts on laptops';

  return <h3>{content}</h3>;
};

// Component demonstrating event tracking
const TrackingButton = ({ productId, productName }) => {
  const handleClick = () => {
    console.log('Event tracked:', productName);
  };

  return (
    <Button onClick={handleClick}>
      Buy Now
    </Button>
  );
};

// Sample data
const products = [
  { id: 1, name: 'Smartphone X', price: 699 },
  { id: 2, name: 'Laptop Pro', price: 1299 },
  { id: 3, name: 'Tablet Air', price: 499 },
];

// Main component
function App() {
  const [userDevice, setUserDevice] = useState(window.innerWidth <= 768 ? 'mobile' : 'desktop');

  useEffect(() => {
    const handleResize = () => {
      setUserDevice(window.innerWidth <= 768 ? 'mobile' : 'desktop');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Header>
        <h1>TechStore</h1>
        <FeatureFlag />
      </Header>

      <Container>
        <BannerExperiment />
        <PersonalizedContent userDevice={userDevice} />

        <ProductGrid>
          {products.map(product => (
            <ProductCard key={product.id}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <TrackingButton 
                productId={product.id}
                productName={product.name}
              />
            </ProductCard>
          ))}
        </ProductGrid>
      </Container>
    </div>
  );
}

export default App;