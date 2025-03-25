import { describe, expect, it } from 'vitest';
import { sum } from '../../src/app/others/sum';

describe.only('sum', () => {
  // Teste la somme de deux nombres positifs
  it('devrait retourner la somme de deux nombres positifs', () => {
    expect(sum(2, 3)).toBe(5); // 2 + 3 = 5
  });

  // Teste la somme d'un nombre positif et d'un nombre négatif
  it('devrait retourner la somme d\'un nombre positif et d\'un nombre négatif', () => {
    expect(sum(7, -3)).toBe(4); // 7 + (-3) = 4
  });

  // Teste la somme de deux nombres négatifs
  it('devrait retourner la somme de deux nombrrs négatifs', () => {
    expect(sum(-4, -6)).toBe(-10); // -4 + (-6) = -10
  });

  // Teste la somme lorsqu'un des nombres est zéro
  it('devrait retourner la somme lorsqu\'un des nombres est zéro', () => {
    expect(sum(0, 5)).toBe(5); // 0 + 5 = 5
  });
});