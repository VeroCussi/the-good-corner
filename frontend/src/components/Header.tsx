import { Link } from 'react-router';

export const Header = () => {
  return (
    <header className="header">
      <div className="main-menu">
        <h1>
          <Link to="/" className="button logo link-button">
            <span className="mobile-short-label">TGC</span>
            <span className="desktop-long-label">THE GOOD CORNER</span>
          </Link>
        </h1>

        <form className="text-field-with-button">
          <input className="text-field main-search-field" type="search" />
          <button className="button button-primary">
            {/* SVG del icono de búsqueda */}
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-50 -50 530 550"
              transform="scale(-1, 1)"
              fill="currentColor"
              xmlSpace="preserve"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
            >
              <path d="..."></path>
            </svg>
          </button>
        </form>

        <Link to="/post-ad" className="button link-button">
          <span className="mobile-short-label">Publier</span>
          <span className="desktop-long-label">Publier une annonce</span>
        </Link>
      </div>

      <nav className="categories-navigation">
        <Link to="/category/ameublement" className="category-navigation-link">Ameublement</Link> •
        <Link to="/category/electromenager" className="category-navigation-link">Électroménager</Link> •
        <Link to="/category/photographie" className="category-navigation-link">Photographie</Link> •
        <Link to="/category/informatique" className="category-navigation-link">Informatique</Link> •
        <Link to="/category/telephonie" className="category-navigation-link">Téléphonie</Link> •
        <Link to="/category/velos" className="category-navigation-link">Vélos</Link> •
        <Link to="/category/vehicules" className="category-navigation-link">Véhicules</Link> •
        <Link to="/category/sport" className="category-navigation-link">Sport</Link> •
        <Link to="/category/habillement" className="category-navigation-link">Habillement</Link> •
        <Link to="/category/bebe" className="category-navigation-link">Bébé</Link> •
        <Link to="/category/outillage" className="category-navigation-link">Outillage</Link> •
        <Link to="/category/services" className="category-navigation-link">Services</Link> •
        <Link to="/category/vacances" className="category-navigation-link">Vacances</Link>
      </nav>
    </header>
  );
};
