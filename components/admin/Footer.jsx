// "use client"
// import React from 'react'
// import Title from '../ui/Title'
// import Input from '../form/Input'
// import { useFormik } from 'formik';
// import { useState } from "react";
// import { footerSchema } from '@/schema/footer';
// import { MdDeleteForever } from "react-icons/md";
// import { IoLocationSharp, IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io5";



// const Footer = () => {

//     const [linkAddress, setLinkAddress] = useState(0);
//     const [iconName, setIconName] = useState(0);
//     const [icons, setIcons] = useState([
//         { icon: <IoLogoFacebook /> },
//     ]);


//     const onSubmit = async (values, actions) => {
//         await new Promise((resolve) => setTimeout(resolve, 4000));
//         actions.resetForm()
//     };


//     const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
//         initialValues: {
//             location: '',
//             email: '',
//             phoneNumber: '',
//             desc: '',
//             day: '',
//             time: '',
//         },
//         onSubmit,
//         validationSchema: footerSchema,
//     });

//     const inputs = [
//         {
//             id: 1,
//             name: "location",
//             type: "text",
//             placeholder: "Your Location",
//             value: values.location,
//             errorMessage: errors.location,
//             touched: touched.location,
//         },
//         {
//             id: 2,
//             name: "email",
//             type: "email",
//             placeholder: "Your Email Adress",
//             value: values.email,
//             errorMessage: errors.email,
//             touched: touched.email,

//         },
//         {
//             id: 3,
//             name: "phoneNumber",
//             type: "number",
//             placeholder: "Your Phone Number",
//             value: values.phoneNumber,
//             errorMessage: errors.phoneNumber,
//             touched: touched.phoneNumber,
//         },
//         {
//             id: 4,
//             name: "desc",
//             type: "text",
//             placeholder: "Your Description",
//             value: values.desc,
//             errorMessage: errors.desc,
//             touched: touched.desc,
//         },
//         {
//             id: 5,
//             name: "day",
//             type: "text",
//             placeholder: "Update Day",
//             value: values.day,
//             errorMessage: errors.day,
//             touched: touched.day,
//         },
//         {
//             id: 6,
//             name: "time",
//             type: "text",
//             placeholder: "Update time",
//             value: values.time,
//             errorMessage: errors.time,
//             touched: touched.time,
//         },
//     ]
//     return (
//         <form className='lg:p-8 flex-1 lg:mt-0 mt-5 ' onSubmit={handleSubmit}>
//             <Title addClass="text-[40px]" >Footer Settings </Title>
//             <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 '>
//                 {inputs.map((input) => (
//                     <Input key={input.id} {...input} onBlur={handleBlur} onChange={handleChange} />

//                 ))}
//             </div>
//             <div className='mt-4 flex justify-between items-center'>
//                 <div className='flex gap-4 items-center'>
//                     <Input placeholder="Link Address" value="https://" />
//                     <Input placeholder="Icon Name" defaultValue="https://react-icons.github.io/react-icons/" onChange={() => setIconName(e.target.value)} value={iconName} />
//                     <button className="btn-primary" type='button' onClick={() => setIcons([...icons, iconName])}>Add</button>
//                 </div>
//                 <ul className='flex items-center gap-6'>
//                     {icons.map((icon) => (<li key={index}>
//                         {` ${icon} className='text-2xl' />`}
//                         <button className='text-danger'>
//                             <MdDeleteForever className='text-xl ml-2' />
//                         </button>
//                     </li>))}

//                     <li>
//                         <IoLogoTwitter className='text-2xl' />
//                         <button className='text-danger'>
//                             <MdDeleteForever className='text-xl ml-2' />
//                         </button>
//                     </li>
//                     <li>
//                         <IoLogoLinkedin className='text-2xl' />
//                         <button className='text-danger'>
//                             <MdDeleteForever className='text-xl ml-2' />
//                         </button>
//                     </li>
//                     <li>
//                         <IoLogoInstagram className='text-2xl' />
//                         <button className='text-danger'>
//                             <MdDeleteForever className='text-xl ml-2' />
//                         </button>
//                     </li>
//                 </ul>
//             </div>
//             <button className='btn-primary mt-4 ' type='submit'>Update</button>
//         </form>
//     )
// }

// export default Footer;

//chat gpt yapıldı alt taraf icon ayarlamalarında sıkıntı var onları düzeltmek laazım.

// "use client";
// import React, { useEffect, useState } from "react";
// import Title from "../ui/Title";
// import Input from "../form/Input";
// import { useFormik } from "formik";
// import { footerSchema } from "@/schema/footer";
// import { MdDeleteForever } from "react-icons/md";
// import {
//     IoLogoFacebook,
//     IoLogoTwitter,
//     IoLogoLinkedin,
//     IoLogoInstagram,
// } from "react-icons/io5";

// const Footer = () => {

