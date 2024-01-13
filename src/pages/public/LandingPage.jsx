import React, { useEffect, useState } from 'react'
import ClientSlider from '../../components/ClientSlider';
import { Link } from 'react-router-dom';
import img1 from '../../assets/images/landingCrousel/img1.jpg'
import img2 from '../../assets/images/landingCrousel/img2.jpg'
import img3 from '../../assets/images/landingCrousel/img3.jpg'

function LandingPage() {
  const crouseImages = [
    img1,
    img2,
    img3,
  ]
  const [sliderPerPage,setSliderPerPage] = useState(3);
  const screenSize = s => {
    let sizes = { sm:768, md:992, lg:1200 }
    return s>=sizes.md?'lg':(s<sizes.sm ?'sm':'md');
  }  
  const setSliderPerView = () => {
    const s = screenSize(window.innerWidth);
      setSliderPerPage(s=='sm'?1:(s=='md'?3:4));
  }
  useEffect(()=>{
    window.addEventListener('scroll', e =>{
        e.preventDefault();
        var e = document.getElementById("navbar");
        e &&  (50 <= document.body.scrollTop || 50 <= document.documentElement.scrollTop ? e.classList.add("is-sticky"): e.classList.remove("is-sticky")
      );
    });
    window.addEventListener('resize',function(){
      setSliderPerView()
    });
    setSliderPerView();
  },[]);
  return (
    <div className="layout-wrapper landing">
        <nav className="navbar navbar-expand-lg navbar-landing fixed-top" id="navbar">
            <div className="container">
                <a className="navbar-brand" href="index.html">
                    <img src="assets/images/logo-dark.png" className="card-logo card-logo-dark" alt="logo dark" height="17" />
                    <img src="assets/images/logo-light.png" className="card-logo card-logo-light" alt="logo light" height="17" />
                </a>
                <button className="navbar-toggler py-0 fs-20 text-body" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="mdi mdi-menu"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mt-2 mt-lg-0" id="navbar-example">
                        <li className="nav-item">
                            <a className="nav-link active" href="#hero">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#services">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#features">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#plans">Plans</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#reviews">Reviews</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#team">Team</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>

                    <div className="">
                        <Link to="/login" className="btn btn-primary">Log In</Link>
                    </div>
                </div>

            </div>
        </nav>
       
        <div className="vertical-overlay" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent.show"></div>

        <section className="section pb-0 hero-section" id="hero">
            <div className="bg-overlay bg-overlay-pattern"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-sm-10">
                        <div className="text-center mt-lg-5 pt-5">
                            <h1 className="display-6 fw-semibold mb-3 lh-base">Skills That Propel, Education That Inspires: <span className="text-success">SK Group of Institutions </span></h1>
                            <div className="d-flex gap-2 justify-content-center mt-4">
                                <Link to="/login" className="btn btn-primary">Login <i className="ri-arrow-right-line align-middle ms-1"></i></Link>
                                <Link to="/" className="btn btn-danger">Send Enquiry <i className="ri-eye-line align-middle ms-1"></i></Link>
                            </div>
                        </div>

                        <div className="mt-4 mt-sm-5 pt-sm-5 mb-sm-n5 demo-carousel">
                            <div className="demo-img-patten-top d-none d-sm-block">
                                <img src="assets/images/landing/img-pattern.png" className="d-block img-fluid" alt="..." />
                            </div>
                            <div className="demo-img-patten-bottom d-none d-sm-block">
                                <img src="assets/images/landing/img-pattern.png" className="d-block img-fluid" alt="..." />
                            </div>
                            <div className="carousel slide carousel-fade" data-bs-ride="carousel">
                                <div className="carousel-inner shadow-lg p-2 bg-white rounded">
                                    {crouseImages.map((img,id)=>(
                                      <div className="carousel-item active" key={id} data-bs-interval="2000">
                                          <img src={img} className="d-block w-100" alt="..." style={{aspectRatio:'4/3',objectFit:'cover'}} />
                                      </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
            
            <div className="position-absolute start-0 end-0 bottom-0 hero-shape-svg">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1440 120">
                    <g mask="url(&quot;#SvgjsMask1003&quot;)" fill="none">
                        <path d="M 0,118 C 288,98.6 1152,40.4 1440,21L1440 140L0 140z">
                        </path>
                    </g>
                </svg>
            </div>
            
        </section>
        

        
        <div className="pt-5 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="text-center mt-5">
                            <h5 className="fs-20">Trusted <span className="text-primary text-decoration-underline">by</span> the world's best</h5>
                            <div className="mt-sm-5 mt-4 mb-sm-5 mb-4">
                              <ClientSlider sliderPerPage={sliderPerPage} />
                            </div>
                        </div>

                    </div>
                </div>
                
            </div>
            
        </div>
        

        
        <section className="section" id="services">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-5">
                            <h1 className="mb-3 ff-secondary fw-semibold lh-base">A Digital web design studio creating modern & engaging online</h1>
                            <p className="text-muted">To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce the grammar</p>
                        </div>
                    </div>
                    
                </div>
                

                <div className="row g-3">
                    <div className="col-lg-4">
                        <div className="d-flex p-3">
                            <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm icon-effect">
                                    <div className="avatar-title bg-transparent text-success rounded-circle">
                                        <i className="ri-pencil-ruler-2-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="fs-18">Creative Design</h5>
                                <p className="text-muted my-3 ff-secondary">The creative design includes designs that are unique, effective and memorable.</p>
                                <div>
                                    <a href="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="d-flex p-3">
                            <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm icon-effect">
                                    <div className="avatar-title bg-transparent text-success rounded-circle">
                                        <i className="ri-palette-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="fs-18">Unlimited Colors</h5>
                                <p className="text-muted my-3 ff-secondary">The collection of rules and guidelines which designers use to communicate with users through appealing.</p>
                                <div>
                                    <a href="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="d-flex p-3">
                            <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm icon-effect">
                                    <div className="avatar-title bg-transparent text-success rounded-circle">
                                        <i className="ri-lightbulb-flash-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="fs-18">Strategy Solutions</h5>
                                <p className="text-muted my-3 ff-secondary">Business development firm that provides strategic planning, market research services and project.</p>
                                <div>
                                    <a href="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="d-flex p-3">
                            <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm icon-effect">
                                    <div className="avatar-title bg-transparent text-success rounded-circle">
                                        <i className="ri-customer-service-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="fs-18">Awesome Support</h5>
                                <p className="text-muted my-3 ff-secondary">Awesome Support is the most versatile and feature-rich support plugin for all version.</p>
                                <div>
                                    <a href="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="d-flex p-3">
                            <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm icon-effect">
                                    <div className="avatar-title bg-transparent text-success rounded-circle">
                                        <i className="ri-stack-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="fs-18">Truly Multipurpose</h5>
                                <p className="text-muted my-3 ff-secondary">You usually get a broad range of options to play with. This enables you to use a single theme across multiple.</p>
                                <div>
                                    <a href="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="d-flex p-3">
                            <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm icon-effect">
                                    <div className="avatar-title bg-transparent text-success rounded-circle">
                                        <i className="ri-settings-2-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="fs-18">Easy to customize</h5>
                                <p className="text-muted my-3 ff-secondary">Personalise your own website, no matter what theme and what customization options.</p>
                                <div>
                                    <a href="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    <div className="col-lg-4">
                        <div className="d-flex p-3">
                            <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm icon-effect">
                                    <div className="avatar-title bg-transparent text-success rounded-circle">
                                        <i className="ri-slideshow-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="fs-18">Responsive & Clean Design</h5>
                                <p className="text-muted my-3 ff-secondary">Responsive design is a graphic user interface (GUI) design approach used to create content.</p>
                                <div>
                                    <a href="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="d-flex p-3">
                            <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm icon-effect">
                                    <div className="avatar-title bg-transparent text-success rounded-circle">
                                        <i className="ri-google-fill fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="fs-18">Google Font Collection</h5>
                                <p className="text-muted my-3 ff-secondary">Google Fonts is a collection of 915 fonts, all available to use for free on your website.</p>
                                <div>
                                    <a href="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="d-flex p-3">
                            <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm icon-effect">
                                    <div className="avatar-title bg-transparent text-success rounded-circle">
                                        <i className="ri-briefcase-5-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="fs-18">Top Industry Specialists</h5>
                                <p className="text-muted my-3 ff-secondary">An industrial specialist works with industrial operations to ensure that manufacturing facilities work.</p>
                                <div>
                                    <a href="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        

        
        <section className="section bg-light py-5" id="features">
            <div className="container">
                <div className="row align-items-center gy-4">
                    <div className="col-lg-6 col-sm-7 mx-auto">
                        <div>
                            <img src="assets/images/landing/features/img-1.png" alt="" className="img-fluid mx-auto" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="text-muted">
                            <div className="avatar-sm icon-effect mb-4">
                                <div className="avatar-title bg-transparent rounded-circle text-success h1">
                                    <i className="ri-collage-line fs-36"></i>
                                </div>
                            </div>
                            <h3 className="mb-3 fs-20">Huge collection of widgets</h3>
                            <p className="mb-4 ff-secondary fs-16">Collection widgets specialize in displaying many elements of the same type, such as a collection of pictures from a collection of articles from a news app or a collection of messages from a communication app.</p>

                            <div className="row pt-3">
                                <div className="col-3">
                                    <div className="text-center">
                                        <h4>5</h4>
                                        <p>Dashboards</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="text-center">
                                        <h4>150+</h4>
                                        <p>Pages</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="text-center">
                                        <h4>7+</h4>
                                        <p>Functional Apps</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        

        
        <section className="py-5 bg-primary position-relative">
            <div className="bg-overlay bg-overlay-pattern opacity-50"></div>
            <div className="container">
                <div className="row align-items-center gy-4">
                    <div className="col-sm">
                        <div>
                            <h4 className="text-white mb-0 fw-semibold">Build your web App/SaaS with Velzon dashboard</h4>
                        </div>
                    </div>
                    
                    <div className="col-sm-auto">
                        <div>
                            <a href="https://1.envato.market/velzon-admin" target="_blank" className="btn bg-gradient btn-danger"><i className="ri-shopping-cart-2-line align-middle me-1"></i> Buy Now</a>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        

        
        <section className="section">
            <div className="container">
                <div className="row align-items-center gy-4">
                    <div className="col-lg-6 order-2 order-lg-1">
                        <div className="text-muted">
                            <h5 className="fs-12 text-uppercase text-success">Design</h5>
                            <h4 className="mb-3">Well Designed Dashboards</h4>
                            <p className="mb-4 ff-secondary">Quality Dashboards (QD) is a condition-specific, actionable web-based application for quality reporting and population management that is integrated into the Electronic Health Record (EHR).</p>

                            <div className="row">
                                <div className="col-sm-5">
                                    <div className="vstack gap-2">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 me-2">
                                                <div className="avatar-xs icon-effect">
                                                    <div className="avatar-title bg-transparent text-success rounded-circle h2">
                                                        <i className="ri-check-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-14 mb-0">Ecommerce</h5>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 me-2">
                                                <div className="avatar-xs icon-effect">
                                                    <div className="avatar-title bg-transparent text-success rounded-circle h2">
                                                        <i className="ri-check-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-14 mb-0">Analytics</h5>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 me-2">
                                                <div className="avatar-xs icon-effect">
                                                    <div className="avatar-title bg-transparent text-success rounded-circle h2">
                                                        <i className="ri-check-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-14 mb-0">CRM</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-5">
                                    <div className="vstack gap-2">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 me-2">
                                                <div className="avatar-xs icon-effect">
                                                    <div className="avatar-title bg-transparent text-success rounded-circle h2">
                                                        <i className="ri-check-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-14 mb-0">Crypto</h5>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 me-2">
                                                <div className="avatar-xs icon-effect">
                                                    <div className="avatar-title bg-transparent text-success rounded-circle h2">
                                                        <i className="ri-check-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-14 mb-0">Projects</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <a href="index.html" className="btn btn-primary">Learn More <i className="ri-arrow-right-line align-middle ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6 col-sm-7 col-10 ms-auto order-1 order-lg-2">
                        <div>
                            <img src="assets/images/landing/features/img-2.png" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
                

                <div className="row align-items-center mt-5 pt-lg-5 gy-4">
                    <div className="col-lg-6 col-sm-7 col-10 mx-auto">
                        <div>
                            <img src="assets/images/landing/features/img-3.png" alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="text-muted ps-lg-5">
                            <h5 className="fs-12 text-uppercase text-success">structure</h5>
                            <h4 className="mb-3">Well Documented</h4>
                            <p className="mb-4">used to describe something that is known about or known to be true because there are many documents that describe it, prove it, etc.</p>

                            <div className="vstack gap-2">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 me-2">
                                        <div className="avatar-xs icon-effect">
                                            <div className="avatar-title bg-transparent text-success rounded-circle h2">
                                                <i className="ri-check-fill"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0">Dynamic Conetnt</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 me-2">
                                        <div className="avatar-xs icon-effect">
                                            <div className="avatar-title bg-transparent text-success rounded-circle h2">
                                                <i className="ri-check-fill"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0">Setup plugin's information.</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 me-2">
                                        <div className="avatar-xs icon-effect">
                                            <div className="avatar-title bg-transparent text-success rounded-circle h2">
                                                <i className="ri-check-fill"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0">Themes customization information</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        

        
        <section className="section bg-light" id="plans">
            <div className="bg-overlay bg-overlay-pattern"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-5">
                            <h3 className="mb-3 fw-semibold">Choose the plan that's right for you</h3>
                            <p className="text-muted mb-4">Simple pricing. No hidden fees. Advanced features for you business.</p>

                            <div className="d-flex justify-content-center align-items-center">
                                <div>
                                    <h5 className="fs-14 mb-0">Month</h5>
                                </div>
                                <div className="form-check form-switch fs-20 ms-3 " onClick={()=>{}}>
                                    <input className="form-check-input" type="checkbox" id="plan-switch" />
                                    <label className="form-check-label" htmlFor="plan-switch"></label>
                                </div>
                                <div>
                                    <h5 className="fs-14 mb-0">Annual <span className="badge badge-soft-success">Save 20%</span></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                

                <div className="row gy-4">
                    <div className="col-lg-4">
                        <div className="card plan-box mb-0">
                            <div className="card-body p-4 m-2">
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1 fw-semibold">Basic Plan</h5>
                                        <p className="text-muted mb-0">For Startup</p>
                                    </div>
                                    <div className="avatar-sm">
                                        <div className="avatar-title bg-light rounded-circle text-primary">
                                            <i className="ri-book-mark-line fs-20"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-4 text-center">
                                    <h1 className="month"><sup><small>$</small></sup><span className="ff-secondary fw-bold">19</span> <span className="fs-13 text-muted">/Month</span></h1>
                                    <h1 className="annual"><sup><small>$</small></sup><span className="ff-secondary fw-bold">171</span> <span className="fs-13 text-muted">/Year</span></h1>
                                </div>

                                <div>
                                    <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    Upto <b>3</b> Projects
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    Upto <b>299</b> Customers
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    Scalable Bandwidth
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <b>5</b> FTP Login
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-danger me-1">
                                                    <i className="ri-close-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <b>24/7</b> Support
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-danger me-1">
                                                    <i className="ri-close-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <b>Unlimited</b> Storage
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-danger me-1">
                                                    <i className="ri-close-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    Domain
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="mt-4">
                                        <a href="#" className="btn btn-soft-success w-100">Get Started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="card plan-box mb-0 ribbon-box right">
                            <div className="card-body p-4 m-2">
                                <div className="ribbon-two ribbon-two-danger"><span>Popular</span></div>
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1 fw-semibold">Pro Business</h5>
                                        <p className="text-muted mb-0">Professional plans</p>
                                    </div>
                                    <div className="avatar-sm">
                                        <div className="avatar-title bg-light rounded-circle text-primary">
                                            <i className="ri-medal-fill fs-20"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-4 text-center">
                                    <h1 className="month"><sup><small>$</small></sup><span className="ff-secondary fw-bold">29</span> <span className="fs-13 text-muted">/Month</span></h1>
                                    <h1 className="annual"><sup><small>$</small></sup><span className="ff-secondary fw-bold">261</span> <span className="fs-13 text-muted">/Year</span></h1>
                                </div>

                                <div>
                                    <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    Upto <b>15</b> Projects
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <b>Unlimited</b> Customers
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    Scalable Bandwidth
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <b>12</b> FTP Login
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <b>24/7</b> Support
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-danger me-1">
                                                    <i className="ri-close-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <b>Unlimited</b> Storage
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-danger me-1">
                                                    <i className="ri-close-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    Domain
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="mt-4">
                                        <a href="#" className="btn btn-soft-success w-100">Get Started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="card plan-box mb-0">
                            <div className="card-body p-4 m-2">
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1 fw-semibold">Platinum Plan</h5>
                                        <p className="text-muted mb-0">Enterprise Businesses</p>
                                    </div>
                                    <div className="avatar-sm">
                                        <div className="avatar-title bg-light rounded-circle text-primary">
                                            <i className="ri-stack-fill fs-20"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-4 text-center">
                                    <h1 className="month"><sup><small>$</small></sup><span className="ff-secondary fw-bold">39</span> <span className="fs-13 text-muted">/Month</span></h1>
                                    <h1 className="annual"><sup><small>$</small></sup><span className="ff-secondary fw-bold">351</span> <span className="fs-13 text-muted">/Year</span></h1>
                                </div>

                                <div>
                                    <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <b>Unlimited</b> Projects
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <b>Unlimited</b> Customers
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    Scalable Bandwidth
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <b>Unlimited</b> FTP Login
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <b>24/7</b> Support
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <b>Unlimited</b> Storage
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 text-success me-1">
                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    Domain
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="mt-4">
                                        <a href="#" className="btn btn-soft-success w-100">Get Started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        

        
        <section className="section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-5">
                            <h3 className="mb-3 fw-semibold">Frequently Asked Questions</h3>
                            <p className="text-muted mb-4 ff-secondary">If you can not find answer to your question in our FAQ, you can always contact us or email us. We will answer you shortly!</p>

                            <div className="hstack gap-2 justify-content-center">
                                <button type="button" className="btn btn-primary btn-label rounded-pill"><i className="ri-mail-line label-icon align-middle rounded-pill fs-16 me-2"></i> Email Us</button>
                                <button type="button" className="btn btn-info btn-label rounded-pill"><i className="ri-twitter-line label-icon align-middle rounded-pill fs-16 me-2"></i> Send Us Tweet</button>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div className="row g-lg-5 g-4">
                    <div className="col-lg-6">
                        <div className="d-flex align-items-center mb-2">
                            <div className="flex-shrink-0 me-1">
                                <i className="ri-question-line fs-24 align-middle text-success me-1"></i>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="mb-0 fw-semibold">General Questions</h5>
                            </div>
                        </div>
                        <div className="accordion custom-accordionwithicon custom-accordion-border accordion-border-box" id="genques-accordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="genques-headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseOne" aria-expanded="true" aria-controls="genques-collapseOne">
                                        What is the purpose of using themes ?
                                    </button>
                                </h2>
                                <div id="genques-collapseOne" className="accordion-collapse collapse show" aria-labelledby="genques-headingOne" data-bs-parent="#genques-accordion">
                                    <div className="accordion-body ff-secondary">
                                        A theme is a set of colors, fonts, effects, and more that can be applied to your entire presentation to give it a
                                        consistent, professional look. You've already been using a theme, even if you didn't know it: the default Office theme, which consists.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="genques-headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseTwo" aria-expanded="false" aria-controls="genques-collapseTwo">
                                        Can a theme have more than one theme?
                                    </button>
                                </h2>
                                <div id="genques-collapseTwo" className="accordion-collapse collapse" aria-labelledby="genques-headingTwo" data-bs-parent="#genques-accordion">
                                    <div className="accordion-body ff-secondary">
                                        A story can have as many themes as the reader can identify based on recurring patterns and parallels within the story
                                        itself. In looking at ways to separate themes into a hierarchy, we might find it useful to follow the example of a single book.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="genques-headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseThree" aria-expanded="false" aria-controls="genques-collapseThree">
                                        What are theme features?
                                    </button>
                                </h2>
                                <div id="genques-collapseThree" className="accordion-collapse collapse" aria-labelledby="genques-headingThree" data-bs-parent="#genques-accordion">
                                    <div className="accordion-body ff-secondary">
                                        Theme features is a set of specific functionality that may be enabled by theme authors. Themes must register each
                                        individual Theme Feature that the author wishes to support. Theme support functions should be called in the theme's functions.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="genques-headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseFour" aria-expanded="false" aria-controls="genques-collapseFour">
                                        What is simple theme?
                                    </button>
                                </h2>
                                <div id="genques-collapseFour" className="accordion-collapse collapse" aria-labelledby="genques-headingFour" data-bs-parent="#genques-accordion">
                                    <div className="accordion-body ff-secondary">
                                        Simple is a free WordPress theme, by Themify, built exactly what it is named for: simplicity. Immediately upgrade the
                                        quality of your WordPress site with the simple theme To use the built-in Chrome theme editor.
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                    
                    <div className="col-lg-6">
                        <div className="d-flex align-items-center mb-2">
                            <div className="flex-shrink-0 me-1">
                                <i className="ri-shield-keyhole-line fs-24 align-middle text-success me-1"></i>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="mb-0 fw-semibold">Privacy &amp; Security</h5>
                            </div>
                        </div>

                        <div className="accordion custom-accordionwithicon custom-accordion-border accordion-border-box" id="privacy-accordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="privacy-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacy-collapseOne" aria-expanded="false" aria-controls="privacy-collapseOne">
                                        Does Word have night mode?
                                    </button>
                                </h2>
                                <div id="privacy-collapseOne" className="accordion-collapse collapse" aria-labelledby="privacy-headingOne" data-bs-parent="#privacy-accordion">
                                    <div className="accordion-body ff-secondary">
                                        You can run Microsoft Word in dark mode, which uses a dark color palette to help reduce eye strain in low light
                                        settings. You can choose to make the document white or black using the Switch Modes button in the ribbon's View tab.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="privacy-headingTwo">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#privacy-collapseTwo" aria-expanded="true" aria-controls="privacy-collapseTwo">
                                        Is theme an opinion?
                                    </button>
                                </h2>
                                <div id="privacy-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="privacy-headingTwo" data-bs-parent="#privacy-accordion">
                                    <div className="accordion-body ff-secondary">
                                        A theme is an opinion the author expresses on the subject, for instance, the author's dissatisfaction with the narrow
                                        confines of French bourgeois marriage during that period theme is an idea that a writer repeats.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="privacy-headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacy-collapseThree" aria-expanded="false" aria-controls="privacy-collapseThree">
                                        How do you develop a theme?
                                    </button>
                                </h2>
                                <div id="privacy-collapseThree" className="accordion-collapse collapse" aria-labelledby="privacy-headingThree" data-bs-parent="#privacy-accordion">
                                    <div className="accordion-body ff-secondary">
                                        A short story, novella, or novel presents a narrative to its reader. Perhaps that narrative involves mystery, terror,
                                        romance, comedy, or all of the above. These works of fiction may also contain memorable characters, vivid
                                        world-building, literary devices.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="privacy-headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacy-collapseFour" aria-expanded="false" aria-controls="privacy-collapseFour">
                                        Do stories need themes?
                                    </button>
                                </h2>
                                <div id="privacy-collapseFour" className="accordion-collapse collapse" aria-labelledby="privacy-headingFour" data-bs-parent="#privacy-accordion">
                                    <div className="accordion-body ff-secondary">
                                        A story can have as many themes as the reader can identify based on recurring patterns and parallels within the story
                                        itself. In looking at ways to separate themes into a hierarchy, we might find it useful to follow the example of a
                                        single book.
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        

        
        <section className="section bg-primary" id="reviews">
            <div className="bg-overlay bg-overlay-pattern"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="text-center">
                            <div>
                                <i className="ri-double-quotes-l text-success display-3"></i>
                            </div>
                            <h4 className="text-white mb-5"><span className="text-success">19k</span>+ Satisfied clients</h4>

                            
                            <div className="swiper client-review-swiper rounded" dir="ltr">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="row justify-content-center">
                                            <div className="col-10">
                                                <div className="text-white-50">
                                                    <p className="fs-20 ff-secondary mb-4">" I am givng 5 stars. Theme is great and everyone one stuff everything in theme. Future request should not affect current state of theme. "</p>

                                                    <div>
                                                        <h5 className="text-white">gregoriusus</h5>
                                                        <p>- Skote User</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="swiper-slide">
                                        <div className="row justify-content-center">
                                            <div className="col-10">
                                                <div className="text-white-50">
                                                    <p className="fs-20 ff-secondary mb-4">" Awesome support. Had few issues while setting up because of my device, the support team helped me fix them up in a day. Everything looks clean and good. Highly recommended! "</p>

                                                    <div>
                                                        <h5 className="text-white">GeekyGreenOwl</h5>
                                                        <p>- Skote User</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="swiper-slide">
                                        <div className="row justify-content-center">
                                            <div className="col-10">
                                                <div className="text-white-50">
                                                    <p className="fs-20 ff-secondary mb-4">" Amazing template, Redux store and components is nicely designed. It's a great start point for an admin based project. Clean Code and good documentation. Template is completely in React and absolutely no usage of jQuery "</p>

                                                    <div>
                                                        <h5 className="text-white">sreeks456</h5>
                                                        <p>- Veltrix User</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="swiper-button-next bg-white rounded-circle"></div>
                                <div className="swiper-button-prev bg-white rounded-circle"></div>
                                <div className="swiper-pagination position-relative mt-2"></div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        

        
        <section className="py-5 position-relative bg-light">
            <div className="container">
                <div className="row text-center gy-4">
                    <div className="col-lg-3 col-6">
                        <div>
                            <h2 className="mb-2"><span className="counter-value" data-target="100">0</span>+</h2>
                            <div className="text-muted">Projects Completed</div>
                        </div>
                    </div>
                    

                    <div className="col-lg-3 col-6">
                        <div>
                            <h2 className="mb-2"><span className="counter-value" data-target="24">0</span></h2>
                            <div className="text-muted">Win Awards</div>
                        </div>
                    </div>
                    

                    <div className="col-lg-3 col-6">
                        <div>
                            <h2 className="mb-2"><span className="counter-value" data-target="20.3">0</span>k</h2>
                            <div className="text-muted">Satisfied Clients</div>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-6">
                        <div>
                            <h2 className="mb-2"><span className="counter-value" data-target="50">0</span></h2>
                            <div className="text-muted">Employees</div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        

        
        <section className="section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-5">
                            <h3 className="mb-3 fw-semibold">Our Work Process</h3>
                            <p className="text-muted mb-4 ff-secondary">In an ideal world this website wouldn’t exist, a client would acknowledge the importance of having web copy before the Proin vitae ipsum vel ex finibus semper design starts.</p>
                        </div>
                    </div>
                </div>
                

                <div className="row text-center">
                    <div className="col-lg-4">
                        <div className="process-card mt-4">
                            <div className="process-arrow-img d-none d-lg-block">
                                <img src="assets/images/landing/process-arrow-img.png" alt="" className="img-fluid" />
                            </div>
                            <div className="avatar-sm icon-effect mx-auto mb-4">
                                <div className="avatar-title bg-transparent text-success rounded-circle h1">
                                    <i className="ri-quill-pen-line"></i>
                                </div>
                            </div>

                            <h5>Tell us what you need</h5>
                            <p className="text-muted ff-secondary">The profession and the employer and your desire to make your mark.</p>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="process-card mt-4">
                            <div className="process-arrow-img d-none d-lg-block">
                                <img src="assets/images/landing/process-arrow-img.png" alt="" className="img-fluid" />
                            </div>
                            <div className="avatar-sm icon-effect mx-auto mb-4">
                                <div className="avatar-title bg-transparent text-success rounded-circle h1">
                                    <i className="ri-user-follow-line"></i>
                                </div>
                            </div>

                            <h5>Get free quotes</h5>
                            <p className="text-muted ff-secondary">The most important aspect of beauty was, therefore, an inherent part.</p>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="process-card mt-4">
                            <div className="avatar-sm icon-effect mx-auto mb-4">
                                <div className="avatar-title bg-transparent text-success rounded-circle h1">
                                    <i className="ri-book-mark-line"></i>
                                </div>
                            </div>

                            <h5>Deliver high quality product</h5>
                            <p className="text-muted ff-secondary">We quickly learn to fear and thus automatically avoid potentially.</p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        

        
        <section className="section bg-light" id="team">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-5">
                            <h3 className="mb-3 fw-semibold">Our <span className="text-danger">Team</span></h3>
                            <p className="text-muted mb-4 ff-secondary">To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce the grammar.</p>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <div className="card">
                            <div className="card-body text-center p-4">
                                <div className="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="assets/images/users/avatar-2.jpg" alt="" className="img-fluid rounded-circle" />
                                    <a href="apps-mailbox.html" className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div className="avatar-title bg-transparent">
                                            <i className="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </a>
                                </div>
                                
                                <h5 className="mb-1"><a href="pages-profile.html" className="text-body">Nancy Martino</a></h5>
                                <p className="text-muted mb-0 ff-secondary">Team Leader</p>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="col-lg-3 col-sm-6">
                        <div className="card">
                            <div className="card-body text-center p-4">
                                <div className="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="assets/images/users/avatar-10.jpg" alt="" className="img-fluid rounded-circle"/>
                                    <a href="apps-mailbox.html" className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div className="avatar-title bg-transparent">
                                            <i className="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </a>
                                </div>
                                
                                <h5 className="mb-1"><a href="pages-profile.html" className="text-body">Henry Baird</a></h5>
                                <p className="text-muted mb-0 ff-secondary">Full Stack Developer</p>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="col-lg-3 col-sm-6">
                        <div className="card">
                            <div className="card-body text-center p-4">
                                <div className="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="assets/images/users/avatar-3.jpg" alt="" className="img-fluid rounded-circle" />
                                    <a href="apps-mailbox.html" className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div className="avatar-title bg-transparent">
                                            <i className="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </a>
                                </div>
                                
                                <h5 className="mb-1"><a href="pages-profile.html" className="text-body">Frank Hook</a></h5>
                                <p className="text-muted mb-0 ff-secondary">Project Manager</p>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="col-lg-3 col-sm-6">
                        <div className="card">
                            <div className="card-body text-center p-4">
                                <div className="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="assets/images/users/avatar-8.jpg" alt="" className="img-fluid rounded-circle" />
                                    <a href="apps-mailbox.html" className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div className="avatar-title bg-transparent">
                                            <i className="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </a>
                                </div>
                             
                                <h5 className="mb-1"><a href="pages-profile.html" className="text-body">Donald Palmer</a></h5>
                                <p className="text-muted mb-0 ff-secondary">UI/UX Designer</p>
                            </div>
                        </div>
                        
                    </div>
                   
                </div>
                
                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <div className="card">
                            <div className="card-body text-center p-4">
                                <div className="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="assets/images/users/avatar-5.jpg" alt="" className="img-fluid rounded-circle" />
                                    <a href="apps-mailbox.html" className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div className="avatar-title bg-transparent">
                                            <i className="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </a>
                                </div>
                                
                                <h5 className="mb-1"><a href="pages-profile.html" className="text-body">Erica Kernan</a></h5>
                                <p className="text-muted mb-0 ff-secondary">Web Designer</p>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="col-lg-3 col-sm-6">
                        <div className="card">
                            <div className="card-body text-center p-4">
                                <div className="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="assets/images/users/avatar-4.jpg" alt="" className="img-fluid rounded-circle" />
                                    <a href="apps-mailbox.html" className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div className="avatar-title bg-transparent">
                                            <i className="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </a>
                                </div>
                                
                                <h5 className="mb-1"><a href="pages-profile.html" className="text-body">Alexis Clarke</a></h5>
                                <p className="text-muted mb-0 ff-secondary">Backend Developer</p>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="col-lg-3 col-sm-6">
                        <div className="card">
                            <div className="card-body text-center p-4">
                                <div className="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="assets/images/users/avatar-6.jpg" alt="" className="img-fluid rounded-circle" />
                                    <a href="apps-mailbox.html" className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div className="avatar-title bg-transparent">
                                            <i className="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </a>
                                </div>
                                
                                <h5 className="mb-1"><a href="pages-profile.html" className="text-body">Marie Ward</a></h5>
                                <p className="text-muted mb-0 ff-secondary">Full Stack Developer</p>
                            </div>
                        </div>
                        
                    </div>
                    

                    <div className="col-lg-3 col-sm-6">
                        <div className="card">
                            <div className="card-body text-center p-4">
                                <div className="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="assets/images/users/avatar-7.jpg" alt="" className="img-fluid rounded-circle" />
                                    <a href="apps-mailbox.html" className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div className="avatar-title bg-transparent">
                                            <i className="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </a>
                                </div>
                               
                                <h5 className="mb-1"><a href="pages-profile.html" className="text-body">Jack Gough</a></h5>
                                <p className="text-muted mb-0 ff-secondary">React Js Developer</p>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center mt-2">
                            <a href="pages-team.html" className="btn btn-primary">View All Members <i className="ri-arrow-right-line ms-1 align-bottom"></i></a>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </section>
       
        <section className="section" id="contact">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-5">
                            <h3 className="mb-3 fw-semibold">Get In Touch</h3>
                            <p className="text-muted mb-4 ff-secondary">We thrive when coming up with innovative ideas but also understand that a smart concept should be supported with faucibus sapien odio measurable results.</p>
                        </div>
                    </div>
                </div>
                

                <div className="row gy-4">
                    <div className="col-lg-4">
                        <div>
                            <div className="mt-4">
                                <h5 className="fs-13 text-muted text-uppercase">Office Address 1:</h5>
                                <div className="ff-secondary fw-semibold">4461 Cedar Street Moro, <br />AR 72368</div>
                            </div>
                            <div className="mt-4">
                                <h5 className="fs-13 text-muted text-uppercase">Office Address 2:</h5>
                                <div className="ff-secondary fw-semibold">2467 Swick Hill Street <br />New Orleans, LA</div>
                            </div>
                            <div className="mt-4">
                                <h5 className="fs-13 text-muted text-uppercase">Working Hours:</h5>
                                <div className="ff-secondary fw-semibold">9:00am to 6:00pm</div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="col-lg-8">
                        <div>
                            <form>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="mb-4">
                                            <label htmlFor="name" className="form-label fs-13">Name</label>
                                            <input name="name" id="name" type="text" className="form-control bg-light border-light" placeholder="Your name*" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-4">
                                            <label htmlFor="email" className="form-label fs-13">Email</label>
                                            <input name="email" id="email" type="email" className="form-control bg-light border-light" placeholder="Your email*" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="mb-4">
                                            <label htmlFor="subject" className="form-label fs-13">Subject</label>
                                            <input type="text" className="form-control bg-light border-light" id="subject" name="subject" placeholder="Your Subject.." />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label htmlFor="comments" className="form-label fs-13">Message</label>
                                            <textarea name="comments" id="comments" rows="3" className="form-control bg-light border-light" placeholder="Your message..."></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 text-end">
                                        <input type="submit" id="submit" name="send" className="submitBnt btn btn-primary" value="Send Message" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </section>
        

       
        <section className="py-5 bg-primary position-relative">
            <div className="bg-overlay bg-overlay-pattern opacity-50"></div>
            <div className="container">
                <div className="row align-items-center gy-4">
                    <div className="col-sm">
                        <div>
                            <h4 className="text-white mb-0 fw-semibold">Build your web App/SaaS with Velzon dashboard</h4>
                        </div>
                    </div>
                    
                    <div className="col-sm-auto">
                        <div>
                            <a href="https://1.envato.market/velzon-admin" target="_blank" className="btn bg-gradient btn-danger"><i className="ri-shopping-cart-2-line align-middle me-1"></i> Buy Now</a>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        
        <footer className="custom-footer bg-dark py-5 position-relative">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mt-4">
                        <div>
                            <div>
                                <img src="assets/images/logo-light.png" alt="logo light" height="17" />
                            </div>
                            <div className="mt-4 fs-13">
                                <p>Premium Multipurpose Admin & Dashboard Template</p>
                                <p className="ff-secondary">You can build any type of web application like eCommerce, CRM, CMS, Project management apps, Admin Panels, etc using Velzon.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7 ms-lg-auto">
                        <div className="row">
                            <div className="col-sm-4 mt-4">
                                <h5 className="text-white mb-0">Company</h5>
                                <div className="text-muted mt-3">
                                    <ul className="list-unstyled ff-secondary footer-list">
                                        <li><a href="pages-profile.html">About Us</a></li>
                                        <li><a href="pages-gallery.html">Gallery</a></li>
                                        <li><a href="apps-projects-overview.html">Projects</a></li>
                                        <li><a href="pages-timeline.html">Timeline</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-4 mt-4">
                                <h5 className="text-white mb-0">Apps Pages</h5>
                                <div className="text-muted mt-3">
                                    <ul className="list-unstyled ff-secondary footer-list">
                                        <li><a href="pages-pricing.html">Calendar</a></li>
                                        <li><a href="apps-mailbox.html">Mailbox</a></li>
                                        <li><a href="apps-chat.html">Chat</a></li>
                                        <li><a href="apps-crm-deals.html">Deals</a></li>
                                        <li><a href="apps-tasks-kanban.html">Kanban Board</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-4 mt-4">
                                <h5 className="text-white mb-0">Support</h5>
                                <div className="text-muted mt-3">
                                    <ul className="list-unstyled ff-secondary footer-list">
                                        <li><a href="pages-faqs.html">FAQ</a></li>
                                        <li><a href="pages-faqs.html">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row text-center text-sm-start align-items-center mt-5">
                    <div className="col-sm-6">

                        <div>
                            <p className="copy-rights mb-0">
                                 {new Date().getFullYear()}  © Velzon - Themesbrand
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="text-sm-end mt-3 mt-sm-0">
                            <ul className="list-inline mb-0 footer-social-link">
                                <li className="list-inline-item">
                                    <a href="#" className="avatar-xs d-block">
                                        <div className="avatar-title rounded-circle">
                                            <i className="ri-facebook-fill"></i>
                                        </div>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="avatar-xs d-block">
                                        <div className="avatar-title rounded-circle">
                                            <i className="ri-github-fill"></i>
                                        </div>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="avatar-xs d-block">
                                        <div className="avatar-title rounded-circle">
                                            <i className="ri-linkedin-fill"></i>
                                        </div>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="avatar-xs d-block">
                                        <div className="avatar-title rounded-circle">
                                            <i className="ri-google-fill"></i>
                                        </div>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="avatar-xs d-block">
                                        <div className="avatar-title rounded-circle">
                                            <i className="ri-dribbble-line"></i>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        


        
        <button onClick={()=>{}} className="btn btn-danger btn-icon landing-back-top" id="back-to-top">
            <i className="ri-arrow-up-line"></i>
        </button>

    </div>
  )
}

export default LandingPage