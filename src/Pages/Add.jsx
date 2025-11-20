import uploadImage from "../assets/uploadimage.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Nav from "../components/Nav.jsx";
import { serverURL } from "../main.jsx";

const Add = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Image states
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // Form states
  const [category, setCategory] = useState("Boys");
  const [customCategory, setCustomCategory] = useState("");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [customSubCategory, setCustomSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([]);
  const [customInputs, setCustomInputs] = useState([]); // For dynamic input fields

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("bestseller", bestseller);
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      formData.append(
        "category",
        category === "Other" ? customCategory : category
      );
      formData.append(
        "subCategory",
        subCategory === "Other" ? customSubCategory : subCategory
      );
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("price", price);

      const result = await axios.post(
        `${serverURL}/api/product/addproduct`,
        formData,
        { withCredentials: true }
      );

      setLoading(false);
      toast.success("Product added successfully!");
      console.log(result);

      // reset form
      setName("");
      setDescription("");
      setPrice("");
      setSizes([]);
      setCategory("Boys");
      setSubCategory("TopWear");
      setCustomCategory("");
      setCustomSubCategory("");
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);
      setBestseller(false);
      setCustomInputs([]);
      navigate("/lists");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
      setLoading(false);
    }
  };

  // Handle new size input field
  const handleAddSizeInput = () => {
    setCustomInputs((prev) => [...prev, ""]);
  };

  // Handle size input change
  const handleCustomSizeChange = (index, value) => {
    setCustomInputs((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // Confirm custom size and add to sizes array
  const handleConfirmSize = (index) => {
    const sizeValue = customInputs[index].trim();
    if (sizeValue && !sizes.includes(sizeValue)) {
      setSizes((prev) => [...prev, sizeValue]);
      toast.success(`Added custom size: ${sizeValue}`);
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] text-white overflow-x-hidden relative">
      <Nav />
      <Sidebar />
      <div className="w-[82%] h-[100%] flex items-center justify-center overflow-x-hidden absolute right-0 bottom-[5%]">
        <form
          onSubmit={handleAddProduct}
          className="w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]"
        >
          <div className="w-[400px] h-[50px] text-[25px] md:text-[40px] ">
            Add Product
          </div>

          {/* Upload Images */}
          <div className="w-[80%] h-[130px] flex flex-col justify-center items-start mt-[20px] gap-[10px] ">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Upload Images
            </p>
            <div className="w-[100%] h-[100%] flex justify-start items-start">
              {[setImage1, setImage2, setImage3, setImage4].map(
                (setter, index) => (
                  <label
                    key={index}
                    htmlFor={`image${index + 1}`}
                    className="w-[65px] h-[65px] md:h-[100px] md:w-[100px] cursor-pointer hover:border-[#47d1f7]"
                  >
                    <img
                      src={
                        ![image1, image2, image3, image4][index]
                          ? uploadImage
                          : URL.createObjectURL(
                              [image1, image2, image3, image4][index]
                            )
                      }
                      alt=""
                      className="h-[80%] w-[80%] rounded-lg shadow-2xl border-[2px]"
                    />
                    <input
                      type="file"
                      id={`image${index + 1}`}
                      hidden
                      required
                      onChange={(e) => setter(e.target.files[0])}
                    />
                  </label>
                )
              )}
            </div>
          </div>

          {/* Product name */}
          <div className="flex items-start justify-center flex-col w-[80%] h-[100px] gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Name
            </p>
            <input
              type="text"
              required
              placeholder="Type here"
              className="w-[600px] max-w-[98%] h-[40px] rounded-lg bg-slate-600 text-[18px] px-[20px] placeholder:text-[#ffffffc2] border-[2px] hover:border-[#47d1f7]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Description */}
          <div className="flex flex-col items-start w-[80%] gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Description
            </p>
            <textarea
              required
              placeholder="Type product description here..."
              className="w-[600px] max-w-[98%] min-h-[100px] rounded-lg bg-slate-600 text-[18px] px-[20px] py-[10px] placeholder:text-[#ffffffc2] border-[2px] hover:border-[#47d1f7]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Category & Subcategory */}
          <div className="flex flex-wrap items-center w-[80%] gap-[20px]">
            {/* Category */}
            <div className="md:w-[30%] w-[100%] flex flex-col items-start gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold">
                Product Category
              </p>
              <select
                required
                className="bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg border-[2px] hover:border-[#47d1f7]"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Both">Both</option>
                <option value="Other">Other</option>
              </select>
              {category === "Other" && (
                <input
                  type="text"
                  placeholder="Enter custom category"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg mt-2 border-[2px] hover:border-[#47d1f7]"
                />
              )}
            </div>

            {/* SubCategory */}
            <div className="md:w-[30%] w-[100%] flex flex-col items-start gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold">
                Sub-Category
              </p>
              <select
                required
                className="bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg border-[2px] hover:border-[#47d1f7]"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
                <option value="Other">Other</option>
              </select>
              {subCategory === "Other" && (
                <input
                  type="text"
                  placeholder="Enter custom sub-category"
                  value={customSubCategory}
                  onChange={(e) => setCustomSubCategory(e.target.value)}
                  className="bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg mt-2 border-[2px] hover:border-[#47d1f7]"
                />
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col items-start w-[80%] gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Price
            </p>
            <input
              type="number"
              required
              className="w-[600px] max-w-[98%] h-[40px] rounded-lg bg-slate-600 text-[18px] px-[20px] border-[2px] hover:border-[#47d1f7]"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Sizes */}
          <div className="flex flex-col w-[80%] gap-[15px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Sizes
            </p>
            <div className="flex flex-wrap items-center gap-[15px]">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  className={`px-[20px] py-[7px] rounded-lg text-[18px] border-[2px] cursor-pointer bg-slate-600 ${
                    sizes.includes(size)
                      ? "bg-green-400 text-black border-[#47d1f7]"
                      : ""
                  }`}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size]
                    )
                  }
                >
                  {size}
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddSizeInput}
                className="px-[15px] py-[5px] bg-[#65d8f7] text-black rounded-lg font-bold"
              >
                +
              </button>
            </div>

            {/* Dynamic Custom Size Inputs */}
            {customInputs.map((input, index) => (
              <div
                key={index}
                className="flex items-center gap-[10px] mt-[10px]"
              >
                <input
                  type="text"
                  placeholder="Enter custom size"
                  value={input}
                  onChange={(e) =>
                    handleCustomSizeChange(index, e.target.value)
                  }
                  className="bg-slate-600 px-[10px] py-[7px] rounded-lg border-[2px] hover:border-[#47d1f7]"
                />
                <button
                  type="button"
                  onClick={() => handleConfirmSize(index)}
                  className="px-[15px] py-[5px] bg-green-400 text-black rounded-lg font-bold"
                >
                  Add
                </button>
              </div>
            ))}
          </div>

          {/* Bestseller checkbox */}
          <div
            className="w-[80%] flex items-center justify-start mt-[20px] gap-[10px]"
            onClick={() => setBestseller((prev) => !prev)}
          >
            <input
              type="checkbox"
              checked={bestseller}
              readOnly
              className="h-[25px] w-[25px] cursor-pointer"
            />
            <label className="text-[18px] md:text-[22px] font-semibold">
              Add to BestSeller
            </label>
          </div>

          {/* Submit */}
          <button className="w-[140px] cursor-pointer px-[15px] py-[15px] rounded-xl bg-[#65d8f7] flex items-center justify-center gap-[10px] text-black active:bg-slate-700 active:text-white active:border-[2px]">
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
