import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import carBg from "../../assets/carbg.jfif";

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
    <section
      className={`grid h-screen place-content-center bg-no-repeat bg-center bg-cover`}
      style={{ backgroundImage: `url(${carBg})` }}
    >
      <Helmet>
        <title>Login - Autobase</title>
      </Helmet>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-6xl font-bold text-white">Log In.</h1>
        <div className="md:h-80 md:w-[550px] rounded-lg bg-neutral-400 bg-opacity-90 grid place-content-center">
          <form
            className="flex flex-col items-center gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              placeholder="Your username"
              className="w-full pb-1 text-xl font-semibold text-center text-white placeholder-white bg-transparent border-b-2 border-transparent focus:outline-none border-b-white"
            />

            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Your password"
              className={`w-full pb-1 text-xl font-semibold text-center text-white placeholder-white bg-transparent border-b-2 border-transparent focus:outline-none ${
                errors.username || errors.password || errMsg
                  ? "border-b-white"
                  : "border-b-red-600"
              }`}
            />
            <button
              type="submit"
              className={`py-1 font-semibold text-white rounded-md w-96 border border-white ${
                processing ? "bg-neutral-400" : "bg-neutral-800"
              }`}
              disabled={processing}
            >
              {processing ? "PROCESSING..." : "LOG IN"}
            </button>
            {(errors.username || errors.password) && (
              <p className="text-red-600">Invalid input</p>
            )}
            {errMsg && <p className="text-red-600">{errMsg}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
