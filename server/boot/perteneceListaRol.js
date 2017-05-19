module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('Listamember', function(role, context, cb) {
    // Q: Is the current request accessing a Project?
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
        if(usuario.listaFamiliarId){
          // A: YES. At least one Team associated with this User AND Project
          // callback with TRUE, user is role:`teamMember`
          return cb(null, true);
        }

    else{
          // A: NO, User is not in this Project's Team
          // callback with FALSE, user is NOT role:`teamMember`
          return cb(null, false);
        }

    })


  });
};

