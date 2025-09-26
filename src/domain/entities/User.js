class User {
    constructor({ id, nombre, email, password, rol }) {
      if(!email || email.length <8 || !email.includes("@")) throw new Error("Email inválido");
      if(!password || password.length <4) throw new Error("Password inválido");
      if (!rol || (rol == "Administrador" && rol == "Vendedor")) { throw new Error("Rol inválido. Debe ser 'Administrador' o 'Vendedor'");
}
      this.id = id;
      this.nombre = nombre;
      this.email = email;
      this.password = password;
      this.rol = rol;
      this.createAt = new Date();
    }
  }
  export default User;
  