const baseUrl = "http://localhost:3030/api/contest";

export const addContest = async (data) => {
    const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
};

export const getLatests = async () => {
    const response = await fetch(
        baseUrl + "/list/?" + new URLSearchParams({ limit: 3 })
    );
    const result = await response.json();
    return result;
};

export const getAll = async () => {
    const response = await fetch(baseUrl + "/list");
    const result = await response.json();
    return result;
};

export const getOne = async (id) => {
    const response = await fetch(baseUrl + "/detail/" + id);
    const result = await response.json();
    return result;
};

export const like = async (contestId, photoId) => {
    const data = {
        contestId,
        photoId,
    };
    
    const response = await fetch(baseUrl + "/like", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
};

export const addPhoto = async (contestId, contestImg) => {
    const data = {
        id: contestId,
        contestImg,
    };
    
    const response = await fetch(baseUrl + "/add-photo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
};

export const deleteContest = async (id) => {    
    const response = await fetch(baseUrl + "/delete/" + id, {
        method: "DELETE",
        credentials: "include",
    });
    const result = await response.json();
    return result;
};

export const editContest = async (id ,data) => {  
    const response = await fetch(baseUrl + "/edit/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
};