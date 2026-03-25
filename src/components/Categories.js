import { useNavigate } from "react-router-dom";
import "./Categories.css";

function Categories() {
  const navigate = useNavigate();

  const goToCategory = (category) => {
    navigate(`/books/${category}`);
  };

  return (
    <div className="categories-container">
      <h1 className="categories-title">📚 Browse by Category</h1>

      <section className="category-section">
        <h2 className="section-title">Fiction</h2>
        <div className="category-grid">
          <div className="category-card fantasy" onClick={() => goToCategory("Fantasy")}>
            Fantasy
          </div>
          <div className="category-card romance" onClick={() => goToCategory("Romance")}>
            Romance
          </div>
          <div className="category-card scifi" onClick={() => goToCategory("Sci-Fi")}>
            Sci-Fi
          </div>
          <div className="category-card mystery" onClick={() => goToCategory("Mystery")}>
            Mystery
          </div>
          <div className="category-card horror" onClick={() => goToCategory("Horror")}>
            Horror
          </div>
          <div className="category-card literary" onClick={() => goToCategory("Literary")}>
            Literary
          </div>
        </div>
      </section>

      {/* ===== NON-FICTION ===== */}
      <section className="category-section">
        <h2 className="section-title">Non-Fiction</h2>
        <div className="category-grid">
          <div className="category-card biography" onClick={() => goToCategory("Biography")}>
            Biography
          </div>
          <div className="category-card history" onClick={() => goToCategory("History")}>
            History
          </div>
          <div className="category-card selfhelp" onClick={() => goToCategory("Self-Help")}>
            Self-Help
          </div>
          <div className="category-card science" onClick={() => goToCategory("Science")}>
            Science
          </div>
          <div className="category-card cooking" onClick={() => goToCategory("Cooking")}>
            Cooking
          </div>
          <div className="category-card business" onClick={() => goToCategory("Business")}>
            Business
          </div>
        </div>
      </section>

      {/* ===== SPECIAL ===== */}
      <section className="category-section">
        <h2 className="section-title">Special</h2>
        <div className="category-grid">
          <div className="category-card manga" onClick={() => goToCategory("Manga")}>
            Manga
          </div>
          <div className="category-card comics" onClick={() => goToCategory("Comics")}>
            Comics
          </div>
          <div className="category-card young" onClick={() => goToCategory("Young Adult")}>
            Young Adult
          </div>
          <div className="category-card children" onClick={() => goToCategory("Children")}>
            Children
          </div>
          <div className="category-card arts" onClick={() => goToCategory("Arts")}>
            Arts
          </div>
          <div className="category-card tech" onClick={() => goToCategory("Technology")}>
            Technology
          </div>
          <div className="category-card travel" onClick={() => goToCategory("Travel")}>
            Travel
          </div>
          <div className="category-card philosophy" onClick={() => goToCategory("Philosophy")}>
            Philosophy
          </div>
        </div>
      </section>
    </div>
  );
}

export default Categories;
