import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import postService from "../services/post-service";
import { useContext } from "react";
import { GlobalContext } from "../context/index";

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const getPostData = (id) => {
    postService.getAPost(id).then((res) => {
      // console.log(currentUser);
      // console.log(res.data);
      // console.log(res.data[0].author);
      // console.log(currentUser.user.name);
      setPostData(res.data);
      if (currentUser === null) {
        setIsAuthor(false);
      } else if (res.data[0].author === currentUser.user.name) {
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }
      setLoading(false);
    });
  };

  const deletePost = async (id) => {
    let response = await postService.delete(id);
    let result = await response.data;

    if (result) {
      navigate("/");
    }
  };

  const editPost = () => {
    navigate("/post", { state: { postData } });
  };

  useEffect(() => {
    getPostData(id);
  }, []);
  return (
    <main className="m-5 px-5 d-flex flex-column ">
      {!loading ? (
        <>
          <Card
            style={{ boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, 0.2)" }}
            className="mb-3"
          >
            <Card.Body>
              <Card.Title>{postData[0].title}</Card.Title>
              <Card.Text>{postData[0].text}</Card.Text>
              <Card.Text>
                @ <span>{postData[0].author}</span>
                <br />#{postData[0].date.slice(5, 10)}
              </Card.Text>
            </Card.Body>
          </Card>
          <div className="d-flex justify-content-center flex-wrap mt-4">
            {isAuthor && (
              <Button
                variant="primary"
                type="submit"
                className="fs-6 m-2 p-2"
                size="sx"
                onClick={editPost}
              >
                Edit post
              </Button>
            )}

            <Button
              variant="warning"
              type="submit"
              className="fs-6 m-2 p-2"
              size="sx"
              as={Link}
              to="/"
            >
              Back to billboard
            </Button>
            {isAuthor && (
              <Button
                variant="danger"
                type="submit"
                className="fs-6 m-2 p-2"
                size="sx"
                onClick={() => deletePost(id)}
              >
                Delete Post
              </Button>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </main>
  );
}

export default SinglePost;
