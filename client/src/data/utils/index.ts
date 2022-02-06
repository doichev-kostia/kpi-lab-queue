type Headers = {
    "Content-Type": string;
    "Authorization": string;
}
export const generateHeaders = (): Headers => {
    const token = localStorage.getItem('token');
    return {
        "Content-Type": "application/json",
        "Authorization": token || ""
    }
}