const User = async ({ params }) => {
  const res = await fetch(
    `http://localhost:3000/api/USER/GetUser/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div className="text-red-500">User not found</div>;
  }

  const data = await res.json();
  const user = data.user;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4 py-10">
      <div className="bg-gray-800 border border-purple-600 rounded-2xl p-8 max-w-md w-full shadow-lg text-center space-y-6">
        {/* Avatar Placeholder */}
        <div className="w-24 h-24 mx-auto rounded-full bg-purple-700/30 border-4 border-purple-500 shadow-md flex items-center justify-center text-white text-3xl font-semibold">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold text-purple-300">{user.name}</h1>

        {/* Email */}
        <p className="text-purple-200 text-sm">{user.email}</p>

        {/* Role */}
        <span className="inline-block mt-2 px-4 py-1 bg-purple-600 text-white rounded-full text-sm">
          {user.role}
        </span>
      </div>
    </div>
  );
};

export default User;
