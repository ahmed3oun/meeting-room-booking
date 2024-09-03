export default function authHeader() {
    const token: string | null = localStorage.getItem("token");

    if (token)
        return { Authorization: 'Bearer ' + token };
    else
        return { Authorization: '' };
}