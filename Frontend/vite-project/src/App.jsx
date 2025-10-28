import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllTweets from "./pages/tweet/AllTweets";

function App() {
  return (
    <>
      {/* <Header />
      <Outlet />
      <Footer /> */}
      <AllTweets />
    </>
  );
}

export default App;
