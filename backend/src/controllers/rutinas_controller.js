const fetch = require("node-fetch");

const generarRutina = async (req, res) => {
  const { objetivo, nivel, dias, restricciones } = req.body;

  const prompt = `
Eres un entrenador personal.
Crea una rutina con:
Objetivo: ${objetivo}
Nivel: ${nivel}
Días: ${dias}
Restricciones: ${restricciones || "ninguna"}
Incluye ejercicios, series y reps.
`;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const data = await response.json();

    const texto =
      data?.[0]?.generated_text || "No se pudo generar la rutina";

    res.json({ texto });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error IA" });
  }
};

module.exports = { generarRutina };