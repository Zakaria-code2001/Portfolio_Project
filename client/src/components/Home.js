import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../auth";
import '../styles/main.css';  // Import the consolidated CSS file
import Slider from "react-slick";

const LoggedInHome = () => {
    return (
        <div className="list">
            <Link to='/Playlists' className="btn btn-primary">Go to Playlists</Link>
        </div>
    )
}

const LoggedOutHome = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="home-container">
            <header className="header">
                <div>
                    <h1 className="heading">Welcome to MouZa</h1>
                    <h1 className="heading">Are you ready for a new experience ?</h1>
                    <div className="center-button">
                        <Link to='/login' className="btn btn-primary btn-lg">Get Started</Link>
                    </div>
                </div>
            </header>
            <section className="page-section" id="services">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Features</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="my-3">Playlist creation</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="my-3">Video management</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <i className="fas fa-lock fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="my-3">Web Security</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="page-section" id="team">
    <div className="container">
        <div className="text-center">
            <h2 className="section-heading text-uppercase">Our Team</h2>
            <h3 className="section-subheading text-muted">Meet our dedicated team members.</h3>
        </div>
        <Slider {...settings}>
            <div className="team-member">
                <div className="member-info text-center">
                    <img className="mx-auto rounded-circle profile-photo" src="top-view-chat-bubbles-with-telephone-receiver-copy-space.jpg" alt="Team Member 1" />
                    <h4>Team Member 1</h4>
                    <p className="text-muted">Position</p>
                    <p className="text-muted">Description of Team Member 1.</p>
                </div>
            </div>
            <div className="team-member">
                <div className="member-info text-center">
                    <img className="mx-auto rounded-circle profile-photo" src="top-view-chat-bubbles-with-telephone-receiver-copy-space.jpg" alt="Team Member 2" />
                    <h4>Team Member 2</h4>
                    <p className="text-muted">Position</p>
                    <p className="text-muted">Description of Team Member 2.</p>
                </div>
            </div>
        </Slider>
    </div>
</section>

            <section className="section about-us">
                <h2>About Us</h2>
                <p>Learn more about MouZa and our mission to provide the best music experience.</p>
            </section>
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Contact Us</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                    <form id="contactForm" data-sb-form-api-token="API_TOKEN" className="contact-form">
                        <div className="row align-items-stretch">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input className="form-control" id="name" type="text" placeholder="Your Name *" data-sb-validations="required" />
                                    <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" id="email" type="email" placeholder="Your Email *" data-sb-validations="required,email" />
                                    <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                    <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" id="phone" type="tel" placeholder="Your Phone *" data-sb-validations="required" />
                                    <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group form-group-textarea">
                                    <textarea className="form-control" id="message" placeholder="Your Message *" data-sb-validations="required"></textarea>
                                    <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                                </div>
                            </div>
                            <div className="col-12 text-center">
                                <button className="btn btn-primary btn-xl text-uppercase" id="submitButton" type="submit">Send Message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <footer className="footer py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 text-lg-start">Copyright &copy; Your Website 2023</div>
                        <div className="col-lg-4 my-3 my-lg-0">
                            <a className="btn btn-dark btn-social mx-2" href="https://www.youtube.com/watch?v=Wlb1etk-ai0&ab_channel=Cairocoders" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <div className="col-lg-4 text-lg-end">
                            <a className="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
                            <a className="link-dark text-decoration-none" href="#!">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

const HomePage = () => {
    const [logged] = useAuth();
    return (
        <div className="home-page">
            {logged ? <LoggedInHome /> : <LoggedOutHome />}
        </div>
    )
}

export default HomePage;
