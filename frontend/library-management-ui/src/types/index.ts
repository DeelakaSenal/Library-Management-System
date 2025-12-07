export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  publishedYear: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  token: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  description: string;
  publishedYear: number;
}

export interface UpdateBookRequest {
  id: number;
  title: string;
  author: string;
  description: string;
  publishedYear: number;
}
