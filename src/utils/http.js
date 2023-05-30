import {
    clientConfig
} from "../config";
import * as SecureStore from 'expo-secure-store';
const baseUrl = `${clientConfig.SERVER_URL}${clientConfig.SERVER_API}`;

export async function apiCall(method, url, data={}){
    const token = await SecureStore.getItemAsync("token");
    const options = {
        method: method,
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': !token ? null : token,
        },
    }

    if (method === "post" || method === "put") {
        if (data !== {}) {
            options.body = JSON.stringify(data);
        }
    }
    
    return await fetch(baseUrl+url, options)
    .then(response => {
        return response.json();
    })
}
