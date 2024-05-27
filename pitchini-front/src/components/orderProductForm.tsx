import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface OrderFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  name: string;
  address: string;
  phoneNumber: string;
  city: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    phoneNumber: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", address: "", phoneNumber: "", city: "" });
  };
  const cities = [
    "Tunis",
    "Sfax",
    "Sousse",
    "Kairouan",
    "Bizerte",
    "Gabès",
    "Gafsa",
    "Monastir",
    "Tozeur",
    "Mahdia",
    "Nabeul",
    "Kasserine",
    "Jendouba",
    "Médenine",
    "Béja",
    "Ben Arous",
    "Siliana",
    "Kebili",
    "Tataouine",
    "Kef",
    "Sidi bouZid",
    "Mannouba",
    "Zarzis",
    "Zaghouen",
  ];
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>
        Order Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                id="city-label"
                sx={formData.city !== "" ? { display: "none" } : ""}
              >
                City
              </InputLabel>
              <Select
                labelId="City"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Confirm Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default OrderForm;
