import React, { useEffect, useState } from "react";
import { UserCircle, Mail, Shield, Pencil } from "lucide-react";
import {jwtDecode} from "jwt-decode"; // Install with: npm install jwt-decode
import "../../styles/profile.css"; 
import UserNav from "../../../components/UserNav";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
    role: "User",
    avatar: "", // Random avatar will be generated
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken"); 

    if (token) {
      try {
        const decodedUser = jwtDecode(token);

        // Generate a random avatar using RoboHash
        const randomAvatar = `https://robohash.org/${decodedUser.email || decodedUser.username}?set=set4`;

        setUser({
          name: decodedUser.username || "Unknown User",
          email: decodedUser.email || "No Email",
          role: decodedUser.role || "User",
          avatar: randomAvatar, // Set the generated avatar
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      // Generate random avatar for guest user
      setUser((prevUser) => ({
        ...prevUser,
        avatar: `https://robohash.org/${prevUser.email}?set=set4`,
      }));
    }
  }, []);

  return (
    <>
    <UserNav/>
    <div className="profile-container">
      <h2 className="profile-title">👤 User Profile</h2>

      <div className="profile-card">
        {/* User Avatar */}
        <div className="avatar-container">
          <img src={user.avatar} alt="User Avatar" className="user-avatar" />
        </div>

        {/* User Details */}
        <div className="user-info">
          <h3><UserCircle size={20} /> {user.name}</h3>
          <p><Mail size={16} /> {user.email}</p>
          <p><Shield size={16} /> {user.role}</p>

          {/* Edit Profile Button */}
          <button className="edit-btn">
            <Pencil size={16} /> Edit Profile
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;
