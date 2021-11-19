import { Style } from "../model/Style";
import { IColor, IHSL, IRGB } from "../model/ValidatorBuilder";

export function getDefaultColorValue(): IColor {
  let hex = Style.COLOR_BLACK;
  return {
    hex,
    rgb: hexToRGB(hex),
    hsl: hexToHSL(hex)
  }
}

export function getInitialColorValue(value: string | IColor): IColor {
  if (!value) return getDefaultColorValue()
  return typeof value === 'string' ? hexToColor(value) : value as IColor
}

export function hexToColor(hex: string): IColor {
  return {
    hex: hex,
    rgb: hexToRGB(hex),
    hsl: hexToHSL(hex)
  }
}

export function HSLToHex(hsl: IHSL): string {
  let h = hsl.hue;
  let s = hsl.saturation / 100;
  let l = hsl.lightness / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r: any = 0,
      g: any = 0, 
      b: any = 0; 

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

export function HSLtoRGB(hsl: IHSL) {
  return hexToRGB(HSLToHex(hsl));
}

export function RGBToHSL(rgb: IRGB) {
  return hexToHSL(RGBToHex(rgb));
}

export function RGBToHex(rgb: IRGB) {
  let r = rgb.red.toString(16);
  let g = rgb.green.toString(16);
  let b = rgb.blue.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

export function hexToHSL(hex: string): IHSL {
  let red: any = 0,
      green: any = 0,
      blue: any = 0;
  if (hex.length == 4) {
    red = "0x" + hex[1] + hex[1];
    green = "0x" + hex[2] + hex[2];
    blue = "0x" + hex[3] + hex[3];
  } else if (hex.length == 7) {
    red = "0x" + hex[1] + hex[2];
    green = "0x" + hex[3] + hex[4];
    blue = "0x" + hex[5] + hex[6];
  }

  red /= 255;
  green /= 255;
  blue /= 255;
  let cmin = Math.min(red,green,blue),
      cmax = Math.max(red,green,blue),
      delta = cmax - cmin,
      hue = 0,
      saturation = 0,
      lightness = 0;

  if (delta == 0)
    hue = 0;
  else if (cmax == red)
    hue = ((green - blue) / delta) % 6;
  else if (cmax == green)
    hue = (blue - red) / delta + 2;
  else
    hue = (red - green) / delta + 4;

  hue = Math.round(hue * 60);

  if (hue < 0)
    hue += 360;

  lightness = (cmax + cmin) / 2;
  saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
  saturation = +(saturation * 100).toFixed(1);
  lightness = +(lightness * 100).toFixed(1);

  return {
    hue,
    saturation,
    lightness 
  }
}

export function hexToRGB(hex: string): IRGB {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return Array.isArray(result) ? {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16)
  } : { red: 0, green: 0, blue: 0 }
}