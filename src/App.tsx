import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Header from './components/Header/Header'
import DiaryPage from './pages/DiaryPage/DiaryPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route 
              path={`/diaryPage`}
              element={<DiaryPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
