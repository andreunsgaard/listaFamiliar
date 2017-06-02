'use strict';

module.exports = function(Producto) {
	Producto.observe("before save", function(ctx, next) {
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;
		if (ctx.isNewInstance) {
			Usuario.findById(ctx.options.accessToken.userId, function(err, usuario) {
				if (err) next(err);
				if (ctx.instance) {
					ctx.instance.listaFamiliarId = usuario.listaFamiliarId;
				}
				next();
			})
		} else {
			next();
		}
	});

	/**
	 * Modificar el atributo comprar de todos los productos de la lista del usuario para que aparezcan como comprados
	 * @param {object} ctx El contexto de ejecución de la petición
	 * @param {Function(Error, array)} cb
	 */

	Producto.limpiarLista = function(ctx, cb) {
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;
		console.log(ctx.req.accessToken);

		//Buscamos al usuario que está autenticado para conocer a qué lista familiar está asociado
		Usuario.findById(ctx.req.accessToken.userId, function(err, usuario) {
			if (err) cb(err);

			Producto.updateAll({
				listaFamiliarId: usuario.listaFamiliarId
			}, {
				comprar: false
			}, function(err, productos) {
				if (err) cb(err);
				cb(null, productos);
			});
		});
		// TODO

	};

	/**
	 * limpiando un producto en concreto
	 * @param {Function(Error, boolean)} callback
	 */

	Producto.prototype.limpiarproducto = function(callback) {
		var producto;
		// TODO

		this.comprar = !this.comprar;

		this.save(function(err, productocambiado) {

			if (err) cb(err);

			callback(null, productocambiado);

		});
	};

};