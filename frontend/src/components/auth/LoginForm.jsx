import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { loginWithPassword } from "../../services/authService";
import { toast } from "react-hot-toast";

function LoginForm() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { mutate: login, error, isPending } = useMutation({
        mutationFn: ({ email, password }) => loginWithPassword(email, password),
        onSuccess: () => navigate("/"),
        onError: (err) => toast.error(err.message || "Error logging in.")
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email: credentials.email, password: credentials.password });
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <input
                type="email"
                placeholder="Email address"
                className="auth-input"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                required
                autoComplete="email"
                aria-label="Email address"
            />
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="auth-input"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
                autoComplete="current-password"
                aria-label="Password"
            />

            <label className="show-password">
                <input 
                    type="checkbox" 
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)} 
                />
                Show password
            </label>

            {error && <p className="error-message" role="alert">{error.message}</p>}

            <div className="auth-footer">
                <button type="submit" className="btn-login" disabled={isPending}>
                    {isPending ? "Logging in..." : "Log in"}
                </button>

                <p>Don’t have an account? <Link to="/auth/signup">Sign up</Link></p>
                <Link to="/auth/forgot-password">Forgot password?</Link>
            </div>
        </form>
    );
}

export default LoginForm;