const Editor = async ({ params }) => {
  const res = await fetch(
    `http://localhost:3000/api/USER/GetEditor/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div className="text-red-500">Editor not found</div>;
  }

  const data = await res.json();
  const user = data.editor;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-purple-400 mb-4">{user.name}</h1>
      <p className="text-lg text-purple-200">{user.email}</p>
      <p className="text-lg text-purple-200">{user.role}</p>
    </div>
  );
};

export default Editor;
