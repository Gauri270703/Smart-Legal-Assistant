import Accordion from "react-bootstrap/Accordion";

function AllCollapseExample() {
  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Frequently Asked Questions
      </h2>

      <Accordion>

        <Accordion.Item eventKey="0">
          <Accordion.Header>
            What is LEXPERT?
          </Accordion.Header>
          <Accordion.Body>
            LEXPERT is a modern legal assistance platform designed to connect
            users with verified lawyers. It helps users understand their legal
            rights, search case references, and book appointments with legal
            professionals securely and efficiently.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            How can I book a lawyer?
          </Accordion.Header>
          <Accordion.Body>
            After logging in as a user, go to your dashboard and click on
            "Book Lawyer". You can browse available lawyers, view their
            specialization, and schedule an appointment directly through the
            platform.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Are the lawyers verified?
          </Accordion.Header>
          <Accordion.Body>
            Yes. Lawyers registering on LEXPERT must provide their Bar
            Registration Number and upload necessary legal documents for
            verification before being approved on the platform.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            Is my personal information secure?
          </Accordion.Header>
          <Accordion.Body>
            Absolutely. LEXPERT ensures that all user data and uploaded
            documents are securely stored and protected using modern security
            practices to maintain privacy and confidentiality.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            Can I track my legal case status?
          </Accordion.Header>
          <Accordion.Body>
            Yes. Once logged in, users can access their dashboard to monitor
            case updates, appointment schedules, and important notifications
            related to their legal matters.
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
}

export default AllCollapseExample;