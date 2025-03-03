import { BASEURL } from "@/constants/appConstants";

export async function GetPastResponses() {
    try {
      const response = await fetch(`${BASEURL}/past-searches/`, {
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
      console.log(data);
      return data; // Return data for further use
    } catch (error) {
      console.error("An error occurred while fetching past responses:", error);
    }
  }
  