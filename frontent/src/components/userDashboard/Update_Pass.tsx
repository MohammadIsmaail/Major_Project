import { useMemo, useState } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { updatePasswordService } from "../../services/API";
import "../../styles/Update_Pass.css";

const Update_Pass = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMsg) setErrorMsg("");
  };

  const passwordStrength = useMemo(() => {
    let score = 0;

    if (formData.newPassword.length >= 8) score++;
    if (/[A-Z]/.test(formData.newPassword)) score++;
    if (/[a-z]/.test(formData.newPassword)) score++;
    if (/[0-9]/.test(formData.newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(formData.newPassword)) score++;

    return score;
  }, [formData.newPassword]);

  const strengthText = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Excellent",
  ][passwordStrength];

  const passwordMatched =
    formData.confirmPassword.length > 0 &&
    formData.newPassword === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordMatched) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (formData.newPassword === formData.currentPassword) {
      setErrorMsg("New password must be different from current password.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const res = await updatePasswordService(formData);

      if (res?.success) {
        alert(res?.message || "Password updated successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err: any) {
      setErrorMsg(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-pass">

      <div className="password-card">

        <div className="card-header">
          <h2>Update Password</h2>
          <p>
            Keep your account secure by creating a strong password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Current Password */}

          <div className="form-group">

            <label>Current Password</label>

            <div className="input-box">

              <FaLock className="input-icon" />

              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          {/* New Password */}

          <div className="form-group">

            <label>New Password</label>

            <div className="input-box">

              <FaLock className="input-icon" />

              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            <div className="strength">

              <div className="strength-bar">

                <div
                  className="strength-fill"
                  style={{
                    width: `${passwordStrength * 20}%`,
                  }}
                ></div>

              </div>

              <span>{strengthText}</span>

            </div>

          </div>

          {/* Confirm Password */}

          <div className="form-group">

            <label>Confirm Password</label>

            <div className="input-box">

              <FaLock className="input-icon" />

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            {formData.confirmPassword && (
              <div
                className={`match-text ${
                  passwordMatched ? "success" : "error"
                }`}
              >
                {passwordMatched ? (
                  <>
                    <FaCheckCircle />
                    Password Matched
                  </>
                ) : (
                  <>
                    <FaTimesCircle />
                    Password Not Matched
                  </>
                )}
              </div>
            )}

          </div>

          {errorMsg && <div className="form-error">{errorMsg}</div>}

          <button className="update-btn" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Update_Pass;