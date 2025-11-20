import {
  Listbox,
  ListboxButton,
  Transition,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import {
  BellIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react/jsx-runtime";
import { NOTIFICATIONS_DATA } from "../../constants";

const Social = () => {
  return (
    <div className="w-full flex">
      <div className="flex flex-col p-4 pb-12 gap-16 bg-white w-2/3">
        <div className="p-4 bg-white w-full flex justify-between gap-4 items-center">
          <div className="text-3xl">Social Summary</div>
          <Listbox className="  p-1 pr-0 bg-white ">
            <div className="relative">
              <ListboxButton className="relative w-full cursor-default rounded-lg text-left flex justify-center py-0 px-3.5 hover:cursor-pointer">
                <div className="h-8 w-8 flex justify-center items-center bg-[#015c93] rounded-full">
                  <BellIcon className="h-5 w-5 text-white" />
                </div>
                <p className="h-4 w-4 absolute left-[60%] rounded-full border text-white bg-red-700 flex justify-center items-center p-1 text-xs">
                  3
                </p>
              </ListboxButton>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="border absolute z-10 mt-1 right-10 w-64 overflow-auto rounded-md bg-[#015c93] text-white focus:outline-none p-2 divide-y text-sm">
                  {NOTIFICATIONS_DATA.map((item) => (
                    <div
                      className="flex gap-2 py-1 hover:cursor-pointer"
                      key={item.id}
                    >
                      <p>{item.icon}</p>
                      <p>{item.name}</p>
                    </div>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="flex gap-4">
          <button className="h-24 justify-center flex flex-col items-center gap-2 p-4 rounded-lg bg-[#015c93] text-white hover:opacity-85">
            <PencilSquareIcon className="w-5 h-5" />
            <span>Start a New Post</span>
          </button>

          <button className="h-24 justify-center flex flex-col items-center gap-2 p-4 rounded-lg bg-[#015c93] text-white hover:opacity-85">
            <Squares2X2Icon className="w-5 h-5" />
            <span>View Post Library</span>
          </button>

          <button className="h-24 justify-center flex flex-col items-center gap-2 p-4 rounded-lg bg-[#015c93] text-white hover:opacity-85">
            <UserCircleIcon className="w-5 h-5" />
            <span>View My Profile</span>
          </button>
        </div>
        <img src="https://i.ibb.co/PsfbjvNy/campaign.png" alt="" />
      </div>
      <div className="w-1/3">
        <img src="https://i.ibb.co/cK0fBKk1/social.png" alt="" />
      </div>
    </div>
  );
};

export default Social;
