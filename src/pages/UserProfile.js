import React, { useState } from 'react';

const userProfile = {
    name: "Michael Anderson",
    role: "Data Visualization Designer",
    followers: 1200,
    charts: 128,
    liked: 45,
    avatar: "/assets/avatar.png",
bio: "Hi! I am an analyst for ALC Company!"
};

const userCharts = [
    { id: 1, title: "Sales Analytics", image: "/assets/bar-chart.png" },
    { id: 2, title: "Revenue Growth", image: "/assets/pie-chart.png" },
    { id: 3, title: "User Demographics", image: "/assets/line-chart.png" },
];

const likedCharts = [
    { id: 4, title: "Financial Projections", image: "/assets/area-chart.png" },
    { id: 5, title: "Market Trends", image: "/assets/scatter-plot.png" },
    { id: 6, title: "Demographic Distribution", image: "/assets/radar-chart.png" },
];

const templates = [
    { id: 7, title: "Revenue Breakdown", image: "/assets/pie-chart.png" },
    { id: 8, title: "Customer Retention", image: "/assets/line-chart.png" },
    { id: 9, title: "Performance Comparison", image: "/assets/bar-chart.png" },
];


const UserProfile = () => {
    const [activeTab, setActiveTab] = useState("my-charts");
    const [editStatus, makeEdits] = useState("viewing");
    const [bioText, bioUpdate] = useState(userProfile.bio);

    const renderCharts = (charts) => {
        return (
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {charts.map(chart => (
                    <div key={chart.id} className="col">
                        <div className="card h-100">
                            <img src={chart.image} className="card-img-top" alt={chart.title} />
                            <div className="card-body">
                                <h5 className="card-title">{chart.title}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderBio = () => {
        return(userProfile.bio);
    };

    const editBio = () => {
        makeEdits("editing");
    };

    const textChange = (value) => {
        bioUpdate(value);
    };

    const changeBio = (makeChange) => {
        if (makeChange) {
            const newBio = document.getElementById("bioEdit").value;
            userProfile.bio = newBio;
            bioUpdate(userProfile.bio);
        }
        else bioUpdate(userProfile.bio);
        makeEdits("viewing");
    };

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <img src={userProfile.avatar} alt="Avatar" className="rounded-circle mb-3" style={{ width: "150px", height: "150px" }} />
                <h1>{userProfile.name}</h1>
                <p>{userProfile.role}</p>
                <p>{userProfile.charts} Charts · {userProfile.followers} Followers</p>
            </div>

            <div>
                <h1>User Bio</h1>
                <p id="bio">{renderBio()}</p>
                <button className="btn btn-primary mt-3" onClick={editBio}>Edit Bio</button> <br/>
                <input id='bioEdit' type='textbox' hidden={editStatus === "viewing"} value={bioText} onChange={(e) => textChange(e.target.value)}></input><br/>
                <button className="btn btn-success" hidden={editStatus === "viewing"} onClick={(e) => changeBio(true)}>Save</button>
                <button className="btn btn-danger" hidden={editStatus === "viewing"} onClick={(e) => changeBio(false)}>Cancel</button>
            </div>

            <ul className="nav nav-tabs mb-4" role="tablist">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "my-charts" ? "active" : ""}`} onClick={() => setActiveTab("my-charts")}>My Charts</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "liked-charts" ? "active" : ""}`} onClick={() => setActiveTab("liked-charts")}>Liked Charts</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "templates" ? "active" : ""}`} onClick={() => setActiveTab("templates")}>Templates</button>
                </li>
            </ul>

            <div className="tab-content">
                {activeTab === "my-charts" && (
                    <div className="tab-pane fade show active" role="tabpanel">
                        {renderCharts(userCharts)}
                    </div>
                )}
                {activeTab === "liked-charts" && (
                    <div className="tab-pane fade show active" role="tabpanel">
                        {renderCharts(likedCharts)}
                    </div>
                )}
                {activeTab === "templates" && (
                    <div className="tab-pane fade show active" role="tabpanel">
                        {renderCharts(templates)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
