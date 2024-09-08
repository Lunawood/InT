import "./IDResult.css";
import info from "../../assets/img/Exclamation_mark.png";
import back from "../../assets/img/back.png";
const Result = () => {
  const result = JSON.parse(localStorage.getItem("result")) || {};
  let check = true;
  let id = 0;
  let joinDate = "";
  if (result.length !== 2) {
    check = false;
  } else {
    id = result[0];
    joinDate = result[1];
  }

  const goLogin = () => {
    localStorage.removeItem("result");
    window.location.href = "/login";
  };
  const goFindPW = () => {
    localStorage.removeItem("result");
    window.location.href = "/findPw";
  };
  const goJoin = () => {
    localStorage.removeItem("result");
    window.location.href = "/join";
  };
  const goBack = () => {
    localStorage.removeItem("result");
    window.location.href = "/findId";
  };
  const goFindId = () => {
    localStorage.removeItem("result");
    window.location.href = "/findId";
  };
  return (
    <div className="container">
      <img src={back} className="goback" onClick={goBack} />
      <h1 className="find-h1">아이디/ 비밀번호 찾기</h1>
      <div className="tabs">
        <div className="tab active" onClick={goFindId}>
          아이디 찾기
        </div>
        <div className="tab inactive" onClick={goFindPW}>
          비밀번호 찾기
        </div>
      </div>
      {check ? (
        <div className="result-content">
          <span className="yes-message">
            휴대전화 정보와 일치하는 아이디입니다.
          </span>
          <div className="info">
            <div className="info-item">
              <div>아이디</div>
              <span>{id}</span>
            </div>
            <div className="info-item">
              <div>가입일</div>
              <span>{joinDate}</span>
            </div>
          </div>
          <div className="button-group">
            <button className="reset-button" onClick={goFindPW}>
              비밀번호 재설정
            </button>
            <button className="login-button-result" onClick={goLogin}>
              로그인
            </button>
          </div>
        </div>
      ) : (
        <div className="result-content">
          <img src={info} />
          <span className="no-message">
            휴대전화 정보와 일치하는 아이디가 없습니다.
          </span>
          <button className="join-button" onClick={goJoin}>
            회원가입
          </button>
        </div>
      )}
    </div>
  );
};

export default Result;
