function BookTable({ books, onEdit, onDelete }) {
    return (
        <div>
            <h3 className="card-title">📖 รายการหนังสือในระบบ</h3>

            <div className="table-responsive">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category</th>
                            {(onEdit || onDelete) && <th>Actions</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {books.length > 0 ? (
                            books.map((book) => (
                                <tr key={book.id}>
                                    <td>#{book.id}</td>
                                    <td><strong>{book.title}</strong></td>
                                    <td>{book.author}</td>
                                    <td><span className="price-tag">฿{Number(book.price).toLocaleString()}</span></td>
                                    <td><span className="stock-badge">{book.stock} เล่ม</span></td>
                                    <td>{book.category || "-"}</td>

                                    {(onEdit || onDelete) && (
                                        <td>
                                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                                {onEdit && (
                                                    <button className="btn btn-secondary" onClick={() => onEdit(book)}>
                                                        ✏️ Edit
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button className="btn btn-danger" onClick={() => onDelete(book.id)}>
                                                        🗑️ Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={onEdit || onDelete ? 7 : 6} style={{ textAlign: "center", padding: "2rem" }}>
                                    ไม่พบข้อมูลหนังสือในระบบ
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BookTable;