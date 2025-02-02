// src/pages/Experience/ExperienceCreationPage.jsx
import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
  Select,
  Box,
  Modal,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ExperienceCreationPage = ({ addNewExperience }) => {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    category: "",
    title: "",
    address: "",
    description: "",
    startDate: "",
    endDate: "",
    agreementChecked: false,
    image: null,
    imagePreview: null,
    ticketPrice: "",
    ticketTax: "",
  });

  const [previewOpen, setPreviewOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Envio de Imagem
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData((prevData) => ({
        ...prevData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const isFormValid = () => {
    return (
      eventData.category &&
      eventData.title &&
      eventData.address &&
      eventData.startDate &&
      eventData.endDate &&
      eventData.agreementChecked &&
      eventData.ticketPrice &&
      eventData.ticketTax
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    // Cria objeto da nova experiência
    const newEvent = {
      id: Date.now(), // Exemplo de ID numérico
      title: eventData.title,
      location: eventData.address,
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      imageUrl: eventData.imagePreview,
      details: eventData.description || "Sem descrição",
      category: eventData.category,
      tickets: [
        {
          id: `${Date.now()}-0`,
          type: "Ingresso",
          price: parseFloat(eventData.ticketPrice),
          tax: parseFloat(eventData.ticketTax),
          soldOut: false,
        },
      ],
    };

    // Adiciona ao estado global, na categoria selecionada
    addNewExperience(eventData.category, newEvent);

    // Redireciona para a Home
    navigate("/");
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        boxShadow: 2,
        borderRadius: "8px",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Criar Evento Presencial
      </Typography>

      {/* 1. Categoria */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        1. Categoria
      </Typography>
      <Select
        fullWidth
        name="category"
        value={eventData.category}
        onChange={handleChange}
        margin="normal"
        displayEmpty
      >
        <MenuItem value="">
          <em>Selecione uma categoria</em>
        </MenuItem>
        <MenuItem value="Workshops e Aulas">Workshops e Aulas</MenuItem>
        <MenuItem value="Shows e Entretenimento">Shows e Entretenimento</MenuItem>
        <MenuItem value="Viagens e Turismo">Viagens e Turismo</MenuItem>
        <MenuItem value="Aventura e Adrenalina">Aventura e Adrenalina</MenuItem>
        <MenuItem value="Relaxamento e Bem-Estar">Relaxamento e Bem-Estar</MenuItem>
        <MenuItem value="Gastronomia e Degustações">Gastronomia e Degustações</MenuItem>
        <MenuItem value="Infantil e Familiar">Infantil e Familiar</MenuItem>
        <MenuItem value="Experiências Personalizadas">Experiências Personalizadas</MenuItem>
      </Select>

      {/* 2. Onde o seu evento vai acontecer */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        2. Onde o seu evento vai acontecer?
      </Typography>
      <TextField
        fullWidth
        label="Endereço"
        name="address"
        value={eventData.address}
        onChange={handleChange}
        margin="normal"
        required
      />

      {/* 3. Informações básicas */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        3. Informações básicas
      </Typography>
      <TextField
        fullWidth
        label="Nome do Evento"
        name="title"
        value={eventData.title}
        onChange={handleChange}
        margin="normal"
        required
      />

      {/* 4. Envio de Imagem */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span">
            Adicionar Imagem
          </Button>
        </label>
        {eventData.imagePreview && (
          <img
            src={eventData.imagePreview}
            alt="Prévia"
            style={{
              marginTop: "10px",
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        )}
      </Box>

      {/* 5. Descrição do evento */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        5. Descrição do evento
      </Typography>
      <TextField
        fullWidth
        label="Descrição"
        name="description"
        value={eventData.description}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
      />

      {/* 6. Data e horário */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        6. Data e horário
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          fullWidth
          type="datetime-local"
          label="Data e Hora de Início"
          name="startDate"
          value={eventData.startDate}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          type="datetime-local"
          label="Data e Hora de Término"
          name="endDate"
          value={eventData.endDate}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* 7. Responsabilidades */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        7. Responsabilidades
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={eventData.agreementChecked}
            onChange={(e) =>
              setEventData({ ...eventData, agreementChecked: e.target.checked })
            }
          />
        }
        label="Estou de acordo com os Termos de uso e as Diretrizes da Comunidade."
      />

      {/* 8. Definir Preço do Ingresso */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        8. Definir Preço do Ingresso
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          fullWidth
          label="Preço do Ingresso (R$)"
          name="ticketPrice"
          type="number"
          value={eventData.ticketPrice}
          onChange={handleChange}
          margin="normal"
          required
          inputProps={{ min: 0, step: "0.01" }}
        />
        <TextField
          fullWidth
          label="Taxa do Ingresso (R$)"
          name="ticketTax"
          type="number"
          value={eventData.ticketTax}
          onChange={handleChange}
          margin="normal"
          required
          inputProps={{ min: 0, step: "0.01" }}
        />
      </Box>

      {/* Botões */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="outlined" onClick={() => setPreviewOpen(true)}>
          Pré-visualizar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          Publicar Evento
        </Button>
      </Box>

      {/* MODAL DE PRÉ-VISUALIZAÇÃO */}
      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <Box
          sx={{
            maxWidth: "500px",
            margin: "auto",
            mt: "5%",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            p: 3,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Card>
            {eventData.imagePreview && (
              <CardMedia
                component="img"
                height="200"
                image={eventData.imagePreview}
                alt="Imagem do Evento"
              />
            )}
            <CardContent>
              <Typography variant="h5">
                {eventData.title || "Nome do Evento"}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {eventData.startDate
                  ? `Data de Início: ${new Date(eventData.startDate).toLocaleString()}`
                  : "Data de Início não informada"}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {eventData.endDate
                  ? `Data de Término: ${new Date(eventData.endDate).toLocaleString()}`
                  : "Data de Término não informada"}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Local: {eventData.address || "Local não informado"}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {eventData.description || "Descrição do evento..."}
              </Typography>
              <Typography
                variant="caption"
                color="primary"
                sx={{ mt: 2 }}
                display="block"
              >
                Categoria: {eventData.category}
              </Typography>
              {/* Pré-visualizar Ingresso */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" color="secondary" sx={{ mb: 1 }}>
                  Ingresso Disponível
                </Typography>
                <Typography variant="body1">
                  Tipo: Ingresso
                </Typography>
                <Typography variant="body1">
                  Preço: R$ {parseFloat(eventData.ticketPrice).toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Taxa: R$ {parseFloat(eventData.ticketTax).toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Total: R$ {(parseFloat(eventData.ticketPrice) + parseFloat(eventData.ticketTax)).toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => setPreviewOpen(false)}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ExperienceCreationPage;