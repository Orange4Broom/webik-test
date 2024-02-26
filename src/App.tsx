import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DefaultLayout } from "./components/defaultLayout/DefaultLayout";
import { Home } from "./components/home/Home";

export const App = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    </>
  );
};

export default App;
