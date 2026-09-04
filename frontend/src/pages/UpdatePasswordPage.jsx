import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updatePassword, signOut } from "../services/authService";
import { toast } from "react-hot-toast";
import supabase from "../services/supabaseClient";
import { useAuth } from "../context/AuthContext";
import "./UpdatePasswordPage.css";

function UpdatePasswordPage() {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const isUpdatedRef = useRef(false);
    const isOtpSessionRef = useRef(sessionStorage.getItem("animy_password_recovery") === "true");

    useEffect(() => {
        const checkSessionMethod = async () => {
            try {
                const res = await supabase.auth.getClaims();
                const claims = res?.data?.claims;
                const isOtp = claims?.amr?.some(
                    (entry) => entry.method === "otp" || entry.method === "recovery"
                );

                if (isOtp) {
                    isOtpSessionRef.current = true;
                }
            } catch (err) {
                console.error("Failed to read claims:", err);
            }
        };

        checkSessionMethod();

        const handleBeforeUnload = () => {
            if (isOtpSessionRef.current && !isUpdatedRef.current) {
                sessionStorage.removeItem("animy_password_recovery");
                signOut().catch(() => {});
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);

            // If user entered via recovery session and leaves without updating:
            if (isOtpSessionRef.current && !isUpdatedRef.current) {
                sessionStorage.removeItem("animy_password_recovery");
                signOut().catch(console.error);
                toast("You've been logged out as password reset was not finished.", { icon: '🔒' });
            }
        };
    }, []);

    const { mutate: handlePasswordUpdate, error, isPending } = useMutation({
        mutationFn: ({ newPassword }) => updatePassword(newPassword),
        onError: (err) => toast.error(err?.message || "Error updating password"),
        onSuccess: async () => {
            isUpdatedRef.current = true;
            sessionStorage.removeItem("animy_password_recovery");
            toast.success("Password updated successfully!");
            navigate("/profile");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newPassword.trim()) {
            toast.error("Please enter a valid password.");
            return;
        }
        handlePasswordUpdate({ newPassword });
    };

    const hasRecoveryIntent = sessionStorage.getItem("animy_password_recovery") === "true" || 
                              window.location.hash.includes("type=recovery");

    if (loading && hasRecoveryIntent) {
        return (
            <div className="update-password-page">
                <div className="update-password-card" style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
                    <p style={{ color: "var(--text-secondary)" }}>Verifying reset link...</p>
                </div>
            </div>
        );
    }

    if (!user && !hasRecoveryIntent) {
        return (
            <div className="update-password-page">
                <div className="update-password-card" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
                    <h2>Password Reset Required</h2>
                    <p style={{ color: "var(--text-secondary)", margin: "1rem 0 1.5rem" }}>
                        No active password reset request was found. Please request a new link to reset your password.
                    </p>
                    <button 
                        type="button" 
                        className="btn-submit-password" 
                        onClick={() => navigate("/auth/forgot-password")}
                    >
                        Request Reset Link
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="update-password-page">
            <h2>Update Password</h2>

            <div className="update-password-card">
                <form onSubmit={handleSubmit} className="update-password-form">
                    <div className="password-input-group">
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    <label className="show-password-label">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        Show password
                    </label>

                    {error && <p className="error-text">{error.message}</p>}

                    <button type="submit" className="btn-submit-password" disabled={isPending}>
                        {isPending ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePasswordPage;