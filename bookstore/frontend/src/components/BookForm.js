import { useEffect, useState } from "react";

function BookForm({ selectedBook, onSave, onCancel }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (selectedBook) {
            setTitle(selectedBook.title || "");
            setAuthor(selectedBook.author || "");
            setPrice(selectedBook.price || "");
            setStock(selectedBook.stock || "");
            setCategory(selectedBook.category || "");
        } else {
            setTitle("");
            setAuthor("");
            setPrice("");
            setStock("");
            setCategory("");
        }
    }, [selectedBook]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, author, price, stock, category });
    };

    return (
        <div className="book-form">
            <h3 className="card-title">
                {selectedBook ? "✏️ แก้ไขข้อมูลหนังสือ" : "➕ เพิ่มหนังสือใหม่"}
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>ชื่อหนังสือ (Book Title)</label>
                        <input
                            type="text"
                            placeholder="ระบุชื่อหนังสือ"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>ผู้แต่ง (Author)</label>
                        <input
                            type="text"
                            placeholder="ระบุชื่อผู้แต่ง"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>หมวดหมู่ (Category)</label>
                        <input
                            type="text"
                            placeholder="เช่น นิยาย, เทคโนโลยี"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>ราคา (บาท)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>จำนวนในสต็อก</label>
                        <input
                            type="number"
                            placeholder="0"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-primary">
                        {selectedBook ? "💾 บันทึกการแก้ไข" : "➕ เพิ่มหนังสือ"}
                    </button>

                    {selectedBook && (
                        <button type="button" className="btn btn-cancel" onClick={onCancel}>
                            ยกเลิก
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default BookForm;