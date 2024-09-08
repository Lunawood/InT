import { useSearchParams } from "react-router-dom";
import IDCheck from "../components/FindID/IDCheck";
import IDResult from "../components/FindID/IDResult";

const FindID = () => {
  const [searchParams, setSeratchParams] = useSearchParams();
  const check = searchParams.get("check");
  if (check === null) {
    return <IDCheck></IDCheck>;
  } else if (check === "true") {
    return <IDResult></IDResult>;
  }
};

export default FindID;
