
export type AppState = {
};

export type AuthProvider = {
    id: string;
    name: string;
    icon: string;
}

export type AuthUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}