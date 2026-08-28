import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/authService";
import { toast } from "react-hot-toast";

function ForgotPasswordForm() {
    const [email, setEmail] = useState("");

    const { mutate: sendResetEmail, error, isPending, isSuccess } = useMutation({
        mutationFn: ({ email }) => forgotPassword(email),
        onSuccess: () => toast.success("Reset link sent to your email!"),
        onError: (err) => toast.error(err.message || "Error sending reset link.")
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        sendResetEmail({ email });
    };

    return (
        <div className="auth-form-wrapper">
            <p className="auth-prompt-text">
                Enter your registered email address and we'll send you a secure link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    aria-label="Email address"
                />

                {isSuccess && (
                    <p className="success-message" role="status">
                        Check your inbox! We've sent a password reset link to {email}.
                    </p>
                )}

                {error && <p className="error-message" role="alert">{error.message}</p>}

                <div className="auth-footer">
                    <button type="submit" className="btn-login" disabled={isPending}>
                        {isPending ? "Sending link..." : "Send Reset Link"}
                    </button>

                    <p>Remember your password? <Link to="/auth/login">Back to log in</Link></p>
                </div>
            </form>
        </div>
    );
}

export default ForgotPasswordForm;