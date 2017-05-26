'use strict';

module.exports = function(Usuario) {

	Usuario.prototype.aceptarSolicitud = function(ctx, cb) {
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;

		var usuarioSolicitante = this;
		//Buscamos al usuario que está autenticado para conocer a qué lista familiar está asociado
		Usuario.findById(ctx.req.accessToken.userId, function(err, usuario) {
			if (err) cb(err);

			//Comprobamos que el usuario que se va a añadir a la lista, verdaderamente ha realizado la solicitud correspondiente
			usuarioSolicitante.solicitudes.findById(usuario.listaFamiliarId, function(err, solicitud){
				if (err) cb(err);
				// Si había alguna solicitud pendiente del usuario solicitante a la lista del usuario autenticado
				if(solicitud){
					// asociamos al solicitante la misma lista que tiene asociada el autenticado
					usuarioSolicitante.listaFamiliarId = usuario.listaFamiliarId;
					//guardamos los cambios
					usuarioSolicitante.save(function(err, usuarioAceptado){

						if (err) cb(err);
						// eliminamos la solicitud a esa lista, aunque es posible que queden más solicitudes de ese usuario
						usuarioSolicitante.solicitudes.remove(solicitud, function(err){
							if (err) cb(err);
							//La operación se ha realizado con éxito
							cb(null, "Solicitud aceptada");
						});
					});
				} else {
					var mensaje = "El usuario no ha solicitado pertenecer a su lista";
					//El usuario no tiene había solicitado pertenecer a la lista del usuario autenticado
					cb(new Error(mensaje), mensaje);
				}
			});
		})
	};
};
