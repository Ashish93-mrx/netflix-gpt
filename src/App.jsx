import Body from './components/Body'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Browse from './components/Browse'
import Login from './components/Login'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'

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
    <Provider store={appStore}>
        <Body/>
    </Provider>
    </>
  )
}

export default App
