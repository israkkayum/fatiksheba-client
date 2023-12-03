import React, { useRef, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Alert } from "@mui/material";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CreatePostPatient = ({ open, setOpen, profile }) => {
  const cancelButtonRef = useRef(null);

  const email = profile.email;
  const date = new Date().toDateString();

  const [photo, setPhoto] = useState(null);
  const [tempPhoto, setTempPhoto] = useState(null);
  const [shareText, setShareText] = useState("");
  const [askText, setAskText] = useState("");
  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState("yes-no");

  const handlePostProblem = (e) => {
    if (photo) {
      setLoad(true);

      const formData = new FormData();

      formData.append("photo", photo);
      formData.append("email", email);
      formData.append("date", date);
      formData.append("text", shareText);

      fetch("http://localhost:65000/problem-share", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("yes");
            setLoad(false);
            setPhoto(null);
            setTempPhoto(null);
            setShareText("");
          }
        })
        .catch((error) => {
          setSuccess("no");
          setLoad(false);
        });
    } else {
      setSuccess("no");
      setLoad(false);
    }

    e.preventDefault();
  };

  const handlePostAsk = (e) => {
    setLoad(true);

    const formData = new FormData();

    formData.append("email", email);
    formData.append("date", date);
    formData.append("ask", askText);

    fetch("http://localhost:65000/ask", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess("yes");
          setLoad(false);
          setPhoto(null);
          setTempPhoto(null);
          setShareText("");
        }
      })
      .catch((error) => {
        setSuccess("no");
        setLoad(false);
      });

    e.preventDefault();
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-start p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-indigo-700 hover:text-indigo-300 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8 font-bold"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-200">
                    <div className="sm:flex sm:items-start sm:items-center">
                      <div className="mx-auto flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                        <div class="shrink-0">
                          <img
                            class="h-8 w-8 rounded-full"
                            src={`data:image/png;base64,${profile?.profilePic}`}
                            alt="profile avatar"
                          />
                        </div>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {profile.firstName + " " + profile.lastName}
                        </Dialog.Title>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-4 pb-4 sm:pb-4">
                    <Tab.Group as="div" className="mt-2">
                      <div className="border-b border-gray-200">
                        <Tab.List className="-mb-px flex space-x-8 px-4">
                          <Tab
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-900",
                                "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                              )
                            }
                          >
                            Share problems
                          </Tab>
                          <Tab
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-900",
                                "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                              )
                            }
                          >
                            Ask
                          </Tab>
                        </Tab.List>
                      </div>
                      <Tab.Panels as={Fragment}>
                        <Tab.Panel className="space-y-10 px-4">
                          <form onSubmit={handlePostProblem}>
                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-0 sm:grid-cols-6">
                              <div className="col-span-full">
                                <div className="mt-2">
                                  <textarea
                                    id="problem"
                                    name="problem"
                                    rows={4}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-0 ring-inset ring-white-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-white-600 sm:text-sm sm:leading-6"
                                    placeholder="Type somethings...."
                                    onChange={(e) => {
                                      setShareText(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="col-span-full">
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                  <div className="text-center">
                                    {tempPhoto ? (
                                      <img
                                        className="mx-auto h-100 w-100 text-gray-300"
                                        src={tempPhoto}
                                        alt=""
                                      />
                                    ) : (
                                      <PhotoIcon
                                        className="mx-auto h-12 w-12 text-gray-300"
                                        aria-hidden="true"
                                      />
                                    )}
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                      <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                      >
                                        <span>Upload a file</span>
                                        <input
                                          id="file-upload"
                                          name="file-upload"
                                          type="file"
                                          className="sr-only"
                                          accept="image/*"
                                          required
                                          onChange={(e) => {
                                            setPhoto(e.target.files[0]);

                                            //
                                            const file = e.target.files[0];
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                              setTempPhoto(reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                          }}
                                        />
                                      </label>
                                      <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">
                                      PNG, JPG, GIF up to 10MB
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {load ? (
                              <button
                                disabled
                                type="button"
                                class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
                              >
                                <svg
                                  aria-hidden="true"
                                  role="status"
                                  class="inline w-4 h-4 mr-3 text-white animate-spin"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                  />
                                </svg>
                                Loading...
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className={
                                  tempPhoto
                                    ? "block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6 mb-2"
                                    : "block w-full rounded-md bg-gray-200 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6 mb-2"
                                }
                                disabled={tempPhoto ? false : true}
                              >
                                Post
                              </button>
                            )}

                            {success == "yes" && (
                              <Alert className="my-2" severity="success">
                                <strong>
                                  Your post successful submitted !!
                                </strong>
                              </Alert>
                            )}
                            {success == "no" && (
                              <Alert className="my-2" severity="error">
                                <strong>
                                  Somethings wrong, please try again !!
                                </strong>
                              </Alert>
                            )}
                          </form>
                        </Tab.Panel>
                        {/* // ask */}
                        <Tab.Panel className="space-y-10 px-4">
                          <form onSubmit={handlePostAsk}>
                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-0 sm:grid-cols-6">
                              <div className="col-span-full">
                                <div className="mt-2">
                                  <textarea
                                    id="ask"
                                    name="ask"
                                    rows={4}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-0 ring-inset ring-white-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-white-600 sm:text-sm sm:leading-6"
                                    placeholder="Type somethings...."
                                    required
                                    onChange={(e) => {
                                      setAskText(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            {load ? (
                              <button
                                disabled
                                type="button"
                                class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
                              >
                                <svg
                                  aria-hidden="true"
                                  role="status"
                                  class="inline w-4 h-4 mr-3 text-white animate-spin"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                  />
                                </svg>
                                Loading...
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className={
                                  askText
                                    ? "block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6 mb-2"
                                    : "block w-full rounded-md bg-gray-200 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6 mb-2"
                                }
                                disabled={askText ? false : true}
                              >
                                Post
                              </button>
                            )}

                            {success == "yes" && (
                              <Alert className="my-2" severity="success">
                                <strong>
                                  Your post successful submitted !!
                                </strong>
                              </Alert>
                            )}
                            {success == "no" && (
                              <Alert className="my-2" severity="error">
                                <strong>
                                  Somethings wrong, please try again !!
                                </strong>
                              </Alert>
                            )}
                          </form>
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default CreatePostPatient;
