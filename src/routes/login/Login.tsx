import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

interface FormFields {
  username: string;
  password: string;
}

const Login = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit = async (data: FormFields) => {
    setProcessing(true);
    try {
      const response = await axios.post(
        "https://cars.development.ims.cx/login",
        data
      );

      const responseData = response.data;

      if (responseData) {
        localStorage.setItem("autobase", `Bearer ${responseData.user.token}`);
        navigate("/");
      }
    } catch (error) {
      setErrMsg("Incorrect username/password");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("autobase");

    if (token) navigate("/");
  }, [navigate]);

  return (
    <section className="grid h-screen place-content-center">
      <Helmet>
        <title>Login - Autobase</title>
      </Helmet>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-6xl font-bold text-white">Log In.</h1>
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
              className="py-1 rounded-md bg-neutral-700 w-96"
              disabled={processing} // Disable the button while processing
            >
              {processing ? "Processing..." : "LOG IN"}
            </button>
            {(errors.username || errors.password) && (
              <p className="text-red-500">Invalid input</p>
            )}
            {errMsg && <p>{errMsg}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
