import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {API_CONFIG} from './config';
import {
    CreateUserDto,
    UpdateUserDto,
    LoginResponse,
    User,
    ApiError,
    Town,
    Npc,
    RPGSheet3DTModel,
    RPGSheetGURPSModel
} from './types';

// Sheet interfaces remain the same
export interface Sheet {
    id: number;
    name: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSheetDto {
    name: string;
    userId: number;
}

export interface UpdateSheetDto {
    name?: string;
    userId: number;
}

class ApiService {
    private axiosInstance: AxiosInstance;
    private axiosInstanceNoAuth: AxiosInstance;

    constructor() {
        // Instance with auth interceptor
        this.axiosInstance = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Instance without auth interceptor
        this.axiosInstanceNoAuth = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add auth interceptor
        this.axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            console.log("TOKEN AUTH" + token)
            if (token) {
                const cleanToken = token.replace(/^["'](.*)["']$/, '$1');
                config.headers.Authorization = `Bearer ${cleanToken}`;
            }
            return config;
        });

        // Add response interceptor to handle data wrapper
        const responseInterceptor = (response: AxiosResponse) => response.data.data;
        const errorInterceptor = (error: any) => {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login'; // Or use your router here
                }
                throw new Error(error.response?.data?.message || 'An error occurred');
            }
            throw error;
        };
        this.axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
        this.axiosInstanceNoAuth.interceptors.response.use(responseInterceptor, errorInterceptor);
    }

    // Auth endpoints
    async login(email: string, password: string): Promise<LoginResponse> {
        try {
            return await this.axiosInstanceNoAuth.post(API_CONFIG.ENDPOINTS.LOGIN, {
                email,
                password,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Login failed');
            }
            throw error;
        }
    }

    // User endpoints
    async createUser(userData: CreateUserDto): Promise<User> {
        try {
            return await this.axiosInstanceNoAuth.post(API_CONFIG.ENDPOINTS.USERS, userData);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create user');
            }
            throw error;
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.axiosInstance.get(API_CONFIG.ENDPOINTS.USERS);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch users');
            }
            throw error;
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            return await this.axiosInstance.get(`${API_CONFIG.ENDPOINTS.USERS}/${id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch user');
            }
            throw error;
        }
    }

    async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
        try {
            return await this.axiosInstance.put(`${API_CONFIG.ENDPOINTS.USERS}/${id}`, userData);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to update user');
            }
            throw error;
        }
    }

    async deleteUser(id: number): Promise<void> {
        try {
            return await this.axiosInstance.delete(`${API_CONFIG.ENDPOINTS.USERS}/${id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to delete user');
            }
            throw error;
        }
    }

    async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
        try {
            return await this.axiosInstanceNoAuth.post(API_CONFIG.ENDPOINTS.RESET_PASSWORD, {
                token,
                newPassword,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to reset password');
            }
            throw error;
        }
    }

    async generateNewTown(): Promise<Town> {
        try {
            return await this.axiosInstance.get(API_CONFIG.ENDPOINTS.GENERATE_TOWN);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to generate town');
            }
            throw error;
        }
    }

    async generateNewNpc(): Promise<Npc> {
        try {
            return await this.axiosInstance.get(API_CONFIG.ENDPOINTS.GENERATE_NPCS);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to generate town');
            }
            throw error;
        }
    }

    async getAllTowns(): Promise<Town[]> {
        try {
            return await this.axiosInstance.get(API_CONFIG.ENDPOINTS.TOWNS);
            ;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch towns');
            }
            throw error;
        }
    }

    async getAllNpcs(): Promise<Npc[]> {
        try {
            return await this.axiosInstance.get(API_CONFIG.ENDPOINTS.NPCS);
            ;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch towns');
            }
            throw error;
        }
    }

    async createSheet(data: any): Promise<Sheet> {
        try {
            return await this.axiosInstance.post(API_CONFIG.ENDPOINTS.SHEETS, data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch towns');
            }
            throw error;
        }
    }

    async updateSheet(data: any, id: number): Promise<Sheet> {
        try {
            return await this.axiosInstance.put(API_CONFIG.ENDPOINTS.SHEETS + "/" + id, data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch towns');
            }
            throw error;
        }
    }

    async getSheet(id: number): Promise<RPGSheetGURPSModel> {
        try {
            return await this.axiosInstance.get(API_CONFIG.ENDPOINTS.SHEETS + "/" + id);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to fetch towns');
            }
            throw error;
        }
    }
}

export const api = new ApiService();