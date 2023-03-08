import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Graf from "./pages/Graf";
import Police from "./pages/Police";
import MainYoo1 from "./pages/MainYoo1";
import Error1 from "./pages/Error1";
import FrameComponent from "./pages/FrameComponent";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/graf":
        title = "";
        metaDescription = "";
        break;
      case "/police":
        title = "";
        metaDescription = "";
        break;
      case "/main-yoo1":
        title = "";
        metaDescription = "";
        break;
      case "/error":
        title = "";
        metaDescription = "";
        break;
      case "/frame-39971":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/graf" element={<Graf />} />

      <Route path="/police" element={<Police />} />

      <Route path="/main-yoo1" element={<MainYoo1 />} />

      <Route path="/error" element={<Error1 />} />

      <Route path="/all_error" element={<Error1 />} />

      <Route path="/frame-39971" element={<FrameComponent />} />
    </Routes>
  );
}
export default App;
