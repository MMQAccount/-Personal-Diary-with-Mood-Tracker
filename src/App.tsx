import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import DiaryPage from './pages/DiaryPage/DiaryPage'
import HomePage from './pages/HomePage/HomePage'
import DiaryForm from './components/Forms/DiaryForm/DiaryForm'
import DiaryVoice from './components/Forms/DiaryVoice/DiaryVoice'
import DiaryImage from './components/Forms/DiaryImage/DiaryImage'
import DiaryProvider from './providers/diary-provider';
import DiaryDetailsPage from './pages/DiaryDetails/DiaryDetails'
import DiaryMood from './components/Forms/DiaryMood/DiaryMood'
import DiaryImages from './pages/DiaryDetails/DiaryImages'
import EditNote from './pages/DiaryEdit.tsx/EditNote'
import DiaryEditPage from './pages/DiaryEdit.tsx/DiaryEditPage'


function App() {
  return (
    <>
      <BrowserRouter>
        <DiaryProvider>
          <Header />
          <Routes>
            <Route
              path={`/`}
              element={<HomePage />}
            />
            <Route
              path={`/diaryPage`}
              element={<DiaryPage />}
            />
            <Route
              path={`/diaryForm`}
              element={<DiaryForm />}
            />
            <Route
              path={`/diaryVoice`}
              element={<DiaryVoice />}
            />
            <Route
              path={`/diaryImage`}
              element={<DiaryImage />}
            />
            <Route
              path={`/diaryMood`}
              element={<DiaryMood />}
            />
            <Route
              path={`/dispalyDiary/:id`}
              element={<DiaryDetailsPage />}
            />
            <Route
              path={`/DiaryImages/:id`}
              element={<DiaryImages />}
            />
            <Route
              path="/EditNote/:day/:noteId"
              element={<EditNote />}
            />
            <Route
              path="/EditDay/:id"
              element={<DiaryEditPage />}
            />
          </Routes>
        </DiaryProvider>
      </BrowserRouter>
    </>
  )
}

export default App
