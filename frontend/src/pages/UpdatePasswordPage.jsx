import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updatePassword, signOut } from "../services/authService";
import { toast } from "react-hot-toast";
import "./UpdatePasswordPage.css";

function UpdatePasswordPage() {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const isUpdated = useRef(false);

    useEffect(() => {
        return () => {
            if (!isUpdated.current) {
                signOut().catch(() => {});
                toast("You've been logged out as password reset was not finished.", { icon: '🔒' });
            }
        };
    }, []);

    const { mutate: handlePasswordUpdate, error, isPending } = useMutation({
        mutationFn: ({ newPassword }) => updatePassword(newPassword),
        onError: (err) => toast.error(err?.message || "Error updating password"),
        onSuccess: () => {
            isUpdated.current = true;
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