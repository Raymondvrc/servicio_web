import Express from "express";
import bodyParser from "body-parser";
const Port = 3000;
const app = Express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("haciendo prueba");
});

app.post("/Agenda", async (req, res) => {
  try {
    const data = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
    };
    const response = await fetch("http://www.raydelto.org/agenda.php", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("error en la solicitud");
    }

    const responseData = await response.text();
    res.json(responseData);
  } catch (error) {
    res.json(error);
  }
});

app.get("/recieveAgenda", async (req, res) => {
  try {
    const response = await fetch("http://www.raydelto.org/agenda.php", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Código de estado: ${response.status}`);
    }

    const data = await response.json();

    res.json(JSON.stringify(data));
  } catch (error) {
    res.json(error);
  }
});

app.listen(Port, () => {
  console.log(`se esta ejecutando en el puerto: ${Port}`);
});
