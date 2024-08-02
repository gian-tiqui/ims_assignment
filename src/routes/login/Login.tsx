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
    setErrMsg(null);
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
        <div className="h-72 w-96 pt-5 md:h-[350px] md:w-[630px] rounded-lg bg-neutral-400 bg-opacity-90 grid place-content-center">
          <form
            className="flex flex-col items-center gap-5 md:gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              placeholder="Your username"
              className={`w-64 font-normal md:w-full text-xl md:font-semibold text-center text-white placeholder-white bg-transparent border-b-2 border-transparent focus:outline-none ${
                errors.username || errors.password || errMsg
                  ? "border-b-red-500"
                  : "border-b-white"
              }`}
            />

            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Your password"
              className={`w-64 font-normal md:w-full text-xl md:font-semibold text-center text-white placeholder-white bg-transparent border-b-2 border-transparent focus:outline-none ${
                errors.username || errors.password || errMsg
                  ? "border-b-red-500"
                  : "border-b-white"
              }`}
            />
            <button
              type="submit"
              className={`w-64 py-1 font-semibold text-white rounded-md md:w-[500px] mt-3 h-10 ${
                processing
                  ? "bg-neutral-400 border border-white"
                  : "bg-neutral-800"
              }`}
              disabled={processing}
            >
              {processing ? "PROCESSING..." : "LOG IN"}
            </button>
            <section className="mt-1">
              {errors.username || errors.password ? (
                <p className="text-red-700">Invalid input</p>
              ) : errMsg ? (
                <p className="text-red-700">{errMsg}</p>
              ) : null}
            </section>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
