import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from "react-router-dom"
import './index.css';
import Root from './pages/Root'
import App from './pages/App';
import About from './pages/About';
import PokemonDetailPage from './pages/PokemonDetailPage';

const router = createHashRouter([
  {
      path: "/",
      element: <Root />,
      children: [
          {
              path: "/",
              element: <App />,
          },
          {
              path: "/pokemon/:pokemonName",
              element: <PokemonDetailPage />,
          },
          {
            path: "/about",
            element: <About/>,
          }
      ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)

