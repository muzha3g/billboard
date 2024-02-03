import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/index";
import PostService from "../services/post-service";
import Card from "react-bootstrap/Card";

const postService = new PostService();
const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, loading, setLoading } = useContext(GlobalContext);
  const [profilePosts, setProfilePosts] = useState([]);

  console.log(currentUser);
  let userID = currentUser.user._id;

  const getPosts = (id) => {
    postService.getProfilePost(id).then((posts) => {
      setProfilePosts(posts.data);
      console.log(posts);
    });
  };

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, []);

  useEffect(() => {
    setLoading(true);
    getPosts(userID);
    setLoading(false);
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
            {!loading ? (
              profilePosts.map((post) => (
                <Card
                  key={post._id}
                  style={{
                    boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, 0.2)",
                    width: "60%",
                  }}
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
                        @ <span>{post.authorID.name}</span>
                        <br />#{post.date.slice(5, 10)}
                      </Card.Text>
                    </Card.Link>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <></>
            )}
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
