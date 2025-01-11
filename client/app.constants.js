import Constants from 'expo-constants';
const { manifest } = Constants;

export const GlobalConstants = {
    baseURL: (manifest.debuggerHost) ? `http://${manifest.debuggerHost.split(':').shift()}:8000/storage` : "http://127.0.0.1:8000/storage",
    apiURL: (manifest.debuggerHost) ? `http://${manifest.debuggerHost.split(':').shift()}:8000/api` : "http://127.0.0.1:8000/api"
    // apiURL: "https://agacube.com/agafun/public/api",
    // baseURL: "https://agacube.com/agafun/storage/app/public",
}

export const Colors = {
    background: "#212529",
    dark: "#111111",
    black: "#000000",
    white: "#FFFFFF",
    light: "#F8F9FA",
    primary: "#0D6EFD",
    secondary: "#6C757D",
    danger: "#dc3545",
    success: "#198754",
    info: "#5bc0de",
    warning: "#FFC107",
    google: "#DB4437",
    facebook: "#3b5998",
}