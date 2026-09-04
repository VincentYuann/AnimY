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
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            setLoading(false);

            if (event === 'PASSWORD_RECOVERY') {
                navigate("/update-password");
            } else if (event === 'SIGNED_IN') {
                if (currentUser && !welcomeMessage.current) {
                    const name = currentUser.user_metadata?.full_name || "User";
                    toast(<span>Welcome back! <b>{name}</b> </span>, { icon: '👋' });
                    welcomeMessage.current = true;
                }
            } else if (event === 'SIGNED_OUT') {
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