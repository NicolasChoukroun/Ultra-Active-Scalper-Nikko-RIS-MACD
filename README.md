# Ultra-Active-Scalper-Nikko-RSI-MACD
Ultra Active Scalper MACD-RSI

📌 Description
This script is an implementation of the Supertrend Strategy, built for automated backtesting on TradingView using Pine Script v6. It allows traders to simulate buy/sell signals based on volatility-driven trend changes. This version includes options for label visibility, wick sensitivity, and state highlighting for easier chart reading.

⚙️ How It Works
The Supertrend is a trend-following indicator that uses the Average True Range (ATR) to calculate dynamic support and resistance zones:

- Uptrend: When price stays above a trailing support line (based on ATR), the strategy assumes a bullish market.
- Downtrend: When price drops below the lower trailing resistance, it flips bearish.

These zones are not static—they adapt to volatility. The script tracks price movements, determines trend shifts, and executes entries and exits accordingly.

🧩 Key Parameters
- ATR Period: Determines the window size for measuring market volatility.
- ATR Multiplier: Affects how far stop lines are placed from price. Higher = wider range, fewer signals.
- Source: The price input used (e.g., hl2, close, etc.).
- Take Wicks into Account?: If enabled, the indicator uses wicks instead of close to calculate crossovers.
- Show Buy/Sell Labels: Toggle visual labels when trades are executed.
- Highlight State: Fills the chart background with color depending on the current trend (currently commented out, but easily enabled).
