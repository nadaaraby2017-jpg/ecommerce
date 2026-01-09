import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../constant/conastant";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

export default function ForgetPassword() {
  useDocumentTitle("Forget Password");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleForgetPassword = async (values) => {
    const loadingToster = toast.loading("Waiting...");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/auth/forgotPasswords`,
        values
      );
      if (data.statusMsg == "success") {
        toast.success(data.message);
      }
      if (data.statusMsg == "fail") {
        toast.success(data.message);
      }
      toast.dismiss(loadingToster);
      setLoading(false);
      navigate("/verifyCode");
    } catch (errors) {
      console.log("errors :", errors);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleForgetPassword,
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={formik.handleSubmit}
        className="wrapper mx-auto px-6 pt-36"
      >
        <h1 className="text-2xl mb-6 text-neutral-700">Enter your email</h1>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-semibold text-slate-700 dark:text-white"
          >
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-100 border border-gray-400 text-slate-800 text-base rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-2 dark:bg-gray-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-400 dark:focus:border-green-400"
          />
          <p className="text-red-500 text-sm mt-1 ps-2">
            {formik.touched.email && formik.errors.email}
          </p>
        </div>
        <div className="flex justify-start">
          {!loading ? (
            <button
              type="submit"
              className="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-2 focus:outline-none focus:ring-emerald-300 font-semibold rounded-md text-sm w-full sm:w-auto px-6 py-2 text-center dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:focus:ring-emerald-600"
            >
              Verify
            </button>
          ) : (
            <button
              type="button"
              className="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-2 focus:outline-none focus:ring-emerald-300 font-semibold rounded-md text-sm w-full sm:w-auto px-6 py-2 text-center dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:focus:ring-emerald-600"
              disabled
            >
              Verify <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </div>
      </form>
    </>
  );
}
