import "../css/Home.css";
import logo from "../assets/img/InT.png";

const Home = () => {
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  function goToLoginPage() {
    window.location.href = "/login";
  }
  function goToJoinPage() {
    window.location.href = "/signup";
  }
  return (
    <div className="unloginHome">
      <header className="homeHeader">
        <div>
          <img src={logo} className="intLogo" alt="logo" />
        </div>
        <button className="loginButton" onClick={goToLoginPage}>
          로그인
        </button>
        <div className="information">
          <div className="home_line1"></div>
          <p className="isMemberQuestion">아직 회원이 아니신가요?</p>
          <div className="home_line2"></div>
        </div>
        <button className="signupButton" onClick={goToJoinPage}>
          회원가입
        </button>
      </header>
    </div>
  );
};

export default Home;
