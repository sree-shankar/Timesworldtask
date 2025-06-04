import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCountries,
    filterByRegion,
    loadMore,
} from "../Slices/CountriesSlice";
import { Button, Container, Row, Col, Carousel } from "react-bootstrap";
import "./homePage.css";

const Home = () => {
    const dispatch = useDispatch();
    const { filtered, region, visibleCount, loading } = useSelector(
        (state) => state.countries
    );

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Container className="home-container py-4">
            <div className="top-header d-flex justify-content-between align-items-center">
                <h4 className="section-title mb-0">Countries</h4>

         
                <div
                    className="hamburger d-md-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i
                        className="bi bi-list"
                        style={{ fontSize: "1.5rem", cursor: "pointer" }}
                    ></i>
                </div>

              
                <div className={`region-tabs ${menuOpen ? "show" : ""}`}>
                    {["All", "Asia", "Europe"].map((r) => (
                        <button
                            key={r}
                            className={r === region ? "active" : ""}
                            onClick={() => {
                                dispatch(filterByRegion(r));
                                setMenuOpen(false);
                            }}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="spinner-container text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="text-center mb-4 welcome-title">WELCOME</h2>

                    <Row className="mb-4">
                        <Col md={8} className="mb-3">
                       
                            <Carousel indicators controls>
                                {filtered.slice(0, 5).map((country, idx) => (
                                    <Carousel.Item key={idx}>
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{ height: "300px" }}
                                        >
                                            <img
                                                src={country.flag}
                                                alt={country.name}
                                                className="d-block"
                                                style={{
                                                    maxHeight: "100%",
                                                    maxWidth: "100%",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </div>
                                        <Carousel.Caption>
                                            <h5>{country.name}</h5>
                                            <p>{country.region}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Carousel indicators controls>
                                {filtered.slice(6, 10).map((country, idx) => (
                                    <Carousel.Item key={idx}>
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{ height: "300px" }}
                                        >
                                            <img
                                                src={country.flag}
                                                alt={country.name}
                                                className="d-block"
                                                style={{
                                                    maxHeight: "100%",
                                                    maxWidth: "100%",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </div>
                                        <Carousel.Caption>
                                            <h5>{country.name}</h5>
                                            <p>{country.region}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                    </Row>

                    <Row className="g-3">
                        {filtered.slice(0, visibleCount).map((country, i) => (
                            <Col xs={12} md={6} key={i}>
                                <div className="country-card">
                                    <img
                                        src={country.flag}
                                        alt={country.name}
                                        className="flag-img"
                                    />
                                    <div>
                                        <strong>{country.name}</strong>
                                        <br />
                                        <span>{country.region}</span>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    {visibleCount < filtered.length && (
                        <div className="text-center mt-4">
                            <Button
                                onClick={() => dispatch(loadMore())}
                                className="load-more-btn"
                            >
                                Load more
                            </Button>
                        </div>
                    )}
                </>
            )}

            <footer className="footer-section mt-5 text-center">
                <div className="social-icons mb-3">
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-twitter"></i>
                    <i className="bi bi-linkedin"></i>
                    <i className="bi bi-youtube"></i>
                </div>
                <div className="footer-text">
                    <div>Example@email.com</div>
                    <p>Copyright © 2020 Name. All rights reserved.</p>
                </div>
            </footer>
        </Container>
    );
};

export default Home;
