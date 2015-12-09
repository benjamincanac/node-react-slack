import ExtendableError from './extendable-error';

class NotFoundError extends ExtendableError {
	constructor(message) {
		super(message, 404);
	}
}

export default NotFoundError;
