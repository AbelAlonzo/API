import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const descInput = document.getElementById('description');
const imageInput = document.getElementById('image');
const tableBody = document.querySelector('#products-table tbody');
const cancelEditBtn = document.getElementById('cancel-edit');

const imgbbApiKey = '165639e12febc8c67b17dfbd12a8b252';

// Subir imagen a ImgBB y obtener la URL
async function uploadImageToImgBB(file) {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (data.success) {
    return data.data.url;
  } else {
    throw new Error('Error al subir la imagen');
  }
}

// Agregar producto a Firestore
async function addProduct(product) {
  await addDoc(collection(db, 'products'), product);
}

// Renderizar productos en la tabla
function renderProducts(products) {
  tableBody.innerHTML = '';
  products.forEach(product => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${product.name}</td>
      <td>$${Number(product.price).toFixed(2)}</td>
      <td>${product.description}</td>
      <td>${product.imageUrl ? `<img src="${product.imageUrl}" alt="img" style="width:40px;height:40px;object-fit:cover;border-radius:5px;">` : ''}</td>
    `;
    tableBody.appendChild(tr);
  });
}

// Escuchar cambios en Firestore (dinámico)
onSnapshot(collection(db, 'products'), (snapshot) => {
  const products = snapshot.docs.map(doc => doc.data());
  renderProducts(products);
});

// Manejar envío del formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const price = priceInput.value;
  const description = descInput.value.trim();
  const imageFile = imageInput.files[0];
  let imageUrl = '';
  try {
    if (imageFile) {
      imageUrl = await uploadImageToImgBB(imageFile);
    }
    await addProduct({ name, price, description, imageUrl });
    form.reset();
  } catch (err) {
    alert('Error al agregar producto: ' + err.message);
  }
});
