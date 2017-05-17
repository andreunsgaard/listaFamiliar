'use strict';

module.exports = function(Producto) {
Producto.observe('before save',function(ctx,next){
	var app = require('../../server/server.js')
	var Usuario = app.models.Usuario;
	console.log(ctx.options.accessToken.userId)
	Usuario.findById(ctx.options.accessToken.userId, function(err, usuario) {
		if (err) next(err);
		if(ctx.instance){
			ctx.instance.listaFamiliarId = usuario.listaFamiliarId
			console.log(ctx.instance.listaFamiliar)
		}
		next();
	})
})


};
