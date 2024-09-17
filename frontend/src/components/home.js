import React from 'react';
import Koenigsegg from '../images/Koenigsegg-CC850.jpg';
import BMW from '../images/BMW m2.jpg';
import Lamborghini from '../images/Lamborghini-Invencible.jpg';
import "./home.css";

const Home = () => {
    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={Koenigsegg} className="d-block w-100" style={{height:1000}} alt="..." />
                    <div class="carousel-caption d-none d-md-block">
        <h5>Koenigsegg</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
                </div>
                <div className="carousel-item">
                    <img src={BMW} className="d-block w-100" style={{height:1000}}  alt="..." />
                    <div class="carousel-caption d-none d-md-block">
        <h5>BMW</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
                </div>
                <div className="carousel-item">
                    <img src={Lamborghini} className="d-block w-100" style={{height:1000}}  alt="..." />
                    <div class="carousel-caption d-none d-md-block">
        <h5>Lamborghini</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
                </div>
            </div>
        </div>
        
    );
};

export default Home;
