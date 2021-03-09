import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Feedback = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    uploadedFiles: [],
    buttonText: "Submit",
    uploadPhotosButtonText: "Upload Files",
  });

  // Destructure state variables

  const {
    name,
    email,
    message,
    phone,
    uploadedFiles,
    buttonText,
    uploadPhotosButtonText,
  } = values;

  // destructure env variables

  const {
    REACT_APP_API,
    REACT_APP_CLOUDINARY_CLOUD_NAME,
    REACT_APP_CLOUDINARY_UPLOAD_SECRET,
  } = process.env;

  // event handlers

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, buttonText: "...sending" });

    // console.table({ name, email, phone, message, uploadedFiles });

    axios({
      method: "POST",
      url: `${REACT_APP_API}/feedback`,
      data: { name, email, phone, message, uploadedFiles },
    })
      .then((response) => {
        console.log("Feedback submit Response:", response);
        if (response.data.success) {
          toast.success("Thanks for your Feedback!!");
        }
        setValues({
          ...values,
          name: "",
          phone: "",
          email: "",
          message: "",
          uploadedFiles: [],
          buttonText: "Submitted",
          uploadPhotosButtonText: "Uploaded",
        });
      })
      .catch((error) => {
        console.log("Feedback submit Error:", error.response);
        if (error.response.data.error) {
          toast.console.error("Please try again Later");
        }
      });
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: REACT_APP_CLOUDINARY_UPLOAD_SECRET,
        tags: ["ebooks"],
      },
      function (error, result) {
        // console.log(result);
        setValues({
          ...values,
          uploadedFiles: result,
          uploadPhotosButtonText: `${
            result ? result.length : 0
          } Photos Uploaded`,
        });
      }
    );
  };

  const feedbackForm = () => (
    <React.Fragment>
      <div className="form-group pt-5">
        <button
          onClick={() => uploadWidget()}
          className="btn btn-outline-secondary btn-block p-5"
        >
          {uploadPhotosButtonText}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            onChange={handleChange("message")}
            type="text"
            className="form-control"
            value={message}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange("name")}
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">E-mail</label>
          <input
            className="form-control"
            type="email"
            onChange={handleChange("email")}
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Phone</label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange("phone")}
            value={phone}
            required
          />
        </div>

        <button className="btn btn-outline-primary btn-block">
          {buttonText}
        </button>
      </form>
    </React.Fragment>
  );

  return (
    <div>
      <ToastContainer />
      {feedbackForm()}
    </div>
  );
};

export default Feedback;
