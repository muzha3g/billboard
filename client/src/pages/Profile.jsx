import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import { useContext } from "react";
import { GlobalContext } from "../context/index";
import postService from "../services/post-service";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const [profilePosts, setProfilePosts] = useState(null);

  let id = currentUser.user._id;
  useEffect(() => {
    setProfilePosts(postService.getProfilePost(id));
  }, []);
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
          >
            {profilePosts.map((post) => (
              <Card
                key={post._id}
                style={{ boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, 0.2)" }}
                className="mb-3"
              >
                <Card.Body>
                  <Card.Link
                    as={Link}
                    to={`/${post._id}`}
                    className="text-decoration-none font-dark"
                  >
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text className="cardText">{post.text}</Card.Text>
                    <Card.Text>
                      @ <span>{post.authorID}</span>
                      <br />#{post.date.slice(5, 10)}
                    </Card.Text>
                  </Card.Link>
                </Card.Body>
              </Card>
            ))}
          </div>
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
