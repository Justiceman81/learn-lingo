import { useState } from "react";
import Hero from "../../components/Hero/Hero";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";

const HomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <Hero />
      {isLoginOpen && <LoginModal closeModal={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && (
        <RegisterModal closeModal={() => setIsRegisterOpen(false)} />
      )}
    </>
  );
};

export default HomePage;
