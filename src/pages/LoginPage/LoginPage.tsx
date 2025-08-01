import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../utils/UserContext";
import "./LoginPage.css";
import { login as loginRequest } from "../../services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { useUserData } from "../../providers/user-provider";

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { refreshUser } = useUserData();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await loginRequest({
        email: data.email,
        password: data.password,
      });

      console.log("Logged in user response:", response);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);

      login(response.data);
      await refreshUser({
        diariesChanged: true,
        tagsChanged: true,
        userChanged: true,
      });

      reset();
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || t("loginFailed"));
    }
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  return (
    <div className="form-wrapper">
      <div className="login-container">
        <button className="togglebt" onClick={toggleLanguage}>
          {t("toggleLang")}
        </button>

        <div className="signup-header">
          <h1>{t("welcome")}</h1>
          <p>{t("enterDetails")}</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              {...register("email", {
                required: t("required"),
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: t("invalidEmail"),
                },
              })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>

          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("passwordPlaceholder")}
              {...register("password", {
                required: t("required"),
                minLength: {
                  value: 6,
                  message: t("shortPassword"),
                },
              })}
            />
            <button
              type="button"
              className={`eye-btn ${i18n.language === "ar" ? "eye-left" : "eye-right"
                }`}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="toggle password visibility"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="signup-button">
            {t("loginButton")}
          </button>
        </form>

        <p className="signup-text">
          {t("noAccount")}{" "}
          <Link to="/signup" className="signup-link">
            {t("signUp")}
          </Link>
        </p>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={i18n.language === "ar"}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default LoginPage;
