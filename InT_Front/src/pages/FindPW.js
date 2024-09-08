import { useSearchParams } from "react-router-dom";
import PWCheck from "../components/FindPW/PWCheck";
import ChangePW from "../components/FindPW/ChangePW";
import ChangeAlert from "../components/FindPW/ChangeAlert";

const FindPW = () => {
  const [searchParams, setSeratchParams] = useSearchParams();
  const check = searchParams.get("check");
  const success = searchParams.get("success");
  if (check === null && success === null) {
    return <PWCheck></PWCheck>;
  } else if (check === "true" && success === null) {
    return <ChangePW></ChangePW>;
  } else if (check === "true" && success === "true"){
    return <ChangeAlert></ChangeAlert>;
  }
};

export default FindPW;
