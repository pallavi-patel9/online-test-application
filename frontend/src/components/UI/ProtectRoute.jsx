import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const Protect = ({ children, role }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (!token) {
            toast.error("Please register or login first.");
            setShouldRedirect(true);
        } else if (role && userRole !== role) {
            toast.error("You aren't able to use this route");
            setShouldRedirect(true);
        }
    }, [token, role, userRole]);

    if (shouldRedirect) {
        return <Navigate to='/forbidden' replace />;
    }

    if (!token || (role && userRole !== role)) {
        // Return null or loading spinner while waiting for redirect
        return null;
    }

    return children;    
};

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (token) {
            toast.error("Already logged in!");
            setShouldRedirect(true);
        }
    }, [token]);

    if (shouldRedirect) {
        return <Navigate to="/" replace />;
    }

    if (token) {
        // Return null or loading spinner while waiting for redirect
        return null;
    }

    return children;
};

export { Protect, PublicRoute };