import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GlobalContext } from "../context/index";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Post() {
  const { formData, setFormData } = useContext(GlobalContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = isEdit
        ? await axios.put(
            `http://localhost:4000/updated/${location.state.postData._id}`,
            {
              title: formData.title,
              text: formData.text,
            }
          )
        : await axios.post("http://localhost:4000/add", {
            title: formData.title,
            text: formData.text,
          });

      const result = response.data;
      console.log(result);

      if (result) {
        setIsEdit(false);
        setFormData({
          title: "",
          text: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state) {
      const { postData } = location.state;
      setIsEdit(true);
      setFormData({
        title: postData.title,
        text: postData.text,
      });
    }
  }, [location]);

  return (
    <main className="m-5 px-5">
      <Form onSubmit={(e) => submitHandler(e)}>
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
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />
          <Form.Text className="text-muted fs-6">
            You can share whatever you what to say.
          </Form.Text>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            variant="warning"
            type="submit"
            className="fs-4 mt-2"
            size="ml"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </Form>
    </main>
  );
}

export default Post;
