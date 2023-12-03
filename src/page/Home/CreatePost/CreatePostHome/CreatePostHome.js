import React, { useRef, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import CreatePostPhysician from "../CreatePostPhysician/CreatePostPhysician";
import CreatePostPatient from "../CreatePostPatient/CreatePostPatient";

const CreatePostHome = ({ profile }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  return (
    <>
      <div onClick={() => setOpen(true)}>
        <div class="p-6 w-full mx-auto bg-white rounded shadow flex items-center space-x-4 mb-3 cursor-pointer">
          <div class="shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src={`data:image/png;base64,${profile?.profilePic}`}
              alt="profile avatar"
            />
          </div>
          <div class="w-full">
            <label class="relative block">
              <span class="sr-only">Search</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2 cursor-pointer">
                <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 24 24">
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"></path>
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"></path>
                </svg>
              </span>
              <input
                class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                onClick={() => setOpen(true)}
                placeholder={
                  profile?.status == "patient"
                    ? "What do you want to ask or share ?"
                    : "What do you want to share ?"
                }
                type="text"
                name="search"
                // disabled
              />
            </label>
          </div>
        </div>
      </div>

      {!profile?.phoneNumber ? (
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
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start sm:items-center">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Your profile incomplete !
                          </Dialog.Title>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 sm:ml-3 sm:w-auto"
                      >
                        <NavLink to="/settings"> Go to settings</NavLink>
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : (
        <>
          {profile?.status == "physician" ? (
            <CreatePostPhysician
              open={open}
              setOpen={setOpen}
              profile={profile}
            />
          ) : (
            <CreatePostPatient
              open={open}
              setOpen={setOpen}
              profile={profile}
            />
          )}
        </>
      )}
    </>
  );
};

export default CreatePostHome;
