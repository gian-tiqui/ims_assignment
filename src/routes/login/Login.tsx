import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormFields {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit = async (data: FormFields) => {
    const response = await axios.post(
      "https://cars.development.ims.cx/login",
      data
    );

    const responseData = response.data;

    localStorage.setItem("autobase", `Bearer ${responseData.user.token}`);

    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("autobase");

    if (token) navigate("/");
  }, [navigate]);

  return (
    <section className="grid place-content-center h-screen">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-white text-6xl font-bold">Log In.</h1>
        <div className="md:h-80 md:w-[550px] rounded-lg bg-white grid place-content-center">
          <form
            className="flex flex-col items-center gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              placeholder="Your username"
              className="text-center"
            />
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Your password"
              className="text-center"
            />
            <button
              type="submit"
              className="bg-neutral-700 w-96 py-1 rounded-md"
            >
              LOG IN
            </button>
            {(errors.username || errors.password) && <p>Invalid input</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
