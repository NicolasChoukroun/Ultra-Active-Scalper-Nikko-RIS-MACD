# 🔥 Ultra-Active Scalper by Nikko
This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/



A high-frequency Pine Script v6 scalping strategy designed for bullish markets. It uses a simple combination of MACD and RSI for entries, and a profit-only exit mechanism for capitalizing on upward momentum.

---

## 📌 Description

**Ultra-Active Scalper** is a micro scalping strategy focused on simplicity and speed. It enters trades when bullish momentum is detected and exits only when the trade reaches a profitable threshold — never at a loss.

It's designed for trending markets (especially crypto, stocks, and indices) and allows high-frequency pyramiding to maximize trade volume during bullish phases.

---

## ⚙️ Strategy Logic

### Entry Conditions

- **MACD Line > Signal Line**
- **RSI > Threshold** (default: 40)

Allows up to 100 simultaneous trades (`pyramiding=100`) for maximum exposure during uptrends.

### Exit Conditions

- **Take Profit:** +2% gain from entry price (default)
- **Fallback Exit:** +1% minimal gain (half the take profit)

All trades are closed with some level of gain, ensuring the strategy only exits positively.

---

## 📉 Indicators

- **MACD (6, 13, 5):** Fast momentum crossover
- **RSI (7):** Simple trend strength filter

---

## 🧠 Benefits

- Simple, transparent logic
- High-frequency trade execution
- Risk-reward ratio of 2:1 (profit vs. fallback gain)
- Perfect for strong bull markets
- Entry bars are highlighted for visual clarity

---

## ⚠️ Warnings

- **No stop-loss**: trades may float if price never reaches targets
- **Unsuitable for sideways or bearish markets**
- **Requires trend confirmation or macro filtering**
- **High pyramiding**: be mindful of capital risk

---

## 🛠️ How to Use

1. Add to any TradingView chart.
2. Use in trending markets (crypto, tech stocks, etc.).
3. Default settings:
   - Take Profit: 2%
   - Fallback Exit: 1%
   - RSI Minimum: 40
4. Customize parameters to match asset volatility.
5. Combine with other filters for optimal performance.

---

## 🧪 Example Use Case

Ideal on:
- BTC/USDT 15m+
- NASDAQ or SPY during trend days
- High-volume altcoins or breakout setups

---

## 🔎 Philosophy

**Ultra-Active Scalper** proves that complexity isn't always better. With a few fast indicators and a clear exit strategy, it scalps consistent gains during bullish runs — a strategy that’s simple, readable, and effective.

---

## 📄 License

Public Domain. Use freely and modify as needed.
