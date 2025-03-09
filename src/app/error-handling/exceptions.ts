class InvalidEventNameError extends Error {
  constructor(error: string) {
    super(error);
    this.name = 'InvalidEventNameError';
  }
}

class InvalidEventPriceError extends Error {
  constructor(error: string) {
    super(error);
    this.name = 'InvalidEventPriceError';
  }
}

class InvalidUsernameError extends Error {
  constructor(error: string) {
    super(error);
    this.name = 'InvalidUsernameError';
  }
}

class InvalidReferralCodeError extends Error {
  constructor(error: string) {
    super(error);
    this.name = 'InvalidReferralCodeError';
  }
}

class UserHasAccountError extends Error {
  constructor(error: string) {
    super(error);
    this.name = 'UserHasAccountError';
  }
}

export {
  InvalidEventNameError,
  InvalidEventPriceError, InvalidReferralCodeError, InvalidUsernameError, UserHasAccountError
};
