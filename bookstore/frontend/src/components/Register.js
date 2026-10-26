import { useState } from "react";

function Register({ onRegister }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ name, email, password });
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-icon">✨</div>
                <h2>สร้างบัญชีใหม่</h2>
                <p className="auth-description">
                    ลงทะเบียนเพื่อเข้าใช้งานระบบ
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: "1rem" }}>
                        <label>ชื่อผู้ใช้งาน (Name)</label>
                        <input
                            type="text"
                            placeholder="ชื่อ-นามสกุล"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: "1rem" }}>
                        <label>อีเมล (Email)</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: "1rem" }}>
                        <label>รหัสผ่าน (Password)</label>
                        <input
                            type="password"
                            placeholder="ตั้งรหัสผ่าน"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary auth-button">
                        สมัครสมาชิก
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;