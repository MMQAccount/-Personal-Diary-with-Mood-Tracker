import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./SignupPage.css";
import { signup } from "../../services/auth.service";
import { toast, ToastContainer } from "react-toastify";


interface FormValues {
  name: string;
  avatar: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage = () => {
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("rtl", i18n.language === "ar");
  }, [i18n.language]);

const onSubmit = async (data: FormValues) => {
  const { name, email, password, avatar } = data;  
  console.log("Data being sent:", { name, email, password, imageURL: avatar });

  try {
  await signup({ name, email, password, imageURL: avatar }); 
  toast.success(t("success")); 
  reset();
  
  setTimeout(() => {
    window.location.href = "/login";
  }, 2000); 
} catch (error: any) {

  const message =
  error?.response?.data?.message ||
  error?.message || "Signup failed. Please try again.";
  toast.error(message);
}
};

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  return (
    <div className="form-wrapper">
      <div className="signup-container">
        <button className="togglebt" onClick={toggleLanguage}>
          {t("toggleLang")}
        </button>

        <h1>{t("createAccount")}</h1>

        <form
          className="signup-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <input
            type="text"
            placeholder={t("fullName")}
            {...register("name", {
              required: t("required"),
              minLength: {
                value: 2,
                message: t("nameTooShort"),
              },
            })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}

          <input
            type="text"
            placeholder={t("avatarUrl")}
            {...register("avatar", {
              pattern: {
                value: /^https?:\/\/.+/i,
                message: t("invalidAvatarUrl"),
              },
            })}
          />
          {errors.avatar && (
            <span className="error">{errors.avatar.message}</span>
          )}

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

          <div className="password-input-wrapper">
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
              className="password-toggle-button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <div className="password-input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("confirmPasswordPlaceholder")}
              {...register("confirmPassword", {
                required: t("required"),
                validate: (value) =>
                  value === password || t("passwordMismatch"),
              })}
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword ? t("hidePassword") : t("showPassword")
              }
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}

          <button type="submit" className="signup-button">
            {t("signUp")}
          </button>
        </form>

        <p className="login-text">
          {t("alreadyHave")}{" "}
          <Link to="/login" className="login-link">
            {t("login")}
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

export default SignupPage;
