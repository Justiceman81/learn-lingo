import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectIsAuthenticated } from "../../redux/auth/selectors";

// import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";

const HomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      {/* <Header
        isOpenModalLogin={() => setIsLoginOpen(true)}
        isOpenModalRegister={() => setIsRegisterOpen(true)}
        user={user}
        isAuthenticated={isAuthenticated}
      /> */}
      <Hero />
      {isLoginOpen && <LoginModal closeModal={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && (
        <RegisterModal closeModal={() => setIsRegisterOpen(false)} />
      )}
    </>
  );
};

export default HomePage;
