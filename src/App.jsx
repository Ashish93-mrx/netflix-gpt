import Body from './components/Body'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Browse from './components/Browse'
import Login from './components/Login'

function App() {
  return (
    <>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body/> }/>
        <Route path="/login" element={<Login/> }/>
        <Route path="/browse" element={<Browse/> }/>
      </Routes>
    </BrowserRouter> */}
    <Body/>
    </>
  )
}

export default App
