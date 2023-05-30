import { apiCall } from "./http";
import jwt_decode from "jwt-decode";
import * as SecureStore from 'expo-secure-store';

export function verifyToken(token) {
    let decoded = null;
    try {
        decoded = jwt_decode(token);
        if (decoded.exp < Date.now() / 1000) {
            console.log("Token expired.");
            decoded = null;
        }
    } catch (error) {
        console.log("Invalid token: ", error);
    }
    return decoded;
}

export async function getToken() {
    return await SecureStore.getItemAsync("token");
}

export async function logIn(values) {
    const loginPayload = {
        email: values.email,
        password: values.password,
    };
    await apiCall("post", "/login", loginPayload)
    .then( async response => {
        if (response.accessToken) {
            const token = response.accessToken;
            const decoded = verifyToken(token);
            if (decoded !== null) {
                await SecureStore.setItemAsync("token", token);
                //Remove lines and add them in the sing in website
            } else {
                console.log("Invalid token: ", response);
                throw new Error("Invalid token.");
                //return {error: "token_invalid"};
            }
        } else if (response.error) {
            if (response.error.active === false) {
                throw new Error("not_active");
            } else {
                throw new Error("Datos invalidos");
            }
        } else {
            console.log("Unknown error: ", response);
            throw new Error("Unknown error.");
            //return response.error;
        }
    })
}

export async function logOut() {
    await SecureStore.deleteItemAsync("token");
}

export async function getUser() {
    const token = await getToken();
    if (token) {
        const decoded = verifyToken(token);
        if (decoded !== null) {
            const user = await apiCall("get", `/users/${decoded.id}`);
            if (user.data) {
                return user.data;
            } else {
                console.log("Invalid data: ", user);
                throw new Error("Invalid data.");
            }
        } else {
            console.log("Invalid token.");
            throw new Error("Invalid token.");
        }
    } else {
        console.log("No token provided.");
        throw new Error("No token provided.");
    }
}
