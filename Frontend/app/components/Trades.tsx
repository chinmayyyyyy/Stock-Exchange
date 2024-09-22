import { useEffect, useState } from "react";
import { getTrades } from "../utils/httpClient";
import { SignalingManager } from "@/app/utils/SignalingManager";

export default function Trade({ market }: { market: string }) {
    const [trades, setTrades] = useState<any[]>([]); // State to hold the trade data

    useEffect(() => {
        // Register a callback for trade updates via WebSocket
        SignalingManager.getInstance().registerCallback(
            "trades",
            (data: any) => {
                setTrades((prevTrades) => {
                    // Update trades with the new data
                    return [...data.trades, ...prevTrades];
                });
            },
            `TRADES-${market}`
        );

        // Subscribe to the trade updates
        SignalingManager.getInstance().sendMessage({
            method: "SUBSCRIBE",
            params: [`trades.${market}`],
        });

        // Fetch initial trades when component mounts
        getTrades(market).then((t) => {
            setTrades(t);
        });

        // Cleanup on component unmount
        return () => {
            SignalingManager.getInstance().sendMessage({
                method: "UNSUBSCRIBE",
                params: [`trades.${market}`],
            });
            SignalingManager.getInstance().deRegisterCallback(
                "trades",
                `TRADES-${market}`
            );
        };
    }, [market]);

    return (
        <div className="flex flex-col grow overflow-y-hidden">
            <div className="flex flex-col h-full flex-1 px-3">
                <div className="flex flex-row border-b-1 border-b-borderColor w-full flex-1">
                    <p className="w-[33.3%] px-1 text-left text-xs font-semibold text-baseTextMedEmphasis">
                        Price (USDC)
                    </p>
                    <p className="w-[33.3%] px-1 text-right text-xs font-semibold text-baseTextMedEmphasis">
                        Qty (SOL)
                    </p>
                    <p className="w-[33.3%] px-1 text-right text-xs font-semibold text-baseTextMedEmphasis">
                        Time
                    </p>
                </div>
            </div>
            <div className="flex flex-col no-scrollbar overflow-y-scroll">
                {trades.map((trade, index) => (
                    <div 
                        key={index}
                        className="flex flex-row w-full cursor-default bg-transparent hover:bg-white/4"
                    >
                        <div className="flex items-center flex-row py-2 w-[33.3%] !py-1">
                            <div className={`w-full text-sm font-normal capitalize tabular-nums text-baseTextHighEmphasis/90 ${ !trade.isBuyerMaker
                                ? "text-green-400"
                                : "text-red-400"
                            } px-1 text-left`}>
                                {trade.price}
                            </div>
                        </div>
                        <div className="flex items-center flex-row py-2 w-[33.3%] !py-1">
                            <div className="w-full text-sm font-normal capitalize tabular-nums text-baseTextHighEmphasis/90 text-greenText px-1 text-left">
                                {trade.quantity}
                            </div>
                        </div>
                        <div className="flex items-center flex-row py-2 w-[33.3%] !py-1">
                            <div className="w-full text-sm font-normal capitalize tabular-nums text-baseTextHighEmphasis/90 text-greenText px-1 text-left">
                                {new Date(trade.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
