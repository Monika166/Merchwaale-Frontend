import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ChevronLeft,
  Plus,
  Image as ImageIcon,
  Tag,
  Package,
  Layers,
  Save,
  X,
  CheckCircle2,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { CATEGORIES, DEPARTMENTS } from "../constants";
import FormInput from "../components/shared/FormInput";
import type { Product, Variant } from "../types";

interface ProductForm extends Omit<Product, "id" | "department" | "variants"> {
  departmentId?: string;
}

const AdminAddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [variants, setVariants] = useState<Variant[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductForm>({
    defaultValues: {
      stock: 0,
      price: 0,
      originalPrice: 0,
      discount: 0,
    },
  });

  const watchCategory = watch("category");
  const watchPrice = watch("price");
  const watchOriginalPrice = watch("originalPrice");

  // Auto-calculate discount when prices change
  useEffect(() => {
    if (watchPrice > 0 && watchOriginalPrice > 0) {
      const disc = Math.round(
        ((watchOriginalPrice - watchPrice) / watchOriginalPrice) * 100
      );
      setValue("discount", disc > 0 ? disc : 0);
    }
  }, [watchPrice, watchOriginalPrice, setValue]);

  const activeCategory = CATEGORIES.find((c) => c.id === watchCategory);

  const onSubmit = (data: ProductForm) => {
    console.log("Submitting Product:", { ...data, variants });
    setIsSuccess(true);
    setTimeout(() => {
      navigate("/admin");
    }, 2000);
  };

  const addVariant = (type: "size" | "color") => {
    if (variants.some((v) => v.type === type)) return;
    setVariants([
      ...variants,
      { type, options: type === "size" ? ["S", "M", "L", "XL"] : ["Default"] },
    ]);
  };

  const removeVariant = (type: string) => {
    setVariants(variants.filter((v) => v.type !== type));
  };

  const updateVariantOptions = (type: string, optionsString: string) => {
    const options = optionsString
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    setVariants(variants.map((v) => (v.type === type ? { ...v, options } : v)));
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="text-center space-y-4 animate-in zoom-in duration-300">
          <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black dark:text-white">
            Product Listed!
          </h2>
          <p className="text-text-sub dark:text-gray-400">
            The item has been added to the campus catalog.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin")}
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-text-sub hover:text-primary transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-black dark:text-white tracking-tight">
              List New Product
            </h1>
            <p className="text-xs font-black text-text-sub uppercase tracking-[0.2em] mt-1">
              Catalog Entry Form
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        {/* Main Details */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-card-dark rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <h3 className="text-lg font-black dark:text-white flex items-center gap-2">
              <Package className="text-primary" size={20} /> Essential
              Information
            </h3>

            <FormInput
              label="Product Name"
              placeholder="e.g. Official RoboNIT Club Hoodie"
              register={register("name", { required: "Name is required" })}
              error={errors.name?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Primary Category"
                options={CATEGORIES.map((c) => c.id)}
                placeholder="Select Category"
                register={register("category", {
                  required: "Category is required",
                })}
                error={errors.category?.message}
              />
              <FormInput
                label="Sub Category"
                options={activeCategory?.subCategories.map((s) => s.id) || []}
                placeholder="Select Subcategory"
                register={register("subCategory", {
                  required: "Subcategory required",
                })}
                error={errors.subCategory?.message}
                className={
                  !watchCategory ? "opacity-50 pointer-events-none" : ""
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-text-sub dark:text-gray-500 uppercase tracking-widest ml-1">
                Product Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description required",
                })}
                className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-primary/20 rounded-2xl p-4 text-sm min-h-[120px] transition-all dark:text-white focus:ring-4 focus:ring-primary/10"
                placeholder="Tell students about the materials, fit, and origin..."
              />
              {errors.description && (
                <p className="text-[9px] font-bold text-red-500 uppercase mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <h3 className="text-lg font-black dark:text-white flex items-center gap-2">
              <Layers className="text-primary" size={20} /> Inventory &
              Variations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                label="Selling Price (₹)"
                type="number"
                register={register("price", {
                  valueAsNumber: true,
                  required: true,
                })}
              />
              <FormInput
                label="Original Price (₹)"
                type="number"
                register={register("originalPrice", { valueAsNumber: true })}
              />
              <FormInput
                label="Stock Level"
                type="number"
                register={register("stock", {
                  valueAsNumber: true,
                  required: true,
                })}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black text-text-sub uppercase tracking-widest ml-1">
                  Product Variants
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => addVariant("size")}
                    className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1.5 rounded-lg hover:bg-primary/10"
                  >
                    Add Sizes
                  </button>
                  <button
                    type="button"
                    onClick={() => addVariant("color")}
                    className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1.5 rounded-lg hover:bg-primary/10"
                  >
                    Add Colors
                  </button>
                </div>
              </div>

              {variants.length === 0 ? (
                <div className="p-10 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl text-center">
                  <p className="text-xs font-bold text-text-sub">
                    No variants added yet (Fixed sizes/colors)
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {variants.map((v) => (
                    <div
                      key={v.type}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-start gap-4 animate-in slide-in-from-top-2"
                    >
                      <div className="size-10 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center font-black text-xs text-primary uppercase">
                        {v.type}
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          defaultValue={v.options.join(", ")}
                          onBlur={(e) =>
                            updateVariantOptions(v.type, e.target.value)
                          }
                          placeholder="S, M, L, XL (Comma separated)"
                          className="w-full bg-transparent border-none text-xs font-bold p-0 focus:ring-0 dark:text-white"
                        />
                        <p className="text-[9px] text-text-sub font-medium mt-1 uppercase tracking-tighter">
                          Comma separated list of options
                        </p>
                      </div>
                      <button
                        onClick={() => removeVariant(v.type)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Media & Meta */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-card-dark rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <h3 className="text-lg font-black dark:text-white flex items-center gap-2">
              <ImageIcon className="text-primary" size={20} /> Media
            </h3>

            <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 relative group">
              <img
                src={
                  watch("image") ||
                  "https://images.unsplash.com/photo-1560343060-c140a5779992?auto=format&fit=crop&q=80&w=400"
                }
                className={`w-full h-full object-cover ${
                  !watch("image") ? "opacity-20 grayscale" : ""
                }`}
                alt="Preview"
              />
              {!watch("image") && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <ImageIcon
                    size={32}
                    className="text-text-sub mb-2 opacity-30"
                  />
                  <p className="text-[10px] font-black text-text-sub uppercase tracking-widest">
                    Image Preview
                  </p>
                </div>
              )}
            </div>

            <FormInput
              label="Image URL"
              placeholder="https://..."
              register={register("image", { required: "Image required" })}
              error={errors.image?.message}
            />
          </div>

          <div className="bg-white dark:bg-card-dark rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <h3 className="text-lg font-black dark:text-white flex items-center gap-2">
              <Tag className="text-primary" size={20} /> Visibility
            </h3>

            <FormInput
              label="Faculty / Dept"
              options={DEPARTMENTS.map((d) => d.name)}
              placeholder="All Departments"
              register={register("departmentId")}
            />

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <input
                  type="checkbox"
                  {...register("isCustomizable")}
                  className="size-5 rounded border-gray-200 dark:border-gray-700 text-primary focus:ring-primary/20"
                />
                <span className="text-xs font-black dark:text-white group-hover:text-primary transition-colors">
                  Enabled Customization
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <input
                  type="checkbox"
                  {...register("isBestseller")}
                  className="size-5 rounded border-gray-200 dark:border-gray-700 text-primary focus:ring-primary/20"
                />
                <span className="text-xs font-black dark:text-white group-hover:text-primary transition-colors">
                  Mark as Bestseller
                </span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-[2rem] shadow-xl shadow-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70"
            >
              <Save size={20} />{" "}
              {isSubmitting ? "Listing..." : "Publish Product"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-text-sub dark:text-white font-black py-4 rounded-[1.5rem] flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
            >
              Discard Changes
            </button>
          </div>

          <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-3xl border border-amber-100 dark:border-amber-900/20 flex gap-3">
            <AlertCircle className="text-amber-500 shrink-0" size={18} />
            <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-tight">
              Listing products will make them immediately visible to all
              verified students. Please double check stock levels.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default AdminAddProduct;
