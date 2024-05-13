import Card from '../components/card/Card';
import ErrorFallback from '../components/error-fallback/ErrorFallback';
import { CenteredSpinner, Spinner } from '../components/spinner/Spinner';

import { useGetLaunchData } from '../hooks/useGetLaunchData';

export default function Home() {
  const { isLoading, isPending, launchesData, payloadsData, coresData, isFetching, error, isSuccess } =
    useGetLaunchData();

  if (error) return <ErrorFallback />;

  if (isPending || isLoading || isFetching)
    return (
      <CenteredSpinner>
        <Spinner />
      </CenteredSpinner>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 xl:gap-12">
      {launchesData?.docs.map((launch) => {
        const core = launch.cores.length > 0 ? coresData?.docs.find((core) => core.id === launch.cores[0].core) : null;
        const payloads = launch.payloads
          .map((id) => payloadsData?.docs.find((payload) => payload.id === id))
          .filter(Boolean);
        return <Card data={{ launch, core, payloads }} key={launch.id} />;
      })}
    </div>
  );
}
