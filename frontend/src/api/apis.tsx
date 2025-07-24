import axios from "axios";

// interface File{
//     file: any;
// }

export function transcript_api(file: File) {
    const formData = new FormData();
    formData.append("file", file); // "file" must match what your backend expects

    return axios.post("http://127.0.0.1:8001/transcript", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(function (response) {
        console.log("Response: ", response);
        return response;
    })
    .catch(function (error) {
        console.log("Error: ", error);
    });
}

