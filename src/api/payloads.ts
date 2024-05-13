import axios from 'axios';
import { PAYLOADS_URL } from '../constants/constants';

export const fetchPayloadsData = async (payloadIds: string[]) => {
  const response = await axios.post(PAYLOADS_URL, {
    query: {
      id: { $in: payloadIds },
    },
    options: {
      limit: 1000,
    },
  });
  return response.data;
};
