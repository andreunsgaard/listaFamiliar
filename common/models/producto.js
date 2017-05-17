'use strict';

module.exports = function(Producto) {
	Producto.beforeRemote("create", function(ctx, modelInstance, next) {
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;
		Usuario.findById(ctx.req.accessToken.userId, function(err, usuario) {
			if (err) next(err);
			ctx.args.data.listaFamiliarId = usuario.listaFamiliarId;
			next();
		})
	})
	Producto.beforeRemote("update", function(ctx, modelInstance, next) {
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;
		Usuario.findById(ctx.req.accessToken.userId, function(err, usuario) {
			if (err) next(err);
			ctx.args.data.listaFamiliarId = usuario.listaFamiliarId;
			next();
		})
	})

};