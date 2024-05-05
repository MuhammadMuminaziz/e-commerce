import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const LoginView = () => {
  const { push } = useRouter();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      push("/auth/login");
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div>
        <h1 className="text-center font-semibold mb-5 text-3xl">Login</h1>
        <div className="w-[400px] bg-sky-200 rounded-lg p-5">
          <div>
            <form onSubmit={handleRegister}>
              <div className="flex flex-col mb-3">
                <label htmlFor="email" className="mb-1 text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="rounded active:border-white-100 h-[35px]"
                />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="password" className="mb-1 text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="rounded active:border-white-100 h-[35px]"
                />
              </div>
              <button
                type="submit"
                className="py-2 w-full px-5 bg-sky-500 text-white rounded mt-5"
              >
                Login
              </button>
            </form>
          </div>
          <p className="text-center text-sm mt-2 text-gray-500">
            Dont have an account? Sign up{" "}
            <Link className="text-sky-500" href="/auth/register">
              here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
