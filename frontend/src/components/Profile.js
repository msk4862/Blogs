import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate, uploadImage } from "../actions/index";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import EditProfile from "./EditProfile";
import "../styles/profile.css";

const Profile = (props) => {
    dayjs.extend(relativeTime);

    useEffect(() => {
        if (!props.user.authenticated) {
            // fetch user details
            let token = localStorage.getItem("jwtToken");
            if (token) props.authenticate(token);
        }
    }, [props.user.authenticated]);

    // if user not logged in
    const renderLoginPanel = () => {
        return (
            <div className="row justify-content-around m-0 profile-login-panel">
                <h3 className="mb-4">Welcome to WhatUp!</h3>
                <Link to="/login" className="col-5 btn">
                    Login
                </Link>
                <Link to="/signup" className="col-5 btn">
                    Signup
                </Link>
            </div>
        );
    };

    // upload new image
    const handleImageChange = (event) => {
        const image = event.target.files[0];
        if (!image) return;
        const formData = new FormData();
        formData.append("image", image, image.name);
        props.uploadImage(formData);
    };

    const editImage = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    const {
        loading,
        authenticated,
        credentials: { imageUrl, handle, bio, website, createdAt, location },
    } = props.user;

    return (
        <div className="profile">
            {loading && <p>Loading...</p>}
            {!loading && !authenticated && renderLoginPanel()}
            {!loading && authenticated && (
                <div className="row profile-panel justify-content-center">
                    <div className="col-12 ml-auto mr-auto">
                        <div className="text-center">
                            <img
                                className="rounded-circle"
                                src={imageUrl}
                                alt={`${handle}`}
                            />
                            <input
                                type="file"
                                id="imageInput"
                                name="image"
                                hidden="hidden"
                                onChange={handleImageChange}
                            />

                            <div className="edit-ic">
                                <button onClick={editImage}>
                                    <span
                                        className="custom-tooltip"
                                        data-text="Change your profile picture"
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="row justify-centent-center mt-2">
                            <div className="col-12 mb-2">
                                <a href={`#`}>
                                    <h4>@{handle}</h4>
                                </a>
                            </div>
                            {bio && (
                                <div className="col-12">
                                    <p>{bio}</p>
                                </div>
                            )}

                            {location && (
                                <div className="col-12">
                                    <p>
                                        <i className="fas fa-map-marker-alt"></i>{" "}
                                        {location}
                                    </p>
                                </div>
                            )}
                            {website && (
                                <div className="col-12">
                                    <p>
                                        <i className="fas fa-link"></i>{" "}
                                        <a href={website} target="_blank">
                                            {website}
                                        </a>
                                    </p>
                                </div>
                            )}
                            <div className="col-12">
                                <p>
                                    <i className="fas fa-calendar-alt"></i>{" "}
                                    Joined {dayjs(createdAt).fromNow()}
                                </p>
                            </div>
                            <div className="edit-profile">
                                <EditProfile
                                    initialBio={bio}
                                    initialWebsite={website}
                                    initialLocation={location}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, { authenticate, uploadImage })(Profile);
