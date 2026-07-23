import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
    const token = useAuthStore((state) => state.token);
    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }
    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
