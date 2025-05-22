import axios from 'axios';
import { Pet } from '../types/Pet';

const API_BASE_URL = 'http://localhost:8080/malana';

export const getAllPets = async () => {
    const response = await axios.get(`${API_BASE_URL}/pets`);
    return response.data;
};

export const getPetById = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/pets/${id}`);
    return response.data;
};

export const addPet = async (pet: Pet) => {
    const response = await axios.post(`${API_BASE_URL}/pets`, pet);
    return response.data;
};

export const updatePet = async (id: number, pet: Pet) => {
    const response = await axios.put(`${API_BASE_URL}/pets/${id}`, pet);
    return response.data;
};

export const deletePet = async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/pets/${id}`);
    return response.data;
};

export const searchPets = async (key: string) => {
    const response = await axios.get(`${API_BASE_URL}/pets/search/${key}`);
    return response.data;
};

export const getPetsByPrice = async (price: number) => {
    const response = await axios.get(`${API_BASE_URL}/pets/search/price/${price}`);
    return response.data;
};