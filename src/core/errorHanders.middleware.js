import { responde500 } from './responses.service';

module.exports = {
	errorHandler: (err, req, res, next) => {
		if (req.is('application/json') && err.type == 'entity.parse.failed') {
			return responde500(res, { error: true, message: 'Json malforado', data: {} });
		}
		console.error(err.stack);
		return responde500(res, { error: true, message: 'Ha ocurrido un error', data: err.toString() });
	},

	handlePoolError: async (connection, { error, message: msg, data }) => {
		await connection.release();
		await connection.destroy();
		console.warn(data);
		if (data !== undefined && error === true) {
			const { message, errno } = data;
			return { error, message: msg, data: { message, errno } };
		} else {
			return { error, message: msg, data };
		};
	},
	handleTransError: async (connection, { error, message: msg, data }) => {
		await connection.rollback();
		await connection.release();
		await connection.destroy();
		console.warn(data);
		if (data !== undefined && error === true) {
			const { message, errno } = data;
			return { error, message: msg, data: { message, errno } };
		} else {
			return { error, message: msg, data };
		};
	},
	handleError: async (connection, error) => {
		await connection.end();
		console.warn(error);
		const { message, errno } = error;
		return { message, errno };
	},
}
