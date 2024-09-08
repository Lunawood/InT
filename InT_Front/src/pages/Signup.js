import { useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import NameBirth from "../components/join/NameBirth";
import PhoneEmail from "../components/join/PhoneEmail";
import { React } from "react";
import SchoolCheck from "../components/join/SchoolCheck";
import MakeID from "../components/join/MakeID";
import MakePW from "../components/join/MakePW";

const Signup = () => {
  const [searchParams, setSeratchParams] = useSearchParams();
  const name_birth = searchParams.get("name_birth");
  const phone_email = searchParams.get("phone_email");
  const id = searchParams.get("id");
  const pw = searchParams.get("pw");

  if (
    name_birth === "false" &&
    phone_email === null &&
    id === null &&
    pw === null
  ) {
    return (
        <NameBirth></NameBirth>
    );
  } else if (
    name_birth === "true" &&
    phone_email === null &&
    id === null &&
    pw === null
  ) {
    return (
        <PhoneEmail></PhoneEmail>
    );
  } else if (
    name_birth === "true" &&
    phone_email === "true" &&
    id === null &&
    pw === null
  ) {
    return (
        <SchoolCheck></SchoolCheck>
    );
  } else if (
    name_birth === "true" &&
    phone_email === "true" &&
    id === "false" &&
    pw === null
  ) {
    return (
        <MakeID></MakeID>
    );
  } else if (
    name_birth === "true" &&
    phone_email === "true" &&
    id === "true" &&
    pw === "false"
  ) {
    return (
        <MakePW></MakePW>
    );
  }
  return (
      <NameBirth></NameBirth>
  );
};

export default Signup;
