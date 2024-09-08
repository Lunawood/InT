import { useSearchParams, useNavigate } from "react-router-dom";
import Main from "../components/taste/Main";
import Time from "../components/taste/Time";
import FirstClass from "../components/taste/FirstClass";
import EmptyClass from "../components/taste/EmptyClass";

const Taste = () => {
  const [searchParams, setSeratchParams] = useSearchParams();
  const first_class = searchParams.get("first_class");
  const time = searchParams.get("time");
  const empty_time = searchParams.get("empty_time");
  const name = localStorage.getItem("name");
  if (first_class === null && (time === null) & (empty_time === null)) {
    return (
      <div>
        <Main name={name}></Main>
      </div>
    );
  } else if (time === "" && first_class === null && empty_time === null) {
    return (
      <div>
        <Time></Time>
      </div>
    );
  } else if (time === "true" && first_class === "" && empty_time === null) {
    return (
      <div>
        <FirstClass></FirstClass>
      </div>
    );
  } else if (time === "true" && first_class === "true" && empty_time === "") {
    return (
      <div>
        <EmptyClass></EmptyClass>
      </div>
    );
  }
};

export default Taste;
