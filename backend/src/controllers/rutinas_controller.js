const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generarRutina = async (req, res) => {
  const { objetivo, nivel, dias, restricciones } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ gratis y rápido
      messages: [
        {
          role: "user",
          content: `Eres un entrenador personal profesional de un gimnasio llamado PowerGym. 
Genera una rutina de entrenamiento semanal personalizada para un cliente con las siguientes características:
- Objetivo: ${objetivo}
- Nivel: ${nivel}
- Días disponibles por semana: ${dias}
- Restricciones o lesiones: ${restricciones || "Ninguna"}

La rutina debe ser clara, estructurada por días, con ejercicios específicos, series y repeticiones.
Incluye también consejos de nutrición básicos y de descanso. Responde en español.`
        }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const rutina = completion.choices[0]?.message?.content || "No se pudo generar la rutina";
    return res.json({ texto: rutina });

  } catch (error) {
    console.error("ERROR GROQ:", error.message);
    return res.status(500).json({ error: "Error al generar la rutina" });
  }
};

module.exports = { generarRutina };