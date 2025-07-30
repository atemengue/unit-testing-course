import { describe, expect, it } from 'vitest';
import { verifyName } from '../../src/utils/verify';


describe("verifyName Test Suite", () => {

  it("doit me retourner false si la taille du name < 8", () => {

    // Arrange
    const name = "joe";

    // Act 
    const actual = verifyName(name);

    // Assert
    expect(actual).toBe(false);

  })
  it("doit me retourner true si la  taille name >= 8", () => {

      // Arrange
    const name = "antoine-regis";

    // Act 
    const actual = verifyName(name);

    // Assert
    expect(actual).toBe(true);

  });

})