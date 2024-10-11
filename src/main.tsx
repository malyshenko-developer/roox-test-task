import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root/root.tsx'
import HomePage from './routes/home-page/home-page.tsx'
import UserPage from './routes/user-page/user-page.tsx'

const router = createBrowserRouter([
  {
    path: '/roox-test-task/',
    element: <Root />,
    children: [
      {
        path: '/roox-test-task/',
        element: <HomePage />
      },
      {
        path: '/roox-test-task/user/:userId',
        element: <UserPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
