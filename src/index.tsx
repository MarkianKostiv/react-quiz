import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CreateQuizForm } from "./pages/CreateQuizForm/CreateQuizForm";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { QuizPage } from "./pages/QuizPages/QuizPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "createQuiz/",
    element: <CreateQuizForm isAddOrUpdate={"Add"} />,
  },
  {
    path: "updateQuiz/:quizId",
    element: <CreateQuizForm isAddOrUpdate={"Update"} />,
  },
  { path: "quiz/:quizId", element: <QuizPage /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
