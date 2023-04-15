const baseUrl = "http://localhost:3030/api";

export const login = async (data) => {
    const response = await fetch(baseUrl + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (response.status !== 200) {
        throw new Error("Wrong email or password!");
    }
    const result = await response.json();
    return result;
};

export const register = async (data) => {
    const response = await fetch(baseUrl + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (response.status !== 200) {
        throw new Error("Wrong email or password!");
    }
    const result = await response.json();
    return result;
};

export const logout = async () => {
    return await fetch(baseUrl + "/logout", {
        method: "POST",
        credentials: "include",
    })
        .then((res) => res.json())
        .then((res) => console.log(res.message));
};

export const getProfile = async () => {
    return await fetch(baseUrl + "/users/profile", {
        credentials: "include",
    })
        .then((res) => res.json())
};
