"use client";

import { useEffect, useState } from "react";
import { Ticker } from "../utils/types";
import { getTickers } from "../utils/httpClient";
import { useRouter } from "next/navigation";

export const Markets = () => {
  const [tickers, setTickers] = useState<Ticker[]>();

  useEffect(() => {
    getTickers().then((tickersData) => setTickers(tickersData));
  }, []);

  return (
    <div className="flex flex-col flex-1 max-w-[1280px] w-full">
      <div className="flex flex-col min-w-[700px] flex-1 w-full">
        <div className="flex flex-col w-full rounded-lg bg-baseBackgroundL1 px-5 py-3">
          <table className="w-full table-auto">
            <MarketHeader />
            <tbody>
              {tickers?.map((market) => (
                <MarketRow key={market.symbol} market={market} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MarketRow = ({ market }: { market: Ticker }) => {
  const router = useRouter();

  return (
    <tr
      className="cursor-pointer border-t border-baseBorderLight hover:bg-white/7 w-full"
      onClick={() => router.push(`/trade/${market.symbol}`)}
    >
      <td className="px-1 py-3">
        <div className="flex items-center">
          <div
            className="relative flex-none overflow-hidden rounded-full border border-baseBorderMed"
            style={{ width: "40px", height: "40px" }}
          >
            <img
              alt={market.symbol}
              src={`https://backpack.exchange/_next/image?url=%2Fcoins%2F${market.symbol
                .split("_")[0]
                .toLowerCase()}.png&w=48&q=75`}
              loading="lazy"
              width="40"
              height="40"
              decoding="async"
            />
          </div>
          <div className="ml-4 flex flex-col">
            <p className="whitespace-nowrap text-base font-medium text-baseTextHighEmphasis">
              {market.symbol}
            </p>
            <p className="text-xs leading-5 text-baseTextMedEmphasis">
              {market.symbol}
            </p>
          </div>
        </div>
      </td>
      <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums">{market.lastPrice}</p>
      </td>
      <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums">{market.high}</p>
      </td>
      <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums">{market.volume}</p>
      </td>
      <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums text-greenText">
          {Number(market.priceChangePercent).toFixed(3)}%
        </p>
      </td>
    </tr>
  );
};

const MarketHeader = () => (
  <thead>
    <tr>
      <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
        <div className="flex items-center gap-1 cursor-pointer select-none">
          Name
        </div>
      </th>
      <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
        <div className="flex items-center gap-1 cursor-pointer select-none">
          Price
        </div>
      </th>
      <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
        <div className="flex items-center gap-1 cursor-pointer select-none">
          Market Cap
        </div>
      </th>
      <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
        <div className="flex items-center gap-1 cursor-pointer select-none">
          24h Volume
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-down h-4 w-4"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </div>
      </th>
      <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
        <div className="flex items-center gap-1 cursor-pointer select-none">
          24h Change
        </div>
      </th>
    </tr>
  </thead>
);
