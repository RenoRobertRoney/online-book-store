import { useState, useEffect } from "react";
import booksData from "../data/books";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  /* =========================
     ADMIN AUTH
  ========================= */
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "admin123";

  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  /* =========================
     BOOK STATE (LOCAL STORAGE)
  ========================= */
  const [books, setBooks] = useState([]);
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
     ORDERS & STATS
  ========================= */
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedBooks =
      JSON.parse(localStorage.getItem("adminBooks")) || booksData;
    setBooks(savedBooks);

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  /* =========================
     LOGIN HANDLER
  ========================= */
  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (
      loginData.email === ADMIN_EMAIL &&
      loginData.password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      setIsAdmin(true);
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  /* =========================
     SAVE BOOKS
  ========================= */
  const saveBooks = (updatedBooks) => {
    setBooks(updatedBooks);
    localStorage.setItem("adminBooks", JSON.stringify(updatedBooks));
  };

  /* =========================
     ADD / EDIT BOOK
  ========================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingBook) {
      const updated = books.map((b) =>
        b.id === editingBook.id
          ? { ...editingBook, ...formData, price: Number(formData.price), rating: Number(formData.rating) }
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
     DELETE BOOK
  ========================= */
  const handleDelete = (id) => {
    if (window.confirm("Delete this book?")) {
      saveBooks(books.filter((book) => book.id !== id));
    }
  };

  /* =========================
     EDIT BOOK
  ========================= */
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData(book);
  };

  /* =========================
     LOGIN PAGE
  ========================= */
  if (!isAdmin) {
    return (
      <div style={styles.loginContainer}>
        <form style={styles.loginBox} onSubmit={handleAdminLogin}>
          <h2>Admin Login</h2>

          <input
            type="email"
            placeholder="Admin Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  /* =========================
     DASHBOARD UI
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
        <div style={styles.statCard}>📚 Total Books<br /><b>{books.length}</b></div>
        <div style={styles.statCard}>📦 Total Orders<br /><b>{orders.length}</b></div>
        <div style={styles.statCard}>💰 Total Revenue<br /><b>₹{totalRevenue}</b></div>
      </div>

      {/* ADD / EDIT FORM */}
      <div style={styles.formBox}>
        <h2>{editingBook ? "Edit Book" : "Add New Book"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input placeholder="Title" value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />

          <input placeholder="Author" value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })} required />

          <input placeholder="Category" value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />

          <input type="number" placeholder="Price" value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />

          <input type="number" step="0.1" placeholder="Rating (0–5)" value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })} required />

          <input placeholder="Image URL" value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })} required />

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
            <th>Rating ⭐</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td><img src={book.image} alt="" style={styles.image} /></td>
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
  loginContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
  },
  loginBox: {
    background: "#fff",
    padding: 30,
    borderRadius: 10,
    width: 320,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  dashboard: { padding: 30, background: "#f4f6f9", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", marginBottom: 30 },
  logoutBtn: { background: "#e63946", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6 },
  stats: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 30 },
  statCard: { background: "#fff", padding: 20, borderRadius: 10, textAlign: "center", fontSize: 18 },
  formBox: { background: "#fff", padding: 20, borderRadius: 10, marginBottom: 30 },
  form: { display: "grid", gap: 10, maxWidth: 500 },
  table: { width: "100%", background: "#fff", borderCollapse: "collapse" },
  image: { width: 50, height: 70, objectFit: "cover" },
};

export default AdminDashboard;
