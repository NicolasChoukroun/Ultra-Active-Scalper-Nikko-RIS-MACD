//@version=6
strategy("🔥 Ultra-Active Scalper (Nikko)", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=1, pyramiding=100)

// === Fast Indicators
macdFast = input.int(6, title="MACD Fast Length")
macdSlow = input.int(13, title="MACD Slow Length")
macdSig  = input.int(5, title="MACD Signal Length")
rsiLen   = input.int(7, title="RSI Length")
rsiMin   = input.int(40, title="RSI Min Threshold")
takeProfitPercent = input.float(2, title="Take Profit (%)")
lossPercent = takeProfitPercent/2

// === MACD and RSI
[macd, signal, _] = ta.macd(close, macdFast, macdSlow, macdSig)
rsi = ta.rsi(close, rsiLen)

// === Entry Condition (very relaxed)
entryCond = macd > signal and rsi > rsiMin
if entryCond
    strategy.entry("Long", strategy.long)

// === Exit Condition: Take Profit only
var float entryPrice = na
if strategy.opentrades > 0
    entryPrice := strategy.opentrades.entry_price(0)
else
    entryPrice := na

tpLevelup = entryPrice * (1 + takeProfitPercent / 100)
lossLeveldown = entryPrice * (1 + lossPercent / 100)
exitTPWin = close >= tpLevelup
exitTPLossn = close >= lossLeveldown


if exitTPWin or exitTPLossn
    strategy.close_all(comment="Take Profit")

// === Visual Aid
barcolor(entryCond ? color.lime : na)

