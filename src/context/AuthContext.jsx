import { createContext, useContext, useState, useEffect } from "react";
import {supabase} from "../lib/supabaseClient";

// Create context
const AuthContext = createContext();

// Provide context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    // Fetching the current session and user from Supabase on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });


    // Listening for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }); 

    // Cleanup subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    }
  }, []);

  //Signup function
  const signUp = async (email, password, metadata={}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, user: data.user };
  };

  // SignIn function
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, user: data.user };
  };

  // SignOut function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    setUser(null);
    setSession(null);
  };


  return (
    <AuthContext.Provider
    value={{ user, session, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Consume context
export const useAuth = () => {
  return useContext(AuthContext);
};
