import React, { useState } from "react";
import Skeleton from "../../Share/Skeleton/Skeleton";

const FindPhysician = ({ profiles, filteredData, setFilteredData }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();

    setSearchQuery(query);

    const filteredResults = profiles.filter((item) =>
      (item.firstName + " " + item.lastName)?.toLowerCase().includes(query)
    );

    setFilteredData(filteredResults);
  };

  return (
    <div className="w-full">
      <label class="relative block">
        <span class="sr-only">Search</span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            ></path>
          </svg>
        </span>
        <input
          class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search for physician..."
          type="text"
          name="search"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </label>

      {profiles.length != 0 ? (
        <ul role="list" class="p-6 divide-y divide-slate-200">
          {filteredData.map(
            (profile) =>
              profile.status == "physician" && (
                <li class="flex py-4 first:pt-0 last:pb-0 items-center">
                  <img
                    class="h-8 w-8 rounded-full"
                    src={`data:image/png;base64,${profile.profilePic}`}
                    alt=""
                  />
                  <div class="ml-3 overflow-hidden">
                    <p class="text-sm font-medium text-slate-900">
                      {profile.firstName + " " + profile.lastName}
                    </p>
                  </div>
                </li>
              )
          )}
        </ul>
      ) : (
        <Skeleton></Skeleton>
      )}
    </div>
  );
};

export default FindPhysician;
