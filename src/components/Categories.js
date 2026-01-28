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

      {/* ===== FICTION ===== */}
      <section className="category-section">
        <h2 className="section-title">Fiction</h2>
        <div className="category-grid">
          <div className="category-card fantasy" onClick={() => goToCategory("Fantasy")}>
            <span>🧙</span> Fantasy
          </div>
          <div className="category-card romance" onClick={() => goToCategory("Romance")}>
            <span>❤️</span> Romance
          </div>
          <div className="category-card scifi" onClick={() => goToCategory("Sci-Fi")}>
            <span>🚀</span> Sci-Fi
          </div>
          <div className="category-card mystery" onClick={() => goToCategory("Mystery")}>
            <span>🕵️</span> Mystery
          </div>
          <div className="category-card horror" onClick={() => goToCategory("Horror")}>
            <span>👻</span> Horror
          </div>
          <div className="category-card literary" onClick={() => goToCategory("Literary")}>
            <span>📖</span> Literary
          </div>
        </div>
      </section>

      {/* ===== NON-FICTION ===== */}
      <section className="category-section">
        <h2 className="section-title">Non-Fiction</h2>
        <div className="category-grid">
          <div className="category-card biography" onClick={() => goToCategory("Biography")}>
            <span>👤</span> Biography
          </div>
          <div className="category-card history" onClick={() => goToCategory("History")}>
            <span>🏺</span> History
          </div>
          <div className="category-card selfhelp" onClick={() => goToCategory("Self-Help")}>
            <span>💡</span> Self-Help
          </div>
          <div className="category-card science" onClick={() => goToCategory("Science")}>
            <span>🔬</span> Science
          </div>
          <div className="category-card cooking" onClick={() => goToCategory("Cooking")}>
            <span>🍳</span> Cooking
          </div>
          <div className="category-card business" onClick={() => goToCategory("Business")}>
            <span>💼</span> Business
          </div>
        </div>
      </section>

      {/* ===== SPECIAL ===== */}
      <section className="category-section">
        <h2 className="section-title">Special</h2>
        <div className="category-grid">
          <div className="category-card manga" onClick={() => goToCategory("Manga")}>
            <span>🎌</span> Manga
          </div>
          <div className="category-card comics" onClick={() => goToCategory("Comics")}>
            <span>🦸</span> Comics
          </div>
          <div className="category-card young" onClick={() => goToCategory("Young Adult")}>
            <span>🧑</span> Young Adult
          </div>
          <div className="category-card children" onClick={() => goToCategory("Children")}>
            <span>🧸</span> Children
          </div>
          <div className="category-card arts" onClick={() => goToCategory("Arts")}>
            <span>🎨</span> Arts
          </div>
          <div className="category-card tech" onClick={() => goToCategory("Technology")}>
            <span>💻</span> Technology
          </div>
          <div className="category-card travel" onClick={() => goToCategory("Travel")}>
            <span>✈️</span> Travel
          </div>
          <div className="category-card philosophy" onClick={() => goToCategory("Philosophy")}>
            <span>🧠</span> Philosophy
          </div>
        </div>
      </section>
    </div>
  );
}

export default Categories;
