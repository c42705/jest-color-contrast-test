/**
 * Color contrast utility functions for accessibility testing
 * Based on WCAG 2.0 guidelines
 */
import wcagContrast from 'wcag-contrast';

/**
 * Interface for color contrast result
 */
export interface ContrastResult {
  ratio: number;
  isAACompliant: boolean;
  isAAACompliant: boolean;
  isLargeTextAACompliant: boolean;
  isLargeTextAAACompliant: boolean;
}

/**
 * Converts a hex color to RGB
 * @param hex - Hex color string (e.g., "#FFFFFF" or "#FFF")
 * @returns RGB array [r, g, b]
 */
export const hexToRgb = (hex: string): [number, number, number] => {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Handle shorthand hex (e.g., #FFF)
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
};

/**
 * Calculates the contrast ratio between two colors
 * @param color1 - First color in hex format (e.g., "#FFFFFF")
 * @param color2 - Second color in hex format (e.g., "#000000")
 * @returns Contrast ratio (1-21)
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  return wcagContrast.hex(color1, color2);
};

/**
 * Checks if the contrast ratio meets WCAG 2.0 AA standards for normal text
 * @param ratio - Contrast ratio
 * @returns Whether the contrast meets AA standards for normal text (4.5:1)
 */
export const isAACompliant = (ratio: number): boolean => {
  return ratio >= 4.5;
};

/**
 * Checks if the contrast ratio meets WCAG 2.0 AAA standards for normal text
 * @param ratio - Contrast ratio
 * @returns Whether the contrast meets AAA standards for normal text (7:1)
 */
export const isAAACompliant = (ratio: number): boolean => {
  return ratio >= 7;
};

/**
 * Checks if the contrast ratio meets WCAG 2.0 AA standards for large text
 * @param ratio - Contrast ratio
 * @returns Whether the contrast meets AA standards for large text (3:1)
 */
export const isLargeTextAACompliant = (ratio: number): boolean => {
  return ratio >= 3;
};

/**
 * Checks if the contrast ratio meets WCAG 2.0 AAA standards for large text
 * @param ratio - Contrast ratio
 * @returns Whether the contrast meets AAA standards for large text (4.5:1)
 */
export const isLargeTextAAACompliant = (ratio: number): boolean => {
  return ratio >= 4.5;
};

/**
 * Evaluates the contrast between two colors and returns a comprehensive result
 * @param foreground - Foreground color in hex format (e.g., "#FFFFFF")
 * @param background - Background color in hex format (e.g., "#000000")
 * @returns ContrastResult object with ratio and compliance information
 */
export const evaluateContrast = (foreground: string, background: string): ContrastResult => {
  const ratio = getContrastRatio(foreground, background);
  
  return {
    ratio,
    isAACompliant: isAACompliant(ratio),
    isAAACompliant: isAAACompliant(ratio),
    isLargeTextAACompliant: isLargeTextAACompliant(ratio),
    isLargeTextAAACompliant: isLargeTextAAACompliant(ratio)
  };
};
