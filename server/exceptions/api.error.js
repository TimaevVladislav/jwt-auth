
class ExceptionApi extends Error {
    status
    errors

    constructor(status, message, errors) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ExceptionApi(401, "User is not authorized")
    }

    static BadRequest(message, errors = []) {
        return new ExceptionApi(400, message, errors)
    }
}

module.exports = ExceptionApi