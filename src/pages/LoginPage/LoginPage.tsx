import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../utils/UserContext";
import "./LoginPage.css";

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

  useEffect(() => {
    document.body.classList.toggle("rtl", i18n.language === "ar");
  }, [i18n.language]);

  const onSubmit = (data: FormValues) => {
    if (
      data.email === "237510@ppu.edu.ps" &&
      data.password === "Mariam@123456789"
    ) {
      login({
        name: "Mariam",
        avatar: "https://i.pravatar.cc/150?u=mariam",
        email: data.email,
      });
      reset();
      navigate("/");
    } else {
      alert(t("incorrectAlert"));
      reset();
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
              className={`eye-btn ${
                i18n.language === "ar" ? "eye-left" : "eye-right"
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
      </div>
    </div>
  );
};

export default LoginPage;
