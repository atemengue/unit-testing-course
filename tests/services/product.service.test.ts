import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ProductService from '../../src/services/product.service';

describe("Product Service", () => {

  let sut: ProductService

  beforeEach(() => {
    sut = new ProductService;
  });

  afterEach(() => {
    vi.clearAllMocks;
  })


  describe("createProduct Tests Suites", () => {

  });

  describe("getById Tests Suites", () => {
    
  });

  describe("getByName Tests Suites", () => {
    
  });

  describe("lists Tests Suites", () => {
    
  });
  
  describe("updateProduct Tests Suites", () => {
    
  });

  describe("deleteProduct Tests Suites", () => {
    
  });

})