import React,{ useEffect, useState } from 'react'
import axios from 'axios';




const Brands = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/brand')
            .then(response => {
                setBrands(response.data);
            })
            .catch(error => {
                console.error('Error fetching brands:', error);
            });
            
    }, []);
    return (
        <div className="container">
            <div className="row">
                {brands.map((brand) => (
                    <div className="col-md-3" key={brand.brandName}>
                        <div className="card">
                            <img src={brand.brandUrl} className="card-img-top" alt={brand.brandName} />
                            <div className="card-body">
                                <h5 className="card-title">{brand.brandName}</h5>
                                <p className="card-text">{brand.brandDescription}</p>
                                <a href="/" className="btn btn-danger">Know more</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Brands