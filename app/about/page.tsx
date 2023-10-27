import "./about.css";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-page-section">
        <h2>About LimitedEdition Bricks Hub</h2>
        <p>
          Welcome to LimitedEdition Bricks Hub, your premier destination for the
          most exclusive and sought-after LEGO collectibles. We're passionate
          about bringing the rarest and most limited-edition LEGO sets right to
          your fingertips.
        </p>
      </section>
      <section className="about-page-section">
        <h2>Preorder Your LEGO Dreams</h2>
        <p>
          At LimitedEdition Bricks Hub, we believe in celebrating the essence of
          LEGO's artistry and innovation. That's why we offer you the
          opportunity to preorder the most coveted LEGO collectibles before they
          hit the shelves. By preordering, you secure your piece of LEGO history
          and become a part of a global community of collectors who cherish the
          extraordinary.
        </p>
        <p>
          Our curated selection includes limited-edition sets that embody the
          spirit of creativity, imagination, and the LEGO legacy. Each set tells
          a unique story, and we're here to ensure you're part of that
          narrative.
        </p>
        <p>
          Explore our catalog, embark on your LEGO journey, and preorder your
          next masterpiece today. Thank you for choosing LimitedEdition Bricks
          Hub to be a part of your LEGO adventure.
        </p>
        <Link href="/shop">
          <button className="about-pre-order-button">Pre-order now</button>
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
