import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Remove withRouter import

import { logout } from '../../../store/actions/AuthActions';
import { isAuthenticated } from '../../../store/selectors/AuthSelectors';

function LogoutPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use the useNavigate hook

    function onLogout() {
        dispatch(logout());
        // Optionally, add logic to redirect after logout
        navigate('/login'); // Redirect to login after logout
        // window.location.reload(); // If you want to reload the page
    }

    return (
        <>
            <Link className="dropdown-item ai-icon" onClick={onLogout}>
                <svg
                    id="icon-logout" xmlns="http://www.w3.org/2000/svg"
                    className="text-danger" width={18} height={18} viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1={21} y1={12} x2={9} y2={12} />
                </svg>
                <span className="ms-2">Logout</span>
            </Link>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};

export default connect(mapStateToProps)(LogoutPage); // Remove withRouter
