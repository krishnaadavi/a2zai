import { TrendingUp, TrendingDown } from 'lucide-react';
import { type StockQuote } from '@/lib/stocks';

interface AIStockPulseProps {
    stocks: StockQuote[];
}

export default function AIStockPulse({ stocks }: AIStockPulseProps) {
    if (stocks.length === 0) return null;

    return (
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded">
                    <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">AI Stock Pulse</h3>
            </div>

            <div className="space-y-3">
                {stocks.slice(0, 5).map((stock) => (
                    <div
                        key={stock.ticker}
                        className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold"
                                style={{ backgroundColor: stock.color }}
                            >
                                {stock.ticker.slice(0, 2)}
                            </div>
                            <div>
                                <span className="text-white font-medium">{stock.ticker}</span>
                                <p className="text-gray-500 text-xs">{stock.companyName}</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-white font-mono">${stock.price.toFixed(2)}</div>
                            <div className={`flex items-center gap-1 text-sm ${stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                                }`}>
                                {stock.changePercent >= 0 ? (
                                    <TrendingUp className="h-3 w-3" />
                                ) : (
                                    <TrendingDown className="h-3 w-3" />
                                )}
                                <span>
                                    {stock.changePercent >= 0 ? '+' : ''}
                                    {stock.changePercent.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-gray-600 text-xs mt-4 text-center">
                Market data delayed. For informational purposes only.
            </p>
        </div>
    );
}
