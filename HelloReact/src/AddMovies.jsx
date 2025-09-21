import { useState } from 'react'

function AddMovies() {
  const [form, setForm] = useState({ name: "", director: "", year: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // build payload from form, ensure year is a number
      const payload = {
        name: form.name.trim(),
        director: form.director.trim(),
        year: Number(form.year),
      };

      // simple client-side validation
      if (!payload.name || !payload.director || Number.isNaN(payload.year)) {
        setMessage("❌ Please enter valid name, director, and year (number).");
        return;
      }

      const res = await fetch('/api/movies/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errMsg = '';
        try { errMsg = (await res.json()).message || ''; } catch {}
        throw new Error(errMsg || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setMessage(`✅ Movie added: ${data.movie?.name || payload.name}`);
      setForm({ name: "", director: "", year: "" });
    } catch (err) {
      console.error(err);
      setMessage(`❌ Could not add movie: ${err.message}`);
    }
  };

  return (
    <div className="AddMovies">
      <h1>Add a New Movie</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <input
          placeholder="Movie Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Director"
          value={form.director}
          onChange={(e) => setForm({ ...form, director: e.target.value })}
          required
        />
        <input
          placeholder="Year"
          type="number"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          required
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovies;
