import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Sin opciones deprecadas
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;