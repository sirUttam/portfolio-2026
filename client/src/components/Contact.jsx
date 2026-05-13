import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const initialFormState = { name: '', email: '', message: '' };
const initialErrors = { name: '', email: '', message: '' };

function Contact() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [formState, setFormState] = useState({ loading: false, success: '', error: '' });
  const [toast, setToast] = useState({ visible: false, type: 'success', message: '' });

  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
    return () => clearTimeout(timer);
  }, [toast.visible]);

  const validateForm = () => {
    const nextErrors = { ...initialErrors };
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      nextErrors.name = 'Name is required.';
    } else if (trimmedName.length < 2) {
      nextErrors.name = 'Name must be at least 2 characters.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      nextErrors.email = 'Email is required.';
    } else if (!emailPattern.test(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!trimmedMessage) {
      nextErrors.message = 'Message is required.';
    } else if (trimmedMessage.length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.';
    }

    return nextErrors;
  };

  const showToast = (type, message) => {
    setToast({ visible: true, type, message });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setFormState({ loading: false, success: '', error: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validateForm();
    const hasErrors = Object.values(nextErrors).some(Boolean);

    if (hasErrors) {
      setErrors(nextErrors);
      setFormState({ loading: false, success: '', error: 'Please fix the highlighted fields.' });
      return;
    }

    setFormState({ loading: true, success: '', error: '' });

    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const message = payload?.message || payload?.errors?.map((item) => item.msg).join(' ') || 'Unable to send your message.';
        throw new Error(message);
      }

      setFormState({ loading: false, success: payload?.message || 'Message sent successfully.', error: '' });
      setFormData(initialFormState);
      showToast('success', payload?.message || 'Message sent successfully.');
      setErrors(initialErrors);
    } catch (error) {
      const message = error.message || 'Network error. Please try again.';
      setFormState({ loading: false, success: '', error: message });
      showToast('error', message);
    }
  };

  const inputBaseClasses = 'w-full rounded-3xl border bg-black/80 px-4 py-3 text-white outline-none transition focus:ring-2 focus:ring-brand/20';

  return (
    <section id="contact" className="section-container relative">
      {toast.visible && (
        <div className={`fixed right-4 top-24 z-50 w-full max-w-sm rounded-3xl px-4 py-3 text-sm shadow-2xl transition ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.message}
        </div>
      )}
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="section-heading">Contact</span>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Let’s build something impactful together.</h2>
          <p className="mt-6 max-w-xl text-slate-300 leading-7">
            Whether you have a project idea, career opportunity, or curious question, I’m ready to connect and collaborate.
          </p>
          <div className="mt-10 space-y-4 text-slate-300">
            <a href="https://github.com/sirUttam" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm transition hover:border-brand hover:text-brand">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/uttam-aryal-78a6bb324/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm transition hover:border-brand hover:text-brand">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="mailto:uttam.info006@gmail.com" className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm transition hover:border-brand hover:text-brand">
              <FaEnvelope /> Email
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="card-panel rounded-[2rem] p-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Your name"
              className={`${inputBaseClasses} ${errors.name ? 'border-red-500/60' : 'border-white/10'}`}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="mt-2 text-sm text-red-300">{errors.name}</p>}
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              className={`${inputBaseClasses} ${errors.email ? 'border-red-500/60' : 'border-white/10'}`}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="mt-2 text-sm text-red-300">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Tell me about your project or idea"
              className={`${inputBaseClasses} min-h-[170px] resize-none ${errors.message ? 'border-red-500/60' : 'border-white/10'}`}
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="mt-2 text-sm text-red-300">{errors.message}</p>}
          </div>

          {formState.error && <p className="mb-4 rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{formState.error}</p>}
          {formState.success && <p className="mb-4 rounded-3xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{formState.success}</p>}

          <button
            type="submit"
            disabled={formState.loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-brand px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {formState.loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;