//     const [iconName, setIconName] = useState("IoLogo");
//     const [icons, setIcons] = useState([
//         { name: "Facebook", icon: <IoLogoFacebook className="text-2xl" /> },
//         { name: "Twitter", icon: <IoLogoTwitter className="text-2xl" /> },
//         { name: "LinkedIn", icon: <IoLogoLinkedin className="text-2xl" /> },
//         { name: "Instagram", icon: <IoLogoInstagram className="text-2xl" /> },
//     ]);
//     const [linkAddress, setLinkAddress] = useState("https://");
//     const [footerData, setFooterData] = useState([]);
//     const [socialMediaLinks, setSocialMediaLinks] = useState([]);
//     useEffect(() => {
//         const getFooterData = async () => {
//             try {
//                 const res = await axios.get(
//                     `${process.env.NEXT_PUBLIC_API_URL}/api/footer`
//                 );
//                 setFooterData(res.data[0]);
//                 setSocialMediaLinks(res.data[0].socialMedia);
//             } catch (err) {
//                 console.log(err);
//             }
//         };
//         getFooterData();
//     }, []);

//     const onSubmit = async (values, actions) => {
//         try {
//             const res = await axios.put(
//                 `${process.env.NEXT_PUBLIC_API_URL}/api/footer/${footerData._id}`,
//                 {
//                     location: values.location,
//                     email: values.email,
//                     phoneNumber: values.phoneNumber,
//                     desc: values.desc,
//                     openingHours: {
//                         day: values.day,
//                         hour: values.time,
//                     },
//                     socialMedia: socialMediaLinks,
//                 }
//             );
//             if (res.status === 200) {
//                 toast.success("Footer updated successfully");
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     };
//     const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
//         useFormik({
//             initialValues: {
//                 location: footerData?.location,
//                 email: footerData?.email,
//                 phoneNumber: footerData?.phoneNumber,
//                 desc: footerData?.desc,
//                 day: footerData?.openingHours?.day,
//                 time: footerData?.openingHours?.hour,
//             },
//             onSubmit,
//             validationSchema: footerSchema,
//         });

//     const handleAddIcon = () => {
//         if (iconName && linkAddress) {
//             setIcons([...icons, { name: iconName, icon: <i className={`${iconName} text-2xl`} /> }]);
//             setIconName("fa fa-");
//             setLinkAddress("https://");
//         }
//     };
//     const inputs = [
//         {
//             id: 1,
//             name: "location",
//             type: "text",
//             placeholder: "Your Location",
//             value: values.location,
//             errorMessage: errors.location,
//             touched: touched.location,
//         },
//         {
//             id: 2,
//             name: "email",
//             type: "text",
//             placeholder: "Your Email",
//             value: values.email,
//             errorMessage: errors.email,
//             touched: touched.email,
//         },
//         {
//             id: 3,
//             name: "phoneNumber",
//             type: "number",
//             placeholder: "Your Phone Number",
//             value: values.phoneNumber,
//             errorMessage: errors.phoneNumber,
//             touched: touched.phoneNumber,
//         },
//         {
//             id: 4,
//             name: "desc",
//             type: "text",
//             placeholder: "Your Description",
//             value: values.desc,
//             errorMessage: errors.desc,
//             touched: touched.desc,
//         },
//         {
//             id: 5,
//             name: "day",
//             type: "text",
//             placeholder: "Update Day",
//             value: values.day,
//             errorMessage: errors.day,
//             touched: touched.day,
//         },
//         {
//             id: 6,
//             name: "time",
//             type: "text",
//             placeholder: "Update Time",
//             value: values.time,
//             errorMessage: errors.time,
//             touched: touched.time,
//         },
//     ];

//     const handleRemoveIcon = (indexToRemove) => {
//         setIcons(icons.filter((_, index) => index !== indexToRemove));
//     };
//     const handleCreate = (e) => {
//         setSocialMediaLinks([
//             ...footerData?.socialMedia,
//             {
//                 icon: iconName,
//                 link: linkAddress,
//             },
//         ]);
//         setLinkAddress("https://");
//         setIconName("fa fa-");
//     };

//     return (
//         <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleCreate}>
//             <Title addClass="text-[40px]">Footer Settings</Title>
//             <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">

//                 {inputs.map((input) => (
//                     <Input
//                         key={input.id}
//                         {...input}
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                     />
//                 ))}
//             </div>
//             <div className="mt-4 flex justify-between items-center md:flex-row flex-col gap-4">
//                 <div className="flex items-center gap-4">
//                     <Input
//                         placeholder="Link Address"
//                         onChange={(e) => setLinkAddress(e.target.value)}
//                         value={linkAddress}
//                     />
//                     <Input
//                         placeholder="Icon Name"
//                         value={iconName}
//                         onChange={(e) => setIconName(e.target.value)}
//                     />
//                     <button className="btn-primary" type="button" onClick={handleCreate}>
//                         Add
//                     </button>
//                 </div>
//                 <ul className="flex items-center gap-6">
//                     {socialMediaLinks?.map((item, index) => (
//                         <li key={index} className="flex items-center">
//                             {iconObj.icon}
//                             <i className={`${item.icon} text-2xl`}></i>
//                             <button
//                                 className="text-danger"
//                                 onClick={() => handleRemoveIcon(index)}
//                                 type="button"
//                             >
//                                 {/* <MdDeleteForever className="text-xl ml-2" /> */}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <button className="btn-primary mt-4" type="submit">
//                 Update
//             </button>
//         </form>
//     );
// };

