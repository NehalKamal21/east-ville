import React from 'react';
import { Button } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { authService } from '../utils/authService';

interface LogoutButtonProps {
  variant?: string;
  size?: 'sm' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  variant = 'outline-light', 
  size = 'sm',
  className = '',
  style = {}
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={`d-flex align-items-center ${className}`}
      style={{
        transition: 'all 0.3s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <FaSignOutAlt className="me-2" />
      Logout
    </Button>
  );
};

export default LogoutButton; 