import { describe, expect, it, vi } from 'vitest';
import { DataBase } from '../../src/app/data/DataBase';
import { UserCredentialsDataAccess } from '../../src/app/data/UserCredentialsDataAccess';


const DataBaseMock = {
  insert: vi.fn(),
  getBy: vi.fn()
}

vi.mock('../../src/app/data/DataBase', () => {
  return {
    DataBase: vi.fn().mockImplementation(() => {
      return DataBaseMock
        
  })
}});

describe('UserCredentialsDataAccess', () => {

  let sut: UserCredentialsDataAccess

  const someUser = {
    id: '',
    name: 'John Doe',
    email:""
  };

  const someId = "1234";

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toBeCalledTimes(1);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should add a user and return id', async () => {
    const mockInsert = vi.mocked(DataBaseMock.insert).mockResolvedValueOnce(someId);

    const actualId = await sut.addUser(someUser);

    expect(actualId).toBe(someId);
    expect(mockInsert).toHaveBeenCalledWith(someUser);
  
  });

  it('should get a user by name', async () => {
    const getByMock = vi.mocked(DataBaseMock.getBy).mockResolvedValueOnce(someUser);

    const actualUser = await sut.getUserByUserName(someUser.name);

    expect(actualUser).toBe(someUser);
    expect(getByMock).toHaveBeenCalledWith('name', someUser.name);

  });

  it('should get a user by id', async () => {
    const getByMock = vi.mocked(DataBaseMock.getBy).mockResolvedValueOnce(someUser);

    const actualUser = await sut.getUserById(someId);

    expect(actualUser).toBe(someUser);
    expect(getByMock).toHaveBeenCalledWith('id', someId);

  });

  




})