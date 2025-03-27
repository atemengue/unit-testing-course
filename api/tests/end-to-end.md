### End-to-End Test Scenarios

#### Scenario: Successful User Registration
- **Given**: No user exists with email `test@example.com`.
- **When**: A `POST` request is sent to `/api/users/register` with the following data:
  | Name      | Email            | Password   |
  |-----------|------------------|------------|
  | Test User | test@example.com | Password1! |
- **Then**:
  - The response status should be `201`.
  - The response should contain a valid JWT token.
  - The user should be saved in the database.

#### Scenario: Duplicate Email Registration
- **Given**: A user already exists with email `existing@example.com`.
- **When**: A `POST` request is sent to `/api/users/register` with the following data:
  | Name      | Email               | Password   |
  |-----------|---------------------|------------|
  | Test User | existing@example.com| Password1! |
- **Then**:
  - The response status should be `400`.
  - The response should contain the error message: `Email already exists`.

  #### Scenario: Admin Creates a New Category
  - **Given**: I am logged in as an admin user.
  - **When**: A `POST` request is sent to `/api/categories` with the following data:
    | Name        | Description          |
    |-------------|----------------------|
    | Electronics | Gadgets and devices  |
  - **Then**:
    - The response status should be `201`.
    - The response should contain the new category ID.
    - The category should exist in the database.

  #### Scenario: Non-Admin Tries to Create a Category
  - **Given**: I am logged in as a regular user.
  - **When**: A `POST` request is sent to `/api/categories` with the following data:
    | Name        | Description          |
    |-------------|----------------------|
    | Electronics | Gadgets and devices  |
  - **Then**:
    - The response status should be `403`.
    - The response should contain the error message: `Forbidden`.

  #### Scenario: Admin Adds a Product to a Category
  - **Given**: I am logged in as an admin user, and a category `Electronics` exists.
  - **When**: A `POST` request is sent to `/api/products` with the following data:
    | Name       | Price  | Category ID | Stock |
    |------------|--------|-------------|-------|
    | Smartphone | 599.99 | 1           | 100   |
  - **Then**:
    - The response status should be `201`.
    - The product should be linked to the `Electronics` category.
    - The inventory should reflect `100` units in stock.

  #### Scenario: Attempt to Add Product with Invalid Category
  - **Given**: I am logged in as an admin user.
  - **When**: A `POST` request is sent to `/api/products` with the following data:
    | Name       | Price  | Category ID | Stock |
    |------------|--------|-------------|-------|
    | Smartphone | 599.99 | 999         | 100   |
  - **Then**:
    - The response status should be `404`.
    - The response should contain the error message: `Category not found`.

  #### Scenario: Admin Updates Product Stock
  - **Given**: I am logged in as an admin user, and a product `Smartphone` exists with stock `100`.
  - **When**: A `PATCH` request is sent to `/api/inventory/1` with the following data:
    | Stock |
    |-------|
    | 150   |
  - **Then**:
    - The response status should be `200`.
    - The product stock should be updated to `150`.

  #### Scenario: Attempt to Set Negative Stock
  - **Given**: I am logged in as an admin user, and a product `Smartphone` exists with stock `100`.
  - **When**: A `PATCH` request is sent to `/api/inventory/1` with the following data:
    | Stock |
    |-------|
    | -50   |
  - **Then**:
    - The response status should be `400`.
    - The response should contain the error message: `Stock cannot be negative`.

  #### Scenario: Successful Purchase Reduces Stock
  - **Given**: I am logged in as a regular user, and a product `Smartphone` exists with stock `100`.
  - **When**: A `POST` request is sent to `/api/orders` with the following data:
    | Product ID | Quantity |
    |------------|----------|
    | 1          | 2        |
  - **Then**:
    - The response status should be `201`.
    - The product stock should be reduced to `98`.
    - The order should appear in my order history.

  #### Scenario: Attempt to Purchase Out-of-Stock Item
  - **Given**: I am logged in as a regular user, and a product `Smartphone` exists with stock `1`.
  - **When**: A `POST` request is sent to `/api/orders` with the following data:
    | Product ID | Quantity |
    |------------|----------|
    | 1          | 2        |
  - **Then**:
    - The response status should be `400`.
    - The response should contain the error message: `Insufficient stock`.