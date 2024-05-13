import { useQuery } from '@tanstack/react-query';
import { Keys } from '../constants/constants';
import { Launch } from '../types/launches';
import { ApiResponse } from '../types/api';
import { Payloads } from '../types/payloads';
import { Cores } from '../types/cores';
import { fetchCoresData } from '../api/cores';
import { fetchPayloadsData } from '../api/payloads';
import { fetchLaunchData } from '../api/launches';

// The duration for refetching data
const TWO_MINUTES = 60 * 2000;

// Custom react query hook to fetch launches, payloads, and cores data
export const useGetLaunchData = (page: number = 1) => {
  // Fetch launches data
  const {
    isLoading,
    isPending,
    data: launchesData,
    isFetching,
    error,
    isSuccess,
  } = useQuery<ApiResponse<Launch>>({
    queryKey: [Keys.launchQuery, page],
    refetchInterval: TWO_MINUTES,
    queryFn: fetchLaunchData,
  });

  const { data: payloadsData } = useQuery<ApiResponse<Payloads>>({
    queryKey: ['payloads'],
    queryFn: () => fetchPayloadsData(launchesData?.docs.flatMap((launch) => launch.payloads) || []),
    enabled: isSuccess && launchesData !== undefined, // Only fetch if launchesData is available
  });

  // Fetch cores data
  const { data: coresData } = useQuery<ApiResponse<Cores>>({
    queryKey: ['cores'],
    queryFn: () => fetchCoresData(launchesData?.docs.flatMap((launch) => launch.cores.map((core) => core.core)) || []),
    enabled: isSuccess && launchesData !== undefined, // Only fetch if launchesData is available
  });

  // Return the fetched data and loading states
  return { isLoading, isPending, launchesData, payloadsData, coresData, isFetching, error, isSuccess };
};
