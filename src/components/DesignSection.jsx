import designProjects from "../data/designProjects";

export default function DesignSection() {
  return (
    <section className="design-section">
      <p className="design-mini-title">DESIGN PROJECTS</p>
      <h2 className="design-heading">Selected Case Studies</h2>
      <div className="design-grid">
        {designProjects.map((project) => (
          <div
            key={project.id}
            className="design-card"
            onClick={() => window.open(project.link)}
          >
            <div className="image-wrapper">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="design-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}