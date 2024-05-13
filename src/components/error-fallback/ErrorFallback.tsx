import React from 'react';

export default function ErrorFallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-red-500 text-lg font-semibold">Failed to load</div>
    </div>
  );
}
