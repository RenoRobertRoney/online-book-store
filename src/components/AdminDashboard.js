import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import booksData from "../data/books";

function AdminDashboard() {
  const navigate = useNavigate();

  /* =========================
     ALL HOOKS AT TOP (IMPORTANT)
  ========================= */

  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    image: "",
    rating: "",
  });

  /* =========================
     AUTH CHECK (NO CONDITIONAL HOOKS)
  ========================= */
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      alert("Access Denied: Admins only");
      navigate("/");
    }
  }, [navigate]);

  /* =========================
     LOAD BOOKS & ORDERS
  ========================= */
  useEffect(() => {
    const savedBooks =
      JSON.parse(localStorage.getItem("adminBooks")) || booksData;
    setBooks(savedBooks);

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  /* =========================
     DERIVED VALUES
  ========================= */
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* =========================
     SAVE BOOKS
  ========================= */
  const saveBooks = (updatedBooks) => {
    setBooks(updatedBooks);
    localStorage.setItem("adminBooks", JSON.stringify(updatedBooks));
  };

  /* =========================
     ADD / UPDATE BOOK
  ========================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingBook) {
      const updated = books.map((b) =>
        b.id === editingBook.id
          ? {
              ...editingBook,
              ...formData,
              price: Number(formData.price),
              rating: Number(formData.rating),
            }
          : b
      );
      saveBooks(updated);
      setEditingBook(null);
    } else {
      const newBook = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
      };
      saveBooks([...books, newBook]);
    }

    setFormData({
      title: "",
      author: "",
      category: "",
      price: "",
      image: "",
      rating: "",
    });
  };

  /* =========================
     EDIT BOOK
  ========================= */
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData(book);
  };

  /* =========================
     DELETE BOOK
  ========================= */
  const handleDelete = (id) => {
    if (window.confirm("Delete this book?")) {
      saveBooks(books.filter((b) => b.id !== id));
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div style={styles.dashboard}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1>📊 Admin Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          📚 Total Books <br />
          <b>{books.length}</b>
        </div>
        <div style={styles.statCard}>
          📦 Total Orders <br />
          <b>{orders.length}</b>
        </div>
        <div style={styles.statCard}>
          💰 Revenue <br />
          <b>₹{totalRevenue}</b>
        </div>
      </div>

      {/* ADD / EDIT FORM */}
      <div style={styles.formBox}>
        <h2>{editingBook ? "Edit Book" : "Add New Book"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <input
            placeholder="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            required
          />

          <input
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />

          <input
            type="number"
            step="0.1"
            placeholder="Rating (0–5)"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
            required
          />

          <input
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            required
          />

          <button type="submit">
            {editingBook ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>

      {/* BOOK TABLE */}
      <h2>📚 Manage Books</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                <img src={book.image} alt="" style={styles.image} />
              </td>
              <td>{book.title}</td>
              <td>₹{book.price}</td>
              <td>{book.rating}</td>
              <td>
                <button onClick={() => handleEdit(book)}>Edit</button>{" "}
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================
   STYLES
========================= */
const styles = {
  dashboard: {
    padding: 30,
    background: "#f4f6f9",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  logoutBtn: {
    background: "#e63946",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 20,
    marginBottom: 30,
  },
  statCard: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
  },
  formBox: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  form: {
    display: "grid",
    gap: 10,
    maxWidth: 500,
  },
  table: {
    width: "100%",
    background: "#fff",
    borderCollapse: "collapse",
  },
  image: {
    width: 50,
    height: 70,
    objectFit: "cover",
  },
};

export default AdminDashboard;
