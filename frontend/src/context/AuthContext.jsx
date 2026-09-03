import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import supabase from "../services/supabaseClient"

const AuthContext = createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const welcomeMessage = useRef(false);

    useEffect(() => {
        // Check for URL recovery hash or error descriptions on initial load
        const hash = window.location.hash;
        if (hash) {
            if (hash.includes("type=recovery")) {
                sessionStorage.setItem("animy_password_recovery", "true");
                navigate("/update-password");
            } else if (hash.includes("error_description")) {
                const params = new URLSearchParams(hash.replace("#", "?"));
                const desc = params.get("error_description");
                if (desc) {
                    toast.error(desc.replace(/\+/g, " "));
                }
            }
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            setLoading(false);

            if (event === 'PASSWORD_RECOVERY') {
                sessionStorage.setItem("animy_password_recovery", "true");
                navigate("/update-password");
            } else if (event === 'SIGNED_IN') {
                setUser(currentUser);

                const isRecovery = sessionStorage.getItem("animy_password_recovery") === "true" || 
                                   window.location.hash.includes("type=recovery") || 
                                   window.location.pathname === "/update-password";

                if (!isRecovery && currentUser && !welcomeMessage.current) {
                    const name = currentUser.user_metadata?.full_name || "User";
                    toast(<span>Welcome back! <b>{name}</b> </span>, { icon: '👋' });
                    welcomeMessage.current = true;
                }
            } else if (event === 'SIGNED_OUT') {
                sessionStorage.removeItem("animy_password_recovery");
                setUser(null);
                welcomeMessage.current = false;
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}
export default AuthProvider;