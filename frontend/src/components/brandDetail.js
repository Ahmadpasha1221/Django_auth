import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BrandDetail = () => {
    const { brand_id } = useParams();
    const [brand, setBrand] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/Model/${brand_id}/`)
            .then(response => {
                setBrand(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the brand data!", error);
            });
    }, [brand_id]);

    if (!brand) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{brand.brandName}</h1>
            <p>{brand.brandDescription}</p>
            <h3>Models:</h3>
            <ul>
                {brand.models.map(model => (
                    <li key={model.modelName}>
                        <strong>{model.modelName}</strong> - {model.modelDescription}, Price: {model.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BrandDetail;
