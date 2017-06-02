module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('permisocomprar', function(role, context, cb) {

    if (context.modelName !== 'Producto') {
      // A: No. This role is only for projects: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    //Q: Is the user logged in? (there will be an accessToken with an ID if so)
    var userId = context.accessToken.userId;
    if (!userId) {
      //A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    app.models.Usuario.findById(userId, function(err, usuario) {
      if(err) return cb(err);
       app.models.Producto.findById(context.modelId, function(err, productossss){
        if(err) return cb(err);

         if(productossss.listaFamiliarId===usuario.listaFamiliarId){

           return cb(null, true);
        }else{

           return cb(null, false);


        }

       });
    });


  });
};
