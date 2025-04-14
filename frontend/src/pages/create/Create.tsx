import { useState } from "react";
import toast from "react-hot-toast";
import BtnLoader from "../../components/BtnLoader";
import ModelCloseBtn from "../../components/ModelCloseBtn";
import axiosInstance from "../../lib/axios";
import { addProduct } from "../../lib/redux/slices/productSlice";
import { validateForm } from "../../utils/helper";
import { useDispatch } from "react-redux";

const Create = (props: any) => {
  const { close } = props;
  const [btnLoader, setBtnLoader] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const createForm = document.getElementById(
        "createProduct"
      ) as HTMLFormElement;
      const isValid = validateForm(createForm);
      if (!isValid) {
        toast.error("Invalid inputs !");
        return null;
      }
      setBtnLoader(true);
      const createData = new FormData(createForm);
      const endpoint = `/products/createproduct`;
      const { data, status } = await axiosInstance.post(endpoint, createData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (status === 200) {
        toast.success("Created !");
        dispatch(addProduct(data?.data));
        modelCloseHandler();
      }
    } catch (err: any) {
      setBtnLoader(false);
      toast.error(err);
    }
  };

  const modelCloseHandler = () => {
    close((prev: any) => {
      return { ...prev, addproduct: false };
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-full bg-gray-400/70 dark:bg-gray-800/60  flex items-center justify-center p-6 z-50">
      <section className="w-full sm:w-5/6  md:w-2/3 lg:w-1/2 mx-auto h-fit flex flex-col p-4 sm:p-8 bg-white dark:bg-dark rounded-xl shadow fade-up ">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-center text-blue-1100">
            CREATE PRODUCT
          </h2>

          <ModelCloseBtn onClick={modelCloseHandler} disabled={btnLoader} />
        </div>

        <form
          className="w-full  mx-auto mt-6 p-2 flex flex-col gap-4 text-sm"
          id="createProduct"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="productName" className="dark:text-gray-200">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="name"
              className="border border-gray-300 outline-none rounded-md p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent text-gray-700 dark:text-gray-400 dark:border-gray-700"
              placeholder="product name"
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="description" className="dark:text-gray-200">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="border border-gray-300 outline-none rounded-[6px] p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent text-gray-700 dark:text-gray-400 dark:border-gray-700"
              placeholder="description"
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="Price" className="dark:text-gray-200">
              Price
            </label>
            <input
              type="number"
              id="Price"
              name="price"
              className="border border-gray-300 outline-none rounded-[6px] p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent text-gray-700 dark:text-gray-400 dark:border-gray-700"
              placeholder="price"
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="block text-sm dark:text-gray-200" htmlFor="file">
              Upload file
            </label>
            <input
              className=" border border-gray-300 outline-none rounded-md p-1.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent text-gray-700 dark:text-gray-400 dark:border-gray-700 block w-full text-sm  cursor-pointer"
              id="file"
              name="file"
              type="file"
            />
          </div>

          <div className="pt-4">
            <button
              type="button"
              className="bg-blue-1100 text-white px-2.5 py-2 rounded-[6px] text-sm  float-end flex items-center justify-between gap-2 font-semibold dark:font-medium  dark:text-dark"
              onClick={submitHandler}
              disabled={btnLoader}
            >
              {btnLoader && <BtnLoader />}
              {btnLoader ? "Loading..." : "Create"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Create;
