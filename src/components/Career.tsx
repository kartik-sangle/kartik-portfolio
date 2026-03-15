import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="activities">
      <div className="career-container">
        <h2>
          Extra-Curricular
          <br /> <span>Activities</span>
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Technical Head</h4>
                <h5>Students' Council</h5>
              </div>
              <h3>2023 -<br />Present</h3>
            </div>
            <p>
              Led technical and creative operations for cultural events, managing media design,
              printing, and digital promotions. Coordinated and guided technical teams to ensure
              smooth execution, quality output, and timely event delivery.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Associate Outreach Lead</h4>
                <h5>Microsoft Learn Student Club (MLSC)</h5>
              </div>
              <h3>2024 -<br />Present</h3>
            </div>
            <p>
              Supported planning and execution of IT-focused educational events, workshops,
              and technical sessions. Managed outreach initiatives, promotional designs,
              and team coordination to increase student engagement.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Social Media Head</h4>
                <h5>NSS Committee</h5>
              </div>
              <h3>2024 -<br />Present</h3>
            </div>
            <p>
              SManaged the NSS committee’s digital presence across multiple social platforms. Planned content strategies, designed promotional posts, and coordinated online campaigns to increase engagement, promote social initiatives, and raise awareness for community service activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
