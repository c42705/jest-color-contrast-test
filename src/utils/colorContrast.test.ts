import { 
  hexToRgb, 
  getContrastRatio, 
  isAACompliant, 
  isAAACompliant, 
  isLargeTextAACompliant, 
  isLargeTextAAACompliant,
  evaluateContrast
} from './colorContrast';

describe('Color Contrast Utilities', () => {
  describe('hexToRgb', () => {
    it('should convert 6-digit hex to RGB', () => {
      expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
      expect(hexToRgb('#FFFFFF')).toEqual([255, 255, 255]);
      expect(hexToRgb('#FF0000')).toEqual([255, 0, 0]);
      expect(hexToRgb('#00FF00')).toEqual([0, 255, 0]);
      expect(hexToRgb('#0000FF')).toEqual([0, 0, 255]);
    });

    it('should convert 3-digit hex to RGB', () => {
      expect(hexToRgb('#000')).toEqual([0, 0, 0]);
      expect(hexToRgb('#FFF')).toEqual([255, 255, 255]);
      expect(hexToRgb('#F00')).toEqual([255, 0, 0]);
      expect(hexToRgb('#0F0')).toEqual([0, 255, 0]);
      expect(hexToRgb('#00F')).toEqual([0, 0, 255]);
    });

    it('should handle hex with or without # prefix', () => {
      expect(hexToRgb('000000')).toEqual([0, 0, 0]);
      expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
    });
  });

  describe('getContrastRatio', () => {
    it('should calculate correct contrast ratio for black and white', () => {
      const ratio = getContrastRatio('#000000', '#FFFFFF');
      expect(ratio).toBeCloseTo(21, 0); // Black and white have a contrast ratio of 21:1
    });

    it('should calculate correct contrast ratio for similar colors', () => {
      const ratio = getContrastRatio('#777777', '#888888');
      expect(ratio).toBeLessThan(3); // Similar gray colors have low contrast
    });

    it('should return the same ratio regardless of color order', () => {
      const ratio1 = getContrastRatio('#000000', '#FFFFFF');
      const ratio2 = getContrastRatio('#FFFFFF', '#000000');
      expect(ratio1).toEqual(ratio2);
    });
  });

  describe('WCAG compliance checks', () => {
    it('should correctly identify AA compliance for normal text', () => {
      expect(isAACompliant(4.4)).toBe(false);
      expect(isAACompliant(4.5)).toBe(true);
      expect(isAACompliant(5.0)).toBe(true);
    });

    it('should correctly identify AAA compliance for normal text', () => {
      expect(isAAACompliant(6.9)).toBe(false);
      expect(isAAACompliant(7.0)).toBe(true);
      expect(isAAACompliant(8.0)).toBe(true);
    });

    it('should correctly identify AA compliance for large text', () => {
      expect(isLargeTextAACompliant(2.9)).toBe(false);
      expect(isLargeTextAACompliant(3.0)).toBe(true);
      expect(isLargeTextAACompliant(4.0)).toBe(true);
    });

    it('should correctly identify AAA compliance for large text', () => {
      expect(isLargeTextAAACompliant(4.4)).toBe(false);
      expect(isLargeTextAAACompliant(4.5)).toBe(true);
      expect(isLargeTextAAACompliant(5.0)).toBe(true);
    });
  });

  describe('evaluateContrast', () => {
    it('should return comprehensive contrast evaluation for accessible colors', () => {
      const result = evaluateContrast('#000000', '#FFFFFF');
      expect(result.ratio).toBeCloseTo(21, 0);
      expect(result.isAACompliant).toBe(true);
      expect(result.isAAACompliant).toBe(true);
      expect(result.isLargeTextAACompliant).toBe(true);
      expect(result.isLargeTextAAACompliant).toBe(true);
    });

    it('should return comprehensive contrast evaluation for inaccessible colors', () => {
      const result = evaluateContrast('#CCCCCC', '#FFFFFF');
      expect(result.ratio).toBeLessThan(3);
      expect(result.isAACompliant).toBe(false);
      expect(result.isAAACompliant).toBe(false);
      expect(result.isLargeTextAACompliant).toBe(false);
      expect(result.isLargeTextAAACompliant).toBe(false);
    });

    it('should identify colors that meet AA but not AAA standards', () => {
      // Find colors with contrast ratio between 4.5 and 7
      const result = evaluateContrast('#767676', '#FFFFFF');
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
      expect(result.ratio).toBeLessThan(7);
      expect(result.isAACompliant).toBe(true);
      expect(result.isAAACompliant).toBe(false);
      expect(result.isLargeTextAACompliant).toBe(true);
      expect(result.isLargeTextAAACompliant).toBe(true);
    });
  });
});
