export interface User {
    id: number;
    email: string;
    name: string;
    phone?: string;
    role: string;
    role_id: number;
    nip?: string;
    position?: string;
    status: 'active' | 'inactive' | 'suspended';
    profile_photo?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    phone: string;
    role_id: number;
}
