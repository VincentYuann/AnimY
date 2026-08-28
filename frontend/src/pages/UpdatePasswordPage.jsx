import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updatePassword, signOut } from "../services/authService";
import { toast } from "react-hot-toast";
import supabase from "../services/supabaseClient";
import "./UpdatePasswordPage.css";

function UpdatePasswordPage() {
    const navigate = useNavigate();
    const [loginMethod, setLoginMethod] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const getSession = async () => {
            const { data: { claims } } = await supabase.auth.getClaims();
            if (claims?.amr?.[0]?.method) {
                setLoginMethod(claims.amr[0].method);
            }
        };

        getSession();

        return async () => {
            if (loginMethod === "otp") {
                await signOut();
                toast("You've been logged out as password reset was not finished.", { icon: '🔒' });
            }
        };
    }, [loginMethod]);

    const { mutate: handlePasswordUpdate, error, isPending } = useMutation({
        mutationFn: ({ newPassword }) => updatePassword(newPassword),
        onError: () => toast.error("Error updating password"),
        onSuccess: async () => {
            toast.success("Password updated successfully!");
            if (loginMethod === "otp") {
                await signOut();
            } else {
                navigate("/profile");
            }
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