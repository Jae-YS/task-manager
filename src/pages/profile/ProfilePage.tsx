import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [about, setAbout] = useState(
    "I'm a software engineer making a frontend application. This is my profile page."
  );

  const handleSave = () => {
    console.log({ name, about });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setAbout(
      "I'm a software engineer making a frontend application. This is my profile page."
    );
    setIsEditing(false);
  };

  return (
    <div className="profile-page-bg">
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <div className="profile-card">
        <img
          src={user?.picture}
          alt={user?.name}
          className="profile-image-large"
        />

        <div className="profile-field">
          <label>Profile name</label>
          {isEditing ? (
            <input value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <p>{name}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Email</label>
          <p>{user?.email}</p>
        </div>

        <div className="profile-field">
          <label>About me</label>
          {isEditing ? (
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          ) : (
            <p>{about}</p>
          )}
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={handleCancel}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
