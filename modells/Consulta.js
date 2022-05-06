import mongoose from "mongoose";

const consultaSchema = mongoose.Schema(
  {
    nombrePaciente: {
      type: String,
      required: true,
      trim: true,
    },
    edad: {
      type: Number,
      required: true,
      trim: true,
    },
    fecha: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    sintomas: {
      type: String,
      required: true,
      trim: true,
    },

    dueño: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },

    colaboradores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
  },
  { timestamps: true }
);

 const Consulta = mongoose.model('Consulta', consultaSchema);
 export default Consulta;
