import { Outlet, useLocation } from 'react-router-dom';
import { GoogleAuthButton } from '../components/auth';
import './AuthPage.css';

function AuthPage() {
    const location = useLocation();
    const isForgotPassword = location.pathname.includes('forgot-password');
    const isSignup = location.pathname.includes('signup');

    const title = isForgotPassword 
        ? "Reset Password" 
        : isSignup 
            ? "Create Account" 
            : "Welcome Back";

    const subtitle = isForgotPassword 
        ? "We'll send a recovery link to your email" 
        : isSignup 
            ? "Join AnimY to track and discover anime" 
            : "Log in to access your anime collection";

    return (
        <main className="auth-page-container">
            <div className="auth-card">
                <div className="auth-brand-header">
                    <h2>{title}</h2>
                    <p className="auth-subtitle">{subtitle}</p>
                </div>

                {!isForgotPassword && (
                    <>
                        <div className="google-auth-wrapper">
                            <GoogleAuthButton />
                        </div>

                        <div className="auth-divider" aria-hidden="true">
                            <div className="auth-divider-line"></div>
                            <span className="auth-divider-text">or</span>
                            <div className="auth-divider-line"></div>
                        </div>
                    </>
                )}

                <div className="main-login">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export default AuthPage;