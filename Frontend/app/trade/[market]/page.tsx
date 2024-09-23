"use client";
import { MarketBar } from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import { TradeView } from "@/app/components/TradeView";
import { Depth } from "@/app/components/depth/Depth";
import { useParams } from "next/navigation";
import { useState } from "react";
import Trade from "@/app/components/Trades";
export default function Page() {
    const  [trade, settrade] = useState(false);
    const { market } = useParams();
    return <div className="flex flex-row flex-1 overflow-x-hidden">
        <div className="flex flex-col flex-1">
            <MarketBar market={market as string} />
            <div className="flex flex-row h-[920px] border-y border-slate-800">
                <div className="flex flex-col flex-1">
                    <TradeView market={market as string} />
                </div>
                <div className="flex flex-col w-[250px] overflow-hidden">
                    <div className="flex flex-col h-1/2" >
                        <div className="px-3">
                            <div className="flex gap-5">
                                 <div className="flex cursor-pointer justify-center py-2 ">
        <div
            onClick={() => {
                settrade(false);
            }}
            className={`border-b-2 py-1 text-md font-medium ${
                !trade
                    ? "border-accentBlue text-baseTextHighEmphasis"
                    : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"
            }`}
        >
            Book
        </div>
    </div>
    <div className="flex cursor-pointer justify-center py-2 ">
        <div
            onClick={() => {
                settrade(true);
            }}
            className={`border-b-2 py-1 text-md font-medium ${
                trade
                    ? "border-accentBlue text-baseTextHighEmphasis"
                    : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"
            }`}
        >
            Trades
        </div>
    </div>
</div>
                </div>
                    <div className="flex flex-col grow no-scrollbar overflow-y-scroll">
                {trade 
                     ? <Trade market={market as string} />
                     : <Depth market={market as string} />  
                }
                   </div>
                </div>
            </div>
            </div>
        </div>
            <div className="flex flex-col w-[250px]">
                <SwapUI market={market as string} />
            </div>
    </div>
}