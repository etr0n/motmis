import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoute, Map } from './pages/';
import { AddDevice, Profile, Devices } from './pages/dashboard'
import LoggedInUserLayout from './pages/dashboard/SharedLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={
            <ProtectedRoute>
              <LoggedInUserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Devices />} />
          <Route path="add-device" element={<AddDevice />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/map" element={<Map />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
