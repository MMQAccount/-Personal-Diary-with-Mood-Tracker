import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import DiaryPage from './pages/DiaryPage/DiaryPage'
import HomePage from './pages/HomePage/HomePage'
import DiaryForm from './components/Forms/DiaryForm/DiaryForm'
import DiaryVoice from './components/Forms/DiaryVoice/DiaryVoice'
import DiaryImage from './components/Forms/DiaryImage/DiaryImage'

function App() {
  return (
    <>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
