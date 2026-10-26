import { useEffect, useState } from "react";
import "./App.css";

import BookForm from "./components/BookForm";
import BookTable from "./components/BookTable";
import Register from "./components/Register";
import Login from "./components/Login";

import {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    registerUser,
    loginUser
} from "./services/bookService";

function App() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [page, setPage] = useState("login");
    const [user, setUser] = useState(null);

    const role = user?.role || "viewer";
    const canEdit = role === "editor" || role === "admin";
    const canDelete = role === "admin";

    const loadBooks = async () => {
        try {
            const data = await getBooks();
            setBooks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error loading books:", error);
            alert(error.message || "โหลดรายการหนังสือไม่สำเร็จ");
        }
    };

    useEffect(() => {
        if (page === "books" && user) {
            loadBooks();
        }
    }, [page, user]);

    const handleRegister = async (newUser) => {
        try {
            const data = await registerUser(newUser);
            alert(data.message || "สมัครสมาชิกสำเร็จ");
            setPage("login");
        } catch (error) {
            console.error("Error registering:", error);
            alert(error.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
        }
    };

    const handleLogin = async (loginData) => {
        try {
            const data = await loginUser(loginData);

            if (!data.user || !data.token) {
                alert(data.message || "Login ไม่สำเร็จ");
                return;
            }

            localStorage.setItem("token", data.token);
            setUser(data.user);
            setSelectedBook(null);
            setPage("books");
        } catch (error) {
            console.error("Error logging in:", error);
            alert(error.message || "เกิดข้อผิดพลาดในการ Login");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setBooks([]);
        setSelectedBook(null);
        setPage("login");
    };

    const handleSave = async (book) => {
        if (!canEdit) return;

        try {
            if (selectedBook) {
                await updateBook(selectedBook.id, book);
            } else {
                await addBook(book);
            }
            setSelectedBook(null);
            await loadBooks();
        } catch (error) {
            console.error("Error saving book:", error);
            alert(error.message || "บันทึกหนังสือไม่สำเร็จ");
        }
    };

    const handleEdit = (book) => {
        if (!canEdit) return;
        setSelectedBook(book);
    };

    const handleDelete = async (id) => {
        if (!canDelete) return;

        if (window.confirm("ต้องการลบหนังสือเล่มนี้หรือไม่?")) {
            try {
                await deleteBook(id);
                await loadBooks();
            } catch (error) {
                console.error("Error deleting book:", error);
                alert(error.message || "ลบหนังสือไม่สำเร็จ");
            }
        }
    };

    return (
        <div>
            {/* NAVBAR */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <span>📖</span> BookHub
                </div>

                <div className="navbar-menu">
                    {!user ? (
                        <>
                            <button className="btn btn-secondary" onClick={() => setPage("login")}>
                                Login
                            </button>
                            <button className="btn btn-primary" onClick={() => setPage("register")}>
                                Register
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="user-badge">
                                👤 <strong>{user.name}</strong>
                                <span className="role-badge">{role}</span>
                            </div>

                            <button className="btn btn-secondary" onClick={() => setPage("books")}>
                                Books
                            </button>
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* AUTH PAGES */}
            {page === "login" && !user && <Login onLogin={handleLogin} />}
            {page === "register" && !user && <Register onRegister={handleRegister} />}

            {/* MAIN DASHBOARD */}
            {page === "books" && user && (
                <div className="container">
                    <div className="page-header">
                        <h1>Dashboard</h1>
                        <p>จัดการข้อมูลหนังสือและสต็อกสินค้าในระบบ</p>
                    </div>

                    <div className="card user-info-card">
                        <div className="card-title">ยินดีต้อนรับ, {user.name}!</div>
                        <p>คุณอยู่ในสถานะ: <strong>{role?.toUpperCase() || "VIEWER"}</strong></p>
                        <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                            {role === "viewer" && "สิทธิ์การใช้งาน: ดูข้อมูลได้อย่างเดียว"}
                            {role === "editor" && "สิทธิ์การใช้งาน: ดู, เพิ่ม และแก้ไขข้อมูลได้"}
                            {role === "admin" && "สิทธิ์การใช้งาน: จัดการข้อมูลได้เต็มรูปแบบ (เพิ่ม/แก้ไข/ลบ)"}
                        </p>
                    </div>

                    {canEdit && (
                        <div className="card">
                            <BookForm
                                selectedBook={selectedBook}
                                onSave={handleSave}
                                onCancel={() => setSelectedBook(null)}
                            />
                        </div>
                    )}

                    <div className="card">
                        <BookTable
                            books={books}
                            onEdit={canEdit ? handleEdit : undefined}
                            onDelete={canDelete ? handleDelete : undefined}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;