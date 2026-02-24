import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    image: "",
    rating: "",
    description: ""
  });

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Access Denied: Admins only");
      navigate("/");
    }
  }, [navigate]);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    fetchBooks();
    fetchOrders();
    fetchUsers();
  }, []);

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/books", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  /* ================= HANDLERS ================= */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const openModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData(book);
    } else {
      setEditingBook(null);
      setFormData({
        title: "",
        author: "",
        category: "",
        price: "",
        image: "",
        rating: "",
        description: ""
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
      };

      if (editingBook) {
        // Remove _id from payload to avoid Mongoose update error
        delete payload._id;
        await axios.put(`http://localhost:5000/api/books/${editingBook._id}`, payload, config);
        alert("Book Updated!");
      } else {
        await axios.post("http://localhost:5000/api/books", payload, config);
        alert("Book Added!");
      }
      fetchBooks();
      closeModal();
    } catch (err) {
      console.error("Error saving book", err);
      alert("Failed to save book");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`, config);
        fetchBooks();
      } catch (err) {
        console.error("Error deleting book", err);
        alert("Failed to delete book");
      }
    }
  };

  /* ================= RENDER HELPERS ================= */
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">📚 Bookstore Admin</div>
        <ul className="sidebar-nav">
          <li
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </li>
          <li
            className={`nav-item ${activeTab === "books" ? "active" : ""}`}
            onClick={() => setActiveTab("books")}
          >
            📚 Books
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab === "dashboard" ? "Dashboard Overview" : "Book Management"}</h1>
        </header>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-info">
                <h3>Total Books</h3>
                <p>{books.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-info">
                <h3>Total Orders</h3>
                <p>{orders.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <h3>Revenue</h3>
                <p>₹{totalRevenue}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>Users</h3>
                <p>{users.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* BOOKS TAB */}
        {(activeTab === "books" || activeTab === "dashboard") && (
          <div className="table-container">
            <div className="table-header">
              <h2>Recent Books</h2>
              <button className="add-btn" onClick={() => openModal()}>+ Add New Book</button>
            </div>

            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search by title, author, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book._id}>
                    <td><img src={book.image} alt="" className="book-cover" /></td>
                    <td><b>{book.title}</b></td>
                    <td>{book.author}</td>
                    <td>₹{book.price}</td>
                    <td><span className="badge">{book.category}</span></td>
                    <td>
                      <button className="action-btn edit-btn" onClick={() => openModal(book)}>✏️</button>
                      <button className="action-btn delete-btn" onClick={() => handleDelete(book._id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingBook ? "Edit Book" : "Add New Book"}</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label>Price</label>
                  <input type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Rating</label>
                  <input type="number" step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <button type="submit" className="submit-btn">
                {editingBook ? "Update Book" : "Add Book"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
