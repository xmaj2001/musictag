import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter as Router, Route,Routes } from 'react-router'
import HomeWin from './windows/Home.win'
import EditorWin from './windows/Editor.win'

const App = () => {
  return (
    <NextUIProvider className='bg-transparent'>
      <Router>
        <Routes>
          <Route path='/' element={<HomeWin/>}/>
          <Route path='/editor' element={<EditorWin/>}/>
        </Routes>
      </Router>
  </NextUIProvider>
  )
}
export default App
