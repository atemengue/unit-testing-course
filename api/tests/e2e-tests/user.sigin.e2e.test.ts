import { beforeAll, describe, it } from 'vitest';
import app from '../../src';
import authRoutes from '../../src/routes/auth.routes';



beforeAll(() => {
  app.use(authRoutes)
});

describe("As user, when I sign Up with good credentials, ", () => {


  it("should then response status 201, with token and user should be saved in db", async () => { 


    // Arrange

    // Act


    // Assert


  })

})