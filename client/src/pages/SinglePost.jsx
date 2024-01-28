import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);

  const getPostData = () => {
    fetch(`http://localhost:4000/${id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setPostData(json);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
      });
  };

  const deletePost = async () => {
    let response = await axios.delete(`http://localhost:4000/delete/${id}`);

    let result = await response.data;
    if (result) {
      navigate("/");
    }
  };

  const editPost = () => {
    navigate("/post", { state: { postData } });
  };

  useEffect(() => {
    getPostData();
  }, [id]);

  if (postData.length === 0) {
    return (
      <div className="d-flex justify-content-center flex-wrap m-6">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main className="m-5 px-5 d-flex flex-column ">
      <Card
        style={{ boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, 0.2)" }}
        className="mb-3"
      >
        <Card.Body>
          <Card.Title>{postData[0].title}</Card.Title>
          <Card.Text>{postData[0].text}</Card.Text>
          <Card.Text>
            @ <span>name</span>
            <br />#{postData[0].date.slice(5, 10)}
          </Card.Text>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-center flex-wrap mt-4">
        {postData[0].author === req.user.name && (
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
        {postData[0].author === req.user.name && (
          <Button
            variant="danger"
            type="submit"
            className="fs-6 m-2 p-2"
            size="sx"
            onClick={deletePost}
          >
            Delete Post
          </Button>
        )}
      </div>
    </main>
  );
}

export default SinglePost;
