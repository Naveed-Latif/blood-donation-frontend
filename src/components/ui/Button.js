'use client';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
        };
      case 'secondary':
        return {
          backgroundColor: '#0284c7',
          color: 'white',
          border: 'none',
        };
      case 'outline':
        return {
          backgroundColor: 'white',
          color: '#374151',
          border: '1px solid #d1d5db',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: '#374151',
          border: 'none',
        };
      case 'danger':
        return {
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
        };
      default:
        return {
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '0.5rem 0.75rem', fontSize: '0.875rem' };
      case 'md':
        return { padding: '0.5rem 1rem', fontSize: '0.875rem' };
      case 'lg':
        return { padding: '0.75rem 1.5rem', fontSize: '1rem' };
      case 'xl':
        return { padding: '1rem 2rem', fontSize: '1.125rem' };
      default:
        return { padding: '0.5rem 1rem', fontSize: '0.875rem' };
    }
  };

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    borderRadius: '0.375rem',
    transition: 'all 0.2s ease-in-out',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    outline: 'none',
    textDecoration: 'none',
    ...getVariantStyles(),
    ...getSizeStyles(),
  };

  const hoverStyles = disabled ? {} : {
    ':hover': {
      backgroundColor: variant === 'primary' ? '#b91c1c' : 
                     variant === 'secondary' ? '#0369a1' :
                     variant === 'outline' ? '#f9fafb' :
                     variant === 'ghost' ? '#f3f4f6' :
                     variant === 'danger' ? '#b91c1c' : '#b91c1c',
    }
  };

  return (
    <button
      style={baseStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
