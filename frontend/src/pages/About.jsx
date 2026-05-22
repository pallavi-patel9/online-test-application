import React from 'react';

const AboutUs = () => {
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-8 mx-auto text-center">
                    <h1 className="display-4 mb-4">About IBT System</h1>
                    <p className="lead text-muted">
                        A fully automated, scalable examination system built for Indian universities.
                    </p>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                            <i className="bi bi-lightbulb fs-1 text-primary"></i>
                            <h3 className="mt-3">Our Mission</h3>
                            <p className="text-muted">
                                To revolutionize online exams with fairness, speed, and reliability.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                            <i className="bi bi-people fs-1 text-success"></i>
                            <h3 className="mt-3">Team</h3>
                            <ul className="list-unstyled text-muted">
                                <li>Amitesh Kushwaha</li>
                                <li>Himanshu Kumar Vishwakarma</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                            <i className="bi bi-building fs-1 text-warning"></i>
                            <h3 className="mt-3">Guided By</h3>
                            <p className="text-muted">
                                Er. Brijesh Mishra, SoftPro India<br />
                                Babu Banarasi Das University, Lucknow
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-lg-10 mx-auto">
                    <h2 className="mb-3">Technical Stack</h2>
                    <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-primary p-2">React</span>
                        <span className="badge bg-secondary p-2">Bootstrap 5</span>
                        <span className="badge bg-success p-2">Node.js</span>
                        <span className="badge bg-danger p-2">MongoDB</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;