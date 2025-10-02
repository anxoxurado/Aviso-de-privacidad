import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor ingrese un email válido'
    ]
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [8, 'La contraseña debe tener mínimo 8 caracteres'],
    select: false
  },
  telefono: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, 'Por favor ingrese un teléfono válido de 10 dígitos']
  },
  direccion: {
    calle: String,
    ciudad: String,
    estado: String,
    codigoPostal: String,
    pais: { type: String, default: 'México' }
  },
  role: {
    type: String,
    enum: ['cliente', 'admin', 'superadmin'],
    default: 'cliente'
  },
  aceptaTerminos: {
    type: Boolean,
    required: [true, 'Debe aceptar los términos y condiciones'],
    validate: {
      validator: function(v) { return v === true; },
      message: 'Debe aceptar los términos y condiciones'
    }
  },
  aceptaPrivacidad: {
    type: Boolean,
    required: [true, 'Debe aceptar el aviso de privacidad'],
    validate: {
      validator: function(v) { return v === true; },
      message: 'Debe aceptar el aviso de privacidad'
    }
  },
  intentosFallidosLogin: {
    type: Number,
    default: 0
  },
  bloqueadoHasta: Date,
  ultimoLogin: Date,
}, { timestamps: true }
);

// Encriptar password antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
  this.password = await bcrypt.hash(this.password, rounds);
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);