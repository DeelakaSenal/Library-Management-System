import axios from "axios";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  Book,
  CreateBookRequest,
  UpdateBookRequest,
} from "../types";

const API_BASE_URL = "http://localhost:5239/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },
};

export const booksAPI = {
  getAll: async (): Promise<Book[]> => {
    const response = await api.get<Book[]>("/books");
    return response.data;
  },

  getById: async (id: number): Promise<Book> => {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  },

  create: async (data: CreateBookRequest): Promise<Book> => {
    const response = await api.post<Book>("/books", data);
    return response.data;
  },

  update: async (id: number, data: UpdateBookRequest): Promise<void> => {
    await api.put(`/books/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};

export default api;
