const generarRutina = async (req, res) => {
  const { objetivo, nivel, dias, restricciones } = req.body;

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "HuggingFaceH4/zephyr-7b-beta",
          messages: [
            {
              role: "user",
              content: `
Eres un entrenador personal.

Crea una rutina de gimnasio:

Objetivo: ${objetivo}
Nivel: ${nivel}
Días por semana: ${dias}
Restricciones: ${restricciones || "ninguna"}

Divide por días con ejercicios, series y repeticiones.
              `,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    const texto = data?.choices?.[0]?.message?.content;

    return res.json({ texto });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { generarRutina };