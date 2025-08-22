// src\components\ConnectFacebook.tsx
"use client";

export default function ConnectFacebook() {
  const api = process.env.NEXT_PUBLIC_API_URL!;
  return (
    <button
      onClick={() => (window.location.href = `${api}/auth/facebook/start`)}
      className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      Connect Facebook
    </button>
  );
}
