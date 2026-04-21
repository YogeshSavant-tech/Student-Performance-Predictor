// API service - student endpoints
export const saveStudent = async (data) => {
return fetch("http://127.0.0.1:5000/save", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(data)
});
};
