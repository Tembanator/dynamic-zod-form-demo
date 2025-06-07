"use client";
import React from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { defaultValues, FormSchema, FormData } from "./lib/validation";

const App = () => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const selectedSubscriptionType = useWatch({
    control,
    name: "subscriptionType",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    console.log("Form submitted with data:", data);
    // Here you can handle the form submission, e.g., send data to an API
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Dynamic Zod Form Demo
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              {...register("name")}
              name="name"
              type="text"
              className="mt-1 text-slate-500 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              {...register("email")}
              name="email"
              type="email"
              className="mt-1 text-slate-500 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Subscription Type Radio Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subscription Type
            </label>
            <div className="mt-1 space-y-2">
              <div className="flex items-center">
                <input
                  {...register("subscriptionType")}
                  id="subscriptionType"
                  name="subscriptionType"
                  type="radio"
                  value="free"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-full"
                />
                <label
                  htmlFor="free"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Free
                </label>
              </div>
              <div className="flex items-center">
                <input
                  {...register("subscriptionType")}
                  id="subscriptionType"
                  name="subscriptionType"
                  type="radio"
                  value="premium"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-full"
                />
                <label
                  htmlFor="premium"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Premium
                </label>
              </div>
              {errors.subscriptionType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subscriptionType.message}
                </p>
              )}
            </div>
          </div>
          {/* Premium Features Input (Conditional/Optional) */}

          {selectedSubscriptionType === "premium" && (
            <div>
              <label
                htmlFor="premiumFeatures"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Premium Features Description
              </label>
              <textarea
                {...register("premiumFeatures", { shouldUnregister: true })}
                name="premiumFeatures"
                rows={3}
                className="mt-1 block text-slate-500 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Describe the premium features you're interested in..."
              ></textarea>
              {/* @ts-expect-error */}
              {errors.premiumFeatures && (
                <p className="mt-1 text-sm text-red-600">
                  {/* @ts-expect-error */}
                  {errors.premiumFeatures.message}
                </p>
              )}
            </div>
          )}
          {/* Hobbies (Optional Array) */}
          <div className="border border-gray-200 p-4 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hobbies (Optional)
            </label>
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  {...register(`hobbies.${index}.hobby`)}
                  className="mt-1 text-slate-500 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={`Hobby #${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                >
                  <Trash className="h-4 w-4" />
                </button>
                {errors.hobbies?.[index]?.hobby && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.hobbies?.[index]?.hobby?.message}
                  </p>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ hobby: "" })}
              className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Add Hobby
            </button>
          </div>
          {/* Newsletter Opt-in (Optional) */}
          <div className="flex items-center">
            <input
              {...register("newsletter")}
              id="newsletter"
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label
              htmlFor="newsletter"
              className="ml-2 block text-sm text-gray-900"
            >
              Sign up for our newsletter (optional)
            </label>
          </div>
          {/* Submit Button */}
          <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words">
            {JSON.stringify(watch(), null, 2)}
          </pre>
          <button
            type="submit"
            className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