// export default Footer;

"use client";
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import Input from "../form/Input";
import { useFormik } from "formik";
import { footerSchema } from "@/schema/footer";
import { MdDeleteForever } from "react-icons/md";
import {
    IoLogoFacebook,
    IoLogoTwitter,
    IoLogoLinkedin,
    IoLogoInstagram,
} from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
    const [iconName, setIconName] = useState("");
    const [linkAddress, setLinkAddress] = useState("https://");
    const [footerData, setFooterData] = useState(null);
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);

    useEffect(() => {
        const getFooterData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/footer`);
                setFooterData(res.data[0]);
                setSocialMediaLinks(res.data[0]?.socialMedia || []);
            } catch (err) {
                console.log(err);
            }
        };
        getFooterData();
    }, []);

    // Formik'i veriler yüklendikten sonra güncellemek
    useEffect(() => {
        if (footerData) {
            formik.setFieldValue('location', footerData.location || '');
            formik.setFieldValue('email', footerData.email || '');
            formik.setFieldValue('phoneNumber', footerData.phoneNumber || '');
            formik.setFieldValue('desc', footerData.desc || '');
            formik.setFieldValue('day', footerData?.openingHours?.day || '');
            formik.setFieldValue('time', footerData?.openingHours?.hour || '');
        }
    }, [footerData]);

    const formik = useFormik({
        initialValues: {
            location: "",
            email: "",
            phoneNumber: "",
            desc: "",
            day: "",
            time: "",
        },
        onSubmit: async (values) => {
            try {
                const res = await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/footer/${footerData._id}`,
                    {
                        location: values.location,
                        email: values.email,
                        phoneNumber: values.phoneNumber,
                        desc: values.desc,
                        openingHours: {
                            day: values.day,
                            hour: values.time,
                        },
                        socialMedia: socialMediaLinks,
                    }
                );
                if (res.status === 200) {
                    toast.success("Footer updated successfully");
                }
            } catch (err) {
                console.log(err);
            }
        },
        validationSchema: footerSchema,
    });

    // İkon ekleme fonksiyonu
    const handleAddIcon = () => {
        if (iconName && linkAddress) {
            setSocialMediaLinks([
                ...socialMediaLinks,
                { icon: iconName, link: linkAddress },
            ]);
            setIconName("");
            setLinkAddress("https://");
        }
    };

    // İkon silme fonksiyonu
    const handleRemoveIcon = (index) => {
        setSocialMediaLinks(socialMediaLinks.filter((_, i) => i !== index));
    };

    const inputs = [
        { id: 1, name: "location", type: "text", placeholder: "Your Location", value: formik.values.location },
        { id: 2, name: "email", type: "email", placeholder: "Your Email Address", value: formik.values.email },
        { id: 3, name: "phoneNumber", type: "number", placeholder: "Your Phone Number", value: formik.values.phoneNumber },
        { id: 4, name: "desc", type: "text", placeholder: "Your Description", value: formik.values.desc },
        { id: 5, name: "day", type: "text", placeholder: "Update Day", value: formik.values.day },
        { id: 6, name: "time", type: "text", placeholder: "Update Time", value: formik.values.time },
    ];

    return (
        <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={formik.handleSubmit}>
            <Title addClass="text-[40px]">Footer Settings</Title>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
                {inputs.map((input) => (
                    <Input
                        key={input.id}
                        {...input}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                ))}
            </div>
            <div className="mt-4 flex justify-between items-center md:flex-row flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Link Address"
                        value={linkAddress}
                        onChange={(e) => setLinkAddress(e.target.value)}
                    />
                    <Input
                        placeholder="Icon Name"
                        value={iconName}
                        onChange={(e) => setIconName(e.target.value)}
                    />
                    <button
                        className="btn-primary"
                        type="button"
                        onClick={handleAddIcon}
                    >
                        Add
                    </button>
                </div>
                <ul className="flex items-center gap-6">
                    {socialMediaLinks.map((link, index) => (
                        <li key={index} className="flex items-center">
                            <i className={`${link.icon} text-2xl`} />
                            <button
                                className="text-danger ml-2"
                                type="button"
                                onClick={() => handleRemoveIcon(index)}
                            >
                                <MdDeleteForever className="text-xl" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="btn-primary mt-4" type="submit">
                Update
            </button>
        </form>
    );
};

export default Footer;
