class ExtendableError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
		this.message = message;
		Error.captureStackTrace(this, this.constructor.name);
	}
}

export default ExtendableError;
