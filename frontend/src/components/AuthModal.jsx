import { useState } from "react";
import PropTypes from "prop-types";
import { supabase } from "../services/supabaseClient";

export default function AuthModal({ onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ full_name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        onSuccess(data.user);
        onClose();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.full_name,
            },
          },
        });
        if (error) throw error;

        // Create user_settings row after successful signup
        await supabase.from("user_settings").insert({ id: data.user.id });

        onSuccess(data.user);
        onClose();
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{isLogin ? "Welcome back" : "Join ACP"}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">×</button>
          </div>

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <input
                name="full_name"
                type="text"
                placeholder="Full Name"
                className="w-full border p-2 rounded"
                onChange={handleInput}
                value={formData.full_name}
                required
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              onChange={handleInput}
              value={formData.email}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded"
              onChange={handleInput}
              value={formData.password}
              required
              minLength="8"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Join for Free"}
            </button>
          </form>

          <div className="mt-4 text-sm text-center">
            {isLogin ? (
              <>
                New to ACP?{" "}
                <button onClick={() => setIsLogin(false)} className="text-blue-600 font-medium">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setIsLogin(true)} className="text-blue-600 font-medium">
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

AuthModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
