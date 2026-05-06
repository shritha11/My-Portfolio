import designProjects from "../data/designProjects";

function DesignSection() {

  return (

    <section className="design-section">

      <div className="section-header">

        <p className="section-tag">
          DESIGN PROJECTS
        </p>

        <h2>
          Selected Case Studies
        </h2>

      </div>

      <div className="design-grid">

        {designProjects.map((project) => (

          <div
            key={project.id}
            className="design-card"
            onClick={() =>
              window.open(project.link)
            }
          >

            <div className="image-wrapper">

              <img
                src={project.image}
                alt={project.title}
              />

            </div>

            <div className="design-content">

              <h3>{project.title}</h3>

              <p>
                {project.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default DesignSection;