import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router'
import HomeWin from './windows/Home.win'
import EditorWin from './windows/Editor.win'

const App = () => {
  return (
    <NextUIProvider className='bg-transparent'>
      <Router>
        <Routes>
          <Route path='/home' element={<HomeWin />} index/>
          <Route path='/editor' element={<EditorWin />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </NextUIProvider>
  )
}
export default App
