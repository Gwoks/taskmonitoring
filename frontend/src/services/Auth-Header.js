export default function AuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return {
            'x-access-token': user.accessToken,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}
