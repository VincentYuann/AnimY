import { signOut } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import "./ProfilePage.css";

function ProfilePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { mutate: handleSignOut, isPending } = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            navigate("/", { replace: true });
            toast.success("You've been logged out.");
        },
        onError: (error) => {
            toast.error(error.message || "Error logging out.");
        }
    });

    const handleUpdatePassword = () => {
        navigate("/update-password");
    };

    const avatarUrl = user?.user_metadata?.avatar_url
        ? `${user.user_metadata.avatar_url}?t=${new Date().getTime()}`
        : "/profile-placeholder.jpg";

    const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Anime Explorer";
    const email = user?.email || "";

    return (
        <div className="profile-page">
            <h2>User Profile</h2>

            <div className="profile-card">
                <div className="profile-avatar-wrapper">
                    <img
                        src={avatarUrl}
                        referrerPolicy="no-referrer"
                        alt="Profile Avatar"
                        className="profile-avatar"
                        onError={(e) => { e.currentTarget.src = "/profile-placeholder.jpg"; }}
                    />
                </div>

                <h3 className="profile-name">{displayName}</h3>
                {email && <p className="profile-email">{email}</p>}

                <div className="profile-actions">
                    <button 
                        type="button" 
                        onClick={handleUpdatePassword} 
                        className="btn-update-password"
                    >
                        Update Password
                    </button>
                    <button 
                        type="button" 
                        onClick={() => handleSignOut()} 
                        className="btn-signout"
                        disabled={isPending}
                    >
                        {isPending ? "Signing out..." : "Sign Out"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;