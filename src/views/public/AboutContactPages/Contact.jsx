import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Container, Typography } from '@mui/material';

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: (values) => {
      console.log('Form Verileri:', values);
      formik.resetForm();
    },
  });

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          id="message"
          name="message"
          label="Message"
          multiline
          rows={4}
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          margin="normal"
          required
        />
        <Button type="submit"  variant="#2D3250" color="primary" sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Contact;
