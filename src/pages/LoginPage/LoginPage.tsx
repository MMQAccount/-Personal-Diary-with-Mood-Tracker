import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

type Language = "en" | "ar";
type FormValues = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [language, setLanguage] = useState<Language>("en");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  useEffect(() => {
    document.body.classList.toggle("rtl", language === "ar");
  }, [language]);

  const texts = {
    en: {
      welcome: "Welcome Back!",
      enterDetails: "Please enter your details to login.",
      emailPlaceholder: "Email Address",
      passwordPlaceholder: "Password",
      loginButton: "Log In",
      noAccount: "Don't have an account?",
      signUp: "Sign Up",
      incorrectAlert: "Email or password is incorrect",
      toggleLang: "Arabic",
      required: "This field is required",
      invalidEmail: "Invalid email address",
      shortPassword: "Password must be at least 6 characters",
    },
    ar: {
      welcome: "!مرحباً بعودتك",
      enterDetails: "يرجى إدخال بياناتك لتسجيل الدخول",
      emailPlaceholder: " البريد الإلكتروني",
      passwordPlaceholder: " كلمة المرور",
      loginButton: "تسجيل الدخول",
      noAccount: "ليس لديك حساب؟",
      signUp: "سجل",
      incorrectAlert: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      toggleLang: "English",
      required: "هذا الحقل مطلوب",
      invalidEmail: "صيغة البريد الإلكتروني غير صحيحة",
      shortPassword: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
    },
  };

  const t = texts[language];

  const onSubmit = (data: FormValues) => {
    if (
      data.email === "237510@ppu.edu.ps" &&
      data.password === "Mariam@123456789"
    ) {
      reset();
      navigate("/");
    } else {
      alert(t.incorrectAlert);
      reset();
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <div className="login-container">
      <button className="togglebt" onClick={toggleLanguage}>
        {t.toggleLang}
      </button>

      <div className="signup-header">
        <h1>{t.welcome}</h1>
        <p>{t.enterDetails}</p>
      </div>

      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <input
            type="email"
            placeholder={t.emailPlaceholder}
            {...register("email", {
              required: t.required,
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: t.invalidEmail,
              },
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder={t.passwordPlaceholder}
            {...register("password", {
              required: t.required,
              minLength: {
                value: 6,
                message: t.shortPassword,
              },
            })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <button type="submit" className="signup-button">
          {t.loginButton}
        </button>
      </form>

      <p className="signup-text">
        {t.noAccount}{" "}
        <Link to="/signup" className="signup-link">
          {t.signUp}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
