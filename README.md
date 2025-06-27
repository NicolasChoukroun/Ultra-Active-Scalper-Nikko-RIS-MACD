Here's a cleaned-up version of the documentation, written in plain Markdown (GitHub-compatible), without tables, and replacing the word **Supertrend** with **Volatility Trend Strategy**:

---

# Volatility Trend Strategy v1.0 (Nikko)

**Version:** Pine Script v6
**Author:** Nikko
**License:** [Mozilla Public License 2.0](https://mozilla.org/MPL/2.0/)
**Release Date:** June 2025

---

## Overview

This is a volatility-based trend-following strategy designed to capture directional moves using ATR (Average True Range) as a dynamic threshold for entry and exit. It automatically generates long entries when an uptrend is detected and exits those positions on trend reversal. Optional signal labels, visual cues, and customizable inputs allow for tailored trading and backtesting.

---

## Features

* Trend detection based on ATR deviation
* Adaptive stop calculation using wicks or closes
* Configurable labels for buy/sell signals
* Visual stop lines for both long and short logic
* Option to highlight active trend direction
* Integrated with TradingView Strategy Tester
* Optional alert conditions (pre-written but commented out)

---

## User Inputs

* `ATR Period`: Controls how many bars are used for ATR calculation (default: 17)
* `ATR Multiplier`: Sets the sensitivity of the trend stop (default: 5.0)
* `Source`: Price input used for calculating thresholds (default: hl2)
* `Take Wicks into Account?`: If true, uses high/low instead of close
* `Show Buy/Sell Labels?`: Toggles visibility of "Buy" and "Sell" signals
* `Highlight State?`: Optionally colors the background during active trends

---

## How It Works

1. **ATR Calculation**
   A volatility threshold is computed as ATR multiplied by a user-defined factor.

2. **Dynamic Stops**

   * Long Stop = Source Price - ATR Threshold
   * Short Stop = Source Price + ATR Threshold
     Stops are smoothed using previous values and ignore doji candles to reduce noise.

3. **Trend Detection**

   * Trend switches to *up* when the price crosses above the short stop
   * Trend switches to *down* when the price drops below the long stop
     The script tracks these switches to generate entry and exit signals.

4. **Plotting**

   * Green line shows the trailing long stop when the trend is up
   * Red line shows the trailing short stop when the trend is down
   * Optional "Buy" and "Sell" labels are displayed at turning points

5. **Strategy Logic**

   * Enters long when an uptrend is detected
   * Exits long when the trend reverses to down
     This version does not open short positions.

---

## Strategy Orders

* On trend flip to up: `strategy.entry("Buy", strategy.long)`
* On trend flip to down: `strategy.close("Buy")`

This is a long-only logic implementation, ideal for bullish market conditions or as a filter for other strategies.

---

## Alerts

Alerts are pre-coded but commented out. You can activate them by removing the `//` at the beginning of the alert lines:

* `trendChange`: Alert when the trend direction changes
* `buySignal`: Alert when a new uptrend starts
* `sellSignal`: Alert when a downtrend is detected

---

## Usage Instructions

1. Add the script to your chart in TradingView.
2. Adjust the ATR period and multiplier to fit the asset and timeframe.
3. Decide whether to use candle wicks or body closes for precision.
4. Enable or disable signal labels and chart highlighting as desired.
5. Run the Strategy Tester to evaluate past performance.
6. Activate alerts for live trading if needed.

---

## Tips

* Best suited for trending markets (e.g. crypto, forex, indices).
* Longer timeframes reduce noise and improve reliability.
* Adjust the multiplier for different volatility levels.
* Combine with other filters (like MACD or volume) for confirmation.

---

Let me know if you want to generate a [GitHub README.md file](f), a [commented version of the code](f), or an [exportable backtest report](f).
