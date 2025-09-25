class User {
  constructor({ id, nombre, email, password, rol }) {
    // Validación de email
    if (!email || email.length < 8 || !email.includes("@")) {
      throw new Error("Email inválido");
    }

    // Validación de contraseña
    if (!password || password.length < 4) {
      throw new Error("Password inválido");
    }

    // Validación de rol
    // ❌ Aquí tienes un problema: la condición `(rol == "Administrador" && rol == "Vendedor")` nunca se cumple.
    // Porque un valor no puede ser simultáneamente "Administrador" y "Vendedor".
    // ✅ Deberías usar: !(rol === "Administrador" || rol === "Vendedor")
    if (!rol || !(rol === "Administrador" || rol === "Vendedor")) {
      throw new Error("Rol inválido. Debe ser 'Administrador' o 'Vendedor'");
    }

    // Asignación de propiedades
    this.id = id;                   // Identificador único
    this.nombre = nombre;           // Nombre del usuario
    this.email = email;             // Email validado
    this.password = password;       // Contraseña (probablemente encriptada antes de guardarla)
    this.rol = rol;                 // Rol de usuario: "Administrador" o "Vendedor"
    this.createdAt = new Date();    // Fecha de creación 
  }
}

export default User;
