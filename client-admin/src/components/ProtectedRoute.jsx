import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * A wrapper component for routes that require authentication
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isLoggedIn - Whether the user is logged in
 * @returns {JSX.Element} - The protected route content or redirect
 */
const ProtectedRoute = ({ isLoggedIn }) => {
  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the child routes
  return <Outlet />;
};

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
