import { apiCall } from "./http";

export async function getUsers() {
    return await apiCall("get" ,"/users")
    .then((response) => {
        if (response.data) {
            return response.data;
        } else {
            console.log("Invalid data: ", response);
            throw new Error("Invalid data.");
        }
    });
}

