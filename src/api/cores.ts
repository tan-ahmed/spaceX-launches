import axios from 'axios';
import { CORES_URL } from '../constants/constants';

export const fetchCoresData = async (coreIds: string[]) => {
  const response = await axios.post(CORES_URL, {
    query: {
      id: { $in: coreIds },
    },
    options: {
      limit: 1000,
    },
  });
  return response.data;
};
