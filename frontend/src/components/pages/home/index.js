import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import List from '../../list';
import './styles.css';
import axios from 'axios';

export const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');

      useEffect(() => {
        axios.get(process.env.ENDPOINT, { params: { offset: '*' } }).then(res => {
            const { data } = res.data;
            setProducts(data);
        });
      }, [])
    
      const handleEdit = (productId) => {
        setProducts(products.map(product => product.id === productId ? {...product, isEditing: true } : product));
      };
    
      const handleDelete = (productId) => {
        axios.delete(`${process.env.ENDPOINT}/${productId}`).then(res => {
            setProducts(products.filter(product => product.id !== productId));
            console.log(`Remover card ${productId}`);
        })
      };

      const handleUpdate = (card, title, description, thumbnail) => {

        const { isEditing, ...rest } = card;

        axios.put(`${process.env.ENDPOINT}/${card.id}`, {
            ...rest,
            name: title,
            description,
            thumbnail
        }).then(res => {
            console.log(thumbnail)
            setProducts(products.map(product => product.id === card.id ? { ...card, name: title, description, thumbnail, isEditing: false } : product));
        })
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            "productName": uuidv4(),
            "product": {
                "name": productName,
                "description": productDescription,
                "thumbnail": productThumbnail
            }
        }
        axios.post(`${process.env.ENDPOINT}/products`, product).then(res => {
            setProducts(prev => ([...prev, res.data]));
        })
      };
      
      return (
        <div className="container">
          <nav>
            <div className='add-product'>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Título' onChange={(e) => setProductName(e.target.value)} />
                    <input type='text' placeholder='Descrição' onChange={(e) => setProductDescription(e.target.value)} />
                    <input type='text' placeholder='URL da imagem' onChange={(e) => setProductThumbnail(e.target.value)} />
                    <button type="submit">Adicionar Produto</button>
                </form>
            </div>
          </nav>
          <div className="cards-holder">
            <List cards={products} onEdit={handleEdit} onDelete={handleDelete} onUpdate={handleUpdate} />
          </div>
        </div>
      );
}