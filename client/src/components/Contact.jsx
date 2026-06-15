import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const initialFormState = { name: '', email: '', message: '' };
const initialErrors = { name: '', email: '', message: '' };

function Contact() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [formState, setFormState] = useState({
    loading: false,
    success: '',
    error: ''
  });
  const [toast, setToast] = useState({
    visible: false,
    type: 'success',
    message: ''
  });

  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(
      () => setToast((prev) => ({ ...prev, visible: false })),
      3000
    );
    return () => clearTimeout(timer);
  }, [toast.visible]);

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const nextErrors = { ...initialErrors };

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) nextErrors.name = 'Name is required.';
    else if (name.length < 2) nextErrors.name = 'Name must be at least 2 characters.';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) nextErrors.email = 'Email is required.';
    else if (!emailPattern.test(email)) nextErrors.email = 'Enter a valid email address.';

    if (!message) nextErrors.message = 'Message is required.';
    else if (message.length < 10) nextErrors.message = 'Message must be at least 10 characters.';

    return nextErrors;
  };

  const showToast = (type, message) => {
    setToast({ visible: true, type, message });
  };

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors(initialErrors);
    setFormState({ loading: false, success: '', error: '' });
  };

  // ---------------- MOCK CONTACT HANDLER ----------------
  // Simulates backend contact form submission with a small delay
  const submitContactForm = async (data) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful response
    return {
      ok: true,
      json: async () => ({
        success: true,
        message: 'Message received successfully.'
      })
    };
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validateForm();
    const hasErrors = Object.values(nextErrors).some(Boolean);

    if (hasErrors) {
      setErrors(nextErrors);
      setFormState({
        loading: false,
        success: '',
        error: 'Please fix the highlighted fields.'
      });
      return;
    }

    setFormState({ loading: true, success: '', error: '' });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await submitContactForm(formData);

      clearTimeout(timeout);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to send message');
      }

      setFormState({
        loading: false,
        success: data?.message || 'Message sent successfully.',
        error: ''
      });

      setFormData(initialFormState);
      showToast('success', data?.message || 'Message sent successfully.');
    } catch (err) {
      clearTimeout(timeout);

      const message =
        err.name === 'AbortError'
          ? 'Request timed out. Please try again.'
          : err.message || 'Something went wrong.';

      setFormState({ loading: false, success: '', error: message });
      showToast('error', message);
    }
  };

  const inputBase =
    'w-full rounded-3xl border bg-black/80 px-4 py-3 text-white outline-none transition focus:ring-2 focus:ring-brand/20';

  return (
    <section id="contact" className="section-container relative">

      {toast.visible && (
        <div
          className={`fixed right-4 top-24 z-50 w-full max-w-sm rounded-3xl px-4 py-3 text-sm shadow-2xl ${
            toast.type === 'success'
              ? 'bg-emerald-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-heading">Contact</span>

          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Let’s connect
          </h2>

          <p className="mt-6 text-slate-300">
                  Open to projects, ideas, or collaborations.
          </p>

          <div className="mt-10 space-y-4">
            <a className="flex items-center gap-3 text-white" href="https://github.com">
              <FaGithub /> GitHub
            </a>
            <a className="flex items-center gap-3 text-white" href="https://linkedin.com">
              <FaLinkedin /> LinkedIn
            </a>
            <a className="flex items-center gap-3 text-white" href="mailto:test@gmail.com">
              <FaEnvelope /> Email
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.form
          onSubmit={handleSubmit}
          className="card-panel rounded-[2rem] p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          {/* NAME */}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={`${inputBase} mb-4`}
          />
          {errors.name && <p className="text-red-400">{errors.name}</p>}

          {/* EMAIL */}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`${inputBase} mb-4`}
          />
          {errors.email && <p className="text-red-400">{errors.email}</p>}

          {/* MESSAGE */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className={`${inputBase} min-h-[150px]`}
          />
          {errors.message && <p className="text-red-400">{errors.message}</p>}

          {/* ERROR */}
          {formState.error && (
            <p className="mt-4 text-red-400">{formState.error}</p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={formState.loading}
            className="mt-6 w-full rounded-3xl bg-brand py-3 font-semibold text-black"
          >
            {formState.loading ? 'Sending...' : 'Send Message'}
          </button>

        </motion.form>
      </div>
    </section>
  );
}

export default Contact;