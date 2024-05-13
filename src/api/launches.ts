import axios from 'axios';
import { LAUNCHES_URL } from '../constants/constants';

// Parameters for fetching launches
const LAUNCH_PARAMS = {
  query: { upcoming: false },
  options: {
    sort: { date_unix: -1 },
    limit: 10,
  },
};

// Function to fetch launches data
export const fetchLaunchData = async () => {
  const response = await axios.post(LAUNCHES_URL, LAUNCH_PARAMS);
  return response.data;
};
