import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GlobalContext } from "../context/index";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import postService from "../services/post-service";

function Post() {
  const initFormData = {
    title: "",
    text: "",
    authorID: "",
  };
  const { currentUser } = useContext(GlobalContext);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(initFormData);

  const navigate = useNavigate();
  const location = useLocation();

  let token;
  if (localStorage.getItem("user")) {
    token = JSON.parse(localStorage.getItem("user")).token;
  } else {
    token = "";
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    let authorID = currentUser.user._id;

    try {
      const response = isEdit
        ? await axios.put(
            `http://localhost:4000/post/updated/${location.state.postData[0]._id}`,
            {
              title: formData.title,
              text: formData.text,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          )
        : await postService.add(formData.title, formData.text, authorID);
      // 把 authorID 刪掉就好了，但抓資料就會顯示不了 authorID.name

      const result = response.data;
      console.log(result);

      if (result) {
        setFormData({
          title: "",
          text: "",
        });
        window.alert("成功發佈貼文！");
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (location.state) {
      // console.log(location.state);
      const { postData } = location.state;
      setIsEdit(true);
      setFormData({
        title: postData[0].title,
        text: postData[0].text,
      });
    }
  }, [location]);

  return (
    <main className="d-flex justify-content-center mt-5 align-items-center">
      {currentUser ? (
        <>
          {" "}
          <Form onSubmit={(e) => submitHandler(e)} style={{ width: "60%" }}>
            <h2 className="text-center"> {isEdit ? "Edit" : "Post"}</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fs-3">Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fs-3">Content</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={5}
                placeholder="Enter content"
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
              />
              <Form.Text className="text-muted fs-6">
                You can share whatever you what to say.
              </Form.Text>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button
                variant="warning"
                type="submit"
                className="fs-5 mt-2"
                size="sm"
              >
                {isEdit ? "Edit" : "New post"}
              </Button>
            </div>
          </Form>
        </>
      ) : (
        <div>
          <h1>請先登入</h1>
        </div>
      )}
    </main>
  );
}

export default Post;
