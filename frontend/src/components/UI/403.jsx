import { useNavigate } from "react-router-dom";

const Forbidden = () => {
    const navigate = useNavigate();

    return (
        <div className="custom-bg text-dark">
            <div className="d-flex align-items-center justify-content-center min-vh-100 px-2">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">403</h1>
                    <p className="fs-2 fw-medium mt-4">ACCESS DENIDE</p>
                    <p className="mt-4 mb-5">The page you're looking for doesn't exist or has been moved.</p>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="btn btn-light fw-semibold rounded-pill px-4 py-2 custom-btn"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Forbidden;