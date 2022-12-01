import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

const Subscribe = () => {
  const navigate = useNavigate();
  const [newSubscriber, setNewSubscriber] = useState({
    sourceRef: "recruit2022_sam",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    return axios
      .post(
        `https://mailing-list.prototype.mmgrouptech.net/subscribe`,
        newSubscriber
      )
      .then(({ data }) => {
        setIsLoading(false);
        navigate(`/details/${newSubscriber.email}`);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsErr("Something went wrong. Please try again!");
        setTimeout(() => {
          setIsErr("");
        }, 1000);
      });
  };

  const handleOnChange = (e) => {
    setNewSubscriber((previousObject) => {
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
      <h2>Enter your email in the below form to subscribe to our newsletter</h2>
      <form
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
      >
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email here..."
          value={newSubscriber.email}
          onChange={(e) => {
            handleOnChange(e);
          }}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Subscribe;
