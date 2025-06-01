import React from 'react';
import { ThemeSettings } from '../../types/Theme';

interface ThemePreviewProps {
  theme: ThemeSettings;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  const getRadiusSize = () => {
    switch (theme.borderRadius) {
      case 'none': return '0px';
      case 'small': return '4px';
      case 'medium': return '8px';
      case 'large': return '16px';
      default: return '8px';
    }
  };
  
  const getShadowStyle = () => {
    switch (theme.shadows) {
      case 'none': return 'none';
      case 'soft': return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      case 'medium': return '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      case 'sharp': return '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      default: return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
  };
  
  const getSpacing = () => {
    switch (theme.spacing) {
      case 'compact': return { padding: '0.75rem', gap: '0.75rem' };
      case 'comfortable': return { padding: '1.5rem', gap: '1.5rem' };
      case 'spacious': return { padding: '2.5rem', gap: '2rem' };
      default: return { padding: '1.5rem', gap: '1.5rem' };
    }
  };
  
  const spacing = getSpacing();
  const borderRadius = getRadiusSize();
  const boxShadow = getShadowStyle();
  
  return (
    <div 
      className="border rounded-lg overflow-hidden"
      style={{ 
        color: theme.colors.text,
        fontFamily: theme.fonts.body,
      }}
    >
      {/* Header */}
      <div 
        style={{ 
          backgroundColor: theme.colors.primary,
          padding: spacing.padding,
        }}
      >
        <div 
          style={{ 
            color: '#fff',
            fontFamily: theme.fonts.heading,
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          Business Name
        </div>
      </div>
      
      {/* Hero */}
      <div 
        style={{ 
          backgroundColor: theme.colors.secondary,
          padding: spacing.padding,
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <h1 
          style={{ 
            fontFamily: theme.fonts.heading,
            fontWeight: 'bold',
            fontSize: '2rem',
            marginBottom: '0.75rem',
          }}
        >
          Welcome to Our Business
        </h1>
        <p style={{ marginBottom: '1.5rem' }}>
          Your trusted partner for quality services
        </p>
        <button 
          style={{ 
            backgroundColor: theme.colors.accent,
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius,
            fontWeight: 'bold',
            border: 'none',
            boxShadow,
          }}
        >
          Learn More
        </button>
      </div>
      
      {/* Content */}
      <div 
        style={{ 
          padding: spacing.padding,
          backgroundColor: theme.colors.background,
        }}
      >
        <h2 
          style={{ 
            fontFamily: theme.fonts.heading,
            fontWeight: 'bold',
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: theme.colors.primary,
          }}
        >
          Our Services
        </h2>
        
        <div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: spacing.gap,
            marginBottom: '2rem',
          }}
        >
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              style={{ 
                backgroundColor: theme.colors.lightBackground,
                padding: spacing.padding,
                borderRadius,
                boxShadow,
              }}
            >
              <div 
                style={{ 
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: theme.colors.primary,
                  borderRadius: '50%',
                  marginBottom: '1rem',
                }}
              />
              <h3 
                style={{ 
                  fontFamily: theme.fonts.heading,
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  marginBottom: '0.5rem',
                }}
              >
                Service {i}
              </h3>
              <p style={{ fontSize: '0.875rem' }}>
                This is a description of the service that your business provides to customers.
              </p>
            </div>
          ))}
        </div>
        
        <div 
          style={{ 
            backgroundColor: theme.colors.lightBackground,
            padding: spacing.padding,
            borderRadius,
            boxShadow,
          }}
        >
          <h2 
            style={{ 
              fontFamily: theme.fonts.heading,
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: theme.colors.primary,
            }}
          >
            About Us
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            We are a dedicated team of professionals committed to providing the highest quality services to our clients. 
            With years of experience in the industry, we have built a reputation for excellence and reliability.
          </p>
          <div 
            style={{ 
              backgroundColor: theme.colors.primary,
              height: '2px',
              width: '4rem',
              marginBottom: '1rem',
            }}
          />
          <p>
            Our mission is to deliver innovative solutions that help our clients achieve their goals and overcome challenges.
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <div 
        style={{ 
          backgroundColor: theme.colors.text,
          color: '#fff',
          padding: spacing.padding,
          textAlign: 'center',
          fontSize: '0.875rem',
        }}
      >
        © 2025 Business Name. All rights reserved.
      </div>
    </div>
  );
};

export default ThemePreview;