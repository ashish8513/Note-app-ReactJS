import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewDocuments } from "../redux/documentSlice";
function EmployeeDocuments() {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({
    panCard: "",
    phone: "",
    department: "",
    address: "",
    dateOfBirth: "",
    city: "",
    state: null,
    zipCode: "",
  });
  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userInput.panCard ||
      !userInput.phone ||
      !userInput.department ||
      !userInput.address ||
      !userInput.city ||
      !userInput.dateOfBirth ||
      !userInput.state ||
      !userInput.zipCode
    ) {
      toast.error("Please fill all the details");
      return;
    }
    const response = await dispatch(createNewDocuments(userInput));
    if (response?.payload?.success) {
      setUserInput({
        panCard: "",
        phone: "",
        department: "",
        address: "",
        dateOfBirth: "",
        city: "",
        state: "",
        zipCode: "",
      });
    }
  };
  const [activeSection, setActiveSection] = useState("Documents");
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const userData = useSelector((state) => state?.auth?.data);
  const handleFrontUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFrontPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBackUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBackPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const renderSection = () => {
    switch (activeSection) {
      case "Documents":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Upload Documents</h2>
            <table>
              <div className="w-full ">
                {/* resume */}
                <div className="px-4 py-2 text-gray-900 dark:text-white">
                  Resume <span className="text-red-600">*</span>
                </div>
                <div className="px-4 py-2  dark:border-gray-700">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    className="w-full p-2 text-sm rounded-lg focus:ring-blue-500  dark:bg-gray-600  dark:text-white"
                  />
                </div>
              </div>
              <div>
                <div className="px-4 py-2  text-gray-900 dark:text-white">
                  Aadhar Front Side <span className="text-red-600">*</span>
                </div>
                <div className="px-4 py-2">
                  <input
                    type="file"
                    id="aadharFront"
                    name="aadharFront"
                    accept=".jpg, .jpeg, .png, .webp"
                    onChange={handleFrontUpload}
                    className="w-full p-2 text-sm  rounded-lg focus:ring-blue-500 dark:text-white"
                  />
                  {frontPreview && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Front Side Preview:
                      </p>
                      <img
                        src={frontPreview}
                        alt="Aadhar Front"
                        className="w-42 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="px-4 py-2  text-gray-900 dark:text-white">
                  Aadhar Back Side <span className="text-red-600">*</span>
                </div>
                <div className="px-4 py-2 ">
                  <input
                    type="file"
                    id="aadharBack"
                    name="aadharBack"
                    accept=".jpg, .jpeg, .png, .webp"
                    onChange={handleBackUpload}
                    className="w-full p-2 text-sm dark:text-white"
                  />
                  {backPreview && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Back Side Preview:
                      </p>
                      <img
                        src={backPreview}
                        alt="Aadhar Back"
                        className="w-42 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </table>
            <button
              type="submit"
              className="w-[12rem] bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition"
            >
              Save & Submit
            </button>
          </div>
        );
      case "Personal Info":
        return (
          <div className="md:pt-36">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <form className="space-y-4" noValidate onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block font-semibold mb-1">PanCard:-</label>
                  <input
                    type="text"
                    name="panCard"
                    id="panCard"
                    onChange={handleUserInput}
                    value={userInput.panCard}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter your Pancard"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Department</label>
                  <select
                    value={userInput.department}
                    name="department"
                    id="department"
                    onChange={handleUserInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Select department"
                  >
                    <option  selected>
                      Select Department
                    </option>
                    <option value="IT">IT</option>
                    <option value="Development">Development</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Support">Support</option>
                    <option value="Legal">Legal</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block font-semibold mb-1">
                  Street Address
                </label>
                <input
                  value={userInput.address}
                  onChange={handleUserInput}
                  type="text"
                  name="address"
                  id="address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Street Address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={userInput.city}
                    onChange={handleUserInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={userInput.state}
                    onChange={handleUserInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="State/Province"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    Postal/Zip Code
                  </label>
                  <input
                    name="zipCode"
                    id="zipCode"
                    value={userInput.zipCode}
                    onChange={handleUserInput}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Postal/Zip Code"
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={userInput.phone}
                    onChange={handleUserInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="(+91) 000-0000"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    Gaurdian Contact Number{" "}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="(+91) 000-0000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={userInput.dateOfBirth}
                    onChange={handleUserInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>

              <div className="w-full max-w-full mx-auto">
                <label className="block font-semibold mb-2">
                  Please upload your photo
                </label>
                <input type="file" className="hidden" />
                <div className="border-dashed border-2 border-blue-300 rounded-lg p-6 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16l-4-4m0 0l4-4m-4 4h16m-5 4l4-4m0 0l-4-4m4 4H3"
                    />
                  </svg>
                  <p className="font-semibold text-gray-500">Browse Files</p>
                  <p className="text-sm text-gray-400">
                    Drag and drop files here
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-[22rem] bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition"
              >
                Save & Submit
              </button>
            </form>
          </div>
        );
      case "Contact Info":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <form className="space-y-4">
              {/* Add form fields for contact info */}
            </form>
          </div>
        );
      default:
        return <div>Invalid Section</div>;
    }
  };
  return (
    <div className="flex min-h-screen min-w-full md:mr-42">
      {/* Sidebar */}
      <div className="w-64 bg-cyan-700 text-white flex flex-col space-y-4 md:p-6">
        <div className="flex items-center space-x-4">
          <img
            src={userData?.avatar?.secure_url || "/usertwo.png"}
            alt="User Avatar"
            className="h-10 w-10 rounded-full"
          />
          <h1 className="text-md font-semibold">Hi, {userData?.fullName}</h1>
        </div>

        {/* Sidebar Buttons */}
        <button
          onClick={() => setActiveSection("Documents")}
          className={`p-2 text-left rounded-md ${
            activeSection === "Documents" ? "bg-cyan-500" : "hover:bg-cyan-600"
          }`}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveSection("Personal Info")}
          className={`p-2 text-left rounded-md ${
            activeSection === "Personal Info"
              ? "bg-cyan-500"
              : "hover:bg-cyan-600"
          }`}
        >
          Personal Info
        </button>
        <button
          onClick={() => setActiveSection("Contact Info")}
          className={`p-2 text-left rounded-md ${
            activeSection === "Contact Info"
              ? "bg-cyan-500"
              : "hover:bg-cyan-600"
          }`}
        >
          Contact Info
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{renderSection()}</div>
    </div>
  );
}

export default EmployeeDocuments;
