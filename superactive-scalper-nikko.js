// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// by Nikko June 2025

//@version=6
strategy("Supertrend Strategy v.1.0 (Nikko)", overlay=true, initial_capital=10000, pyramiding=1, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// === INPUT PARAMETERS ===
atrPeriod = input.int(title="ATR Period", defval=17)
atrMultiplier = input.float(title="ATR Multiplier", step=0.1, defval=5)
priceSource = input.source(title="Source", defval=hl2)
useWicks = input.bool(title="Take Wicks into Account ?", defval=true)
showSignalLabels = input.bool(title="Show Buy/Sell Labels ?", defval=true)
highlightTrend = input.bool(title="Highlight State ?", defval=true)

// === ATR CALCULATION ===
atrValue = atrMultiplier * ta.atr(atrPeriod)

// === PRICE CONDITIONS ===
highInput = useWicks ? high : close
lowInput = useWicks ? low : close
isDojiBar = open == close and open == low and open == high

// === LONG STOP CALCULATION ===
longStop = priceSource - atrValue
previousLongStop = na(longStop[1]) ? longStop : longStop[1]

if longStop > 0
    if isDojiBar
        longStop := previousLongStop
    else
        longStop := (lowInput[1] > previousLongStop ? math.max(longStop, previousLongStop) : longStop)
else
    longStop := previousLongStop

// === SHORT STOP CALCULATION ===
shortStop = priceSource + atrValue
previousShortStop = na(shortStop[1]) ? shortStop : shortStop[1]

if shortStop > 0
    if isDojiBar
        shortStop := previousShortStop
    else
        shortStop := (highInput[1] < previousShortStop ? math.min(shortStop, previousShortStop) : shortStop)
else
    shortStop := previousShortStop

// === TREND DIRECTION DETECTION ===
var trendDirection = 1
trendDirection := trendDirection == -1 and highInput > previousShortStop ? 1 :
                  trendDirection == 1 and lowInput < previousLongStop ? -1 :
                  trendDirection

// === PLOT SETTINGS ===
var color longTrendColor = color.green
var color shortTrendColor = color.red

// === PLOT LONG STOP LINE ===
longStopPlot = plot(trendDirection == 1 ? longStop : na, title="Long Stop", style=plot.style_linebr, linewidth=2, color=longTrendColor)
buySignal = trendDirection == 1 and trendDirection[1] == -1
plotshape(buySignal ? longStop : na, title="Long Stop Start", location=location.absolute, style=shape.circle, size=size.tiny, color=longTrendColor)
plotshape(buySignal and showSignalLabels ? longStop : na, title="Buy Label", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=longTrendColor, textcolor=color.white)

// === PLOT SHORT STOP LINE ===
shortStopPlot = plot(trendDirection == 1 ? na : shortStop, title="Short Stop", style=plot.style_linebr, linewidth=2, color=shortTrendColor)
sellSignal = trendDirection == -1 and trendDirection[1] == 1
plotshape(sellSignal ? shortStop : na, title="Short Stop Start", location=location.absolute, style=shape.circle, size=size.tiny, color=shortTrendColor)
plotshape(sellSignal and showSignalLabels ? shortStop : na, title="Sell Label", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=shortTrendColor, textcolor=color.white)

// === HIDDEN MID PRICE PLOT FOR BACKGROUND HIGHLIGHTING ===
midPricePlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=1, display=display.none, editable=false)

longHighlightColor = highlightTrend ? (trendDirection == 1 ? longTrendColor : na) : na
shortHighlightColor = highlightTrend ? (trendDirection == -1 ? shortTrendColor : na) : na
//fill(midPricePlot, longStopPlot, title="Long State Filling", color=longHighlightColor)
//fill(midPricePlot, shortStopPlot, title="Short State Filling", color=shortHighlightColor)

// === ALERT CONDITIONS ===
trendChange = trendDirection != trendDirection[1]
//alertcondition(trendChange, title="Alert: SuperTrend Direction Change", message="SuperTrend has changed direction!\nSymbol: {{exchange}}:{{ticker}}\nPrice: {{close}}")
//alertcondition(buySignal, title="Alert: SuperTrend Buy", message="SuperTrend Buy!\nSymbol: {{exchange}}:{{ticker}}\nPrice: {{close}}")
//alertcondition(sellSignal, title="Alert: SuperTrend Sell", message="SuperTrend Sell!\nSymbol: {{exchange}}:{{ticker}}\nPrice: {{close}}")

// === STRATEGY ORDERS ===
if buySignal
    strategy.entry("Buy", strategy.long, comment="Buy")
if sellSignal
    strategy.close("Buy", comment="Sell")
    //strategy.close_all()
