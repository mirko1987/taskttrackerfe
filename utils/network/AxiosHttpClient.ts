import { HttpClient } from '../../interfaces/interfaces';
import axios, { AxiosInstance,AxiosResponse } from 'axios';

// Custom HTTP Error class
export class HttpError extends Error {
  public readonly status: number;
  public readonly isHttpError = true;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }

  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  get isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }

  get isNetworkError(): boolean {
    return this.status === 0;
  }

  get isTimeout(): boolean {
    return this.status === 408;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }
}


export class FetchHttpClient implements HttpClient {
  private readonly baseURL: string;
  private readonly timeout: number;
  private readonly defaultHeaders: Record<string, string>;

  constructor(
    baseURL: string, 
    timeout: number = 10000,
    defaultHeaders: Record<string, string> = {}
  ) {
    this.baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    this.timeout = timeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...defaultHeaders,
    };
  }

  async get<T>(url: string): Promise<T> {
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T>(url: string, data: any): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(url: string, data?: any): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, { method: 'DELETE' });
  }

  async patch<T>(url: string, data: any): Promise<T> {
    return this.request<T>(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const url = this.buildUrl(endpoint);
    
    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      console.log(`🌐 ${config.method} ${url}`);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorMessage = await this.extractErrorMessage(response);
        throw new HttpError(errorMessage, response.status);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return {} as T;
      }
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof HttpError) {
        throw error;
      }
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new HttpError('Request timeout - Please check your connection', 408);
        }
        throw new HttpError(error.message, 0);
      }
      
      throw new HttpError('An unexpected error occurred', 0);
    }
  }

  private buildUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.baseURL}${cleanEndpoint}`;
  }

  private async extractErrorMessage(response: Response): Promise<string> {
    try {
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        return errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      } else {
        const errorText = await response.text();
        return errorText || `HTTP ${response.status}: ${response.statusText}`;
      }
    } catch {
      return `HTTP ${response.status}: ${response.statusText}`;
    }
  }
}

// ==========================================
// ⚡ AxiosHttpClient - Advanced implementation using Axios
// ==========================================
export class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(
    baseURL: string, 
    timeout: number = 10000,
    defaultHeaders: Record<string, string> = {}
  ) {
    this.axiosInstance = axios.create({
      baseURL: baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...defaultHeaders,
      },
    });

    this.setupInterceptors();
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }

  async patch<T>(url: string, data: any): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data);
    return response.data;
  }

  // Auth token management
  setAuthToken(token: string): void {
    this.axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  }

  clearAuthToken(): void {
    delete this.axiosInstance.defaults.headers.Authorization;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`🌐 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
      },
      (error) => {
        console.error('🔴 Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
        return response;
      },
      (error) => {
        if (error.response) {
          const message = error.response.data?.message || 
                         error.response.data?.error || 
                         error.message ||
                         `HTTP ${error.response.status}: ${error.response.statusText}`;
          throw new HttpError(message, error.response.status);
        } else if (error.request) {
          throw new HttpError('Network error - Please check your connection', 0);
        } else {
          throw new HttpError(error.message || 'An unexpected error occurred', 0);
        }
      }
    );
  }
}