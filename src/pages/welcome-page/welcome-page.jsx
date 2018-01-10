import React, { Component } from 'react';
import { Link } from 'react-router';
import FeatureBox from '../../components/feature-box';

class WelcomePage extends Component {
  render() {
    return (
      <div>
        <div className="section-main">
          <div className="content">
            <h1 className="title"><span>Live in the moment</span></h1>
            <Link to="/login" className="btn-start">Sign In</Link>
            <h2 className="subtitle"><span>while tracking your financial goals.</span></h2>
          </div>
        </div>
        <div className="features">
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
            <Link to="/login" className="btn-get-started">Get Started</Link>
          </FeatureBox>
        </div>
      </div>
    );
  }
};

export default WelcomePage;
