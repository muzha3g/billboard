import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context";
import { useContext, useEffect } from "react";
import PostService from "../services/post-service";

function Home() {
  const { postList, setPostList, loading, setLoading } =
    useContext(GlobalContext);

  const getAllPosts = () => {
    PostService.getPosts().then((result) => {
      setPostList(result.data);
    });
  };

  useEffect(() => {
    setLoading(true);
    getAllPosts();
    setLoading(false);
  }, []);

  console.log("postList", postList);

  return (
    <main className="m-5 px-5 d-flex flex-column ">
      {!loading ? (
        postList.map((post) => (
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
                  @ <span>{post?.authorID?.name}</span>
                  <br />#{post.date.slice(5, 10)}
                </Card.Text>
              </Card.Link>
            </Card.Body>
          </Card>
        ))
      ) : (
        <></>
      )}
    </main>
  );
}

export default Home;
