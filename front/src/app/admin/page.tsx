"use client";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  background: #4caf50;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background: #45a049;
  }
`;

const ProductUpload = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    fullDescription: "",
    price: "",
    stock: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    specifications: [{ materials: "", finishes: "", assembly_type: "" }],
    material: [{ part: "", material: "" }],
    colors: "",
    isFeatured: false,
    categories: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleUpload = async () => {
    if (
      !selectedFiles ||
      !product.name ||
      !product.price ||
      !product.description
    ) {
      setUploadMessage("Completa todos los campos.");
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const imageResponse = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formData,
      });

      const imageData = await imageResponse.json();
      if (!imageData.urls) {
        setUploadMessage("Error al subir imágenes.");
        return;
      }

      const productPayload = {
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock, 10),
        length: parseFloat(product.length),
        width: parseFloat(product.width),
        height: parseFloat(product.height),
        weight: parseFloat(product.weight),
        images: imageData.urls,
        colors: product.colors.split(",").map((color) => color.trim()),
        categories: product.categories
          .split(",")
          .map((category) => category.trim()),
        specifications: product.specifications,
        material: product.material,
        isFeatured: Boolean(product.isFeatured),
      };

      const productResponse = await fetch(
        "http://localhost:3001/api/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productPayload),
        }
      );

      const productData = await productResponse.json();
      setUploadMessage(productData.message || "Producto creado con éxito.");
    } catch (error) {
      setUploadMessage("Error en la creación del producto.");
    }
  };

  return (
    <Container>
      <Title>Crear Producto</Title>
      <Input
        type="text"
        name="name"
        placeholder="Nombre"
        value={product.name}
        onChange={handleChange}
      />
      <TextArea
        name="description"
        placeholder="Descripción breve"
        value={product.description}
        onChange={handleChange}
      />
      <TextArea
        name="fullDescription"
        placeholder="Descripción completa"
        value={product.fullDescription}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="price"
        placeholder="Precio"
        value={product.price}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="stock"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="length"
        placeholder="Largo (cm)"
        value={product.length}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="width"
        placeholder="Ancho (cm)"
        value={product.width}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="height"
        placeholder="Alto (cm)"
        value={product.height}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="weight"
        placeholder="Peso (kg)"
        value={product.weight}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="colors"
        placeholder="Colores (separados por coma)"
        value={product.colors}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="categories"
        placeholder="Categorías (separadas por coma)"
        value={product.categories}
        onChange={handleChange}
      />
      <Input type="file" multiple onChange={handleFileChange} />
      <Button onClick={handleUpload}>Crear Producto</Button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </Container>
  );
};

export default ProductUpload;
