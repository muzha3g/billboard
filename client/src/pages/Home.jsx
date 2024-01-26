import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { GlobalContext } from "../context";
import { useContext, useEffect, useState } from "react";

function Home() {
  const { postList, setPostList } = useContext(GlobalContext);

  const [cardStates, setCardStates] = useState([]);

  const getAllPosts = () => {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((json) => {
        setPostList(json);
        setCardStates(Array(json.length).fill(false));
      });
  };

  const handleIconClick = (index) => {
    const newCardStates = [...cardStates];
    newCardStates[index] = !newCardStates[index];
    setCardStates(newCardStates);
  };

  useEffect(() => getAllPosts(), []);

  return (
    <main className="m-5 px-5 d-flex flex-column ">
      {postList.map((post, index) => (
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
              <Card.Text>{post.text}</Card.Text>
              <Card.Text>
                @ <span>name</span>
                <br />#{post.date.slice(5, 10)}
              </Card.Text>
            </Card.Link>
            <Card.Text>
              <Card.Link
                as={Link}
                to="#"
                onClick={() => handleIconClick(index)}
              >
                {cardStates[index] ? <FcLike /> : <FaRegHeart />}
              </Card.Link>
              {cardStates[index] ? <span> 1</span> : <span></span>}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </main>
  );
}

export default Home;
