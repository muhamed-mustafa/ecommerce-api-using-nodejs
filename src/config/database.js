import mongoose from 'mongoose';

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) =>
      console.log(`Database Connected : ${conn.connection.host}`)
    );
};

export { dbConnection };
