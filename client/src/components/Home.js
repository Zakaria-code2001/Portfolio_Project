import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../auth";
import '../styles/main.css';  // Consolidated CSS import
import Slider from "react-slick";

const LoggedInHome = () => (
    <div className="logged-in-container">
        <header className="header">
            <h1 className="heading">Welcome Back to MouZa</h1>
            <p className="subheading">Explore your video playlists and enjoy your favorites.</p>
            <div className="center-button">
                <Link to='/Playlists' className="btn btn-primary btn-lg">View My Playlists</Link>
            </div>
        </header>
        <section className="page-section" id="features">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Features</h2>
                    <h3 className="section-subheading text-muted">Enhance your video experience with our features.</h3>
                </div>
                <div className="row text-center">
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-play fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Create Playlists</h4>
                        <p className="text-muted">Organize your videos into personalized playlists.</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-film fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Manage Videos</h4>
                        <p className="text-muted">Easily add and remove videos from your collection.</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-share-alt fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Share with Friends</h4>
                        <p className="text-muted">Share your favorite playlists with your friends.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
);


const LoggedOutHome = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
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
                <h1 className="heading">Welcome to MouZa</h1>
                <h1 className="heading">Are you ready for a new experience?</h1>
                <br />
                <div className="center-button">
                    <Link to='/login' className="btn btn-primary btn-lg">Get Started</Link>
                </div>
            </header>
            <section className="page-section" id="services">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Features</h2>
                        <h3 className="section-subheading text-muted">Discover what we offer.</h3>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <img src="./styles/images/playlist.png" alt="Playlist Creation" className="fa-stack-1x fa-inverse" />
                            </span>
                            <h4 className="my-3">Playlist Creation</h4>
                            <p className="text-muted">Create and manage your playlists effortlessly.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <img src="./styles/images/clapperboard.png" alt="Video Management" className="fa-stack-1x fa-inverse" />
                            </span>
                            <h4 className="my-3">Video Management</h4>
                            <p className="text-muted">Organize your videos with ease.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <img src="./styles/images/padlock.png" alt="Web Security" className="fa-stack-1x fa-inverse" />
                            </span>
                            <h4 className="my-3">Web Security</h4>
                            <p className="text-muted">Your data is safe with us.</p>
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
                    <Slider {...sliderSettings}>
                        <div className="team-member member1">
                            <div className="member-info text-center">
                                <img className="mx-auto rounded-circle profile-photo" src="https://cdn.pixabay.com/photo/2022/02/27/09/08/music-7036896_1280.jpg" alt="Zakaria Mohammadi" />
                                <h4>Zakaria Mohammadi</h4>
                                <p className="text-muted">Junior Frontend & Backend Developer, DevOps Engineer</p>
                                <p className="text-muted">Zakaria collaborates on both frontend and backend development, ensuring the seamless integration of new features and maintaining the DevOps pipeline.</p>
                            </div>
                        </div>
                        <div className="team-member member2">
                            <div className="member-info text-center">
                                <img className="mx-auto rounded-circle profile-photo" src="https://cdn.pixabay.com/photo/2022/02/27/07/25/jacket-7036779_1280.jpg" alt="Mounim Nadir" />
                                <h4>Mounim Nadir</h4>
                                <p className="text-muted">Junior Frontend & Backend Developer, DevOps Engineer</p>
                                <p className="text-muted">Mounim works alongside Zakaria on frontend and backend tasks, contributing to the development process and enhancing our DevOps practices.</p>
                            </div>
                        </div>
                    </Slider>
                </div>
                </section>
                <section className="section about-us">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-heading text-uppercase">About Us</h2>
                            <h3 className="section-subheading text-muted">Learn more about MouZa and our mission to provide the best video playlist experience.</h3>
                        </div>
                        <div className="about-content">
                            <h4 className="project-name">MOUZA: Explore and Learn with Playlists</h4>
                            <p className="text-muted">MOUZA aims to provide a platform for creating playlists with YouTube videos, enabling users to curate educational content and facilitate learning through organized collections.</p>
                            <p className="text-muted">Our team, consisting of Zakaria Mohammadi and Mounim Nadir, both Junior Frontend & Backend Developers and DevOps Engineers, works collaboratively on all aspects of development. Our decision to use Flask with SQLAlchemy ORM stems from its simplicity and effective handling of project requirements, alongside our team's familiarity with Python.</p>
                            <p className="text-muted">While the project will not address content ownership or copyright issues, it targets educators, students, and lifelong learners looking for an efficient way to organize and share educational videos.</p>
                            <p className="text-muted">Technical risks include integration challenges and data security, which we mitigate through thorough testing and continuous integration. Non-technical risks, such as changes in YouTube's API, are monitored and addressed with continuous platform improvement.</p>
                            <p className="text-muted">Following the GitHub flow, we utilize feature branches for development and automate deployments using CI/CD pipelines, ensuring smooth updates to both staging and production environments. Initial data is populated manually, with ongoing management automated where possible.</p>
                            <p className="text-muted">Despite existing solutions like TED-Ed and Khan Academy, MOUZA focuses on user-generated playlists, offering personalized learning experiences tailored to our target market.</p>
                        </div>
                    </div>
                </section>
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Contact Us</h2>
                        <h3 className="section-subheading text-muted">We'd love to hear from you.</h3>
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
                        <div className="col-lg-4 text-lg-start">Copyright &copy; MouZa 2023</div>
                        <div className="col-lg-4 my-3 my-lg-0">
                            <a className="btn btn-dark btn-social mx-2" href="https://www.youtube.com/watch?v=Wlb1etk-ai0&ab_channel=Cairocoders" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <div className="col-lg-4 text-lg-end">
                            <a className="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
                            <a className="link-dark text-decoration-none" href="#!">Terms of Use</a>
                            <a className="link-dark text-decoration-none" href="#!">Coockie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const HomePage = () => {
    const [logged] = useAuth();
    return (
        <div className="home-page">
            {logged ? <LoggedInHome /> : <LoggedOutHome />}
        </div>
    );
};

export default HomePage;
