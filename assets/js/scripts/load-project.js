document.addEventListener("DOMContentLoaded", function () {

    // Function to load the project data
    async function loadProjectData() {
        try {
            // Fetch the data from the JSON file
            const response = await fetch('./assets/data/projects.json');
            const projects = await response.json(); // Parse the JSON

            // Get the project ID from the URL
            const urlParams = new URLSearchParams(window.location.search);
            const projectId = urlParams.get("id");

            // Check if the project exists
            if (projects[projectId]) {
                // Update project title and description
                document.getElementById("project-title").textContent = projects[projectId].title;
                document.getElementById("project-description").textContent = projects[projectId].description;

                // Update project image (if available)
                if (projects[projectId].image) {
                    const projectImage = document.createElement('img');
                    projectImage.src = projects[projectId].image;
                    projectImage.alt = `${projects[projectId].title} Image`;
                    document.getElementById("project-image-container").appendChild(projectImage);
                }

                // Update project video (if available)
                if (projects[projectId].video) {
                    const projectVideo = document.createElement('video');
                    projectVideo.src = projects[projectId].video;
                    projectVideo.autoplay  = true;
                    projectVideo.loop = true;
                    projectVideo.muted = true;
                    document.getElementById("project-video-container").appendChild(projectVideo);
                }
            } else {
                document.getElementById("project-title").textContent = "Project Not Found";
                document.getElementById("project-description").textContent = "Oops! This project does not exist.";
            }
        } catch (error) {
            console.error("Error fetching project data:", error);
        }
    }

    loadProjectData(); // Call the function to load the data
});
