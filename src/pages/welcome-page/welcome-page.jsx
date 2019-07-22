import React, { Component } from 'react';
import { Link } from 'react-router';
import Carousel from 'nuka-carousel';
import amplitude from 'amplitude-js/amplitude';
import FeatureBox from '../../components/feature-box';
import ProductDemoImgOne from './scroogevault_demo_11.png';
import ProductDemoImgTwo from './scroogevault_demo_22.png';
import ProductDemoImgThree from './scroogevault_demo_33.png';

class WelcomePage extends Component {
  render() {
    amplitude.getInstance().logEvent('Page load: Welcome Page');
    var sliderSettings = {
      dragging: true,
      speed: 500,
      cellSpacing: 20,
      edgeEasing: 'easeOutCirc',
    };

    return (
      <div>
        <div className="oval-wrapper">
          <svg viewBox="200 0 500 500" preserveAspectRatio="xMinYMin meet">
            <path d="M0,170 C150,220 400,0 500,120 L500,00 L0,0 Z" style={{stroke: 'none', fill: '#c5bcf9', opacity: '0.4'}} />
            <path d="M0,100 C150,200 350,0 500,120 L500,00 L0,0 Z" style={{stroke: 'none', fill: '#c5bcf9', opacity: '0.3'}} />
          </svg>
        </div>
        <div className="features">
          <div className="section-main">
            <Link to="/login" className="button btn-start">Sign In</Link>
            <div className="row content">
              <div className="col-md-7 col-xs-12">
                <h1 className="title">
                  <span>A new way to </span>
                  <br/>
                  <span>track your financial goals!</span>
                </h1>
                <Link to="/login" className="button btn-get-started">Get Started</Link>
              </div>
              <div className="col-md-5 col-xs-12">
                <Carousel {...sliderSettings}>
                  <img src={ProductDemoImgOne} alt="Scroogevault Demo"/>
                  <img src={ProductDemoImgTwo} alt="Scroogevault Demo"/>
                  <img src={ProductDemoImgThree} alt="Scroogevault Demo"/>
                </Carousel>
              </div>
            </div>
          </div>
          <FeatureBox title="Not sure how much to spend this month?"
            description="A bunch of apps out there offer expense/income/budget tracking but none give insight about how much should you actually save up."
          />
          <FeatureBox title="We have a better way."
            description="We are offering an easy way to organize future expenses/income and overview monthly savings or spending power!"
          />
          <FeatureBox title="ScroogeVault is 100% free."
            description="Don't worry, there are no fees involved and no bank accounts information needed, we are just offering a glorified calculator and a way to unload the burden of financial planning."
          />
          <FeatureBox>
            <Link to="/login" className="button btn-get-started">Get Started</Link>
          </FeatureBox>
        </div>
      </div>
    );
  }
};

export default WelcomePage;
