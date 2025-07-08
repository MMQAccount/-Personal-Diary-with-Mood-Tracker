import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import DiaryPage from "./pages/DiaryPage/DiaryPage";
import HomePage from "./pages/HomePage/HomePage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import DiaryForm from "./components/Forms/DiaryForm/DiaryForm";
import DiaryVoice from "./components/Forms/DiaryVoice/DiaryVoice";
import DiaryImage from "./components/Forms/DiaryImage/DiaryImage";
import DiaryProvider from "./providers/diary-provider";
import DiaryDetailsPage from "./pages/DiaryDetails/DiaryDetails";
import DiaryEditPage from "./pages/DiaryEdit.tsx/DiaryEditPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { ThemeProvider } from "./utils/ThemeContext";
import "./i18n";
import { UserProvider } from "./utils/UserContext";
import Layout from "./components/Layout/Layout";
function App() {
  return (
    <>
      <UserProvider>
        <ThemeProvider>
          <BrowserRouter>
            <DiaryProvider>
              <Header />
              <Routes>
                <Route path={`/`} element={<HomePage />} />
                <Route path={`/diaryPage`} element={<DiaryPage />} />
                <Route path={`/diaryForm`} element={<DiaryForm />} />
                <Route path={`/diaryVoice`} element={<DiaryVoice />} />
                <Route path={`/diaryImage`} element={<DiaryImage />} />
                <Route
                  path={`/dispalyDiary/:id`}
                  element={<DiaryDetailsPage />}
                />
                <Route
                  path={`/DiaryEditPage/:id`}
                  element={<DiaryEditPage />}
                />
                <Route element={<Layout />}>
                  <Route
                    path={`/statisticsPage`}
                    element={<StatisticsPage />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
              </Routes>
            </DiaryProvider>
          </BrowserRouter>
        </ThemeProvider>
      </UserProvider>
    </>
  );
}

export default App;
