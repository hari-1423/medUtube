import React, { useEffect, useState } from "react";
import VideoList from "./component/VideoList";
import axios from "axios";

const App = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchVideos = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/videos");
            setVideos(response.data);
        } catch (error) {
            setError("Error fetching videos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div>
            <h1>Life Course Videos</h1>
            <VideoList videos={videos} />
        </div>
    );
};

export default App;
