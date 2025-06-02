import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import type { RootState } from "@/redux/store";
import type { CarType } from "@/types/carType";
import CarService from "@/services/requests/CarService";

const carCategories = [
    "Electric",
    "Sedan",
    "Sports",
    "SUV",
    "Luxury",
    "Hybrid",
] as const;

type CarCategory = typeof carCategories[number];

const validationSchema = Yup.object({
    model: Yup.string().min(2, "Too short").required("Model is required"),
    brand: Yup.string().min(2, "Too short").required("Brand is required"),
    color: Yup.string().min(2, "Too short").required("Color is required"),
    category: Yup.mixed<CarCategory>().oneOf(carCategories).required("Category is required"),
    year: Yup.number()
        .min(1900, "Year too early")
        .max(new Date().getFullYear(), "Year cannot be in the future")
        .required("Year is required"),
    price: Yup.number()
        .positive("Must be positive")
        .required("Price is required"),
    description: Yup.string().min(10, "Too short").required("Description is required"),
});

interface Props {
    car: CarType;
    onCancel: () => void;
    onSuccess: (updatedCar: CarType) => void;
}

const EditCarForm: React.FC<Props> = ({ car, onCancel, onSuccess }) => {
    const ownerId = useSelector((state: RootState) => state.auth.user?.id);

    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(car.coverImage);
    const [galleryImageUrls, setGalleryImageUrls] = useState<string[]>(car.images || []);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const uploadImage = async (file: File): Promise<string> => {
        return URL.createObjectURL(file);
    };

    const handleCoverImageUpload = async (file: File | null) => {
        if (!file) return;
        try {
            const url = await uploadImage(file);
            setCoverImageUrl(url);
        } catch {
            setError("Failed to upload cover image.");
        }
    };

    const handleGalleryImageUpload = async (files: FileList | null) => {
        if (!files) return;

        const urls: string[] = [];
        for (const file of Array.from(files)) {
            try {
                const url = await uploadImage(file);
                urls.push(url);
            } catch {
                setError("Failed to upload one or more gallery images.");
                break;
            }
        }

        setGalleryImageUrls((prev) => [...prev, ...urls]);
    };
    const toAbsoluteURL = (url: string) => url;

    const handleSubmit = async (
        values: Partial<Omit<CarType, "id" | "owner" | "avgRating" | "createdAt" | "reviews" | "rentals" | "wishlistedBy">>,
        { setSubmitting }: any
    ) => {
        setError(null);

        if (!ownerId) {
            setError("Not authenticated");
            setSubmitting(false);
            return;
        }
        if (!coverImageUrl) {
            setError("Please upload a cover image.");
            setSubmitting(false);
            return;
        }
        if (galleryImageUrls.length === 0) {
            setError("Please upload at least one gallery image.");
            setSubmitting(false);
            return;
        }

        setIsSubmitting(true);

        try {
            const updatedCarData = {
                model: values.model!,
                brand: values.brand!,
                color: values.color!,
                category: values.category!,
                year: values.year!,
                price: Number(values.price),
                description: values.description!,
                ownerId,
                coverImage: toAbsoluteURL(coverImageUrl),
                images: galleryImageUrls.map(toAbsoluteURL),
            };

            const updatedCar = await CarService.partialUpdate(car.id, updatedCarData);

            onSuccess(updatedCar);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Edit Car Details</h2>

            <Formik
                initialValues={{
                    model: car.model,
                    brand: car.brand,
                    color: car.color,
                    category: car.category,
                    year: car.year,
                    price: car.price,
                    description: car.description,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        {/* Model */}
                        <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                                Model
                            </label>
                            <Field
                                id="model"
                                name="model"
                                placeholder="Enter car model"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                            <ErrorMessage name="model" component="div" className="mt-1 text-sm text-red-600" />
                        </div>

                        {/* Brand */}
                        <div>
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                                Brand
                            </label>
                            <Field
                                id="brand"
                                name="brand"
                                placeholder="Enter car brand"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                            <ErrorMessage name="brand" component="div" className="mt-1 text-sm text-red-600" />
                        </div>

                        {/* Color */}
                        <div>
                            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                                Color
                            </label>
                            <Field
                                id="color"
                                name="color"
                                placeholder="Enter car color"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                            <ErrorMessage name="color" component="div" className="mt-1 text-sm text-red-600" />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <Field
                                as="select"
                                id="category"
                                name="category"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            >
                                {carCategories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="mt-1 text-sm text-red-600" />
                        </div>

                        <div>
                            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                                Year
                            </label>
                            <Field
                                id="year"
                                name="year"
                                type="number"
                                min={1900}
                                max={new Date().getFullYear()}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                            <ErrorMessage name="year" component="div" className="mt-1 text-sm text-red-600" />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                Price ($)
                            </label>
                            <Field
                                id="price"
                                name="price"
                                type="number"
                                min={1}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                            <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-600" />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <Field
                                as="textarea"
                                id="description"
                                name="description"
                                placeholder="Describe the car"
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                            />
                            <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
                        </div>

                        <div>
                            <p className="font-semibold text-gray-800 mb-2">Cover Image (1 image)</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleCoverImageUpload(e.target.files?.[0] || null)}
                                className="block w-full text-gray-700"
                            />
                            {coverImageUrl && (
                                <img
                                    src={toAbsoluteURL(coverImageUrl)}
                                    alt="Cover"
                                    className="w-32 h-32 object-cover mt-3 rounded-md shadow-sm"
                                />
                            )}
                        </div>

                        {/* Gallery Images */}
                        <div>
                            <p className="font-semibold text-gray-800 mb-2">Gallery Images (Multiple)</p>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => handleGalleryImageUpload(e.target.files)}
                                className="block w-full text-gray-700"
                            />
                            {galleryImageUrls.length > 0 && (
                                <div className="flex flex-wrap gap-3 mt-3">
                                    {galleryImageUrls.map((url) => (
                                        <img
                                            key={url}
                                            src={toAbsoluteURL(url)}
                                            alt="Gallery"
                                            className="w-24 h-24 object-cover rounded-md shadow-sm"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 justify-end">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-5 py-2 rounded-md text-white transition ${isSubmitting ? "bg-[#142b6e] cursor-not-allowed" : "bg-[#1C398E] hover:bg-[#5c6da0]"
                                    }`}
                            >
                                {isSubmitting ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditCarForm;
