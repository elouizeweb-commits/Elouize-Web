"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body style={{ backgroundColor: "#0a0a1a", color: "#e5e7eb", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Something went wrong</h1>
          <p style={{ color: "#9ca3af", marginBottom: "1.5rem" }}>{error.message || "An unexpected error occurred"}</p>
          <button
            onClick={reset}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
