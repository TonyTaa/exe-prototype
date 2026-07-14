import axios from 'axios';

const assessmentClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://example.com/api',
  timeout: 8000,
});

export const submitAssessment = async (payload) => {
  const response = await assessmentClient.post('/assessments', payload);
  return response.data;
};
