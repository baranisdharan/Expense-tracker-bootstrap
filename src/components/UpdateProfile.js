import React, { useRef, useEffect } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";

export const UpdateProfile = () => {
  const inputFullnameRef = useRef();
  const inputPhotoUrlRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAULICMLkKpLi7eJ9CIrBXM3fvXPmVHqoA",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: JSON.parse(localStorage.getItem("idToken")).idToken,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        //  console.log(data.users[0]);
        console.log(data.users[0].photoUrl);
        console.log(data.users[0].displayName);
        if (res.ok) {
          inputFullnameRef.current.value = data.users[0].displayName;
          inputPhotoUrlRef.current.value = data.users[0].photoUrl;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProfile();
  }, []);

  const profileSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAULICMLkKpLi7eJ9CIrBXM3fvXPmVHqoA",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: JSON.parse(localStorage.getItem("idToken")).idToken,
            displayName: inputFullnameRef.current.value,
            photoUrl: inputPhotoUrlRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);

      inputFullnameRef.current.value = "";
      inputPhotoUrlRef.current.value = "";

      if (res.ok) {
        navigate("/home");
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="main-update-profile">
        <h2>Winner never Quits , quitter never wins</h2>
        <div className="profile-update">
          Your Profile is 64% complete . A complete Profile has <br />
          higher chances of landing a job{" "}
        </div>
      </div>
      <div className="main-update-form">
        <form onSubmit={profileSubmitHandler} className="form">
          <h3>Update Profile</h3>
          <label htmlFor="fullname">Full Name</label>
          <input ref={inputFullnameRef} type="text" id="fullname" />
          <label htmlFor="profileurl">Profile Photo Url</label>
          <input ref={inputPhotoUrlRef} type="text" id="profileurl" />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};
