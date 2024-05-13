import React from 'react';

import { Launch } from '../../types/launches';
import { BsCheckCircleFill, BsExclamationCircleFill, BsFillExclamationCircleFill } from 'react-icons/bs';

import { Meteors } from '../meteors/Meteors';
import { Payloads } from '../../types/payloads';
import { Cores } from '../../types/cores';
import { getFormattedDateTime } from '../../utils/dateUtils';

type CardProps = {
  data: {
    launch: Launch;
    core: Cores | null | undefined;
    payloads: (Payloads | undefined)[];
  };
};

const Card = ({ data }: CardProps) => {
  const { launch, core, payloads } = data;
  const formattedDate = getFormattedDateTime(launch.date_utc);

  return (
    <div className="h-full">
      <div className="h-full w-full relative max-w-sm">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="flex w-full justify-between items-start">
            <div>
              <h2 className="font-bold text-xl text-slate-200">{launch.name}</h2>
              <div id="date" className="mb-3">
                <p data-testid="date" className="text-slate-500 text-sm">
                  {formattedDate}
                </p>
              </div>
            </div>

            <div>
              {launch.success ? (
                <>
                  <BsCheckCircleFill color="green" data-testid="success-icon" /> <p className="sr-only">successful</p>
                </>
              ) : (
                <>
                  <BsExclamationCircleFill color="red" data-testid="error-icon" /> <p className="sr-only">error</p>
                </>
              )}
            </div>
          </div>

          <div id="icon" className="max-w-20 mb-3">
            <img src={launch.links.patch.small} alt={launch.name} loading="lazy" />
          </div>

          {core && (
            <div id="core" className="mb-3">
              <h4 className="font-bold text-blue-400">Primary Core:</h4>
              <p className="text-slate-300 text-sm" data-testid="core">
                {core.serial}
              </p>
            </div>
          )}

          <div id="payload" className="mb-3">
            <h4 className="font-bold text-blue-400">Payload:</h4>
            <ul>
              {payloads.map((payload) => (
                <li className="text-slate-300 text-sm" key={payload?.id}>
                  {payload?.id} <strong>({payload?.type})</strong>
                </li>
              ))}
            </ul>
          </div>

          {launch.failures.length > 0 && (
            <div id="failures" className="mb-3">
              <h4 className="font-bold text-blue-400">Payload:</h4>
              <ul>
                {launch.failures.map((fail) => (
                  <li className="text-slate-300 text-sm" key={fail?.time}>
                    {fail?.time} <strong>({fail?.reason})</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Meteors number={10} />
        </div>
      </div>
    </div>
  );
};

export default Card;
