// app/editor/[id]/page.jsx
const Editor = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/USER/GetEditor/${params.id}`,
    {
      cache: "no-store", // optional: always fetch fresh data
    }
  );

  if (!res.ok) {
    return <div className="text-red-500">Editor not found</div>;
  }

  const user = await res.json();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-purple-400 mb-4">{user.name}</h1>
      <p className="text-lg text-purple-200">{user.email}</p>
    </div>
  );
};

export default Editor;
