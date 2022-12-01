import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";

const Details = () => {
  const [userDetails, setUserDetails] = useState({
    sourceRef: "recruit2022_sam",
    name: "",
    phone: "",
    postcode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState("");

  const navigate = useNavigate();

  const { email_address } = useParams();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    return axios
      .patch(
        `https://mailing-list.prototype.mmgrouptech.net/subscribe/${email_address}`,
        userDetails
      )
      .then(({ data }) => {
        setIsLoading(false);
        navigate(`/confirm`);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsErr("Something went wrong. Please try again!");
        console.log(err);
        setTimeout(() => {
          setIsErr("");
        }, 1000);
      });
  };

  const handleOnChange = (e) => {
    setUserDetails((previousObject) => {
      const newObject = { ...previousObject };
      newObject[e.target.id] = e.target.value;
      return newObject;
    });
  };
  if (isLoading) return <p>Loading...</p>;

  return isErr ? (
    <p>{isErr}</p>
  ) : (
    <section>
      <Header />
      <p>
        Thank you for providing your email address. To help us provide the most
        relevant information please fill in your details below.
      </p>
      <form
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
      >
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          placeholder="Name..."
          value={userDetails.name}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />{" "}
        <br />
        <label htmlFor="phone">Contact Number: </label>
        <input
          type="text"
          id="phone"
          placeholder="Contact Number..."
          value={userDetails.phone}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />{" "}
        <br />
        <label htmlFor="postcode">Postcode: </label>
        <input
          type="text"
          id="postcode"
          placeholder="Postcode..."
          value={userDetails.postcode}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />{" "}
        <br />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Details;
