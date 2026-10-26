import { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // เหลือเฉพาะ ADMIN และ VIEWER
    const demoAccounts = [
        { role: "ADMIN", email: "phasunit.10@gmail.com", pass: "phasunit11", color: "#ef4444" },
        { role: "VIEWER", email: "pasunit.puk@gmail.com", pass: "phasunit11", color: "#3b82f6" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    };

    const handleSelectDemo = (accEmail, accPass) => {
        setEmail(accEmail);
        setPassword(accPass);
    };

    return (
        <div className="login-wrapper">
            {/* ฟอร์ม Login */}
            <div className="auth-card">
                <div className="auth-icon">🔐</div>
                <h2>ยินดีต้อนรับกลับมา</h2>
                <p className="auth-description">เข้าสู่ระบบเพื่อจัดการระบบหนังสือ</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>อีเมล (Email)</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ marginTop: "1rem" }}>
                        <label>รหัสผ่าน (Password)</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        เข้าสู่ระบบ
                    </button>
                </form>
            </div>

            {/* กล่องบัญชีทดสอบสำหรับอาจารย์ */}
            <div className="demo-card">
                <h3>💡 บัญชีสำหรับทดสอบระบบ</h3>
                <p className="demo-sub">คลิกปุ่มเพื่อนำข้อมูลไปกรอก หรือคัดลอกได้เลยครับ</p>

                <div className="demo-box-list">
                    {demoAccounts.map((acc, i) => (
                        <div key={i} className="demo-box-item">
                            <div className="demo-box-top">
                                <span className="demo-tag" style={{ backgroundColor: acc.color }}>
                                    {acc.role}
                                </span>
                                <button
                                    type="button"
                                    className="demo-use-btn"
                                    onClick={() => handleSelectDemo(acc.email, acc.pass)}
                                >
                                    ใช้บัญชีนี้ ➔
                                </button>
                            </div>
                            <div className="demo-box-info">
                                <div><strong>Email:</strong> <code>{acc.email}</code></div>
                                <div><strong>Password:</strong> <code>{acc.pass}</code></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Login;