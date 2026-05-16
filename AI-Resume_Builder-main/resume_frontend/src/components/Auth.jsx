import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURLL } from "../api/ResumeService"; 
import axios from "axios";

export const Auth = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  async function sendRequest() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseURLL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError && axios.isAxiosError(error)) {
        console.error("Auth error:", error.response?.data?.message);
        alert(error.response?.data?.message || "Something went wrong");
      } else {
        console.error("Unexpected error:", error);
        alert("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[85vh] flex justify-center items-center px-4 sm:px-6 lg:px-8 bg-base-200/50">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body p-6 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content mb-3">
              {type === "signup" ? "Create an account" : "Welcome back"}
            </h2>
            <p className="text-base-content/70 text-base sm:text-lg">
              {type === "signin" ? "Don't have an account?" : "Already have an account?"}
              <Link className="ml-2 link link-primary font-semibold hover:text-primary-focus transition-colors" to={type === "signin" ? "/signup" : "/signin"}>
                {type === "signin" ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </div>

          <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
            {type === "signup" && (
              <LabelledInput
                label="Full Name"
                placeholder="e.g. John Doe"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            )}

            <LabelledInput
              label="Email Address"
              type="email"
              placeholder="e.g. name@company.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />

            <LabelledInput
              label="Password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />

            <div className="pt-6">
              <button
                disabled={loading}
                type="button"
                onClick={sendRequest}
                className="btn btn-primary w-full text-lg h-14 sm:h-16 rounded-xl shadow-lg hover:shadow-primary/50 transition-all hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : type === "signup" ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function LabelledInput({ label, placeholder, onChange, type }) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold text-base-content text-sm sm:text-base">{label}</span>
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="input input-bordered w-full h-12 sm:h-14 sm:text-lg focus:input-primary transition-all bg-base-100"
        placeholder={placeholder}
        required
      />
    </div>
  );
}