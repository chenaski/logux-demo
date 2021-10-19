import { Layout } from "../Layout/Layout";
import React from "react";
import { useDispatch, useSubscription } from "@logux/redux";
import { useSelector } from "react-redux";

export const Profile = () => {
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");

  const userId = localStorage.getItem("userId");
  const isSubscribing = useSubscription([`user/${userId}`]);
  const user = useSelector((state) => state.user);

  const changeName = async () => {
    await dispatch.sync({ type: "user/name", name, userId });
    setName("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await changeName();
  };

  return (
    <Layout>
      <h1>Profile</h1>

      {isSubscribing ? (
        <div>Loading...</div>
      ) : !user ? (
        <div>Something went wrong...</div>
      ) : (
        <>
          <div>
            Hello <b>{user.name}</b>!
          </div>

          <form onSubmit={onSubmit}>
            <label>
              New name:
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <button>Change</button>
          </form>
        </>
      )}
    </Layout>
  );
};
