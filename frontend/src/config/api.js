const viteApiUrl = import.meta.env.VITE_API_URL;
const processApiUrl = globalThis?.process?.env?.VITE_API_URL;

const resolvedApiUrl = viteApiUrl || processApiUrl || "http://localhost:5500";

export const API_BASE_URL = resolvedApiUrl.replace(/\/+$/, "");
