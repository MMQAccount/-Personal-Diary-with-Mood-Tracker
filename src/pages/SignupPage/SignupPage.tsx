import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./SignUpPage.css";

type Language = "en" | "ar";
type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage: React.FC = () => {
  const [language, setLanguage] = useState<Language>("en");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const password = watch("password");

  useEffect(() => {
    document.body.classList.toggle("rtl", language === "ar");
  }, [language]);

  const texts = {
    en: {
      createAccount: "Create Account",
      emailPlaceholder: "Email Address",
      passwordPlaceholder: "Password",
      confirmPasswordPlaceholder: "Confirm Password",
      signUp: "Sign Up",
      alreadyHave: "Already have an account?",
      login: "Log in",
      passwordMismatch: "Passwords do not match!",
      required: "This field is required",
      invalidEmail: "Invalid email address",
      shortPassword: "Password must be at least 6 characters",
      success: "Account created successfully! Please login.",
      toggleLang: "Arabic",
    },
    ar: {
      createAccount: "إنشاء حساب",
      emailPlaceholder: " البريد الإلكتروني",
      passwordPlaceholder: " كلمة المرور",
      confirmPasswordPlaceholder: " تأكيد كلمة المرور",
      signUp: "سجل",
      alreadyHave: "هل لديك حساب؟",
      login: "سجل الدخول",
      passwordMismatch: "!كلمات المرور غير متطابقة",
      required: "هذا الحقل مطلوب",
      invalidEmail: "صيغة البريد الإلكتروني غير صحيحة",
      shortPassword: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      success: "تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.",
      toggleLang: "English",
    },
  };

  const t = texts[language];

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    alert(t.success);
    reset();
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <div className="signup-container">
      <button className="togglebt" onClick={toggleLanguage}>
        {t.toggleLang}
      </button>

      <h1>{t.createAccount}</h1>

      <form
        className="signup-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
        {errors.email && <span className="error">{errors.email.message}</span>}

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

        <input
          type="password"
          placeholder={t.confirmPasswordPlaceholder}
          {...register("confirmPassword", {
            required: t.required,
            validate: (value) => value === password || t.passwordMismatch,
          })}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}

        <button type="submit" className="signup-button">
          {t.signUp}
        </button>
      </form>

      <p className="login-text">
        {t.alreadyHave}{" "}
        <Link to="/login" className="login-link">
          {t.login}
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
