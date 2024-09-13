import React from "react";
import Form from "../../Components/Form/Form";
import Helmet from "react-helmet";

//Components
import Container from "../../Components/Container/Container";

const categories = [
  {
    id: "installation",
    title: "Installation",
    icon: "tool",
    iconPath:
      "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
    description: "Import nice-forms.css from unpkg or install via NPM.",
    content: (
      <div>
        <p>
          Import nice-forms.css from <strong>unpkg</strong>
          <br />
          <code>https://unpkg.com/nice-forms.css/nice-forms.css</code>
        </p>
        <p>
          Install via <strong>NPM</strong>
          <br />
          <code> npm install nice-forms.css </code>
        </p>
      </div>
    ),
  },
  {
    id: "structure",
    title: "Structure",
    icon: "layers",
    iconPath: "M12 2 2 7 12 12 22 7 12 2 M2 17 12 22 22 17 M2 12 12 17 22 12",
    description:
      "Add the class .nice-form-group to get a nice base style for all your input fields.",
    content: (
      <div>
        <div className="nice-form-group">
          <label>Basic form group</label>
          <input type="text" placeholder="Your name" />
        </div>
        <div className="nice-form-group">
          <label>Basic form group</label>
          <small>With additional information below the label</small>
          <input type="text" placeholder="Your name" />
        </div>
        <div className="nice-form-group">
          <label>My form group label</label>
          <input type="text" placeholder="Your name" />
          <small>Or additional text below</small>
        </div>
      </div>
    ),
  },
];

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Container>
        <Form categories={categories} />
      </Container>
    </>
  );
};

export default Profile;
