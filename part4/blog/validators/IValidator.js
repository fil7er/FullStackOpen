// This is the base class for all validators
class IValidator {
    constructor(error = false, status = 200, message = "") {
        this.error = error;
        this.status = status;
        this.message = message;
    }
}

module.exports = IValidator;