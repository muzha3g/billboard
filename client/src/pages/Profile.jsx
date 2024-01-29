import React from "react";
import Image from "react-bootstrap/Image";
import { Card } from "react-bootstrap";

const Profile = ({ currentUser, setCurrentUser }) => {
  return (
    <main className="d-flex justify-content-center align-items-center flex-column mt-5">
      {currentUser ? (
        <>
          <div className="profile mx-5">
            <h2 className="text-center">Profile</h2>
            <div className="details d-flex justify-content-center flex-column align-items-center">
              <Image
                src="https://static.vecteezy.com/system/resources/previews/026/266/484/original/default-avatar-profile-icon-social-media-user-photo-image-vector.jpg"
                roundedCircle
                style={{ width: "10%", height: "10%" }}
                alt="Profile"
              />
              <h5>{currentUser.user.name}</h5>
            </div>
          </div>
          <div
            className="posts mt-3 d-flex justify-content-center align-items-center flex-column"
            style={{
              width: "100%",
            }}
          ></div>
        </>
      ) : (
        <div>
          <h1>請先登入</h1>
        </div>
      )}
    </main>
  );
};

export default Profile;