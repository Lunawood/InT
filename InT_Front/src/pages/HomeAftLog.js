import { useSearchParams } from "react-router-dom";
import HomeEmpty from "../components/HomeAftLog/HomeEmpty";
import HomeTimetable from "../components/HomeAftLog/HomeTimetable";

const HomeAftLog = () => {
  const [searchParams, setSeratchParams] = useSearchParams();
  const check = searchParams.get("check");

  if (check === null) {
    return <HomeEmpty></HomeEmpty>;
  } else if (check === "true") {
    return <HomeTimetable></HomeTimetable>;
  }
};

export default HomeAftLog;
