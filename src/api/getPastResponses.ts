export async function GetPastResponses() {
    try {
      const response = await fetch("https://cdf7-103-179-230-157.ngrok-free.app/api/past-searches/", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data; // Return data for further use
    } catch (error) {
      console.error("An error occurred while fetching past responses:", error);
    }
  }
  