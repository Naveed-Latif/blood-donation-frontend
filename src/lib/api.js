const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('authToken');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateUser(userData) {
    return this.request('/auth/update', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Donor endpoints
  async getDonors(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/donors?${queryParams}` : '/donors';
    return this.request(endpoint);
  }

  async getDonorById(id) {
    return this.request(`/donors/${id}`);
  }

  async searchDonors(searchParams) {
    return this.request('/donors/search', {
      method: 'POST',
      body: JSON.stringify(searchParams),
    });
  }

  // Donation endpoints
  async getDonations() {
    return this.request('/donations');
  }

  async createDonation(donationData) {
    return this.request('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  }

  async updateDonation(id, donationData) {
    return this.request(`/donations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(donationData),
    });
  }

  // Request endpoints
  async getRequests() {
    return this.request('/requests');
  }

  async createRequest(requestData) {
    return this.request('/requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async updateRequest(id, requestData) {
    return this.request(`/requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
  }

  // Contact endpoints
  async sendMessage(messageData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }
}

export const api = new ApiClient();
