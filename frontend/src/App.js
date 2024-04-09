import AuthorList from "./components/AuthorList";
import {Routes, Route, Navigate, Router, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/">
        <Route index element={<Navigate to="/authors/top-authors" />} />
        <Route path="authors/top-authors" element={<AuthorList />} />
      </Route>
    </Route>
  )
)
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
