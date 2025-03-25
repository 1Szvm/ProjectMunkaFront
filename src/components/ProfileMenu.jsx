import { FiEdit, FiChevronDown, FiTrash, FiShare, FiPlusSquare } from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { extractUrlAndId } from "../utility/utils";
import { UserContext } from "../context/userContext";
import { readAuthorization } from "../utility/crudUtility";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false); // Track if the dropdown is open
  const toggleMenu = () => setOpen(!open);
  const [admins,setAdmins]=useState([]);
  const { user, logoutUser } = useContext(UserContext);

    useEffect(() => {
      readAuthorization(setAdmins);
  }, []);


  return (
    <div className=" flex items-center justify-center">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={toggleMenu} // Toggle the state when clicked
          className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 transition-colors"
        >
      <motion.button 
                    className="btn btn-ghost btn-circle avatar"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
              <div className="w-10 rounded-full">
                {user?.photoURL?
                <img src={extractUrlAndId(user.photoURL).url} alt="Preview" className="img-thumbnail" />:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>}
              </div>
                  </motion.button>
          <motion.span variants={iconVariants}>
            
          </motion.span>
        </button>

        <motion.ul
  initial={wrapperVariants.closed}
  variants={wrapperVariants}
  style={{ originY: "top", translateX: "-50%", zIndex: 50 }} // Added zIndex
  className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
 >
          {admins?.some(admin => admin.Ids.includes(user?.uid))? (
            <NavLink to="/admin" > <Option setOpen={setOpen} Icon={FiEdit} text="Admin Page" /> </NavLink>
          ):null}
          <NavLink to="/profile" > <Option setOpen={setOpen} Icon={FiEdit} text="Profil" /> </NavLink>
          <motion.button
                            className=""
                            whileHover={{ scale: 1.1 }}
                            onClick={logoutUser}
                          >
                      <Option setOpen={setOpen} Icon={FiEdit} text="Kijelentkezés" />
                          </motion.button>
               </motion.ul>
      </motion.div>
    </div>
  );
}

const Option = ({ text, Icon, setOpen }) => (
  <motion.li
    variants={itemVariants}
    onClick={() => setOpen(false)} // Close the menu after an option is clicked
    className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
  >
    <motion.span variants={actionIconVariants}>
      <Icon />
    </motion.span>
    <span>{text}</span>
  </motion.li>
);

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
