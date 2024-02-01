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

    // 原本 authorID 是寫在這裡，然後傳到下面的 post axios 的參數，但會顯示 authorIDis not allowed，所以把  authorID 移到 server 的 contoller 去取 req.user.user._id的值
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
        : await postService.add(formData.title, formData.text);
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
                minLength={5}
                maxLength={50}
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <Form.Text className="text-muted fs-6">Word limit:5-50</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fs-3">Content</Form.Label>
              <Form.Control
                required
                as="textarea"
                minLength={10}
                maxLength={500}
                rows={5}
                placeholder="Enter content"
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
              />
              <Form.Text className="text-muted fs-6">
                Word limit:10-500
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
